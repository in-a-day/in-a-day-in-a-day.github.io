## SystemServer
首先看整个程序的入口`main`函数, 只是调用了`run`函数:
```java
/**
 * The main entry point from zygote.
 */
public static void main(String[] args) {
    new SystemServer().run();
}
```

`run`方法中执行了正真的启动服务操作, 这里服务被分为了4类: 引导类, 核心类, 其他及Apex, 而蓝牙服务在其他分类中, 即通过`startOtherServices`启动:
```java
// ...
// Start services.
try {
    t.traceBegin("StartServices");
    startBootstrapServices(t);
    startCoreServices(t);
    startOtherServices(t);
    startApexServices(t);
} catch (Throwable ex) {
    Slog.e("System", "******************************************");
    Slog.e("System", "************ Failure starting system services", ex);
    throw ex;
} finally {
    t.traceEnd(); // StartServices
}
// ...
```

接下来看一下`startOtherServices`的代码, 可以看到是通过`SystemServiceManager`启动服务, 这里提供了两个参数
- `BLUETOOTH_SERVICE_CLASS: "com.android.server.bluetooth.BluetoothService"`
- `BLUETOOTH_APEX_SERVICE_JAR_PATH: "/apex/com.android.btservices/javalib/service-bluetooth.jar"`
(通过这两个参数可以看到蓝牙的服务类是BluetoothService, 这个稍后再详细介绍):
            
``` java
// ...
if (mFactoryTestMode == FactoryTest.FACTORY_TEST_LOW_LEVEL) {
    Slog.i(TAG, "No Bluetooth Service (factory test)");
} else if (!context.getPackageManager().hasSystemFeature
        (PackageManager.FEATURE_BLUETOOTH)) {
    Slog.i(TAG, "No Bluetooth Service (Bluetooth Hardware Not Present)");
} else {
    t.traceBegin("StartBluetoothService");
    mSystemServiceManager.startServiceFromJar(BLUETOOTH_SERVICE_CLASS,
        BLUETOOTH_APEX_SERVICE_JAR_PATH);
    t.traceEnd();
}
//...
```

## SystemServiceManager
`SystemServiceManager`见名知意, 这个类就是用来管理服务的. 由于蓝牙服务通过`startServiceFromJar`方法启动, 所以我们就先看一下这个方法:
### startServiceFromJar
```java
public SystemService startServiceFromJar(String className, String path) {
    PathClassLoader pathClassLoader =
            SystemServerClassLoaderFactory.getOrCreateClassLoader(
                    path, this.getClass().getClassLoader(), isJarInTestApex(path));
    final Class<SystemService> serviceClass = loadClassFromLoader(className, pathClassLoader);
    return startService(serviceClass);
}
```
首先看一下这个方法的参数(这两个参数由SystemServer传入):
- className就是需要加载类的全限定类名了, 这里是`"com.android.server.bluetooth.BluetoothService"`
- path就行类所在的jar包路径了, 这里是`"/apex/com.android.btservices/javalib/service-bluetooth.jar"`

接着通过classLoader加载`BluetoothService`类(可以看到BluetoothService是SystemService的子类, 关于SystemService稍后再详细介绍), 这里的代码就不进去看了(感兴趣可以自行了解).
最后就是调用`startService`方法启动蓝牙服务啦:

### startService(Class\<T\> serviceClass)
注意这里的startService的参数是`Class<T>`类型, 从这里也就可以看出接下来肯定是要反射去构造这个类实例了, 这里反射我也就不过多介绍了(
这里简单提一下`BluetoothService`在构造方法中做了一些初始化的步骤, 在介绍`BluetoothService`时再做详细说明了.):
```java
public <T extends SystemService> T startService(Class<T> serviceClass) {
    try {
        final String name = serviceClass.getName();
        Slog.i(TAG, "Starting " + name);
        Trace.traceBegin(Trace.TRACE_TAG_SYSTEM_SERVER, "StartService " + name);

        // Create the service.
        if (!SystemService.class.isAssignableFrom(serviceClass)) {
            throw new RuntimeException("Failed to create " + name
                    + ": service must extend " + SystemService.class.getName());
        }
        final T service;
        try {
            Constructor<T> constructor = serviceClass.getConstructor(Context.class);
            service = constructor.newInstance(mContext);
        } catch (InstantiationException ex) {
            throw new RuntimeException("Failed to create service " + name
                    + ": service could not be instantiated", ex);
        } catch (IllegalAccessException ex) {
            throw new RuntimeException("Failed to create service " + name
                    + ": service must have a public constructor with a Context argument", ex);
        } catch (NoSuchMethodException ex) {
            throw new RuntimeException("Failed to create service " + name
                    + ": service must have a public constructor with a Context argument", ex);
        } catch (InvocationTargetException ex) {
            throw new RuntimeException("Failed to create service " + name
                    + ": service constructor threw an exception", ex);
        }

        startService(service);
        return service;
    } finally {
        Trace.traceEnd(Trace.TRACE_TAG_SYSTEM_SERVER);
    }
}
```
可以看到最后调用了`startService(service)`, 这里这个`service`就是`BluetoothService`的一个实例了.
这里我们就需要再去看看`startService`的另一个重载的方法了:

### startService(SystemService service)
这里我们终于进行到正真启动服务的代码了, 这里可以看到`SystemServiceManager`保存了已启动的服务, 启动后的一些callback应该就是通过这个进行调用的.
```java
public void startService(@NonNull final SystemService service) {
    // Check if already started
    String className = service.getClass().getName();
    if (mServiceClassnames.contains(className)) {
        Slog.i(TAG, "Not starting an already started service " + className);
        return;
    }
    mServiceClassnames.add(className);

    // Register it.
    mServices.add(service);

    // Start it.
    long time = SystemClock.elapsedRealtime();
    try {
        service.onStart();
    } catch (RuntimeException ex) {
        throw new RuntimeException("Failed to start service " + service.getClass().getName()
                + ": onStart threw an exception", ex);
    }
    warnIfTooLong(SystemClock.elapsedRealtime() - time, service, "onStart");
}
```
最终我们可以发现调用service的`onStart`方法. 所以我们就需要查看`BluetoothService`中的`onStart`的具体实现了.

## SystemService
在查看`BluetoothService`之前, 我们先来看一下`SystemService`. 每个系统服务类都需要继承自这个类.
`SystemService`主要定义了一些生命周期的回调函数, 用于每个阶段调用.

接下来看一下核心的生命周期方法:
首先是`onStart`方法, 用于去发布binder service:
```java
public abstract void onStart();
```

`onBootPhase`在不同的boot阶段进行调用.
```java
public void onBootPhase(@BootPhase int phase) {}
```

接下来进入到BluetoothService的分析:

## BluetoothService
我们可以看到在BluetoothService的构造方法中初始化了`BluetoothManagerService`:
```kotlin
init {
    mHandlerThread = HandlerThread("BluetoothManagerService")
    mHandlerThread.start()
    mBluetoothManagerService = BluetoothManagerService(context, mHandlerThread.getLooper())
}
```

在来看一下核心的一些回调函数的实现, 首先是`onStart`:
```kotlin
override fun onStart() {}
```
我们可以看到在`onStart`什么都没有做.

接着是`onBootPhase`: 
```kotlin
override fun onBootPhase(phase: Int) {
    if (phase == SystemService.PHASE_SYSTEM_SERVICES_READY) {
        publishBinderService(
            BluetoothAdapter.BLUETOOTH_MANAGER_SERVICE,
            mBluetoothManagerService.getBinder()
        )
    }
}
```
可以看到在`PHASE_SYSTEM_SERVICES_READY`阶段会发布一个binder service.

根据上面的分析可以得到, `BluetoothService`将核心操作都交由`BluetoothManagerService`进行操作, 所以接下来我们看一下`BluetoothManagerService`

## BluetoothManagerService
首先介绍一下BluetoothManagerService的核心职责:


TODO


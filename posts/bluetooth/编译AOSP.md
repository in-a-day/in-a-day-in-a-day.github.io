---
title: 编译AOSP
description: 编译AOSP
date: 2023-04-23
tags:
  - 蓝牙
---

## 写在前面
本文基于以下环境:  
OS: Ubuntu 22.04, CPU: i7 8700, 内存: 16G  

## 下载AOSP源码
建立python软链接:
```bash
sudo ln -s /usr/bin/python3 /usr/bin/python
```

安装git:
```bash
sudo apt install git
```

配置git个人信息(如果已配置跳过):
```bash
git config --global user.name Your Name
git config --global user.email you@example.com
```

安装curl:
```bash
sudo apt install curl
```

下载repo工具:
```bash
mkdir ~/bin
# 加入到你的命令行配置文件中, zsh: ~/.zshrc, bash: ~/.bashrc
PATH=~/bin:$PATH
curl https://storage.googleapis.com/git-repo-downloads/repo > ~/bin/repo
chmod a+x ~/bin/repo
```
方便起见, 可以将`~/bin`加入到你的可执行路径中:
```bash
# zsh写入~/.zshrc中, bash写入~/.bashrc中
epxort PATH=~/bin:$PATH
```

创建工作目录(即AOSP源码存放位置):
```bash
mkdir ~/aosp
cd ~/aosp
```

初始化仓库:
```bash
repo init -u https://mirrors.tuna.tsinghua.edu.cn/git/AOSP/platform/manifest
```

如果需要某个特定的 Android 版本([版本列表](https://source.android.com/docs/setup/about/build-numbers#source-code-tags-and-builds)):
```bash
# 这里我指定了Android 13
repo init -u https://mirrors.tuna.tsinghua.edu.cn/git/AOSP/platform/manifest -b android-13.0.0_r40
```

同步源码:
```bash
repo sync -j4
```


## 编译AOSP
### 安装依赖:
```bash
sudo apt-get install git-core gnupg flex bison build-essential zip curl zlib1g-dev libc6-dev-i386 libncurses5 lib32ncurses5-dev x11proto-core-dev libx11-dev lib32z1-dev libgl1-mesa-dev libxml2-utils xsltproc unzip fontconfig
```

如果编译master分支, 不需要安装JDK, 否则需要自行安装:
```bash
sudo apt-get install openjdk-8-jdk
```

### 设置交换文件
如果你的机器内存大于16G可以跳过此步骤了.
TODO

### 初始化环境
```bash
source build/envsetup.sh
```
当然这些环境只对当前session有效, 所以如果你想持久化, 加入你的配置文件中:
```bash
echo source ~/aosp/build/envsetup.sh >> ~/.bashrc
```

`envsetup.sh`脚本导入了一些用于操作安卓源码的命令, 使用`hmm`可以查看所有命令:
```bash
hmm
```

### 下载驱动
为了刷入实际的设备(这里我使用pixel 5), 还需要下载一些[驱动.](https://developers.google.com/android/drivers)
选择与你编译版本相对应的驱动文件, 这里我选择了Pixel 5 binaries for Android 13.0.0 (TQ2A.230405.003.B2), 下载地址:
```txt
https://dl.google.com/dl/android/aosp/google_devices-redfin-tq2a.230405.003.b2-3cb07d86.tgz
https://dl.google.com/dl/android/aosp/qcom-redfin-tq2a.230405.003.b2-d50d20e6.tgz
```

下载完成得到两个压缩包:
```txt
qcom-redfin-tq2a.230405.003.b2-d50d20e6.tgz
google_devices-redfin-tq2a.230405.003.b2-3cb07d86.tgz
```

解压并将得到的sh脚本移入你下载时设置的工作目录, 此处我的工作目录是~/aosp:
```bash
tar -zxvf qcom-redfin-tq2a.230405.003.b2-d50d20e6.tgz
# 得到extract-qcom-redin.sh
tar -zxvf google_devices-redfin-tq2a.230405.003.b2-3cb07d86.tgz
# 得到extract-google_devices-redfin.sh
mv extract-qcom-redin.sh ~/aosp/
mv extract-google_devices-redfin.sh ~/aosp/
```

执行解压的脚本, 阅读许可证协议, 并输入`I ACCEPT`同意许可(tip: 执行脚本出现许可协议可以输入q跳过阅读, 然后输入`I ACCEPT`).
这两个脚本会把相关文件放在工作目录的`vendor/`目录下.

### 使用lunch选择构建目标
接下来可以使用`lunch`命令选择需要构建目标, 所有的构建目标都是`BUILD-BUILDTYPE`形式, `BUILDTYPE`是以下三种之一:

Buildtype | 场景
--- | --- 
user | 适用于生产
userdebug | 有root权限和debug, 适用于debug
eng | 开发配置, 有额外的debug工具

此处我需要刷写pixel 5, 所以使用以下命令([点击此处查看设备信息](https://source.android.com/docs/setup/build/running#selecting-device-build)):
```bash
lunch aosp_redfin-userdebug
```

### 构建
现在可以开始进行构建了, 执行`m`即可:
```bash
m
```
历经3个小时完成编译. 编译完成的结果在`~/aosp/out/target/product/redfin`下.


## 刷写设备
配置需要刷写镜像位置(即你的编译输出目录):
```bash
export android_product_out=~/aosp/out/target/product/redfin
```

配置[用户组](https://developer.android.com/studio/run/device#setting-up)相关, 完成后需要刷新用户组信息(重新登录或重启, 通过`id`命令查看是否成功):
```bash
sudo usermod -aG plugdev $LOGNAME
sudo apt-get install android-sdk-platform-tools-common
```
如未正确配置用户组, 后续步骤会出现以下错误:
```bash
error: insufficient permissions for device: missing udev rules? user is in the plugdev group
See [http://developer.android.com/tools/device.html] for more information
```

如果你尚未拥有`fastboot`和`adb`, 可以在`~/aosp`目录下使用`make`构建:
```bash
make fastboot adb
# 编译结果在~/aosp/out/host/linux-x86/bin下
cd ~/aosp/out/host/linux-x86/bin
# 放入可执行路径
cp fastboot adb ~/bin
```

在正式开始之前, 确保你的设备开启了oem, 开发者模式以及USB调试.

进入fastboot模式:
```bash
adb reboot bootloader
```

解锁bootloader:
```bash
fastboot flashing unlock
# 在屏幕上确认解锁
```

刷写设备: 
```bash
fastboot flashall -w
```
最后你终于得到了一台运行AOSP的pixel 5...


## 阅读源码
如果你想要用IDEA打开源码, 推荐使用[aidegen](https://android.googlesource.com/platform/tools/asuite/+/refs/heads/master/aidegen/README.md).

首先配置一下环境:
```bash
# 到你的源码根目录
cd ~/aosp
source build/envsetup.sh
# 一定要设置版本
lunch aosp_redfin-userdebug
```

这里我只打开`frameworks/base`和`packages/modules/Bluetooth/`:
```bash
# -i 指定ide类型, j=IntelliJ s=Android Studio e=Eclipse c=CLion v=VS Code
aidegen frameworks/base packages/modules/Bluetooth/ -i j
```
具体的命令查看aidegen的[官方文档](https://android.googlesource.com/platform/tools/asuite/+/refs/heads/master/aidegen/README.md)


## 参考文档
[清华AOSP使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/AOSP/)

[Android版本列表](https://source.android.com/docs/setup/about/build-numbers#source-code-tags-and-builds)

[AOSP官方下载文档](https://source.android.com/docs/setup/download/downloading)

[编译AOSP](https://source.android.com/docs/setup/build/building)

[刷写Android设备](https://source.android.com/docs/setup/build/running)

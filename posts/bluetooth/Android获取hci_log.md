---
title: 安卓获取HCI log
description: 安卓获取
date: 2023-04-20
tags:
  - 蓝牙
  - HCI
---

## 前置工作:
### 安装adb:
下载[SDK Platform-Tools](https://developer.android.com/studio/releases/platform-tools),
将解压出来的adb放到可执行路径, mac可以放到如下位置:
```bash
sudo cp adb /usr/local/bin/
```

### 配置btsnooz.py
- 下载[btsnooz.py](https://cs.android.com/android/platform/superproject/+/master:packages/modules/Bluetooth/system/tools/scripts/btsnooz.py)用于提取log

如果你需要btsnooz.py可以直接执行, 修改btsnooz.py文件的首行为你自己的python地址:
```python
#!/usr/bin/python3
```

给btsnooz.py文件添加可执行属性:
```bash
chmod +x btsnooz.py
```

将btsnooz.py添加到你的可执行路径, mac可以放到如下位置:
```bash
sudo cp btsnooz.py /usr/local/bin/
```


## 获取log

首先安卓手机开启开发者模式和USB调试.
- 使用adb获取bug report:
```bash
adb shell dumpsys bluetooth_manager > BUG_REPORT.txt
```

- 使用btsnooz.py提取snoop log:
```bash
btsnooz.py BUG_REPORT.txt > BTSNOOP.log
````

- 转换为cfa文件直接修改后缀即可.
```bash
cp BTSNOOP.log BTSNOOP.cfa
```

## TIP
[官方获取log步骤介绍](https://source.android.com/docs/core/connect/bluetooth/verifying_debugging#debugging-with-bug-reports)

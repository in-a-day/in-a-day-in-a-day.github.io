---
title: 编译AOSP13蓝牙模块
description: 编译AOSP13蓝牙模块
date: 2023-05-05
tags:
  - 蓝牙
  - AOSP
---

自AOSP13开始, 蓝牙模块移动到了`packages/modules/Bluetooth`下.

执行以下命令, 将会生成`$OUT/system/apex/com.android.btservices.apex`:
```bash
m com.android.btservices
```

通过adb安装apex:
```bash
adb install $OUT/system/apex/com.android.btservices.apex
```

关于是否可以单编替换jar包, so等还需要进一步的研究...

---
title: 编译AOSP12蓝牙模块
description: 编译AOSP12蓝牙模块
date: 2024-01-21
tags:
  - 蓝牙
  - AOSP
---

## 编译/system/bt
在`/system/bt`下执行`mm`编译蓝牙模块，将会生成`$OUT/system/lib64/libbluetooth.so`

通过adb将文件推送到手机上:
```bash
adb push $OUT/system/lib64/libbluetooth.so /system/lib64/
```

如果出现权限问题：
failed to copy ... to ... : Read-only file system

按以下步骤解决：
```bash
adb root
adb disable-verity
adb reboot
adb root
adb remount
```

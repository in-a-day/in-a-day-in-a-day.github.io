---
title: Android蓝牙代码结构
description: Android蓝牙代码结构
date: 2023-04-23
tags:
  - 蓝牙
---

## 写在前面: 
本文的代码结构基于Android 12(android-12.0.0_r34).

## 结构
### 应用层代码
在aosp中`Settings`中的蓝牙代码属于上层的应用层代码, 通过调用`android.bluetooth`中的api来实现功能: 
位于`packages/apps/Settings/src/com/android/settings/bluetooth/`下

### 蓝牙系统服务
`packages/apps/Bluetooth/`下定义了蓝牙service和profile, 该系统服务被打包为一个Android app.

### frameworks层
`frameworks/base/core/java/android/bluetooth/`下定义了一系列管理蓝牙的功能.

### JNI
JNI用于调用蓝牙协议栈, 位于`packages/apps/Bluetooth/jni`

### 蓝牙协议栈
协议栈的实现位于`system/bt`下.


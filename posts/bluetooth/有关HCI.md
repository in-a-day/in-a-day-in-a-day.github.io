---
title: 有关HCI
description: 有关HCI
date: 2023-04-16
tags:
  - 蓝牙
  - HCI
---

写在前面:
HCI: Host Controller Interface, 定义了Host与Controller交互的接口.
Command用于host指示controller执行一些特定的操作(如读取本地设备名称), Event由controller产生通知host一些特定的事件发生(例如建立连接成功). Event可能是本地controller对command的响应, 也可能是其他蓝牙设备的event.

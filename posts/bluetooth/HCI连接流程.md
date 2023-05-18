---
title: HCI连接流程
description: HCI连接流程
date: 2023-05-17
tags:
  - HCI
  - Bluetooth
---

## 写在前面
本文简单描述从HCI_Reset到完成ACL连接的流程.

## 流程
一切从HCI_Reset开始:
![](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/202305172350283.png)

安卓设备重启蓝牙调用该命令.

读取版本信息:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230517235520.png)

读取当前设备的地址:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230517235650.png)

读取本地设备支持的命令:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230517235746.png)

开启简单配对模式:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518000315.png)

有关于Simple Pairing Mode主要有以下特性:
- Just Works
- Numeric Comparison
- Out of Band (OOB) Pairing
- Passkey Entry
- TODO具体描述这些特性

设置Host支持的事件:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518000611.png)

写入链接策略:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518000718.png)

设置查询结果事件返回格式:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518000829.png)

设置Page Scan类型:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518000911.png)

设置Inquiry Scan类型:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518000948.png)

设置设备类型:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518001155.png)

设置连接超时时间:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518001225.png)

读取本地设备名称, 返回空:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518001306.png)

写入本地设备名:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518001352.png)

配置查询扫描的interval和window大小:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518001445.png)

配置连接扫描的interval和window大小:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518001537.png)

启用查询扫描和连接扫描:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518001638.png)

开启查询扫描:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518001714.png)

取消查询扫描:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518001801.png)
通常在进行连接前可以取消查询扫描, 这个操作比较耗时

删除指定设备的link key:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518001948.png)

获取远程设备名:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518002056.png)
HCI_Command_Status表示这个命令成功执行.

远程设备通知其所支持的特性:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518002347.png)

远程设备响应获取名称:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518002428.png)

接下来开始创建连接:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518002605.png)

创建连接完成, 过程中并未请求认证(认证的请求可以在连接过程中, 也可以在连接后), 响应携带Connection_Handle表示此次连接:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518002849.png)

读取远程设备的版本信息:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518002940.png)

发起认证请求:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518003008.png)

Controller请求link key(携带远程设备的BR_ADDR):
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518003053.png)

不存在link key:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518003202.png)

请求本地设备的IO能力:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518003321.png)

回复当前设备的IO能力:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518003457.png)

TODO: 具体的IO能力分类

终于接收到了读取远程设备的版本信息, 可以看到协议栈是5.0:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518003618.png)

请求远程设备支持的特性:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518003732.png)

远程设备IO能力信息,(连接的是耳机):
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518003824.png)

远程设备响应了支持的特性:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518003953.png)

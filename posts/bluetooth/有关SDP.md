---
title: 有关SDP
description: 有关SDP
date: 2023-05-22
tags:
  - bluetooth
---

## 写在前面
本文讨论基于L2CAP传输的SDP.

## SDP
服务发现协议: Service Discover Protocal. 用于设备之间的服务发现.

### Service Record
描述服务包含的详细信息. 由一组属性组成(和数据库的一行记录类似).
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230522235401.png)

### Service Attribute
描述了服务的属性(如ServiceName表示服务代表的名称), 由属性ID和属性值组成.
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230523001354.png)


## SDP举例
SDP发起L2CAP连接, 完成连接返回目标CID:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230523001832.png)

查询PnPInfo:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230523002137.png)

PnPInfo主要是设备厂商, 版本等信息:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230523003146.png)


## 关于如何确定SDP是本地设备发起还是远程设备发起:
如果连接时两个设备的Role, 直接从Role就可看出(在此次连接中, 我的本地设备角色是Central):
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230523002830.png)

也可以从hci packet来源判断, 来源于Host是本地设备发起, 来源于Controller是远程设备发起:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230523002955.png)

---
title: HFP和RFCOMM
description: HFP和RFCOMM
date: 2023-06-01
tags:
  - bluetooth
---

## HFP
免提协议: Hands-Free Profile. 提供电话通信的音频和控制功能.

![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230601224759.png)

### HFP中的角色
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230601225501.png)

HFP有两个角色:
- Audio Getaway(AG):   主要是提供音频并处理HF发送的命令(例如处理接听或挂断电话的命令). 通常是手机.
- Hands-Free unit(HF):  接收AG发送的音频并发送控制命令到AG(例如通过耳机接听或挂断电话). 通常是车机耳机等.


## HFP连接
首先通过SDP发现HFP:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230604230806.png)

建立RFCOMM连接(HFP使用RFCOMM作为传输协议):
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230604230844.png)

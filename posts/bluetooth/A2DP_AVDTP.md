---
title: A2DP和AVDTP
description: A2DP和AVDTP
date: 2023-05-23
tags:
  - bluetooth
---

## A2DP
高级音频分发协议: Advanced Audio Distribution Profile

### A2DP角色: 
A2DP分为两个角色:
- Source(SRC): 发送音频的一方
- Sink(SNK): 接收音频的一方
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230524001027.png)


通常在手机连接耳机播放音乐, 手机端作为SRC, 耳机端作为SNK.

而音频数据的分发需要通过AVDTP.
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230524001332.png)

## AVDTP
音频/视频分发传输协议: Audio/Video Distribution Transport Protocol.
用于传输音频视频流.

## btsnoop中的A2DP和AVDTP
本地设备SDP查询远程设备Sink服务信息:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230524001919.png)

L2CAP发起AVDTP连接, 用于控制传输AVDTP本身信息:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230524002055.png)

L2CAP连接完成:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230524002229.png)

AVDTP请求发现远程设备信息, 查找远程设备可用的音视频服务:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230524002305.png)

远程设备返回可用信息(ACP(Acceptor) Stream Endpoint):
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230524002610.png)

根据ACP Stream Endpoint ID查询具体的信息:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230524002717.png)

返回ACP具体信息, 包含编码信息等:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230524003123.png)

协商设置配置信息:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230524003634.png)

AVDTP_OPEN开启音频数据流传输:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230524004316.png)

远程设备响应开启后, 本地设备L2CAP创建一个新的L2CAP连接用于音频数据传输:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230524004452.png)


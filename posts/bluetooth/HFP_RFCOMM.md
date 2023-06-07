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

## Service Level Connection Establishment 
在完成RFCOMM链路连接后, 进行初始化`Service Level Connection`:
1. 在完成RFCOMM链路连接后, HFP进行初始化过程, 首先HF向AG发送AT指令(`AT+BRSF`)检索AG的特性, 并携带自己支持的特性:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230605225211.png)
  AG回复`+BRSF`告知HF其支持的特性:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230605230318.png)
### AG和HF的特性解释(TODO 补充完整)
#### HF
- `Call waiting or 3-way calling`: 呼叫等待或三方通话
	-  呼叫等待: 允许用户在通话时接收另一个来电
	-  三方通话: 允许用户同时和其他两个用户进行通话.
- `EC and/or NR function`: 回声消除和/或噪声抑制
	- EC(Echo Cancellation): 减小或消除音频信号中的回声.
	- NR(Noise Reduction): 减小音频信号中的背景噪声(如车辆噪声, 风声等).
	- HF通过发送`AT+NREC=0`关闭这些功能, 发送`AT+NREC=1`开启(NREC: Noise Reduction and Echo Cancelling).
- `CLI presentation capability`: 来电显示
	- HF通过发送`AT+CLIP=0`禁用, `AT+CLIP=1`启用.
	- AG可以通过发送`+CLIP`携带来电信息给HF.
- `Voice recognition activation`: 语音识别激活, HF启动或关闭AG的`Voice Recognition Function`
    - 开启后, HF可以通过语音命令控制AG
	- HF发送`AT+BVRA=0`禁用, `AT+BVRA=1`激活
	- AG发送`+BVRA`报告激活状态
- `Remote volume control`: 远程音量控制, HF控制AG的音量.
- `Enhanced call status`: 增强的呼叫状态.
- `Enhanced call control`: 增强的呼叫控制.
- `Codec negotiation`: 音频编解码器协商.
    - 在进行通信时, AG与HF需要使用同一个音频编解码器.
- `HF Indicators`: HF可以向AG报告设备的一些状态信息, 如电池电量、信号强度等.
- `eSCO S4`: 
    - eSCO: Extended Synchronous Connection Oriented
    - S4: eSCO的一种特定设置, 定义了一些特定的参数, 用于提高音频传输的音质

#### AG
- `Voice recognition function`: 语音识别功能. AG识别用户语音指令功能. 例如用户通过语音进行拨打电话.


2. 如果HF和AG都支持`Codec negotiation`, 那么HF端发送`AT+BAC` 告知AG其支持的编解码器(TODO codec类别):
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230605231014.png)

3. HF发送`AT+CIND`获取`AG Indicators`(AG Indicators: 表示AG设备的一些特定状态或功能, 如电池电量、信号强度、通话状态):
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230605231702.png)
  AG发送`+CIND`返回支持的Indicators(TODO Indicators解释):
  ![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230605231843.png)
  HF发送`AG+CIND`获取AG Indicator的当前状态:
  ![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230605232706.png)
  AG返回Indicator当前状态:
  ![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230605232831.png)
  获取完AG Indicator当前状态后, HF发送`AT+CMER`命令启用AG中的`Indicators status update` 功能:
  ![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230605233505.png)
  在启用`Indicators status update`后, 如果HF和AG都支持`Call waiting and 3-way calling`(TODO 解释), HF发送`AT+CHLD=?`命令获取AG对于`Call waiting and 3-way calling`的支持信息:
  ![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230605234112.png)
  AG发送`+CHLD`返回相应的信息:
  ![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230605234152.png)
  
4. 如果HF支持`HF Indicator`, AG会获取HF的相关信息, 此处耳机不支持, 就不列举了...

**至此,  Service Level Connection建立完成.**


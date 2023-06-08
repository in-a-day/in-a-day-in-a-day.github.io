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
### AG和HF的特性解释
#### HF
- `EC and/or NR function`: 回声消除和/或噪声抑制
    - EC(Echo Cancellation): 减小或消除音频信号中的回声.
    - NR(Noise Reduction): 减小音频信号中的背景噪声(如车辆噪声, 风声等).
    - HF通过发送`AT+NREC=0`关闭这些功能(NREC: Noise Reduction and Echo Cancelling).
- `Call waiting or 3-way calling`: 呼叫等待或三方通话
    - 呼叫等待: 允许用户在通话时接收另一个来电
    - 三方通话: 允许用户同时和其他两个用户进行通话.
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
- `Three-way calling`: 三方通话
- `EC and/or NR function`: 回声消除和降噪.
- `Voice recognition function`: 语音识别功能. AG识别用户语音指令功能. 例如用户通过语音进行拨打电话.
- `In-band ring tone capability`: 带内铃声能力.
    - 支持这个能力时, 在有来电时, AG通过建立的音频连接(SCO或eSCO)向HF设备播放铃声.
    - 不支持的情况下, 在有来电时, AG通过AT指令`RING`通知HF设备, HF设备自己去产生铃声.
- `Attach a number to a voice tag`: 将一个电话与声音标签关联
    - 通常用于语音拨号, 语音识别
    - 例如将`张三`和电话`12345`关联, 用户说出`张三`后就拨打关联的电话.
- `Ability to reject a call`: 拒接来电能力
- `Extended error result codes`: 拓展错误结果码. AT指令操作失败后, 提供具体的失败原因.


2. 如果HF和AG都支持`Codec negotiation`, 那么HF端发送`AT+BAC` 告知AG其支持的编解码器:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230605231014.png)
### Codec分类
- CVSD: 一直存在的编解码器
- mSBC: HFP1.6引入, 相比于CVSD音质更好

3. HF发送`AT+CIND`获取`AG Indicators`(AG Indicators: 表示AG设备的一些特定状态或功能, 如电池电量、信号强度、通话状态):
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230605231702.png)
  AG发送`+CIND`返回支持的Indicators:
  ![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230605231843.png)
  HF发送`AG+CIND`获取AG Indicator的当前状态:
  ![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230605232706.png)
  AG返回Indicator当前状态:
  ![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230605232831.png)
  获取完AG Indicator当前状态后, HF发送`AT+CMER`命令启用AG中的`Indicators status update` 功能:
  ![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230605233505.png)
  在启用`Indicators status update`后, 如果HF和AG都支持`Call waiting and 3-way calling`, HF发送`AT+CHLD=?`命令获取AG对于`Call waiting and 3-way calling`的支持信息:
  ![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230605234112.png)
  AG发送`+CHLD`返回相应的信息:
  ![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230605234152.png)
### 关于Indicator
- `Call Status`: 表示设备是否正在进行电话呼叫
- `Call Setup`: 设备的呼叫设置状态
- `Service availability`: 是否有可用的移动电话服务
- `Signal`: 设备的信号强度
- `Roaming`: 设备是否正在漫游
- `Battery charge`: 设备的电池充电状态
- `Call held`: 设备的呼叫保持状态


  
4. 如果HF支持`HF Indicator`, AG会获取HF的相关信息, 此处耳机不支持, 就不列举了...

**至此,  Service Level Connection建立完成.**


## AT指令
### AT+BRSF
Bluetooth Retrive Supported Features.
通知AG端HF所支持的特性, 并请求AG支持的特性.
- 语法: `AT+BRSF=<HF supported features bitmap>`
- HF supported features bitmap可取以下值:

bit位 | 特性
--- | ---
0 | EC and/or NR function
1 | Three-way calling
2 | CLI presentation capability
3 | Voice recognition activation
4 | Remote volume control
5 | Enhanced call status
6 | Enhanced call
7 | Codec negotiation
8 | HF Indicators
9 | eSCO S4 Settings Supported
10 | Enhanced Voice Recognition Status
11 | Voice Recognition Text
12-31 | Reserved for future use

### +BRSF
> AG回复`AT+BRSF`指令, 通知HF端AG所支持的特性.
- 语法: `+BRSF: <AG supported features bitmap>`
- AG supported features bitmap可以取以下值:

bit位 | 特性
--- | ---
0 | Three-way calling
1 | EC and/or NR function
2  | Voice recognition function
3  | In-band ring tone capability
4  | Attach a number to a voice tag
5  | Ability to reject a call
6  | Enhanced call status
7  | Enhanced call control
8  | Extended Error Result Codes
9  | Codec negotiation
10  | HF Indicators
11  | eSCO S4 Settings Supported
12  | Enhanced Voice Recognition Status
13  | Voice Recognition Text
14-31  | Reserved for future

### AT+BAC
Bluetooth Available Codec.
> HF通知AG端其所支持的codec.
- 语法: `AT+BAC= [<u1>[,<u2>[,...[,<un>]]]]`, 这里的u1,u2..un是codec的id.
- 常见的codec: CVSD(id = 1), mSBC(id = 2)

### AT+CIND
Call INDicators.
> 有关AG indicators的AT命令
- `AT+CIND?`: 读取AG所支持的indicators.
- `AT+CIND=?`: 获取当前AG indicators的状态
- HFP目前只有7个indicator: 
    - service
    - call
    - callsetup
    - callheld
    - signal
    - roam
    - battchg

### +CIND
> 回复当前AG indicators的状态

### AT+CMER
Call Mode Event Reporting.
> 主要是用于控制AG端如何报告indicators的变化.
- `AT+CMER=3,0,0,1`: 激活AG端`indicator events reporting`
- `AT+CMER=3,0,0,0`: 关闭AG端`indicator events reporting`

### +CIEV
Call Indicators EVent.(???)
> AG端主动报告indicators的变化给HF.

### AT+CHLD
TODO

### AT+NREC
Noise Reduction and Echo Canceling.
> 关闭NREC功能.
- 语法: `AT+NREC=<nrec>`
- 目前只有`AT+NREC=0`用于关闭NREC.

### AT+VGM
Voice Gain of Microphone.
> HF向AG报告其麦克风的增益级别.
- 语法: `AT+VGM=<gain>`
- gain的取值在0-15之间.

### AT+VGS
Voice Gain of Speaker.
> HF向AG报告其扬声器的增益级别.
- 语法: `AT+VGS=<gain>`
- gain取值在0-15之间.

### AT+BIA
Bluetooth Indicators Activation.
> 激活或关闭Indicators.
- 语法: `AT+BIA=[[<indrep 1>][,[<indrep 2>][,…[,[<indrep n>]]]]]]`
- 1代表激活, 0代表关闭
- 如`AT+BIA=1,1,1,1,1,1,1`, 激活全部的indicator.

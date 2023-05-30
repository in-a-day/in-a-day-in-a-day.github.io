---
title: AVRCP和AVCTP
description: AVRCP和AVCTP
date: 2023-05-24
tags:
  - bluetooth
---

## AVRCP
音视频远程控制协议: Audio/Video Remote Control Profile.
实现对媒体播放的远程控制, 如播放, 暂停, 上一曲, 下一曲等.

### 角色
AVRCP有两个角色:
- **Controller(CT)**: 远程控制设备，通常是具备控制能力的设备, 向AVRCP Target发送命令.
- **Target(TG)**: 音视频播放设备, 可以接收来自AVRCP Controller的控制命令并执行相应的操作.

![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230525001441.png)
PC发送命令控制VCR, VCP接收命令并做出响应.

AVRCP数据由AVCTP传输.

## AVCTP
音视频控制传输协议: Audio/Video Control Transport Protocol.
用于传输与音视频播放相关的控制命令和通知.

AVCTP分为两个部分:
- **AVCTP Control**: 用于音频/视频播放的远程控制操作.
- **AVCTP Browse**: 用于浏览音频/视频内容的功能.

## btsnoop中的AVRCP和AVCTP
远程设备(耳机)发起SDP, 询问当前设备AVRCP Target服务:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230525003301.png)

手机端响应:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230525003405.png)

手机询问耳机支持的AVRCP特性:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230525003608.png)

耳机端响应:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230525003742.png)

接下来L2CAP建立AVCTP连接:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230525004036.png)


## AVRCP中的交互

首先手机端做CT向耳机注册`EVENT VOLUME CHANGED` 事件:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230529233900.png)

耳机回复当前音量:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230529233957.png)

手机端调整音量设置绝对音量:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230529234054.png)

耳机端回复绝对音量设置:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230529234134.png)

### 关于绝对音量
- 传统的音量: 调整音量是调整TG端生成的音源,  CT端无法调整自己的音量.
- 绝对音量: CT端可以调整自己的音量, CT与TG可以同步音量信息.


CT端(耳机)获取TG端(手机)支持的event:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230528233407.png)

手机端回复支持的事件:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230530221054.png)


### 关于Event Id
- EVENT_PLAYBACK_STATUS_CHANGED (0x01) 当前歌曲播放状态改变
track.
- EVENT_TRACK_CHANGED (0x02) 当前歌曲改变
- EVENT_TRACK_REACHED_END (0x03) 到达歌曲结尾
- EVENT_TRACK_REACHED_START (0x04) 到达歌曲开始
- EVENT_PLAYBACK_POS_CHANGED (0x05) 播放位置改变
- EVENT_BATT_STATUS_CHANGED (0x06) 电池状态改变
- EVENT_SYSTEM_STATUS_CHANGED (0x07) 系统状态改变
- EVENT_PLAYER_APPLICATION_SETTING_CHANGED (0x08) 播放器应用改变
- EVENT_NOW_PLAYING_CONTENT_CHANGED (0x09) 当前播放列表内容改变
- EVENT_AVAILABLE_PLAYERS_CHANGED (0x0a) 可用播放器改变
- EVENT_ADDRESSED_PLAYER_CHANGED (0x0b) 选中的播放器改变
  - 如从一个播放器切换到另一个播放器
- EVENT_UIDS_CHANGED (0x0c) UIDs(Unique Identifiers)改变
- EVENT_VOLUME_CHANGED (0x0d) TG端本地音量改变
- 0x0e-0xFF Reserved for future use

CT端注册监听播放状态改变事件:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230530221306.png)

TG回复当前状态(中间态, 当状态改变时, TG还需要继续做出回复):
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230530221341.png)

最终TG播放状态改变通知CT:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230530221523.png)

### 有关CT, TG事件交互
通常分为三个步骤:
1. CT端发送注册监听事件到TG, 对应的ctype为NOTIFY
2. TG接收到CT的监听命令, 回复中间态,对应的Response为INTERIM
3. TG端发生了CT端监听的事件, CT进行通知TG, 对应的Response为CHANGED

接下来CT端发送用户按下暂停命令:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230530222333.png)

TG响应收到命令:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230530222357.png)

CT发送用户松开按钮:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230530222420.png)

TG响应收到:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230530222435.png)

### 有关按钮命令
Operation code类型是: `PASS THROUGH` , Operation Id携带具体的操作类型: 如播放(play), 暂停(pause)等.  
用户一次点击分为两步:
- 按下(push)
- 松开(release)

每一步CT都会发送相应的命令, TG则响应命令


接下来CT发送播放命令(这里用户按下了两次, 第一次应用没有处理, 状态还是播放状态):
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230530223522.png)

下一曲:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230530223628.png)

上一曲:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230530223654.png)

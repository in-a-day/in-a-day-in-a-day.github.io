---
title: AVRCP和AVDTP
description: AVRCP和AVDTP
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
远程设备(耳机)发起SDP, 询问当前设备是否支持AVRCP Target?:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230525003301.png)

手机端响应:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230525003405.png)

手机询问耳机支持的AVRCP特性:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230525003608.png)

耳机端响应:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230525003742.png)

接下来L2CAP建立AVCTP连接:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230525004036.png)

## TODO
- AVRCP的categories

## AVRCP中的交互

### Event Id

CT端获取TG端支持的event:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230528233407.png)

### Event Id
- EVENT_PLAYBACK_STATUS_CHANGED (0x01) 更改当前歌曲播放状态
track.
- EVENT_TRACK_CHANGED (0x02) 更改当前歌曲
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

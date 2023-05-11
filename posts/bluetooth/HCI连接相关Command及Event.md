---
title: HCI连接相关Command及Event
description: HCI连接相关Command及Event
date: 2023-05-08
tags:
  - 蓝牙
  - HCI
---

## 写在前面
本文基于Bluetooth Core Specification 5.3。分类参考Bluetooth Core Specification 4.2。  
命令和事件不是完整的, 只是列举了一些常用的。

## 通用的Event
| Event                | 描述                                                                                   |
| --                   | --                                                                                     |
| HCI_Command_Complete | 用于传递每个HCI命令的返回状态和其他事件参数。                                          |
| HCI_Command_Status   | 用于表明根据Command_Opcode参数所描述的命令已经被接收，并且控制器正在执行此命令的任务。 |
| HCI_Hardware_Error   | 用于表明硬件的一些类型失败.                                                            |

------------------------------------------------

## 设备设置
| Command   | 描述                                                                                                                                                                              |
| --        | --                                                                                                                                                                                |
| HCI_Reset | 对于BR/EDR Controller, 重置HCI, Link Manager, Bluetooth radio. 对于LE Controller, 重置HCI, the Link Layer, and LE PHY. 通常Android设备开关蓝牙会调用此命令, 也会重置HCI的log文件. |

## Controller信息
这组的命令用于Host发现有关本地设备的信息。

| Command                              | 描述                                                 |
| --                                   | --                                                   |
| HCI_Read_Local_Version_Information   | 读取当前Controller的版本信息. 返回参数包含HCI版本等. |
| HCI_Read_Local_Supported_Commands    | 读取当前Controller支持的命令.                        |
| HCI_Read_Local_Supported_Features    | 读取本地设备支持的特性.                              |
| HCI_Read_Local_Extended_Features     | 读取本地设备支持的拓展特性.                          |
| HCI_Read_BD_ADDR                     | 读取本地设备地址.                                    |
| HCI_LE_Read_Local_Supported_Features | 读取本地Controller支持的LE特性                       |
| HCI_LE_Read_ Supported_States        | 读取本地LE Controller当前支持状态和角色组合.         |

------------------------------------------------

## Controller配置
这组命令和事件用于配置全局的配置参数.

| 类型    | 名称                                | 描述                                                                                                                                  |
| --      | --                                  | --                                                                                                                                    |
| Command | HCI_Read_Local_Name                 | 读取用户友好的设备名称, 通常就是Android设备展示的蓝牙名称                                                                             |
| Command | HCI_Write_Local_Name                | 修改用户友好的设备名称.                                                                                                               |
| Command | HCI_Read_Class_of_Device            | 读取设备类配置参数值, 值用于向其他设备表示本地设备的功能.                                                                             |
| Command | HCI_Write_Class_of_Device           | 写入设备类配置参数值.                                                                                                                 |
| Command | HCI_Read_Scan_Enable                | 读取Scan Enable配置参数值, 该参数控制BR/EDR Controller是否定期(period)扫描其他BR/EDR控制器发送的连接(page)尝试和/或查询(inquiry)请求. |
| Command | HCI_Write_Scan_Enable               | 配置Scan Enable参数.                                                                                                                  |
| Command | HCI_Read_Extended_Inquiry_Response  | 读取BR/EDR Controller在查询(inquiry)响应期间发送的扩展查询(inquiry)响应数据包中的数据。                                               |
| Command | HCI_Write_Extended_Inquiry_Response | 写入在查询(inquiry)响应期间发送的扩展查询(inquiry)响应数据包中的数据。                                                                |

### HCI_Write_Scan_Enable
- 参数
  - Scan_Enable: 
    - 0x00: No Scans enabled. Default.
    - 0x01: Inquiry Scan enabled. Page Scan disabled.
    - 0x02: Inquiry Scan disabled. Page Scan enabled.
    - 0x03: Inquiry Scan enabled. Page Scan enabled.

------------------------------------------------

## 设备发现
这组commands和events允许设备发现周围的设备.

| 类型    | 名称                            | 描述                                                                             |
| --      | --                              | --                                                                               |
| Command | HCI_Inquiry                     | 使本地设备进入Inquiry Mode, 用于查询周围的设备                                   |
| Command | HCI_Inquiry_Cancel              | 取消查询, 通常Android设备在进行连接前会取消查询, 因为查询操作是一个比较耗时操作. |
| Event   | HCI_Inquiry_Result              | 查询结果事件, 通常包含远程设备的地址, 设备类等                                   |
| Event   | HCI_Extended_Inquiry_Result     | 拓展的查询结果                                                                   |
| Event   | HCI_Inquiry_Complete            | 表示查询结束                                                                     |
| Event   | HCI_Inquiry_Result_with_RSSI    | 表示在查询的过程有一个或多个BR/EDR Controller做出了回应.                         |
| Command | HCI_Periodic_Inquiry_Mode       | 配置BR/EDR Controller进行基于特定周期范围的自动查询。                            |
| Command | HCI_Exit_Periodic_Inquiry_Mode  | 在当前设备处于Period Inquiry Mode时退出该模式                                    |
| Command | HCI_Read_Inquiry_Scan_Activity  | 读取Inquiry_Scan_Interval和Inquiry_Scan_Window配置参数值。                       |
| Command | HCI_Write_Inquiry_Scan_Activity | 设置Inquiry_Scan_Interval和Inquiry_Scan_Window配置参数值。                       |
| Command | HCI_Read_Inquiry_Scan_Type      | 读取Inquiry_Scan_Type配置参数值，该值用于设置normal/interlaced扫描。             |
| Command | HCI_Write_Inquiry_Scan_Type     | 设置Inquiry_Scan_Type配置参数值。                                                |
| Command | HCI_Read_Inquiry_Mode           | 读取Inquiry Mode配置参数值                                                       |
| Command | HCI_Write_Inquiry_Mode          | 写入Inquiry Mode配置参数值                                                       |


### Inquiry Scan相关参数
- Inquiry_Scan_Interval表示两次查询扫描之间的间隔
- Inquiry_Scan_Window表示一次查询扫描的时长

所以Inquiry_Scan_Window的值不能超过Inquiry_Scan_Interval的值.
- TODO: 具体的取值范围

### HCI_Read_Inquiry_Mode
- TODO: 各个mode的解释说明
Inquiry Mode有以下几种：
- 0x00: Standard Inquiry Result event format 标准的查询结果事件格式
- 0x01: Inquiry Result format with RSSI
- 0x02: Inquiry Result with RSSI format or Extended Inquiry Result format

------------------------------------------------

## 连接建立
这组命令和事件用于在设备间建立连接。

| 类型    | 名称                                | 描述                                                                  |
| ---     | ---                                 | ---                                                                   |
| Command | HCI_Create_Connection               | 尝试创建与一个给定BR_ADDR的远程设备间的ACL连接                        |
| Event   | HCI_Connection_Request              | 表示正在尝试建立新传入的BR/EDR连接                                    |
| Command | HCI_Accept_Connection_Request       | 接受新传入的BR/EDR连接请求                                            |
| Command | HCI_Reject_Connection_Request       | 拒绝新传入的BR/EDR连接请求                                            |
| Command | HCI_Create_Connection_Cancel        | 请求取消正在进行的创建连接操作                                        |
| Event   | HCI_Connection_Complete             | 表示已经建立了新的连接                                                |
| Command | HCI_Disconnect                      | 终止已经存在的连接（BR/EDR或LE)                                       |
| Event   | HCI_Disconnection_Complete          | 发生于一个连接已经终止时                                              |
| Command | HCI_Read_Page_Timeout               | 读取Page_Timeout配置参数，该参数表示等待远程设备响应的最大时间        |
| Command | HCI_Write_Page_Timeout              | 写入Page_Timeout配置参数                                              |
| Command | HCI_Read_Page_Scan_Activity         | 读取Page_Scan_Interval和Page_Scan_Window参数
| Command | HCI_Write_Page_Scan_Activity        | 设置Page_Scan_Interval和Page_Scan_Window参数                          |
| Command | HCI_Read_Page_Scan_Type             | 读取Page Scan类型：normal或interlaced                                 |
| Command | HCI_Write_Page_Scan_Type            | 设置Page Scan类型                                                     |
| Command | HCI_Read_Connection_Accept_Timeout  | 读取Connection_Accept_Timeout配置参数                                 |
| Command | HCI_Write_Connection_Accept_Timeout | 设置Connection_Accept_Timeout配置参数                                 |
| Command | HCI_Read_Hold_Mode_Activity         | 读取Hold_Mode_Activity参数值, 该参数表示在Hold Mode下哪些活动需要挂起 |
| Command | HCI_Write_Hold_Mode_Activity        | 设置Hold_Mode_Activity参数值                                          |

### Page Scan参数
- Page_Scan_Interval: 两次连接扫描之间的间隔
- Page_Scan_Window: 一次连接扫描的时长

### Connection_Accept_Timeout参数
该参数允许Controller在经过指定的时间段后自动拒绝连接（如果新的连接未被接受）。
时间是从BR/EDR控制器发送HCI_Connection_Request事件或LE控制器发送HCI_LE_CIS_Request事件起，直到控制器自动拒绝传入连接的持续时间。

### Hold_Mode_Activity参数
- 0x00 Maintain current Power State.
- 0x01 Suspend Page Scan.
- 0x02 Suspend Inquiry Scan.
- 0x04 Suspend Periodic Inquiries.
- 0x08-0xFF Reserved for future use.


## 远程信息
这组命令和事件用于发现远程设备的信息.

| 类型    | 名称                                         | 描述                       |
| --      | --                                           | --                         |
| Command | HCI_Remote_Name_Request                      | 读取远程设备的名称         |
| Command | HCI_Remote_Name_Request_Cancel               | 取消读取远程设备名称       |
| Event   | HCI_Remote_Name_Request_Complete             | 读取远程设备名称完成事件   |
| Command | HCI_Read_Remote_Supported_Features           | 读取远程设备支持的特性     |
| Event   | HCI_Read_Remote_Supported_Features_Complete  | 返回远程设备支持的特性     |
| Command | HCI_Read_Remote_Extended_Features            | 读取远程设备支持的拓展特性 |
| Event   | HCI_Read_Remote_Extended_Features_Complete   | 返回远程设备支持的拓展特性 |
| Command | HCI_Read_Remote_Version_Information          | 读取远程设备版本信息       |
| Event   | HCI_Read_Remote_Version_Information_Complete | 返回远程设备版本信息       |


## 连接状态
这组命令和事件用于链接配置，主要是支持低电量操作

| 类型    | 名称            | 描述                                                         |
| --      | --              | --                                                           |
| Event   | HCI_Mode_Change | 表示mode改变，有三种mode: Active mode, Hold mode, Sniff mode |
| Command | HCI_Hold_Mode   | 切换为Hold mode                                              |
| Command | HCI_Sniff_Mode  | 切换为Sniff mode                                             |




## TODO
- Inquiry_Scan_Type的normal和interlaced



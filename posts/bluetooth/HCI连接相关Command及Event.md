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
命令和事件不是完整的, 只是列举了一些常见的。

## 通用的Event
| Event                | 描述                                                                                   |
| --                   | --                                                                                     |
| HCI_Command_Complete | 用于传递每个HCI命令的返回状态和其他事件参数。                                          |
| HCI_Command_Status   | 用于表明根据Command_Opcode参数所描述的命令已经被接收，并且控制器正在执行此命令的任务。 |
| HCI_Hardware_Error   | 用于表明硬件的一些类型失败.                                                            |


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


## Controller配置
这组命令和事件用于配置全局的配置参数.

| 类型    | 名称                                | 描述                                                                                                                                  |
| --      | --                                  | --                                                                                                                                    |
| Command | HCI_Read_Local_Name                 | 读取用户友好的设备名称, 通常就是Android设备展示的蓝牙名称                                                                             |
| Command | HCI_Write_Local_Name                | 修改用户友好的设备名称.                                                                                                               |
| Command | HCI_Read_Class_of_Device            | 读取设备类配置参数值, 值用于向其他设备表示本地设备的功能.                                                                             |
| Command | HCI_Write_Class_of_Device           | 写入设备类配置参数值.                                                                                                                 |
| Command | HCI_Read_Scan_Enable                | 读取Scan_Enable配置参数值, 该参数控制BR/EDR Controller是否定期(period)扫描其他BR/EDR控制器发送的连接(page)尝试和/或查询(inquiry)请求. |
| Command | HCI_Write_Scan_Enable               | 配置Scan_Enable参数.                                                                                                                  |
| Command | HCI_Read_Extended_Inquiry_Response  | 读取BR/EDR Controller在查询(inquiry)响应期间发送的扩展查询(inquiry)响应数据包中的数据。                                               |
| Command | HCI_Write_Extended_Inquiry_Response | 写入在查询(inquiry)响应期间发送的扩展查询(inquiry)响应数据包中的数据。                                                                |


## 设备发现
这组commands和events允许设备发现周围的设备.

| 类型    | 名称                            | 描述                                                                             |
| --      | --                              | --                                                                               |
| Command | HCI_Inquiry                     | 使本地设备进入Inquiry模式, 用于查询周围的设备                                   |
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
| Command | HCI_Read_Inquiry_Mode           | 读取Inquiry_Mode配置参数值                                                       |
| Command | HCI_Write_Inquiry_Mode          | 写入Inquiry_Mode配置参数值                                                       |


## 连接建立
这组命令和事件用于在设备间建立连接。

| 类型    | 名称                                | 描述                                                                      |
| ---     | ---                                 | ---                                                                       |
| Command | HCI_Create_Connection               | 尝试创建与一个给定BR_ADDR的远程设备间的ACL连接                            |
| Event   | HCI_Connection_Request              | 表示正在尝试建立新传入的BR/EDR连接                                        |
| Command | HCI_Accept_Connection_Request       | 接受新传入的BR/EDR连接请求                                                |
| Command | HCI_Reject_Connection_Request       | 拒绝新传入的BR/EDR连接请求                                                |
| Command | HCI_Create_Connection_Cancel        | 请求取消正在进行的创建连接操作                                            |
| Event   | HCI_Connection_Complete             | 表示已经建立了新的连接, 连接建立后将会返回一个Connection_Handle标识这个连接 |
| Command | HCI_Disconnect                      | 终止已经存在的连接（BR/EDR或LE)                                           |
| Event   | HCI_Disconnection_Complete          | 发生于一个连接已经终止时                                                  |
| Command | HCI_Read_Page_Timeout               | 读取Page_Timeout配置参数，该参数表示等待远程设备响应的最大时间            |
| Command | HCI_Write_Page_Timeout              | 写入Page_Timeout配置参数                                                  |
| Command | HCI_Read_Page_Scan_Activity         | 读取Page_Scan_Interval和Page_Scan_Window参数
| Command | HCI_Write_Page_Scan_Activity        | 设置Page_Scan_Interval和Page_Scan_Window参数                              |
| Command | HCI_Read_Page_Scan_Type             | 读取Page Scan类型：normal或interlaced                                     |
| Command | HCI_Write_Page_Scan_Type            | 设置Page Scan类型                                                         |
| Command | HCI_Read_Connection_Accept_Timeout  | 读取Connection_Accept_Timeout配置参数                                     |
| Command | HCI_Write_Connection_Accept_Timeout | 设置Connection_Accept_Timeout配置参数                                     |
| Command | HCI_Read_Hold_Mode_Activity         | 读取Hold_Mode_Activity参数值, 该参数表示在Hold Mode下哪些活动需要挂起     |
| Command | HCI_Write_Hold_Mode_Activity        | 设置Hold_Mode_Activity参数值                                              |




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

| 类型    | 名称                                  | 描述                                                         |
| --      | --                                    | --                                                           |
| Event   | HCI_Mode_Change                       | 表示mode改变，有三种mode: Active mode, Hold mode, Sniff mode |
| Command | HCI_Hold_Mode                         | 切换为Hold mode                                              |
| Command | HCI_Sniff_Mode                        | 切换为Sniff mode                                             |
| Command | HCI_Sniff_Subrating                   | 为本地设备配置sniff子速率参数                                |
| Event   | HCI_Sniff_Subrating                   | 通知host本地和远程的发送和接受延迟情况                       |
| Command | HCI_Exit_Sniff_Mode                   | 退出Sniff mode                                               |
| Command | HCI_Park_State                        | 改变Link manager行为, 使用本地或远程设备处于park状态         |
| Command | HCI_Exit_Park_State                   | 退出park状态进入激活模式                                     |
| Command | HCI_Read_Link_Policy_Settings         | 读取Link Policy设置参数                                      |
| Command | HCI_Write_Link_Policy_Settings        | 设置Link Policy设置参数                                      |
| Command | HCI_Read_Default_Link_Policy_Settings | 读取默认的Linck Policy设置参数                               |
| Command | HCI_Write_Default_Link_Policy_Settings | 设置默认的Linck Policy设置参数                               |


## Piconet结构
这组命令和事件用于查看和重新配置一个Piconet

| 类型    | 名称               | 描述                                                    |
| --      | --                 | --                                                      |
| Command | HCI_Role_Discovery | 用于host确定设备在特定的Connection_Handle上所扮演的角色 |
| Command | HCI_Switch_Role    | 切换连接角色                                            |
| Event   | HCI_Role_Change    | 表示角色已经切换                                        |


## PHYSICAL LINKS
这组命令和事件用于配置physical link

| 类型    | 名称                                 | 描述                                                                            |
| --      | --                                   | --                                                                              |
| Command | HCI_Read_Link_Supervision_Timeout    | 读取设备的Link Supervision Time配置参数的值. Controller使用该参数来确定链路丢失 |
| Command | HCI_Write_Link_Supervision_Timeout   | 配置Link Supervision Time配置参数                                               |
| Event   | HCI_Link_Supervision_Timeout_Changed | 表示Link Supervision Time改变                                                   |


## Flow Control
| 类型    | 名称                 | 描述                                                                               |
| --      | --                   | --                                                                                 |
| Command | HCI_Host_Buffer_Size | 用于host通知Controller HCI ACL和同步数据包的数据部分的最大值(从Controller发向host) |
| Command | HCI_Set_Event_Mask   | 控制HCI应当为Host生成那些事件                                                      |
| Command | HCI_Set_Event_Filter | 用于host指定不同的事件过滤器                                                       |



## 认证和加密
这组命令和事件用于设备间的认证以及连接加密.
| 类型    | 名称                                | 描述                                                                                                                  |
| --      | --                                  | --                                                                                                                    |
| Command | HCI_Read_Authentication_Enable      | 读取Authentication_Enable参数                                                                                         |
| Command | HCI_Write_Authentication_Enable     | 写入Authentication_Enable参数                                                                                         |
| Event   | HCI_Link_Key_Request                | 表示与指定BD_ADDR的设备连接需要link key                                                                               |
| Command | HCI_Link_Key_Request_Reply          | 用于回复Controller发起的Link Key请求事件,并指定Host存储的Link Key作为与其他由BD_ADDR指定的BR/EDR控制器连接的link key. |
| Command | HCI_Link_Key_Request_Negative_Reply | 用于回复Controller发起的Link Key请求事件, 表示Host并没有存储对应设备的Link Key                                        |
| Event   | HCI_PIN_Code_Request                | 表示需要pin code去创建一个新的link key |
| Command  | HCI_PIN_Code_Request_Reply | 回复Pin Code请求事件, 并指定连接所用的pin code |
| Command | HCI_PIN_Code_Request_Negative_Reply | 回复Pin Code请求事件, 表示无法为连接指定pin code |
| Event | HCI_Link_Key_Notification | 表示为连接已经创建了一个新的link key |
| Command | HCI_Authentication_Requested | 用于在两个关联设备之间建立认证 |
| Event | HCI_Authentication_Complete | 表示指定连接的认证已经完成 |
| Command | HCI_Set_Connection_Encryption | 用于开启和关闭link级加密 | 
| Event | HCI_Encryption_Change | 表示加密模式已经改变 |
| Command | HCI_Change_Connection_Link_Key | 用于强制连接的两个设备生成新的link key |
| Event | HCI_Change_Connection_Link_Key_Complete | 表示已完成link key修改 |
| Command | HCI_Read_PIN_Type | 读取Pin type配置 |
| Event | HCI_Write_PIN_Type | 写入Pin type配置 |
| Command | HCI_Read_Stored_Link_Key | 读取一个或多个存储在Controller的link key |
| Event | HCI_Return_Link_Keys | 返回HCI_Read_Stored_Link_Key读取的link key |
| Command | HCI_Write_Stored_Link_Key | 写入一个或多个link key到Controller |
| Command | HCI_Delete_Stored_Link_Key | 删除一个或多个存在Controller的link key |
| Command | HCI_IO_Capability_ Request_Reply | 回复Controller的IO Capability Request事件, 并指定当前Host的I/O能力 |
| Event | HCI_IO_Capability_Request | 表示在simple pairing过程中需要Host的I/O能力 |
| Event | HCI_IO_Capability_Response | 表示收到远程设备的I/O能力 |
| Command | HCI_User_Confirmation_Request_Reply | 回复User Confirmation Request事件, 表示用户选择了 `"是"` |
| Command |  HCI_User_Confirmation_Request_Negative_Reply | 回复User Confirmation Request事件, 表示用户选择了 `"否"` |
| Event | HCI_User_Confirmation_Request | 表示用户需要确认数值的内容 |
| Command | HCI_User_Passkey_Request_Reply | 回复User Passkey Request事件, 并携带用户输入的数值(passkey)用于SSP(Secure Simple Pairing) |
| Command | HCI_User_Passkey_Request_Negative_Reply | 回复User Passkey Request事件, 表示主机端无法提供passkey |
| Event | HCI_User_Passkey_Request | 表示passkey需要作为SSP的一部分 |
| Event | HCI_User_Passkey_Notification | 向Host提供用于给用户展示的passkey |
| Command | HCI_Read_Simple_Pairing_Mode | 读取Simple Pairing Mode参数 |
| Command | HCI_Write_Simple_Pairing_Mode | 写入Simple Pairing Mode参数 |
| Event | HCI_Keypress_Notification | 收到passkey通知后返回Host事件 |
| Command | HCI_IO_Capability_Request_Negative_Reply | 用于在Host接收到HCI IO Capability Request事件后, 拒绝配对尝试 |
| Command | HCI_Read_Encryption_Key_Size | 读取当前加密key的大小 |



## HCI配置参数
### Scan_Enable
控制BR/EDR Controller是否定期(period)扫描其他BR/EDR控制器发送的连接(page)尝试和/或查询(inquiry)请求.

取值:
- 0x00 No Scans enabled. Default.
- 0x01 Inquiry Scan enabled. Page Scan disabled.
- 0x02 Inquiry Scan disabled. Page Scan enabled.
- 0x03 Inquiry Scan enabled. Page Scan enabled.

### Inquiry_Scan_Interval
定义连续查询扫描间的时间间隔. 从上一次查询扫描开始到下一次查询扫描开始之间的时间间隔.

### Inquiry_Scan_Window
定义一次查询扫描的持续时长. 所以Inquiry_Scan_Window不能超过Inquiry_Scan_Interval.

### Inquiry_Scan_Type
表示查询扫描是否使用interlaced查询扫描:
- 0x00 Mandatory: Standard Scan (default)
- 0x01 Optional: Interlaced Scan

在标准的查询扫描下, 蓝牙设备仅发送查询扫描请求并等待其他设备的查询响应.  
在interlaced查询扫描下, 蓝牙设备会在扫描查询响应和监听其他设备的查询请求间交替.  

### Inquiry_Mode
表示查询结果事件的返回数据格式. 有以下几种:
- 0x00 Standard Inquiry Result event format
  - 标准的查询结果事件格式
  - 携带远程设备的一些基础信息: 蓝牙地址, 设备类
- 0x01 Inquiry Result format with RSSI
  - RSSI: Received Signal Strength Indication 接收信号强度指示
  - 除了标准的信息外, 还携带远程设备的信号强度
- 0x02 Inquiry Result with RSSI format or Extended Inquiry Result format
  - 除了标准的信息外, 还携带一些额外的信息, 如: 设备名称, 支持的服务等

### Page_Timeout, Extended_Page_Timeout
Page_Timeout和Extended_Page_Timeout一起定义了本地Link Manager等待远程设备响应连接尝试(本地设备发起的连接尝试)的最长时间.
如果超过改时间还未接收到响应, 那么此次连接尝试将被视为失败.

### Connection_Accept_Timeout参数
该参数允许Controller在经过指定的时间段后自动拒绝连接（如果新的连接未被接受）。
时间是从BR/EDR控制器发送HCI_Connection_Request事件或LE控制器发送HCI_LE_CIS_Request事件起，直到控制器自动拒绝传入连接的持续时间。

### Page_Scan_Interval
定义连续连接扫描间的时间间隔. 从上一次连接扫描开始到下一次连接扫描开始之间的时间间隔.

### Page_Scan_Window
定义一次连接扫描的持续时长. 所以Page_Scan_Window不能超过Page_Scan_Interval.

### Page_Scan_Type
表示连接扫描是否使用interlaced扫描:
- 0x00 Mandatory: Standard Scan (default)
- 0x01 Optional: Interlaced Scan

### PIN_Type
PIN: Personal Identification Number
决定了Link Manager是否假设主机支持可变的PIN码或固定的PIN码. 在配对过程中, Controller会使用PIN_Type的信息.

取值:
- 0x00 Variable PIN.
- 0x01 Fixed PIN.

### Link key
Controller可以为其他BR/EDR Controller存储有限数量的Link key, Link key用于两个Controller之间的所有安全事务.
Link key与设备的BR_ADDR相关联.

### Authentication_Enable
控制本地设备在建立连接时(在HCI_Create_Connection或接受传入的ACL连接和Connection Complete event之间)是否需要对远程设备进行身份认证.
在连接建立时，只有启用了Authentication_Enable参数的设备才会尝试对其他设备进行身份验证.

- 0x00 Authentication not required.
- 0x01 Authentication required for all connections.
- 0x02-0xFF Reserved

### Hold_Mode_Activity
用于确定在BR/EDR控制器处于保持模式时应暂停哪些活动.

- 0x00 Maintain current Power State.
- 0x01 Suspend Page Scan.
- 0x02 Suspend Inquiry Scan.
- 0x04 Suspend Periodic Inquiries.
- 0x08-0xFF Reserved for future use.

### Link_Policy_Settings
Link_Policy_Settings参数决定本地Link Manager在收到来自远程Link Manager的请求或者自身确定要改变角色,进入Hold或Sniff模式时的行为.

- 0x0000 Disable All LM Modes.
- 0x0001 Enable Role Switch.
- 0x0002 Enable Hold Mode.
- 0x0004 Enable Sniff Mode.
- 0x0008 Enable Park State.
- 0x0010 – 0x8000 Reserved for future use.

### Link_Supervision_Timeout
用于Controller监视链路丢失情况.如果由于任何原因,Connection_Handle未接收到数据包的持续时间超过Link_Supervision_Timeout设定的时间,连接将会断开.

### Class_Of_Device
用于向其他设备表明本地设备具有的能力.

### Supported_Commands
列举本地Controller支持的HCI命令.

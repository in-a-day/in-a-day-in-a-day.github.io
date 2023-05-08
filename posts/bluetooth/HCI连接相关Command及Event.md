---
title: HCI连接相关Command及Event
description: HCI连接相关Command及Event
date: 2023-05-08
tags:
  - 蓝牙
  - HCI
---

## 写在前面
本文基于Bluetooth Core Specification 5.3。 命令划分参考Bluetooth Core Specification 4.2。

## 通用的Event
Event | 描述
-- | --
HCI_Command_Complete | 用于传递每个HCI命令的返回状态和其他事件参数。
HCI_Command_Status | 用于表明根据Command_Opcode参数所描述的命令已经被接收，并且控制器正在执行此命令的任务。
HCI_Hardware_Error | 用于表明硬件的一些类型失败.

## 设备设置
Command | 描述
-- | -- 
HCI_Reset | 对于BR/EDR Controller, 重置HCI, Link Manager, Bluetooth radio. 对于LE Controller, 重置HCI, the Link Layer, and LE PHY. 通常Android设备开关蓝牙会调用此命令, 也会重置HCI的log文件.

## Controller信息
这组的命令用于Host发现有关设备的本地信息。

Command | 描述
-- | -- 
HCI_Read_Local_Version_Information | 读取当前Controller的版本信息. 返回参数包含HCI版本等.
HCI_Read_Local_Supported_Commands | 读取当前Controller支持的命令.
HCI_Read_Local_Supported_Features | 读取本地设备支持的特性.
HCI_Read_Local_Extended_Features | 读取本地设备支持的拓展特性.
HCI_Read_BD_ADDR | 读取本地设备地址.
HCI_LE_Read_Local_Supported_Features | 读取本地Controller支持的LE特性
HCI_LE_Read_ Supported_States | 读取本地LE Controller当前支持状态和角色组合.

## Controller配置
这组command和event用于配置全局的配置参数.

类型 | 名称 | 描述
-- | -- | --
Command | HCI_Read_Local_Name | 读取用户友好的设备名称, 通常就是Android设备展示的蓝牙名称
Command | HCI_Write_Local_Name | 修改用户友好的设备名称.
Command | HCI_Read_Class_of_Device| 读取设备类配置参数值, 值用于向其他设备表示本地设备的功能.
Command | HCI_Write_Class_of_Device | 写入设备类配置参数值.
Command | HCI_Read_Scan_Enable | 读取Scan Enable配置参数值, 该参数控制BR/EDR Controller是否定期(period)扫描其他BR/EDR控制器发送的连接(page)尝试和/或查询(inquiry)请求.
Command | HCI_Write_Scan_Enable | 配置Scan Enable参数.
Command | HCI_Read_Extended_Inquiry_Response | 读取BR/EDR Controller在查询(inquiry)响应期间发送的扩展查询(inquiry)响应数据包中的数据。
Command | HCI_Write_Extended_Inquiry_Response | 写入在查询(inquiry)响应期间发送的扩展查询(inquiry)响应数据包中的数据。

### HCI_Write_Scan_Enable
- 参数
  - Scan_Enable: 
    - 0x00: No Scans enabled. Default.
    - 0x01: Inquiry Scan enabled. Page Scan disabled.
    - 0x02: Inquiry Scan disabled. Page Scan enabled.
    - 0x03: Inquiry Scan enabled. Page Scan enabled.


## 设备发现
改组commands和events允许设备发现周围的设备.

类型 | 命令 | 描述
-- | -- | --
Command | HCI_Inquiry | 使本地设备进入Inquiry Mode, 用于查询周围的设备
Command | HCI_Inquiry_Cancel | 取消查询, 通常Android设备在进行连接前会取消查询, 因为查询操作是一个比较耗时操作.
Event | HCI_Inquiry_Result | 查询结果事件, 通常包含远程设备的地址, 设备类等
Event | HCI_Extended_Inquiry_Result | 拓展的查询结果
Event | HCI_Inquiry_Complete | 表示查询结束

TODO


---
title: HCI连接流程
description: HCI连接流程
date: 2023-05-17
tags:
  - HCI
  - Bluetooth
---

## 写在前面
本文简单描述从HCI_Reset到完成ACL连接的流程.

## 流程
### 重置蓝牙
一切从HCI_Reset开始:
![](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/202305172350283.png)

Android设备重启蓝牙调用该命令.

### 读取写入配置信息
读取版本信息:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230517235520.png)

读取当前设备的地址:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230517235650.png)

读取本地设备支持的命令:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230517235746.png)

开启简单配对模式:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518000315.png)

有关于Simple Pairing Mode主要有以下关联模型:
- Just Works
	- 当两个设备中至少有一个设备即没有显示能力也没有输入能力(即至少一个设备的IO能力是NoInputNoOutput), 使用这个模型, 在配对过程中不需要任何的用户交互(但也是可能会有交互的, 主要还是看上层应用如何实现, 比如在连接前需要用户确认连接). 常见的应用场景就是手机和耳机的连接(手机端可能会提示用户确认连接).
- Numeric Comparison
	- 当两个设备都可以显示6位数字且用户可以输入`是`或`否`时(即IO能力都是`DisplayYesNo`), 使用这种模型, 设备会显示数字代码或者秘钥, 用户需要在两台设备上确认来完成配对. 常见的应用场景就是手机和电脑连接.
- Out of Band (OOB) Pairing
	- 使用这种模型, 利用out-of-band(如NFC), 安全地交换配对信息
- Passkey Entry
	- 两个设备中有一个设备有输入能力但是没有显示能力, 另一个设备有显示能力(即一个设备IO能力为KeybordOnly, 另一个设备至少有Display能力), 此时使用这种模型, 拥有输入能力的设备需要用户输入另一个设备所显示的passkey. 常见的应用场景是电脑连接键盘.

设置Host支持的事件:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518000611.png)

写入链接策略:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518000718.png)

设置查询结果事件返回格式:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518000829.png)

设置Page Scan类型:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518000911.png)

设置Inquiry Scan类型:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518000948.png)

设置设备类型:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518001155.png)

设置连接超时时间:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518001225.png)

读取本地设备名称, 返回空:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518001306.png)

写入本地设备名:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518001352.png)

配置查询扫描的interval和window大小:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518001445.png)

配置连接扫描的interval和window大小:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518001537.png)

设置当前设备的状态为可查询可连接:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518001638.png)

### 开启扫描
开启查询扫描:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518001714.png)

取消查询扫描:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518001801.png)
通常在进行连接前可以取消查询扫描, 这个操作比较耗时

删除指定设备的link key:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518001948.png)

获取远程设备名:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518002056.png)
HCI_Command_Status表示这个命令成功执行.

远程设备通知其所支持的特性:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518002347.png)

远程设备响应获取名称:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518002428.png)

### 创建连接
接下来开始创建连接:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518002605.png)

创建连接完成, 过程中并未请求认证(认证的请求可以在连接过程中, 也可以在连接后), 响应携带Connection_Handle表示此次连接:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518002849.png)

读取远程设备的版本信息:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518002940.png)

### 请求认证
发起认证请求:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518003008.png)

Controller请求link key(携带远程设备的BR_ADDR):
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518003053.png)

不存在link key:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518003202.png)

请求本地设备的IO能力:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518003321.png)

回复当前设备的IO能力:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518003457.png)

#### 有关IO能力
IO能力用于确定配对过程中使用的身份验证方法. 由设备的输入输出能力组合而成.

输入能力:
- No input: 设备没有能力表示`是`或`否`
- Yes/No: 设备至少有两个按钮可以表示`是`或`否`, 或者有其他机制让用户表示`是`或`否`(例如在指定时间内按下按钮表示`是`, 否则表示`否`)
- Keybord: 设备需要有数字键盘可以输入0-9和确认, 并且至少有两个按钮可以表示`是`或`否`(或者其他机制让用户表示`是`或`否`)

输出能力:
- No output: 设备没有能力显示或传递6位十进制数
- Numeric output:  设备有能力显示或传递6位十进制数

根据输入和输出能力组合可以得到IO能力:
- NoInputNoOutput: No input + No output 或 Yes/No + No output
	- 设备在配对过程中既不能显示也不能输入
- DisplayOnly: No input + Numeric output
	- 设备在配对过程中只能显示数值
- DisplayYesNo: Yes/No + Numeric output
	- 设备在配对过程中可以显示数值, 也允许用户确认或拒绝显示的值
- KeyboardOnly: Keybord + No output
	- 设备只有输入能力
- KeyboardDisplay: Keybord + Numeric output
	- 设备即可输入也有输出, 配对过程中用户可以输入数值进行认证

终于接收到了读取远程设备的版本信息, 可以看到协议栈是5.0:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518003618.png)

请求远程设备支持的特性:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518003732.png)

远程设备IO能力信息,(连接的是耳机):
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518003824.png)

远程设备响应了支持的特性:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518003953.png)

发起用户确认请求事件, 携带了数值, Host应该返回HCI_User_Confirmation_Request_Reply或者 HCI_User_Confirmation_Request_Negative_Reply. 如果Host具有输出能力, 应该展示这个数值(DisplayYesNo or KeyboardOnly), 如果Host没有输入输出能力, 那么应该直接返回 HCI_User_Confirmation_Request_Reply:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518222143.png)

用户确认请求, host返回请求确认(我用Android设备连接Airpods pro, 并没有显示数字, 耳机没有输入输出能力, 手机端显示数字也没什么意义):
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518222514.png)

完成配对:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518231642.png)

通知为这个连接生成了新的link key:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518231726.png)

最终完成认证:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518231757.png)

开启加密连接:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518232009.png)

### 断开连接
最后本地主动断开连接:
![image.png](https://cdn.jsdelivr.net/gh/zabbits/cdn@main/picgo/20230518232147.png)

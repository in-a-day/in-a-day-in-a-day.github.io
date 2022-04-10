---
title: mac 常用软件安装
date: 2022-04-04 23:25:08
tags: mac
categories: mac
---

## 常用的软件
| 软件   | 说明    |
|--------------- | --------------- |
[MonitorControl](https://github.com/MonitorControl/MonitorControl) | 显示器亮度
[Karabiner-Elements](https://karabiner-elements.pqrs.org/) | 键盘映射 
[Rectangle](https://rectangleapp.com/) | 窗口控制 
[Snipaste](https://www.snipaste.com/) | 截图 
[Alfred](https://www.alfredapp.com/) | 启动器
[Clash X](https://github.com/yichengchen/clashX/releases) | 代理
[Macs Fan Control](https://crystalidea.com/macs-fan-control) | 风扇调整
[AltTab](https://alt-tab-macos.netlify.app/) | 类似于windows的窗口切换
[iTerm2](https://iterm2.com/) | 终端




## Node版本管理: [nvm](https://github.com/nvm-sh/nvm) 
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

## JDK
m1芯片下，jdk8(其他版本也可以)可以使用zulu
[brew zulu jdk](https://github.com/mdogan/homebrew-zulu) 
```bash
brew tap mdogan/zulu
brew install <name>
```
oracle官方提供了jdk17的原生支持
```bash
brew install openjdk@17
```



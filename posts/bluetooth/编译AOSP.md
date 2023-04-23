---
title: 编译AOSP
description: 编译AOSP
date: 2023-04-23
tags:
  - 蓝牙
---

## 写在前面
基于Ubuntu 22.04

## 下载AOSP源码
安装git:
```bash
sudo apt install git
```

配置git个人信息(如果已配置跳过):
```bash
git config --global user.name Your Name
git config --global user.email you@example.com
```

安装curl:
```bash
sudo apt install curl
```

下载repo工具:
```bash
mkdir ~/bin
# 加入到你的命令行配置文件中, zsh: ~/.zshrc, bash: ~/.bashrc
PATH=~/bin:$PATH
curl https://storage.googleapis.com/git-repo-downloads/repo > ~/bin/repo
chmod a+x ~/bin/repo
```
方便起见, 可以将`~/bin`加入到你的可执行路径中:
```bash
# zsh写入~/.zshrc中, bash写入~/.bashrc中
epxort PATH=~/bin:$PATH
```

创建工作目录:
```bash
mkdir aosp
cd aosp
```

初始化仓库:
```bash
repo init -u https://mirrors.tuna.tsinghua.edu.cn/git/AOSP/platform/manifest
```

如果需要某个特定的 Android 版本([版本列表](https://source.android.com/docs/setup/about/build-numbers#source-code-tags-and-builds)):
```bash
# 这里我指定了Android 13
repo init -u https://mirrors.tuna.tsinghua.edu.cn/git/AOSP/platform/manifest -b android-13.0.0_r40
```

同步源码树:
```bash
repo sync -j4
```


## 编译AOSP


## 参考文档
[清华AOSP使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/AOSP/)

[Android版本列表](https://source.android.com/docs/setup/about/build-numbers#source-code-tags-and-builds)

[AOSP官方下载文档](https://source.android.com/docs/setup/download/downloading)

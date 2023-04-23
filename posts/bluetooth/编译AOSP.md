---
title: 编译AOSP
description: 编译AOSP
date: 2023-04-23
tags:
  - 蓝牙
---

## 写在前面
本文基于以下环境:  
OS: Ubuntu 22.04, CPU: i7 8700, 内存: 16G  

## 下载AOSP源码
建立python软链接:
```bash
sudo ln -s /usr/bin/python3 /usr/bin/python
```

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

同步源码:
```bash
repo sync -j4
```


## 编译AOSP
安装相关依赖:
```bash
sudo apt-get install git-core gnupg flex bison build-essential zip curl zlib1g-dev libc6-dev-i386 libncurses5 lib32ncurses5-dev x11proto-core-dev libx11-dev lib32z1-dev libgl1-mesa-dev libxml2-utils xsltproc unzip fontconfig
```

如果编译master分支, 不需要安装JDK, 否则需要自行安装:
```bash
sudo apt-get install openjdk-8-jdk
```

初始化环境:
```bash
source build/envsetup.sh
```

`envsetup.sh`脚本导入了一些用于操作安卓源码的命令, 使用`hmm`可以查看所有命令:
```bash
hmm
```

TODO



## 参考文档
[清华AOSP使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/AOSP/)

[Android版本列表](https://source.android.com/docs/setup/about/build-numbers#source-code-tags-and-builds)

[AOSP官方下载文档](https://source.android.com/docs/setup/download/downloading)

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
### 安装依赖:
```bash
sudo apt-get install git-core gnupg flex bison build-essential zip curl zlib1g-dev libc6-dev-i386 libncurses5 lib32ncurses5-dev x11proto-core-dev libx11-dev lib32z1-dev libgl1-mesa-dev libxml2-utils xsltproc unzip fontconfig
```

如果编译master分支, 不需要安装JDK, 否则需要自行安装:
```bash
sudo apt-get install openjdk-8-jdk
```

### 设置交换文件
如果你的机器内存大于16G可以跳过此步骤了.
TODO

### 初始化环境
```bash
source build/envsetup.sh
```

`envsetup.sh`脚本导入了一些用于操作安卓源码的命令, 使用`hmm`可以查看所有命令:
```bash
hmm
```

### 下载驱动
为了刷入实际的设备(这里我使用pixel 5), 还需要下载一些[驱动.](https://developers.google.com/android/drivers)
选择与你编译版本相对应的驱动文件, 这里我选择了Pixel 5 binaries for Android 13.0.0 (TQ2A.230405.003.B2), 下载地址:
```txt
https://dl.google.com/dl/android/aosp/google_devices-redfin-tq2a.230405.003.b2-3cb07d86.tgz
https://dl.google.com/dl/android/aosp/qcom-redfin-tq2a.230405.003.b2-d50d20e6.tgz
```

下载完成得到两个压缩包:
```txt
qcom-redfin-tq2a.230405.003.b2-d50d20e6.tgz
google_devices-redfin-tq2a.230405.003.b2-3cb07d86.tgz
```

解压并将得到的sh脚本移入你下载时设置的工作目录, 此处我的工作目录是~/aosp:
```bash
tar -zxvf qcom-redfin-tq2a.230405.003.b2-d50d20e6.tgz
# 得到extract-qcom-redin.sh
tar -zxvf google_devices-redfin-tq2a.230405.003.b2-3cb07d86.tgz
# 得到extract-google_devices-redfin.sh
mv extract-qcom-redin.sh ~/aosp/
mv extract-google_devices-redfin.sh ~/aosp/
```

执行解压的脚本, 阅读许可证协议, 并输入`I ACCEPT`同意许可(tip: 执行脚本出现许可协议可以输入q跳过阅读, 然后输入`I ACCEPT`).
这两个脚本会把相关文件放在工作目录的`vendor/`目录下.

### 使用lunch选择构建目标
接下来可以使用`lunch`命令选择需要构建目标, 所有的构建目标都是`BUILD-BUILDTYPE`形式, `BUILDTYPE`是以下三种之一:

Buildtype | 场景
--- | --- 
user | 适用于生产
userdebug | 有root权限和debug, 适用于debug
eng | 开发配置, 有额外的debug工具

此处我需要刷写pixel 5, 所以使用以下命令([点击此处查看设备信息](https://source.android.com/docs/setup/build/running#selecting-device-build)):
```bash
lunch aosp_redfin-userdebug
```

### 构建
现在可以开始进行构建了, 执行`m`即可:
```bash
m
```


## 参考文档
[清华AOSP使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/AOSP/)

[Android版本列表](https://source.android.com/docs/setup/about/build-numbers#source-code-tags-and-builds)

[AOSP官方下载文档](https://source.android.com/docs/setup/download/downloading)

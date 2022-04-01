---
title: linux 常用软件安装
date: 2022-04-01 23:25:08
tags: linux
categories: linux
---

## Docker
[官方安装文档](https://docs.docker.com/engine/install/ubuntu/) 

### 设置仓库
1. 更新:
```bash
 sudo apt-get update
 sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
```
2. 添加官方GPG
```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```
3. 设置仓库
稳定版:
```bash
 echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

### 安装Dokcer Engine
1. 安装
```bash
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io
```


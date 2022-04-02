---
title: linux 常用软件安装
date: 2022-04-01 23:25:08
tags: linux
categories: linux
---

## Clash
[官方Wiki](https://github.com/Dreamacro/clash/wiki#welcome) 
### 下载clash
[选择下载Clash](https://github.com/Dreamacro/clash/releases) 
以下操作使用root用户:

### clash配置: config.yaml
[官方配置](https://github.com/Dreamacro/clash/wiki/configuration)
使用clash订阅链接可以如下配置:
```yaml
# config.yaml

port: 7890 # http port
socks-port: 7891 # socks5-port
# mixed-port: 7890
proxy-providers:
  provider1:
    type: http
    url: "填入订阅链接"
    interval: 3600
    path: ./provider1.yaml
    health-check:
      enable: true
      interval: 600
      # lazy: true
      url: http://www.gstatic.com/generate_204
```

### 将clash设置为daemon
解压clash, 并执行clash, 默认会在用户目录下生成默认的一些配置信息(包含config.yaml, Country.mmdb, config.yaml按照上述配置进行重新配置).

执行以下命令:
```bash
cp clash /usr/local/bin
cp config.yaml /etc/clash/
cp Country.mmdb /etc/clash/
```

创建/etc/systemd/system/clash.service文件, 并写入:
```text
[Unit]
Description=Clash daemon, A rule-based proxy in Go.
After=network.target

[Service]
Type=simple
Restart=always
ExecStart=/usr/local/bin/clash -d /etc/clash

[Install]
WantedBy=multi-user.target
```

- 设置clash开机自启
```bash
systemctl enable clash
```
- 立即启动clash
```bash
systemctl start clash
```
- 查看clash日志
```bash
systemctl status clash
journalctl -xe
```



## Docker
[官方安装文档](https://docs.docker.com/engine/install/ubuntu/) 

Docker官方提供了安装的脚本:
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```
### 配置docker用户组
安装完成后创建docker用户组(默认需要sudo才可以使用docker)
```bash
sudo groupadd docker
# 将用户加入docker组中
sudo usermod -aG docker $user
# 应用用户组改变
newgrp docker
```
检查用户是否可以运行docker
```bash
 docker run hello-world
```

### 配置docker开机自启
```bash
sudo systemctl enable docker.service
sudo systemctl enable containerd.service
```
关闭开机自启
```bash
sudo systemctl disable docker.service
sudo systemctl disable containerd.service
```

## 添加用户及用户组
```bash
# 添加用户
sudo useradd username
# 添加用户组
sudo groupadd groupname
# 为用户添加用户组
sudo usermod -aG groupname username
```

## 安装oh my zsh
首先安装zsh
```bash
sudo apt install zsh
```

[oh my zsh官网](https://ohmyz.sh/#install) 
```bash
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

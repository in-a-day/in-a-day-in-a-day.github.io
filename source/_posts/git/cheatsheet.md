---
title: git cheat sheet
date: 2022-03-29 22:47:48
tags: git
categories: git
---
git相关配置信息


## git config 配置git相关信息
常用参数配置:
- git config --global 全局设置git配置, 通常配置文件在`~/.gitconfig`或者`~/.config/git/config`中
- git config --list --show-origin 显示所有配置及文件所在位置
- git config --global core.editor vim 将默认文本编辑器设置为vim



## git diff 比较文件
- git diff 默认查看工作区与暂存区快照间的差异
- git diff --stage 对比暂存区文件与最后一次提交文件的差异
- git diff --cached 与--stage相同


## git commit 提交文件
- git commit -a 将会提交所有被git跟踪的文件, 而不需要使用add
- git commit --amend 修补提交, 提交暂存区的文件, 操作上像是将上一次的提交撤销, 并和此次提交一起进行. 日志中只会存在一次提交记录, 上一次的提交记录将会消失. 通常用于少提交文件或者修正笔误等小修补.


## git rm 删除文件
git rm 可以使用文件名称或匹配模式(与gitignore中相同)
- git rm --cached 将文件从git仓库中删除但是保留在工作区中
- git rm -f 强制删除修改过或位于暂存区中的文件


## git mv 移动文件
- git mv file newfile 移动文件
其实git mv命令相当于以下三条命令:
``` bash
mv file newfile
git rm file
git add newfile
```


## git log 查看日志
- git log 默认以时间先后顺序列出提交日志
- git log -num 查看最近num次提交日志
- git log -p 等同于--patch 显示每次提交引入的差异
- git log --stat 查看日志及简略的统计信息
- git log --pretty 格式化输出日志
- git log --graph 显示日志并使用ASCII字符展示分支合并信息
- git log --since --until 按时间限制查询的日志
- git log --grep 按模式匹配日志
- git log -S 接受一个字符串作为参数, 只显示添加或者删除了这些字符串的日志


## git reset
- git reset HEAD file 取消暂存的文件

## git checkout
- git checkout -- file 丢弃对文件的修改, 即恢复成上一次提交的状态


## git restore
- git restore HEAD file 取消暂存的文件
- git restore file 丢弃对文件的修改, 即恢复成上一次提交的状态










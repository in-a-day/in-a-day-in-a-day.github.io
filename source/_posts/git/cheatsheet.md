---
title: git cheat sheet
date: 2022-03-29 22:47:48
tags: git
categories: git
---


## git config 配置git相关信息
常用参数配置:
- `git config --global` 全局设置git配置, 通常配置文件在`~/.gitconfig`或者`~/.config/git/config`中
- `git config --list --show-origin` 显示所有配置及文件所在位置
- `git config --global core.editor vim` 将默认文本编辑器设置为vim
- `git config --global alias.<name> <command>` 给command创建一个名为name的别名, 例如`git config --global alias.co checkout`, 则可以使用`git co`等同于`git checkout`


## git diff 比较文件
- `git diff` 默认查看工作区与暂存区快照间的差异
- `git diff` --stage 对比暂存区文件与最后一次提交文件的差异
- `git diff` --cached 与--stage相同


## git commit 提交文件
- `git commit` -a 将会提交所有被git跟踪的文件, 而不需要使用add
- `git commit` --amend 修补提交, 提交暂存区的文件, 操作上像是将上一次的提交撤销, 并和此次提交一起进行. 日志中只会存在一次提交记录, 上一次的提交记录将会消失. 通常用于少提交文件或者修正笔误等小修补.


## git rm 删除文件
git rm 可以使用文件名称或匹配模式(与gitignore中相同)
- `git rm` --cached 将文件从git仓库中删除但是保留在工作区中
- `git rm` -f 强制删除修改过或位于暂存区中的文件


## git mv 移动文件
- `git mv file newfile` 移动文件
其实git mv命令相当于以下三条命令:
``` bash
mv file newfile
git rm file
git add newfile
```


## git log 查看日志
- `git log` 默认以时间先后顺序列出提交日志
- `git log -num` 查看最近num次提交日志
- `git log -p` 等同于--patch 显示每次提交引入的差异
- `git log --stat` 查看日志及简略的统计信息
- `git log --pretty` 格式化输出日志
- `git log --graph` 显示日志并使用ASCII字符展示分支合并信息
- `git log --since --until` 按时间限制查询的日志
- `git log --grep` 按模式匹配日志
- `git log -S` 接受一个字符串作为参数, 只显示添加或者删除了这些字符串的日志


## git reset
- `git reset HEAD file` 取消暂存的文件

## git checkout
- `git checkout -- file` 丢弃对文件的修改, 即恢复成上一次提交的状态


## git restore
- `git restore HEAD file` 取消暂存的文件
- `git restore file` 丢弃对文件的修改, 即恢复成上一次提交的状态


## git remote 远程仓库
- `git remote` 列出远程仓库服务器简写
- `git remote -v` 列出仓库简写及地址
- `git remote add <shortname> <url>` 添加远程仓库
- `git remote show <remote>` 列出远程仓库的url及跟踪分支信息
- `git remote rename <shortname> <newname>` 重命名远程仓库简写
- `git remote remove <shortname>` 移除远程仓库
从远程仓库拉取:
- `git fetch <remote>` 拉取远程仓库数据不会自动合并
- `git clone <url>` 自动添加一个名为`origin`的远程仓库
推送到远程仓库
- `git push <remote> <branch>` 推送到远程仓库, 例如: `git push origin main`


## git tag 标签
git 支持两种标签: 
> 轻量标签(lightweight), 只是某个特定提交的引用
> 附注标签(annotated), 存在git中的一个完整对象,包含打标签者的名称, mail, 时间及标签信息.

- `git tag` 列出已存在标签
- `git tag -l <pattern>` 列出匹配的标签
- `git show <tagname>` 查看标签信息

### 附注标签:
- `git tag -a <tagname> -m <message>` 使用`-a`选项指定附注标签, `-m`指定存储在标签中的信息
附注标签使用`git show`会显示标签信息及提交信息

### 轻量标签:
- `git tag <tagname>` 不需要指定任何选项即创建轻量标签
轻量标签使用`git show`仅显示信息, 不会有额外的标签信息

### 对过去的提交打标签 
`git tag <tagname> <commitid>` 根据提交id打标签

### 推送标签
默认git push不会上传标签到远程仓库, 必须显示的推送标签
- `git push <remote> <tagname>` 推送标签
- `git push origin --tages` 推送所有不在远程仓库的标签

### 删除标签
- `git tag -d <tagname>` 本地删除
- `git push <remote> :refs/tags/<tagname>` 从远程仓库删除, 表示将`:`前的空值推送到远程标签名从而删除
- `git push <remote> --delete <tagname>` 从远程仓库删除

### 检出标签








---
title: git初始化
date: 2022-03-29 22:47:48
tags: git
---

git文件会有以下三种状态:
- commited 已提交
- modified 已修改
- staged 已暂存

通过这三个状态衍生出了三个区域:
- working directory 工作区
- staging area 暂存区
- .git directory(repository) git仓库

git文件还可以分为以下两种状态:
- 已跟踪 存在于git版本控制中的文件
- 未跟踪 尚未被git跟踪的文件

## command
git status 查看文件的状态
git add 跟踪文件, 文件将被放入暂存区

git diff 查看修改的具体内容


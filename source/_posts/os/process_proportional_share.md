---
title: 比例份额调度
tags:
  - os
  - 进程调度
categories: os
date: 2021-02-04 11:25:42
---
## 比例份额
> proportinal-share, 也称fair-share(公平份额). 其基本理念是: 调度器保证每个任务都拥有特定比例的cpu时间.  
彩票调度(lottery scheduling)是比例调度的一个非常好的例子. 其基本思想是: 每隔一段时间, 举行一次彩票抽奖, 决定该运行哪个进程. 对于想要经常运行的程序, 应该给与更多的机会去赢得彩票.  
```
**关键问题:**  
1. 如何设计一个调度器以比例的方式共享cpu
2. 这样做的关键技术是什么
3. 效率如何
```

### 基础观念: 票数代表份额



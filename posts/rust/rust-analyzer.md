---
title: neovim配置rust-analyzer
description: neovim配置rust-analyzer
date: 2023-04-10
tags:
  - rust
  - vim
---

## 安装rust-analyzer
通过rustup安装[rust-analyzer](https://rust-analyzer.github.io/manual.html#rustup):
```bash
# 安装rust-analyzer
rustup component add rust-analyzer
# 如果使用的是nightly, 将stable替换为nightly即可
# 默认不会安装至~/.cargo/bin, 查看安装位置:
rustup which --toolchain stable rust-analyzer
# 对比使用link将rust-analyzer放到~/.cargo/bin下, 个人更倾向于这种启动方式:
rustup run stable rust-analyzer
```

## 配置neovim
安装[rust-tools](https://github.com/simrat39/rust-tools.nvim)插件, 修改lsp的cmd配置即可:
```lua
require("rust-tools").setup({
  server = {
    cmd = {
      "rustup",
      "run",
      -- 如果rust使用nightly, 可以替换stable为nightly
      "stable",
      "rust-analyzer",
    },
  },
})
```

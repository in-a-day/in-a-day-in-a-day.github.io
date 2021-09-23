// nav
module.exports = [
  { text: '首页', link: '/' },
  {
    text: '技术',
    link: '/technology/', //目录页链接，此处link是vdoing主题新增的配置项，有二级导航时，可以点击一级导航跳到目录页
    items: [
      // 说明：以下所有link的值只是在相应md文件定义的永久链接（不是什么特殊生成的编码）。另外，注意结尾是有斜杠的
      { text: 'Kubernetes', link: '/kubernetes/' },
      { text: 'Docker', link: '/docker/' },
      { text: 'Java', link: '/java/' },
      { text: 'Python', link: '/python/' },
      { text: 'Algorithm', link: '/algorithm/'},
      { text: 'Git', link: '/git/'},
    ],
  },
  {
    text: '其他',
    link: '/misc/',
  },
  { text: '关于', link: '/about/' },
  {
    text: '索引',
    link: '/archives/',
    items: [
      { text: '分类', link: '/categories/' },
      { text: '标签', link: '/tags/' },
      { text: '归档', link: '/archives/' },
    ],
  },
]

module.exports = {
  base: '/blog-vuepress/',
  dest: './dist',
  title: '小马的日常琐碎',
  description: '一个相当随便的vuepress上手项目',
  themeConfig: {
    nav: [
      {
        text: '首页',
        link: '/'
      }, {
        text: '博客',
        link: '/blog/'
      }, {
        text: '关于',
        link: '/about/'
      }, {
        text: '我的项目',
        items: [
          {
            text: '项目一',
            link: 'https://github.com/wmaqingbo/blog'
          }, {
            text: '项目二',
            link: 'https://github.com/wmaqingbo/blog'
          }
        ]
      }
    ]
  }
}

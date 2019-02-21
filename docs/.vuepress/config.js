// 文章目录数组
const javascriptChildren = ['javascript-严格模式', 'ES6模块-和-CommonJS-的区别', 'this指向问题']
const cssChildren = ['30s-CSS', 'CSS-布局整理']
const HTTPChildren = ['cookie']
const booknoteChildren = ['《自卑与超越》']
const othersChildren = ['cmder安装使用', 'Learn more study less', '你不自信的根源是什么', '常见棉被规格']

function genSidebarConfig(childrenArr, path) {
  const newArr = []
  for (value of childrenArr) {
    newArr.push(`${path}${value}`)
  }
  return newArr
}

module.exports = {
  base: '/',
  dest: './dist',
  title: '入梦来',
  description: 'wmaqingbo个人博客',
  head: [
    [
      'link', {
        rel: 'icon',
        href: `/favicon.png`
      }
    ]
  ],
  markdown: {
    lineNumbers: false
  },
  themeConfig: {
    displayAllHeaders: true,
    nav: [
      {
        text: '文章',
        items: [
          {
            text: 'JavaScript',
            link: `/blog/javascript/${javascriptChildren[0]}`
          }, {
            text: 'CSS',
            link: `/blog/css/${cssChildren[0]}`
          }, {
            text: 'HTTP',
            link: `/blog/HTTP/${HTTPChildren[0]}`
          }, {
            text: '读书笔记',
            link: `/blog/booknote/${booknoteChildren[0]}`
          }, {
            text: '其他',
            link: `/blog/others/${othersChildren[0]}`
          }
        ]
      }, {
        text: '关于',
        link: '/about/'
      }, {
        text: 'GitHub',
        link: 'https://github.com/wmaqingbo'
      }, {
        text: '豆瓣',
        link: 'https://www.douban.com/people/dmaqingbo/'
      }
    ],
    sidebar: {
      '/blog/javascript/': [
        {
          title: 'JavaScript',
          collapsable: false,
          children: javascriptChildren
        }
      ],
      '/blog/css/': [
        {
          title: 'CSS',
          collapsable: false,
          children: cssChildren
        }
      ],
      '/blog/HTTP/': [
        {
          title: 'HTTP',
          collapsable: false,
          children: HTTPChildren
        }
      ],
      '/blog/booknote/': [
        {
          title: '读书笔记',
          collapsable: false,
          children: booknoteChildren
        }
      ],
      '/blog/others/': [
        {
          title: '其他',
          collapsable: false,
          children: othersChildren
        }
      ]
    }

  }
}

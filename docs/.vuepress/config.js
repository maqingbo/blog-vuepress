// 文章目录数组
const javascriptChildren = [
  '',
  'javascript_strict',
  'ES6_module_CommonJS_module',
  'JavaScript_this',
  'JavaScript_apply_call',
  'attribute_property'
]
const cssChildren = ['30s_CSS', 'CSS_layout']
const httpChildren = ['']
const booknoteChildren = ['Learn_more_study_less', 'What_Life_Could_Mean_to_You']
const othersChildren = [
  '',
  'Fullpage_course',
  'Root_of_unconfidence',
  'Common_quilt_specifications',
  'vue_Internationalized',
  'Common_cmd_commands',
  'Quickly_enter_a_field_and_become_amazing',
  'How_to_rest_effectively',
  'Weapp_use_fontawespme'
]

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
  configureWebpack: {
    resolve: {
      alias: {
        '@img': './.vuepress/public'
      }
    }
  },
  markdown: {
    lineNumbers: false
  },
  // evergreen: true,
  themeConfig: {
    displayAllHeaders: true,
    lastUpdated: '上次更新',
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
            text: 'http',
            link: `/blog/http/${httpChildren[0]}`
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
    // sidebarDepth: 0,
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
      '/blog/http/': [
        {
          title: 'http',
          collapsable: false,
          children: httpChildren
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

---
title: vue 多语言切换，国际化实现
comments: true
date: 2018-01-29 14:34:48
tags:
categories:
---

前几天一个 vue 项目需要实现中英文切换，在这里记录一下自己的实现过程。

<!-- more -->

## 环境

使用 `vue-cli` 构建项目，`webpack` 模板。

多语言插件采用 [vue-i18n](https://link.jianshu.com/?t=https://kazupon.github.io/vue-i18n/en/).

## 安装

```
$ npm install vue-i18n --save

```

其他安装方法详见文档的 [Installation](https://link.jianshu.com/?t=https://kazupon.github.io/vue-i18n/en/installation.html) 篇。

## 使用

由于语言文件的代码比较多，就不直接写在`main.js`里面了，`src`目录下创建`i18n.js`文件，代码如下：

```JavaScript
import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

// 哪些地方需要切换，以及各个语言的版本
const messages = {
  zh: {
    message: {
      text: '免费获取 SGC'
    }
  },
  en: {
    message: {
      text: 'Get Free SGC'
    }
  }
}

// 以下为语言包单独设置的场景，单独设置时语言包需单独引入
const messages: {
  'zh-CN': require('./common/lang/zh'),   // 中文语言包
  'en-US': require('./common/lang/en')    // 英文语言包
}

// 最后 export default，这一步肯定要写的。
export default new VueI18n({
  locale: 'en', // set locale 默认显示英文
  messages // set locale messages
})

```

`main.js`中代码如下：

```JavaScript
import Vue from 'vue'
import App from './App'
import i18n from './i18n'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  i18n  // 添加到每个 Vue 实例，便可以使用 this.$i18n
})
```

上面的代码正式将 `vue-i18n` 引入 vue 项目中，创建一个 `i18n` 实例对象，方便全局调用。

HTML 中使用模版：

```html
<div id="#app">
  <p>{{ $t("message.text") }}</p>
</div>
...
<div class="lang">
  <div class="english" @click="langToggle">English</div>
  <div class="china" @click="langToggle">简体中文</div>
</div>
```

我们可以通过 `this.$i18n.locale` 来进行语言的切换，就是通过点击事件，切换 `locale` 的值。

切换方法示例：

```JavaScript
methods: {
  langToggle() {
    if (this.$i18n.locale === 'en') {
      this.$i18n.locale = 'zh'
    } else {
      this.$i18n.locale = 'en'
    }
  }
}
```

现在点击按钮便可以切换语言了。
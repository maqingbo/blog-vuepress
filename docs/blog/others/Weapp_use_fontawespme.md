---
title: 小程序使用 font-awesome 图标库
comments: true
date: 2017-12-26 09:44:52
tags: 小程序
categories: 小程序
---

跟平常使用差别不大，只是需要转换一下。

<!-- more -->

## 步骤

- 下载 font-awesome 字体包；
- 打开`font-awesome.css`文件，将`字符编码以上部分`复制到`app.wxss`；
- 打开 [Transfonter](https://transfonter.org/) 网站，上传字体`fontawesome-webfont.ttf`（理论其它文件格式也可以转换，并未尝试），选择`base64`编码，`formats`只选择`TTF`，`convert`后下载；
- [Transfonter](https://transfonter.org/) 网站下载得到的文件中有`style`文件，打开后将其中`@font-face`部分的代码复制，替换掉`app.wxss`中的`@font-face`部分；
- 对照`font-awesome.css`中的字符编码内容，加入到微信小程序的`app.wxss`文件中，使用哪个就加哪个。
- 然后在小程序中使用`class="fa fa-user"`即可，如`<text class="fa fa-user"></text>`。

## 目录结构参考

```
E:.
│  app.js
│  app.json
│  app.wxss
│  config.js
│
├─font-awesome-4.7.0
│  ├─css
│  │      font-awesome.css
│  │      font-awesome.min.css
│  │
│  └─fonts
│          fontawesome-webfont.eot
│          fontawesome-webfont.svg
│          fontawesome-webfont.ttf
│          fontawesome-webfont.woff
│          fontawesome-webfont.woff2
│          FontAwesome.otf
│
├─pages
│  └─index
│          index.js
│          index.wxml
│          index.wxss
```

------------

参考：
- [小程序社区](http://www.wxapp-union.com/forum.php?mod=viewthread&tid=2709&highlight=%E5%AD%97%E4%BD%93)
- [CSDN](http://blog.csdn.net/shmily__35/article/details/76691209)

<Valine></Valine>

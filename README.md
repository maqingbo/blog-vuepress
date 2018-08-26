## 一个相当随便的vuepress上手.

地址：https://wmaqingbo.github.io/blog-vuepress/


---


## 如何部署到 Github pages

```bash
npm install -D gh-pages
```

```javascript
// package.json 文件上添加脚本命令
"scripts": {
  "deploy": "gh-pages -d dist",
  "deploy:build": "npm run docs:build && gh-pages -d dist"
}
```

```bash
// 打包并推送到 gh-pages 分支
npm run deploy:build

// 打开你的 Github pages, 地址是 https://<yourname>/github.io/<repo>
```

---
title: 30s CSS
comments: true
date: 2018-04-04 16:03:20
tags: css
categories: CSS
---

前几天在网上看到了“30s CSS”这个项目，感觉里面有几个不错的写法，记录一下。

<!-- more -->

## 布局

### 盒尺寸重置

```css
html {
  box-sizing: border-box;
}
*,
*::before,
*::after {
  box-sizing: inherit;
}
```

### 清除浮动

```css
.clearfix::after {
  content: '';
  display: block;
  clear: both;
}
```

### 等宽高比

给定可变宽度的元素，它将确保其高度以响应的方式保持成比例（即，其宽度与高度的比率保持恒定）。

```html
<div class="constant-width-to-height-ratio"></div>
```

```css
.constant-width-to-height-ratio {
  background: #333;
  width: 50%;
}
.constant-width-to-height-ratio::before {
  content: '';
  padding-top: 100%;
  float: left;
}
.constant-width-to-height-ratio::after {
  content: '';
  display: block;
  clear: both;
}
```

### 均匀分布的子元素

```html
<div class="evenly-distributed-children">
  <p>Item1</p>
  <p>Item2</p>
  <p>Item3</p>
</div>
```

```css
.evenly-distributed-children {
  display: flex;
  justify-content: space-between;
}
```

### Flexbox 垂直居中

```html
<div class="flexbox-centering">
  <div class="child">Centered content.</div>
</div>
```

```css
.flexbox-centering {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

### 单行省略号

如果文本长度超过一行，它将被截断并以省略号结束。

```HTML
<p class="truncate-text">If I exceed one line's width, I will be truncated.</p>
```

```CSS
.truncate-text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 200px;
}
```

## 视觉

### 计数器

计数器本质上是由 CSS 维护的变量，其值可以通过 CSS 规则递增以跟踪它们的使用次数。

```HTML
<ul>
  <li>List item</li>
</ul>
```

```css
ul {
  counter-reset: counter;
}
li::before {
  counter-increment: counter;
  content: counters(counter, '.') ' ';
}
```

### 自定义滚动条

在 WebKit 平台上自定义具有可滚动溢出的文档和元素的滚动条样式。

```HTML
<div class="custom-scrollbar">
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure id exercitationem nulla qui repellat laborum vitae, molestias tempora velit natus. Quas, assumenda nisi. Quisquam enim qui iure, consequatur velit sit?</p>
</div>

```

```css
/* Document scrollbar */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}
/* Scrollable element */
.some-element::webkit-scrollbar {
}
```

### 自定义文本选中背景

更改文本选择的样式。

```HTML
<p class="custom-text-selection">Select some of this text.</p>
```

```css
::selection {
  background: aquamarine;
  color: black;
}
.custom-text-selection::selection {
  background: deeppink;
  color: white;
}
```

### 动态阴影

基于元素本身的颜色创建类似`box-shadow`的阴影。

```html
<div class="dynamic-shadow-parent">
  <div class="dynamic-shadow"></div>
</div>
```

```css
.dynamic-shadow-parent {
  position: relative;
  z-index: 1;
}
.dynamic-shadow {
  position: relative;
  width: 10rem;
  height: 10rem;
  background: linear-gradient(75deg, #6d78ff, #00ffb8);
}
.dynamic-shadow::after {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  background: inherit;
  filter: blur(0.4rem);
  opacity: 0.7;
  z-index: -1;
}
```

### 渐变文本

为文本提供渐变颜色。

```HTML
<p class="gradient-text">Gradient text</p>
```

```CSS
.gradient-text {
  background: -webkit-linear-gradient(pink, red);
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
}
```

### 1 像素边框

为元素提供一个边框，宽度等于 1 个本地设备像素，可以显得非常清晰和清晰。

```HTML
<div class="hairline-border">text</div>
```

```css
.hairline-border {
  box-shadow: 0 0 0 1px;
}
@media (min-resolution: 2dppx) {
  .hairline-border {
    box-shadow: 0 0 0 0.5px;
  }
}
@media (min-resolution: 3dppx) {
  .hairline-border {
    box-shadow: 0 0 0 0.33333333px;
  }
}
@media (min-resolution: 4dppx) {
  .hairline-border {
    box-shadow: 0 0 0 0.25px;
  }
}
```

### : 非选择器

这`:not` psuedo 选择器用于设置一组元素的样式，而保留最后一个（或指定的）元素未设置样式。

```HTML
<ul class="css-not-selector-shortcut">
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
  <li>Four</li>
  <li>Five</li>
</ul>
```

```CSS
.css-not-selector-shortcut {
  display: flex;
}
li {
  list-style-type: none;
  margin: 0;
  padding: 0 0.75rem;
}
li:not(:last-child) {
  border-right: 2px solid #d2d5e4;
}
```

### 溢出滚动渐变

向溢出元素添加渐变以更好地指示有更多内容需要滚动。

```HTML
<div class="overflow-scroll-gradient">
  <div class="overflow-scroll-gradient__scroller">
    Content to be scrolled
  </div>
</div>
```

```CSS
.overflow-scroll-gradient {
  position: relative;
}
.overflow-scroll-gradient::after {
  content: '';
  position: absolute;
  bottom: 0;
  width: 240px;
  height: 25px;
  background: linear-gradient(
    rgba(255, 255, 255, 0.001),
    white
  );
  /* transparent keyword is broken in Safari */
  pointer-events: none;
}
.overflow-scroll-gradient__scroller {
  overflow-y: scroll;
  background: white;
  width: 240px;
  height: 200px;
  padding: 15px 0;
  line-height: 1.2;
  text-align: center;
}
```

### 漂亮的文本下划线

比。.. 更好的选择`text-decoration: underline` 其中后代不裁剪下划线。本机实现为`text-decoration-skip-ink: auto` 但它对下划线的控制较少。

```HTML
<p class="pretty-text-underline">Pretty text underline without clipping descending letters.</p>
```

```CSS
.pretty-text-underline {
  font-family: Arial, sans-serif;
  display: inline;
  font-size: 18px;
  text-shadow: 1px 1px 0 #f5f6f9, -1px 1px 0 #f5f6f9, -1px -1px 0 #f5f6f9, 1px -1px 0 #f5f6f9;
  background-image: linear-gradient(90deg, currentColor 100%, transparent 100%);
  background-position: 0 0.98em;
  background-repeat: repeat-x;
  background-size: 1px 1px;
}
.pretty-text-underline::-moz-selection {
  background-color: rgba(0, 150, 255, 0.3);
  text-shadow: none;
}
.pretty-text-underline::selection {
  background-color: rgba(0, 150, 255, 0.3);
  text-shadow: none;
}
```

> 下划线与文本的距离取决于字体的内部度量，因此必须确保每个人看到相同的字体（即，不会出现基于操作系统而更改的系统字体）。

### 形状分离器

使用 SVG 形状分隔两个不同的块，与标准水平分隔相比，可以创建更有趣的视觉外观。

```HTML
<div class="shape-separator"></div>
```

```CSS
.shape-separator {
  position: relative;
  height: 48px;
  width: 500px;
  background: linear-gradient(135deg,#ff4c9f,#ff7b74);
}

.shape-separator::after {
  content: '';
  background-image: url(data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxLjQxNCI+PHBhdGggZD0iTTEyIDEybDEyIDEySDBsMTItMTJ6IiBmaWxsPSIjZmZmIi8+PC9zdmc+);
  position: absolute;
  width: 100%;
  height: 24px;
  bottom: 0;
}
```

### 系统字体堆栈

使用操作系统的本机字体来接近本机应用程序感觉。

```HTML
<p class="system-font-stack">This text uses the system font.</p>
```

```CSS
.system-font-stack {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu,
    Cantarell, 'Helvetica Neue', Helvetica, Arial, sans-serif;
}
```

### 三角形

使用纯 CSS 创建三角形形状。

```HTML
<div class="triangle"></div>
```

```CSS
.triangle {
  width: 0;
  height: 0;
  border-top: 20px solid #333;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
}
```

## 动画

### 加载中-弹跳样式

创建反弹加载程序动画。

```HTML
<div class="bouncing-loader">
  <div></div>
</div>
```

```CSS
@keyframes bouncing-loader {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0.1;
    transform: translateY(-1rem);
  }
}
.bouncing-loader {
  display: flex;
  justify-content: center;
}
.bouncing-loader > div {
  width: 1rem;
  height: 1rem;
  margin: 3rem 0.2rem;
  background: #8385aa;
  border-radius: 50%;
  animation: bouncing-loader 0.6s infinite alternate;
}
.bouncing-loader > div:nth-child(2) {
  animation-delay: 0.2s;
}
.bouncing-loader > div:nth-child(3) {
  animation-delay: 0.4s;
}
```

### 环形旋转器

创建可用于指示内容加载的圆环微调器。

```HTML
<div class="donut"></div>
```

```CSS
@keyframes donut-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.donut {
  display: inline-block;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #7983ff;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: donut-spin 1.2s linear infinite;
}
```

> 说明
> 使用半透明的`border` 对于整个元素，除了用作圆环加载指示器的一侧。使用`animation` 旋转整个元素。

### 悬停下划线动画

当文本悬停在上面时创建动画下划线效果。

```HTML
<p class="hover-underline-animation">Hover this text to see the effect!</p>
```

```CSS
.hover-underline-animation {
  display: inline-block;
  position: relative;
  color: #0087ca;
}
.hover-underline-animation::after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #0087ca;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}
.hover-underline-animation:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
```

> 说明
1.  `display: inline-block` 使块`p`成为 `inline-block` 以防止下划线跨越整个父级宽度而不仅仅是内容（文本）。
2.  `position: relative` 在元素上为伪元素建立笛卡尔定位上下文。
3.  `::after` 定义伪元素。
4.  `position: absolute` 从文档流中取出伪元素，并将其相对于父元素定位。
5.  `width: 100%` 确保伪元素跨越文本块的整个宽度。
6.  `transform: scaleX(0)` 最初将伪元素缩放为 0，使其没有宽度且不可见。
7.  `bottom: 0` 和`left: 0` 将其放置在块的左下方。
8.  `transition: transform 0.25s ease-out` 意味着`transform` 变化将通过`ease-out` 时间功能在 0.25 秒内过渡。
9.  `transform-origin: bottom right` 表示变换锚点位于块的右下方。
10. `:\hover::after` 然后使用`scaleX(1)` 将宽度转换为 100％，然后将`transform-origin` 更改为`bottom left` 以便定位点反转，从而允许其在悬停时转换到另一个方向。

## 互动

### 禁用选择

使内容不可选择。

```HTML
<p>你可以选择我。</p>
<p class="unselectable">你不能选择我！</p>
```

```CSS
.unselectable {
  user-select: none;
}
```

> 需要前缀才能获得完全支持。 这不是防止用户复制内容的安全方法。

### 同级变淡

淡出悬停项目的同级。

```HTML
<div class="sibling-fade">
  <span>Item 1</span>
  <span>Item 2</span>
  <span>Item 3</span>
  <span>Item 4</span>
  <span>Item 5</span>
  <span>Item 6</span>
</div>

```

```CSS
span {
  padding: 0 1rem;
  transition: opacity 0.2s;
}
.sibling-fade:hover span:not(:hover) {
  opacity: 0.5;
}
```

> 说明
1.  `transition: opacity 0.2s` 指定不透明度的更改将在 0.2 秒内转换。
2.  `.sibling-fade:hover span:not(:hover)` 指定当父项被徘徊时，选择当前没有被徘徊的任何`span`子项并将其不透明度更改为`0.5` 。

------

实现效果可以参考原文网址：http://caibaojian.com/30-seconds-of-css/

<Valine></Valine>

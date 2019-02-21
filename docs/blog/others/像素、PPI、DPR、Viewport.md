---
title: 像素、设备像素比、PPI、Viewport
comments: true
date: 2017-09-12 15:38:06
tags: [移动端,布局,viewport]
categories: 移动端
---
移动端是趋势，移动端的屏幕显示和布局方面肯定是需要掌握的透透的。

<!-- more -->

> 注意：
> 本文章的图片出了些问题，还未修改。

## 像素 PX

其实很多会 Photoshop 的人都有一个误区：**认为像素是一个宽高相等的小方块，并且的像素都是“那么大”，但是不知道这个宽高的具体数字。**

然而其实 pixel（像素）是图像的基本采样单位。它不是一个确定的物理量，也不是一个具体的点或者小方块（尽管可以用点和小方块来呈现），而是一个抽象概念。

> 详细解释见维基 [像素](https://zh.wikipedia.org/wiki/%E5%83%8F%E7%B4%A0) 条目。

那么 px 都会受哪些因素的影响而变化？

*   每英寸点数(Dots Per Inch, DPI)
*   像素密度(pixel per inch, PPI)
*   设备像素比(device pixel ratio, DPR)

## 像素密度 PPI

### 物理像素

`物理像素(physical pixel)`又被称为`设备像素(device pixels)`，是设备能控制图像显示的最小单位，每个像素可以根据操作系统设置自己的颜色和亮度。

不同的设备，图像基本采样单元是不同的，显示器上的物理像素等于显示器的点距，而打印机的物理像素等于打印机的墨点。而衡量点距大小和打印机墨点大小的单位分别称为`ppi`和`dpi`：

-   **ppi**：每英寸多少像素数，放到显示器上说的是每英寸多少物理像素或显示器设备的点距。
-   **dpi**：每英寸多少点。

关于打印机的墨点我们不去关心，只要知道 **当用于描述显示器设备时 ppi 与 dpi 是同一个概念** 。

### PPI

**每英寸物理像素点数（Pixels Per Inch）**，更确切的说法应该是像素密度，也就是衡量单位物理面积内拥有像素值的情况。

ppi越高，每英寸像素点越多，图像越清晰。可以类比物体的密度，密度越大，单位体积的质量就越大，ppi越高，单位面积的像素越多。

要计算显示器的每英寸像素值，首先要确定屏幕的`尺寸（对角）`和`分辨率（物理像素）`。

{% qnimg viewport/02px.png %}

以爱疯6为例：

{% qnimg viewport/03px.png %}

```
var 斜边尺寸 = V(1920^2+1080^2) V代表开根号
var ppi = 斜边尺寸/5.5
ppi = 401ppi

```

## 设备像素比 DPR

### CSS 像素

CSS像素是Web编程的概念，指的是CSS样式代码中使用的逻辑像素。

在`CSS`规范中，长度单位可以分为两类，绝对(absolute)单位以及相对(relative)单位。`px`是一个**相对单位**，相对的是`设备像素(device pixel)`。

每一个CSS声明和几乎所有的 javascript 属性都使用CSS像素，因此实际上从来用不上设备像素 ，唯一的例外是`screen.width/height`.

CSS 像素又被称为`与设备无关的像素`或`设备独立像素`(device-independent pixel)，简称 `DIPs`。

### 缩放

在桌面端，`1个css像素`往往都是对应着电脑屏幕的`1个物理像素`。

{% qnimg viewport/04px.png %}

_一个CSS像素对应一个物理像素_

而在手机端，由于屏幕尺寸的限制，`缩放`是经常性的操作。

{% qnimg viewport/05px.png %}

_设备像素(深蓝色背景)、CSS像素(半透明背景)_
_左图表示当用户进行缩小操作时，一个设备像素覆盖了多个CSS像素_
_右图表示当用户进行放大操作时，一个CSS像素覆盖了多个设备像素_

不论我们进行缩小或放大操作，元素设置的CSS像素（如width:300px）是`始终不变的`，而一个CSS像素对应多少个设备像素是根据当前的缩放比例来决定的.

### DPR

> **设备像素比(device pixels ratio)** 描述的是未缩放状态下，`物理像素`和`CSS像素`的初始比例关系，计算方法如下。

```
设备像素比 ＝ 物理像素 / 设备独立像素      // 同一方向上
```

通俗点讲：**设备像素比(dpr)** 是指在移动开发`同一方向上（x轴或y轴）`中`1个css像素`占用`多少设备像素`，

如 retina 屏幕`dpr = 2`，代表`1个css像素`用`2x2个设备像素`来绘制。

{% qnimg viewport/06px.png %}

在 JavaScript 中，可以通过`window.devicePixelRatio`获取到当前设备的 dpr。而在 CSS 中，可以通过`-webkit-device-pixel-ratio`，`-webkit-min-device-pixel-ratio`和`-webkit-max-device-pixel-ratio`进行媒体查询。

桌面浏览器像素比为 `1`，表示`一个CSS像素`对应`1个物理像素`。retina 屏幕以及绝大数现代移动浏览器的像素比为 `2`，表示`一个CSS像素`对应`4个物理像素`。部分大屏移动设备的像素比可以达到 `3 `或 `4`。

### ppi 和 dpr 的关系

毕竟这些参数是外国人先发明的，他们会优先选择自己熟悉的计量单位作为显示设备的工厂标准参数，因此`ppi`就用作显示设备的工业标准；

**dpr 与 ppi 相关，一般是`ppi/160`的整数倍：**

{% qnimg viewport/07px.png %}


## Viewport

### PPK 关于三个 viewport 的理论

[ppk大神](http://www.quirksmode.org/) 对于移动设备上的viewport有着非常多的研究（[第一篇](http://www.quirksmode.org/mobile/viewports.html)，[第二篇](http://www.quirksmode.org/mobile/viewports2.html)，[第三篇](http://www.quirksmode.org/mobile/metaviewport/)），有兴趣的同学可以去看一下，本文中有很多数据和观点也是出自那里。ppk认为，移动设备上有三个viewport。

-   visual viewport / layout viewport

简单的理解，viewport 严格等于浏览器的窗口。为了能更好为移动端 CSS 布局服务，viewport 又分为 visual viewport 和 layout viewport。

George Cummins在 [Stack Overflow](http://stackoverflow.com/questions/6333927/difference-between-visual-viewport-and-layout-viewport) 上解释了这两个基本概念。

> 可以把 layout viewport 想象成是一张不能改变大小和角度的图片。现在你用一个更小的框来观看这张图片，这个框被不透明的材料包围，所以你只能看到这张图片的一部分，通过小框所看到的这部分区域被称为 visual viewport。你可以拿着这个框离图片远点（用户缩小页面）或近点（用户放大页面）进行观看，你也可以改变这个框的方向，但这张图片的大小和方向都不会改变。

`visual viewport`的宽度可以通过`window.innerWidth` 来获取，但在Android 2, Oprea mini 和 UC 8中无法正确获取。

{% qnimg viewport/08px.png %}
_viewport示意图_

-   ideal viewport

现在我们已经有两个`viewport`了：**layout viewport** 和  **visual viewport**。但浏览器觉得还不够，因为现在越来越多的网站都会为移动设备进行单独的设计，所以必须还要有一个能完美适配移动设备的`viewport`。

所谓的完美适配指的是：
首先不需要用户缩放和横向滚动条就能正常的查看网站的所有内容；
第二，显示的文字的大小是合适，比如一段 14px 大小的文字，不会因为在一个高密度像素的屏幕里显示得太小而无法看清，理想的情况是这段 14px 的文字无论是在何种密度屏幕，何种分辨率下，显示出来的大小都是差不多的。当然，不只是文字，其他元素像图片什么的也是这个道理。

ppk把这个`viewport`叫做 **ideal viewport**，也就是第三个`viewport` —— 移动设备的理想`viewport`。

`ideal viewport`并没有一个固定的尺寸，不同的设备拥有有不同的`ideal viewport`。所有的`iphone`的`ideal viewport`宽度都是320px，无论它的屏幕宽度是320还是640，也就是说，在`iphone`中，`css`中的320px就代表`iphone`屏幕的宽度。

{% qnimg viewport/09px.png %}

但是安卓设备就比较复杂了，有320px的，有360px的，有384px的等等，关于不同的设备`ideal viewport`的宽度都为多少，可以到 [Viewport Sizes](http://viewportsizes.com/) 去查看一下，里面收集了众多设备的理想宽度。


### viewport meta

移动设备默认的`viewport`是`layout viewport`，但在进行移动设备网站的开发时，我们需要的是`ideal viewport`。那么怎么才能得到`ideal viewport`呢？这就该轮到`meta`标签出场了。

我们在开发移动设备的网站时，最常见的的一个动作就是把下面这个东西复制到我们的`head`标签中：

`<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">`

该`meta`标签的作用是让当前`viewport`的宽度等于设备的宽度，同时不允许用户手动缩放。也许允不允许用户缩放不同的网站有不同的要求，但让`viewport`的宽度等于设备的宽度，这个应该是大家都想要的效果，如果你不这样的设定的话，那就会使用那个比屏幕宽的默认`viewport`，也就是说会出现横向滚动条。

## BOM 属性

为了便于获取不同对象的尺寸，浏览器包含以下属性供我们使用：

*   `screen.width/height`，设备的屏幕尺寸。

*   `window.innerWidth/Height`，包含滚动条尺寸的浏览器完整尺寸。

*   `document.documentElement.clientWidth/Height`，viewport 的尺寸。

*   `document.documentElement.offsetWidth/Height`，`<html>`的尺寸。

你可能同时也会用到以下属性：

*   `window.pageX/YOffset`，页面的移位。

*   `window.pageX/Y`，从`<html>`原点到事件触发点距离。

*   `window.clientX/Y`，从 viewport 原点（浏览器窗口）到事件触发点的距离。

*   `window.screenX/Y`，从用户显示器窗口原点到事件触发点的距离。

## flexible.js

基于上述几个概念，阿里前端团队设计了 [flexible.js](https://github.com/amfe/lib-flexible) 这个移动端自适应方案，它主要做了下面几件事：

**1. 动态改写`<meta>`标签**

你可以通过输出 meta 标签方式来手动设置 dpr，其中 initial-dpr 会把 dpr 强制设置为给定的值，maximum-dpr 会比较系统的 dpr 和给定的 dpr，取最小值。`注意：这两个参数只能选其一。`

```
<meta name="flexible" content="initial-dpr=2, maximum-dpr=3" />

```

**2. 给`<html>`元素添加`font-size`属性，并且动态改写`font-size`的值**

为了以后兼容 vh，vw 单位，当前方案会把页面分成 100 份来看待，每一份被称为一个单位 a。同时，1rem 单位认定为 10a。拿 750 的视觉稿举例：

```
1a = 7.5px
1rem = 75px

```

因此，对于视觉稿上的元素的尺寸换算，只需要原始 px 值除以 rem 基准 px 值即可。例如 `240px * 120px` 的元素，最后转换为 3.2rem * 1.6rem。

**3. 给`<html>`元素添加`data-dpr`属性，并且动态改写`data-dpr`的值**

我们希望在大屏手机上看到更多的文字，所以字体的大小不推荐用 rem 作为单位。所以对于字体的设置，仍旧使用 px 作为单位，并配合用 data-dpr 属性来区分不同 dpr 下的的大小。

```
div {
    width: 1rem;
    height: 0.4rem;
    font-size: 12px; // 默认写上dpr为1的fontSize
}

[data-dpr="2"] div {
    font-size: 24px;
}

[data-dpr="3"] div {
    font-size: 36px;
}
```

## 参考文章

[深入理解移动端像素知识与Viewport知识](http://blog.csdn.net/aiolos1111/article/details/51967744)
[移动端H5页面的设计稿尺寸（上）](http://zikoman.lofter.com/post/3bf3bb_6da8d80#)
[移动端H5页面的设计稿尺寸（下）](http://zikoman.lofter.com/post/3bf3bb_6da8e55#)
[你真的了解像素吗](http://www.cnblogs.com/dojo-lzz/p/6683036.html?utm_source=debugrun&utm_medium=referral)
[移动前端开发之viewport的深入理解](http://www.cnblogs.com/2050/p/3877280.html)
[设备像素，设备独立像素，CSS像素](http://yunkus.com/physical-pixel-device-independent-pixels/)
[移动端开发系列——像素与viewport](http://www.jianshu.com/p/76130f4d7cf9)
[移动端高清、多屏适配方案](http://div.io/topic/1092?page=2)
[像素（px）到底是个什么单位](http://hax.iteye.com/blog/374323)
[CSS 长度单位](https://yukun.im/css/469)
[彻底理解 UI 及 Web 的尺寸单位：基本概念](https://medium.com/uxabc/understanding-ui-units-8acdc0575388)
[针对iPhone的pt、Android的dp、HTML的css像素与dpr、设计尺寸和物理像素的浅分析](https://www.idaima.com/a/13245.html)

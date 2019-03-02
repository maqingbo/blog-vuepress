---
title: Fullpage 使用指南
---

Fullpage 可以说是目前最好用的全屏滚动插件，很多前端设计师用他制作出了优秀的效果，本文内容将为大家介绍如何快速的使用 Fullpage 插件，构建自己的全屏单页网站。

<!-- more -->

## 安装插件

如果你熟悉`bower`或者`npm`，您可以使用下面的命令安装`Fullpage`

```javascript
// With bower
bower install fullpage.js

// With npm
npm install fullpage.js
```

当然您也可以从 `Fullpage` 的`Github`地址下载得到源文件，这两种方法所获取到的`Fullpage`插件文件是一样的。

## 引入插件文件

这个插件依赖于 jQuery，所以你还需要下载 jQuery，并且在 Fullpage 插件之前引入。

```html
<link rel="stylesheet" type="text/css" href="jquery.fullPage.css" />
<script src="jquery.min.js"></script>
<script type="text/javascript" src="jquery.fullPage.js"></script>
```

如果你需要自定义页面滚动的效果，你需要引入`jquery.easings.min.js`文件。

```html
<script src="jquery.easings.min.js"></script>
```

对于内容比较多的页面，可以设置右侧的滚动条，但是默认情况下无法滚动，你需要`jquery.slimscroll.min.js`文件来自定义滑条滚动效果。

```html
<script type="text/javascript" src="jquery.slimscroll.min.js"></script>
```

最后，如果你不想下载到项目中，您可以使用开源项目 CDN 服务，`Fullpage`在`CDNJS`的地址：<https://cdnjs.com/libraries/fullPage.js>

## 编写 HTML 代码

默认情况下，每一屏幕的代码都需要有 DIV 包裹，并且设置 DIV 的类名为`section`，默认情况下，第一个`setion`将作为首页显示在页面上。

```html
<div id="fullpage">
  <div class="section">Some section</div>
</div>
```

假如你需要让某一个`section`作为首页的第一屏展示，你只需要给这个`section`添加一个`active`的类，Fullpage 会自动优先展示这个屏幕，例如定义下面的代码：

```html
<div class="section active">Some section</div>
```

Fullpage 自带`左右滑动的幻灯片`，只需要在`section`中添加 DIV 元素，并且给 DIV 元素添加`slide`类，FUllpage 会自动生成幻灯片特效，例如下面的代码：

```html
<div class="section">
<div class="slide"> Slide 1 </div>
<div class="slide"> Slide 2 </div>
<div class="slide"> Slide 3 </div>
<div class="slide"> Slide 4 </div>
</div>
```

## 初始化 Fullpage

使用 jQuery 的文档加载完毕以后执行函数，初始化 Fullpage 插件。

```
$(document).ready(function() {
  $('#fullpage').fullpage(
    ...
  );
});
```

所有的选项设置更复杂的初始化可能看起来像这样：

```javascript
$(document).ready(function() {
  $('#fullpage').fullpage({
    //Navigation
    menu: false,  // 一个选择器可以用来指定要与滚动互动的导航菜单，有点类似与 Bootstrap 的滚动监听
    lockAnchors: false,
    anchors: [],  // 定义导航的锚文本信息例如 ['firstPage', 'secondPage'],
    navigation: false,  // 如果设置为 true，那他将会显示一个小圆圈组成的快速导航栏
    navigationPosition: 'right',  // 结合参数 navigation 一起使用，用于设置 navigation 定义的菜单显示的位置，可以设置为 left/right。
    navigationTooltips: ['firstSlide', 'secondSlide'],
    showActiveTooltip: false,
    slidesNavigation: true,
    slidesNavPosition: 'bottom',

    //Scrolling
    css3: true,
    scrollingSpeed: 700,  // 每个屏幕滚动动画执行的时间
    autoScrolling: true,  // 定义屏幕是否自动滚动
    fitToSection: true,  // 设置是否自适应整个窗口的空间，以某个 section 的内容为分界线
    scrollBar: false,  // 是否使用浏览器默认的滚动条
    easing: 'easeInOutCubic',
    easingcss3: 'ease',
    loopBottom: false,  // 滚动到最后一个后，是否循环滚动到第一个
    loopTop: false,  // 滚动到第一个后，是否循序滚动到最后一个
    loopHorizontal: true,  // 水平的幻灯片是否循环切换
    continuousVertical: false,  // 默认值：false，定义向下滚动到最后一节是否应该向下滚动到第一个，如果向上滚动的第一部分应该滚动到最后一个。不兼容 loopTop 和 loopBottom 选项。
    normalScrollElements: '#element1, .element2',
    scrollOverflow: false,
    touchSensitivity: 15,  // 默认值：5，定义了浏览器窗口的宽度/高度的百分比，多远的触摸滑动可以跳转到下一个 section / slide。
    normalScrollElementTouchThreshold: 5,

    //Accessibility
    keyboardScrolling: true,  // 是否可以通过键盘箭头事件控制 section 的滚动
    animateAnchor: true, // 默认值：true，定义当网页的 URL 中有锚文本的时候，是否帮用户定位到对应的 section 或者 slide。
    recordHistory: true,  // 默认值：true，定义是否将网页滚动的的状态纪录到浏览器的历史记录中。

    //Design
    controlArrows: true,  // 是否使用控制箭头向左或向右移动幻灯片
    verticalCentered: true,  // 是否垂直居中网页的内容
    resize: true,  // 是否在窗口改变大小后，自动调整网页中字体的大小
    sectionsColor: none;  // 每个 section 的 CSS 背景 ['#ccc', '#fff'],
    paddingTop: 0,  // 每个 section 固定的头部留白，在使用固定表头的情况下有用的
    paddingBottom: '10px',
    fixedElements: '#header, .footer',
    responsiveWidth: 0,
    responsiveHeight: 0,

    //Custom selectors
    sectionSelector: '.section',
    slideSelector: '.slide',

    //events
    onLeave: function(index, nextIndex, direction) {},
    afterLoad: function(anchorLink, index) {},
    afterRender: function() {},
    afterResize: function() {},
    afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex) {},
    onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex) {}
  });
});
```

## Fullpage 方法函数

前面介绍了 Fullpage 的配置参数，接下来为大家介绍一些 Fullpage 中的方法函数，这些函数是在插件初始化外调用，不同于回调函数，且不受参数的影响。

### moveSectionUp()

设置`section`向上滚动

```
$.fn.fullpage.moveSectionUp();
```

### moveSectionDown()

设置`section`向下滚动

```
$.fn.fullpage.moveSectionDown();
```

### moveTo(section, slide)

设置屏幕滚动到某个`section`或者`slide`，两个参数都是某个内容块的索引值或者是锚文本，默认情况下`slide`的索引被设置为`0`。

```
/*Scrolling to the section with the anchor link `firstSlide` and to the 2nd Slide */
$.fn.fullpage.moveTo('firstSlide', 2);

//Scrolling to the 3rd section in the site
$.fn.fullpage.moveTo(3, 0);

//Which is the same as
$.fn.fullpage.moveTo(3);
silentMoveTo(section, slide)
```

这个函数的用法和`MoveTo`方法完全一样，只是`MoveTo`在切换的时候有动画效果，而`silentMoveTo`方法在切换的时候没有动画效果，直接跳转到对应的`section`中。

```
/*Scrolling to the section with the anchor link `firstSlide` and to the 2nd Slide */
$.fn.fullpage.silentMoveTo('firstSlide', 2);
```

### moveSlideRight()

设置幻灯片向右滑动，将下一个幻灯片显示在当前的屏幕中。

```
$.fn.fullpage.moveSlideRight();
```

### moveSlideLeft()

设置幻灯片向左滑动，将上一个幻灯片显示在当前的屏幕中。

```
$.fn.fullpage.moveSlideLeft();
```

### setAutoScrolling(boolean)

可以实时的控制页面滚动的方式，可选的参数`false/true`。

如果参数被设置为`true`，所有的`section`将自动滚动。 如果参数被设置为`false`，所有的`section`将不会自动滚动，需要用户手动或者使用浏览器的滑条滚动网页。 注意，`scrollOverflow`参数如果设置为`true`，它可能很难滚动鼠标滚轮或触摸板当部分滚动。

```
$.fn.fullpage.setAutoScrolling(false);
```

### setFitToSection(boolean)

该函数设置选项`fitToSection`确定是否自适应`section`在屏幕上。

```
$.fn.fullpage.setFitToSection(false);
```

### setLockAnchors(boolean)

设置选项`lockAnchors`确定将锚文本锁定到 URL 中。

```
$.fn.fullpage.setLockAnchors(false);
```

### setAllowScrolling(boolean, [directions])

添加或者禁止`Fullpage`自动绑定的鼠标滑轮和移动触摸事件，不过用户任然可以通过键盘和点击快速导航的方式切换`section/slide`。要取消键盘事件你应该使用`setKeyboardScrolling`方法。

> `directions`，可选参数，可以设置的值：`all, up, down, left, right`或者设置组合的参数，例如`down, right`，他设置的两个方向上将禁止或者激活滚动。

```
//disabling scrolling
$.fn.fullpage.setAllowScrolling(false);

//disabling scrolling down
$.fn.fullpage.setAllowScrolling(false, 'down');

//disabling scrolling down and right
$.fn.fullpage.setAllowScrolling(false, 'down, right');
```

### setKeyboardScrolling(boolean, [directions])

添加或者禁止键盘对`section/slide`的控制，这个事件是默认绑定的。

> `directions`，可选参数，可以设置的值：`all, up, down, left, right`或者设置组合的参数，例如`down, right`，他设置的两个方向上将禁止或者激活键盘的滚动。

```
//disabling all keyboard scrolling
$.fn.fullpage.setKeyboardScrolling(false);

//disabling keyboard scrolling down
$.fn.fullpage.setKeyboardScrolling(false, 'down');

//disabling keyboard scrolling down and right
$.fn.fullpage.setKeyboardScrolling(false, 'down, right');
setRecordHistory(boolean)
```

定义是否为每个 URL 的变更纪录到浏览器中的历史记录中。

```
$.fn.fullpage.setRecordHistory(false);
```

### setScrollingSpeed(milliseconds)

定义每个`section/slide`滚动的时间，默认的时间单位为毫秒（ms）。

```
$.fn.fullpage.setScrollingSpeed(700);
```

### destroy(type)

移除`Fullpage`的事件和添加的`HTML/CSS`样式风格，理想的使用在使用`Ajax`加载内容。

type：可以被设置为空字符，或者 all，如果一旦执行，通过 Fullpage 添加的 HTML/CSS 样式和代码都将会被移除，将显示没有使用 Fullpage 的样式，一个使用过任何插件进行修改。

```
//destroy any plugin event (scrolls, hashchange in the URL...)
$.fn.fullpage.destroy();

//destroy any plugin event and any plugin modification done over your original HTML markup.
$.fn.fullpage.destroy('all');
```

### reBuild()

更新 DOM 结构以适应新的窗口大小或其内容。理想的使用与 Ajax 调用或外部网站的 DOM 结构的变化组合。

```
$.fn.fullpage.reBuild();
```

## 资源延时加载

`fullpage.js`提供了一种懒加载图像，视频和音频元素，所以他们不会放慢您的网站加载或不必要的浪费数据传输。使用延迟加载时，所有这些元素只会加载时进入视口。启用延迟加载，所有你需要做的是改变你的`src`属性的`data-src`如下图所示：

```
<img data-src="image.png" alt="FullPage.js 完全指南">
<video>
  <source data-src="video.webm" type="video/webm" />
  <source data-src="video.mp4" type="video/mp4" />
</video>
```

## Fullpage 回调函数

上一节中介绍了`Fullpage`的方法函数，那些函数只适合单独使用，如果想更加详细的控制`Fullpage`，就需要使用回调函数，接下来得文档将为您详细介绍`Fullpage`中的回调函数使用方法和参数。

### afterLoad (anchorLink, index)

滚动到某一屏后的回调函数，接收 `anchorLink` 和 `index` 两个参数。

- `anchorLink` 是锚链接的名称
- `index` 是 `section` 的索引，从`1`开始计算

在没有设置锚文本的情况下，只有使用唯一的`index`参数。

```
$('#fullpage').fullpage({
    anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'lastPage'],
    afterLoad: function(anchorLink, index){
        var loadedSection = $(this);
        //using index
        if(index == 3){
            alert("Section 3 ended loading");
        }
        //using anchorLink
        if(anchorLink == 'secondSlide'){
            alert("Section 2 ended loading");
        }
    }
});
```

### onLeave (index, nextIndex, direction)

滚动前的回调函数，接收 `index`、`nextIndex` 和 `direction` 3 个参数

- `index` 是离开的`页面`的序号，从`1`开始计算；
- `nextIndex` 是滚动到的`页面`的序号，从`1`开始计算；
- `direction` 判断往上滚动还是往下滚动，值是 `up` 或`down`。

```
$('#fullpage').fullpage({
    onLeave: function(index, nextIndex, direction){
        var leavingSection = $(this);
        //after leaving section 2
        if(index == 2 && direction =='down'){
            alert("Going to section 3!");
        }
        else if(index == 2 && direction == 'up'){
            alert("Going to section 1!");
        }
    }
});
```

取消`section`的滚动

你可以在`onLeave` 回调函数中返回`false`，那么将取消滚动。

```
$('#fullpage').fullpage({
    onLeave: function(index, nextIndex, direction){
        //it won't scroll if the destination is the 3rd section
        if(nextIndex == 3){
            return false;
        }
    }
});
```

### afterRender()

这个回调函数只是在生成页面结构的时候调用。这是要用来初始化其他插件或删除任何需要的文件准备好代码的回调（这个插件修改 DOM 创建得到的结构）。

```
$('#fullpage').fullpage({
    afterRender: function(){
        var pluginContainer = $(this);
        alert("The resulting DOM structure is ready");
    }
});
```

### afterResize()

这个回调函数在窗口发生大小改变的时候被调用，就在部分调整。

```
$('#fullpage').fullpage({
    afterResize: function(){
        var pluginContainer = $(this);
        alert("The sections have finished resizing");
    }
});
```

### afterSlideLoad (anchorLink, index, slideAnchor, slideIndex)

滚动到某一水平滑块后的回调函数，与 `afterLoad` 类似，接收 `anchorLink、index、slideIndex、direction` 4 个参数。

- anchorLink: anchorLink corresponding to the section.
- index: index of the section. Starting from 1.
- slideAnchor: anchor corresponding to the slide (in case there is)
- slideIndex: index of the slide. Starting from 1\. (the default slide doesn't count as slide, but as a section)

在没有`anchorlinks`的幻灯片或幻灯片`SlideIndex`参数是唯一使用定义的情况下。

```
$('#fullpage').fullpage({
    anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'lastPage'],

    afterSlideLoad: function( anchorLink, index, slideAnchor, slideIndex){
        var loadedSlide = $(this);

        //first slide of the second section
        if(anchorLink == 'secondPage' && slideIndex == 1){
            alert("First slide loaded");
        }

        //second slide of the second section (supposing #secondSlide is the
        //anchor for the second slide
        if(index == 2 && slideIndex == 'secondSlide'){
            alert("Second slide loaded");
        }
    }
});
```

### onSlideLeave (anchorLink, index, slideIndex, direction, nextSlideIndex)

某一水平滑块滚动前的回调函数，与 `onLeave` 类似，接收 `anchorLink、index、slideIndex、direction` 4 个参数。

- anchorLink: anchorLink corresponding to the section.
- index: index of the section. Starting from 1.
- slideIndex: index of the slide. Starting from 0.
- direction: takes the values right or left depending on the scrolling direction.
- nextSlideIndex: index of the destination slide. Starting from 0.

```
$('#fullpage').fullpage({
    onSlideLeave: function( anchorLink, index, slideIndex, direction, nextSlideIndex){
        var leavingSlide = $(this);

        //leaving the first slide of the 2nd Section to the right
        if(index == 2 && slideIndex == 0 && direction == 'right'){
            alert("Leaving the fist slide!!");
        }

        //leaving the 3rd slide of the 2nd Section to the left
        if(index == 2 && slideIndex == 2 && direction == 'left'){
            alert("Going to slide 2! ");
        }
    }
});
```

取消`slide`滑动

你可以设置回调函数`onSlideLeave` 返回`false`，那么他将阻止此次的滑动事件，就像`onLeave`一样。[dwqa-submit-question-form]

---

原文地址：<http://www.binjs.com/archives/542>

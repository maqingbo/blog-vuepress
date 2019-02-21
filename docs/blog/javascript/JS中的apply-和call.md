---
title: JS中的apply()和call()
comments: true
date: 2017-06-27 16:06:37
tags: JavaScript
categories: JavaScript
---

apply()和call()是JavaScript中常用的两个方法了，今天看到两种很简洁明了的解释，记一下。

<!-- more -->

### 解释一

`call` 和 `apply` 都是为了改变某个函数运行时的 `context`(即上下文) 而存在的，换句话说，就是为了改变函数体内部 `this` 的指向。因为 JavaScript 的函数存在「定义时上下文」和「运行时上下文」以及「上下文是可以改变的」这样的概念。

二者的作用完全一样，只是接受参数的方式不太一样。例如，有一个函数 func1 定义如下：

```
var func1 = function(arg1, arg2) {};
```

就可以通过 `func1.call(this, arg1, arg2);` 或者 `func1.apply(this, [arg1, arg2]);` 来调用。其中 this 是你想指定的上下文，他可以任何一个 JavaScript 对象 (JavaScript 中一切皆对象)，`call` 需要把参数按顺序传递进去，而 `apply` 则是把参数放在数组里。

JavaScript 中，某个函数的参数数量是不固定的，因此要说适用条件的话，

- 当你的参数是明确知道数量时，用 call，
- 而不确定的时候，用 apply，然后把参数 push 进数组传递进去。
- 当参数数量不确定时，函数内部也可以通过 arguments 这个数组来便利所有的参数。


------------

### 解释二

在javascript OOP中，我们经常会这样定义：

```
function cat(){ }
cat.prototype={
    food:"fish",
    say: function(){
    alert("I love "+this.food);
    }
}
var blackCat = new cat;
blackCat.say();
```

但是如果我们有一个对象`whiteDog = {food:"bone"},`我们不想对它重新定义`say`方法，那么我们可以通过`call`或`apply`用`blackCat`的`say`方法：
```
blackCat.say.call(whiteDog);
```

所以，可以看出`call`和`apply`是为了动态改变`this`而出现的，**当一个`object`没有某个方法，但是其他的有，我们可以借助`call`或`apply`用其它对象的方法来操作。**

用的比较多的，通过`document.getElementsByTagName`选择的`dom`节点是一种类数组。它不能直接应用`Array`下的`push,pop`等方法。我们可以通过：
```
var domNodes = Array.prototype.slice.call(document.getElementsByTagName("*"));
```
这样`domNodes`就可以应用`Array`下的所有方法了。

> 以上均出自知乎

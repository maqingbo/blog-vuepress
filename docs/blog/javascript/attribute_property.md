---
title: 'attribute 和 property 的区别'
---

`attributes` 属于 HTML。为了易于区别，我们译为`特性`。

`properties` 属于 DOM，译为`属性`，而在 JavaScript 中我们操作 HTML 时使用的就是 DOM。

<!-- more -->

### Attribute（特性）

-  attributes 由 HTML 来定义，像是 id、title、class 等等。

比如这样一段 html 代码，input 元素就有三个 attribute。

```
<input  type='text'  id='txt'  a=b />
```

HTML 元素映射到 DOM 是 HTMLElement 类型的节点对象，HTMLElement 类型的节点对象有一个 attributes 属性，这个属性本身也是一个对象，HTML 元素的所有 attribute 都包含在这个对象里面。

attributes 对象特点：

- 以动态集合的方式存在（NamedNodeMap）
- 只能是字符串
- 大小写不敏感

attributes 对象本身也有一些操作 HTML 的 attribute 的方法，但是实际上，这个对象极少使用。一般都是通过 HTMlElement 节点对象的几个方法来操作 HTML 的 attribute。

```
elem.hasAttribute(name)  // 检查 attribute 是否存在
elem.getAttribute(name)  // 获得 attribute
elem.setAttribute(name, value)  // 设置 attribute 的值
elem.removeAttribute(name)  // 删除 attribute
```

### Property（属性）

在 JS 里面我们使用 DOM 来操作 HTML 元素，DOM 为了操作 HTML ，将 HTML 中的元素描绘成一个个的节点，HTML 元素的每一个公认的（非自定义的） `attribute` 映射为节点对象上一个个的 `property` 。

properties 特点：

- 可以是任何的数据类型，
- 对大小写敏感，
- js 中自定义的 property 不会出现在 html 代码中，只存在 js 中

例：
```
<div id="myDiv" class="bd" title="Body text"></div>
```

在 HTML 中，`div`是一个元素，`id、class、title`是它的`attributes`（特性）；
在 DOM 中，`div`元素为`HTMLElement`类型的节点对象，`id、className、title`是它的`properties`（属性）。

> 有些 HTML 特性是 JavaScript 的保留字，转为 property 时，必须改名。主要是以下两个。
> - for 属性改为 htmlFor
> - class 属性改为 className

### dataset 属性

上面我们讲了，HTML 元素的每一个 **公认的（非自定义的）** attribute 映射为节点对象上一个个的 property 。那么自定义的怎么办？

有时，需要在 HTML 元素上附加数据，供 JavaScript 脚本使用。一种解决方法是自定义特性。

```
<div id="mydiv" foo="bar">
```

上面代码为 div 元素自定义了 foo 特性，然后可以用`getAttribute()`和`setAttribute()`读写这个特性。这种方法虽然可以达到目的，但是会使得 HTML 元素的属性不符合标准，导致网页的 HTML 代码通不过校验。

更好的解决方法是，使用标准提供的`data-*`特性。

```
<div id="mydiv" data-foo="bar">
```

HTMLElement 节点对象有一个 `dataset` 属性，它本身也是一个对象，可以用来操作 HTML 元素的`data-*`特性。

```
var n = document.getElementById('mydiv');
n.dataset.foo // bar
n.dataset.foo = 'baz'
```

> 注意，data-后面的属性名有限制，只能包含字母、数字、连词线（`-`）、点（`.`）、冒号（`:`）和下划线（`_`)。而且，属性名不应该使用 A 到 Z 的大写字母，比如不能有`data-helloWorld`这样的属性名，而要写成`data-hello-world`。

> 转成 dataset 的键名时，连词线后面如果跟着一个小写字母，那么连词线会被移除，该小写字母转为大写字母，其他字符不变。反过来，dataset 的键名转成属性名时，所有大写字母都会被转成连词线`+`该字母的小写形式，其他字符不变。比如，`dataset.helloWorld`会转成`data-hello-world`。

### 相通之处

-  公认的（非自定义的）attribute，如 id、class、titile 等，都会有对应的 property 映射。

-  公认的（非自定义的） property 或 attribute 的变化多数是联动的。
  attribute 更改时，相应的 property 将自动更新，反之亦然。

```
// HTML
// <div id="test" class="button"></div>

var div = document.getElementById('test');
div.className = 'red-input';
div.getAttribute('class');   // "red-input"

div.setAttribute('class','green-input');
div.className;   // "green-input"
```

但是有例外，带有默认值的 attribute 不随 property 变化而变化。

```
// HTML
// <input id="search" value="foo" />

var input = document.getElementById('search');
input.value = 'foo2';
input.getAttribute('value');   // "foo"
```

### 不同之处

有几类特殊的特性，它们虽然有对应的属性名，但属性的值与通过`getAttribute()`返回的值并不相同。如 href，src，value，style，onclick 等事件处理程序。

- `href`、`src`
  `getAttribute()` 获取的是 href 的实际值，而点号获取的是完整的 url，存在浏览器差异。
```
<a href="#"></a>
<script>
    var a  = document.body.children[0]
    a.href = '/'
    alert( 'attribute:' + a.getAttribute('href') ) // '/'
    alert( 'property:' + a.href )  // IE: '/'; others: full URL
</script>
```

- `style`，用于通过 CSS 为元素指定样式。
  在通过`getAttribute()`访问时，返回的 style 特性值中包含的是 CSS 文本，而通过属性来访问它则会返回一个对象。由于`style`属性是用于以编程方式访问元素样式的，因此并没有直接映射到`style`特性。

- `onclick`这样的事件处理程序。
  当在元素上使用时，`onclick`特性中包含的是 JavaScript 代码，如果通过`getAttribute()`访问，则会返回相应代码的字符串。而在 DOM 中访问`onclick`属性时，则会返回一个 JavaScript 函数（如果未在元素中指定相应特性，则返回 null）。这是因为 onclick 及其他事件处理程序属性本身就应该被赋予函数值。

由于存在这些差别，在通过 JavaScript 以编程方式操作 DOM 时，开发人员不经常使`getAttribute()`，而是只使用对象的属性。

------

参考：

- [MDN - Attr](https://developer.mozilla.org/zh-CN/docs/Web/API/Attr)
- [阮一峰 - DOM - 属性的操作](http://javascript.ruanyifeng.com/dom/attribute.html#toc8)
- [Attributes and properties](http://javascript.info/dom-attributes-and-properties)
- [property 和 attribute 的区别](http://www.jianshu.com/p/rRssiL)

<Valine></Valine>

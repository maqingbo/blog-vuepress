---
title: 'JavaScript 严格模式'
---

严格模式是一种将更好的错误检查引入代码中的方法。

<!-- more -->

## 什么是严格模式

ECMAScript 5 引入严格模式 (`strict mode`) 概念。通过严格模式，在函数内部选择进行较为严格的全局或局部的错误条件检测，使用严格模式的好处是可以提早知道代码中的存在的错误，及时捕获一些可能导致编程错误的 ECMAScript 行为。在开发中使用严格模式能帮助我们早发现错误。

## 为什么要使用严格模式

主要有以下几个：错误检测、规范、效率、安全、面向未来

- 消除 Javascript 语法的一些不合理、不严谨之处，减少一些怪异行为；
- 消除代码运行的一些不安全之处，保证代码运行的安全；
- 提高编译器效率，增加运行速度；
- 为未来新版本的 Javascript 做好铺垫。

## 开启严格模式

严格模式可以应用到整个 `script` 标签或个别函数中。

### 全局开启（不推荐）

为整个 script 标签开启严格模式，需要在所有语句之前放一个特定语句 `"use strict";`

```
// 整个语句都开启严格模式的语法
"use strict";
var v = "Hi!  I'm a strict mode script!";
```

- 这个语法从 ECMAScript 3 开始支持。向后兼容不支持严格模式的浏览器，他们就当遇到了一个普通字符串，编译时忽略。
- 将 `use strict` 放在脚本文件的第一行，则整个脚本都将以 "严格模式" 运行。
- 如果这行语句不在第一行，则无效，整个脚本以 "正常模式" 运行。
- 如果不同模式的代码文件合并成一个文件很危险，这一点需要特别注意。

### 函数内开启（推荐）

将 `use strict` 放在函数体的第一行，则整个函数以 "严格模式" 运行。

```javascript
function strict(){
  "use strict";
  return "这是严格模式。";
}
function notStrict() {
  return "这是正常模式。";
}
```

因为上面的调用方法不利于文件合并，所以更好的做法是将整个脚本文件放在一个`立即执行的函数表达式`之中。

```javascript
+function (){
  "use strict";
  ...
}();
```

## 严格模式有哪些不同

### 变量

严格模式下，变量都必须先用 `var` 命令显示声明，然后再使用，否则直接报错。
意外创建的全局变量（函数内没有使用`var`创建的变量），也会报错。

```javascript
!function (){
  'use strict';
  tt = 4;
  console.log(tt);
}();

// Uncaught ReferenceError: tt is not defined
```

------------

别用这些词做 **变量名 **或 **参数名**
```
implements, interface, let, package, private, protected, public, static, yield
```
这些都是保留字，将来 ECMAScript 版本中可能会用到他们，使用这些标识符作为变量名会导致语法错误。
```javascript
!function (){
  'use strict';
  var implements = 4;
  console.log(implements);
}();

// Uncaught SyntaxError: Unexpected strict mode reserved word
```

------------

严格模式下写入到只读属性，直接报错。

```javascript
!function (){
  'use strict';
  var obj = {
    get x() { return 17; }
  };
  obj.x = 5;
}();

// Uncaught TypeError: Cannot set property x of #<Object> which has only a getter
```

------------

严格模式下，试图删除不可删除的属性时会抛出异常

```javascript
!function (){
  'use strict';
  delete Object.prototype;
}();

// Uncaught TypeError: Cannot delete property 'prototype' of function Object() { [native code] }
```

### 对象

严格模式要求一个对象内的所有属性名在对象内必须唯一。

当一个对象内有重名属性时：

- 正常模式下：取最后一个重名的属性决定其属性值。
- 严格模式下：报错！

>　此问题 ES6 已解决，

------------

严格模式要求函数的参数名唯一。

```javascript
function sum(a, a, c){ // !!! 语法错误
  "use strict";
  return a + b + c; // 代码运行到这里会出错
}

//　Uncaught SyntaxError: Duplicate parameter name not allowed in this context
```

------------

严格模式下禁止八进制数字语法或尝试对八进制值使用转义。

```javascript
!function (){
  "use strict";
  var a = 0o10; // ES6: 八进制
  console.log(a);
}();
```
> 貌似这个问题已解决，没有报错。

------------

在严格模式下，函数声明无法嵌套在语句或块中。它们只能显示在顶级或直接显示在函数体中。

```javascript
var arr = [1, 2, 3, 4, 5];
var index = null;
for (index in arr) {
    function myFunc() {};
    console.log(typeof myFync);
}

// undefined
```

------------

字符串 “arguments” 不能用作标识符（变量或函数名、参数名等）。

```javascript
!function (){
  "use strict";
  var arguments = 10;
  console.log(arguments);
}();

// Uncaught SyntaxError: Unexpected eval or arguments in strict mode
```

------------

严格模式下不允许使用 `with` 语句。
```javascript
!function (){
  "use strict";
  with (Math){
    x = cos(3);
    y = tan(7);
  }
}();

// Uncaught SyntaxError: Strict mode code may not include a with statement
```

--------------

参考资料：

- [MDN 严格模式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode)
- [Micorsoft 严格模式](https://msdn.microsoft.com/zh-cn/library/br230269%28v=vs.94%29.aspx)

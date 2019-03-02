---
title: 'this 指向问题'
---
这文章，来帮助大家全方位的解读 this。让大家对 this，有一个正确的，全面的认知。

<!-- more -->

在执行上下文的创建阶段，会分别生成变量对象，建立作用域链，确定 this 指向。

在这里，我们需要得出一个非常重要一定要牢记于心的结论，**this 的指向，是在函数被调用的时候确定的。** 也就是执行上下文被创建时确定的。因此我们可以很容易就能理解到，一个函数中的 this 指向，可以是非常灵活的。比如下面的例子中，同一个函数由于调用方式的不同，this 指向了不一样的对象。

```
var a = 10;
var obj = {
    a: 20
}

function fn () {
    console.log(this.a);
}

fn(); // 10
fn.call(obj); // 20
```

除此之外，**在函数执行过程中，this 一旦被确定，就不可更改了。**

```
var a = 10;
var obj = {
    a: 20
}

function fn () {
    this = obj; // 这句话试图修改 this，运行后会报错
    console.log(this.a);
}

fn();
```

## 全局对象中的 this

关于全局对象的 this，我之前在总结变量对象的时候提到过，它是一个比较特殊的存在。全局环境中的 this，指向它本身。因此，这也相对简单，没有那么多复杂的情况需要考虑。

```
// 通过 this 绑定到全局对象
this.a2 = 20;

// 通过声明绑定到变量对象，但在全局环境中，变量对象就是它自身
var a1 = 10;

// 仅仅只有赋值操作，标识符会隐式绑定到全局对象
a3 = 30;

// 输出结果会全部符合预期
console.log(a1);
console.log(a2);
console.log(a3);
```

## 函数中的 this

结论：在一个函数上下文中，this 由调用者提供，由调用函数的方式来决定。**如果调用者函数，被某一个对象所拥有，那么该函数在调用时，内部的 this 指向该对象。如果函数独立调用，那么该函数内部的 this，则指向 undefined**。但是在非严格模式中，当 this 指向 undefined 时，它会被自动指向全局对象。

从结论中我们可以看出，想要准确确定 this 指向，找到函数的调用者以及区分他是否是独立调用就变得十分关键。

```
// 为了能够准确判断，我们在函数内部使用严格模式，因为非严格模式会自动指向全局
function fn() {
    'use strict';
    console.log(this);
}

fn();  // fn 是调用者，独立调用
window.fn();  // fn 是调用者，被 window 所拥有
```

在上面的简单例子中，`fn()`作为独立调用者，按照定义的理解，它内部的 this 指向就为 undefined。而`window.fn()`则因为 fn 被 window 所拥有，内部的 this 就指向了 window 对象。

------------

然而请看下面这个例子：

```
// demo03
var a = 20;
var obj = {
    a: 10,
    c: this.a + 20,
    fn: function () {
        return this.a;
    }
}

console.log(obj.c);
console.log(obj.fn());
```

在 demo03 中，对象 obj 中的 c 属性使用`this.a + 20`来计算，而他的调用者`obj.c`并非是一个函数。因此他不适用于上面的规则，我们要对这种方式单独下一个结论。

**当 obj 在全局声明时，无论`obj.c`在什么地方调用，这里的 this 都指向全局对象，而当 obj 在函数环境中声明时，这个 this 指向 undefined，在非严格模式下，会自动转向全局对象。**可运行下面的例子查看区别。

```
'use strict';
var a = 20;
function foo () {
    var a = 1;
    var obj = {
        a: 10,
        c: this.a + 20,
        fn: function () {
            return this.a;
        }
    }
    return obj.c;

}
console.log(foo()); // 运行会报错
```

>  实际开发中，并不推荐这样使用 this；
>  上面多次提到的严格模式，需要大家认真对待，因为在实际开发中，现在基本已经全部采用严格模式了，而最新的 ES6，也是默认支持严格模式。

再来看一些容易理解错误的例子，加深一下对调用者与是否独立运行的理解。

```
var a = 20;
var foo = {
    a: 10,
    getA: function () {
        return this.a;
    }
}
console.log(foo.getA()); // 10

var test = foo.getA;
console.log(test());  // 20
```

`foo.getA()`中，getA 是调用者，他不是独立调用，被对象 foo 所拥有，因此它的 this 指向了 foo。而`test()`作为调用者，尽管他与 foo.getA 的引用相同，但是它是独立调用的，因此 this 指向 undefined，在非严格模式，自动转向全局 window。

灵机一动，再来一个。如下例子。

```
function foo() {
    console.log(this.a)
}

function active(fn) {
    fn(); // 真实调用者，为独立调用
}

var a = 20;
var obj = {
    a: 10,
    getA: foo
}

active(obj.getA);
```

## 使用 call，apply 显示指定 this

JavaScript 内部提供了一种机制，让我们可以自行手动设置 this 的指向。它们就是 call 与 apply。所有的函数都具有着两个方法。它们除了参数略有不同，其功能完全一样。它们的第一个参数都为 this 将要指向的对象。

如下例子所示。fn 并非属于对象 obj 的方法，但是通过`call`，我们将 fn 内部的 this 绑定为 obj，因此就可以使用 this.a 访问 obj 的 a 属性了。这就是 call/apply 的用法。

```
function fn() {
    console.log(this.a);
}
var obj = {
    a: 20
}

fn.call(obj);
```

而 call 与 applay 后面的参数，都是向将要执行的函数传递参数。其中 call 以一个一个的形式传递，apply 以数组的形式传递。这是他们唯一的不同。

```
function fn(num1, num2) {
    console.log(this.a + num1 + num2);
}
var obj = {
    a: 20
}

fn.call(obj, 100, 10); // 130
fn.apply(obj, [20, 10]); // 50
```

因为 call/apply 的存在，这让 JavaScript 变得十分灵活。因此就让 call/apply 拥有了很多有用处的场景。简单总结几点，也欢迎大家补充。

*   将类数组对象转换为数组

```
function exam(a, b, c, d, e) {

    // 先看看函数的自带属性 arguments 什么是样子的
    console.log(arguments);

    // 使用 call/apply 将 arguments 转换为数组，返回结果为数组，arguments 自身不会改变
    var arg = [].slice.call(arguments);

    console.log(arg);
}

exam(2, 8, 9, 10, 3);

// result:
// { '0': 2, '1': 8, '2': 9, '3': 10, '4': 3 }
// [ 2, 8, 9, 10, 3 ]
//
// 也常常使用该方法将 DOM 中的 nodelist 转换为数组
// [].slice.call( document.getElementsByTagName('li') );
```

*   根据自己的需要灵活修改 this 指向

```
var foo = {
    name: 'joker',
    showName: function() {
      console.log(this.name);
    }
}
var bar = {
    name: 'rose'
}
foo.showName.call(bar);
```

*   实现继承

```
// 定义父级的构造函数
var Person = function(name, age) {
    this.name = name;
    this.age  = age;
    this.gender = ['man', 'woman'];
}

// 定义子类的构造函数
var Student = function(name, age, high) {

    // use call
    Person.call(this, name, age);
    this.high = high;
}
Student.prototype.message = function() {
    console.log('name:'+this.name+', age:'+this.age+', high:'+this.high+', gender:'+this.gender[0]+';');
}

new Student('xiaom', 12, '150cm').message();

// result
// ----------
// name:xiaom, age:12, high:150cm, gender:man;
```

简单给有面向对象基础的朋友解释一下。在 Student 的构造函数中，借助 call 方法，将父级的构造函数执行了一次，相当于将 Person 中的代码，在 Sudent 中复制了一份，其中的 this 指向为从 Student 中 new 出来的实例对象。call 方法保证了 this 的指向正确，因此就相当于实现了基层。Student 的构造函数等同于下。

```
var Student = function(name, age, high) {
    this.name = name;
    this.age  = age;
    this.gender = ['man', 'woman'];
    // Person.call(this, name, age); 这一句话，相当于上面三句话，因此实现了继承
    this.high = high;
}
```

*   在向其他执行上下文的传递中，确保 this 的指向保持不变

如下面的例子中，我们期待的是 getA 被 obj 调用时，this 指向 obj，但是由于匿名函数的存在导致了 this 指向的丢失，在这个匿名函数中 this 指向了全局，因此我们需要想一些办法找回正确的 this 指向。

```
var obj = {
    a: 20,
    getA: function() {
        setTimeout(function() {
            console.log(this.a)
        }, 1000)
    }
}

obj.getA();
```

常规的解决办法很简单，就是使用一个变量，将 this 的引用保存起来。我们常常会用到这方法，但是我们也要借助上面讲到过的知识，来判断 this 是否在传递中被修改了，如果没有被修改，就没有必要这样使用了。

```
var obj = {
    a: 20,
    getA: function() {
        var self = this;
        setTimeout(function() {
            console.log(self.a)
        }, 1000)
    }
}
```

另外就是借助闭包与 apply 方法，封装一个 bind 方法。

```
function bind(fn, obj) {
    return function() {
        return fn.apply(obj, arguments);
    }
}

var obj = {
    a: 20,
    getA: function() {
        setTimeout(bind(function() {
            console.log(this.a)
        }, this), 1000)
    }
}

obj.getA();
```

当然，也可以使用 ES5 中已经自带的 bind 方法。它与我上面封装的 bind 方法是一样的效果。

```
var obj = {
    a: 20,
    getA: function() {
        setTimeout(function() {
            console.log(this.a)
        }.bind(this), 1000)
    }
}
```

## 构造函数与原型方法上的 this

在封装对象的时候，我们几乎都会用到 this，但是，只有少数人搞明白了在这个过程中的 this 指向，就算我们理解了原型，也不一定理解了 this。所以这一部分，我认为将会为这篇文章最重要最核心的部分。理解了这里，将会对你学习 JS 面向对象产生巨大的帮助。

结合下面的例子，我在例子抛出几个问题大家思考一下。

```
function Person(name, age) {

    // 这里的 this 指向了谁？
    this.name = name;
    this.age = age;
}

Person.prototype.getName = function() {

    // 这里的 this 又指向了谁？
    return this.name;
}

// 上面的 2 个 this，是同一个吗，他们是否指向了原型对象？

var p1 = new Person('Nick', 20);
p1.getName();
```

我们已经知道，this，是在函数调用过程中确定，因此，搞明白 new 的过程中到底发生了什么就变得十分重要。

通过 new 操作符调用构造函数，会经历以下 4 个阶段。

*   创建一个新的对象；
*   将构造函数的 this 指向这个新对象；
*   执行构造函数的代码，为这个对象添加属性，方法等；
*   返回新对象。

因此，当 new 操作符调用构造函数时，this 其实指向的是这个新创建的对象，最后又将新的对象返回出来，被实例对象 p1 接收。因此，我们可以说，这个时候，构造函数的 this，指向了新的实例对象，p1。

而原型方法上的 this 就好理解多了，根据上边对函数中 this 的定义，`p1.getName()`中的 getName 为调用者，他被 p1 所拥有，因此 getName 中的 this，也是指向了 p1。

------------

## this 绑定优先级

```
new 绑定 > 显示绑定 > 隐式绑定 > 默认绑定
```

## 总结

1.  如果函数被`new` 修饰
```
this 绑定的是新创建的对象，例：var bar = new foo(); 函数 foo 中的 this 就是一个叫 foo 的新创建的对象 , 然后将这个对象赋给 bar , 这样的绑定方式叫 new 绑定 .
```

2.  如果函数是使用`call,apply,bind`来调用的
```
this 绑定的是 call,apply,bind 的第一个参数。例：foo.call(obj); , foo 中的 this 就是 obj , 这样的绑定方式叫 显性绑定 .
```

3.  如果函数是在某个 上下文对象 下被调用
```
this 绑定的是那个上下文对象，例 : var obj = { foo : foo }; obj.foo(); foo 中的 this 就是 obj . 这样的绑定方式叫 隐性绑定 .
```

4.  如果都不是，即使用默认绑定
```
例：function foo(){...} foo() ,foo 中的 this 就是 window.（严格模式下默认绑定到 undefined).
这样的绑定方式叫 默认绑定 .
```

------------

## 常见面试题

### 第一题

```
var x = 10;
var obj = {
  x: 20,
  f: function() {
    console.log(this.x);     // ?
    var foo = function() {
      console.log(this.x);
    }
    foo();     // ?
  }
};
obj.f();
```

**解析：**

考点：函数内的 this

```
var x = 10;
var obj = {
  x: 20,
  f: function() {
    console.log(this.x);    // 20
    function foo() {
      console.log(this.x);
    }
    foo();   // 函数独立调用，那么该函数内部的 this，则指向 undefined。但是在非严格模式中，当 this 指向 undefined 时，它会被自动指向全局对象。
  }
};
obj.f();    // 调用者函数，被某一个对象所拥有，那么该函数在调用时，内部的 this 指向该对象。
```
答案：20 10

### 第二题

```
function foo(arg){
    this.a = arg;
    return this
};

var a = foo(1);
var b = foo(10);

console.log(a.a);    // ?
console.log(b.a);    // ?
```

**解析：**

考点 1. 全局污染 2. this 默认绑定

这道题很有意思，问题基本上都集中在第一`undefined`上，这其实是题目的小陷阱，但是追栈的过程绝对精彩
让我们一步步分析这里发生了什么：

1.  foo(1) 执行，应该不难看出是默认绑定吧 , this 指向了 window，函数里等价于 window.a = 1,return window;
2.  var a = foo(1) 等价于 window.a = window , 很多人都忽略了 var a 就是 window.a，将刚刚赋值的 1 替换掉了。
3.  所以这里的 a 的值是 window , a.a 也是 window ， 即 window.a = window ; window.a.a = window;
4.  foo(10) 和第一次一样，都是默认绑定，这个时候，将 window.a 赋值成 10 ，注意这里是关键，原来 window.a = window , 现在被赋值成了 10，变成了值类型，所以现在 a.a = undefined。（验证这一点只需要将 var b = foo(10); 删掉，这里的 a.a 还是 window)
5.  var b = foo(10); 等价于 window.b = window;

本题中所有变量的值，a = window.a = 10 , a.a = undefined , b = window , b.a = window.a = 10;

答案 ： undefined 10

### 第三题

```
var x = 10;
var obj = {
    x: 20,
    f: function(){ console.log(this.x); }
};
var bar = obj.f;
var obj2 = {
    x: 30,
    f: obj.f
}
obj.f();
bar();
obj2.f();
```

解析：传说中的送分题，考点，辨别 this 绑定

```
var x = 10;
var obj = {
    x: 20,
    f: function(){ console.log(this.x); }
};
var bar = obj.f;
var obj2 = {
    x: 30,
    f: obj.f
}
obj.f();    // 20  有上下文，this 为 obj，隐性绑定
bar();      // 10  '光杆司令' 默认绑定  （ obj.f 只是普通的赋值操作 ）
obj2.f();   //30  不管 f 函数怎么折腾，this 只和 执行位置和方式有关，即我们所说的绑定规则

```
答案：20 10 30

### 第四题

```
function foo() {
    getName = function () { console.log (1); };
    return this;
}
foo.getName = function () { console.log(2);};
foo.prototype.getName = function () { console.log(3);};
var getName = function () { console.log(4);};
function getName () { console.log(5);}

foo.getName ();                // ?
getName ();                    // ?
foo().getName ();              // ?
getName ();                    // ?
new foo.getName ();            // ?
new foo().getName ();          // ?
new new foo().getName ();      // ?
```

解析：考点 1\. new 绑定 2. 隐性绑定 3\. 默认绑定 4. 变量污染（用词不一定准确）

```
function foo() {
    getName = function () { console.log (1); };
            //这里的 getName 将创建到全局 window 上
    return this;
}
foo.getName = function () { console.log(2);};
        //这个 getName 和上面的不同，是直接添加到 foo 上的
foo.prototype.getName = function () { console.log(3);};
        // 这个 getName 直接添加到 foo 的原型上，在用 new 创建新对象时将直接添加到新对象上
var getName = function () { console.log(4);};
        // 和 foo 函数里的 getName 一样，将创建到全局 window 上
function getName () { console.log(5);}
        // 同上，但是这个函数不会被使用，因为函数声明的提升优先级最高，所以上面的函数表达式将永远替换
        // 这个同名函数，除非在函数表达式赋值前去调用 getName()，但是在本题中，函数调用都在函数表达式
        // 之后，所以这个函数可以忽略了

        // 通过上面对 getName 的分析基本上答案已经出来了

foo.getName ();                // 2
                               // 下面为了方便，我就使用输出值来简称每个 getName 函数
                               // 这里有小伙伴疑惑是在 2 和 3 之间，觉得应该是 3 , 但其实直接设置
                               // foo.prototype 上的属性，对当前这个对象的属性是没有影响的，如果要使
                               // 用的话，可以 foo.prototype.getName() 这样调用 ，这里需要知道的是
                               // 3 并不会覆盖 2，两者不冲突 ( 当你使用 new 创建对象时，这里的
                               // Prototype 将自动绑定到新对象上，即用 new 构造调用的第二个作用）

getName ();                    // 4
                               // 这里涉及到函数提升的问题，不知道的小伙伴只需要知道 5 会被 4 覆盖，
                               // 虽然 5 在 4 的下面，其实 js 并不是完全的自上而下，想要深入了解的
                               // 小伙伴可以看文章最后的链接

foo().getName ();              // 1
                               // 这里的 foo 函数执行完成了两件事，1\. 将 window.getName 设置为 1,
                               // 2\. 返回 window , 故等价于 window.getName(); 输出 1
getName ();                    // 1
                               // 刚刚上面的函数刚把 window.getName 设置为 1, 故同上 输出 1

new foo.getName ();            // 2
                               // new 对一个函数进行构造调用 , 即 foo.getName , 构造调用也是调用啊
                               // 该执行还是执行，然后返回一个新对象，输出 2 （虽然这里没有接收新
                               // 创建的对象但是我们可以猜到，是一个函数名为 foo.getName 的对象
                               // 且__proto__属性里有一个 getName 函数，是上面设置的 3 函数）

new foo().getName ();          // 3
                               // 这里特别的地方就来了，new 是对一个函数进行构造调用，它直接找到了离它
                               // 最近的函数，foo(), 并返回了应该新对象，等价于 var obj = new foo();
                               // obj.getName(); 这样就很清晰了，输出的是之前绑定到 prototype 上的
                               // 那个 getName  3 , 因为使用 new 后会将函数的 prototype 继承给 新对象

new new foo().getName ();      // 3
                               // 哈哈，这个看上去很吓人，让我们来分解一下：
                               // var obj = new foo();
                               // var obj1 = new obj.getName();
                               // 好了，仔细看看，这不就是上两题的合体吗，obj 有 getName 3, 即输出 3
                               // obj 是一个函数名为 foo 的对象，obj1 是一个函数名为 obj.getName 的对象
```

答案：2 4 1 1 2 3 3

------------

参考文章： [全方位解读 this](http://www.jianshu.com/p/d647aa6d1ae6)、[深入理解 this 绑定](https://segmentfault.com/a/1190000011194676#articleHeader2)

<Valine></Valine>

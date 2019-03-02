---
title: Windows 常用 CMD 命令
comments: true
date: 2017-09-17 21:17:18
tags: [cmd,cmder]
categories: 其他
---

平时我们使用的 windows 系统有一个叫做`cmd` 的东西，大部分人可能几乎永远不会遇到使用`cmd`的情景； Linux 操作系统下有同类型的`bash`， OS X 下有`Terminal`。我们常称呼这三样东西为`Terminal`（终端）或`shell`。

<!-- more -->

那么这些`Terminal`有什么作用呢？简单的表述就是：用命令行的方式代替图形界面的键鼠操作！

> windows 系统下的`cmd`不是很好用，建议安装`cmder`，比系统自带的要强大很多。全安装版 `cmder` 自带了 `msysgit`, 压缩包 23M, 除了 `git` 本身这个命令之外，里面可以使用大量的 `linux` 命令。详细的安装使用教程可以参考：
>
> -   [逆天神器 cmder](http://bg.biedalian.com/2014/09/11/cmder.html)
> -   [Win 下必备神器之 Cmder](https://www.jeffjade.com/2016/01/13/2016-01-13-windows-software-cmder/)
> -   [cmder 官网](http://cmder.net/)

* * *

本文介绍一些在生活中最最常用操作（诸如：新建、删除文件与文件夹、打印文档树和关机等）的命令行实现方式。

如何打开`cmd`呢？

> 方法 0：开始菜单里面找`cmd`命令提示符；
> 方法 1：`win`+`r`组合键打开运行栏，键入`cmd`，回车；
> 方法 2：`shift`+**鼠标右键** ，选择 **在此打开命令提示符**
> ...

`cmd`由 **命令** 和 **参数** 组成，每个参数对应不同的实现效果，同时正确地使用多个参数可以实现效果的叠加。在`cmd` 键入`help` 并回车可查看 **`cmd`可用命令列表**，使用 **`help + 命令名`** 可查看该命令的介绍、参数列表与使用方法。

## 定时关机操作

*   有关命令：`shutdown`
*   有关参数：`/s`　 `/t xxx`
*   用法实例：`shut /s /t 3600`　　一小时后关机
*   说　　明：`shutdown`命令不仅可以用来设置定时关机，`shutdown`命令还有其他很多其他参数，`/l` `/r` `/g` `/h` 等，可以用于睡眠、注销与重启操作。进一步了解用法，请在`cmd`里键入 `help shutdown` 进行查询。

## 目录跳转

*   有关命令：`cd`
*   有关参数：文件夹路径
*   用法实例：`cd /D d:/demo`=`d:`+`cd demo`
*   说　　明：切换当前`cmd`的工作路径到 `D` 盘的 `demo` 文件夹下；路径可用文件夹的相对路径也可以使用文件夹在磁盘的绝对路径。
    注意：`cd` 命令在不加`/D`参数时无法跨磁盘驱动器更改目录的，加上`/D`则可以在硬盘各个分区的各个位置切换。

## 新建文件夹

*   有关命令：`md`/`mkdir`
*   常用参数：新建文件夹名字
*   用法实例：`mkdir d:\demo`
*   说　　明：`mkdir d:\demo` 命令可以在`D`盘根目录下新建一个叫做`demo`的文件夹

## 删除文件夹操作

*   有关命令：`rd`
*   常用参数：文件夹所在位置 / 文件夹名
*   用法实例：`rd demo`
*   说　　明：删除`demo` 文件夹！
    注意：`rd`无法删除非空文件夹，所以这个命令是鸡肋！很容易搞得装逼不成反而浪费了自己的时间（`Linux` `Unix` 或者 `DOS` 下用命令删除文件夹则方便的多）

## 删除指定文件

*   有关命令：`del`　`erase`
*   常用参数：文件路径 / 文件名
*   用法实例：`del d:\demo\demo.txt`　`erase d:\demo\demo.txt`
*   说　　明：该命令会删除`D`盘`demo`目录下的`demo.txt`

## 查看文档树结构

*   有关命令：`tree`
*   常用参数：`/f` 文件夹路径 / 文件名
*   用法实例：`tree d:\demo`
*   说　　明：`tree d:\demo` 可以查看`demo`目录下的目录层级结构（不显示单独的文件），加上`/f`参数可以将单个文件也显示到文档树上。

```
// 使用 tree 命令生成的目录层级结构

E:.
├─css
├─fonts
│  └─icomoon
│      └─.font-spider
├─imgs
├─js
└─sass
    └─bootstrap
        └─mixins
```

## 导出运行结果到文本文档

有时候你想讲命令运行的结果发给别人看，你不想截图而想发送纯文本，奈何 `cmd` 无法像普通文本编辑器一样复制。（cmder 是可以复制的）这时该怎么办？

> 情景：你想看看自己的移动盐盘里面都有哪些纪录片，当然这时你可以打开对应的文件夹，挨个点击查看，更好的办法是使用 `cmd` 来解决问题。

比如我的纪录片放在了`I:\ 影音`目录下，于是打开`cmd`输入：

```
I:\
cd I:\ 影音

I:\ 影音
tree /f 纪录片 > C:\Users\ 我的用户名、desktop\ 纪录片。txt
```

这时你会发现没有输出结果，但是打开桌面会发现多了一个`list.txt`，里面是所有的纪录片目录！ Excited！

```
// 示例：我的移动硬盘中的纪录片

I:\ 影音、纪录片
│  [《基础解剖学》.].Anatomy.For.Beginners.ep3[www.xuexi111.com].srt
│  [基础解剖学』.Anatomy.for.Beginners.1.avi
│  [基础解剖学』.Anatomy.for.Beginners.1.srt
│  植物王国 - 第一集。720p.BD 中英双字幕。rmvb
│  植物王国 - 第三集。720p.BD 中英双字幕。rmvb
│  植物王国 - 第二集。720p.BD 中英双字幕。rmvb
│  
└─Planet Earth
        [行星地球 01].Planet.Earth.01. 中文字幕。HR-HDTV.AC3.960X528.x264- 人人影视。mkv
        [行星地球 02].Planet.Earth.02. 中文字幕。HR-HDTV.AC3.960X528.x264- 人人影视。mkv
        [行星地球 03].Planet.Earth.03. 中文字幕。HR-HDTV.AC3.960X528.x264- 人人影视。mkv
        [行星地球 04].Planet.Earth.04. 中文字幕。HR-HDTV.AC3.960X528.x264- 人人影视。mkv
        [行星地球 05].Planet.Earth.05. 中文字幕。HR-HDTV.AC3.960X528.x264- 人人影视。mkv
        [行星地球 06].Planet.Earth.06. 中文字幕。HR-HDTV.AC3.960X528.x264- 人人影视。mkv
        [行星地球 07].Planet.Earth.07. 中文字幕。HR-HDTV.AC3.960X528.x264- 人人影视。mkv
        [行星地球 08].Planet.Earth.08. 中文字幕。HR-HDTV.AC3.960X528.x264- 人人影视。mkv
        [行星地球 09].Planet.Earth.09. 中文字幕。HR-HDTV.AC3.960X528.x264- 人人影视。mkv
        [行星地球 10].Planet.Earth.10. 中文字幕。HR-HDTV.AC3.960X528.x264- 人人影视。mkv
        [行星地球 11].Planet.Earth.11. 中文字幕。HR-HDTV.AC3.960X528.x264- 人人影视。mkv
        行星地球 2.Planet.earth.II.S01E01. 中英字幕。HR-HDTV.AAC.1024X576.x264.mp4
        行星地球 2.Planet.earth.II.S01E02. 中英字幕。HR-HDTV.AAC.1024X576.x264.mp4
        行星地球 2.Planet.earth.II.S01E03. 中英字幕。HR-HDTV.AAC.1024X576.x264.mp4
        行星地球 2.Planet.earth.II.S01E04. 中英字幕。HR-HDTV.AAC.1024X576.x264.mp4
        行星地球 2.Planet.earth.II.S01E05. 中英字幕。HR-HDTV.AAC.1024X576.x264.mp4
        行星地球 2.Planet.earth.II.S01E06.END. 中英字幕。HR-HDTV.AAC.1024X576.x264.mp4
```

我们注意到命令运行没有结果出现在`cmd`对话框里，原因在于**转向符** `>`，这个符号的意思是：将命令运行的结果转向导出到特定目录下的特定文本文档（原本没有该文本则会新建）。

## ipconfig

这个比较简单，就是获取本机详细网络配置信息。IP 地址、子网掩码、网关等等。

* * *

对于一个程序员来说，一个操作系统好不好用一定会考虑命令行终端的使用方便程度，学会使用命令行终端也是程序员的必备修养。

在平时的生活中确实没必要用到这些晦涩的东西，但是一旦学会，将成为你装逼与提高生活质量的一大利器！

`cmd`的使用还远不止如此，可以百度`CMD 命令速查手册` 获取命令的在线学习，或者使用`cmd`自带的 `help`进行学习。

参考：[Windows 常用 CMD 命令介绍](https://www.zybuluo.com/yangfch3/note/173158)

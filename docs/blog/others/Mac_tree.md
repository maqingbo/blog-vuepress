---
title: Mac 终端中使用 tree 命令
---


## 1. 使用`find`命令模拟`tree`效果

如显示当前目录的 `tree` 的命令：

```shell
$ find . -print | sed -e 's;[^/]*/;|____;g;s;____|; |;g'
```

当然你也可以写一个别名来快速执行该命令，运行如下命令，将上面这个命令写到`~/.bash_profile`里，以后直接运行`tree`命令就更方便了:

```shell
alias tree="find . -print | sed -e 's;[^/]*/;|____;g;s;____|; |;g'"
```

## 2. 使用`homebrew`安装`tree`命令行：

```shell
$ brew install tree
```

这样就在你的 mac 上安装了`tree`命令行了。

输入`tree --help`可查看参数介绍，以下为部分参数的中文解释：


```
 ------- Listing options -------
  -a            列出所有文件和目录
  -d            只列出目录.
  -l            Follow symbolic links like directories.
  -f            文件名称前显示路径.
  -x            Stay on current filesystem only.
  -L level      要显示的层级，level 为数字格式.


 ------- File options -------
  -q            不能打印的字符显示 '?'.
  -N            不能打印的字符就显示本来的样子. --- 中文乱码时加这个参数
  -Q            文件名称加双引号.
  -p            Print the protections for each file.
  -u            文件名前面加归属人的名字.
  -g            Displays file group owner or GID number.
  -s            显示文件大小（字节）.
  -h            显示文件大小（kb）.
  --si          显示文件大小（字节），不显示层级关系.
  -D            显示每个文件最后修改时间.
  -F            Appends '/', '=', '*', '@', '|' or '>' as per ls -F.


 ------- Sorting options -------
  -v            Sort files alphanumerically by version.
  -t            Sort files by last modification time.
  -c            Sort files by last status change time.
  -U            Leave files unsorted.
  -r            Reverse the order of the sort.
  --dirsfirst   List directories before files (-U disables).
  --sort X      Select sort: name,version,size,mtime,ctime.
  
 
 ------- XML/HTML/JSON options -------
  -X            以 XML 样式打印.
  -J            以 JSON 样式打印.
  -H baseHREF   Prints out HTML format with baseHREF as top directory.
  -T string     Replace the default HTML title and H1 header with string.
  --nolinks     Turn off hyperlinks in HTML output.
  ------- Input options -------
  --fromfile    Reads paths from files (.=stdin)
  ------- Miscellaneous options -------
  --version     Print version and exit.
  --help        Print usage and this help message and exit.
  --            Options processing terminator.
```

<Valine></Valine>
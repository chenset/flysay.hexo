title: ubuntu64位执行迅雷远程下载固件
tags:
	- linux
date: 2016-05-24
---
### 介绍

ubuntu64位执行迅雷远程下载固件(Xware1.0.31_x86_32_glibc.zip)提示"没有那个文件或目录".

### 解决

安装缺少的32位的运行库

``` bash  
apt-get install libc6-i386 lib32z1
```

<end></end>

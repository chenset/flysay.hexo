title: Windows/Linux免密码push到Git
tags:
	- Git
	- Linux
date: 2016-11-29
---

### 介绍

国内链接GitHub速度惨不忍睹. 每次push都要登上一会才出现密码输入, 难以忍受.
下面记录一个Windows/UNIX/Linux通用的免去每次push都要输入密码的方式.

<end></end>

### 生成秘钥对   

```
ssh-keygen -t rsa -b 2048 -C "email@google.com"
```

会生成两个文件在用户目录的.ssh中, 分别为id_rsa和id_rsa.pub.

打开id_rsa.pub并将内容复制粘贴到GitHub的 Settings -> SSH and GPG keys -> New SSH key -> key

### 修改项目push的方式

默认情况下GitHub clone下来的为http协议push方式, 需要修改为ssh方式.

```
// 进入Git项目路径, 并执行命令

git remote set-url origin git@github.com:user/project.git
```

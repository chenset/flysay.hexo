title: Linux下搭建ngrok tcp服务
tags:
	- Linux
date: 2016-12-07
---

### 介绍

搭建一个ngrok的tcp服务, 用于穿透内网访问家里的服务

### 

### 服务端运行


```
./ngrokd -domain "xxx.xxx.com" -tunnelAddr ":44444"  # 服务器的地址与端口设置
```

### 客服端运行

创建配置文件 config.ini   

```
server_addr: "xxx.xxx.com:44444"  # 指定服务器的地址与端口
trust_host_root_certs: false
tunnels:
    flysay:                       # 为该穿透配置命名, 可以有多个不同的配置
        remote_port: 33333        # 指定远程访问的端口, 不然tcp模式下会随机生成.  配置完成之后使用 xxx.xxx.com:33333访问该穿透
        proto:
            tcp: 80               # tcp协议的本地80端口
            
```

```
./ngrok -log=stdout -config=./config.ini start flysay  # 开启名为flysay的穿透 . -log=stdout加上该参数才能后台运行
```

title: Linux下搭建ngrok TCP服务
tags:
	- Linux
date: 2016-12-07
---

### 介绍

搭建一个ngrok的TCP穿透服务, 用于穿透内网访问家里的服务
<end></end>

### 安装服务端和客户端

安装编译工具链

```
#ubuntu
apt-get install build-essential
#centos
yum groupinstall "Development Tools"
```

安装Go, ngrok基于Go实现, 编译时需要Go的支持.下载解压即可

```
wget https://storage.googleapis.com/golang/go1.7.4.linux-amd64.tar.gz
tar -zxvf go1.7.4.linux-amd64.tar.gz
mv ./go /usr/local/go  # 移动到其他目录
ln -s /usr/local/go/bin/go /usr/bin/go  # make时需要用到Go, 所以要软链到/usr/bin 
```

编译ngrok

```
git clone https://github.com/inconshreveable/ngrok
cd ngrok
make # 完成后会在当前路径下生成bin目录, 其中包含客户端ngrok和服务端ngrokd
```

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
        remote_port: 33333        # 指定远程访问的端口, 不然tcp模式下会随机生成.  配置完成之后使用xxx.xxx.com:33333访问该穿透
        proto:
            tcp: 80               # tcp协议的本地80端口
            
```

运行客户端

```
./ngrok -log=stdout -config=./config.ini start flysay  # 开启名为flysay的穿透 . -log=stdout加上该参数才能后台运行
```

### 注意

过程中涉及到多个端口, 注意放开防火墙的限制

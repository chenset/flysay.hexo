title: 在Docker中一键安装PHP7
tags:
	- docker
	- php
date: 2016-01-11
---
### 介绍

通过使用docker的Dockerfile文件能够非常方便的生成指定的运行环境.
下面将要介绍的是使用Dockerfile文件一键生成的PHP7执行环境.

<end></end>

### Dockerfile

``` bash
FROM ubuntu:latest  # 可以改为已经存在的ubuntu镜像, 如果没有, 则会下载ubunt镜像.

MAINTAINER chenset, 4199191@qq.com

RUN apt-get update

RUN apt-get build-dep -y php5 && apt-get install -y \
    git \
    make \
    autoconf \
    build-essential \
    g++ \
    libc6-dev \
    libmcrypt-dev



RUN cd /opt && git clone https://github.com/php/php-src.git --depth=1

RUN cd /opt/php-src && ./buildconf --force

RUN cd /opt/php-src && ./configure --quiet \
--prefix=/usr/local/php7 \
--exec-prefix=/usr/local/php7 \
--bindir=/usr/local/php7/bin \
--sbindir=/usr/local/php7/sbin \
--includedir=/usr/local/php7/include \
--libdir=/usr/local/php7/lib/php \
--mandir=/usr/local/php7/php/man \
--with-config-file-path=/usr/local/php7/etc \
--with-mcrypt=/usr/include \
--with-mhash \
--with-openssl \
--with-mysqli=shared,mysqlnd \
--with-pdo-mysql=shared,mysqlnd \
--with-gd \
--with-iconv \
--with-zlib \
--enable-zip \
--enable-inline-optimization \
--disable-debug \
--disable-rpath \
--enable-shared \
--enable-xml \
--enable-bcmath \
--enable-shmop \
--enable-sysvsem \
--enable-mbregex \
--enable-mbstring \
--enable-ftp \
--enable-gd-native-ttf \
--enable-pcntl \
--enable-sockets \
--with-xmlrpc \
--enable-soap \
--without-pear \
--with-gettext \
--enable-session \
--with-curl \
--with-jpeg-dir \
--with-freetype-dir \
--enable-opcache \
--enable-fpm \
--with-fpm-user=www \
--with-fpm-group=www \
--without-gdbm \
--disable-fileinfo

RUN cd /opt/php-src && make -j 4 --quiet  # 可以根据cpu数量修改

RUN cd /opt/php-src && make install

RUN cp /opt/php-src/sapi/cli/php /usr/local/bin/php

RUN groupadd www
RUN useradd www -g www -s /sbin/nologin

RUN mv /usr/local/php7/etc/php-fpm.conf.default /usr/local/php7/etc/php-fpm.conf
RUN mv /usr/local/php7/etc/php-fpm.d/www.conf.default /usr/local/php7/etc/php-fpm.d/www.conf

EXPOSE 9000  # 默认的php-fpm端口 
CMD ["/bin/bash"]
```

保存名为dockerfile文件   


### 创建镜像

``` bash
    docker build -f /path/to/dockerfile -t php7 . # (注意后面的"."也要复制) 创建镜像   
```

### 运行

``` bash
    docker run -p 127.0.0.1:9000:9000 -v /path/to/project/:/path/to/project/ --restart=always -d php7 /usr/local/php7/sbin/php-fpm -F
```

参数解释     

- -p 127.0.0.1:9000:9000 , 将host的127.0.0.1:9000绑定到container的9000端口
- -v /path/to/project/:/path/to/project/ , 将host的项目目录mount到container的路径中, 使PHP可以访问到host的项目文件
- --restart=always , container会开机自启动
- -d , 后台运行

### 修改container(视情况可选)

运行container

```
    docker run -it php7
```

修改php-fpm的配置文件

```
    vi /usr/local/php7/etc/php-fpm.d/www.conf  # 将listen = 127.0.0.1:9000 该为 listen = 9000. 使host可以访问container中的php-fpm
```

另外开启一个ssh提交容器修改, 类似数据库的事务机制. 每次运行一次container都类似于开启了一个事务. 当container发生修改则必须commit才能使变更生效.

```
    docker ps  # 查看container ID
    docker commit <CONTAINER_ID> php7
```
    
### 进入container的bash(可选)

```
    docker ps  # 查看container ID
    docker exec -i -t <CONTANER_ID> bash
```
title: Python Requests判断报文头中Content-Length长度后再下载报文body主体
tags:
	- python
date: 2016-01-30
---
### 介绍

在写Python爬虫时, 要实现爬网页中响应报文头的Content-Length和Content-Type.
经过判断报文头中的内容后再决定是否下载报文主体.避免爬虫抓取大文件或不需要的MIME类型.

### 报文主体下载流

主要实现是通过Request的Body Content Workflow去实现报文头和报文主体分开下载, 即设置参数

``` python
stream=True
```

<end></end>

实例:

``` python
req = requests.get('https://www.github.com/', stream=True))  # 此时实际只向服务器获取了报文头部
content = req.content # 此时才执行剩下报文体的下载
# 或通过迭代器逐行获取
for line in req.iter_lines():
    print line
```

### 正确关闭请求连接

由于开启stream=True报文不是一次性全部下载完毕, 所以在过程中中断下载需要使用Response.close.以保证请求连接的正确关闭

或使用contextlib.closing

``` python
with closing(requests.get('https://www.github.com/', stream=True)) as req: 
    pass  # Do something
```

### 完整示例

一个判断Content-length大小, 如超出限制大小则中断下载的示例.

``` python
import requests
from contextlib import closing

size_limit = 1024000000  # 接收限制 1MB
content = ''
with closing(
        requests.get('https://www.github.com/',
                               stream=True)) as req:  # stream=True 设置文本流使用迭代器获取 如:req.iter_lines

    if 'content-length' in req.headers:
        if int(req.headers['content-length']) > size_limit:
            raise Exception(
                'content-length too many. content-length: ' + str(req.headers['content-length']))

        content = req.content

    else:
        size_temp = 0
        for line in req.iter_lines():
            if line:
                size_temp += len(line)
                if size_temp > size_limit:
                    raise Exception('content-length too many.')

                content += line

print content
```


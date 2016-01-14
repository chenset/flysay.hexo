title: 使用VLC捕获树莓派摄像头裸流
tags:
	- 树莓派
date: 2015-12-31
---
### 介绍

IP: 10.0.0.120 为Windows端

### Windows端

    vlc udp://@:8080 --demux=h264

### 树莓派端

    raspivid -t 999999 -hf -o - | socat - udp-datagram:10.0.0.120:8080

### 问题

- 需要先执行Windows端的VLC播放器, 在执行树莓派端的转发命令.

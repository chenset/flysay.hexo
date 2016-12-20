title: ESP8266 ESP-01 模块烧录模式如何接线
tags:
	- 物联网
	- ESP8266
date: 2016-12-01
---

### 介绍
在此记录一次ESP8266 ESP-01模块烧录模式的接线方式.

<img src="/image/esp8266-01.jpg"/>

<end></end>

### 材料   

- ESP8266 ESP-01
- 3.3V 独立供电
- 1k电阻1或2个
- FTDI 下载器, 可以用其他下载器替代 

### 接线

- 下载器TX&nbsp;&nbsp;&nbsp;&nbsp;接 1k电阻 再接 ESP-01的RX   
- 下载器RX&nbsp;&nbsp;&nbsp;&nbsp;接 ESP-01的TX   
- 下载器GND 接 独立供电的GND   

- ESP-01 CH_PD&nbsp;接 1k电阻(可选) 再接 独立供电的3.3v   
- ESP-01 VCC&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;接 独立供电的3.3v   
- ESP-01 GND&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;接 独立供电的GND   
- ESP-01 GPIO0&nbsp;&nbsp;&nbsp;&nbsp;接 独立供电的GND   

<center>
网上的图片, 并稍作修改. 其中10K和2K电阻是可选的
<img src="//flysay.com/image/esp01_with_FTDI.jpg!400"/>   
</center>
   
#### 注意

GPIO0接GND为烧录模式, 是必接的
所有GND都必须供用独立供电的GND

### 烧录

烧录可以使用 Arduino IDE +  [Arduino core for ESP8266 WiFi chip](https://github.com/esp8266/Arduino) 或者 [PlatformIO](http://platformio.org/) (推荐).   

[Arduino core for ESP8266 WiFi chip](https://github.com/esp8266/Arduino) 中有OTA的示例, 可以直接烧录测试   
或者随便烧录一段代码测试.   

```

void setup(){

}

void loop(){

}

```

### 其他

每次接线烧录都比较复杂, 所有自己焊接了一个烧录平台.
当然ESP8266支持OTA功能, 这个自制平台只用于第一次烧录和OTA失败的情况.   

<center>
<img src="//flysay.com/image/ESP8266_IMG_0366.jpg!400"/>   
<img src="//flysay.com/image/ESP8266_IMG_0367.jpg!400"/>   
<img src="//flysay.com/image/ESP8266_IMG_0368.jpg!400"/>   
</center>
   

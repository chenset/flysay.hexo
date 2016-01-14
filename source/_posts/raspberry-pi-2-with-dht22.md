title: 树莓派使用DHT22读取温度的一种方式
tags:
	- 树莓派

---
### 介绍

在网上找了很多教程发现在我的平台上都无法工作. 具体表现为无法读取数据, 读取数据无响应等. 甚至一度认为是芯片有问题.
经过不懈的探索终于还是成功工作了.

所以遇到问题不成功的同学一定要尝试多种方式, 总有一种方式适合你.

### 原料
- Raspberry Pi 2 Model B v1.1  (树莓派 2)
- DHT22(AM2302) 集成上拉电阻版

### 引脚

- DHT22第1个引脚(正极) 接 树莓派第1个引脚 3.3v
- DHT22第2个引脚(OUT) 接 树莓派第7个引脚 GPIO#4
- DHT22第3个引脚(负极) 接 树莓派第6个引脚 GUD

<center>
<img src="/image/P1010249.JPG!600"/>
</center>

### 开始

更新系统

    apt-get update
    apt-get upgrade
    
安装必要的依赖

    apt-get install build-essential python-dev        

使用adafruit/Adafruit_Python_DHT包

    git clone https://github.com/adafruit/Adafruit_Python_DHT.git
    cd ./Adafruit_Python_DHT
    python setup.py install
    
读取温度的Python代码

``` python
import Adafruit_DHT as dht

h,t = dht.read_retry(dht.DHT22, 4)  # 这里的4对应着 GPIO#4
print h, t
```

    

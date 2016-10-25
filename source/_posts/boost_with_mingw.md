title: MinGW编译boost库
tags:
	- c++
	- Boost
	- MinGW
date: 2016-10-23
---

### 介绍

由于使用Windows下的CLion IDE + MinGW, 所以需要自己编译一套boost类库.

### 环境

- Windows 10.0.14393
- MinGW 3.82.90
- gcc 5.3.0
- Boost 1.62.0
- CMake 3.7.0

<end></end>

### 编译

#### 编译 b2.exe

``` bash
cd X:\boost_1_62_0\tools\build\src\engine  # 各个版本路径会不同, 主要定位到build.bat
.\build.bat mingw --toolset-root="X:\mingw\bin"

```
将编译后的b2.exe和bjam.exe复制到boost根目录.
我的生成路径为X:\boost_1_62_0\tools\build\src\engine\bin.ntx86 并手动复制到 X:\boost_1_62_0\

#### 编译Boost

``` bash
cd X:\boost_1_62_0\
.\b2.exe install toolset=gcc --prefix=X:\boost_mingw # --prefix 为类库生成地址, 不指定路径则安装在c:\boost. 可以指定参数 --with-XXX 编译指定模块, 否则全部编译

```

等待完成. 速度快的话大概半个小时.

### CMakeLists.txt

``` bash
cmake_minimum_required(VERSION 3.3)
project(first)

set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++11")
set(SOURCE_FILES main.cpp)
set(Boost_USE_STATIC_LIBS OFF)
set(Boost_USE_MULTITHREADED ON)
set(Boost_USE_STATIC_RUNTIME OFF)
find_package(Boost 1.59.0 COMPONENTS system filesystem regex REQUIRED)

if(Boost_FOUND)
    include_directories(${Boost_INCLUDE_DIRS})
    link_directories(${Boost_LIBRARY_DIR})
    add_executable(first ${SOURCE_FILES})
    target_link_libraries(first ${Boost_LIBRARIES})
endif()

# windows 下增加这一段

if(WIN32)
    target_link_libraries(first wsock32 ws2_32)
endif()

```
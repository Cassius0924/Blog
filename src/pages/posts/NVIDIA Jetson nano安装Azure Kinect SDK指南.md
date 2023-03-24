---
layout: '../../layouts/MarkdownPost.astro'
title: 'Jetson nano 安装 Azure Kinect DK 指南'
pubDate: 2023-03-24
description: '这是一个简单教程，旨在帮助大家实现免密SSH登录，省去每次输入用户名和密码的烦恼。'
author: 'Cassius0924'
cover:
    url: 'https://mmbiz.qpic.cn/mmbiz_png/2eJnj7UuAvbRjibJaTgND7PcUaWlLEqiaPRptJ4Pp5KkSysySq9wMkA7n45dicYV8TO2aDNeZkqovXMcVAxNapffg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1'
    square: 'https://mmbiz.qpic.cn/mmbiz_png/2eJnj7UuAvbRjibJaTgND7PcUaWlLEqiaPRptJ4Pp5KkSysySq9wMkA7n45dicYV8TO2aDNeZkqovXMcVAxNapffg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1'
    alt: 'GitHub'
tags: ["Linux", "Ubuntu", "Jetson", "Azure Kinect", "Microsoft"]
theme: 'light'
featured: false
---

# Jetson nano 安装Azure Kinect DK 指南

该项目提供了一个简单的指南，帮助用户在 NVIDIA Jetson Nano 上正确安装 Azure Kinect DK。

## 说明

Jetson nano是ARM架构，而非AMD架构。所以环境配置起来会和AMD架构的有所不同。

## :computer: 需求

在开始安装 Azure Kinect DK 之前，请确保您的 Jetson Nano 满足以下要求：

- 版本为Ubuntu 18.04 LTS
- 已安装cURL

> 不再费文笔说明如何安装上述工具。

## 安装步骤

### 第一步：配置微软软件包储存库

> 系统版本必须为Ubuntu 18.04，其他版本参考[Microsoft 产品的 Linux 软件存储库](https://learn.microsoft.com/zh-cn/windows-server/administration/linux-package-repository-for-microsoft-software)。

依次运行下列命令：

- 添加微软GPG公钥：

  ```shell
  curl -sSL https://packages.microsoft.com/keys/microsoft.asc | sudo apt-key add -
  ```

- 添加微软软件包源：

	```shell
	sudo apt-add-repository https://packages.microsoft.com/ubuntu/18.04/prod
	```
	
- 下载最新软件包列表：
	```shell
	sudo apt-get update
	```

### 第二步：安装依赖项

>  依赖项需要手动安装ARM64版本的。

- 安装libk4a

	```shell
	curl -O 	https://packages.microsoft.com/ubuntu/18.04/multiarch/prod/pool/main/libk/libk4a1.4/libk4a1.4_1.4.1_arm64.deb && sudo dpkg -i libk4a1.4_1.4.1_arm64.deb
	```

- 安装libk4a-dev

  ```shell
  curl -O
  https://packages.microsoft.com/ubuntu/18.04/multiarch/prod/pool/main/libk/libk4a1.4-dev/libk4a1.4-dev_1.4.1_arm64.deb && sudo dpkg -i libk4a1.4-dev_1.4.1_arm64.deb
  ```

### 第三步：安装k4a-tools

> k4a-tools也需要手动安装ARM64版本的。

```shell
curl -O https://packages.microsoft.com/ubuntu/18.04/multiarch/prod/pool/main/k/k4a-tools/k4a-tools_1.4.1_arm64.deb && sudo dpkg -i k4a-tools_1.4.1_arm64.deb
```




### 步骤 2：安装依赖项

在 Jetson Nano 上安装 Azure Kinect SDK 需要安装一些依赖项。您可以使用以下命令安装这些依赖项：

```
sudo apt-get update
sudo apt-get install -y \
    git \
    cmake \
    g++ \
    wget \
    libssl-dev \
    libusb-1.0-0-dev \
    libglfw3-dev \
    libgl1-mesa-dev \
    libglu1-mesa-dev \
    libopenni2-dev
```

### 步骤 3：解压 Azure Kinect SDK

使用以下命令解压 Azure Kinect SDK：

```
tar -xzf azure-kinect-sdk.tar.gz
```

### 步骤 4：构建和安装 Azure Kinect SDK

使用以下命令构建和安装 Azure Kinect SDK：

```
cd Azure-Kinect-Sensor-SDK-1.4.1
mkdir build && cd build
cmake .. -DCMAKE_INSTALL_PREFIX=/usr/local -DBUILD_EXAMPLES=OFF
make -j4
sudo make install
```

### 步骤 5：测试 Azure Kinect SDK

使用以下命令测试 Azure Kinect SDK 是否已经成功安装：

```
cd ~/Azure-Kinect-Sensor-SDK-1.4.1/build/bin
./k4a_test
```

如果一切正常，您应该看到一个输出，其中包含有关 Azure Kinect 开发板的传感器数据的信息。



## 写在最后

不知为何，通过[微软官方教程](https://learn.microsoft.com/zh-cn/azure/kinect-dk/sensor-sdk-download)的apt安装方法，在`apt install`时死活找不到包，明明已经配置了[Microsoft的包储存库](https://learn.microsoft.com/zh-cn/windows-server/administration/linux-package-repository-for-microsoft-software)。😅

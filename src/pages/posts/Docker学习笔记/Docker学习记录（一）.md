# Docker学习记录（一）

### 1. 搜索Docker镜像

首先，你可以使用 `docker search` 命令来查找Docker镜像。该命令将从Docker Hub上的公共镜像库中查找指定名称的镜像。例如，要查找Ubuntu镜像，你可以运行以下命令：

```shell
docker search ubuntu
```

这将列出与Ubuntu相关的所有Docker镜像。

### 2. 下载Docker镜像

要下载Docker镜像，请使用 `docker pull` 命令。例如，要下载Ubuntu 20.04 LTS镜像，你可以运行以下命令：

```shell
docker pull ubuntu:20.04
```

这将从Docker Hub上下载Ubuntu 20.04 LTS镜像。

### 3. 列出本地Docker镜像

要列出本地Docker镜像，请使用 `docker images` 命令。该命令将列出所有在本地计算机上下载的Docker镜像。例如，要列出所有镜像，请运行以下命令：

```
Copy code
docker images
```

该命令将列出所有在本地计算机上下载的Docker镜像，并包含每个镜像的名称、标签、ID、大小和创建时间等信息。

### 4. 运行Docker容器

要运行Docker容器，请使用 `docker run` 命令。该命令将从指定的Docker镜像中创建并运行一个新的Docker容器。例如，要从Ubuntu 20.04 LTS镜像中创建并运行一个新的Docker容器，请运行以下命令：

```
Copy code
docker run -it ubuntu:20.04
```

此命令将在Ubuntu 20.04 LTS镜像中创建并启动一个新的Docker容器，并打开一个交互式终端，让你可以在容器中执行命令。

### 5. 列出正在运行的Docker容器

要列出正在运行的Docker容器，请使用 `docker ps` 命令。该命令将列出当前正在运行的Docker容器的详细信息。例如，要列出当前正在运行的所有Docker容器，请运行以下命令：

```
Copy code
docker ps
```

### 6. 停止正在运行的Docker容器

要停止正在运行的Docker容器，请使用 `docker stop` 命令。该命令将停止指定Docker容器的运行。例如，要停止ID为 `CONTAINER_ID` 的Docker容器，请运行以下命令：

```
vbnetCopy code
docker stop CONTAINER_ID
```

### 7. 删除Docker容器

要删除Docker容器，请使用 `docker rm` 命令。该命令将删除指定的Docker容器。例如，要删除ID为 `CONTAINER_ID` 的Docker容器，请运行以下命令：

```
bashCopy code
docker rm CONTAINER_ID
```

### 8. 进入正在运行
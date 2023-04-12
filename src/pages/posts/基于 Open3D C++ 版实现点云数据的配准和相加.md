# 基于 Open3D C++ 版实现点云数据的配准、相加和显示



## 点云读取

```C++
// 读取 pcd 和 ply 点云文件
auto source = std::make_shared<open3d::geometry::PointCloud>();
auto target = std::make_shared<open3d::geometry::PointCloud>();
open3d::io::ReadPointCloud("pcd-data/1.pcd", *source);
open3d::io::ReadPointCloud("pcd-data/2.pcd", *target);
// ply 文件同理
// open3d::io::ReadPointCloud("pcd-data/1.ply", *source);
// open3d::io::ReadPointCloud("pcd-data/2.ply", *target);
```



## 点云上色

```C++
// 为两份点云上上不同的颜色
source->PaintUniformColor({1, 0.706, 0});    // source 为黄色
target->PaintUniformColor({0, 0.651, 0.929});// target 为蓝色
```







## 点云配准

```c++
// 为两个点云分别进行outlier removal
//auto processed_source = source->RadiusOutlierRemoval(16, 0.5);
//auto processed_target = target->RadiusOutlierRemoval(16, 0.5);

double threshold = 1.0; // 移动范围的阀值
Eigen::Matrix4d trans_init = Eigen::Matrix4d::Identity();

// 运行ICP配准
open3d::pipelines::registration::RegistrationResult reg_p2p;

// 这一步会返回点云的变换矩阵
reg_p2p = open3d::pipelines::registration::RegistrationICP(
  		*source, *target, threshold, trans_init,
      open3d::pipelines::registration::TransformationEstimationPointToPoint());

// 将点云依照输出的变换矩阵进行变换
source->Transform(reg_p2p.transformation_);
```



## 点云相加

这一部很简单，直接使用重载运算符`+=`即可。

```C++
*source += *target;
```



## 点云显示

将两份点云数据在同一个窗口进行可视化显示。

```C++
std::vector<std::shared_ptr<const open3d::geometry::Geometry>> geometries;
geometries.push_back(source);
geometries.push_back(target);

// 使用 `DrawGeometries()` 函数来显示点云
open3d::visualization::DrawGeometries(geometries);
```


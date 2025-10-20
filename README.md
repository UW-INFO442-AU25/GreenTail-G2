# GreenTail 网站资源文件夹

这个文件夹用于存放 GreenTail 网站所需的所有图片和资源文件。

## 文件夹结构

```
greentail-assets/
├── images/          # 网页图片
│   ├── hero-dog.jpg     # 主横幅中的金毛犬图片
│   └── ...
├── icons/           # 图标文件
│   ├── leaf-icon.svg    # 叶子图标
│   ├── recycle-icon.svg # 回收图标
│   ├── check-icon.svg   # 勾选图标
│   └── location-icon.svg # 位置图标
├── logos/           # Logo文件
│   ├── greentail-logo.svg    # 主Logo
│   └── greentail-logo.png    # 主Logo (PNG版本)
└── README.md        # 说明文件
```

## 需要的图片资源

### 主要图片
- **hero-dog.jpg** - 主横幅区域的金毛犬图片（建议尺寸：500x400px）
- 背景图片（如果需要）

### 图标文件
- **leaf-icon.svg** - 叶子图标（用于环保相关功能）
- **recycle-icon.svg** - 回收图标
- **check-icon.svg** - 勾选图标
- **location-icon.svg** - 位置图标
- **paw-icon.svg** - 爪子图标
- **search-icon.svg** - 搜索图标
- **heart-icon.svg** - 心形图标

### Logo文件
- **greentail-logo.svg** - 主Logo（矢量格式）
- **greentail-logo.png** - 主Logo（位图格式，建议尺寸：120x40px）

## 使用说明

1. 将相应的图片文件放入对应的文件夹中
2. 确保文件名与上述列表一致
3. 建议使用SVG格式的图标以获得最佳显示效果
4. 图片文件建议使用WebP或JPG格式以优化加载速度

## 更新HTML文件

当您添加了图片文件后，需要更新HTML文件中的图片路径：

```html
<!-- 示例：更新Logo -->
<div class="logo-icon">
    <img src="assets/logos/greentail-logo.svg" alt="GreenTail Logo">
</div>

<!-- 示例：更新主横幅图片 -->
<img src="assets/images/hero-dog.jpg" alt="Golden Retriever with carrots">
```

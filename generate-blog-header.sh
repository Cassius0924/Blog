#!/bin/bash

# 获取所有md文件的路径
#md_files=$(find src/pages/posts -name "Ubuntu安装OpenCV指南.md")

#for file in $md_files
file=$1
do
    # 获取文件名
    file_name=$(basename $file)

    # 获取文件创建时间
    create_time=$(stat -f %B $file)

    # 格式化时间
    pub_date=$(date -r $create_time +%Y-%m-%d)

    # 获取文件大小
    file_size=$(stat -f %z $file)

    # 获取文件名（不包含扩展名）
    title=$(echo $file_name | cut -f 1 -d '.')

    # 获取第一个图片的url
    cover_url=$(grep -m 1 -oE '(?<=!\[.*\]\().*(?=\))' $file)
	
    cover_square="$cover_url"

    # 获取第一个图片的alt
    # cover_alt=$(grep -m 1 -oE '(?<=!\[).*?(?=\])' $file)
	cover_alt=$(grep -m 1 -oE '![.](.∗)' $file | sed -e 's/^[^[][//g;s/].*//g')

    # 设置默认值
    layout="../../layouts/MarkdownPost.astro"

    description=""

    author="Cassius0924"

    tags=("源码研究" "标准库" "golang" "gin")

    theme="light"

    featured=false

    # 生成头信息
    header="---\nlayout: '$layout'\ntitle: '$title'\npubDate: $pub_date\ndescription: '$description'\nauthor: '$author'\ncover:\n    url: '$cover_url'\n    square: '$cover_square'\n    alt: '$cover_alt'\ntags: ${tags[@]}\ntheme: '$theme'\nfeatured: $featured\n---\n"

    # 将头信息插入到文件头部
    sed -i "1s/^/$header/" $file
done

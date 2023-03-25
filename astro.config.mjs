import {defineConfig} from 'astro/config';
import {visit} from 'unist-util-visit'
import md5 from 'md5';

import {SITE_URL} from './src/consts';

function pipeline() {
    return [
        //文章添加class: markdown-body
        () => (tree) => {
            visit(tree, 'element', (node, index) => {
                console.log("!!!!!!!!1")
                if (node.tagName === 'article') {
                    node.properties.className = ['markdown-body'];
                }
            })
        },


        () => (tree) => {
            visit(tree, 'element', (node, index) => {       // 遍历所有的节点
                if (node.tagName === 'p' && node.children[0].tagName === 'img') {   // 图片
                    node.tagName = 'figure';                    // p -> figure

                    let img = node.children[0];                 // img
                    let sign = md5(img.properties.src);         // 图片的md5值
                    let data = img.properties.alt.split("|");   // alt="alt|size"
                    let alt = data[0];                          // alt
                    let size = "big";                           // size
                    if (data.length > 1) {                      // 如果有size
                        size = data[1];                         // size
                    }

                    let classes = ['image component image-fullbleed body-copy-wide nr-scroll-animation nr-scroll-animation--on'];   // class
                    classes.push(`image-${size}`);

                    node.properties.className = classes;        // class
                    node.children = [                           // figure的子节点
                        {
                            type: 'element',
                            tagName: 'div',
                            properties: {className: ['component-content']},
                            children: [
                                {
                                    type: 'element',            // 图片的父节点
                                    tagName: 'div',
                                    properties: {className: ['image-sharesheet']},
                                    children: [
                                        {
                                            type: 'element',
                                            tagName: 'div',
                                            properties: {
                                                className: [`image image-load image-asset image-${sign}`],
                                                id: `lht${sign}`
                                            },
                                            children: [
                                                {
                                                    type: 'element',
                                                    tagName: 'picture',
                                                    properties: {className: ['picture']},
                                                    children: [
                                                        {
                                                            type: 'element',
                                                            tagName: 'img',
                                                            properties: {
                                                                'data-src': img.properties.src,
                                                                alt: alt,
                                                                className: ['picture-image'],
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    type: 'element',            // 图片描述的父节点
                                    tagName: 'div',
                                    properties: {className: ['image-description']},
                                    children: [
                                        {
                                            type: 'element',
                                            tagName: 'div',
                                            properties: {className: ['image-caption']},
                                            children: [
                                                {
                                                    type: 'text',
                                                    value: alt
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            })
        },

        //这里是为了解决markdown中的代码块
        () => (tree) => {
            tree.children.forEach((node) => {   // 遍历所有的节点，找到代码块，然后替换，
                if (node.type === "raw") {      // 如果是代码块
                    node.value = `<div class="pagebody code component"><div class="component-content code"> ${node.value} </div></div>`
                    // node.value = node.value.replace(/astro-code/g, 'astro-code')
                }
            });
        },

        () => (tree) => {
            for (let i = 0; i < tree.children.length; i++) {
                let node = tree.children[i];
                if (node.type === "element" && ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', "ul", "ol"].includes(node.tagName)) {  // 如果是p标签，或者是标题，或者是ul，或者是ol，就把它们放到一个div中

                    let next = tree.children[i + 1];
                    let nodes = [node];
                    while (next && !['figure'].includes(next.tagName) && next.type != "raw") {  // 如果下一个节点不是图片，就把它放到一个div中
                        nodes.push(next);
                        next = tree.children[tree.children.indexOf(next) + 1];
                    }

                    if (nodes.length > 1) {
                        // rename label
                        nodes.forEach((node) => {
                            if (node.tagName === "p") {
                                node.properties.className = ['pagebody-copy'];
                                node.tagName = "div";
                            }
                            if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(node.tagName)) {
                                node.properties.className = ['pagebody-header'];
                            }
                        });

                        tree.children.splice(i, nodes.length, {
                            type: 'element',
                            tagName: 'div',
                            properties: {className: ['pagebody  text component']},
                            children: [
                                {
                                    type: 'element',
                                    tagName: 'div',
                                    properties: {className: ['component-content']},
                                    children: nodes
                                }
                            ]
                        });

                    }
                }
            }
        },

        () => (tree) => {
            let len = tree.children.length;
            for (let index = 0; index < len; index++) {
                let node = tree.children[index];
                if (node.type === "element" && node.tagName === "figure") {
                    tree.children.splice(index, 0, {
                        type: 'element',
                        tagName: 'div',
                        properties: {className: ['tertiarynav component']},
                        children: [{
                            type: 'element',
                            tagName: 'div',
                            properties: {className: ['component-content']},
                        }]
                    })
                    index++;
                }
            }
        },

        //引用语句：
        () => (tree) => {
            visit(tree, 'element', (node, index) => {
                if (node.tagName === 'blockquote') {
                    node.properties.className = ['pagebody-copy'];
                }
            })
        }
    ]
}


// https://astro.build/config
export default defineConfig({
    site: SITE_URL,
    markdown: {
        rehypePlugins: pipeline(),  //rehype插件，用来处理html
        syntaxHighlight: 'prism',
    },
});

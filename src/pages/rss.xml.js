import rss, { pagesGlobToRssItems } from '@astrojs/rss';

export async function get() {
  return rss({
    title: "Cassius0924's Blog",
    description: "分享我经历过的事情、学习过的知识、发现的好东西啦啦啦",
    site: 'http://www.theaurora.cn',
    items: await pagesGlobToRssItems(import.meta.glob('./**/*.md')),
    customData: `<language>zh-cn</language>`,
  });
}

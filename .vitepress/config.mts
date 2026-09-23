import { defineConfig } from 'vitepress'
import { createWikiLinkPlugin } from './wiki-links.mts'

const repo = 'https://github.com/RRRealCedric/SJTU-STI-Wiki'

export default defineConfig({
  title: '交大科创生存手册',
  description: '为上海交通大学学生提供可核验、可行动、可持续修订的科研、创赛与创业指南。',
  lang: 'zh-CN',
  base: '/SJTU-STI-Wiki/',
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: false,
  sitemap: {
    hostname: 'https://rrrealcedric.github.io/SJTU-STI-Wiki/'
  },
  head: [
    ['meta', { name: 'theme-color', content: '#8f1730' }],
    ['meta', { name: 'author', content: '上海交通大学校团委科创协会' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: '交大科创生存手册（SJTU STI Wiki）' }],
    ['meta', {
      property: 'og:description',
      content: '知道自己在做什么，为什么这么做，以及是否真正愿意继续。'
    }]
  ],
  markdown: {
    config(md) {
      md.use(createWikiLinkPlugin())
    }
  },
  themeConfig: {
    logo: {
      light: '/infinity-mark-light.svg',
      dark: '/infinity-mark-dark.svg',
      alt: 'SJTU STI Wiki'
    },
    siteTitle: 'SJTU STI Wiki',
    nav: [
      { text: '首页', link: '/' },
      { text: '开始', link: '/draft/开始之前：我是否需要做科创' },
      {
        text: '三条路径',
        items: [
          { text: '科研', link: '/draft/科研路径：从进入实验室到形成学术资产' },
          { text: '创赛', link: '/draft/创赛路径：从想法到可评审项目' },
          { text: '创业', link: '/draft/创业路径：从想法到真实验证' }
        ]
      },
      { text: '资源地图', link: '/draft/交大科创资源地图' }
    ],
    sidebar: [
      {
        text: '从这里开始',
        items: [
          { text: '选择你的路径', link: '/draft/开始之前：我是否需要做科创' },
          { text: 'Wiki 完整大纲', link: '/SJTU STI Survival Manual 大纲' }
        ]
      },
      {
        text: '三条科创路径',
        items: [
          { text: '科研：进入实验室', link: '/draft/科研路径：从进入实验室到形成学术资产' },
          { text: '创赛：形成可评审项目', link: '/draft/创赛路径：从想法到可评审项目' },
          { text: '创业：完成真实验证', link: '/draft/创业路径：从想法到真实验证' }
        ]
      },
      {
        text: '行动工具',
        items: [
          { text: '科创通用能力', link: '/draft/科创通用能力' },
          { text: '交大科创资源地图', link: '/draft/交大科创资源地图' },
          { text: '工具与模板库', link: '/draft/工具与模板库' },
          { text: '案例资料库', link: '/draft/棱镜案例库' }
        ]
      },
      {
        text: '项目与治理',
        collapsed: true,
        items: [
          { text: '项目章程', link: '/SJTU STI Wiki 项目章程' },
          { text: '内容模型与编辑规范', link: '/SJTU STI Wiki 内容模型与编辑规范' },
          { text: '访谈到发布 SOP', link: '/SJTU STI Wiki 访谈到发布 SOP' },
          { text: '网站维护手册', link: '/SJTU STI Wiki 网站维护手册' }
        ]
      }
    ],
    outline: {
      level: [2, 3],
      label: '本页目录'
    },
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '没有找到相关内容',
            resetButtonTitle: '清除查询',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },
    socialLinks: [
      { icon: 'github', link: repo }
    ],
    editLink: {
      pattern: repo + '/edit/main/:path',
      text: '在 GitHub 上编辑此页'
    },
    lastUpdated: {
      text: '最后更新'
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    darkModeSwitchLabel: '切换主题',
    sidebarMenuLabel: '目录',
    returnToTopLabel: '返回顶部',
    externalLinkIcon: true,
    footer: {
      message: '由上海交通大学校团委科创协会维护',
      copyright: '交大科创生存手册 · 内容持续修订'
    }
  }
})

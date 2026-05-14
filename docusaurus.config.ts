import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: '逻辑原点法律科技导航站', // 修改标题
  tagline: 'Code is Law. 链接法律与代码的奇点', // 修改 Slogan
  favicon: 'img/favicon.ico',

  future: {
    v4: true, 
  },

  // 绑定您注册的官方域名
  url: 'https://gitlaw.logixy.ai',
  baseUrl: '/',

  organizationName: 'logixy', 
  projectName: 'gitlaw', 

  onBrokenLinks: 'throw',

  // 强制全站底层 UI 中文化
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // 注释掉此行：律师普法网站不需要访客看到“在 GitHub 上编辑此页”的按钮
          // editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // 同理，注释掉博客的外部编辑链接
          // editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true, // 自动跟随系统（深色/浅色模式）
    },
    navbar: {
      title: '逻辑原点', // 左上角品牌名
      logo: {
        alt: '逻辑原点 Logo',
        src: 'img/logo.svg', // 后期您可以把自己的印章风 Logo 图片放进 static/img/ 目录下
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: '法典库', // 将默认的 Tutorial 改为更专业的表述
        },
        {to: '/blog', label: '普法专栏', position: 'left'},
        {
          href: 'https://app.logixy.ai', // 右侧导航，引流至您的核心业务系统
          label: 'LogiX 案卷推演',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark', // 页脚采用深色背景，显得更加沉稳严谨
      links: [
        {
          title: '核心内容',
          items: [
            {
              label: '法典与合规库',
              to: '/docs/intro',
            },
            {
              label: '常用法务工具导航',
              to: '/',
            },
          ],
        },
        {
          title: '关于逻辑原点',
          items: [
            {
              label: '案卷推演系统',
              href: 'https://app.logixy.ai',
            },
            {
              label: '办案手记与专栏',
              to: '/blog',
            },
          ],
        },
      ],
      // 精准写入您的多行合规与版权信息
      copyright: `
        <div style="line-height: 1.8;">
          <div>深圳逻辑原点科技有限公司版权所有</div>
          <div>
            <a href="http://beian.miit.gov.cn/" target="_blank" style="color: inherit; text-decoration: underline;">网站备案号: 粤ICP备2026045079号</a>
          </div>
          <div style="font-size: 0.85rem; margin-top: 0.8rem; opacity: 0.8;">
            投诉邮箱：complaints@logixy.cn<br/>
            地址：深圳市南山区南头街道大汪山社区桃园路8号田厦国际中心B座2002
          </div>
        </div>
      `,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Logixy | 法律科技新范式', 
  tagline: '重塑法律工作的合同管理方式', 
  favicon: 'img/favicon.ico',
  // 注入身份标识
  customFields: { siteTarget: 'LOGIXY' },
  url: 'https://logixy.cn',
  baseUrl: '/',
  organizationName: 'logixy',
  projectName: 'gitlaw',
  onBrokenLinks: 'throw',
  i18n: { defaultLocale: 'zh-Hans', locales: ['zh-Hans'] },

  presets: [
    [
      'classic',
      {
        docs: { sidebarPath: './sidebars.ts' },
        blog: { showReadingTime: true },
        theme: { customCss: './src/css/custom.css' },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: { respectPrefersColorScheme: true },
    
    // 🌟 您刚刚修改的顶部导航栏配置
    navbar: {
      title: 'Logixy',
      logo: {
        alt: 'Logixy Logo',
        src: 'img/logo.svg', 
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: '文档', 
        },
        {to: '/blog', label: '博客', position: 'left'},
        {
          // 修改点：将原来的 app.logixy.ai 改为 gitlaw.cn，将名称改为“逻辑原点网站导航”
          href: 'https://gitlaw.cn', 
          label: '逻辑原点网站导航', 
          position: 'right',
        },
      ],
    },
    
    footer: {
      style: 'dark', 
      links: [], 
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
    prism: { theme: prismThemes.github, darkTheme: prismThemes.dracula },
  } satisfies Preset.ThemeConfig,
};

export default config;
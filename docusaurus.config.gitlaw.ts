import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'GitLaw 法律科技导航站',
  tagline: 'Code is Law. 链接法律与代码的奇点',
  favicon: 'img/favicon.ico',
  // 注入身份标识
  customFields: { siteTarget: 'GITLAW' },
  url: 'https://gitlaw.cn',
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
        blog: false, // 导航站可以关闭博客功能，提升速度
        theme: { customCss: './src/css/custom.css' },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: { respectPrefersColorScheme: true },
    navbar: {
      title: 'GitLaw',
      logo: { alt: 'GitLaw Logo', src: 'img/logo.svg' },
      items: [], // 彻底清空顶部菜单
    },
    footer: {
      style: 'dark',
      links: [], // 彻底清空底部二级链接
      copyright: `
        <div style="line-height: 1.8;">
          <div>深圳逻辑原点科技有限公司版权所有</div>
          <div><a href="http://beian.miit.gov.cn/" target="_blank" style="color: inherit;">网站备案号: 粤ICP备2026045079号</a></div>
        </div>
      `,
    },
    prism: { theme: prismThemes.github, darkTheme: prismThemes.dracula },
  } satisfies Preset.ThemeConfig,
};

export default config;
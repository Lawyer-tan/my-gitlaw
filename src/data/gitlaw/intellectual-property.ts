// 文件路径：src/data/gitlaw/intellectual-property.ts
import { Category } from './types';

export const intellectualPropertyData: Category = {
  id: "intellectual-property",
  title: "知识产权",
  icon: "💡",
  subCategories: [
    {
      name: "全部",
      items: [
        { name: "中国版权保护中心", desc: "网站升级是常态，可能无法提供查询...", url: "#", logo: "©️", tags: ["官方"] },
        { name: "全国作品登记信息...", desc: "可查询全国已登记的作品基本信息。", url: "#", logo: "📝", tags: ["官方"] },
        { name: "中国商标网", desc: "官方数据，市面上商标查询的数据源头。", url: "#", logo: "®️", tags: ["官方"] },
        { name: "中国及多国专利审查...", desc: "提供中国、欧洲、日本、韩国、美国...", url: "#", logo: "🌍", tags: ["官方"] },
        { name: "全国专利代理信息...", desc: "国家知识产权局旗下网站，可查询专利代理师...", url: "#", logo: "👨‍⚖️", tags: ["官方"] },
        { name: "专利检索及分析", desc: "官方提供的专利检索及分析", url: "#", logo: "🔍", tags: ["官方"] },
        { name: "香港知识产权署", desc: "可查询香港知识产权信息。", url: "#", logo: "🇭🇰", tags: ["官方"] },
        { name: "台湾经济部智慧财产局", desc: "台湾省知识产权管理部门", url: "#", logo: "🇹🇼", tags: ["官方"] },
        { name: "美国专利及商标局", desc: "美国专利及商标局官网", url: "#", logo: "🇺🇸", tags: ["官方"] },
        { name: "标库网", desc: "第三方商标查询网站。", url: "#", logo: "🎯", tags: ["官方"] },
        { name: "飙局", desc: "界面简洁，提供商标分析、检测、公告...", url: "#", logo: "🚀", tags: ["第三方"] },
        { name: "佰腾网", desc: "第三方专利检索网站，提供多种筛选检索...", url: "#", logo: "🕸️", tags: ["第三方"] }
      ]
    }
  ]
};
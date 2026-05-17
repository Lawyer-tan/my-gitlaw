// 文件路径：src/data/gitlaw/business-search.ts
import { Category } from './types';

export const businessSearchData: Category = {
  id: "business-search",
  title: "工商查询",
  icon: "🏢",
  subCategories: [
    {
      name: "内地主体",
      items: [
        { name: "国家企业信用信息公示系统", desc: "企业官方数据，网站间歇性抽风...", url: "https://www.gsxt.gov.cn", logo: "🛡️", tags: ["官方"] },
        { name: "信用中国", desc: "官方信用数据一网打尽。可查失信、经营...", url: "https://www.creditchina.gov.cn", logo: "🇨🇳", tags: ["官方"] },
        { name: "中国社会组织政务服务平台", desc: "全国社会组织官方信息查询网站。", url: "https://chinanpo.mca.gov.cn", logo: "👥", tags: ["官方"] },
        { name: "企查查", desc: "企查查旗下信息查询工具。", url: "https://www.qichacha.com", logo: "👁️", tags: ["付费", "商业"] },
        { name: "天眼查", desc: "建议做一般查询使用，更新速度不如企查查。", url: "https://www.tianyancha.com", logo: "👁️", tags: ["付费", "商业"] },
        { name: "启信宝", desc: "一款快速精准的企业信息查询工具。", url: "https://www.qixin.com", logo: "🔍", tags: ["付费", "商业"] },
        { name: "中国证券投资基金业协会", desc: "基金业务必不可少。", url: "https://www.amac.org.cn", logo: "🏦", tags: ["官方"] }
      ]
    }
  ]
};
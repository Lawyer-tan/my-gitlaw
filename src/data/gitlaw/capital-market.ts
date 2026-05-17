// 文件路径：src/data/gitlaw/capital-market.ts
import { Category } from './types';

export const capitalMarketData: Category = {
  id: "capital-market",
  title: "资本市场",
  icon: "📈",
  subCategories: [
    {
      name: "全部",
      items: [
        { name: "上海证券交易所", desc: "内地第一家证券交易所。", url: "https://www.sse.com.cn", logo: "🔴", tags: ["官方"] },
        { name: "深圳证券交易所", desc: "查询深交所上市企业公示信息。", url: "https://www.szse.cn", logo: "🔵", tags: ["官方"] },
        { name: "北京证券交易所", desc: "北京证券交易所官网。", url: "https://www.bse.cn", logo: "🎯", tags: ["官方"] },
        { name: "全国中小企业股份转让系统", desc: "可查询新三板企业公示信息。", url: "https://www.neeq.cc", logo: "📊", tags: ["官方"] },
        { name: "巨潮资讯网", desc: "中国证监会指定的上市公司信息披露网站。", url: "https://www.cninfo.com.cn", logo: "🌊", tags: ["商业"] },
        { name: "中国证券监督管理委员会", desc: "中国证监会管理官方网站。", url: "https://www.csrc.gov.cn", logo: "🏛️", tags: ["官方"] },
        { name: "中国证券投资基金业协会", desc: "基金业务必不可少。", url: "https://www.amac.org.cn", logo: "🏦", tags: ["官方"] },
        { name: "香港披露易", desc: "可检索香港主板及创业板上市公司披露信息。", url: "https://www.hkexnews.hk", logo: "🇭🇰", tags: ["官方"] },
        { name: "台湾证券交易所", desc: "中国台湾证券交易所官网", url: "https://www.twse.com.tw", logo: "🇹🇼", tags: ["官方"] },
        { name: "美国SEC", desc: "美国证券交易委员会官网", url: "https://www.sec.gov", logo: "🇺🇸", tags: ["官方"] },
        { name: "新加坡交易所", desc: "新加坡证券交易所官网", url: "https://www.sgx.com", logo: "🇸🇬", tags: ["官方"] },
        { name: "伦敦证券交易所", desc: "伦敦证券交易所官网", url: "https://www.londonstockexchange.com", logo: "🇬🇧", tags: ["官方"] }
      ]
    }
  ]
};
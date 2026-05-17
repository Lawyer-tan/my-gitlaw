// 文件路径：src/data/gitlaw/asset-info.ts
import { Category } from './types';

export const assetInfoData: Category = {
  id: "asset-info",
  title: "资产信息",
  icon: "📋",
  subCategories: [
    {
      name: "全部",
      items: [
        { name: "动产融资统一登记公示系统", desc: "提供全国动产和权利担保的统一登记...", url: "https://www.zhongdengwang.org.cn", logo: "🔄", tags: ["官方"] },
        { name: "中国土地市场网", desc: "可查土地出让、供地计划等信息", url: "https://www.landchina.com/", logo: "🗺️", tags: ["官方"] },
        { name: "全国矿业权人勘查开采信息管理系统", desc: "可查询矿业权属、矿业权人公示信息...", url: "https://kyqgs.mnr.gov.cn", logo: "⛏️", tags: ["官方"] },
        { name: "人民法院诉讼资产网", desc: "最高法院组建的司法拍卖公共网络平台。", url: "https://www.rmfysszc.gov.cn", logo: "💰", tags: ["官方"] },
        { name: "淘宝司法拍卖", desc: "开在线司法拍卖先河。", url: "https://sf.taobao.com", logo: "🛒", tags: ["官方"] },
        { name: "京东拍卖", desc: "京东旗下司法拍卖平台。", url: "https://zcpm.jd.com", logo: "🛒", tags: ["官方"] },
        { name: "自然资源确权登记网", desc: "自然资源部不动产登记中心旗下...", url: "https://www.rerc.com.cn", logo: "🌳", tags: ["官方"] },
      ]
    }
  ]
};
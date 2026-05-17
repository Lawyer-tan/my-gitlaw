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
        { name: "动产融资统一登记公示系统", desc: "提供全国动产和权利担保的统一登记...", url: "#", logo: "🔄", tags: ["官方"] },
        { name: "全国市场监管动产抵押...", desc: "可查询已登记的动产抵押登记、变更...", url: "#", logo: "🛡️", tags: ["官方"] },
        { name: "中国土地市场网", desc: "可查土地出让、供地计划等信息", url: "#", logo: "🗺️", tags: ["官方"] },
        { name: "全国矿业权人勘查开采...", desc: "可查询矿业权属、矿业权人公示信息...", url: "#", logo: "⛏️", tags: ["官方"] },
        { name: "人民法院诉讼资产网", desc: "最高法院组建的司法拍卖公共网络平台。", url: "#", logo: "💰", tags: ["官方"] },
        { name: "淘宝司法拍卖", desc: "开在线司法拍卖先河。", url: "#", logo: "🛒", tags: ["官方"] },
        { name: "自然资源确权登记网", desc: "自然资源部不动产登记中心旗下...", url: "#", logo: "🌳", tags: ["官方"] },
        { name: "备案域名", desc: "域名资产查询", url: "#", logo: "🌐", tags: ["官方"] }
      ]
    }
  ]
};
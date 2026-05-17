// 文件路径：src/data/gitlaw/litigation-credit.ts
import { Category } from './types';

export const litigationCreditData: Category = {
  id: "litigation-credit",
  title: "涉诉信用",
  icon: "🏛️",
  subCategories: [
    {
      name: "全部",
      items: [
        { name: "全国企业破产重整案件信息网", desc: "最高法主办，可以查询破产案件公告...", url: "https://pccz.court.gov.cn", logo: "🔥", tags: ["官方"] },
        { name: "中国执行信息公开网", desc: "可查失信被执行人、限制高消费等...", url: "https://zxgk.court.gov.cn", logo: "⚖️", tags: ["官方"] },
        { name: "人民法院公告网", desc: "可查全国法院的公告信息。", url: "https://rmfygg.court.gov.cn", logo: "📢", tags: ["官方"] },
        { name: "裁判文书网", desc: "官方司法数据库的集大成者。", url: "https://wenshu.court.gov.cn", logo: "📜", tags: ["官方"] },
        { name: "中国海关企业进出口信用...", desc: "官方数据，反映企业进出口信用状况...", url: "http://credit.customs.gov.cn", logo: "🚢", tags: ["官方"] },
        { name: "行政处罚文书网", desc: "国家市场监督管理总局旗下网站...", url: "https://cfws.samr.gov.cn", logo: "🛑", tags: ["官方"] },
        { name: "信用中国", desc: "官方信用数据一网打尽。可查失信...", url: "https://www.creditchina.gov.cn", logo: "🇨🇳", tags: ["官方"] },
        { name: "人民法院诉讼资产网", desc: "最高法院组建的司法拍卖公共网络平台。", url: "https://www.rmfysszc.gov.cn", logo: "💰", tags: ["官方"] }
      ]
    }
  ]
};
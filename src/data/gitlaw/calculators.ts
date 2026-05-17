// 文件路径：src/data/gitlaw/calculators.ts
import { Category } from './types';

export const calculatorsData: Category = {
  id: "calculators",
  title: "法律计算器",
  icon: "🧮",
  subCategories: [
    {
      name: "常用计算",
      items: [
        { name: "最高院诉讼费计算器", desc: "官方标准的案件受理费、保全费计算工具。", url: "https://splcgk.court.gov.cn/gzfwww/ssfjs", logo: "🏛️", tags: ["官方", "诉讼"] },
        { name: "LPR 利息计算器", desc: "支持历史 LPR 自动调取的利息/违约金计算工具。", url: "#", logo: "📈", tags: ["财务", "利息"] },
        { name: "工伤赔偿计算器", desc: "各省市工伤赔偿标准自动核算。", url: "#", logo: "🏥", tags: ["劳动人事"] }
      ]
    }
  ]
};
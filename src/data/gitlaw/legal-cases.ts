// 文件路径：src/data/gitlaw/legal-cases.ts
import { Category } from './types';

export const legalCasesData: Category = {
  id: "legal-cases",
  title: "法规案例",
  icon: "⚖️",
  subCategories: [
    {
      name: "商业数据库",
      items: [
        { name: "威科先行", desc: "付费法律数据库首选。", url: "#", logo: "🟢", tags: ["商业"] },
        { name: "聚法案例", desc: "包含案例、法规、检索文书检索。", url: "#", logo: "🏛️", tags: ["商业"] },
        { name: "把手案例", desc: "打通裁判文书和检察文书的法律大数据检索。", url: "#", logo: "🔨", tags: ["商业"] },
        { name: "无讼案例", desc: "免费法规案例数据库，能够满足基本检索...", url: "#", logo: "🔵", tags: ["免费", "商业"] },
        { name: "法信", desc: "兼有图书、论文、公报，深度融合法律知识。", url: "#", logo: "📕", tags: ["商业"] },
        { name: "北大法宝", desc: "老牌付费法律数据库。", url: "#", logo: "🏫", tags: ["商业"] },
        { name: "元典智库", desc: "华宇元典出品，能够检索案例及法规...", url: "#", logo: "🌐", tags: ["商业"] },
        { name: "法律图书馆", desc: "提供法律法规、法学论文、裁判文书法律...", url: "#", logo: "📚", tags: ["商业"] }
      ]
    }
  ]
};
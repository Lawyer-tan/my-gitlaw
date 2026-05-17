// 文件路径：src/data/gitlaw/legal-tech.ts
import { Category } from './types';

export const legalTechData: Category = {
  id: "legal-tech",
  title: "法律科技",
  icon: "🤖",
  subCategories: [
    {
      name: "科创单位",
      items: [
        { name: "新则", desc: "探索法律行业新规则，法律实务界的方法...", url: "#", logo: "🔆", tags: ["公众号", "法律品牌"] },
        { name: "无讼科技", desc: "创始人蒋勇，已推出无讼案例、无讼合作...", url: "#", logo: "🔵", tags: ["法律品牌"] },
        { name: "iCourt", desc: "目前主打Alpha系统等服务。", url: "#", logo: "🟠", tags: ["法律品牌"] },
        { name: "幂律智能", desc: "法律领域的初创人工智能公司，旨在利用...", url: "#", logo: "🧠", tags: ["系统"] },
        { name: "天府法务", desc: "很有特色的方法务智慧服务平台，内含...", url: "#", logo: "🏛️", tags: ["官方"] }
      ]
    }
  ]
};
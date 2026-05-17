// 文件路径：src/data/gitlaw/ai-tools.ts
import { Category } from './types';

export const aiToolsData: Category = {
  id: "ai-tools",
  title: "法律 AI 工具",
  icon: "✨",
  subCategories: [
    {
      name: "合同与尽调",
      items: [
        { name: "Logixy 案卷推演", desc: "基于本地优先架构的法律 AI 审查与风控工作坊。", url: "https://app.logixy.ai", logo: "🟢", tags: ["本地部署", "合同审查"] },
        { name: "秘塔 MetaSo", desc: "主打专业领域的 AI 搜索与解析。", url: "https://metaso.cn", logo: "🔍", tags: ["AI 搜索"] },
        { name: "Kimi 智能助手", desc: "支持超长文本解析，适合阅读长篇判决书。", url: "https://kimi.moonshot.cn", logo: "🌙", tags: ["长文本"] }
      ]
    }
  ]
};
// 文件路径：src/data/gitlaw/calculators.ts
import { Category } from './types';

export const calculatorsData: Category = {
  id: "calculators",
  title: "法律计算器",
  icon: "🧮",
  subCategories: [
    {
      name: "常用计算工具",
      items: [
        { 
          name: "诉讼费计算器", 
          desc: "基于《诉讼费用交纳办法》核算案件受理、保全及执行费。", 
          url: "/calculator", // 内部开发好的计算器页面
          logo: "🏛️", 
          tags: ["诉讼", "内置工具"] 
        },
        { 
          name: "仲裁费计算器", 
          desc: "各地仲裁委员会（贸仲、北仲等）案件处理及受理费用测算。", 
          url: "/calculator/arbitration", 
          logo: "⚖️", 
          tags: ["商事", "仲裁"] 
        },
        { 
          name: "律师费计算器", 
          desc: "各省市律师服务收费指导标准及市场常见费率计算。", 
          url: "/calculator/lawyer-fee", 
          logo: "💼", 
          tags: ["费用", "法律服务"] 
        },
        { 
          name: "交通赔偿计算器", 
          desc: "交通事故人身损害赔偿（伤残赔偿金、误工费等）明细计算。", 
          url: "#", 
          logo: "🚗", 
          tags: ["侵权", "损害赔偿"] 
        },
        { 
          name: "鉴定费计算器", 
          desc: "法医、物证、声像资料等司法鉴定收费标准自动核算。", 
          url: "#", 
          logo: "🔍", 
          tags: ["诉讼", "司法鉴定"] 
        },
        { 
          name: "利息计算器", 
          desc: "支持 LPR 自动调取及历史基准利率的利息测算。", 
          url: "#", 
          logo: "📈", 
          tags: ["财务", "利息"] 
        },
        { 
          name: "工伤费计算器", 
          desc: "各省市一次性伤残补助金、医疗补助金等工伤待遇核算。", 
          url: "#", 
          logo: "👷", 
          tags: ["劳动人事"] 
        },
        { 
          name: "违约金计算器", 
          desc: "各类商业合同违约金及逾期付款损失计算。", 
          url: "#", 
          logo: "📝", 
          tags: ["商事", "违约金"] 
        }
      ]
    }
  ]
};
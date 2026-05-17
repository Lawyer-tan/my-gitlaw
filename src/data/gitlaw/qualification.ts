// 文件路径：src/data/gitlaw/qualification.ts
import { Category } from './types';

export const qualificationData: Category = {
  id: "qualification",
  title: "资质查询",
  icon: "🎓",
  subCategories: [
    {
      name: "全部",
      items: [
        { name: "金融许可证信息查询", desc: "中国银行保险监督管理委员会旗下...", url: "#", logo: "🏦", tags: ["官方"] },
        { name: "全国建筑市场监管...", desc: "住房和城乡建设部建筑业资质查询", url: "#", logo: "🏗️", tags: ["官方"] },
        { name: "全国特种设备公示...", desc: "部分省市接口还在对接中", url: "#", logo: "⚙️", tags: ["官方"] },
        { name: "单位资质查询", desc: "可查询工程设计、工程监理、建筑业...", url: "#", logo: "🏢", tags: ["官方"] },
        { name: "全国排污许可证管理...", desc: "可查询全国范围内排污许可的申请...", url: "#", logo: "♻️", tags: ["官方"] },
        { name: "全国认证认可信息...", desc: "可查询全国范围内认证认可相关的资质...", url: "#", logo: "✅", tags: ["官方"] },
        { name: "实验动物许可证查询...", desc: "实验动物许可证查询", url: "#", logo: "🔬", tags: ["官方"] }
      ]
    }
  ]
};
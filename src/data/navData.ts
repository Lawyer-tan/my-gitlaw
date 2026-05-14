// 文件路径：src/data/navData.ts

export type NavItem = {
  name: string;
  desc: string;
  url: string;
  logo: string; 
  tags: string[]; 
};

export type SubCategory = {
  name: string;
  items: NavItem[];
};

export type Category = {
  id: string;
  title: string;
  icon: string;
  subCategories: SubCategory[];
};

export const NAV_DATA: Category[] = [
  {
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
  },
  {
    id: "business-search",
    title: "工商查询",
    icon: "🏢",
    subCategories: [
      {
        name: "内地主体",
        items: [
          { name: "国家企业信用信息公示系统", desc: "企业官方数据，网站间歇性抽风...", url: "https://www.gsxt.gov.cn", logo: "🛡️", tags: ["官方"] },
          { name: "统一社会信用代码查询", desc: "全国组织机构统一社会信用代码数据服务...", url: "#", logo: "🔢", tags: ["官方"] },
          { name: "信用中国", desc: "官方信用数据一网打尽。可查失信、经营...", url: "#", logo: "🇨🇳", tags: ["官方"] },
          { name: "中国社会组织政务服务平台", desc: "全国社会组织官方信息查询网站。", url: "#", logo: "👥", tags: ["官方"] },
          { name: "天眼查", desc: "建议做一般查询使用，更新速度不如企查查。", url: "#", logo: "👁️", tags: ["付费", "商业"] },
          { name: "启信宝", desc: "一款快速精准的企业信息查询工具。", url: "#", logo: "🔍", tags: ["付费", "商业"] },
          { name: "中国证券投资基金业协会", desc: "基金业务必不可少。", url: "#", logo: "🏦", tags: ["官方"] }
        ]
      }
    ]
  },
  {
    id: "capital-market",
    title: "资本市场",
    icon: "📈",
    subCategories: [
      {
        name: "全部",
        items: [
          { name: "上海证券交易所", desc: "内地第一家证券交易所。", url: "#", logo: "🔴", tags: ["官方"] },
          { name: "深圳证券交易所", desc: "查询深交所上市企业公示信息。", url: "#", logo: "🔵", tags: ["官方"] },
          { name: "北京证券交易所", desc: "北京证券交易所官网。", url: "#", logo: "🎯", tags: ["官方"] },
          { name: "全国中小企业股份转让系统", desc: "可查询新三板企业公示信息。", url: "#", logo: "📊", tags: ["官方"] },
          { name: "巨潮资讯网", desc: "中国证监会指定的上市公司信息披露网站。", url: "#", logo: "🌊", tags: ["商业"] },
          { name: "中国证券监督管理委员会", desc: "中国证监会管理官方网站。", url: "#", logo: "🏛️", tags: ["官方"] },
          { name: "中国证券投资基金业协会", desc: "基金业务必不可少。", url: "#", logo: "🏦", tags: ["官方"] },
          { name: "香港披露易", desc: "可检索香港主板及创业板上市公司披露信息。", url: "#", logo: "🇭🇰", tags: ["官方"] },
          { name: "台湾证券交易所", desc: "中国台湾证券交易所官网", url: "#", logo: "🇹🇼", tags: ["官方"] },
          { name: "美国SEC", desc: "美国证券交易委员会官网", url: "#", logo: "🇺🇸", tags: ["官方"] },
          { name: "新加坡交易所", desc: "新加坡证券交易所官网", url: "#", logo: "🇸🇬", tags: ["官方"] },
          { name: "伦敦证券交易所", desc: "伦敦证券交易所官网", url: "#", logo: "🇬🇧", tags: ["官方"] }
        ]
      }
    ]
  },
  {
    id: "litigation-credit",
    title: "涉诉信用",
    icon: "🏛️",
    subCategories: [
      {
        name: "全部",
        items: [
          { name: "全国企业破产重整案件信息网", desc: "最高法主办，可以查询破产案件公告...", url: "#", logo: "🔥", tags: ["官方"] },
          { name: "中国执行信息公开网", desc: "可查失信被执行人、限制高消费等...", url: "#", logo: "⚖️", tags: ["官方"] },
          { name: "人民法院公告网", desc: "可查全国法院的公告信息。", url: "#", logo: "📢", tags: ["官方"] },
          { name: "裁判文书网", desc: "官方司法数据库的集大成者。", url: "#", logo: "📜", tags: ["官方"] },
          { name: "中国海关企业进出口信用...", desc: "官方数据，反映企业进出口信用状况...", url: "#", logo: "🚢", tags: ["官方"] },
          { name: "行政处罚文书网", desc: "国家市场监督管理总局旗下网站...", url: "#", logo: "🛑", tags: ["官方"] },
          { name: "信用中国", desc: "官方信用数据一网打尽。可查失信...", url: "#", logo: "🇨🇳", tags: ["官方"] },
          { name: "人民法院诉讼资产网", desc: "最高法院组建的司法拍卖公共网络平台。", url: "#", logo: "💰", tags: ["官方"] }
        ]
      }
    ]
  },
  {
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
  },
  {
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
  },
  {
    id: "intellectual-property",
    title: "知识产权",
    icon: "💡",
    subCategories: [
      {
        name: "全部",
        items: [
          { name: "中国版权保护中心", desc: "网站升级是常态，可能无法提供查询...", url: "#", logo: "©️", tags: ["官方"] },
          { name: "全国作品登记信息...", desc: "可查询全国已登记的作品基本信息。", url: "#", logo: "📝", tags: ["官方"] },
          { name: "中国商标网", desc: "官方数据，市面上商标查询的数据源头。", url: "#", logo: "®️", tags: ["官方"] },
          { name: "中国及多国专利审查...", desc: "提供中国、欧洲、日本、韩国、美国...", url: "#", logo: "🌍", tags: ["官方"] },
          { name: "全国专利代理信息...", desc: "国家知识产权局旗下网站，可查询专利代理师...", url: "#", logo: "👨‍⚖️", tags: ["官方"] },
          { name: "专利检索及分析", desc: "官方提供的专利检索及分析", url: "#", logo: "🔍", tags: ["官方"] },
          { name: "香港知识产权署", desc: "可查询香港知识产权信息。", url: "#", logo: "🇭🇰", tags: ["官方"] },
          { name: "台湾经济部智慧财产局", desc: "台湾省知识产权管理部门", url: "#", logo: "🇹🇼", tags: ["官方"] },
          { name: "美国专利及商标局", desc: "美国专利及商标局官网", url: "#", logo: "🇺🇸", tags: ["官方"] },
          { name: "标库网", desc: "第三方商标查询网站。", url: "#", logo: "🎯", tags: ["官方"] },
          { name: "飙局", desc: "界面简洁，提供商标分析、检测、公告...", url: "#", logo: "🚀", tags: ["第三方"] },
          { name: "佰腾网", desc: "第三方专利检索网站，提供多种筛选检索...", url: "#", logo: "🕸️", tags: ["第三方"] }
        ]
      }
    ]
  },
  {
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
  }
];
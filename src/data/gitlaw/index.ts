// 文件路径：src/data/gitlaw/index.ts

import { Category } from './types';

// 引入模块
import { calculatorsData } from './calculators';
import { aiToolsData } from './ai-tools';
import { legalCasesData } from './legal-cases';
import { businessSearchData } from './business-search';
import { capitalMarketData } from './capital-market';
import { litigationCreditData } from './litigation-credit';
import { assetInfoData } from './asset-info';
import { qualificationData } from './qualification';
import { intellectualPropertyData } from './intellectual-property';
import { legalTechData } from './legal-tech';

// 按顺序组合并导出 (计算器第一，AI第二，后续保留原顺序)
export const NAV_DATA: Category[] = [
  calculatorsData,
  aiToolsData,
  legalCasesData,
  businessSearchData,
  capitalMarketData,
  litigationCreditData,
  assetInfoData,
  qualificationData,
  intellectualPropertyData,
  legalTechData
];

// 导出类型供外部使用
export * from './types';
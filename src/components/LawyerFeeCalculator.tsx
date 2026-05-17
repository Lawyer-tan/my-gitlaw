// 文件路径：src/components/LawyerFeeCalculator.tsx
import React, { useState, useMemo } from 'react';
import { QRCodeSVG } from 'qrcode.react';

// ==========================================
// 1. 基础配置与费率数据引擎
// ==========================================
const PROVINCES = [
  { id: 'beijing', name: '北京市律协指导标准' },
  { id: 'shanghai', name: '上海市律协指导标准' },
  { id: 'guangdong', name: '广东省律协指导标准' },
  { id: 'zhejiang', name: '浙江省律协指导标准' },
  { id: 'sichuan', name: '四川省律协指导标准' },
];

// 各省市民商事财产案件阶梯费率表：[该阶梯上限, 费率]
const ASSOCIATION_RATES: Record<string, number[][]> = {
  beijing: [[100000, 0.08], [1000000, 0.05], [10000000, 0.03], [50000000, 0.01], [Infinity, 0.005]],
  shanghai: [[100000, 0.08], [1000000, 0.05], [10000000, 0.03], [50000000, 0.01], [Infinity, 0.005]],
  guangdong: [[100000, 0.08], [500000, 0.06], [1000000, 0.05], [5000000, 0.04], [10000000, 0.03], [50000000, 0.02], [Infinity, 0.01]],
  zhejiang: [[100000, 0.08], [500000, 0.06], [1000000, 0.05], [5000000, 0.04], [10000000, 0.03], [Infinity, 0.01]],
  sichuan: [[100000, 0.07], [500000, 0.06], [1000000, 0.05], [5000000, 0.04], [10000000, 0.03], [Infinity, 0.01]]
};

// 阿拉伯数字转人民币大写
const amountToChinese = (num: number | ''): string => {
  if (num === '') return '';
  if (num === 0) return '零元整';
  const fraction = ['角', '分'];
  const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  const unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']];
  let n = Math.abs(num);
  let s = '';
  for (let i = 0; i < fraction.length; i++) {
    s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
  }
  s = s || '整';
  n = Math.floor(n);
  for (let i = 0; i < unit[0].length && n > 0; i++) {
    let p = '';
    for (let j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p;
      n = Math.floor(n / 10);
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
  }
  return (num < 0 ? '负' : '') + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
};

export default function LawyerFeeCalculator() {
  // 核心状态：计算模式
  const [calcMode, setCalcMode] = useState<'association' | 'firm'>('firm');
  const [amount, setAmount] = useState<number | ''>('');
  
  // 律协模式专属状态
  const [province, setProvince] = useState<string>('beijing');
  // 律所自定义模式专属状态
  const [fixedFee, setFixedFee] = useState<number | ''>(10000);
  const [variableRate, setVariableRate] = useState<number | ''>(5);

  const numAmount = Number(amount) || 0;
  const numFixed = Number(fixedFee) || 0;
  const numRate = Number(variableRate) || 0;

  // ==========================================
  // 2. 双通道计算逻辑
  // ==========================================
  const result = useMemo(() => {
    // 通道一：律所自定义（固定+比例）
    if (calcMode === 'firm') {
      const vFee = numAmount * (numRate / 100);
      const total = numFixed + vFee;
      return {
        totalFee: total,
        fixedPart: numFixed,
        variablePart: vFee,
        formula: `¥${numFixed.toLocaleString()} (固定) + 标的额 × ${numRate}%`,
        basis: '本测算采用“基础固定前期费用 + 标的额比例提成/风险代理”的商务报价结构。'
      };
    } 
    // 通道二：律协标准（按省份阶梯累进）
    else {
      let fee = 0;
      let minFee = 5000; // 假定各省兜底价为5000
      let steps = [];
      const rates = ASSOCIATION_RATES[province];
      
      if (numAmount > 0) {
        let remaining = numAmount;
        let previousLimit = 0;
        
        for (let i = 0; i < rates.length; i++) {
          const currentLimit = rates[i][0];
          const rate = rates[i][1];
          const tierSize = currentLimit - previousLimit;

          if (remaining > tierSize) {
            fee += tierSize * rate;
            steps.push(`${tierSize}×${rate * 100}%`);
            remaining -= tierSize;
            previousLimit = currentLimit;
          } else {
            fee += remaining * rate;
            steps.push(`${remaining}×${rate * 100}%`);
            break;
          }
        }
      }

      if (numAmount > 0 && fee < minFee) {
        return {
          totalFee: minFee, fixedPart: minFee, variablePart: 0,
          formula: `${minFee}元 (触发地方律协最低收费标准)`,
          basis: '按当地律协指导价分段累进，如计算额低于起步价，则按兜底标准收取。'
        };
      }

      return {
        totalFee: fee, fixedPart: 0, variablePart: fee,
        formula: steps.length > 0 ? steps.join(' + ') : '0',
        basis: '按当地律协发布的《律师服务收费行业指导标准》进行阶梯累进计算。'
      };
    }
  }, [calcMode, numAmount, numFixed, numRate, province]);

  // 生成专业测算报告
  const reportText = useMemo(() => {
    const provName = PROVINCES.find(p => p.id === province)?.name;
    const modeStr = calcMode === 'association' ? `【律协标准测算】\n适用区域：${provName}` : '【律所自定义报价测算】\n计费结构：固定前期费 + 提成比例';

    return `${modeStr}
争议标的：¥${numAmount.toLocaleString()} (${amountToChinese(numAmount)})

[预估律师服务费]
1. 测算总计：¥${result.totalFee.toLocaleString()}
2. 费用大写：${amountToChinese(result.totalFee)}
3. 核心算式：${result.formula}

注：以上测算仅作行业指导或签约参考。实际收费将根据案件疑难程度、办案周期、律师资历等因素由双方协商并在《委托代理合同》中予以确认。
生成自：逻辑原点 (Logixy) 法律智能平台`;
  }, [calcMode, province, numAmount, result]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', color: 'var(--ifm-font-color-base)' }}>
      
      {/* 核心表单区 */}
      <div style={{ backgroundColor: 'var(--ifm-background-surface-color)', borderRadius: '12px', border: '1px solid var(--ifm-color-emphasis-200)', overflow: 'hidden' }}>
        
        <div style={{ padding: '24px', backgroundColor: 'var(--ifm-color-emphasis-100)', borderBottom: '1px solid var(--ifm-color-emphasis-200)' }}>
          {/* 第一排：模式与标的 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.95rem', fontWeight: '600', color: 'var(--ifm-color-emphasis-800)' }}>收费计算表类型</label>
              <select 
                value={calcMode} onChange={(e) => setCalcMode(e.target.value as 'association' | 'firm')}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--ifm-color-emphasis-300)', backgroundColor: 'var(--ifm-background-color)', color: 'var(--ifm-font-color-base)', outline: 'none' }}
              >
                <option value="firm">律所自定义标准 (固定费用+变动提成)</option>
                <option value="association">律协指导标准 (分段累进计费)</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.95rem', fontWeight: '600', color: 'var(--ifm-color-emphasis-800)' }}>案件标的额 (人民币: 元)</label>
              <input 
                type="number" value={amount} onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : '')}
                placeholder="请输入涉案争议标的额"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--ifm-color-emphasis-300)', backgroundColor: 'var(--ifm-background-color)', color: 'var(--ifm-font-color-base)', outline: 'none' }}
              />
              <div style={{ marginTop: '8px', fontSize: '0.85rem', color: 'var(--ifm-color-primary)', fontWeight: '500', minHeight: '20px' }}>
                {amount !== '' ? `大写：${amountToChinese(amount)}` : ''}
              </div>
            </div>
          </div>

          {/* 第二排：条件动态渲染 */}
          {calcMode === 'firm' ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', padding: '20px', backgroundColor: 'var(--ifm-background-color)', borderRadius: '8px', border: '1px solid var(--ifm-color-emphasis-200)' }}>
              <div>
                <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '600' }}>
                  <span>基础固定费用 (元)</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--ifm-color-emphasis-600)', fontWeight: 'normal' }}>✎ 可手工修改</span>
                </label>
                <input 
                  type="number" value={fixedFee} onChange={(e) => setFixedFee(e.target.value ? Number(e.target.value) : '')}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--ifm-color-emphasis-300)', backgroundColor: 'var(--ifm-background-surface-color)', color: 'var(--ifm-font-color-base)', outline: 'none' }}
                />
              </div>
              <div>
                <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '600' }}>
                  <span>变动费用比例 (%)</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--ifm-color-emphasis-600)', fontWeight: 'normal' }}>✎ 可手工修改</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="number" value={variableRate} onChange={(e) => setVariableRate(e.target.value ? Number(e.target.value) : '')}
                    style={{ width: '100%', padding: '10px 30px 10px 14px', borderRadius: '8px', border: '1px solid var(--ifm-color-emphasis-300)', backgroundColor: 'var(--ifm-background-surface-color)', color: 'var(--ifm-font-color-base)', outline: 'none' }}
                  />
                  <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ifm-color-emphasis-600)' }}>%</span>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ padding: '20px', backgroundColor: 'var(--ifm-background-color)', borderRadius: '8px', border: '1px solid var(--ifm-color-emphasis-200)' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '600' }}>适用省市指导价</label>
              <select 
                value={province} onChange={(e) => setProvince(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--ifm-color-emphasis-300)', backgroundColor: 'var(--ifm-background-surface-color)', color: 'var(--ifm-font-color-base)', outline: 'none' }}
              >
                {PROVINCES.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
          )}
        </div>

        {/* 结果展示卡片区 */}
        <div style={{ padding: '32px', display: 'grid', gridTemplateColumns: calcMode === 'firm' ? '1fr 1fr 1fr' : '1fr 1.5fr', gap: '20px' }}>
          
          {calcMode === 'firm' && (
            <>
              <div style={{ padding: '20px', borderRadius: '12px', backgroundColor: 'var(--ifm-color-emphasis-100)', border: '1px solid var(--ifm-color-emphasis-200)', borderTop: '4px solid #64748b' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--ifm-color-emphasis-700)', marginBottom: '8px' }}>固定保底费用明细</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 'bold', color: 'var(--ifm-font-color-base)' }}>¥ {result.fixedPart.toLocaleString()}</div>
              </div>
              <div style={{ padding: '20px', borderRadius: '12px', backgroundColor: 'var(--ifm-color-emphasis-100)', border: '1px solid var(--ifm-color-emphasis-200)', borderTop: '4px solid #0ea5e9' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--ifm-color-emphasis-700)', marginBottom: '8px' }}>提成变动费用明细</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#0ea5e9' }}>¥ {result.variablePart.toLocaleString()}</div>
              </div>
            </>
          )}

          <div style={{ padding: '20px', borderRadius: '12px', backgroundColor: 'var(--ifm-color-emphasis-100)', border: '1px solid var(--ifm-color-emphasis-200)', borderTop: '4px solid #10b981' }}>
            <div style={{ fontSize: '0.9rem', color: 'var(--ifm-color-emphasis-800)', marginBottom: '8px', fontWeight: '600' }}>预估律师费合计总额</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981', letterSpacing: '-0.02em' }}>¥ {result.totalFee.toLocaleString()}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--ifm-color-emphasis-700)', marginTop: '12px' }}>大写：{amountToChinese(result.totalFee)}</div>
          </div>

          {/* 算式与依据展示 */}
          {calcMode === 'association' && (
             <div style={{ padding: '20px', borderRadius: '12px', backgroundColor: 'var(--ifm-background-color)', border: '1px dashed var(--ifm-color-emphasis-300)' }}>
               <div style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '10px' }}>⚖️ 阶梯计费算式拆解</div>
               <div style={{ fontSize: '0.95rem', color: 'var(--ifm-color-primary)', fontFamily: 'monospace', marginBottom: '12px', wordBreak: 'break-all' }}>{result.formula}</div>
               <div style={{ fontSize: '0.8rem', color: 'var(--ifm-color-emphasis-600)', lineHeight: '1.5' }}>依据：{result.basis}</div>
             </div>
          )}
        </div>
      </div>

      {/* 方案与二维码导出区 */}
      {numAmount > 0 && (
        <div style={{ display: 'flex', gap: '24px', backgroundColor: 'var(--ifm-background-surface-color)', borderRadius: '12px', border: '1px solid var(--ifm-color-emphasis-200)', padding: '24px', alignItems: 'flex-start' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ padding: '12px', border: '1px solid var(--ifm-color-emphasis-200)', borderRadius: '12px', backgroundColor: '#fff', display: 'inline-block' }}>
              <QRCodeSVG value={reportText} size={130} level="M" includeMargin={false} />
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--ifm-color-emphasis-600)', marginTop: '12px', fontWeight: '500' }}>扫码带走方案</div>
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '1.1rem', margin: '0 0 12px 0' }}>📑 方案报告预览</h3>
            <pre style={{ backgroundColor: 'var(--ifm-color-emphasis-100)', padding: '16px', borderRadius: '8px', fontSize: '0.85rem', color: 'var(--ifm-font-color-base)', whiteSpace: 'pre-wrap', fontFamily: 'inherit', border: '1px solid var(--ifm-color-emphasis-200)', margin: 0, lineHeight: '1.6' }}>
              {reportText}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
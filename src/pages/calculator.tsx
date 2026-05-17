import React, { useState, useMemo } from 'react';

// 案件类型定义
const CASE_TYPES = [
  { id: 'property', name: '财产案件 (标准分段计费)' },
  { id: 'divorce', name: '离婚案件 (涉及财产分割)' },
  { id: 'personality', name: '人格权案件 (涉及损害赔偿)' },
  { id: 'ip', name: '知识产权案件' },
  { id: 'labor', name: '劳动争议案件' },
  { id: 'admin', name: '行政案件 (普通)' },
  { id: 'admin_special', name: '商标、专利、海事行政案件' },
  { id: 'non_property', name: '普通非财产案件' },
  { id: 'jurisdiction', name: '管辖权异议不成立案件' },
];

// 将阿拉伯数字转换为人民币大写
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

export default function FeeCalculator() {
  const [caseType, setCaseType] = useState<string>('property');
  const [amount, setAmount] = useState<number | ''>('');
  const [isHalf, setIsHalf] = useState<boolean>(false);

  const numAmount = Number(amount) || 0;

  // 1. 案件受理费逻辑（包含公式与依据）
  const acceptance = useMemo(() => {
    let fee = 0;
    let formula = '0';
    let basis = '';

    const calcProperty = (val: number) => {
      let f = 50;
      let steps = ['50'];
      if (val > 10000) { const s = Math.min(val - 10000, 90000); f += s * 0.025; steps.push(`${s}×2.5%`); }
      if (val > 100000) { const s = Math.min(val - 100000, 100000); f += s * 0.02; steps.push(`${s}×2%`); }
      if (val > 200000) { const s = Math.min(val - 200000, 300000); f += s * 0.015; steps.push(`${s}×1.5%`); }
      if (val > 500000) { const s = Math.min(val - 500000, 500000); f += s * 0.01; steps.push(`${s}×1%`); }
      if (val > 1000000) { const s = Math.min(val - 1000000, 1000000); f += s * 0.009; steps.push(`${s}×0.9%`); }
      if (val > 2000000) { const s = Math.min(val - 2000000, 3000000); f += s * 0.008; steps.push(`${s}×0.8%`); }
      if (val > 5000000) { const s = Math.min(val - 5000000, 5000000); f += s * 0.007; steps.push(`${s}×0.7%`); }
      if (val > 10000000) { const s = Math.min(val - 10000000, 10000000); f += s * 0.006; steps.push(`${s}×0.6%`); }
      if (val > 20000000) { const s = val - 20000000; f += s * 0.005; steps.push(`${s}×0.5%`); }
      return { f, frm: steps.join(' + ') };
    };

    switch (caseType) {
      case 'property':
        basis = '《诉讼费用交纳办法》第十三条第（一）项：财产案件根据诉讼请求的金额或者价额，按比例分段累计交纳。';
        if (numAmount <= 10000) {
          fee = 50; formula = '50 (不超过1万元部分)';
        } else {
          const res = calcProperty(numAmount);
          fee = res.f; formula = res.frm;
        }
        break;
      
      case 'divorce':
        basis = '《诉讼费用交纳办法》第十三条第（二）项第1点：离婚案件每件交纳50至300元。涉及财产分割超过20万元的部分，按0.5％交纳。';
        fee = 300; formula = '300';
        if (numAmount > 200000) {
          fee += (numAmount - 200000) * 0.005;
          formula = `300 + ${(numAmount - 200000)}×0.5%`;
        }
        break;

      case 'personality':
        basis = '《诉讼费用交纳办法》第十三条第（二）项第2点：侵害人格权案件每件交纳100至500元。涉及损害赔偿超过5万元的部分梯级交纳。';
        fee = 500; formula = '500';
        if (numAmount > 50000) {
          if (numAmount <= 100000) {
            fee += (numAmount - 50000) * 0.01;
            formula = `500 + ${(numAmount - 50000)}×1%`;
          } else {
            fee += 500 + (numAmount - 100000) * 0.005;
            formula = `500 + 50000×1% + ${(numAmount - 100000)}×0.5%`;
          }
        }
        break;

      case 'ip':
        basis = '《诉讼费用交纳办法》第十三条第（二）项第3点：知识产权案件无争议金额交500至1000元；有争议金额按财产案件标准。';
        if (numAmount > 0) {
          const res = calcProperty(numAmount);
          fee = res.f; formula = res.frm;
        } else {
          fee = 1000; formula = '1000 (无争议金额，取高限)';
        }
        break;

      case 'labor':
        basis = '《诉讼费用交纳办法》第十三条第（三）项：劳动争议案件每件交纳10元。';
        fee = 10; formula = '10 (固定费用)';
        break;

      case 'admin':
        basis = '《诉讼费用交纳办法》第十三条第（五）项：其他行政案件每件交纳50元。';
        fee = 50; formula = '50 (固定费用)';
        break;
        
      case 'admin_special':
        basis = '《诉讼费用交纳办法》第十三条第（四）项：商标、专利、海事行政案件每件交纳100元。';
        fee = 100; formula = '100 (固定费用)';
        break;

      case 'non_property':
      case 'jurisdiction':
        basis = '《诉讼费用交纳办法》第十三条：非财产案件或管辖权异议，依法按件定额交纳（系统取值100元）。';
        fee = 100; formula = '100 (按件收费)';
        break;
    }
    return { fee, formula, basis };
  }, [caseType, numAmount]);

  // 2. 申请保全费逻辑
  const preservation = useMemo(() => {
    let fee = 30;
    let formula = '30';
    let basis = '《诉讼费用交纳办法》第十四条第（二）项：保全财产数额不超过1000元交纳30元；超过部分梯级计算，最多不超过5000元。';
    
    if (numAmount <= 0) return { fee: 0, formula: '金额为0，不收费', basis };
    if (numAmount <= 1000) return { fee: 30, formula: '30 (不超过1千元)', basis };
    
    let steps = ['30'];
    if (numAmount > 1000) { const s = Math.min(numAmount - 1000, 99000); fee += s * 0.01; steps.push(`${s}×1%`); }
    if (numAmount > 100000) { const s = numAmount - 100000; fee += s * 0.005; steps.push(`${s}×0.5%`); }
    
    formula = steps.join(' + ');
    if (fee > 5000) {
      fee = 5000;
      formula = `(${formula}) = 触发封顶 5000`;
    }
    return { fee, formula, basis };
  }, [numAmount]);

  // 3. 申请执行费逻辑
  const execution = useMemo(() => {
    let fee = 50;
    let formula = '50';
    let basis = '《诉讼费用交纳办法》第十四条第（一）项：申请执行按实际执行的财产数额分段累计交纳。';

    if (numAmount <= 0) return { fee: 0, formula: '金额为0，不收费', basis };
    if (numAmount <= 10000) return { fee: 50, formula: '50 (不超过1万元)', basis };

    let steps = ['50'];
    if (numAmount > 10000) { const s = Math.min(numAmount - 10000, 490000); fee += s * 0.015; steps.push(`${s}×1.5%`); }
    if (numAmount > 500000) { const s = Math.min(numAmount - 500000, 4500000); fee += s * 0.01; steps.push(`${s}×1%`); }
    if (numAmount > 5000000) { const s = Math.min(numAmount - 5000000, 5000000); fee += s * 0.005; steps.push(`${s}×0.5%`); }
    if (numAmount > 10000000) { const s = numAmount - 10000000; fee += s * 0.001; steps.push(`${s}×0.1%`); }
    
    formula = steps.join(' + ');
    return { fee, formula, basis };
  }, [numAmount]);

  const finalAcceptanceFee = isHalf ? acceptance.fee / 2 : acceptance.fee;
  const finalAcceptanceFormula = isHalf ? `(${acceptance.formula}) ÷ 2 [减半]` : acceptance.formula;

  return (
    <div style={{ 
      backgroundColor: 'var(--ifm-background-surface-color, #ffffff)', 
      borderRadius: '16px', 
      border: '1px solid var(--ifm-color-emphasis-200, #e5e7eb)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
      overflow: 'hidden'
    }}>
      {/* 顶部输入区 */}
      <div style={{ padding: '32px 32px 24px 32px', backgroundColor: 'var(--ifm-color-emphasis-100, #f8fafc)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.95rem', fontWeight: '600', color: 'var(--ifm-color-emphasis-800)' }}>
              案由类型
            </label>
            <select 
              value={caseType}
              onChange={(e) => setCaseType(e.target.value)}
              style={{ 
                width: '100%', padding: '12px 16px', fontSize: '1rem', 
                borderRadius: '8px', border: '1px solid var(--ifm-color-emphasis-300)',
                backgroundColor: 'var(--ifm-background-color)', color: 'var(--ifm-font-color-base)',
                outline: 'none', cursor: 'pointer'
              }}
            >
              {CASE_TYPES.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.95rem', fontWeight: '600', color: 'var(--ifm-color-emphasis-800)' }}>
              标的额 / 赔偿额 (人民币：元)
            </label>
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : '')}
              placeholder={['labor', 'admin'].includes(caseType) ? "此案由无需标的额" : "请输入金额..."}
              style={{ 
                width: '100%', padding: '12px 16px', fontSize: '1rem', 
                borderRadius: '8px', border: '1px solid var(--ifm-color-emphasis-300)',
                backgroundColor: 'var(--ifm-background-color)', color: 'var(--ifm-font-color-base)',
                outline: 'none', transition: 'border-color 0.2s'
              }}
            />
            {/* 自动显示大写金额 */}
            <div style={{ marginTop: '8px', fontSize: '0.85rem', color: 'var(--ifm-color-primary)', fontWeight: '500', minHeight: '20px' }}>
              {amount !== '' ? `大写：${amountToChinese(amount)}` : ''}
            </div>
          </div>
        </div>

        <div style={{ 
          display: 'flex', alignItems: 'center', padding: '12px 16px', 
          backgroundColor: 'var(--ifm-background-color)', borderRadius: '8px',
          border: '1px solid var(--ifm-color-emphasis-200)'
        }}>
          <input 
            type="checkbox" 
            id="halfFee"
            checked={isHalf}
            onChange={(e) => setIsHalf(e.target.checked)}
            style={{ width: '18px', height: '18px', marginRight: '12px', cursor: 'pointer' }}
          />
          <label htmlFor="halfFee" style={{ fontSize: '0.95rem', color: 'var(--ifm-color-emphasis-700)', cursor: 'pointer', margin: 0, userSelect: 'none' }}>
            适用简易程序 / 调解结案 / 申请撤诉 <span style={{ color: 'var(--ifm-color-primary)', fontWeight: 'bold' }}>（案件受理费减半）</span>
          </label>
        </div>
      </div>

      {/* 结果与公式展示区 */}
      <div style={{ padding: '32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        
        {/* 受理费卡片 */}
        <div style={{ padding: '24px', borderRadius: '12px', border: '1px solid var(--ifm-color-emphasis-200)', borderTop: '4px solid #0ea5e9' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ fontSize: '18px' }}>📄</span>
            <span style={{ fontSize: '0.95rem', color: 'var(--ifm-color-emphasis-600)', fontWeight: '500' }}>案件受理费</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0ea5e9', letterSpacing: '-0.02em' }}>
            ¥ {finalAcceptanceFee.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--ifm-color-emphasis-600)', marginTop: '12px', background: 'var(--ifm-color-emphasis-100)', padding: '8px', borderRadius: '6px', wordBreak: 'break-all' }}>
            <strong>算式：</strong>{finalAcceptanceFormula}
          </div>
        </div>

        {/* 保全费卡片 */}
        <div style={{ padding: '24px', borderRadius: '12px', border: '1px solid var(--ifm-color-emphasis-200)', borderTop: '4px solid #10b981' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ fontSize: '18px' }}>🔒</span>
            <span style={{ fontSize: '0.95rem', color: 'var(--ifm-color-emphasis-600)', fontWeight: '500' }}>申请保全费</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981', letterSpacing: '-0.02em' }}>
            ¥ {preservation.fee.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--ifm-color-emphasis-600)', marginTop: '12px', background: 'var(--ifm-color-emphasis-100)', padding: '8px', borderRadius: '6px', wordBreak: 'break-all' }}>
            <strong>算式：</strong>{preservation.formula}
          </div>
        </div>

        {/* 执行费卡片 */}
        <div style={{ padding: '24px', borderRadius: '12px', border: '1px solid var(--ifm-color-emphasis-200)', borderTop: '4px solid #8b5cf6' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ fontSize: '18px' }}>🔨</span>
            <span style={{ fontSize: '0.95rem', color: 'var(--ifm-color-emphasis-600)', fontWeight: '500' }}>申请强制执行费</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b5cf6', letterSpacing: '-0.02em' }}>
            ¥ {execution.fee.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--ifm-color-emphasis-600)', marginTop: '12px', background: 'var(--ifm-color-emphasis-100)', padding: '8px', borderRadius: '6px', wordBreak: 'break-all' }}>
            <strong>算式：</strong>{execution.formula}
          </div>
        </div>

      </div>

      {/* 底部计算依据 */}
      <div style={{ borderTop: '1px solid var(--ifm-color-emphasis-200)', backgroundColor: 'var(--ifm-color-emphasis-100)', padding: '24px 32px' }}>
        <h3 style={{ fontSize: '1.05rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>⚖️</span> 计算依据
        </h3>
        <ul style={{ fontSize: '0.85rem', color: 'var(--ifm-color-emphasis-700)', paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <li><strong>案件受理费：</strong>{acceptance.basis}</li>
          <li><strong>申请保全费：</strong>{preservation.basis}</li>
          <li><strong>申请执行费：</strong>{execution.basis}</li>
        </ul>
      </div>
    </div>
  );
}
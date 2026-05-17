import React, { useState, useMemo } from 'react';
import { QRCodeSVG } from 'qrcode.react';

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

  // 1. 案件受理费逻辑
  const acceptance = useMemo(() => {
    let fee = 0; let formula = '0'; let basis = '';
    const calcProperty = (val: number) => {
      let f = 50; let steps = ['50'];
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
      case 'property': basis = '分段累计'; if (numAmount <= 10000) { fee = 50; formula = '50'; } else { const res = calcProperty(numAmount); fee = res.f; formula = res.frm; } break;
      case 'divorce': basis = '财产分割超20万按0.5%'; fee = 300; formula = '300'; if (numAmount > 200000) { fee += (numAmount - 200000) * 0.005; formula = `300 + ${(numAmount - 200000)}×0.5%`; } break;
      case 'personality': basis = '赔偿超5万阶梯'; fee = 500; formula = '500'; if (numAmount > 50000) { if (numAmount <= 100000) { fee += (numAmount - 50000) * 0.01; formula = `500 + ${(numAmount - 50000)}×1%`; } else { fee += 500 + (numAmount - 100000) * 0.005; formula = `500 + 50000×1% + ${(numAmount - 100000)}×0.5%`; } } break;
      case 'ip': basis = '有争议按财产，无争议1000'; if (numAmount > 0) { const res = calcProperty(numAmount); fee = res.f; formula = res.frm; } else { fee = 1000; formula = '1000'; } break;
      case 'labor': basis = '10元/件'; fee = 10; formula = '10'; break;
      case 'admin': basis = '50元/件'; fee = 50; formula = '50'; break;
      case 'admin_special': basis = '100元/件'; fee = 100; formula = '100'; break;
      case 'non_property': case 'jurisdiction': basis = '100元/件'; fee = 100; formula = '100'; break;
    }
    return { fee, formula, basis };
  }, [caseType, numAmount]);

  // 2. 申请保全费
  const preservation = useMemo(() => {
    let fee = 30; let formula = '30'; let basis = '超1000元部分梯级计算 (封顶5000)';
    if (numAmount <= 0) return { fee: 0, formula: '0', basis };
    if (numAmount <= 1000) return { fee: 30, formula: '30', basis };
    let steps = ['30'];
    if (numAmount > 1000) { const s = Math.min(numAmount - 1000, 99000); fee += s * 0.01; steps.push(`${s}×1%`); }
    if (numAmount > 100000) { const s = numAmount - 100000; fee += s * 0.005; steps.push(`${s}×0.5%`); }
    formula = steps.join(' + ');
    if (fee > 5000) { fee = 5000; formula = `(${formula}) = 封顶5000`; }
    return { fee, formula, basis };
  }, [numAmount]);

  // 3. 申请执行费
  const execution = useMemo(() => {
    let fee = 50; let formula = '50'; let basis = '分段累计';
    if (numAmount <= 0) return { fee: 0, formula: '0', basis };
    if (numAmount <= 10000) return { fee: 50, formula: '50', basis };
    let steps = ['50'];
    if (numAmount > 10000) { const s = Math.min(numAmount - 10000, 490000); fee += s * 0.015; steps.push(`${s}×1.5%`); }
    if (numAmount > 500000) { const s = Math.min(numAmount - 500000, 4500000); fee += s * 0.01; steps.push(`${s}×1%`); }
    if (numAmount > 5000000) { const s = Math.min(numAmount - 5000000, 5000000); fee += s * 0.005; steps.push(`${s}×0.5%`); }
    if (numAmount > 10000000) { const s = numAmount - 10000000; fee += s * 0.001; steps.push(`${s}×0.1%`); }
    formula = steps.join(' + ');
    return { fee, formula, basis };
  }, [numAmount]);

  const finalAcceptanceFee = isHalf ? acceptance.fee / 2 : acceptance.fee;

  // 4. 生成可复制和扫码的专业文本报告
  const reportText = useMemo(() => {
    const caseName = CASE_TYPES.find(c => c.id === caseType)?.name || '未知案由';
    return `【诉讼成本测算方案】
案由类型：${caseName}
争议标的：¥${numAmount.toLocaleString()} (${amountToChinese(numAmount)})
是否减半：${isHalf ? '是 (适用简易/调解/撤诉)' : '否'}

[法院规费明细]
1. 案件受理费：¥${finalAcceptanceFee.toLocaleString()}
   (计算：${isHalf ? '('+acceptance.formula+')÷2' : acceptance.formula})
2. 财产保全费：¥${preservation.fee.toLocaleString()} (最高封顶5000元)
3. 强制执行费：¥${execution.fee.toLocaleString()} (仅在对方拒不履行时需交纳)

注：最终规费请以受诉法院《交纳诉讼费用通知书》为准。
生成自：逻辑原点 (Logixy) 法律智能平台`;
  }, [caseType, numAmount, isHalf, finalAcceptanceFee, acceptance.formula, preservation.fee, execution.fee]);


  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* 核心计算区 */}
      <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
        <div style={{ padding: '24px', backgroundColor: '#f8fafc' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '600' }}>案由类型</label>
              <select 
                value={caseType} onChange={(e) => setCaseType(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none' }}
              >
                {CASE_TYPES.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '600' }}>标的额 / 赔偿额 (元)</label>
              <input 
                type="number" value={amount} onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : '')}
                placeholder="请输入金额"
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none' }}
              />
              <div style={{ marginTop: '6px', fontSize: '0.8rem', color: '#3b82f6', fontWeight: '500', minHeight: '18px' }}>
                {amount !== '' ? `大写：${amountToChinese(amount)}` : ''}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input type="checkbox" id="halfFee" checked={isHalf} onChange={(e) => setIsHalf(e.target.checked)} style={{ marginRight: '8px' }} />
            <label htmlFor="halfFee" style={{ fontSize: '0.9rem', color: '#4b5563', margin: 0 }}>适用简易程序/调解结案 <strong style={{color: '#3b82f6'}}>（受理费减半）</strong></label>
          </div>
        </div>

        <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          <div style={{ padding: '16px', borderRadius: '8px', backgroundColor: '#f0f9ff', border: '1px solid #bae6fd' }}>
            <div style={{ fontSize: '0.85rem', color: '#0369a1', marginBottom: '4px' }}>案件受理费</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#0284c7' }}>¥ {finalAcceptanceFee.toLocaleString()}</div>
          </div>
          <div style={{ padding: '16px', borderRadius: '8px', backgroundColor: '#ecfdf5', border: '1px solid #a7f3d0' }}>
            <div style={{ fontSize: '0.85rem', color: '#047857', marginBottom: '4px' }}>申请保全费</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#059669' }}>¥ {preservation.fee.toLocaleString()}</div>
          </div>
          <div style={{ padding: '16px', borderRadius: '8px', backgroundColor: '#f5f3ff', border: '1px solid #ddd6fe' }}>
            <div style={{ fontSize: '0.85rem', color: '#5b21b6', marginBottom: '4px' }}>强制执行费</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#7c3aed' }}>¥ {execution.fee.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* 下方方案与二维码导出区 */}
      {(numAmount > 0 || ['labor', 'admin', 'admin_special'].includes(caseType)) && (
        <div style={{ 
          display: 'flex', gap: '24px', backgroundColor: '#fff', borderRadius: '12px', 
          border: '1px solid #e5e7eb', padding: '24px', alignItems: 'flex-start' 
        }}>
          {/* 左侧：二维码 */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ padding: '12px', border: '1px solid #e5e7eb', borderRadius: '12px', backgroundColor: '#fff', display: 'inline-block' }}>
              <QRCodeSVG value={reportText} size={140} level="M" includeMargin={false} />
            </div>
            <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '12px', fontWeight: '500' }}>手机扫码 · 一键复制方案</div>
          </div>

          {/* 右侧：生成的方案文本区 */}
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '1.1rem', margin: '0 0 12px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>📑 诉讼成本测算方案</span>
            </h3>
            <pre style={{ 
              backgroundColor: '#f8fafc', padding: '16px', borderRadius: '8px', 
              fontSize: '0.85rem', color: '#334155', whiteSpace: 'pre-wrap', fontFamily: 'inherit',
              border: '1px solid #e2e8f0', margin: 0, lineHeight: '1.6'
            }}>
              {reportText}
            </pre>
          </div>
        </div>
      )}

    </div>
  );
}
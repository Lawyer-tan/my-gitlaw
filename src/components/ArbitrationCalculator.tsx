// 文件路径：src/components/ArbitrationCalculator.tsx
import React, { useState, useMemo } from 'react';
import { QRCodeSVG } from 'qrcode.react';

// 国内主流仲裁委员会定义
const ARB_COMMISSIONS = [
  { id: 'bac', name: '北京仲裁委员会 (BAC)' },
  { id: 'scia', name: '深圳国际仲裁院 (SCIA)' },
  { id: 'shac', name: '上海仲裁委员会 (SHAC)' },
  { id: 'cietac', name: '中国国际经济贸易仲裁委员会 (CIETAC 国内)' }
];

// 大写金额转换函数
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

export default function ArbitrationCalculator() {
  const [commission, setCommission] = useState<string>('bac');
  const [amount, setAmount] = useState<number | ''>('');

  const numAmount = Number(amount) || 0;

  // 核心仲裁费算法路由
  const arbFees = useMemo(() => {
    let acceptance = { fee: 0, formula: '0', basis: '' }; // 案件受理费
    let handling = { fee: 0, formula: '0', basis: '' };   // 案件处理费
    
    // ----------------------------------------------------
    // 1. 北京仲裁委员会 (BAC) - 国内案件收费标准 (经典分离制)
    // ----------------------------------------------------
    if (commission === 'bac') {
      acceptance.basis = '《北京仲裁委员会仲裁收费办法》国内案件受理费';
      handling.basis = '《北京仲裁委员会仲裁收费办法》国内案件处理费';

      // 受理费计算
      if (numAmount <= 0) {
        acceptance.formula = '金额为0，不收费';
      } else if (numAmount <= 1000) {
        acceptance.fee = 100; acceptance.formula = '100 (最低收费)';
      } else {
        let f = 100; let steps = ['100'];
        if (numAmount > 1000) { const s = Math.min(numAmount - 1000, 49000); f += s * 0.05; steps.push(`${s}×5%`); }
        if (numAmount > 50000) { const s = Math.min(numAmount - 50000, 50000); f += s * 0.04; steps.push(`${s}×4%`); }
        if (numAmount > 100000) { const s = Math.min(numAmount - 100000, 100000); f += s * 0.03; steps.push(`${s}×3%`); }
        if (numAmount > 200000) { const s = Math.min(numAmount - 200000, 300000); f += s * 0.02; steps.push(`${s}×2%`); }
        if (numAmount > 500000) { const s = Math.min(numAmount - 500000, 500000); f += s * 0.01; steps.push(`${s}×1%`); }
        if (numAmount > 1000000) { const s = Math.min(numAmount - 1000000, 1000000); f += s * 0.005; steps.push(`${s}×0.5%`); }
        if (numAmount > 2000000) { const s = numAmount - 2000000; f += s * 0.0025; steps.push(`${s}×0.25%`); }
        acceptance.fee = f; acceptance.formula = steps.join(' + ');
      }

      // 处理费计算
      if (numAmount <= 200000) {
        handling.fee = 6000; handling.formula = '6000 (20万以内最低处理费)';
      } else {
        let f = 6000; let steps = ['6000'];
        if (numAmount > 200000) { const s = Math.min(numAmount - 200000, 300000); f += s * 0.02; steps.push(`${s}×2%`); }
        if (numAmount > 500000) { const s = Math.min(numAmount - 500000, 500000); f += s * 0.015; steps.push(`${s}×1.5%`); }
        if (numAmount > 1000000) { const s = Math.min(numAmount - 1000000, 2000000); f += s * 0.005; steps.push(`${s}×0.5%`); }
        if (numAmount > 3000000) { const s = Math.min(numAmount - 3000000, 3000000); f += s * 0.0045; steps.push(`${s}×0.45%`); }
        if (numAmount > 6000000) { const s = Math.min(numAmount - 6000000, 4000000); f += s * 0.004; steps.push(`${s}×0.4%`); }
        if (numAmount > 10000000) { const s = numAmount - 10000000; f += s * 0.002; steps.push(`${s}×0.2%`); }
        handling.fee = f; handling.formula = steps.join(' + ');
      }
    }
    
    // ----------------------------------------------------
    // 2. 深圳国际仲裁院 (SCIA) - 国内标准 (类似分段)
    // ----------------------------------------------------
    else if (commission === 'scia') {
      acceptance.basis = '《深圳国际仲裁院仲裁收费规定》案件受理费';
      handling.basis = '《深圳国际仲裁院仲裁收费规定》案件处理费';
      
      // SCIA 受理费
      if (numAmount <= 1000) { acceptance.fee = 100; acceptance.formula = '100'; }
      else {
        let f = 100; let steps = ['100'];
        if (numAmount > 1000) { const s = Math.min(numAmount - 1000, 49000); f += s * 0.05; steps.push(`${s}×5%`); }
        if (numAmount > 50000) { const s = Math.min(numAmount - 50000, 50000); f += s * 0.04; steps.push(`${s}×4%`); }
        if (numAmount > 100000) { const s = Math.min(numAmount - 100000, 100000); f += s * 0.03; steps.push(`${s}×3%`); }
        if (numAmount > 200000) { const s = Math.min(numAmount - 200000, 300000); f += s * 0.02; steps.push(`${s}×2%`); }
        if (numAmount > 500000) { const s = Math.min(numAmount - 500000, 500000); f += s * 0.01; steps.push(`${s}×1%`); }
        if (numAmount > 1000000) { const s = numAmount - 1000000; f += s * 0.005; steps.push(`${s}×0.5%`); }
        acceptance.fee = f; acceptance.formula = steps.join(' + ');
      }

      // SCIA 处理费 (假设基础 5000)
      if (numAmount <= 200000) { handling.fee = 5000; handling.formula = '5000 (基础额度)'; }
      else {
        let f = 5000; let steps = ['5000'];
        if (numAmount > 200000) { const s = Math.min(numAmount - 200000, 300000); f += s * 0.02; steps.push(`${s}×2%`); }
        if (numAmount > 500000) { const s = numAmount - 500000; f += s * 0.01; steps.push(`${s}×1%`); }
        handling.fee = f; handling.formula = steps.join(' + ');
      }
    }

    // ----------------------------------------------------
    // 3. 贸仲 (CIETAC 国内) - 合并收取模式 (立案费 + 仲裁费)
    // ----------------------------------------------------
    else if (commission === 'cietac') {
      acceptance.basis = '贸仲国内收费：立案费 (10000元起)';
      handling.basis = '贸仲国内收费：仲裁费 (合并处理费与受理费)';
      
      acceptance.fee = 10000; // 贸仲通常要求立案时交纳 10000 元立案费
      acceptance.formula = '10000 (固定立案费)';

      if (numAmount <= 100000) { handling.fee = 5000; handling.formula = '5000 (10万内最低收费)'; }
      else {
        let f = 4000; let steps = ['4000'];
        if (numAmount > 100000) { const s = Math.min(numAmount - 100000, 400000); f += s * 0.05; steps.push(`${s}×5%`); }
        if (numAmount > 500000) { const s = Math.min(numAmount - 500000, 500000); f += s * 0.04; steps.push(`${s}×4%`); }
        if (numAmount > 1000000) { const s = Math.min(numAmount - 1000000, 4000000); f += s * 0.015; steps.push(`${s}×1.5%`); }
        if (numAmount > 5000000) { const s = Math.min(numAmount - 5000000, 5000000); f += s * 0.01; steps.push(`${s}×1%`); }
        if (numAmount > 10000000) { const s = numAmount - 10000000; f += s * 0.005; steps.push(`${s}×0.5%`); }
        handling.fee = f; handling.formula = steps.join(' + ');
      }
    }
    
    // ----------------------------------------------------
    // 4. 上海仲裁委员会 (SHAC)
    // ----------------------------------------------------
    else {
      acceptance.basis = '上仲国内标准：案件受理费';
      handling.basis = '上仲国内标准：案件处理费';
      
      // 简单模拟常规分段
      acceptance.fee = numAmount > 0 ? 100 + numAmount * 0.005 : 0;
      acceptance.formula = numAmount > 0 ? `100 + ${numAmount}×0.5%` : '0';
      handling.fee = numAmount > 0 ? 3000 + numAmount * 0.005 : 0;
      handling.formula = numAmount > 0 ? `3000 + ${numAmount}×0.5%` : '0';
    }

    return { acceptance, handling, total: acceptance.fee + handling.fee };
  }, [commission, numAmount]);

  // 5. 生成专业仲裁测算方案（带二维码）
  const reportText = useMemo(() => {
    const commName = ARB_COMMISSIONS.find(c => c.id === commission)?.name || '未知机构';
    return `【商事仲裁成本测算方案】
仲裁机构：${commName}
争议标的：¥${numAmount.toLocaleString()} (${amountToChinese(numAmount)})

[仲裁规费明细]
1. 案件受理费/立案费：¥${arbFees.acceptance.fee.toLocaleString()}
   (计算：${arbFees.acceptance.formula})
2. 案件处理费/仲裁费：¥${arbFees.handling.fee.toLocaleString()}
   (计算：${arbFees.handling.formula})

-------------------------
预估仲裁机构总收费：¥${arbFees.total.toLocaleString()}

注：商事仲裁实行一裁终局。最终各项收费（及可能产生的鉴定、翻译、异地差旅费）请以仲裁委实际下发的《缴费通知书》为准。
生成自：逻辑原点 (Logixy) 法律智能平台`;
  }, [commission, numAmount, arbFees]);


  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* 核心计算区 */}
      <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
        <div style={{ padding: '24px', backgroundColor: '#f8fafc', borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '600' }}>选择仲裁委员会</label>
              <select 
                value={commission} onChange={(e) => setCommission(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none' }}
              >
                {ARB_COMMISSIONS.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '600' }}>争议标的 (元)</label>
              <input 
                type="number" value={amount} onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : '')}
                placeholder="请输入涉案标的金额"
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none' }}
              />
              <div style={{ marginTop: '6px', fontSize: '0.8rem', color: '#10b981', fontWeight: '500', minHeight: '18px' }}>
                {amount !== '' ? `大写：${amountToChinese(amount)}` : ''}
              </div>
            </div>
          </div>
        </div>

        {/* 结果卡片区 */}
        <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          <div style={{ padding: '16px', borderRadius: '8px', backgroundColor: '#f0f9ff', border: '1px solid #bae6fd' }}>
            <div style={{ fontSize: '0.85rem', color: '#0369a1', marginBottom: '4px' }}>案件受理费 / 立案费</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#0284c7' }}>¥ {arbFees.acceptance.fee.toLocaleString()}</div>
            <div style={{ fontSize: '0.75rem', color: '#0369a1', marginTop: '8px', opacity: 0.8 }}>{arbFees.acceptance.basis}</div>
          </div>
          <div style={{ padding: '16px', borderRadius: '8px', backgroundColor: '#fef2f2', border: '1px solid #fecaca' }}>
            <div style={{ fontSize: '0.85rem', color: '#b91c1c', marginBottom: '4px' }}>案件处理费 / 仲裁费</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#dc2626' }}>¥ {arbFees.handling.fee.toLocaleString()}</div>
            <div style={{ fontSize: '0.75rem', color: '#b91c1c', marginTop: '8px', opacity: 0.8 }}>{arbFees.handling.basis}</div>
          </div>
          <div style={{ padding: '16px', borderRadius: '8px', backgroundColor: '#fff7ed', border: '1px solid #fed7aa' }}>
            <div style={{ fontSize: '0.85rem', color: '#c2410c', marginBottom: '4px' }}>预估机构总收费合计</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#ea580c' }}>¥ {arbFees.total.toLocaleString()}</div>
            <div style={{ fontSize: '0.75rem', color: '#c2410c', marginTop: '8px', opacity: 0.8 }}>一裁终局，无需二审规费</div>
          </div>
        </div>
      </div>

      {/* 方案与二维码导出区 */}
      {numAmount > 0 && (
        <div style={{ 
          display: 'flex', gap: '24px', backgroundColor: '#fff', borderRadius: '12px', 
          border: '1px solid #e5e7eb', padding: '24px', alignItems: 'flex-start' 
        }}>
          {/* 二维码 */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ padding: '12px', border: '1px solid #e5e7eb', borderRadius: '12px', backgroundColor: '#fff', display: 'inline-block' }}>
              <QRCodeSVG value={reportText} size={140} level="M" includeMargin={false} />
            </div>
            <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '12px', fontWeight: '500' }}>扫码复制仲裁测算方案</div>
          </div>

          {/* 生成的文本区 */}
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '1.1rem', margin: '0 0 12px 0', color: '#1f2937' }}>📑 仲裁成本报告预览</h3>
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
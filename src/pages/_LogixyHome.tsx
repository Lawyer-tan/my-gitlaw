// src/pages/_LogixyHome.tsx
import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';

// 核心优势矩阵
const FEATURES = [
  {
    title: '物理级数据隔离',
    icon: '🛡️',
    description: '超越传统云端 SaaS。基于 本地化储存，您的机密卷宗与并购合同 100% 在浏览器本地解析与存储，拔掉网线依然流利运转，彻底斩断泄密风险。',
  },
  {
    title: '告别大模型幻觉',
    icon: '🎯',
    description: '高效的结构化提取引擎，拒绝不可控的自然语言闲聊。将杂乱的合同条款精准转化为 JSON 结构化数据，确保提取准确率直达 99%。',
  },
  {
    title: '思维链风控拦截',
    icon: '⚖️',
    description: '随时可调整的红线规则引擎，自主可控。不止于语义分析，更是将《民法典》及司法解释硬编码为审查红线，实现逻辑严密的 CoT (思维链) 风险穿透。',
  },
  {
    title: '沉浸式伴随审查',
    icon: '🖋️',
    description: '内置PDF与Word操作体验，不改变工作习惯，打造极致的审查流。左侧 PDF 溯源高亮，右侧一键应用法言法语润色，实时输出专业级尽调报告。',
  }
];

// 业务场景矩阵
const USE_CASES = [
  {
    title: '投融资并购尽调 (M&A)',
    desc: '面对动辄数百页的交易文件，Logixy 可在几秒内提取核心交易条件、控制权条款及潜在违约金陷阱。',
  },
  {
    title: '日常商事合同审核',
    desc: '预设 100+ 常见商业风险点审查清单，从买卖合同到 NDA，确保企业法务的每一次盖章都充满确信。',
  },
  {
    title: '合同风控建议', // 修改点4
    desc: '结合提取的结构化事实与 Zen Engine 判定的法律红线，一键组装生成格式严谨的法律意见书初稿。',
  }
];

export default function LogixyHome(): JSX.Element {
  return (
    <Layout
      title="Logixy | 逻辑原点"
      description="基于 BAML 与 Zen Engine 的本地优先合同 AI 工具">
      
      {/* 1. Hero 巨幕 */}
      <header style={{ 
        padding: '7rem 2rem 5rem', 
        textAlign: 'center', 
        background: 'linear-gradient(180deg, var(--ifm-background-surface-color) 0%, var(--ifm-background-color) 100%)' 
      }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ display: 'inline-block', padding: '6px 16px', borderRadius: '20px', backgroundColor: 'var(--ifm-color-primary-lightest)', color: 'var(--ifm-color-primary-dark)', fontWeight: 'bold', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            ✨ Logixy 即将发布
          </div>
          {/* 修改点1 */}
          <Heading as="h1" style={{ fontSize: '3.8rem', fontWeight: '800', letterSpacing: '-0.03em', lineHeight: '1.2', marginBottom: '1.5rem' }}>
            重塑法律工作的 <br/><span style={{ color: 'var(--ifm-color-primary)' }}>合同管理方式</span>
          </Heading>
          <p style={{ fontSize: '1.3rem', color: 'var(--ifm-color-emphasis-700)', marginBottom: '3rem', lineHeight: '1.6' }}>
            摒弃玩具式的 AI 对话。Logixy 融合 <strong>结构化提取</strong> 与 <strong>红线风控</strong> 规则引擎，为您提供 100% 数据本地化的下一代专业尽调与合同审查系统。
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            {/* 修改点5 */}
            <Link className="button button--primary button--lg" to="#" style={{ padding: '14px 36px', fontSize: '1.1rem' }}>
              产品即将发布
            </Link>
            <Link className="button button--outline button--secondary button--lg" to="/docs/intro" style={{ padding: '14px 36px', fontSize: '1.1rem' }}>
              阅读核心架构
            </Link>
          </div>
        </div>
      </header>

      {/* 2. 信任数据条 (Social Proof) */}
      <div style={{ borderTop: '1px solid var(--ifm-color-emphasis-200)', borderBottom: '1px solid var(--ifm-color-emphasis-200)', backgroundColor: 'var(--ifm-background-surface-color)', padding: '2rem 0' }}>
        <div className="container">
          <div className="row" style={{ textAlign: 'center' }}>
            {[
              { value: '100%', label: '数据本地化不出域' },
              { value: '10x', label: '尽调与审查提效' },
              { value: '0', label: '大模型幻觉干扰' },
              { value: '1000+', label: '底层风控规则节点' },
            ].map((stat, idx) => (
              <div key={idx} className="col col--3">
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--ifm-color-primary)' }}>{stat.value}</div>
                <div style={{ fontSize: '0.95rem', color: 'var(--ifm-color-emphasis-600)', marginTop: '0.5rem', fontWeight: '500' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. 核心能力矩阵 */}
      <main style={{ padding: '6rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <Heading as="h2" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>超越传统法律 SaaS 的技术底座</Heading>
            <p style={{ fontSize: '1.1rem', color: 'var(--ifm-color-emphasis-600)' }}>每一行代码，皆为严谨的法律逻辑服务。</p>
          </div>
          <div className="row">
            {FEATURES.map((f, idx) => (
              <div key={idx} className="col col--6" style={{ marginBottom: '2rem' }}>
                <div style={{ 
                  border: '1px solid var(--ifm-color-emphasis-200)', 
                  borderRadius: '16px', 
                  padding: '2.5rem', 
                  height: '100%',
                  backgroundColor: 'var(--ifm-background-surface-color)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  cursor: 'default'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                >
                  <div style={{ fontSize: '3rem', marginBottom: '1.5rem', background: 'var(--ifm-color-emphasis-100)', width: '70px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '14px' }}>
                    {f.icon}
                  </div>
                  <Heading as="h3" style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>{f.title}</Heading>
                  <p style={{ lineHeight: '1.7', color: 'var(--ifm-color-emphasis-700)', fontSize: '1.05rem', margin: 0 }}>{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. 业务场景 */}
        <div className="container" style={{ marginTop: '6rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <Heading as="h2" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>赋能高价值法律场景</Heading>
          </div>
          <div className="row">
            {USE_CASES.map((uc, idx) => (
              <div key={idx} className="col col--4" style={{ marginBottom: '1.5rem' }}>
                <div style={{ padding: '2rem', borderLeft: '4px solid var(--ifm-color-primary)', backgroundColor: 'var(--ifm-color-emphasis-100)', borderRadius: '0 12px 12px 0', height: '100%' }}>
                  <Heading as="h4" style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>{uc.title}</Heading>
                  <p style={{ fontSize: '0.95rem', color: 'var(--ifm-color-emphasis-700)', margin: 0, lineHeight: '1.6' }}>{uc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* 5. 底部行动呼吁 (Call to Action) */}
      <div style={{ backgroundColor: 'var(--ifm-color-primary-dark)', padding: '6rem 2rem', textAlign: 'center', color: '#fff' }}>
        <div className="container" style={{ maxWidth: '700px' }}>
          <Heading as="h2" style={{ fontSize: '2.5rem', color: '#fff', marginBottom: '1.5rem' }}>
            准备好体验法律 AI 的奇点了吗？
          </Heading>
          <p style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '3rem' }}>
            无需经过冗长的企业级审批，打开浏览器，您的 100% 免费、完全本地私有化的 Logixy 工作坊已准备就绪。
          </p>
          {/* 修改点2 */}
          <Link className="button button--secondary button--lg" to="#" style={{ padding: '14px 40px', fontSize: '1.1rem', color: 'var(--ifm-color-primary-dark)' }}>
            产品即将发布
          </Link>
          <div style={{ marginTop: '1.5rem', fontSize: '0.9rem', opacity: 0.7 }}>
            支持自带 API Key (BYOK) · 永久免费本地存储
          </div>
        </div>
      </div>
    </Layout>
  );
}
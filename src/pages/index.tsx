import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import { NAV_DATA, Category } from '../data/navData';

// 为标签定义一组高颜值的主题色（复刻官方 Showcase 的圆点颜色）
const TAG_COLORS = ['#e83e8c', '#39ca30', '#dfd545', '#7c3aed', '#0d9488', '#ea580c', '#b45309', '#2563eb'];

// --- 模块 1：单个大类区块渲染引擎 ---
function CategorySection({ category }: { category: Category }) {
  const availableTabs = category.subCategories.map(sub => sub.name);
  const [activeSubTab, setActiveSubTab] = useState(availableTabs[0]);

  // 防御性编程：如果搜索过滤后，当前选中的子标签不见了，自动切回第一个存在的标签
  const currentTab = availableTabs.includes(activeSubTab) ? activeSubTab : availableTabs[0];
  const activeItems = category.subCategories.find(sub => sub.name === currentTab)?.items || [];

  return (
    <div id={category.id} style={{ marginBottom: '4rem', scrollMarginTop: '100px' }}>
      {/* 大类标题 */}
      <Heading as="h2" style={{ 
        fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px', 
        borderBottom: '1px solid var(--ifm-color-emphasis-200)', paddingBottom: '12px', marginBottom: '16px'
      }}>
        <span>{category.icon}</span> {category.title}
      </Heading>

      {/* 子分类切换胶囊 */}
      {category.subCategories.length > 1 && (
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
          {category.subCategories.map(sub => (
            <button
              key={sub.name}
              onClick={() => setActiveSubTab(sub.name)}
              style={{
                padding: '6px 16px', borderRadius: '20px', fontSize: '0.9rem', cursor: 'pointer', border: 'none', transition: 'all 0.2s',
                backgroundColor: currentTab === sub.name ? 'var(--ifm-color-primary)' : 'var(--ifm-color-emphasis-100)',
                color: currentTab === sub.name ? '#fff' : 'var(--ifm-color-emphasis-700)',
                fontWeight: currentTab === sub.name ? '600' : '500'
              }}
            >
              {sub.name}
            </button>
          ))}
        </div>
      )}

      {/* 卡片网格 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
        {activeItems.map((item, idx) => (
          <a key={idx} href={item.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
            <div style={{ 
              border: '1px solid var(--ifm-color-emphasis-200)', borderRadius: '12px', padding: '16px',
              backgroundColor: 'var(--ifm-background-surface-color)', height: '100%',
              display: 'flex', flexDirection: 'column', transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.06)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'none';
            }}
            >
              <div style={{ display: 'flex', gap: '12px', marginBottom: '12px', flexGrow: 1 }}>
                <div style={{ 
                  width: '48px', height: '48px', flexShrink: 0, borderRadius: '50%', 
                  backgroundColor: 'var(--ifm-color-emphasis-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px'
                }}>
                  {item.logo}
                </div>
                <div>
                  <Heading as="h3" style={{ fontSize: '1.1rem', margin: '0 0 4px 0', color: 'var(--ifm-font-color-base)' }}>
                    {item.name}
                  </Heading>
                  <p style={{ fontSize: '0.85rem', color: 'var(--ifm-color-emphasis-600)', margin: '0', lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {item.desc}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {item.tags.map(tag => (
                    <span key={tag} style={{ 
                      fontSize: '0.75rem', padding: '2px 8px', borderRadius: '12px', 
                      backgroundColor: 'var(--ifm-color-emphasis-100)', color: 'var(--ifm-color-emphasis-600)' 
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <span style={{ color: 'var(--ifm-color-emphasis-400)', flexShrink: 0, marginLeft: '8px' }}>↗</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

// --- 模块 2：主页面拼装（含搜索与锚点标签） ---
export default function Home(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState('');

  // 核心逻辑 1：全局深层过滤引擎
  const filteredData = NAV_DATA.map(category => {
    // 过滤出名字或描述中包含搜索词的工具
    const newSubCategories = category.subCategories.map(sub => {
      const newItems = sub.items.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.desc.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return { ...sub, items: newItems };
    }).filter(sub => sub.items.length > 0); // 剔除空的子分类

    return { ...category, subCategories: newSubCategories };
  }).filter(category => category.subCategories.length > 0); // 剔除空的大类

  // 核心逻辑 2：平滑滚动到指定锚点
  const scrollToCategory = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // 减去 80px 是为了防止被顶部导航栏遮挡
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <Layout
      title={`导航站`}
      description="逻辑原点法律科技导航站 - 顶级法律 AI 与检索工具大全">
      
      {/* 巨幕区域：标题 + 搜索框 + 标签 */}
      <div style={{ backgroundColor: 'var(--ifm-background-color)', padding: '4rem 20px 3rem 20px', textAlign: 'center' }}>
        <Heading as="h1" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>逻辑原点业务矩阵</Heading>
        <p style={{ color: 'var(--ifm-color-emphasis-600)', fontSize: '1.1rem', marginBottom: '2.5rem' }}>Code is Law. 链接法律与代码的奇点。</p>

        {/* 巨型搜索框 */}
        <div style={{ maxWidth: '640px', margin: '0 auto 2rem auto', position: 'relative' }}>
          <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '1.2rem', color: 'var(--ifm-color-emphasis-500)', pointerEvents: 'none' }}>
            🔍
          </span>
          <input 
            type="text" 
            placeholder="在 60+ 法律工具中检索..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%', padding: '16px 20px 16px 48px', fontSize: '1.1rem', borderRadius: '8px',
              border: '1px solid var(--ifm-color-emphasis-300)', backgroundColor: 'var(--ifm-background-surface-color)',
              color: 'var(--ifm-font-color-base)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', outline: 'none', transition: 'all 0.2s',
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--ifm-color-primary)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--ifm-color-emphasis-300)'}
          />
        </div>

        {/* 锚点导航标签 (复刻图片风格) */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', maxWidth: '800px', margin: '0 auto' }}>
          {NAV_DATA.map((cat, idx) => (
            <button
              key={cat.id}
              onClick={() => scrollToCategory(cat.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '6px 14px', borderRadius: '6px', fontSize: '0.9rem', cursor: 'pointer',
                backgroundColor: 'transparent',
                border: '1px solid var(--ifm-color-emphasis-400)',
                color: 'var(--ifm-font-color-base)',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--ifm-color-emphasis-100)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              {cat.title} 
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: TAG_COLORS[idx % TAG_COLORS.length] }}></span>
            </button>
          ))}
        </div>
      </div>

      {/* 下方动态渲染的卡片矩阵 */}
      <main style={{ backgroundColor: 'var(--ifm-background-color)', minHeight: '60vh', padding: '0 20px 4rem 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {filteredData.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--ifm-color-emphasis-500)', border: '1px dashed var(--ifm-color-emphasis-300)', borderRadius: '12px' }}>
              未找到与 "{searchTerm}" 相关的工具。
            </div>
          ) : (
            filteredData.map(category => (
              <CategorySection key={category.id} category={category} />
            ))
          )}
        </div>
      </main>
    </Layout>
  );
}
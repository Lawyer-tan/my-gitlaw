// src/pages/_GitlawHome.tsx
import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import { NAV_DATA, Category } from '../data/navData';

// 定义标签圆点颜色
const TAG_COLORS = ['#e83e8c', '#39ca30', '#dfd545', '#7c3aed', '#0d9488', '#ea580c', '#b45309', '#2563eb'];

// --- 模块 1：分类区块渲染 ---
function CategorySection({ category }: { category: Category }) {
  const availableTabs = category.subCategories.map(sub => sub.name);
  const [activeSubTab, setActiveSubTab] = useState(availableTabs[0]);

  const currentTab = availableTabs.includes(activeSubTab) ? activeSubTab : availableTabs[0];
  const activeItems = category.subCategories.find(sub => sub.name === currentTab)?.items || [];

  return (
    <div id={category.id} style={{ marginBottom: '4rem', scrollMarginTop: '100px' }}>
      <Heading as="h2" style={{ 
        fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px', 
        borderBottom: '1px solid var(--ifm-color-emphasis-200)', paddingBottom: '12px', marginBottom: '16px'
      }}>
        <span>{category.icon}</span> {category.title}
      </Heading>

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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
        {activeItems.map((item, idx) => (
          <a key={idx} href={item.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
            <div style={{ 
              border: '1px solid var(--ifm-color-emphasis-200)', borderRadius: '12px', padding: '16px',
              backgroundColor: 'var(--ifm-background-surface-color)', height: '100%',
              display: 'flex', flexDirection: 'column', transition: 'transform 0.2s, box-shadow 0.2s'
            }}>
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
                  <p style={{ fontSize: '0.85rem', color: 'var(--ifm-color-emphasis-600)', margin: '0', lineHeight: '1.4', overflow: 'hidden' }}>
                    {item.desc}
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {item.tags.map(tag => (
                    <span key={tag} style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '12px', backgroundColor: 'var(--ifm-color-emphasis-100)' }}>{tag}</span>
                  ))}
                </div>
                <span style={{ color: 'var(--ifm-color-emphasis-400)' }}>↗</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

// --- 主页面渲染 ---
export default function GitlawHome(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = NAV_DATA.map(category => {
    const newSubCategories = category.subCategories.map(sub => {
      const newItems = sub.items.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.desc.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return { ...sub, items: newItems };
    }).filter(sub => sub.items.length > 0);
    return { ...category, subCategories: newSubCategories };
  }).filter(category => category.subCategories.length > 0);

  const scrollToCategory = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <Layout
      title="GitLaw - 法律科技导航"
      description="收录全球顶级法律 AI、数字化工具与法律科技资源">
      
      {/* 头部区域：完全聚焦 GitLaw */}
      <div style={{ backgroundColor: 'var(--ifm-background-color)', padding: '5rem 20px 3rem 20px', textAlign: 'center' }}>
        <Heading as="h1" style={{ fontSize: '3rem', fontWeight: 'bold' }}>GitLaw 法律导航</Heading>
        <p style={{ color: 'var(--ifm-color-emphasis-600)', fontSize: '1.2rem', marginBottom: '2.5rem' }}>
          Navigating the Future of Law. 汇聚法律 AI 与数字化工具图谱。
        </p>

        {/* 搜索框 */}
        <div style={{ maxWidth: '640px', margin: '0 auto 2rem auto', position: 'relative' }}>
          <input 
            type="text" 
            placeholder="搜索法律科技工具..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%', padding: '16px 20px 16px 48px', fontSize: '1.1rem', borderRadius: '8px',
              border: '1px solid var(--ifm-color-emphasis-300)', backgroundColor: 'var(--ifm-background-surface-color)'
            }}
          />
          <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }}>🔍</span>
        </div>

        {/* 分类标签 */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', maxWidth: '800px', margin: '0 auto' }}>
          {NAV_DATA.map((cat, idx) => (
            <button
              key={cat.id}
              onClick={() => scrollToCategory(cat.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '6px', 
                cursor: 'pointer', backgroundColor: 'transparent', border: '1px solid var(--ifm-color-emphasis-400)'
              }}
            >
              {cat.title} 
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: TAG_COLORS[idx % TAG_COLORS.length] }}></span>
            </button>
          ))}
        </div>
      </div>

      <main style={{ minHeight: '60vh', padding: '0 20px 4rem 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {filteredData.map(category => (
            <CategorySection key={category.id} category={category} />
          ))}
        </div>
      </main>
    </Layout>
  );
}
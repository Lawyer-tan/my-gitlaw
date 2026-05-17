// src/pages/_GitlawHome.tsx
import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import { NAV_DATA, Category } from '../data/gitlaw';
import FeeCalculator from '../components/FeeCalculator'; // 引入计算器组件

const TAG_COLORS = ['#e83e8c', '#39ca30', '#dfd545', '#7c3aed', '#0d9488', '#ea580c', '#b45309', '#2563eb'];

export default function GitlawHome(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState('');
  
  // 用于控制悬浮窗显隐的状态
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCalculator, setActiveCalculator] = useState('');

  const scrollToCategory = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // 拦截点击事件，如果是内部工具，则弹出悬浮窗
  const handleCardClick = (e: React.MouseEvent, url: string, name: string) => {
    if (url.startsWith('/calculator')) {
      e.preventDefault();
      setActiveCalculator(name);
      setIsModalOpen(true);
    }
  };

  // 分类渲染组件（内联以使用 handleCardClick）
  const renderCategory = (category: Category) => {
    const availableTabs = category.subCategories.map(sub => sub.name);
    const activeSubTab = availableTabs[0]; // 默认第一个
    const activeItems = category.subCategories.find(sub => sub.name === activeSubTab)?.items || [];

    return (
      <div key={category.id} id={category.id} style={{ marginBottom: '4rem', scrollMarginTop: '100px' }}>
        <Heading as="h2" style={{ fontSize: '1.6rem', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '2px solid var(--ifm-color-emphasis-200)', paddingBottom: '12px', marginBottom: '24px' }}>
          <span>{category.icon}</span> {category.title}
        </Heading>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {activeItems.map((item, idx) => (
            <a 
              key={idx} 
              href={item.url} 
              target={item.url.startsWith('/') ? '_self' : '_blank'} 
              rel="noopener noreferrer" 
              onClick={(e) => handleCardClick(e, item.url, item.name)} // 拦截点击
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div style={{ border: '1px solid var(--ifm-color-emphasis-200)', borderRadius: '12px', padding: '1.5rem', height: '100%', transition: 'all 0.3s ease', backgroundColor: 'var(--ifm-background-surface-color)', cursor: 'pointer' }}>
                <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '8px', background: 'var(--ifm-color-emphasis-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>{item.logo}</div>
                  <div>
                    <Heading as="h4" style={{ margin: 0 }}>{item.name}</Heading>
                    <p style={{ fontSize: '0.85rem', opacity: 0.7, margin: '4px 0 0', lineHeight: '1.4' }}>{item.desc}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {item.tags.map(t => <span key={t} style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '4px', background: 'var(--ifm-color-emphasis-100)', opacity: 0.8 }}>{t}</span>)}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Layout title="GitLaw | 法律科技导航" description="全球顶级法律 AI 与数字化工具图谱">
      <div style={{ padding: '5rem 0 3rem', textAlign: 'center', background: 'var(--ifm-background-surface-color)' }}>
        <Heading as="h1" style={{ fontSize: '3.5rem' }}>GitLaw 法律导航</Heading>
        <p style={{ opacity: 0.6, fontSize: '1.2rem', marginBottom: '2.5rem' }}>Navigating the Future of Law.</p>
        
        <div style={{ maxWidth: '600px', margin: '0 auto 2.5rem' }}>
          <input 
            type="text" 
            placeholder="搜索工具、资源、插件..." 
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '1rem 1.5rem', borderRadius: '10px', border: '2px solid var(--ifm-color-emphasis-300)', fontSize: '1.1rem' }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {NAV_DATA.map((cat, idx) => (
            <button key={cat.id} onClick={() => scrollToCategory(cat.id)} style={{ padding: '6px 16px', borderRadius: '20px', border: '1px solid var(--ifm-color-emphasis-400)', background: 'transparent', cursor: 'pointer' }}>
              {cat.title} <span style={{ color: TAG_COLORS[idx % TAG_COLORS.length] }}>●</span>
            </button>
          ))}
        </div>
      </div>

      <main className="container" style={{ paddingTop: '3rem' }}>
        {NAV_DATA.map(category => renderCategory(category))}
      </main>

      {/* --- SaaS 级高斯模糊背景悬浮窗 (Modal) --- */}
      {isModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)', // 毛玻璃效果
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          zIndex: 9999, padding: '20px'
        }}
        onClick={() => setIsModalOpen(false)} // 点击背景关闭
        >
          <div style={{
            backgroundColor: 'var(--ifm-background-color)',
            borderRadius: '16px', width: '100%', maxWidth: '850px',
            maxHeight: '90vh', overflowY: 'auto', // 内容过多可滚动
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            position: 'relative'
          }}
          onClick={(e) => e.stopPropagation()} // 阻止冒泡，防止点击面板内部时关闭
          >
            {/* 弹窗头部 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid var(--ifm-color-emphasis-200)' }}>
              <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 'bold' }}>{activeCalculator}</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--ifm-color-emphasis-600)', padding: '0 8px' }}
              >
                ✕
              </button>
            </div>
            
            {/* 弹窗核心内容：动态载入计算器组件 */}
            <div style={{ padding: '24px', backgroundColor: 'var(--ifm-background-surface-color)' }}>
              <FeeCalculator />
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
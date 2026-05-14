// src/components/NavGrid.tsx
import React from 'react';
import { navCategories } from '../data/navLinks';
import Link from '@docusaurus/Link'; // Docusaurus 内置的高性能路由组件

export default function NavGrid() {
  return (
    <div className="nav-container" style={{ padding: '20px 0' }}>
      {navCategories.map((section, idx) => (
        <div key={idx} style={{ marginBottom: '2rem' }}>
          <h2>{section.category}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }}>
            {section.links.map((link, lIdx) => (
              <Link key={lIdx} to={link.url} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ 
                  border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px', 
                  transition: 'box-shadow 0.2s', cursor: 'pointer', height: '100%' 
                }} 
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
                >
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>{link.icon}</div>
                  <h3 style={{ fontSize: '18px', margin: '0 0 8px 0' }}>{link.name}</h3>
                  <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>{link.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'; // 必须引入此钩子
import LogixyHome from './_LogixyHome';
import GitlawHome from './_GitlawHome';

export default function Home(): JSX.Element {
  // 通过上下文安全地读取在 docusaurus.config.ts 中定义的自定义字段
  const { siteConfig } = useDocusaurusContext();
  const siteTarget = siteConfig.customFields?.siteTarget;
  
  // 判断当前构建的目标站点是否为 GitLaw
  const isGitLaw = siteTarget === 'GITLAW';

  if (isGitLaw) {
    return <GitlawHome />;
  }

  return <LogixyHome />;
}
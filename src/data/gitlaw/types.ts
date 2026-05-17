// 文件路径：src/data/gitlaw/types.ts

export type NavItem = {
  name: string;
  desc: string;
  url: string;
  logo: string; 
  tags: string[]; 
};

export type SubCategory = {
  name: string;
  items: NavItem[];
};

export type Category = {
  id: string;
  title: string;
  icon: string;
  subCategories: SubCategory[];
};
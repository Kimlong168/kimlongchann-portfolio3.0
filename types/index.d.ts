export interface Article {
  id: number;
  title: string;
  description: string;
  published_date: string;
  slug: string;
  tags?: Array<string>;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  code_link?: string;
  demo_link?: string;
  date?: string;
  subtitle?: string;
  icon?: string;
  tags?: Array<string>;
}

export interface Skill {
  id: number;
  title: string;
  skills: Array<{
    name: string;
    level: number;
  }>;
}

export interface Gallery {
  id: number;
  title: string;
  image: string;
}

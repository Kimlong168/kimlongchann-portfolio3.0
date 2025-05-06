import { type BlocksContent } from "@strapi/blocks-react-renderer";

type IResponse<T> = { data: T[]; meta: Meta };

export interface Meta {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

//==========================
// ARTICLES
//==========================

export interface IArticle {
  id: number;
  title: string;
  description: string;
  published_date: string;
  slug: string;
  content: BlocksContent;
  tags?: string;
}

//==========================
// PROJECTS
//==========================

export interface IProject {
  id: number;
  title: string;
  description: string;
  demo_link?: string;
  code_link?: string;
  tags?: string;
  date?: string;
  subtitle?: string;
  icon?: string;
}

//==========================
// SKILLS
//==========================

export interface ISkill {
  id: number;
  title: string;
  skills: Array<{
    name: string;
    level: number;
  }>;
}

//==========================
// GALLERIES
//==========================

export interface IGallery {
  id: number;
  title: string;
}

export type IArticlesResponse = IResponse<IArticle>;
export type IArticleResponse = { data: IArticle };

export type IProjectsResponse = IResponse<IProject>;
export type ISkillsResponse = IResponse<ISkill>;
export type IGalleriesReponse = IResponse<IGallery>;

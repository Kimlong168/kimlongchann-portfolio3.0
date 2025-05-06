"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { revalidateTag } from "next/cache";
import { fetchAPI } from "./config";
import * as I from "./interface";
import { getStrapiMedia } from "./media";

export type Options = {
  sort?: string[];
  filters?: Record<string, any>;
  fields?: string[];
  populate?: Record<string, any>;
  pagination?: { page: number; pageSize: number };
};

//==========================
// ARTICLES
//==========================

export async function getArticles() {
  const res = await fetchAPI<I.IArticlesResponse>("/articles", {
    sort: ["published_date:desc", "createdAt:desc"],
    fields: ["id", "title", "published_date", "description", "slug", "tags"],
    populate: { cover: { fields: ["name", "url", "formats"] } },
    // pagination: { page: 1, pageSize: 3 },
  });

  const data = (res.data || [])?.map((x) => {
    const { id, title, published_date, description, tags, slug } = x || {};
    const tagsArray = tags?.split(",");
    return {
      id,
      title,
      description,
      published_date,
      slug,
      tags: tagsArray,
      cover: getStrapiMedia(x, "M"),
    };
  });

  return { data, pagination: res.meta.pagination };
}

export async function getArticleDetail(slug: string) {
  const res = await fetchAPI<I.IArticlesResponse>(`/articles`, {
    filters: { slug: { $eq: slug } },
    fields: ["id", "title", "description", "published_date", "content", "tags"],
    populate: { cover: { fields: ["name", "url", "formats"] } },
  });

  const { tags, ...result } = res?.data?.[0] || {};
  const tagsArray = tags?.split(",");

  return { ...result, tags: tagsArray, cover: getStrapiMedia(result, "L") };
}

//==========================
// Projects
//==========================

export async function getProjects() {
  const res = await fetchAPI<I.IProjectsResponse>("/projects", {
    filters: { type: { $eq: "Project" } },
    sort: ["createdAt:desc"],
    fields: ["id", "title", "description", "tags", "demo_link", "code_link"],
  });

  const data = (res.data || [])?.map((x) => {
    const { id, title, description, tags, demo_link, code_link } = x || {};
    const tagsArray = tags?.split(",");
    return {
      id,
      title,
      description,
      demo_link,
      code_link,
      tags: tagsArray,
    };
  });

  return { data, pagination: res.meta.pagination };
}

export async function getExperiences() {
  const res = await fetchAPI<I.IProjectsResponse>("/projects", {
    filters: { type: { $eq: "Experience" } },
    sort: ["createdAt:desc"],
    fields: ["id", "title", "subtitle", "description", "tags", "date"],
  });

  const data = (res.data || [])?.map((x) => {
    const { id, title, description, tags, date, subtitle } = x || {};
    const tagsArray = tags?.split(",");
    return {
      id,
      title,
      description,
      date,
      subtitle,
      tags: tagsArray,
    };
  });

  return { data, pagination: res.meta.pagination };
}

export async function getAchievements() {
  const res = await fetchAPI<I.IProjectsResponse>("/projects", {
    filters: { type: { $eq: "Achievement" } },
    sort: ["createdAt:desc"],
    fields: ["id", "title", "subtitle", "description", "icon", "date"],
  });

  const data = (res.data || [])?.map((x) => {
    const { id, title, description, date, subtitle, icon } = x || {};
    return {
      id,
      title,
      description,
      date,
      subtitle,
      icon,
    };
  });

  return { data, pagination: res.meta.pagination };
}

//==========================
// Skills
//==========================

export async function getSkills() {
  const res = await fetchAPI<I.ISkillsResponse>("/skills", {
    sort: ["order:asc"],
    fields: ["id", "title", "skills"],
  });

  const data = (res.data || [])?.map((x) => {
    const { id, title, skills } = x || {};

    return {
      id,
      title,
      skills,
    };
  });

  return { data, pagination: res.meta.pagination };
}

//==========================
// Galleries
//==========================

export async function getGalleries() {
  const res = await fetchAPI<I.IGalleriesReponse>("/galleries", {
    sort: ["createdAt:desc"],
    fields: ["id", "title"],
    populate: { image: { fields: ["name", "url", "formats"] } },
  });

  const data = (res.data || [])?.map((x) => {
    const { id, title } = x || {};
    return {
      id,
      title,
      image: getStrapiMedia(x, "M"),
    };
  });

  return { data, pagination: res.meta.pagination };
}

/**
 * !Noted : Nextjs 15 no longer supports revalidation during rendering process
 *  @link : https://nextjs.org/docs/app/api-reference/functions/unstable_after
 */
export async function revalidateCache(searchParams: any) {
  if (+searchParams?.revalidate) {
    await revalidateTag("api");
  }
}

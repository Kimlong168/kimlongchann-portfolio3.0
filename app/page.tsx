import {
  getAchievements,
  getArticles,
  getExperiences,
  getGalleries,
  getProjects,
  getSkills,
  revalidateCache,
} from "@/api";
import Terminal from "@/components/templates/terminal";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<never>;
}) {
  revalidateCache(await searchParams);
  const [articles, projects, experiences, achievements, skills, galleries] =
    await Promise.all([
      getArticles(),
      getProjects(),
      getExperiences(),
      getAchievements(),
      getSkills(),
      getGalleries(),
    ]);

  return (
    <Terminal
      articles={articles.data}
      projects={projects.data}
      experiences={experiences.data}
      achievements={achievements.data}
      skills={skills.data}
      galleries={galleries.data}
    />
  );
}

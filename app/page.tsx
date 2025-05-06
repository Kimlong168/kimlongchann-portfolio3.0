export const revalidate = 60;
export const dynamicParams = true;
import {
  getAchievements,
  getArticles,
  getExperiences,
  getGalleries,
  getProjects,
  getSkills,
} from "@/api";
import Terminal from "@/components/templates/terminal";

export default async function Home() {
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

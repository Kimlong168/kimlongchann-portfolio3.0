export const revalidate = 60;
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
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-8">
      <Terminal
        articles={articles.data}
        projects={projects.data}
        experiences={experiences.data}
        achievements={achievements.data}
        skills={skills.data}
        galleries={galleries.data}
      />
    </main>
  );
}

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/components/language-provider";

const skillCategories = [
  {
    id: "web",
    title: "Web Development",
    skills: [
      { name: "HTML5", level: 95 },
      { name: "CSS3", level: 90 },
      { name: "Tailwind CSS", level: 92 },
      { name: "JavaScript", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "React.js", level: 90 },
      { name: "Next.js", level: 88 },
      { name: "Node.js", level: 80 },
      { name: "Express.js", level: 82 },
      { name: "Nest.js", level: 85 },
      { name: "Laravel", level: 70 },
    ],
  },
  {
    id: "app",
    title: "Telegram Bot",
    skills: [
      { name: "React Native", level: 65 },
      { name: "Flutter", level: 60 },
      { name: "Swift", level: 1 },
      { name: "Kotlin", level: 1 },
    ],
  },
  {
    id: "marketing",
    title: "Digital Marketing",
    skills: [
      { name: "SEO", level: 80 },
      { name: "Social Media Marketing", level: 85 },
      { name: "Content Creation", level: 90 },
      { name: "Google Analytics", level: 75 },
    ],
  },
  {
    id: "design",
    title: "Poster Design",
    skills: [
      { name: "Canva", level: 95 },
      { name: "Figma", level: 70 },
      { name: "Photoshop", level: 20 },
      { name: "Illustrator", level: 10 },
    ],
  },
];

export default function SkillsSection() {
  const { t } = useLanguage();

  return (
    <div className="grid gap-6">
      <h2 className="text-2xl font-bold">{t("skills.title")}</h2>

      <div className="grid gap-6 md:grid-cols-2">
        {skillCategories.map((category) => (
          <Card key={category.id}>
            <CardHeader className="pb-2">
              <CardTitle>{t(`skills.categories.${category.id}`)}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

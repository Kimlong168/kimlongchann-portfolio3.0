"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/language-provider";

const experiences = [
  {
    id: 1,
    title: "Web Developer & Content Creator",
    company: "Erobot Cambodia",
    period: "2022 - Present",
    description:
      "Erobot is a non-profit organization that aims to help the Cambodian young generation get to know technology and innovation. I have been a part of the web development department and also social media department at Erobot since 2022.",
    skills: ["React", "Laravel", "Figma", "Tailwind CSS", "Content Writing"],
  },
  {
    id: 2,
    title: "Digital Marketer",
    company: "Project Inspire",
    period: "2023 - 2024",
    description:
      "I am a part of the digital marketing department at PI. We have worked on a campaign called 1K Dream Jobs, which aims to find jobs for 1,000 people.",
    skills: ["Content Writing", "Poster Design"],
  },
  {
    id: 3,
    title: "Sea games and Paragames",
    company: "Cambodia 2023",
    period: "2023",
    description:
      "The SEA Games and Para Games Cambodia 2023 are multi-sport events took place in Cambodia. I was a part of the opening and closing ceremony team, responsible for ensuring that the event days go smoothly.",
    skills: ["Team Work", "Communication"],
  },
  {
    id: 4,
    title: "Web Developer",
    company: "Sorakhmer",
    period: "2024",
    description:
      "I successfully completed my internship at Sorakhmer Company as a web developer, delivering a functional website (sorakhmer.com) for the company's use as needed.",
    skills: ["React", "Firebase", "Figma", "Tailwind CSS", "SEO"],
  },
  {
    id: 5,
    title: "Freelance Web Developer",
    company: "3corseco",
    period: "2024",
    description:
      "I and my team successfully completed 3corseco.com for 3corseco Company located in Kampong Thom province, delivering a functional website (3corseco.com) for the company's use as needed.",
    skills: ["React", "Laravel", "Figma", "Tailwind CSS", "SEO"],
  },
  {
    id: 6,
    title: "Next-Gen Engagement Program Mentor",
    company: "CADT",
    period: "August 2024",
    description:
      "Organized by CADT (IDT) to help students learn from each other during the term break, I served as a mentor, guiding junior students through a full-stack web development project.",
    skills: ["React", "Laravel", "Tailwind CSS", "Mentoring", "Leading"],
  },
];

export default function ExperienceSection() {
  const { t } = useLanguage();

  return (
    <div className="grid gap-6">
      <h2 className="text-2xl font-bold">{t("experience.title")}</h2>

      <div className="relative pl-6 border-l-2 border-border">
        {experiences.map((exp, index) => (
          <div key={exp.id} className="mb-10 relative">
            {/* Timeline dot */}
            <div className="absolute w-4 h-4 bg-primary rounded-full -left-[0.81rem] top-1.5"></div>

            <Card className="ml-4">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
                  <div>
                    <h3 className="font-bold text-lg">{exp.title}</h3>
                    <p className="text-muted-foreground">{exp.company}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className="md:self-start self-start md:ml-0 w-fit"
                  >
                    {exp.period}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {exp.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

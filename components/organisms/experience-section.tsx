"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/language-provider";
import { Project } from "@/types";



export default function ExperienceSection({
  experiences,
}: {
  experiences: Project[];
}) {
  const { t } = useLanguage();

  return (
    <div className="grid gap-6">
      <h2 className="text-2xl font-bold">{t("experience.title")}</h2>

      <div className="relative pl-6 border-l-2 border-border">
        {experiences.map((exp, index) => (
          <div key={exp.id} className="mb-10 relative">
            <div className="absolute w-4 h-4 bg-primary rounded-full -left-[33px] -top-1.5"></div>

            <Card className="ml-4">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
                  <div>
                    <h3 className="font-bold text-lg">{exp.title}</h3>
                    <p className="text-muted-foreground">{exp.subtitle}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className="md:self-start self-start md:ml-0 w-fit"
                  >
                    {exp.date}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {exp.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {exp.tags?.map((x) => (
                    <Badge key={x} variant="secondary" className="text-xs">
                      {x}
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

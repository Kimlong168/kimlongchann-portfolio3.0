"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-provider";
import { Skill } from "@/types";

export default function SkillsSection({ skills }: { skills: Skill[] }) {
  const { t } = useLanguage();

  return (
    <div className="grid gap-6">
      <h2 className="text-2xl font-bold">{t("skills.title")}</h2>

      <div className="grid gap-6 md:grid-cols-2">
        {skills.map((x) => (
          <Card key={x.id}>
            <CardHeader className="pb-2">
              <CardTitle>{x.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {x.skills.map((s) => (
                  <div key={s.name} className="space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{s.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {s.level}%
                      </span>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${s.level}%` }}
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

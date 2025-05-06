"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/language-provider";
import { Award, Trophy, Users, Star } from "lucide-react";
import { Project } from "@/types";

// const achievements = [
//   {
//     id: 1,
//     title: "Access Microscholarship Program 2019 (FY17)",
//     event: "US Embassy Phnom Penh",
//     year: "2019",
//     description:
//       "This shcolarship was provided by US Embassy Phnom Penh. I studied English for 2 years.",
//     type: "scholarship",
//   },
//   {
//     id: 2,
//     title: "Bacll 2021 - Grade A",
//     event: "National exam",
//     year: "2021",
//     description:
//       "I studied at Chamroeun Vichea High School from 2018-2021. I got grade A in national exam 2021.",
//     type: "award",
//   },
//   {
//     id: 3,
//     title: "Techo scholarship 2021",
//     event: "CADT",
//     year: "2021",
//     description:
//       "I got Techo Scholarhaip 2021 to study at CAMBODIA ACADEMY OF DIGITAL TECHNOLOGY (CADT).",
//     type: "scholarship",
//   },
//   {
//     id: 4,
//     title: "Nava-Thon Champoin 2023",
//     event: "Save the Children Cambodia",
//     year: "2023",
//     description:
//       "This is the first time I joined Nava-Thon. I got the first place in the competition.",
//     type: "award",
//   },
//   {
//     id: 5,
//     title: "I4D 2.0 - 2024",
//     event: "GIZ Cambodia",
//     year: "2024",
//     description: "Top 10 final selected cadidates of I4D 2.0.",
//     type: "internship",
//   },

//   {
//     id: 6,
//     title: "CADT CUP 2022 & 2023 (Football)",
//     event: "CSA x CADT",
//     year: "2022 & 2023",
//     description:
//       "We are the first runner up of CADT-CUP 2023 and the second runner up of CADT-CUP 2022.",
//     type: "sport",
//   },
// ];

const getIcon = (type: string) => {
  switch (type) {
    case "award":
      return <Trophy className="h-5 w-5" />;
    case "hackathon":
      return <Star className="h-5 w-5" />;
    case "volunteer":
      return <Users className="h-5 w-5" />;
    default:
      return <Award className="h-5 w-5" />;
  }
};

export default function AchievementsSection({
  achievements,
}: {
  achievements: Project[];
}) {
  const { t } = useLanguage();

  return (
    <div className="grid gap-6">
      <h2 className="text-2xl font-bold">{t("achievements.title")}</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {achievements.map((achievement) => (
          <Card key={achievement.id}>
            <CardHeader className="flex flex-row items-center gap-2 pb-2">
              <div className="bg-primary/10 p-2 rounded-full">
                {getIcon(achievement.icon || "award")}
              </div>
              <div>
                <CardTitle className="text-base">{achievement.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {achievement.subtitle}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <Badge variant="outline" className="mb-2">
                {achievement.date}
              </Badge>
              <p className="text-sm text-muted-foreground">
                {achievement.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

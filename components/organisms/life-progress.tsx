"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/language-provider";
import { Clock } from "lucide-react";

export default function LifeProgress() {
  const { t } = useLanguage();
  const [progress, setProgress] = useState({
    years: 0,
    weeks: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    percentage: 0,
  });

  const progressItems = [
    { label: "lifeProgress.years", value: progress.years },
    { label: "lifeProgress.weeks", value: progress.weeks },
    { label: "lifeProgress.days", value: progress.days },
    { label: "lifeProgress.hours", value: progress.hours },
    { label: "lifeProgress.minutes", value: progress.minutes },
    { label: "lifeProgress.seconds", value: progress.seconds },
  ];

  useEffect(() => {
    const calculateProgress = () => {
      const birthDate = new Date(2003, 2, 11); // March 11, 2003
      const now = new Date();

      // Calculate age in different units
      const ageInMilliseconds = now.getTime() - birthDate.getTime();
      const ageInSeconds = Math.floor(ageInMilliseconds / 1000);
      const ageInMinutes = Math.floor(ageInSeconds / 60);
      const ageInHours = Math.floor(ageInMinutes / 60);
      const ageInDays = Math.floor(ageInHours / 24);
      const ageInWeeks = Math.floor(ageInDays / 7);
      const ageInYears = Math.floor(ageInDays / 365.25);

      // Calculate percentage of life lived (assuming 90 years lifespan)
      const lifeExpectancy = 85 * 365.25 * 24 * 60 * 60 * 1000; // 85 years in milliseconds
      const percentageLived = (ageInMilliseconds / lifeExpectancy) * 100;

      setProgress({
        years: ageInYears,
        weeks: ageInWeeks,
        days: ageInDays,
        hours: ageInHours,
        minutes: ageInMinutes,
        seconds: ageInSeconds,
        percentage: percentageLived,
      });
    };

    calculateProgress();
    const timer = setInterval(calculateProgress, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          <CardTitle>{t("lifeProgress.title")}</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground flex gap-3 items-center">
          {t("lifeProgress.description")}{" "}
        </p>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">
              {t("lifeProgress.progressLabel")}
            </span>
            <span className="text-sm font-medium">
              {progress.percentage.toFixed(6)}%
            </span>
          </div>
          <Progress value={progress.percentage} className="h-2" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {progressItems.map((item, index) => (
            <div key={index} className="bg-muted rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">{item.value}</div>
              <div className="text-xs uppercase text-muted-foreground">
                {t(item.label)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

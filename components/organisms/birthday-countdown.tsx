"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-provider";
import { Cake, Calendar } from "lucide-react";

export default function BirthdayCountdown() {
  const { t } = useLanguage();
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const countdownItems = [
    { label: "birthday.days", value: countdown.days },
    { label: "birthday.hours", value: countdown.hours },
    { label: "birthday.minutes", value: countdown.minutes },
    { label: "birthday.seconds", value: countdown.seconds },
  ];

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      const currentYear = now.getFullYear();

      // March 11th of current year or next year
      let birthday = new Date(currentYear, 2, 11); // Month is 0-indexed

      // If birthday has passed this year, use next year's birthday
      if (now > birthday) {
        birthday = new Date(currentYear + 1, 2, 11);
      }

      const difference = birthday.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setCountdown({ days, hours, minutes, seconds });
      }
    };

    calculateCountdown();
    const timer = setInterval(calculateCountdown, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Cake className="h-5 w-5 text-primary" />
          <CardTitle>{t("birthday.title")}</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          {t("birthday.description")}
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4 text-center">
          {countdownItems.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="text-3xl font-bold">{item.value}</div>
              <div className="text-xs uppercase text-muted-foreground">
                {t(item.label)}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">March 11, 2003</span>
        </div>
      </CardContent>
    </Card>
  );
}

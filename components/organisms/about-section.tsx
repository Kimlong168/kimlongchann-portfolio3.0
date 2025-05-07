"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download } from "lucide-react";
import { useLanguage } from "@/contexts/language-provider";

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">{t("about.title")}</h2>
            <p className="text-muted-foreground mb-4">{t("about.bio")}</p>
            <p className="text-muted-foreground mb-6">{t("about.bio2")}</p>
            <a href="/ChannKimlong_CV.pdf" download>
              <Button className="gap-2 bg-primary dark:text-black text-white">
                <Download className="h-4 w-4" />
                {t("about.download")}
              </Button>
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

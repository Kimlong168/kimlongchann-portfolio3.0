"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

export default function AboutSection() {
  const { t } = useLanguage();

  const PDF_FILE_URL = "https://kimlongchann.netlify.app/ChannKimlong_CV.PDF";

  const handleDownload = (url: string): void => {
    const fileName = url.split("/").pop();
    if (!fileName) {
      console.error("Could not determine the file name from the URL");
      return;
    }

    const aTag = document.createElement("a");
    aTag.href = url;
    aTag.setAttribute("download", fileName);
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">{t("about.title")}</h2>
            <p className="text-muted-foreground mb-4">{t("about.bio")}</p>
            <p className="text-muted-foreground mb-6">{t("about.bio2")}</p>

            <Button
              onClick={() => handleDownload(PDF_FILE_URL)}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              {t("about.download")}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

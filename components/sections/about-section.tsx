"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

export default function AboutSection() {
  const { t } = useLanguage();

  const PDF_FILE_URL = "https://channkimlong.vercel.app/ChannKimlong_CV.pdf";

  const handleDownload = async () => {
    try {
      const fileName = PDF_FILE_URL.split("/").pop() || "downloaded.pdf";
      const response = await fetch(PDF_FILE_URL);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
    }
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
              onClick={() => handleDownload()}
              className="gap-2 bg-primary dark:text-black text-white"
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

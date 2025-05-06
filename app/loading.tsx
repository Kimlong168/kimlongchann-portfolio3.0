"use client";
import TerminalWrapper from "@/components/templates/terminal-wrapper";
import { useLanguage } from "@/contexts/language-provider";

export default function Loading() {
  const { t } = useLanguage();
  return (
    <div className="flex justify-center items-center h-screen">
      <TerminalWrapper>
        <div className="h-full grid place-content-center">
          {t("terminal.loading")}
        </div>
      </TerminalWrapper>
    </div>
  );
}

"use client";
import TerminalWrapper from "@/components/templates/terminal-wrapper";
import { useLanguage } from "@/contexts/language-provider";

export default function Loading() {
  const { t } = useLanguage();
  return (
    <TerminalWrapper>
      <div className="h-full grid place-content-center">
        {t("terminal.loading")}
      </div>
    </TerminalWrapper>
  );
}

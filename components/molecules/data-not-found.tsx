"use client";
import { useLanguage } from "@/contexts/language-provider";
import TerminalWrapper from "../templates/terminal-wrapper";

export const DataNotFound = () => {
  const { t } = useLanguage();
  return (
    <div className="flex justify-center items-center h-screen">
      <TerminalWrapper commandType="exit">
        <div className="h-full grid place-content-center">
          {t("terminal.loading")}
        </div>
      </TerminalWrapper>
    </div>
  );
};

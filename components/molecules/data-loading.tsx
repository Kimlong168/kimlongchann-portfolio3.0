"use client";
import React from "react";
import TerminalWrapper from "../templates/terminal-wrapper";
import { useLanguage } from "@/contexts/language-provider";

export const DataLoading = () => {
  const { t } = useLanguage();
  return (
    <TerminalWrapper>
      <div className="h-full grid place-content-center">
        {t("terminal.loading")}
      </div>
    </TerminalWrapper>
  );
};

"use client";

import { useQueryState } from "nuqs";
import type React from "react";

import { createContext, useContext, useState } from "react";

const ActiveTabContext = createContext<
  | {
      activeTab: string;
      setActiveTab: (v: string) => void;
    }
  | undefined
>(undefined);

export function TabProvider({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useQueryState("tab", {
    defaultValue: "about",
  });

  return (
    <ActiveTabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </ActiveTabContext.Provider>
  );
}

export const useActiveTab = () => {
  const context = useContext(ActiveTabContext);
  if (context === undefined) {
    throw new Error("useActiveTab must be used within a TabProvider");
  }
  return context;
};

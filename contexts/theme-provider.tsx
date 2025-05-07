"use client";
import setGlobalColorTheme from "@/lib/theme-colors";
import { useTheme } from "next-themes";
import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext<ThemeColorStateParams>(
  {} as ThemeColorStateParams
);

import { ReactNode } from "react";

export default function ThemeDataProvider({
  children,
}: {
  children: ReactNode;
}) {
  const getSavedThemeColor = () => {
    try {
      return (localStorage.getItem("themeColor") as ThemeColors) || "Blue";
    } catch (error) {
      return "Blue" as ThemeColors;
    }
  };

  const getSavedRadius = () => {
    try {
      return localStorage.getItem("radius") || "0.5rem";
    } catch (error) {
      return "0.5rem";
    }
  };

  const [themeColor, setThemeColor] = useState<ThemeColors>(
    getSavedThemeColor() as ThemeColors
  );
  const [radius, setRadius] = useState(getSavedRadius());
  const [isMounted, setIsMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    // theme
    localStorage.setItem("themeColor", themeColor);
    setGlobalColorTheme(theme as "light" | "dark", themeColor);

    // radius
    localStorage.setItem("radius", radius);
    document.documentElement.style.setProperty("--radius", radius);

    if (!isMounted) {
      setIsMounted(true);
    }
  }, [themeColor, theme, radius]);

  if (!isMounted) {
    return null;
  }

  return (
    <ThemeContext.Provider
      value={{ themeColor, setThemeColor, radius, setRadius }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}

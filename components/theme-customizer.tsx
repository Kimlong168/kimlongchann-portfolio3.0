"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useLanguage } from "@/components/language-provider";

const themes = [
  {
    name: "zinc",
    label: "Zinc",
    activeColor: "bg-zinc-500",
  },
  {
    name: "slate",
    label: "Slate",
    activeColor: "bg-slate-500",
  },
  {
    name: "stone",
    label: "Stone",
    activeColor: "bg-stone-500",
  },
  {
    name: "gray",
    label: "Gray",
    activeColor: "bg-gray-500",
  },
  {
    name: "neutral",
    label: "Neutral",
    activeColor: "bg-neutral-500",
  },
  {
    name: "red",
    label: "Red",
    activeColor: "bg-red-500",
  },
  {
    name: "rose",
    label: "Rose",
    activeColor: "bg-rose-500",
  },
  {
    name: "orange",
    label: "Orange",
    activeColor: "bg-orange-500",
  },
  {
    name: "green",
    label: "Green",
    activeColor: "bg-green-500",
  },
  {
    name: "blue",
    label: "Blue",
    activeColor: "bg-blue-500",
  },
  {
    name: "yellow",
    label: "Yellow",
    activeColor: "bg-yellow-500",
  },
  {
    name: "violet",
    label: "Violet",
    activeColor: "bg-violet-500",
  },
];

export default function ThemeCustomizer() {
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();
  const [radius, setRadius] = useState("0.5rem");
  const [selectedTheme, setSelectedTheme] = useState("");

  const applyTheme = (themeName: string) => {
    setSelectedTheme(themeName);

    // Apply theme color
    document.documentElement.style.setProperty("--theme-color", themeName);

    // You would typically update a CSS variable or class here
    // For a real implementation, you'd need to modify your Tailwind config
    // and have a way to dynamically change the primary color
  };

  const applyRadius = (value: string) => {
    setRadius(value);
    document.documentElement.style.setProperty("--radius", value);
  };

  return (
    <div className="grid gap-4">
      <div>
        <h4 className="mb-2 text-sm font-medium">{t("customizer.mode")}</h4>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant={theme === "light" ? "default" : "outline"}
            onClick={() => setTheme("light")}
            className="justify-start"
          >
            {t("customizer.light")}
          </Button>
          <Button
            variant={theme === "dark" ? "default" : "outline"}
            onClick={() => setTheme("dark")}
            className="justify-start"
          >
            {t("customizer.dark")}
          </Button>
        </div>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-medium">{t("customizer.radius")}</h4>
        <RadioGroup
          defaultValue={radius}
          onValueChange={applyRadius}
          className="grid grid-cols-3 gap-2"
        >
          <div>
            <RadioGroupItem value="0" id="radius-0" className="sr-only" />
            <Label
              htmlFor="radius-0"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-2 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
            >
              <span className="mb-1 text-xs">{t("customizer.none")}</span>
              <span className="w-10 h-4 rounded-none bg-primary"></span>
            </Label>
          </div>
          <div>
            <RadioGroupItem value="0.5rem" id="radius-2" className="sr-only" />
            <Label
              htmlFor="radius-2"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-2 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
            >
              <span className="mb-1 text-xs">{t("customizer.default")}</span>
              <span
                style={{
                  borderRadius: "4px",
                }}
                className="w-10 h-4  bg-primary"
              ></span>
            </Label>
          </div>
          <div>
            <RadioGroupItem value="1rem" id="radius-4" className="sr-only" />
            <Label
              htmlFor="radius-4"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-2 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
            >
              <span className="mb-1 text-xs">{t("customizer.large")}</span>
              <span
                style={{
                  borderRadius: "6px",
                }}
                className="w-10 h-4  bg-primary"
              ></span>
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-medium">{t("customizer.colors")}</h4>
        <div className="grid grid-cols-3 gap-2">
          {themes.map((theme) => (
            <Button
              key={theme.name}
              variant="outline"
              className={`justify-start gap-2 ${
                selectedTheme === theme.name ? "border-primary" : ""
              }`}
              onClick={() => applyTheme(theme.name)}
            >
              <span
                className={`h-4 w-4 rounded-full ${theme.activeColor}`}
              ></span>
              <span className="text-xs">{theme.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

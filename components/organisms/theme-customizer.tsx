"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useLanguage } from "@/contexts/language-provider";
import { useThemeContext } from "@/contexts/theme-provider";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

const themes = [
  {
    name: "Zinc",
    label: "Zinc",
    activeColor: "bg-zinc-500",
  },

  {
    name: "Green",
    label: "Green",
    activeColor: "bg-green-500",
  },
  {
    name: "Blue",
    label: "Blue",
    activeColor: "bg-blue-500",
  },

  {
    name: "Rose",
    label: "Rose",
    activeColor: "bg-rose-500",
  },
  {
    name: "Orange",
    label: "Orange",
    activeColor: "bg-orange-500",
  },
  {
    name: "Yellow",
    label: "Yellow",
    activeColor: "bg-yellow-500",
  },
];

interface Props {
  onHideThemeCustomizer: () => void;
}
const ThemeCustomizer: React.FC<Props> = ({ onHideThemeCustomizer }) => {
  const { t } = useLanguage();

  const { themeColor, setThemeColor, radius, setRadius } = useThemeContext();
  const { theme, setTheme } = useTheme();

  const applyTheme = (themeName: string) => {
    setThemeColor(themeName as ThemeColors);
  };

  const applyRadius = (value: string) => {
    setRadius(value);
  };

  return (
    <div className="absolute top-0 right-0 bottom-0 w-64 border-l border-border bg-muted p-4 overflow-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">{t("customizer.title")}</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={onHideThemeCustomizer}
          className="h-6 w-6 hover:bg-black/50 hover:text-white"
        >
          <span>
            <X />
          </span>
        </Button>
      </div>

      <div className="grid gap-4">
        <div>
          <h4 className="mb-2 text-sm font-medium">{t("customizer.mode")}</h4>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant={theme === "light" ? "default" : "outline"}
              onClick={() => setTheme("light")}
              className={cn(
                "justify-start ",
                themeColor === "Zinc" && "text-white"
              )}
            >
              {t("customizer.light")}
            </Button>
            <Button
              variant={theme === "dark" ? "default" : "outline"}
              onClick={() => setTheme("dark")}
              className={cn(
                "justify-start ",
                themeColor === "Zinc" && "text-black"
              )}
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
                <span className="w-10 h-4 rounded-none bg-primary grid place-content-center">
                  {radius === "0" && (
                    <Check className="size-4 text-secondary" />
                  )}
                </span>
              </Label>
            </div>
            <div>
              <RadioGroupItem
                value="0.5rem"
                id="radius-2"
                className="sr-only"
              />
              <Label
                htmlFor="radius-2"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-2 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
              >
                <span className="mb-1 text-xs">{t("customizer.default")}</span>
                <span
                  style={{
                    borderRadius: "4px",
                  }}
                  className="w-10 h-4 bg-primary grid place-content-center"
                >
                  {radius === "0.5rem" && (
                    <Check className="size-4 text-secondary" />
                  )}
                </span>
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
                  className="w-10 h-4 bg-primary grid place-content-center"
                >
                  {radius === "1rem" && (
                    <Check className="size-4 text-secondary" />
                  )}
                </span>
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <h4 className="mb-2 text-sm font-medium">{t("customizer.colors")}</h4>
          <div className="grid grid-cols-2 gap-2">
            {themes.map((theme) => (
              <Button
                key={theme.name}
                variant="outline"
                className={`justify-start gap-2 ${
                  themeColor === theme.name ? "border-primary" : ""
                }`}
                onClick={() => applyTheme(theme.name)}
              >
                <div className={`h-4 w-4 rounded-full ${theme.activeColor}`} />
                <span className="text-xs">{theme.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ThemeCustomizer;

type ThemeColors = "Zinc" | "Rose" | "Blue" | "Green" | "Orange" | "Yellow";

interface ThemeColorStateParams {
  themeColor: ThemeColors;
  setThemeColor: React.Dispatch<React.SetStateAction<ThemeColors>>;
  radius: string;
  setRadius: React.Dispatch<React.SetStateAction<string>>;
}

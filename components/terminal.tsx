"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import {
  Github,
  Linkedin,
  Send,
  Moon,
  Sun,
  Globe,
  Code,
  Briefcase,
  Award,
  Calendar,
  Clock,
  ImageIcon,
  User,
  FileText,
  Palette,
  Facebook,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import ThemeCustomizer from "@/components/theme-customizer";
import AboutSection from "@/components/sections/about-section";
import BlogSection from "@/components/sections/blog-section";
import ProjectsSection from "@/components/sections/projects-section";
import ExperienceSection from "@/components/sections/experience-section";
import SkillsSection from "@/components/sections/skills-section";
import AchievementsSection from "@/components/sections/achievements-section";
import BirthdayCountdown from "@/components/sections/birthday-countdown";
import LifeProgress from "@/components/sections/life-progress";
import Gallery from "@/components/sections/gallery";

const sections = [
  { id: "about", label: "About", icon: <User className="w-4 h-4 mr-2" /> },
  { id: "blog", label: "Blog", icon: <FileText className="w-4 h-4 mr-2" /> },
  {
    id: "projects",
    label: "Projects",
    icon: <Code className="w-4 h-4 mr-2" />,
  },
  {
    id: "experience",
    label: "Experience",
    icon: <Briefcase className="w-4 h-4 mr-2" />,
  },
  { id: "skills", label: "Skills", icon: <Code className="w-4 h-4 mr-2" /> },
  {
    id: "achievements",
    label: "Achievements",
    icon: <Award className="w-4 h-4 mr-2" />,
  },
  {
    id: "birthday",
    label: "Birthday",
    icon: <Calendar className="w-4 h-4 mr-2" />,
  },
  {
    id: "life-progress",
    label: "Life Progress",
    icon: <Clock className="w-4 h-4 mr-2" />,
  },
  {
    id: "gallery",
    label: "Gallery",
    icon: <ImageIcon className="w-4 h-4 mr-2" />,
  },
];

export default function Terminal() {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [activeTab, setActiveTab] = useState("about");
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showCustomizer, setShowCustomizer] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Focus input on mount and when clicking anywhere in the terminal
    inputRef.current?.focus();

    const handleClick = () => {
      inputRef.current?.focus();
    };

    terminalRef.current?.addEventListener("click", handleClick);

    return () => {
      terminalRef.current?.removeEventListener("click", handleClick);
    };
  }, []);

  const handleCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase();

    // Add to history
    setCommandHistory((prev) => [...prev, command]);
    setHistoryIndex(-1);
    setInput("");

    // Process command
    if (command === "help") {
      alert("who hurt u babi? dun worry i am here to help u💖");
      return;
    } else if (command.startsWith("goto ")) {
      const section = command.split(" ")[1];
      const sectionExists = sections.find((s) => s.id === section);

      if (sectionExists) {
        setActiveTab(section);
      }
    } else if (command === "theme dark") {
      setTheme("dark");
    } else if (command === "theme light") {
      setTheme("light");
    } else if (command === "lang en") {
      setLanguage("en");
    } else if (command === "lang km") {
      setLanguage("km");
    } else if (command === "customize") {
      setShowCustomizer(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Simple tab completion for commands
      if (input.startsWith("goto ")) {
        const partial = input.split(" ")[1];
        const matches = sections.filter((s) => s.id.startsWith(partial));
        if (matches.length === 1) {
          setInput(`goto ${matches[0].id}`);
        }
      }
    }
  };

  return (
    <div
      ref={terminalRef}
      className="w-full max-w-6xl mx-auto rounded-lg border border-border bg-background shadow-lg overflow-hidden flex flex-col h-[90vh]"
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between gap-2 p-2 bg-muted border-b border-border">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-sm font-medium truncate">
          <span className="hidden md:inline">{t("header.title")}— </span>
          {t("header.quote")}
        </div>
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Globe className="h-4 w-4" />
                <span className="sr-only">Toggle language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage("en")}>
                🇺🇸 English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("km")}>
                🇰🇭 ខ្មែរ
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-8 w-8"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowCustomizer(!showCustomizer)}
            className="h-8 w-8"
          >
            <Palette className="h-4 w-4" />
            <span className="sr-only">Customize theme</span>
          </Button>
        </div>
      </div>

      {/* Terminal Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 overflow-auto p-4">
          {/* Header with social links */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">{t("profile.name")}</h1>
            <p className="text-muted-foreground mb-4">{t("profile.title")}</p>

            <div className="flex space-x-2">
              <Button variant="outline" size="icon" asChild>
                <a
                  href="https://github.com/Kimlong168"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a
                  href="https://www.linkedin.com/in/chann-kimlong-267073282/?originalSubdomain=kh"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a
                  href="https://www.facebook.com/phnompenhcrown.fc.7?mibextid=ZbWKwL"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a
                  href="https://t.me/kimlongchann_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Send className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Content Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full "
          >
            <TabsList className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 mb-4 h-full">
              {sections.map((section) => (
                <TabsTrigger
                  key={section.id}
                  value={section.id}
                  className="flex items-center"
                >
                  {section.icon}
                  <span className="hidden md:inline">
                    {t(`sections.${section.id}`)}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="about">
              <AboutSection />
            </TabsContent>

            <TabsContent value="blog">
              <BlogSection />
            </TabsContent>

            <TabsContent value="projects">
              <ProjectsSection />
            </TabsContent>

            <TabsContent value="experience">
              <ExperienceSection />
            </TabsContent>

            <TabsContent value="skills">
              <SkillsSection />
            </TabsContent>

            <TabsContent value="achievements">
              <AchievementsSection />
            </TabsContent>

            <TabsContent value="birthday">
              <BirthdayCountdown />
            </TabsContent>

            <TabsContent value="life-progress">
              <LifeProgress />
            </TabsContent>

            <TabsContent value="gallery">
              <Gallery />
            </TabsContent>
          </Tabs>
        </div>

        {/* Theme Customizer Sidebar */}
        {showCustomizer && (
          <div className="w-64 border-l border-border bg-muted p-4 overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">{t("customizer.title")}</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowCustomizer(false)}
                className="h-6 w-6"
              >
                <span>×</span>
              </Button>
            </div>
            <ThemeCustomizer />
          </div>
        )}
      </div>

      {/* Terminal Input */}
      <div className="border-t border-border p-2 bg-muted">
        <div className="flex items-center">
          <span className="text-primary mr-2">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none hidden md:inline"
            placeholder={t("terminal.placeholder")}
          />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none md:hidden"
            placeholder={t("terminal.placeholder")}
          />
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          {t("terminal.hint")}
        </div>
      </div>
    </div>
  );
}

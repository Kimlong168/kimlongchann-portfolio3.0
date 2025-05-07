"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/contexts/language-provider";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
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
  Star,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ThemeCustomizer from "../organisms/theme-customizer";
import Link from "next/link";
import { CircleDot } from "@/components/atoms/circle-dot";
import { useActiveTab } from "@/contexts/tab-provider";

const sections = [
  { id: "about", label: "About", icon: <User className="w-4 h-4 mr-2" /> },
  { id: "blog", label: "Blog", icon: <FileText className="w-4 h-4 mr-2" /> },
  {
    id: "projects",
    label: "Projects",
    icon: <Star className="w-4 h-4 mr-2" />,
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
    icon: <Award className="w-4 h-4 min-w-4 mr-2" />,
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

interface Props {
  children: React.ReactNode;
  commandType?: string;
}

const TerminalWrapper: React.FC<Props> = (props) => {
  const { children, commandType } = props;
  const router = useRouter();

  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [showCustomizer, setShowCustomizer] = useState(false);
  const { setLanguage, t } = useLanguage();
  const { setTheme } = useTheme();
  const { setActiveTab } = useActiveTab();

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

  const handleCommand = (command: string) => {
    const cmd = command.trim().toLowerCase();

    // Add to history
    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);
    setInput("");

    // Process command
    if (cmd === "help") {
      alert("who hurt u babi? dun worry i am here to help u💖");
      return;
    } else if (cmd === "exit") {
      router.push("/?tab=blog");
    } else if (cmd.startsWith("goto ")) {
      const section = cmd.split(" ")[1];
      const sectionExists = sections.find((s) => s.id === section);

      if (sectionExists) {
        setActiveTab(section);
      }
    } else if (cmd === "dark") {
      setTheme("dark");
    } else if (cmd === "light") {
      setTheme("light");
    } else if (cmd === "en" || cmd === "english") {
      setLanguage("en");
    } else if (cmd === "km" || cmd === "kh" || cmd === "khmer") {
      setLanguage("km");
    } else if (cmd === "customize") {
      setShowCustomizer?.(true);
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
    <div className="flex min-h-screen flex-col items-center justify-between p-4 md:p-8">
      <div
        ref={terminalRef}
        className="w-full max-w-6xl mx-auto rounded-lg border border-border bg-background shadow-lg overflow-hidden flex flex-col h-[90vh]"
      >
        <TerminalHeader
          setShowCustomizer={setShowCustomizer}
          showCustomizer={showCustomizer}
        />

        <div className="flex flex-1 overflow-hidden relative">
          <div
            onClick={() => setShowCustomizer(false)}
            className="flex-1 overflow-auto p-4"
          >
            {children}
          </div>
          {showCustomizer && (
            <ThemeCustomizer
              onHideThemeCustomizer={() => setShowCustomizer(false)}
            />
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
            {commandType === "exit" ? t("terminal.exit") : t("terminal.hint")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalWrapper;

interface HeaderProps {
  setShowCustomizer: (v: boolean) => void;
  showCustomizer: boolean;
}

const TerminalHeader: React.FC<HeaderProps> = (props) => {
  const { setShowCustomizer, showCustomizer } = props;
  const { theme, setTheme } = useTheme();
  const { setLanguage, t } = useLanguage();
  return (
    <div className="flex items-center justify-between gap-2 p-2 bg-muted border-b border-border">
      <Link href="/" className="flex items-center space-x-2">
        <CircleDot bgColor="bg-red-500" />
        <CircleDot bgColor="bg-yellow-500" />
        <CircleDot bgColor="bg-green-500" />
      </Link>
      <div className="text-sm font-medium truncate">
        <span className="hidden md:inline">{t("header.title")} — </span>
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
  );
};

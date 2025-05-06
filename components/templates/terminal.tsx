"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/language-provider";
import { Button } from "@/components/ui/button";
import {
  Github,
  Linkedin,
  Send,
  Code,
  Briefcase,
  Award,
  Calendar,
  Clock,
  ImageIcon,
  User,
  FileText,
  Facebook,
  Star,
} from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import ThemeCustomizer from "@/components/organisms/theme-customizer";
import AboutSection from "@/components/organisms/about-section";
import BlogSection from "@/components/organisms/blog-section";
import ProjectsSection from "@/components/organisms/projects-section";
import ExperienceSection from "@/components/organisms/experience-section";
import SkillsSection from "@/components/organisms/skills-section";
import AchievementsSection from "@/components/organisms/achievements-section";
import BirthdayCountdown from "@/components/organisms/birthday-countdown";
import LifeProgress from "@/components/organisms/life-progress";
import Gallery from "@/components/organisms/gallery";
import { cn } from "@/lib/utils";
import { Article, Gallery as GalleryType, Project, Skill } from "@/types";
import TerminalWrapper from "./terminal-wrapper";
import { useQueryState } from "nuqs";
import Link from "next/link";
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
  articles: Article[];
  projects: Project[];
  experiences: Project[];
  achievements: Project[];
  skills: Skill[];
  galleries: GalleryType[];
}

const Terminal: React.FC<Props> = (props) => {
  const [showCustomizer, setShowCustomizer] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();

    const handleClick = () => {
      inputRef.current?.focus();
    };

    terminalRef.current?.addEventListener("click", handleClick);

    return () => {
      terminalRef.current?.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <TerminalWrapper>
      <div className="flex flex-1 overflow-hidden relative">
        <div
          onClick={() => setShowCustomizer(false)}
          className={cn("flex-1 overflow-auto p-4")}
        >
          <Header />
          <Separator className="my-4" />
          <Content {...props} />
        </div>

        {showCustomizer && (
          <ThemeCustomizer
            onHideThemeCustomizer={() => setShowCustomizer(false)}
          />
        )}
      </div>
    </TerminalWrapper>
  );
};

const Header = () => {
  const { t } = useLanguage();
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold mb-2">{t("profile.name")}</h1>
      <p className="text-muted-foreground mb-4">{t("profile.title")}</p>

      <div className="flex space-x-2">
        <Button variant="outline" size="icon" asChild>
          <Link
            href="https://github.com/Kimlong168"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-4 w-4" />
          </Link>
        </Button>
        <Button variant="outline" size="icon" asChild>
          <Link
            href="https://www.linkedin.com/in/chann-kimlong-267073282/?originalSubdomain=kh"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="h-4 w-4" />
          </Link>
        </Button>
        <Button variant="outline" size="icon" asChild>
          <Link
            href="https://www.facebook.com/phnompenhcrown.fc.7?mibextid=ZbWKwL"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook className="h-4 w-4" />
          </Link>
        </Button>
        <Button variant="outline" size="icon" asChild>
          <Link
            href="https://t.me/kimlongchann_bot"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Send className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

const Content: React.FC<Props> = (props) => {
  const { articles, projects, experiences, achievements, skills, galleries } =
    props;
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useQueryState("tab", {
    defaultValue: "about",
  });
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full ">
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
        <BlogSection articles={articles} />
      </TabsContent>

      <TabsContent value="projects">
        <ProjectsSection projects={projects} />
      </TabsContent>

      <TabsContent value="experience">
        <ExperienceSection experiences={experiences} />
      </TabsContent>

      <TabsContent value="skills">
        <SkillsSection skills={skills} />
      </TabsContent>

      <TabsContent value="achievements">
        <AchievementsSection achievements={achievements} />
      </TabsContent>

      <TabsContent value="birthday">
        <BirthdayCountdown />
      </TabsContent>

      <TabsContent value="life-progress">
        <LifeProgress />
      </TabsContent>

      <TabsContent value="gallery">
        <Gallery galleries={galleries} />
      </TabsContent>
    </Tabs>
  );
};

export default Terminal;

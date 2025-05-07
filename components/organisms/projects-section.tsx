"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-provider";
import { ExternalLink, Github } from "lucide-react";
import { Project } from "@/types";
import { cn } from "@/lib/utils";

// const projects = [
//   {
//     id: 1,
//     title: "Sorakhmer.com",
//     description:
//       "A comapany profile website for sorakhmer located in Battambang province.",
//     techStack: ["React", "Tailwind CSS", "Firebase"],
//     link: "https://sorakhmer.com/",
//     demo: "https://sorakhmer.com/",
//   },
//   {
//     id: 2,
//     title: "3corseco.com",
//     description:
//       "A comapany profile website for 3corseco located in Kompong Thom province.",
//     techStack: ["React", "Laravel", "Mysql"],
//     link: "https://3corseco.com/",
//     demo: "https://3corseco.com/",
//   },
//   {
//     id: 3,
//     title: "POS System",
//     description:
//       "This website consists of some features like authentication, Sale report analysis, Crud products, categories, users, suppliers, QR code and more, Sending emails, Sending daily report vai telegram bot, inventory and stock management, Order management, barcode scanning, ABA Payway integration (sandbox), printing invoices, attendance management, scanning QR code to check in or out, requesting leave, attendance report, exporting report, etc.",
//     techStack: ["React", "Express", "Tailwind CSS", "MongoDB"],
//     link: "https://github.com/Kimlong168/pos_api_mern_stack.git",
//     demo: "https://github.com/Kimlong168/pos_api_mern_stack.git",
//   },
//   {
//     id: 4,
//     title: "ERobot offcial website",
//     description:
//       "We aim to build a website for our organization to perform important tasks and enhance our efforts in educating the Cambodian young generation about innovation and the latest technology for Industry 4.0",
//     techStack: ["React", "Laravel", "Mysql", "Tailwind CSS"],
//     link: "https://erobotkh.org/",
//     demo: "https://erobotkh.org/",
//   },
//   {
//     id: 5,
//     title: "Attendance Checkpoint",
//     description:
//       "The Attendance Checkpoint System is a web-based platform for efficient attendance management, featuring employee check-in/out, leave requests, and client visit logs. It includes an admin dashboard for oversight and integrates with Telegram for real-time notifications. Built using React.js, Node.js, Express, MongoDB, and Tailwind CSS, the system ensures a seamless and scalable solution for attendance tracking and communication.",
//     techStack: ["React", "Express", "Tailwind CSS", "MongoDB"],
//     link: "https://github.com/Kimlong168/CIT_attendance_checkpoint_api.git",
//     demo: "https://github.com/Kimlong168/CIT_attendance_checkpoint_api.git",
//   },
//   {
//     id: 6,
//     title: "Khmer Limon F1 Converter Telegram Bot",
//     description:
//       "Khmer Limon Converter is a simple and efficient tool designed to convert Khmer Unicode text into Limon F1 font encoding. Perfect for designers, editors, and content creators, especially for seamless text conversion when working in CapCut or other software requiring Limon F1 compatibility.",
//     techStack: ["Node.js", "Express.js", "Telegram API"],
//     link: "https://github.com/Kimlong168/khmer_limon_converter_telegram_bot.git",
//     demo: "https://t.me/khmer_unicode_converter_bot",
//   },
//   {
//     id: 7,
//     title: "Text To Speech Telegram Bot",
//     description:
//       "This Telegram bot converts text messages into voice replies using Google Text-to-Speech. Simply send a text, and the bot will respond with an audio message. It supports multiple languages and is powered by Node.js, the Telegram Bot API, and Google TTS.",
//     techStack: ["Node.js", "Express.js", "Telegram API"],
//     link: "https://github.com/Kimlong168/text_to_speech_telegram_bot.git",
//     demo: "https://t.me/kimlong_text_to_speech_bot",
//   },
//   {
//     id: 8,
//     title: "QR Code Maker Telegram Bot",
//     description:
//       "This bot allows you to generate a QR code from any URL you send. Simply share a link, and the bot will create a unique QR code for it. Perfect for quickly sharing links in a scannable format. Use it for websites, social media, or anything you need to share with ease.",
//     techStack: ["Node.js", "Express.js", "Telegram API"],
//     link: "https://github.com/Kimlong168/QR_maker_telegram_bot.git",
//     demo: "https://t.me/kimlong_qr_maker_bot",
//   },
// ];

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  const { t } = useLanguage();
  const [selectedTech, setSelectedTech] = useState<string[]>([]);

  const filteredProjects =
    selectedTech.length > 0
      ? projects.filter((project) =>
          selectedTech.some((tech) => project.tags?.includes(tech))
        )
      : projects;

  const toggleTech = (tech: string) => {
    setSelectedTech((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const allTechStacks = [
    ...new Set(projects.flatMap((project) => project?.tags)),
  ].sort();

  return (
    <div className="grid gap-6">
      <h2 className="text-2xl font-bold">{t("projects.title")}</h2>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="text-sm font-medium mr-2 py-1">
          {t("projects.filterBy")}:
        </span>
        {allTechStacks.map((tech) => (
          <Badge
            key={tech}
            variant={
              selectedTech.includes(tech as string) ? "default" : "outline"
            }
            className={cn(
              "cursor-pointer",
              selectedTech.includes(tech as string) && "text-gray-300"
            )}
            onClick={() => toggleTech(tech as string)}
          >
            {tech}
          </Badge>
        ))}
        {selectedTech.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedTech([])}
            className="text-xs h-7"
          >
            {t("projects.clearFilters")}
          </Button>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="overflow-hidden">
            <CardHeader className="p-4">
              <CardTitle className="line-clamp-1">{project.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags?.map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs ">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between">
              <Button variant="outline" size="sm" className="gap-2" asChild>
                <a
                  href={project.demo_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-3 w-3" />
                  {t("projects.code")}
                </a>
              </Button>
              <Button variant="outline" size="sm" className="gap-2" asChild>
                <a
                  href={project.code_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-3 w-3" />
                  {t("projects.demo")}
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

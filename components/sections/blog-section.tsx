"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";

const blogPosts = [
  {
    id: 1,
    title: "Why Self-love?",
    excerpt:
      "Why self-love? what exactly is self-love? And how to love yourself more?",
    date: "25 October 2023",
    tags: ["Social", "Love", "Motivation"],
  },
  {
    id: 2,
    title: "Me x Bacll",
    excerpt:
      "I felt this way in grade 12. I put so much pressure on myself to achieve an A. If I hadn’t made it, things would have been terrible, because I knew that so many people had high expectations of me.",
    date: "October 4, 2024",
    tags: ["Grade12", "Bacll", "Highschool"],
  },
  {
    id: 3,
    title: "Why AI is important?",
    excerpt:
      "The Importance of Artificial Intelligence: Shaping the Present and Envisioning the Future",
    date: "23 October 2023",
    tags: ["AI", "Technology", "Education"],
  },
];

export default function BlogSection() {
  const { t } = useLanguage();

  return (
    <div className="grid gap-6">
      <h2 className="text-2xl font-bold">{t("blog.title")}</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden">
            <CardHeader className="p-4">
              <CardTitle className="line-clamp-2">{post.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-muted-foreground text-sm mb-4">
                {post.excerpt}
              </p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between">
              <span className="text-xs text-muted-foreground">{post.date}</span>
              <Button variant="link" className="p-0 h-auto">
                {t("blog.readMore")}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex justify-center">
        <Button variant="outline">{t("blog.viewAll")}</Button>
      </div>
    </div>
  );
}

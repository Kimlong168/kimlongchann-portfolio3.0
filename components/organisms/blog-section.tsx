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
import { useLanguage } from "@/contexts/language-provider";
import { formatDate } from "@/utils/format-date";
import { Article } from "@/types";
import Link from "next/link";
interface Props {
  articles: Article[];
}

const BlogSection: React.FC<Props> = ({ articles }) => {
  const { t } = useLanguage();

  return (
    <div className="grid gap-6">
      <h2 className="text-2xl font-bold">{t("blog.title")}</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles?.map((post) => (
          <Card key={post.id} className="overflow-hidden">
            <CardHeader className="p-4">
              <CardTitle className="line-clamp-2">{post.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-muted-foreground text-sm mb-4">
                {post.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {post.tags?.map((tag: string) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between">
              <span className="text-xs text-muted-foreground">
                {formatDate(post.published_date)}
              </span>
              <Link href={`/blogs/${post.slug}`}>
                <Button variant="link" className="p-0 h-auto">
                  {t("blog.readMore")}
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* <div className="flex justify-center">
        <Button variant="outline">{t("blog.viewAll")}</Button>
      </div> */}
    </div>
  );
};

export default BlogSection;

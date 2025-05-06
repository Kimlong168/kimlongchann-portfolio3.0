import { getArticleDetail, getArticles } from "@/api";
import { DataNotFound } from "@/components/molecules/data-not-found";
import { SharingArticle } from "@/components/organisms/sharing-article";
import TerminalWrapper from "@/components/templates/terminal-wrapper";
import { formatDate } from "@/utils/format-date";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { ChevronRight } from "lucide-react";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const { title, description, cover } = await getArticleDetail(slug);

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      type: "website",
      url: `http://kimlongchann.dev/blogs/${slug}`,
      images: [
        {
          url: cover,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [cover],
    },
  };
}

export async function generateStaticParams() {
  const { data } = await getArticles();
  return data.map((x) => ({ slug: x.slug }));
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const article = await getArticleDetail(slug);

  if (!article) {
    return <DataNotFound />;
  }

  return (
    <TerminalWrapper commandType="exit">
      <div className="flex-1 overflow-auto p-4">
        {/* Article metadata */}
        <div className="mb-4">
          <div className="flex">
            <span className="text-terminal-prompt mr-2">
              <ChevronRight className="inline w-4 h-4" />
            </span>
            <span className="text-terminal-command">info</span>
          </div>
          <div className="pl-6 text-terminal-output">
            <p className="mb-1">
              <span className="text-terminal-variable">published: </span>
              {formatDate(article.published_date)}
            </p>
            <p className="mb-1">
              <span className="text-terminal-variable">description: </span>
              {article.description}
            </p>
            <p>
              <span className="text-terminal-variable">tags: </span>
              {article.tags?.map((tag, i) => (
                <span
                  key={i}
                  className="inline-block bg-terminal-tag text-terminal-black px-1 rounded mr-1"
                >
                  {tag}
                </span>
              ))}
            </p>
          </div>
        </div>

        {/* Article content */}
        <div className="mt-6">
          <div className="flex">
            <span className="text-terminal-prompt mr-2">
              <ChevronRight className="inline w-4 h-4" />
            </span>
            <span className="text-terminal-command">less content.md</span>
          </div>
          <div className="pl-6 text-terminal-output mt-2">
            {article.content && <BlocksRenderer content={article.content} />}
          </div>
        </div>

        <SharingArticle
          title={article.title}
          url={`${process.env.NEXT_PUBLIC_CLIENT_URL}/blogs/${slug}`}
        />
      </div>
    </TerminalWrapper>
  );
}

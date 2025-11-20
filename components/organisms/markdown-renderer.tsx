import { marked } from "marked";

export default function MarkdownRenderer({ content }: { content: string }) {
  const html = marked(content);

  return (
    <div dangerouslySetInnerHTML={{ __html: html }} className="markdown" />
  );
}

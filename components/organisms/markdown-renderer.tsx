import { marked } from "marked";

export default function MarkdownRenderer({
  content,
  isHtml,
}: {
  content: string;
  isHtml?: boolean;
}) {
  const html = isHtml ? content : marked(content);

  return (
    <div dangerouslySetInnerHTML={{ __html: html }} className="markdown" />
  );
}

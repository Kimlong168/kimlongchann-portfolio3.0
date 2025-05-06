"use client";
import {
  ChevronsRight,
  Facebook,
  Linkedin,
  Send,
  Share2,
  Twitter,
} from "lucide-react";
import Link from "next/link";

interface Props {
  title: string;
  url: string;
}
export const SharingArticle: React.FC<Props> = ({ title, url }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: decodeURIComponent(title),
          url: decodeURIComponent(url),
        });
        console.log("Shared successfully");
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback - show the social sharing section
      const shareSection = document.getElementById("share-section");
      if (shareSection) {
        shareSection.classList.toggle("hidden");
      }
    }
  };
  return (
    <div className="mt-2">
      <div className="flex">
        <span className="text-terminal-prompt mr-2">
          <ChevronsRight className="inline w-4 h-4" />
        </span>
        <span className="text-terminal-command">share article.md</span>
        <button
          onClick={handleShare}
          className="ml-2 text-terminal-variable hover:text-terminal-green transition-colors"
        >
          <Share2 className="inline w-4 h-4" />
        </button>
      </div>
      <div id="share-section" className="pl-6 text-terminal-output mt-2">
        <p className="mb-2">Share this article via:</p>
        <div className="flex space-x-4">
          {/* Facebook */}
          <Link
            href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:text-terminal-green transition-colors"
            title="Share on Facebook"
          >
            <Facebook className="w-5 h-5 mr-1" />
            <span className="hidden md:block">Facebook</span>
          </Link>

          {/* X (Twitter) */}
          <Link
            href={`https://twitter.com/intent/tweet?text=${title}&url=${url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:text-terminal-green transition-colors"
            title="Share on X (Twitter)"
          >
            <Twitter className="w-5 h-5 mr-1" />
            <span className="hidden md:block">X</span>
          </Link>

          {/* Telegram */}
          <Link
            href={`https://t.me/share/url?url=${url}&text=${title}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:text-terminal-green transition-colors"
            title="Share on Telegram"
          >
            <Send className="w-5 h-5 mr-1" />
            <span className="hidden md:block">Telegram</span>
          </Link>

          {/* LinkedIn */}
          <Link
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:text-terminal-green transition-colors"
            title="Share on LinkedIn"
          >
            <Linkedin className="w-5 h-5 mr-1" />
            <span className="hidden md:block">LinkedIn</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

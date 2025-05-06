"use client";
import {
  ChevronsRight,
  Facebook,
  Linkedin,
  Send,
  Share2,
  Twitter,
} from "lucide-react";
export const SharingArticle = ({ title }: { title: string }) => {
  // Get share URL and title
  const getShareUrl = () => {
    if (typeof window === "undefined") return { url: "", title: "" };
    return {
      url: encodeURIComponent(window.location.href),
      title: encodeURIComponent(title),
    };
  };

  // Handle native sharing if available
  const handleShare = async () => {
    const { url, title } = getShareUrl();

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
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${
              getShareUrl().url
            }`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:text-terminal-green transition-colors"
            title="Share on Facebook"
          >
            <Facebook className="w-5 h-5 mr-1" />
            <span>Facebook</span>
          </a>

          {/* X (Twitter) */}
          <a
            href={`https://twitter.com/intent/tweet?text=${
              getShareUrl().title
            }&url=${getShareUrl().url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:text-terminal-green transition-colors"
            title="Share on X (Twitter)"
          >
            <Twitter className="w-5 h-5 mr-1" />
            <span>X</span>
          </a>

          {/* Telegram */}
          <a
            href={`https://t.me/share/url?url=${getShareUrl().url}&text=${
              getShareUrl().title
            }`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:text-terminal-green transition-colors"
            title="Share on Telegram"
          >
            <Send className="w-5 h-5 mr-1" />
            <span>Telegram</span>
          </a>

          {/* LinkedIn */}
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${
              getShareUrl().url
            }`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:text-terminal-green transition-colors"
            title="Share on LinkedIn"
          >
            <Linkedin className="w-5 h-5 mr-1" />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </div>
  );
};

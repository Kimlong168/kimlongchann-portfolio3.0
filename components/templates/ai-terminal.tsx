"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Bot, UserRound } from "lucide-react";
import { aiContext } from "@/constant/data";
import MarkdownRenderer from "../organisms/markdown-renderer";

interface TerminalMessage {
  sender: "user" | "ai";
  text: string;
}

export default function AITerminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [messages, setMessages] = useState<TerminalMessage[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/chat`;

  useEffect(() => {
    terminalRef.current?.scrollTo({
      top: terminalRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  async function sendMessage(cmd: string) {
    if (!cmd.trim()) return;

    if (cmd.toLowerCase() === "clear") {
      setMessages([]);
      setInput("");
      return;
    }
    if (cmd.toLowerCase() === "help") {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Available commands:\n- help: Show this help message\n- clear: Clear the terminal\n- Any other message will be sent to the AI for a response.",
        },
      ]);
      setInput("");
      return;
    }

    if (cmd.toLowerCase() === "exit") {
      router.push("/");
      return;
    }

    if (cmd.toLowerCase() === "about") {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Kimlong AI Terminal v1.0. Type 'help' for a list of commands.",
        },
      ]);
      setInput("");
      return;
    }

    setMessages((prev) => [...prev, { sender: "user", text: cmd }]);

    setHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);
    setInput("");

    setMessages((prev) => [...prev, { sender: "ai", text: "🤖 Thinking..." }]);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          extraContext: aiContext,
          message: cmd,
        }),
      });

      const data = await res.json();

      setMessages((prev) => {
        const clone = [...prev];
        clone[clone.length - 1] = {
          sender: "ai",
          text: data.response || "⚠️ No response",
        };
        return clone;
      });
    } catch (error) {
      setMessages((prev) => {
        const clone = [...prev];
        clone[clone.length - 1] = {
          sender: "ai",
          text: "❌ Error contacting AI",
        };
        return clone;
      });
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      sendMessage(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const next = historyIndex + 1;
        setHistoryIndex(next);
        setInput(history[history.length - 1 - next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const next = historyIndex - 1;
        setHistoryIndex(next);
        setInput(history[history.length - 1 - next]);
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-4">
      <button
        onClick={() => router.push("/")}
        className="absolute top-4 left-4 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
      >
        ← Back
      </button>

      <a
        href="https://t.me/kimlongchann_bot"
        target="_blank"
        className="fixed bottom-6 right-6 bg-[#2AABEE] text-white px-5 py-3 rounded-full shadow-lg font-semibold 
        hover:scale-110 transition-transform animate-pulse flex gap-2 items-center"
      >
        <Bot /> Telegram Bot
      </a>

      <div className="w-full max-w-6xl rounded-lg border border-border font-mono shadow-xl overflow-hidden flex flex-col h-[80vh]">
        <div className="px-3 py-2 flex items-center space-x-2 bg-[#1a1a1a] border-b">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <div className="w-3 h-3 bg-yellow-500 rounded-full" />
          <div className="w-3 h-3 bg-green-500 rounded-full" />
          <span className="ml-3 text-gray-300 text-sm">
            Kimlong AI Terminal
          </span>
        </div>

        <div
          ref={terminalRef}
          className="flex-1 overflow-auto p-4 space-y-2 text-sm"
        >
          {messages.map((m, i) => (
            <div key={i} className="flex gap-2">
              <span className="text-primary">
                {m.sender === "user" ? (
                  <div className="flex items-center gap-2">
                    <UserRound />:
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Bot />:
                  </div>
                )}
              </span>{" "}
              <span className="text-muted-foreground/50">
                <MarkdownRenderer content={m.text} />
              </span>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="border-t border-gray-700 bg-[#111] p-2">
          <div className="flex items-center text-primary">
            <span className="mr-2">$</span>
            <input
              className="flex-1 bg-transparent outline-none text-primary placeholder-primary"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

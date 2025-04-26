import type React from "react";
import type { Metadata } from "next";
import { Mona_Sans as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { LanguageProvider } from "@/components/language-provider";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import ThemeDataProvider from "@/components/theme-data-provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Kimlong Chann - Full Stack Developer",
  description:
    "Hi there, I am Kimlong Chann, a full stack developer specializing in building modern web applications using React, Node.js, Laravel, and more.",
  keywords: [
    "Kimlong Chann",
    "Full Stack Developer",
    "Web Developer",
    "React Developer",
    "Node.js",
    "Laravel",
    "Portfolio",
    "Software Engineer",
  ],
  authors: [{ name: "Kimlong Chann", url: "https://kimlongchann.dev" }],
  creator: "Kimlong Chann",
  publisher: "Kimlong Chann",
  openGraph: {
    title: "Kimlong Chann - Full Stack Developer",
    description:
      "Hi there, I am Kimlong Chann, a full stack developer specializing in building modern web applications using React, Node.js, Laravel, and more.",
    url: "https://kimlongchann.dev",
    siteName: "Kimlong Chann",
    type: "website",
    images: [
      {
        url: "https://kimlongchann.dev/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kimlong Chann - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kimlong Chann - Full Stack Developer",
    description:
      "Hi there, I am Kimlong Chann, a full stack developer specializing in building modern web applications using React, Node.js, Laravel, and more.",
    images: ["https://kimlongchann.dev/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-mono antialiased",
          fontSans.variable
        )}
      >
        <NextThemesProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeDataProvider>
            <LanguageProvider>{children}</LanguageProvider>
          </ThemeDataProvider>
        </NextThemesProvider>
      </body>
    </html>
  );
}

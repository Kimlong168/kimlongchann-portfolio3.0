import type React from "react";
import type { Metadata } from "next";
import { Mona_Sans as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { LanguageProvider } from "@/contexts/language-provider";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import ThemeDataProvider from "@/contexts/theme-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";
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
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/meta/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/meta/favicon.svg" />
        <link rel="shortcut icon" href="/meta/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/meta/apple-touch-icon.png"
        />
        <link rel="manifest" href="/meta/site.webmanifest" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-mono antialiased",
          fontSans.variable
        )}
      >
        <NuqsAdapter>
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
        </NuqsAdapter>
      </body>
    </html>
  );
}

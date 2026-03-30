import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "James Horrigan | Full Stack Software Engineer",
  description:
    "Professional profile for James Horrigan: full stack software engineer specialising in Python, AWS serverless, React, and AI-enabled product development.",
  openGraph: {
    title: "James Horrigan | Full Stack Software Engineer",
    description:
      "Professional profile for James Horrigan: full stack software engineer specialising in Python, AWS serverless, React, and AI-enabled product development.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "James Horrigan | Full Stack Software Engineer",
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
        <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('theme');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}` }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

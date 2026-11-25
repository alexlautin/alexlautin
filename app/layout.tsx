import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Footer from '@/components/Footer';
import ScrollManager from '@/components/ScrollManager';

const inter = Inter({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-inter",
  display: "swap",
});

// Reads the positions ScrollManager saves; must match its sessionStorage key
const restoreScroll = `(function(){try{
var n=performance.getEntriesByType('navigation')[0];
if(!n||(n.type!=='reload'&&n.type!=='back_forward')||location.hash)return;
var y=JSON.parse(sessionStorage.getItem('scroll-positions')||'{}')[location.pathname];
if(!y)return;
var s=document.documentElement.style;s.scrollBehavior='auto';
window.scrollTo(0,y);s.scrollBehavior='';
}catch(e){}})()`;

// Cookieless analytics (Umami); only loads when a website ID is configured
const UMAMI_WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

const description = "Alex Lautin is a computer science and economics student at Emory University. Projects, research, and contact details.";

export const metadata: Metadata = {
  metadataBase: new URL("https://alexlautin.com"),
  title: "Alex Lautin | CS and Economics at Emory",
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Alex Lautin",
    description,
    url: "/",
    siteName: "Alex Lautin",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Alex Lautin" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Lautin",
    description,
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} data-scroll-behavior="smooth">
      <head>

        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg?v=6" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#FFFFFF" />
      </head>
      <body className="antialiased bg-paper text-ink">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-ink focus:text-paper focus:rounded-md focus:font-medium transition-all">
          Skip to main content
        </a>
        <ScrollManager />
        {children}
        <Footer />
        {/* Safari draws a reloaded page at the top (the photo) before the app's JavaScript
            can scroll it back down. This runs as soon as the page's HTML is in, before the
            first paint, and puts a reload or Back/Forward visit where it was left. */}
        <script dangerouslySetInnerHTML={{ __html: restoreScroll }} />
        <Analytics />
        {UMAMI_WEBSITE_ID && (
          <Script
            src="https://cloud.umami.is/script.js"
            data-website-id={UMAMI_WEBSITE_ID}
            data-domains="alexlautin.com,www.alexlautin.com"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Versaile - Your Dynamic Web Solution",
  description: "A versatile and modern web application built with Next.js, offering seamless performance and user experience.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-16x16.png",
  },
  keywords: "Next.js, web app, versatile, modern, performance",
  authors: [{ name: "Sparsh Shandilya", url: "https://versaile.vercel.app" }],
  openGraph: {
    title: "Versaile - Your Dynamic Web Solution",
    description: "Explore a powerful web app built with Next.js for a versatile digital experience.",
    url: "https://versaile.vercel.app",
    siteName: "Versaile",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Versaile Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  }
};

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
      <ClerkProvider>
        <html lang="en">
        <head />
        <body className={inter.className}>
        <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-K2CYP6RLMZ"
            strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-K2CYP6RLMZ');
            `}
        </Script>

        {children}
        </body>
        </html>
      </ClerkProvider>
  );
}

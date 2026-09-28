import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/data/site-config";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-bodoni",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#F5F4ED",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://gauravmore.photography"),
  title: `${siteConfig.brandName} | Capturing Your Best Moments`,
  description:
    "Professional photography portfolio for Gaurav More Photography. Editorial wedding stories, timeless portraits, and candid celebrations.",
  keywords: [
    "Gaurav More Photography",
    "Shirpur Photographer",
    "Wedding Photography",
    "Portrait Photography",
    "Shirpur Photographer Association",
    "Editorial Photography",
  ],
  authors: [{ name: siteConfig.founder.name }],
  creator: siteConfig.brandName,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://gauravmore.photography",
    siteName: siteConfig.brandName,
    title: `${siteConfig.brandName} | Capturing Your Best Moments`,
    description:
      "Stories worth remembering, captured beautifully. Minimalist editorial photography studio.",
    images: [
      {
        url: "/images/gallery/photo-01.webp",
        width: 1200,
        height: 800,
        alt: siteConfig.brandName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.brandName} | Capturing Your Best Moments`,
    description: siteConfig.heroSubheadline,
    images: ["/images/gallery/photo-01.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-[#F5F4ED] text-[#1F281E] selection:bg-[#3E4A3B] selection:text-[#F5F4ED]">
        {children}
      </body>
    </html>
  );
}

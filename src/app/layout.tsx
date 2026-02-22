import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Johny Dev | Web Expert, Bug Fixer & Digital Specialist",
  description: "Professional web developer specializing in website recovery, Shopify e-commerce, Meta integrations, SEO/AEO/GEO/SGE optimization, and Japanese keyword hack removal. 20+ successful projects delivered.",
  keywords: "web developer, bug fixer, Shopify expert, Meta pixel, SEO, AEO, GEO, SGE, hacked website recovery, Japanese keyword hack, e-commerce",
  authors: [{ name: "Johny Dev" }],
  openGraph: {
    title: "Johny Dev | Web Expert & Digital Specialist",
    description: "Expert web development, security recovery, and cutting-edge SEO services.",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

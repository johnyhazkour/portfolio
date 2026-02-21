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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

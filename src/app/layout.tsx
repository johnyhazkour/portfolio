import type { Metadata } from "next";
import Script from "next/script";
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
  icons: {
    icon: "/favicon.png?v=1",
    shortcut: "/favicon.png?v=1",
    apple: "/favicon.png?v=1",
  },
  verification: {
    other: {
      "facebook-domain-verification": ["pfsnc86p8gjedi2a2zjfsf1b5e508v"],
    },
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
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TRSXM3SK');
          `}
        </Script>
        {/* End Google Tag Manager */}
        {/* Meta Pixel Code */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '942145545011501');
            fbq('track', 'PageView');
          `}
        </Script>
        {/* End Meta Pixel Code */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TRSXM3SK"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {/* Meta Pixel Code (noscript) */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=942145545011501&ev=PageView&noscript=1"
          />
        </noscript>
        {/* End Meta Pixel Code (noscript) */}
        {children}
      </body>
    </html>
  );
}

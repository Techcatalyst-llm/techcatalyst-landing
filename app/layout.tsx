import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const rubik = Rubik({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://techcatalyst.ru'),
  title: "Tech Catalyst - Unified API for 100+ AI Models",
  description: "ChatGPT, Claude, Gemini, Grok and hundreds of other AI models in one API. Pay in rubles. Works without VPN. Single API key, single endpoint.",
  keywords: "AI API, ChatGPT API, Claude API, Gemini API, AI models, unified API, OpenAI alternative, AI aggregation, pay as you go, Russian AI API",
  openGraph: {
    title: "Tech Catalyst - Unified API for 100+ AI Models",
    description: "ChatGPT, Claude, Gemini, Grok and hundreds of other AI models in one API. Pay in rubles. Works without VPN.",
    type: "website",
    url: "https://techcatalyst.ru",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tech Catalyst - Unified API Platform for AI Models",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Catalyst - Unified API for 100+ AI Models",
    description: "ChatGPT, Claude, Gemini, Grok and hundreds of other AI models in one API",
    images: ["/og-image.png"],
  },
};

const YM_ID = process.env.NEXT_PUBLIC_YM_ID || "102447006";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className={`${rubik.className} antialiased`}>
        {children}
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(${YM_ID}, "init", {
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true,
              webvisor:true
            });
          `}
        </Script>
        <noscript>
          <div>
            <img
              src={`https://mc.yandex.ru/watch/${YM_ID}`}
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
      </body>
    </html>
  );
}

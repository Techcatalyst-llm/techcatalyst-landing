import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const rubik = Rubik({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rubik",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://techcatalyst.ru'),
  title: "ТехКаталист — единый API для ИИ-моделей и корпоративной закупки",
  description: "ChatGPT, Claude, Gemini, Grok и другие ИИ-модели в одном API. Маршрутизация, биллинг в рублях, доступ для команд и корпоративная закупка.",
  keywords: "AI API, ChatGPT API, Claude API, Gemini API, unified API, LLM gateway, AI models, ТехКаталист, корпоративная закупка ПО",
  openGraph: {
    title: "ТехКаталист — единый API для ИИ-моделей и корпоративной закупки",
    description: "ChatGPT, Claude, Gemini, Grok и другие ИИ-модели в одном API. Маршрутизация, биллинг и доступ для команд.",
    type: "website",
    url: "https://techcatalyst.ru",
    locale: "ru_RU",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "ТехКаталист — единый API для ИИ-моделей",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ТехКаталист — единый API для ИИ-моделей и корпоративной закупки",
    description: "ChatGPT, Claude, Gemini, Grok и другие ИИ-модели в одном API",
    images: ["/opengraph-image"],
  },
};

const YM_ID = process.env.NEXT_PUBLIC_YM_ID || "102447006";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${rubik.variable} scroll-smooth`}>
      <body className="font-sans antialiased">
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

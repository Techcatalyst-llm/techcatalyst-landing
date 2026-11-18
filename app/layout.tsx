import type { Metadata } from "next";
import Script from "next/script";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-jbmono",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://techcatalyst.ru'),
  title: "TechCatalyst — зарубежное ПО, ИИ, Guard и корпоративный VPN",
  description: "Поставка зарубежного ПО, корпоративный ИИ и интеграция, безопасное рабочее место разработчика TechCatalyst Guard и управляемая VPN-инфраструктура.",
  keywords: "TechCatalyst, поставка зарубежного ПО, интеграция ИИ, корпоративный ИИ, безопасное рабочее место разработчика, TechCatalyst Guard, корпоративный VPN",
  openGraph: {
    title: "TechCatalyst — зарубежное ПО, ИИ, Guard и корпоративный VPN",
    description: "Единая продуктовая линейка для корпоративного доступа, внедрения и безопасности.",
    type: "website",
    url: "https://techcatalyst.ru",
    locale: "ru_RU",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "TechCatalyst — корпоративные технологические решения",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TechCatalyst — зарубежное ПО, ИИ, Guard и корпоративный VPN",
    description: "Корпоративные технологии, поставка и интеграция под ключ",
    images: ["/opengraph-image"],
  },
};

const YM_ID = "111010243";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`scroll-smooth ${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="describedby" href="/llms.txt" />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${YM_ID}', 'ym');

            ym(${YM_ID}, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
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

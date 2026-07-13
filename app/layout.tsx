import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

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

const YM_ID = process.env.NEXT_PUBLIC_YM_ID || "102447006";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="scroll-smooth">
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

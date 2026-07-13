import Link from 'next/link';

const products = [
  { href: '/zakupka-zarubezhnogo-po', label: 'Зарубежное ПО' },
  { href: '/postavka-i-integraciya-ai', label: 'ИИ и интеграция' },
  { href: '/techcatalyst-vpn', label: 'TechCatalyst VPN' },
];

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#e4e8f4] bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex min-h-[68px] max-w-[1180px] items-center gap-7 px-5 sm:px-7 lg:px-8 max-sm:min-h-[60px]">
        <Link href="/" className="flex shrink-0 items-center gap-2 text-[18px] font-bold tracking-[-0.01em] text-[#0d1326]">
          <span className="text-[#2b46f0]">▲</span>
          <span>TechCatalyst</span>
        </Link>

        <nav className="ml-auto hidden items-center gap-5 lg:flex">
          <Link href="/#products" className="text-[14px] font-medium text-[#565e78] transition-colors hover:text-[#2b46f0]">
            Продукты
          </Link>
          {products.map((item) => (
            <Link key={item.href} href={item.href} className="text-[14px] font-medium text-[#565e78] transition-colors hover:text-[#2b46f0]">
              {item.label}
            </Link>
          ))}
          <a
            href={process.env.NEXT_PUBLIC_GUARD_URL || 'https://guard.techcatalyst.ru'}
            className="text-[14px] font-medium text-[#565e78] transition-colors hover:text-[#2b46f0]"
          >
            Guard
          </a>
          <a href="https://docs.techcatalyst.ru" className="text-[14px] font-medium text-[#565e78] transition-colors hover:text-[#2b46f0]">
            Документация
          </a>
        </nav>

        <a
          href="#contact"
          className="ml-auto inline-flex shrink-0 items-center justify-center rounded-[10px] border border-[#2b46f0] bg-[#2b46f0] px-5 py-2.5 text-[14px] font-semibold text-white transition hover:-translate-y-px hover:bg-[#1c33d4] lg:ml-0"
        >
          Обсудить задачу
        </a>
      </div>
    </header>
  );
}

export function MarketingFooter({ note = 'Корпоративные технологии, поставка и интеграция под ключ.' }: { note?: string }) {
  return (
    <footer className="border-t border-[#e4e8f4] bg-[#f6f8fc] py-12 text-[14px]">
      <div className="mx-auto grid max-w-[1180px] gap-10 px-5 sm:px-7 lg:grid-cols-[1.1fr_.9fr] lg:px-8">
        <div>
          <div className="text-[15px] font-semibold text-[#0d1326]">TechCatalyst</div>
          <p className="mt-3 max-w-[520px] leading-[1.55] text-[#565e78]">{note}</p>
          <p className="mt-3 text-[#8d93ab]">
            ИП Борисов Иван Анатольевич · ИНН 575307745402 · ОГРНИП 320574900010615
          </p>
        </div>

        <div className="grid gap-2 lg:justify-end">
          <a href="mailto:info@2rm.ru" className="text-[#565e78] transition-colors hover:text-[#2b46f0]">
            info@2rm.ru
          </a>
          <a href="https://t.me/pillardev" target="_blank" rel="noreferrer" className="text-[#565e78] transition-colors hover:text-[#2b46f0]">
            Telegram
          </a>
          <Link href="/privacy" className="text-[#565e78] transition-colors hover:text-[#2b46f0]">
            Политика конфиденциальности
          </Link>
          <Link href="/cookie" className="text-[#565e78] transition-colors hover:text-[#2b46f0]">
            Политика cookie
          </Link>
          <span className="text-[#8d93ab]">© 2026 ТехКаталист</span>
        </div>
      </div>
    </footer>
  );
}

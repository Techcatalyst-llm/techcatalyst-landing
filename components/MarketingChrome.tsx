import Link from 'next/link';

const products = [
  { href: '/zakupka-zarubezhnogo-po', label: 'Зарубежное ПО' },
  { href: '/postavka-i-integraciya-ai', label: 'AI и интеграция' },
  { href: '/techcatalyst-vpn', label: 'TechCatalyst VPN' },
];

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#edf0f7] bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex min-h-[68px] max-w-[1180px] items-center gap-7 px-5 sm:px-7 lg:px-8 max-sm:min-h-[60px]">
        <Link href="/" className="flex shrink-0 items-center gap-2 text-[18px] font-bold tracking-[-0.01em] text-[#222]">
          <span className="text-[#1837da]">▲</span>
          <span>TechCatalyst</span>
        </Link>

        <nav className="ml-auto hidden items-center gap-5 lg:flex">
          <Link href="/#products" className="text-[14px] font-medium text-[#63666a] transition-colors hover:text-[#1837da]">
            Продукты
          </Link>
          {products.map((item) => (
            <Link key={item.href} href={item.href} className="text-[14px] font-medium text-[#63666a] transition-colors hover:text-[#1837da]">
              {item.label}
            </Link>
          ))}
          <a
            href={process.env.NEXT_PUBLIC_GUARD_URL || 'https://guard.techcatalyst.ru'}
            className="text-[14px] font-medium text-[#63666a] transition-colors hover:text-[#1837da]"
          >
            Guard
          </a>
          <a href="https://docs.techcatalyst.ru" className="text-[14px] font-medium text-[#63666a] transition-colors hover:text-[#1837da]">
            Документация
          </a>
        </nav>

        <a
          href="#contact"
          className="ml-auto inline-flex shrink-0 items-center justify-center rounded-full border border-[#1837da] bg-[#1837da] px-5 py-2.5 text-[14px] font-semibold text-white transition hover:-translate-y-px hover:bg-[#0046f9] lg:ml-0"
        >
          Обсудить задачу
        </a>
      </div>
    </header>
  );
}

export function MarketingFooter({ note = 'Корпоративные технологии, поставка и интеграция под ключ.' }: { note?: string }) {
  return (
    <footer className="border-t border-[#edf0f7] bg-[#f9fafc] py-12 text-[14px]">
      <div className="mx-auto grid max-w-[1180px] gap-10 px-5 sm:px-7 lg:grid-cols-[1.1fr_.9fr] lg:px-8">
        <div>
          <div className="text-[15px] font-semibold text-[#222]">TechCatalyst</div>
          <p className="mt-3 max-w-[520px] leading-[1.55] text-[#63666a]">{note}</p>
          <p className="mt-3 text-[#979797]">
            ИП Борисов Иван Анатольевич · ИНН 575307745402 · ОГРНИП 320574900010615
          </p>
        </div>

        <div className="grid gap-2 lg:justify-end">
          <a href="mailto:info@2rm.ru" className="text-[#63666a] transition-colors hover:text-[#1837da]">
            info@2rm.ru
          </a>
          <a href="https://t.me/pillardev" target="_blank" rel="noreferrer" className="text-[#63666a] transition-colors hover:text-[#1837da]">
            Telegram
          </a>
          <Link href="/privacy" className="text-[#63666a] transition-colors hover:text-[#1837da]">
            Политика конфиденциальности
          </Link>
          <Link href="/cookie" className="text-[#63666a] transition-colors hover:text-[#1837da]">
            Политика cookie
          </Link>
          <span className="text-[#979797]">© 2026 ТехКаталист</span>
        </div>
      </div>
    </footer>
  );
}

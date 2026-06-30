'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Inter, Lora } from 'next/font/google';
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  ChevronRight,
  Code2,
  CreditCard,
  Globe,
  Menu,
  Network,
  ShieldCheck,
  Wallet,
  X,
} from 'lucide-react';

import {
  trackCTAClick,
  trackMobileMenuToggle,
  trackPlatformView,
  trackPricingSelect,
} from '@/lib/analytics';
import ApplicationModal from '@/components/Modal/ApplicationModal';

type Language = 'en' | 'ru';
type ModelTab = 'all' | 'text' | 'multimodal' | 'image';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500'],
  display: 'swap',
});

const navItems = [
  { href: '#platform', key: 'platform' },
  { href: '#models', key: 'models' },
  { href: '#commercial', key: 'commercial' },
  { href: '/zakupka-zarubezhnogo-po', key: 'procurement' },
] as const;

const translations = {
  en: {
    brand: 'Tech Catalyst',
    nav: {
      platform: 'Platform',
      models: 'Models',
      commercial: 'Commercial',
      procurement: 'Software procurement',
      docs: 'Documentation',
      start: 'Start free',
      language: 'RU',
    },
    hero: {
      kicker: 'Unified AI access layer',
      title: 'One API for frontier models.',
      lead:
        'OpenAI-compatible routing, billing and team controls for ChatGPT, Claude, Gemini, Grok and other providers.',
      primary: 'Create free account',
      secondary: 'Open documentation',
      frameTitle: 'Gateway overview',
      frameTag: 'OpenAI-compatible',
      frameCards: [
        ['Routing', 'OpenAI, Anthropic, Google, xAI, DeepSeek'],
        ['Billing', 'Rubles, invoices, shared team billing'],
        ['Use cases', 'Production, pilots, internal AI platforms'],
      ],
      bullets: ['Single endpoint', 'Provider failover', 'Ruble billing'],
    },
    stats: [
      ['100+', 'AI models'],
      ['12+', 'Providers'],
      ['1 day', 'Launch cycle'],
      ['B2B', 'Commercial workflows'],
    ],
    platform: {
      kicker: 'Platform',
      title: 'A compact control layer between your product and model vendors.',
      cards: [
        ['Unified API', 'One key and one endpoint across providers.', <Code2 className="h-4 w-4" />],
        ['Routing and failover', 'Switch providers without changing product code.', <Network className="h-4 w-4" />],
        ['Team controls', 'Limits, access, keys and billing in one place.', <ShieldCheck className="h-4 w-4" />],
      ],
    },
    workflow: {
      kicker: 'How it works',
      title: 'Keep your SDK. Replace the provider edge.',
      points: [
        'Point existing OpenAI SDK flows to Tech Catalyst.',
        'Route by model parameter instead of rebuilding integrations.',
        'Add billing and procurement workflows when teams scale.',
      ],
      sideTitle: 'Commercial fit',
      sideText: 'Works for individual usage and invoice-based corporate access.',
    },
    models: {
      kicker: 'Models',
      title: 'Route across text, multimodal and image models.',
      tabs: { all: 'All', text: 'Text', multimodal: 'Multimodal', image: 'Image' },
      suffix: 'public API rate',
    },
    commercial: {
      kicker: 'Commercial',
      title: 'Commercial access for individuals and legal entities.',
      cards: [
        {
          title: 'For individuals',
          items: ['Flexible top-up', 'Pay-as-you-go', 'Fast evaluation'],
          cta: 'Request current price list',
          action: 'personal',
        },
        {
          title: 'For legal entities',
          items: ['Invoices and contract', 'Closing documents', 'Team billing and procurement support'],
          cta: 'Talk to sales',
          action: 'enterprise',
        },
      ],
      procurementTitle: 'Need corporate software procurement?',
      procurementText: 'We also support procurement and renewal of foreign software licenses for legal entities.',
      procurementButton: 'Open procurement page',
    },
    proof: {
      kicker: 'Who it fits',
      title: 'Built for product teams, internal AI platforms and corporate procurement.',
      quotes: [
        ['The provider layer stopped being a roadmap problem.', 'CTO, B2B SaaS'],
        ['Finance and procurement finally had a model they could work with.', 'Operations lead'],
        ['We got one controllable entry point for multiple models.', 'CIO, fintech team'],
      ],
    },
    cta: {
      kicker: 'Launch',
      title: 'Need a working route, not another model catalog?',
      lead: 'Launch with one API key. Add routing, billing and procurement support on the same platform.',
      primary: 'Create free account',
      secondary: 'Request current price list',
    },
    footer: {
      note: 'Unified API for frontier AI models',
      rights: '© 2026 Tech Catalyst. All rights reserved.',
    },
  },
  ru: {
    brand: 'ТехКаталист',
    nav: {
      platform: 'Платформа',
      models: 'Модели',
      commercial: 'Для бизнеса',
      procurement: 'Закупка ПО',
      docs: 'Документация',
      start: 'Начать бесплатно',
      language: 'EN',
    },
    hero: {
      kicker: 'Единый слой доступа к ИИ-моделям',
      title: 'Один API для ведущих ИИ-моделей.',
      lead:
        'OpenAI-совместимый шлюз для ChatGPT, Claude, Gemini, Grok и других провайдеров. Маршрутизация, биллинг и командный доступ в одной точке.',
      primary: 'Создать бесплатный аккаунт',
      secondary: 'Открыть документацию',
      frameTitle: 'Как выглядит контур',
      frameTag: 'Совместимо с OpenAI',
      frameCards: [
        ['Маршрутизация', 'OpenAI, Anthropic, Google, xAI, DeepSeek'],
        ['Расчёты', 'Рубли, счёт, командный биллинг'],
        ['Сценарии', 'Прод, пилоты, внутренние ИИ-платформы'],
      ],
      bullets: ['Единая точка доступа', 'Резервное переключение между провайдерами', 'Оплата в рублях'],
    },
    stats: [
      ['100+', 'ИИ-моделей'],
      ['12+', 'Провайдеров'],
      ['1 день', 'Стартовый цикл'],
      ['Счёт', 'Корпоративный доступ'],
    ],
    platform: {
      kicker: 'Платформа',
      title: 'Компактный управляющий слой между вашим продуктом и поставщиками моделей.',
      cards: [
        ['Единый API', 'Один ключ и одна точка подключения для разных провайдеров.', <Code2 className="h-4 w-4" />],
        ['Маршрутизация и резервирование', 'Меняйте провайдера без переписывания продуктового кода.', <Network className="h-4 w-4" />],
        ['Управление командой', 'Лимиты, доступ, ключи и биллинг в одном месте.', <ShieldCheck className="h-4 w-4" />],
      ],
    },
    workflow: {
      kicker: 'Как это работает',
      title: 'Сохраняете SDK. Меняете только слой подключения.',
      points: [
        'Направьте существующие сценарии OpenAI SDK в ТехКаталист.',
        'Переключайте модели параметром вместо новых интеграций.',
        'Добавляйте биллинг и закупку по мере роста команды.',
      ],
      sideTitle: 'Формат работы',
      sideText: 'Подходит и для личного использования, и для корпоративного доступа по счёту.',
    },
    models: {
      kicker: 'Модели',
      title: 'Маршрутизация между текстовыми, мультимодальными и моделями изображений.',
      tabs: { all: 'Все', text: 'Текст', multimodal: 'Мультимодальные', image: 'Изображения' },
      suffix: 'тариф публичного API',
    },
    commercial: {
      kicker: 'Доступ',
      title: 'Доступ для частных пользователей и юридических лиц.',
      cards: [
        {
          title: 'Для физических лиц',
          items: ['Гибкое пополнение', 'Оплата по факту использования', 'Быстрая проверка сценариев'],
          cta: 'Запросить актуальный прайс',
          action: 'personal',
        },
        {
          title: 'Для юридических лиц',
          items: ['Оплата по счёту и договору', 'Закрывающие документы', 'Командный биллинг и поддержка закупки'],
          cta: 'Связаться с продажами',
          action: 'enterprise',
        },
      ],
      procurementTitle: 'Нужна закупка зарубежного ПО?',
      procurementText: 'Отдельно поддерживаем закупку и продление иностранных лицензий для юридических лиц.',
      procurementButton: 'Открыть раздел закупки',
    },
    proof: {
      kicker: 'Кому подходит',
      title: 'Подходит продуктовым командам, внутренним ИИ-платформам и корпоративной закупке.',
      quotes: [
        ['Провайдерный слой перестал быть отдельной задачей в плане разработки.', 'Технический директор продуктовой компании'],
        ['Финансы и закупка получили понятную коммерческую модель.', 'Руководитель операций'],
        ['Появилась одна управляемая точка входа в несколько моделей.', 'ИТ-директор финтех-компании'],
      ],
    },
    cta: {
      kicker: 'Старт',
      title: 'Нужен рабочий маршрут, а не ещё один каталог моделей?',
      lead: 'Запускайтесь с одним API-ключом и добавляйте маршрутизацию, биллинг и закупку в одной платформе.',
      primary: 'Создать бесплатный аккаунт',
      secondary: 'Запросить актуальный прайс',
    },
    footer: {
      note: 'Единый API для ведущих ИИ-моделей',
      rights: '© 2026 ТехКаталист. Все права защищены.',
    },
  },
} as const;

const models = [
  { name: 'GPT-5.5', type: 'text' as const, provider: 'OpenAI', price: '$5.00 / $30.00' },
  { name: 'Claude 4 Sonnet', type: 'text' as const, provider: 'Anthropic', price: '$3.00 / $15.00' },
  { name: 'Gemini 2.5 Pro', type: 'multimodal' as const, provider: 'Google', price: '$1.25 / $10.00*' },
  { name: 'Grok 4.3', type: 'text' as const, provider: 'xAI', price: '$1.25 / $2.50' },
  { name: 'DeepSeek V4 Flash', type: 'text' as const, provider: 'DeepSeek', price: '$0.14 / $0.28' },
  { name: 'GPT-Image-2', type: 'image' as const, provider: 'OpenAI', price: '$5.00 / $30.00' },
  { name: 'Claude 4 Opus', type: 'multimodal' as const, provider: 'Anthropic', price: '$15.00 / $75.00' },
  { name: 'Gemini 2.5 Flash Image', type: 'image' as const, provider: 'Google', price: '$0.30 / $0.039 img' },
];

const codeSample = `from openai import OpenAI

client = OpenAI(
  api_key="tc_live_xxx",
  base_url="https://techcatalyst.ru/api/v1",
)

response = client.chat.completions.create(
  model="anthropic/claude-sonnet-4",
  messages=[{"role": "user", "content": "Summarize this task"}],
)`;

function Wrap({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-10 ${className}`}>{children}</div>;
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-[8px] border border-[#e4e7ec] bg-white ${className}`}
      style={{
        boxShadow: 'rgba(28, 40, 64, 0.1) 0px 2px 3px -2px, rgba(28, 40, 64, 0.04) 0px 4px 6px -2px',
      }}
    >
      {children}
    </div>
  );
}

function PrimaryButton({
  children,
  onClick,
  className = '',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-[10px] border border-[#1c1d1f] bg-[#1c1d1f] px-3 py-2 text-[14px] font-medium text-white transition-colors hover:bg-black ${className}`}
    >
      {children}
    </button>
  );
}

function SecondaryButton({
  children,
  onClick,
  className = '',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-[10px] border border-[#d3d8df] bg-white px-3 py-2 text-[14px] font-medium text-[#1c1d1f] transition-colors hover:bg-[#f3f4f6] ${className}`}
    >
      {children}
    </button>
  );
}

export default function TechCatalystLanding() {
  const [language, setLanguage] = useState<Language>('ru');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ModelTab>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState('unknown');

  useEffect(() => {
    const savedLang = localStorage.getItem('techcatalyst_lang') as Language | null;
    if (savedLang === 'en' || savedLang === 'ru') {
      setLanguage(savedLang);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('techcatalyst_lang', language);
  }, [language]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const t = translations[language];
  const filteredModels = activeTab === 'all' ? models : models.filter((model) => model.type === activeTab);

  const handleCTAClick = (source: string) => {
    trackCTAClick(source);
    setModalSource(source);
    setIsModalOpen(true);
  };

  const handlePricingClick = (planName: string) => {
    trackPricingSelect(planName);
    setModalSource(`pricing_${planName.toLowerCase()}`);
    setIsModalOpen(true);
  };

  const handleTabChange = (tab: ModelTab) => {
    setActiveTab(tab);
    trackPlatformView(tab);
  };

  const handleMenuToggle = () => {
    const nextState = !isMenuOpen;
    setIsMenuOpen(nextState);
    trackMobileMenuToggle(nextState);
  };

  return (
    <div className={`${inter.className} bg-white text-[#1c1d1f]`} style={{ fontFeatureSettings: '"ss03"' }}>
      <header className="sticky top-0 z-50 border-b border-[#e4e7ec] bg-white/92 backdrop-blur-md">
        <Wrap className="flex min-h-[72px] items-center gap-6">
          <Link href="/" className="text-[16px] font-semibold tracking-[-0.01em] text-[#1c1d1f]">
            {t.brand}
          </Link>

          <nav className="ml-auto hidden items-center gap-2 md:flex">
            {navItems.map((item) =>
              item.href.startsWith('/') ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-[10px] px-[10px] py-[6px] text-[14px] font-medium text-[#6f7988] transition-colors hover:bg-[#f3f4f6] hover:text-[#1c1d1f]"
                >
                  {t.nav[item.key]}
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-[10px] px-[10px] py-[6px] text-[14px] font-medium text-[#6f7988] transition-colors hover:bg-[#f3f4f6] hover:text-[#1c1d1f]"
                >
                  {t.nav[item.key]}
                </a>
              ),
            )}
            <a
              href="https://docs.techcatalyst.ru"
              className="rounded-[10px] px-[10px] py-[6px] text-[14px] font-medium text-[#6f7988] transition-colors hover:bg-[#f3f4f6] hover:text-[#1c1d1f]"
            >
              {t.nav.docs}
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setLanguage(language === 'ru' ? 'en' : 'ru')}
            className="hidden rounded-[10px] border border-[#d3d8df] px-3 py-2 text-[14px] font-medium text-[#1c1d1f] transition-colors hover:bg-[#f3f4f6] md:inline-flex"
          >
            {t.nav.language}
          </button>

          <PrimaryButton onClick={() => handleCTAClick('header_start')} className="hidden md:inline-flex">
            {t.nav.start}
          </PrimaryButton>

          <button
            type="button"
            onClick={handleMenuToggle}
            className="ml-auto inline-flex rounded-[10px] border border-[#d3d8df] p-2 text-[#1c1d1f] transition-colors hover:bg-[#f3f4f6] md:hidden"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </Wrap>

        {isMenuOpen ? (
          <div className="fixed inset-0 top-[73px] z-40 md:hidden">
            <button
              type="button"
              aria-label="Close menu"
              className="absolute inset-0 bg-[rgba(28,29,31,.16)]"
              onClick={() => setIsMenuOpen(false)}
            />
            <div className="absolute inset-x-4 top-4 rounded-[12px] border border-[#e4e7ec] bg-white p-4 shadow-[rgba(28,40,64,0.1)_0px_10px_20px_-12px,rgba(28,40,64,0.08)_0px_16px_32px_-16px]">
              <div className="flex flex-col gap-3">
                {navItems.map((item) =>
                  item.href.startsWith('/') ? (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-[10px] px-3 py-2 text-[14px] font-medium text-[#6f7988] transition-colors hover:bg-[#f3f4f6] hover:text-[#1c1d1f]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t.nav[item.key]}
                    </Link>
                  ) : (
                    <a
                      key={item.href}
                      href={item.href}
                      className="rounded-[10px] px-3 py-2 text-[14px] font-medium text-[#6f7988] transition-colors hover:bg-[#f3f4f6] hover:text-[#1c1d1f]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t.nav[item.key]}
                    </a>
                  ),
                )}
                <a
                  href="https://docs.techcatalyst.ru"
                  className="rounded-[10px] px-3 py-2 text-[14px] font-medium text-[#6f7988] transition-colors hover:bg-[#f3f4f6] hover:text-[#1c1d1f]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t.nav.docs}
                </a>
              </div>
              <div className="mt-4 flex gap-3 border-t border-[#e4e7ec] pt-4">
                <SecondaryButton
                  onClick={() => {
                    setLanguage(language === 'ru' ? 'en' : 'ru');
                    setIsMenuOpen(false);
                  }}
                  className="flex-1 justify-center"
                >
                  {t.nav.language}
                </SecondaryButton>
                <PrimaryButton
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleCTAClick('mobile_start');
                  }}
                  className="flex-1 justify-center"
                >
                  {t.nav.start}
                </PrimaryButton>
              </div>
            </div>
          </div>
        ) : null}
      </header>

      <main>
        <section className="border-b border-[#e4e7ec]">
          <Wrap className="py-[80px] md:py-[100px]">
            <div className="mx-auto max-w-[980px] text-center">
              <div className="mb-4 text-[12px] font-medium uppercase tracking-[0.08em] text-[#407ff2]">
                {t.hero.kicker}
              </div>
              <h1
                className={`${lora.className} mx-auto max-w-[920px] text-[40px] font-medium leading-[1.1] tracking-[-0.6px] text-[#1c1d1f] md:text-[56px] md:tracking-[-1.12px]`}
                style={{ fontFeatureSettings: '"ss03"' }}
              >
                {t.hero.title}
              </h1>
              <p className="mx-auto mt-5 max-w-[760px] text-[16px] leading-[1.5] tracking-[-0.24px] text-[#6f7988] md:text-[20px] md:leading-[1.3] md:tracking-[-0.4px]">
                {t.hero.lead}
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <PrimaryButton onClick={() => handleCTAClick('hero_primary')}>
                  {t.hero.primary}
                  <ArrowRight className="h-4 w-4" />
                </PrimaryButton>
                <a
                  href="https://docs.techcatalyst.ru"
                  onClick={() => trackCTAClick('hero_docs')}
                  className="inline-flex items-center gap-2 rounded-[10px] border border-[#d3d8df] bg-white px-3 py-2 text-[14px] font-medium text-[#1c1d1f] transition-colors hover:bg-[#f3f4f6]"
                >
                  {t.hero.secondary}
                </a>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-[12px] leading-[1.5] tracking-[-0.14px] text-[#8f99a8]">
                {t.hero.bullets.map((item) => (
                  <span key={item} className="rounded-[4px] border border-[#e4e7ec] bg-white px-2 py-1">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <Card className="mx-auto mt-12 max-w-[1120px] p-4 md:p-5">
              <div className="grid gap-4 lg:grid-cols-[1.1fr_.9fr]">
                <div className="rounded-[8px] border border-[#e4e7ec] bg-[#f3f4f6] p-4">
                  <div className="flex items-center justify-between border-b border-[#d3d8df] pb-3">
                    <div>
                      <div className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#8f99a8]">
                        {language === 'ru' ? 'API-контур' : 'API frame'}
                      </div>
                      <div className="mt-1 text-[20px] font-medium leading-[1.3] tracking-[-0.4px] text-[#1c1d1f]">
                        {t.hero.frameTitle}
                      </div>
                    </div>
                    <div className="rounded-[4px] border border-[#d3d8df] bg-white px-2 py-1 text-[12px] text-[#6f7988]">
                      {t.hero.frameTag}
                    </div>
                  </div>

                  <div className="mt-4 rounded-[8px] border border-[#e4e7ec] bg-white p-4">
                    <pre className="overflow-x-auto text-[13px] leading-[1.5] tracking-[-0.14px] text-[#505967]">
                      <code>{codeSample}</code>
                    </pre>
                  </div>
                </div>

                <div className="grid gap-3">
                  {t.hero.frameCards.map(([label, value]) => (
                    <div key={label} className="rounded-[8px] border border-[#e4e7ec] bg-white p-4">
                      <div className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#8f99a8]">{label}</div>
                      <div className="mt-2 text-[15px] leading-[1.47] tracking-[-0.15px] text-[#1c1d1f]">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </Wrap>
        </section>

        <section className="py-[80px] md:py-[96px]">
          <Wrap>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {t.stats.map(([value, label]) => (
                <Card key={label} className="p-4">
                  <div className="text-[32px] font-medium leading-[1.1] tracking-[-0.64px] text-[#1c1d1f]">{value}</div>
                  <div className="mt-2 text-[14px] leading-[1.43] tracking-[-0.14px] text-[#6f7988]">{label}</div>
                </Card>
              ))}
            </div>
          </Wrap>
        </section>

        <section id="platform" className="border-y border-[#e4e7ec] bg-[#f3f4f6] py-[80px] md:py-[96px]">
          <Wrap>
            <div className="max-w-[760px]">
              <div className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#407ff2]">
                {t.platform.kicker}
              </div>
              <h2
                className={`${lora.className} mt-4 text-[28px] font-medium leading-[1.23] tracking-[-0.42px] text-[#1c1d1f] md:text-[40px] md:leading-[1.1] md:tracking-[-0.6px]`}
                style={{ fontFeatureSettings: '"ss03"' }}
              >
                {t.platform.title}
              </h2>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {t.platform.cards.map(([title, text, icon]) => (
                <Card key={title} className="p-4">
                  <div className="inline-flex rounded-[8px] border border-[#e4e7ec] bg-white p-2 text-[#505967]">
                    {icon}
                  </div>
                  <h3 className="mt-4 text-[20px] font-medium leading-[1.3] tracking-[-0.4px] text-[#1c1d1f]">
                    {title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-[1.43] tracking-[-0.14px] text-[#6f7988]">{text}</p>
                </Card>
              ))}
            </div>
          </Wrap>
        </section>

        <section className="py-[80px] md:py-[96px]">
          <Wrap className="grid gap-6 lg:grid-cols-[.88fr_1.12fr]">
            <div className="max-w-[560px]">
              <div className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#407ff2]">
                {t.workflow.kicker}
              </div>
              <h2
                className={`${lora.className} mt-4 text-[28px] font-medium leading-[1.23] tracking-[-0.42px] text-[#1c1d1f] md:text-[40px] md:leading-[1.1] md:tracking-[-0.6px]`}
                style={{ fontFeatureSettings: '"ss03"' }}
              >
                {t.workflow.title}
              </h2>
              <div className="mt-6 grid gap-3">
                {t.workflow.points.map((item) => (
                  <div key={item} className="flex gap-3 rounded-[8px] border border-[#e4e7ec] bg-white p-4">
                    <div className="mt-[2px] text-[#407ff2]">
                      <BadgeCheck className="h-4 w-4" />
                    </div>
                    <div className="text-[15px] leading-[1.47] tracking-[-0.15px] text-[#1c1d1f]">{item}</div>
                  </div>
                ))}
              </div>
            </div>

            <Card className="p-4">
              <div className="grid gap-3 md:grid-cols-3">
                {[
                  [language === 'ru' ? 'Доступ' : 'Access', language === 'ru' ? 'Одна точка подключения для разных моделей.' : 'One endpoint across models.', <Globe className="h-4 w-4" />],
                  [language === 'ru' ? 'Команды' : 'Teams', language === 'ru' ? 'Лимиты, ключи и биллинг по ролям.' : 'Limits, keys and billing by role.', <Building2 className="h-4 w-4" />],
                  [language === 'ru' ? 'Расчёты' : 'Billing', t.workflow.sideText, <CreditCard className="h-4 w-4" />],
                ].map(([title, text, icon]) => (
                  <div key={String(title)} className="rounded-[8px] border border-[#e4e7ec] bg-[#f3f4f6] p-4">
                    <div className="inline-flex rounded-[8px] border border-[#d3d8df] bg-white p-2 text-[#505967]">
                      {icon}
                    </div>
                    <div className="mt-4 text-[20px] font-medium leading-[1.3] tracking-[-0.4px] text-[#1c1d1f]">
                      {title}
                    </div>
                    <div className="mt-2 text-[14px] leading-[1.43] tracking-[-0.14px] text-[#6f7988]">{text}</div>
                  </div>
                ))}
              </div>
            </Card>
          </Wrap>
        </section>

        <section id="models" className="border-y border-[#e4e7ec] bg-white py-[80px] md:py-[96px]">
          <Wrap>
            <div className="max-w-[760px]">
              <div className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#407ff2]">
                {t.models.kicker}
              </div>
              <h2
                className={`${lora.className} mt-4 text-[28px] font-medium leading-[1.23] tracking-[-0.42px] text-[#1c1d1f] md:text-[40px] md:leading-[1.1] md:tracking-[-0.6px]`}
                style={{ fontFeatureSettings: '"ss03"' }}
              >
                {t.models.title}
              </h2>
            </div>

            <div className="mt-8 border-b border-[#d3d8df]">
              <div className="flex flex-wrap gap-6">
                {(['all', 'text', 'multimodal', 'image'] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => handleTabChange(tab)}
                    className={`border-b-2 px-0 pb-3 text-[15px] font-medium tracking-[-0.15px] transition-colors ${
                      activeTab === tab
                        ? 'border-[#1c1d1f] text-[#1c1d1f]'
                        : 'border-transparent text-[#6f7988] hover:text-[#1c1d1f]'
                    }`}
                  >
                    {t.models.tabs[tab]}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {filteredModels.map((model) => (
                <Card key={model.name} className="p-4">
                  <div className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#8f99a8]">{model.provider}</div>
                  <div className="mt-3 text-[20px] font-medium leading-[1.3] tracking-[-0.4px] text-[#1c1d1f]">
                    {model.name}
                  </div>
                  <div className="mt-6 text-[15px] leading-[1.47] tracking-[-0.15px] text-[#1c1d1f]">{model.price}</div>
                  <div className="mt-1 text-[12px] leading-[1.5] tracking-[-0.14px] text-[#8f99a8]">{t.models.suffix}</div>
                </Card>
              ))}
            </div>
          </Wrap>
        </section>

        <section id="commercial" className="bg-[#f3f4f6] py-[80px] md:py-[96px]">
          <Wrap>
            <div className="max-w-[760px]">
              <div className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#407ff2]">
                {t.commercial.kicker}
              </div>
              <h2
                className={`${lora.className} mt-4 text-[28px] font-medium leading-[1.23] tracking-[-0.42px] text-[#1c1d1f] md:text-[40px] md:leading-[1.1] md:tracking-[-0.6px]`}
                style={{ fontFeatureSettings: '"ss03"' }}
              >
                {t.commercial.title}
              </h2>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_1fr_.9fr]">
              {t.commercial.cards.map((card) => (
                <Card key={card.title} className="p-4">
                  <div className="text-[20px] font-medium leading-[1.3] tracking-[-0.4px] text-[#1c1d1f]">{card.title}</div>
                  <ul className="mt-4 space-y-3">
                    {card.items.map((item) => (
                      <li key={item} className="flex gap-3 text-[14px] leading-[1.43] tracking-[-0.14px] text-[#6f7988]">
                        <span className="mt-[2px] text-[#407ff2]">
                          <BadgeCheck className="h-4 w-4" />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    {card.action === 'enterprise' ? (
                      <PrimaryButton onClick={() => handlePricingClick(card.action)}>
                        {card.cta}
                        <ArrowRight className="h-4 w-4" />
                      </PrimaryButton>
                    ) : (
                      <SecondaryButton onClick={() => handlePricingClick(card.action)}>
                        {card.cta}
                        <ChevronRight className="h-4 w-4" />
                      </SecondaryButton>
                    )}
                  </div>
                </Card>
              ))}

              <Card className="p-4">
                <div className="inline-flex rounded-[8px] border border-[#e4e7ec] bg-white p-2 text-[#505967]">
                  <Wallet className="h-4 w-4" />
                </div>
                <div className="mt-4 text-[20px] font-medium leading-[1.3] tracking-[-0.4px] text-[#1c1d1f]">
                  {t.commercial.procurementTitle}
                </div>
                <p className="mt-2 text-[14px] leading-[1.43] tracking-[-0.14px] text-[#6f7988]">
                  {t.commercial.procurementText}
                </p>
                <Link
                  href="/zakupka-zarubezhnogo-po"
                  onClick={() => trackCTAClick('home_procurement_link')}
                  className="mt-6 inline-flex items-center gap-2 rounded-[10px] border border-[#d3d8df] bg-white px-3 py-2 text-[14px] font-medium text-[#1c1d1f] transition-colors hover:bg-[#f3f4f6]"
                >
                  {t.commercial.procurementButton}
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Card>
            </div>
          </Wrap>
        </section>

        <section className="py-[80px] md:py-[96px]">
          <Wrap>
            <div className="max-w-[760px]">
              <div className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#407ff2]">
                {t.proof.kicker}
              </div>
              <h2
                className={`${lora.className} mt-4 text-[28px] font-medium leading-[1.23] tracking-[-0.42px] text-[#1c1d1f] md:text-[40px] md:leading-[1.1] md:tracking-[-0.6px]`}
                style={{ fontFeatureSettings: '"ss03"' }}
              >
                {t.proof.title}
              </h2>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {t.proof.quotes.map(([quote, author]) => (
                <Card key={quote} className="p-4">
                  <p className="text-[16px] leading-[1.5] tracking-[-0.24px] text-[#1c1d1f]">“{quote}”</p>
                  <div className="mt-4 text-[14px] leading-[1.43] tracking-[-0.14px] text-[#6f7988]">{author}</div>
                </Card>
              ))}
            </div>
          </Wrap>
        </section>

        <section className="border-t border-[#e4e7ec] py-[80px] md:py-[96px]">
          <Wrap>
            <Card className="mx-auto max-w-[1120px] p-5 md:p-6">
              <div className="max-w-[760px]">
                <div className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#407ff2]">
                  {t.cta.kicker}
                </div>
                <h2
                  className={`${lora.className} mt-4 text-[28px] font-medium leading-[1.23] tracking-[-0.42px] text-[#1c1d1f] md:text-[40px] md:leading-[1.1] md:tracking-[-0.6px]`}
                  style={{ fontFeatureSettings: '"ss03"' }}
                >
                  {t.cta.title}
                </h2>
                <p className="mt-3 text-[16px] leading-[1.5] tracking-[-0.24px] text-[#6f7988]">{t.cta.lead}</p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <PrimaryButton onClick={() => handleCTAClick('final_cta')}>
                  {t.cta.primary}
                  <ArrowRight className="h-4 w-4" />
                </PrimaryButton>
                <SecondaryButton onClick={() => handlePricingClick('latest_price')}>
                  {t.cta.secondary}
                </SecondaryButton>
              </div>
            </Card>
          </Wrap>
        </section>
      </main>

      <footer className="bg-[#000000] py-12 text-[14px]">
        <Wrap className="grid gap-10 md:grid-cols-[1.1fr_.9fr]">
          <div>
            <div className="text-[14px] font-medium text-white">{t.brand}</div>
            <p className="mt-3 max-w-[440px] text-[14px] leading-[1.43] tracking-[-0.14px] text-[#8f99a8]">
              {t.footer.note}
            </p>
          </div>

          <div className="grid gap-2 md:justify-end">
            <a href="mailto:info@2rm.ru" className="text-[#8f99a8] transition-colors hover:text-white">
              info@2rm.ru
            </a>
            <a href="https://t.me/pillardev" target="_blank" rel="noreferrer" className="text-[#8f99a8] transition-colors hover:text-white">
              Telegram
            </a>
            <Link href="/privacy" className="text-[#8f99a8] transition-colors hover:text-white">
              Политика конфиденциальности
            </Link>
            <Link href="/cookie" className="text-[#8f99a8] transition-colors hover:text-white">
              Политика cookie
            </Link>
            <span className="text-[#8f99a8]">{t.footer.rights}</span>
          </div>
        </Wrap>
      </footer>

      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        source={modalSource}
        language={language}
      />
    </div>
  );
}

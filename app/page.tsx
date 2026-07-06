'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
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
      title: 'Один интерфейс для ведущих ИИ-моделей.',
      lead:
        'OpenAI-совместимый шлюз для ChatGPT, Claude, Gemini, Grok и других провайдеров. Маршрутизация, биллинг и командный доступ в одной точке.',
      primary: 'Создать бесплатный аккаунт',
      secondary: 'Открыть документацию',
      frameTitle: 'Как выглядит контур',
      frameTag: 'Совместимо с OpenAI',
      frameCards: [
        ['Поставщики', 'OpenAI, Anthropic, Google, xAI, DeepSeek'],
        ['Расчёты', 'Рубли, счёт, общие расходы команды'],
        ['Сценарии', 'Рабочая среда, пилотные проекты, внутренние ИИ-платформы'],
      ],
      bullets: ['Единая точка доступа', 'Резервное переключение между поставщиками', 'Оплата в рублях'],
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
        ['Единый интерфейс', 'Один ключ и одна точка подключения для разных поставщиков.', <Code2 className="h-4 w-4" />],
        ['Маршрутизация и резервирование', 'Меняйте поставщика без переписывания программного кода.', <Network className="h-4 w-4" />],
        ['Управление командой', 'Лимиты, доступ, ключи и расчёты в одном месте.', <ShieldCheck className="h-4 w-4" />],
      ],
    },
    workflow: {
      kicker: 'Как это работает',
      title: 'Сохраняете SDK. Меняете только слой подключения.',
      points: [
        'Направьте существующие обращения к OpenAI через ТехКаталист.',
        'Переключайте модели параметром вместо новых интеграций.',
        'Добавляйте учёт расходов и закупку по мере роста команды.',
      ],
      sideTitle: 'Формат работы',
      sideText: 'Подходит и для личного использования, и для корпоративного доступа по счёту.',
    },
    models: {
      kicker: 'Модели',
      title: 'Маршрутизация между текстовыми, мультимодальными и моделями изображений.',
      tabs: { all: 'Все', text: 'Текст', multimodal: 'Мультимодальные', image: 'Изображения' },
      suffix: 'тариф открытого интерфейса',
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
          items: ['Оплата по счёту и договору', 'Закрывающие документы', 'Учёт расходов команды и поддержка закупки'],
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
        ['Подключение поставщиков перестало быть отдельной задачей в плане разработки.', 'Технический директор продуктовой компании'],
        ['Финансы и закупка получили понятную коммерческую модель.', 'Руководитель операций'],
        ['Появилась одна управляемая точка входа в несколько моделей.', 'ИТ-директор финтех-компании'],
      ],
    },
    cta: {
      kicker: 'Старт',
      title: 'Нужен рабочий маршрут, а не ещё один каталог моделей?',
      lead: 'Начните работу с одним ключом доступа и добавляйте маршрутизацию, расчёты и закупку на одной платформе.',
      primary: 'Создать бесплатную учётную запись',
      secondary: 'Запросить актуальный прайс',
    },
    footer: {
      note: 'Единый интерфейс для ведущих ИИ-моделей',
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
  return <div className={`mx-auto max-w-[1140px] px-6 max-sm:px-[18px] ${className}`}>{children}</div>;
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-[20px] border border-[#edf0f7] bg-white transition duration-200 hover:-translate-y-0.5 hover:shadow-card ${className}`}
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
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-[#1837da] bg-[#1837da] px-7 py-3 text-[15px] font-semibold text-white transition hover:-translate-y-px hover:border-[#0046f9] hover:bg-[#0046f9] hover:shadow-cta ${className}`}
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
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-[#d6dcec] bg-white px-7 py-3 text-[15px] font-semibold text-[#313131] transition hover:border-[#1837da] hover:text-[#1837da] ${className}`}
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
    <div className="bg-white text-[#222]">
      <header className="sticky top-0 z-50 border-b border-[#edf0f7] bg-white/90 backdrop-blur-md">
        <Wrap className="flex min-h-[68px] items-center gap-7 max-sm:min-h-[58px]">
          <Link href="/" className="flex items-center gap-2 text-[18px] font-bold tracking-[-0.01em] text-[#222]">
            <span className="text-[#1837da]">▲</span>
            <span>{t.brand}</span>
          </Link>

          <nav className="ml-auto hidden items-center gap-2 md:flex">
            {navItems.map((item) =>
              item.href.startsWith('/') ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-1 py-2 text-[15px] font-medium text-[#63666a] transition-colors hover:text-[#1837da]"
                >
                  {t.nav[item.key]}
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  className="px-1 py-2 text-[15px] font-medium text-[#63666a] transition-colors hover:text-[#1837da]"
                >
                  {t.nav[item.key]}
                </a>
              ),
            )}
            <a
              href="https://docs.techcatalyst.ru"
              className="px-1 py-2 text-[15px] font-medium text-[#63666a] transition-colors hover:text-[#1837da]"
            >
              {t.nav.docs}
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setLanguage(language === 'ru' ? 'en' : 'ru')}
            className="hidden rounded-full border border-[#d6dcec] px-3 py-2 text-[13px] font-medium text-[#313131] transition-colors hover:border-[#1837da] hover:text-[#1837da] md:inline-flex"
          >
            {t.nav.language}
          </button>

          <PrimaryButton onClick={() => handleCTAClick('header_start')} className="hidden md:inline-flex">
            {t.nav.start}
          </PrimaryButton>

          <button
            type="button"
            onClick={handleMenuToggle}
            className="ml-auto inline-flex rounded-full border border-[#d6dcec] p-2 text-[#313131] transition-colors hover:border-[#1837da] md:hidden"
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
            <div className="absolute inset-x-4 top-4 rounded-[12px] border border-[#edf0f7] bg-white p-4 shadow-[rgba(28,40,64,0.1)_0px_10px_20px_-12px,rgba(28,40,64,0.08)_0px_16px_32px_-16px]">
              <div className="flex flex-col gap-3">
                {navItems.map((item) =>
                  item.href.startsWith('/') ? (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-[8px] px-3 py-2 text-[14px] font-medium text-[#63666a] transition-colors hover:bg-[#f9fafc] hover:text-[#222222]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t.nav[item.key]}
                    </Link>
                  ) : (
                    <a
                      key={item.href}
                      href={item.href}
                      className="rounded-[8px] px-3 py-2 text-[14px] font-medium text-[#63666a] transition-colors hover:bg-[#f9fafc] hover:text-[#222222]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t.nav[item.key]}
                    </a>
                  ),
                )}
                <a
                  href="https://docs.techcatalyst.ru"
                  className="rounded-[8px] px-3 py-2 text-[14px] font-medium text-[#63666a] transition-colors hover:bg-[#f9fafc] hover:text-[#222222]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t.nav.docs}
                </a>
              </div>
              <div className="mt-4 flex gap-3 border-t border-[#edf0f7] pt-4">
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
        <section className="relative overflow-hidden border-b border-[#edf0f7] bg-[radial-gradient(900px_460px_at_82%_-12%,rgba(24,55,218,.07),transparent_60%)]">
          <Wrap className="relative py-[80px] md:py-[96px]">
            <div className="mx-auto max-w-[980px] text-center">
              <div className="mb-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#1837da]">
                {t.hero.kicker}
              </div>
              <h1
                className="mx-auto max-w-[14ch] text-[clamp(36px,5vw,54px)] font-bold leading-[1.12] tracking-[-0.02em] text-[#222]"
                style={{ fontFeatureSettings: '"ss03"' }}
              >
                {t.hero.title}
              </h1>
              <p className="mx-auto mt-5 max-w-[760px] text-[17px] leading-[1.6] text-[#63666a] md:text-[19px]">
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
                  className="inline-flex items-center gap-2 rounded-full border border-[#d6dcec] bg-white px-7 py-3 text-[15px] font-semibold text-[#313131] transition hover:border-[#1837da] hover:text-[#1837da]"
                >
                  {t.hero.secondary}
                </a>
              </div>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
                {t.hero.bullets.map((item) => (
                  <span key={item} className="rounded-full border border-[#edf0f7] bg-[#f9fafc] px-3.5 py-1.5 text-[13px] font-medium text-[#63666a] before:mr-2 before:text-[9px] before:text-[#10bc10] before:content-['●']">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative mx-auto mt-12 max-w-[1080px] rounded-[20px] border border-[#edf0f7] bg-white p-4 shadow-panel md:p-5">
              <div className="grid gap-4 lg:grid-cols-[1.1fr_.9fr]">
                <div className="overflow-hidden rounded-[16px] border border-[#edf0f7] bg-white">
                  <div className="flex items-center justify-between border-b border-[#edf0f7] bg-[#f9fafc] p-4">
                    <div>
                      <div className="font-mono text-[11px] font-medium uppercase tracking-[0.09em] text-[#979797]">
                        {language === 'ru' ? 'API-контур' : 'API frame'}
                      </div>
                      <div className="mt-1 text-[20px] font-semibold leading-[1.3] tracking-[-0.4px] text-[#222]">
                        {t.hero.frameTitle}
                      </div>
                    </div>
                    <div className="rounded-full border border-[#d6dcec] bg-white px-3 py-1 text-[11px] font-medium text-[#63666a]">
                      {t.hero.frameTag}
                    </div>
                  </div>

                  <div className="p-5">
                    <pre className="overflow-x-auto font-mono text-[12px] leading-[1.7] text-[#63666a]">
                      <code>{codeSample}</code>
                    </pre>
                  </div>
                </div>

                <div className="grid gap-3">
                  {t.hero.frameCards.map(([label, value]) => (
                    <div key={label} className="rounded-[20px] border border-[#edf0f7] bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-card">
                      <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#1837da]">{label}</div>
                      <div className="mt-2 text-[15px] leading-[1.5] text-[#313131]">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Wrap>
        </section>

        <section className="py-[80px] md:py-[96px]">
          <Wrap>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {t.stats.map(([value, label]) => (
                <Card key={label} className="p-4">
                  <div className="text-[32px] font-medium leading-[1.1] tracking-[-0.64px] text-[#222222]">{value}</div>
                  <div className="mt-2 text-[14px] leading-[1.43] tracking-[-0.14px] text-[#63666a]">{label}</div>
                </Card>
              ))}
            </div>
          </Wrap>
        </section>

        <section id="platform" className="border-y border-[#edf0f7] bg-[#f9fafc] py-[80px] md:py-[96px]">
          <Wrap>
            <div className="max-w-[760px]">
              <div className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#1837da]">
                {t.platform.kicker}
              </div>
              <h2
                className={`mt-4 text-[28px] font-medium leading-[1.23] tracking-[-0.42px] text-[#222222] md:text-[40px] md:leading-[1.1] md:tracking-[-0.6px]`}
                style={{ fontFeatureSettings: '"ss03"' }}
              >
                {t.platform.title}
              </h2>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {t.platform.cards.map(([title, text, icon]) => (
                <Card key={title} className="p-4">
                  <div className="inline-flex rounded-[8px] border border-[#edf0f7] bg-white p-2 text-[#63666a]">
                    {icon}
                  </div>
                  <h3 className="mt-4 text-[20px] font-medium leading-[1.3] tracking-[-0.4px] text-[#222222]">
                    {title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-[1.43] tracking-[-0.14px] text-[#63666a]">{text}</p>
                </Card>
              ))}
            </div>
          </Wrap>
        </section>

        <section className="py-[80px] md:py-[96px]">
          <Wrap className="grid gap-6 lg:grid-cols-[.88fr_1.12fr]">
            <div className="max-w-[560px]">
              <div className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#1837da]">
                {t.workflow.kicker}
              </div>
              <h2
                className={`mt-4 text-[28px] font-medium leading-[1.23] tracking-[-0.42px] text-[#222222] md:text-[40px] md:leading-[1.1] md:tracking-[-0.6px]`}
                style={{ fontFeatureSettings: '"ss03"' }}
              >
                {t.workflow.title}
              </h2>
              <div className="mt-6 grid gap-3">
                {t.workflow.points.map((item) => (
                  <div key={item} className="flex gap-3 rounded-[8px] border border-[#edf0f7] bg-white p-4">
                    <div className="mt-[2px] text-[#1837da]">
                      <BadgeCheck className="h-4 w-4" />
                    </div>
                    <div className="text-[15px] leading-[1.47] tracking-[-0.15px] text-[#222222]">{item}</div>
                  </div>
                ))}
              </div>
            </div>

            <Card className="p-4">
              <div className="grid gap-3 md:grid-cols-3">
                {[
                  [language === 'ru' ? 'Доступ' : 'Access', language === 'ru' ? 'Одна точка подключения для разных моделей.' : 'One endpoint across models.', <Globe className="h-4 w-4" />],
                  [language === 'ru' ? 'Команды' : 'Teams', language === 'ru' ? 'Лимиты, ключи и расходы по ролям.' : 'Limits, keys and billing by role.', <Building2 className="h-4 w-4" />],
                  [language === 'ru' ? 'Расчёты' : 'Billing', t.workflow.sideText, <CreditCard className="h-4 w-4" />],
                ].map(([title, text, icon]) => (
                  <div key={String(title)} className="rounded-[8px] border border-[#edf0f7] bg-[#f9fafc] p-4">
                    <div className="inline-flex rounded-[8px] border border-[#edf0f7] bg-white p-2 text-[#63666a]">
                      {icon}
                    </div>
                    <div className="mt-4 text-[20px] font-medium leading-[1.3] tracking-[-0.4px] text-[#222222]">
                      {title}
                    </div>
                    <div className="mt-2 text-[14px] leading-[1.43] tracking-[-0.14px] text-[#63666a]">{text}</div>
                  </div>
                ))}
              </div>
            </Card>
          </Wrap>
        </section>

        <section id="models" className="border-y border-[#edf0f7] bg-white py-[80px] md:py-[96px]">
          <Wrap>
            <div className="max-w-[760px]">
              <div className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#1837da]">
                {t.models.kicker}
              </div>
              <h2
                className={`mt-4 text-[28px] font-medium leading-[1.23] tracking-[-0.42px] text-[#222222] md:text-[40px] md:leading-[1.1] md:tracking-[-0.6px]`}
                style={{ fontFeatureSettings: '"ss03"' }}
              >
                {t.models.title}
              </h2>
            </div>

            <div className="mt-8 border-b border-[#edf0f7]">
              <div className="flex flex-wrap gap-6">
                {(['all', 'text', 'multimodal', 'image'] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => handleTabChange(tab)}
                    className={`border-b-2 px-0 pb-3 text-[15px] font-medium tracking-[-0.15px] transition-colors ${
                      activeTab === tab
                        ? 'border-[#222222] text-[#222222]'
                        : 'border-transparent text-[#63666a] hover:text-[#222222]'
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
                  <div className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#979797]">{model.provider}</div>
                  <div className="mt-3 text-[20px] font-medium leading-[1.3] tracking-[-0.4px] text-[#222222]">
                    {model.name}
                  </div>
                  <div className="mt-6 text-[15px] leading-[1.47] tracking-[-0.15px] text-[#222222]">{model.price}</div>
                  <div className="mt-1 text-[12px] leading-[1.5] tracking-[-0.14px] text-[#979797]">{t.models.suffix}</div>
                </Card>
              ))}
            </div>
          </Wrap>
        </section>

        <section id="commercial" className="bg-[#f9fafc] py-[80px] md:py-[96px]">
          <Wrap>
            <div className="max-w-[760px]">
              <div className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#1837da]">
                {t.commercial.kicker}
              </div>
              <h2
                className={`mt-4 text-[28px] font-medium leading-[1.23] tracking-[-0.42px] text-[#222222] md:text-[40px] md:leading-[1.1] md:tracking-[-0.6px]`}
                style={{ fontFeatureSettings: '"ss03"' }}
              >
                {t.commercial.title}
              </h2>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_1fr_.9fr]">
              {t.commercial.cards.map((card) => (
                <Card key={card.title} className="p-4">
                  <div className="text-[20px] font-medium leading-[1.3] tracking-[-0.4px] text-[#222222]">{card.title}</div>
                  <ul className="mt-4 space-y-3">
                    {card.items.map((item) => (
                      <li key={item} className="flex gap-3 text-[14px] leading-[1.43] tracking-[-0.14px] text-[#63666a]">
                        <span className="mt-[2px] text-[#1837da]">
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
                <div className="inline-flex rounded-[8px] border border-[#edf0f7] bg-white p-2 text-[#63666a]">
                  <Wallet className="h-4 w-4" />
                </div>
                <div className="mt-4 text-[20px] font-medium leading-[1.3] tracking-[-0.4px] text-[#222222]">
                  {t.commercial.procurementTitle}
                </div>
                <p className="mt-2 text-[14px] leading-[1.43] tracking-[-0.14px] text-[#63666a]">
                  {t.commercial.procurementText}
                </p>
                <Link
                  href="/zakupka-zarubezhnogo-po"
                  onClick={() => trackCTAClick('home_procurement_link')}
                  className="mt-6 inline-flex items-center gap-2 rounded-[8px] border border-[#edf0f7] bg-white px-3 py-2 text-[14px] font-medium text-[#222222] transition-colors hover:bg-[#f9fafc]"
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
              <div className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#1837da]">
                {t.proof.kicker}
              </div>
              <h2
                className={`mt-4 text-[28px] font-medium leading-[1.23] tracking-[-0.42px] text-[#222222] md:text-[40px] md:leading-[1.1] md:tracking-[-0.6px]`}
                style={{ fontFeatureSettings: '"ss03"' }}
              >
                {t.proof.title}
              </h2>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {t.proof.quotes.map(([quote, author]) => (
                <Card key={quote} className="p-4">
                  <p className="text-[16px] leading-[1.5] tracking-[-0.24px] text-[#222222]">“{quote}”</p>
                  <div className="mt-4 text-[14px] leading-[1.43] tracking-[-0.14px] text-[#63666a]">{author}</div>
                </Card>
              ))}
            </div>
          </Wrap>
        </section>

        <section className="border-t border-[#edf0f7] py-[80px] md:py-[96px]">
          <Wrap>
            <Card className="mx-auto max-w-[1120px] p-5 md:p-6">
              <div className="max-w-[760px]">
                <div className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#1837da]">
                  {t.cta.kicker}
                </div>
                <h2
                  className={`mt-4 text-[28px] font-medium leading-[1.23] tracking-[-0.42px] text-[#222222] md:text-[40px] md:leading-[1.1] md:tracking-[-0.6px]`}
                  style={{ fontFeatureSettings: '"ss03"' }}
                >
                  {t.cta.title}
                </h2>
                <p className="mt-3 text-[16px] leading-[1.5] tracking-[-0.24px] text-[#63666a]">{t.cta.lead}</p>
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

      <footer className="border-t border-[#edf0f7] bg-[#f9fafc] py-12 text-[14px]">
        <Wrap className="grid gap-10 md:grid-cols-[1.1fr_.9fr]">
          <div>
            <div className="text-[14px] font-semibold text-[#222]">{t.brand}</div>
            <p className="mt-3 max-w-[440px] text-[14px] leading-[1.43] tracking-[-0.14px] text-[#63666a]">
              {t.footer.note}
            </p>
          </div>

          <div className="grid gap-2 md:justify-end">
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
            <span className="text-[#979797]">{t.footer.rights}</span>
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

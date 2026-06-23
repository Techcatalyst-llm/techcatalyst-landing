'use client';

import { useEffect, useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Brain,
  Building2,
  Check,
  ChevronRight,
  Clock3,
  Code2,
  CreditCard,
  Globe,
  Menu,
  MessageSquare,
  Network,
  Server,
  ShieldCheck,
  Smartphone,
  Wallet,
  X,
  Zap,
} from 'lucide-react';
import { trackCTAClick, trackMobileMenuToggle, trackPlatformView, trackPricingSelect } from '@/lib/analytics';
import ApplicationModal from '@/components/Modal/ApplicationModal';

type Language = 'en' | 'ru';
type ModelTab = 'all' | 'text' | 'multimodal' | 'image';

const navItems = [
  { href: '#features', key: 'features' },
  { href: '#models', key: 'models' },
  { href: '#integration', key: 'integration' },
  { href: '#pricing', key: 'pricing' },
  { href: '#reviews', key: 'reviews' },
] as const;

const translations = {
  en: {
    brand: 'Tech Catalyst',
    nav: {
      features: 'Features',
      models: 'Models',
      integration: 'Integration',
      pricing: 'Pricing',
      reviews: 'Reviews',
      docs: 'Documentation',
      start: 'Start free',
      language: 'RU',
    },
    hero: {
      kicker: 'LLM-Gate for products and teams',
      title: 'LLM-Gate: one API for ChatGPT, Claude, Gemini, Grok and 100+ AI models.',
      lead:
        'An OpenAI-compatible gateway for routing, failover, billing and access control across frontier AI providers. Keep one endpoint, pay in rubles and switch models without changing product code.',
      primary: 'Create free account',
      secondary: 'Open documentation',
      panelTitle: 'What the gate adds',
      bullets: [
        'Works with existing OpenAI SDK flows',
        'Provider routing and failover in one API layer',
        'Unified billing, keys and limits for teams',
      ],
    },
    stats: {
      models: 'AI models',
      providers: 'Providers',
      latency: 'Low-friction launch',
      billing: 'Payment in rubles',
    },
    sections: {
      features: 'Platform capabilities',
      featuresTitle: 'An LLM-Gate layer between your product and frontier model providers.',
      featuresLead:
        'Use Tech Catalyst as the control plane for routing, redundancy, access policies and commercial operations instead of wiring each model vendor directly into your stack.',
      integration: 'Integration',
      integrationTitle: 'Connect in minutes, keep freedom to switch models later.',
      integrationLead:
        'You keep the SDK, auth pattern and product logic you already use. Tech Catalyst replaces only the provider edge with a managed gateway layer.',
      models: 'Model catalog',
      modelsTitle: 'Route requests across text, multimodal and image models.',
      modelsLead:
        'Use one endpoint for different providers and compare quality, latency and cost without rewriting application code. Prices below reflect current public API rates from the model vendors.',
      pricing: 'Pricing',
      pricingTitle: 'Commercial access for individuals and business teams.',
      pricingLead:
        'Retail access stays pay-as-you-go. Legal entities can work through invoice, contract and reporting. The landing shows current model benchmarks, and the full commercial offer is shared on request.',
      reviews: 'Customer fit',
      reviewsTitle: 'Built for developers, product teams and internal AI platforms.',
      reviewsLead:
        'The service is positioned for production usage, rapid prototyping and managed enterprise procurement.',
      ctaTitle: 'Need a working setup instead of another model catalog?',
      ctaLead:
        'Launch with one API key, keep model optionality and scale billing, controls and procurement on the same platform.',
    },
    features: [
      {
        title: 'API gateway',
        text: 'One API key and one endpoint with OpenAI-compatible semantics across providers.',
        icon: <Code2 className="h-5 w-5" />,
      },
      {
        title: 'Routing and failover',
        text: 'Requests can be switched between primary and backup providers when a route degrades.',
        icon: <ShieldCheck className="h-5 w-5" />,
      },
      {
        title: 'No VPN required',
        text: 'Stable access for Russian teams with direct connectivity and local billing.',
        icon: <Globe className="h-5 w-5" />,
      },
      {
        title: 'Team controls',
        text: 'Centralized limits, budgets, keys, environments and organizational access policies.',
        icon: <Building2 className="h-5 w-5" />,
      },
      {
        title: 'Usage and billing',
        text: 'Track tokens, spend and provider mix from a single operational and commercial layer.',
        icon: <Wallet className="h-5 w-5" />,
      },
      {
        title: 'Production switching',
        text: 'Move between models for quality, latency or economics without changing product code.',
        icon: <Network className="h-5 w-5" />,
      },
    ],
    steps: [
      {
        title: 'Create an account',
        text: 'Get an API key and access to the gateway dashboard without changing your workflow.',
      },
      {
        title: 'Point your SDK to Tech Catalyst',
        text: 'Set the base URL so your existing requests go through the LLM-Gate layer.',
      },
      {
        title: 'Switch models by parameter',
        text: 'Compare providers, pricing and latency inside the same product path.',
      },
    ],
    tabs: {
      all: 'All',
      text: 'Text',
      multimodal: 'Multimodal',
      image: 'Image',
      per: 'public API rate',
    },
    pricing: {
      personalTitle: 'For individuals',
      personalItems: [
        'Cards and flexible top-up flows',
        'Transparent pay-as-you-go pricing',
        'No mandatory subscription',
        'Fast testing for personal projects',
      ],
      businessTitle: 'For legal entities',
      businessItems: [
        'Invoice-based payment',
        'Contract and closing documents',
        'Support for procurement workflows',
        'Shared billing and team management',
      ],
      viewPrice: 'Request current price list',
      contactSales: 'Talk to sales',
    },
    channels: {
      docsTitle: 'Documentation',
      docsText: 'API reference, product details and downloadable materials for technical and procurement review.',
      chatTitle: 'Web and Telegram access',
      chatText: 'Try the platform without full integration and route adoption through a lighter evaluation flow.',
      docsButton: 'View docs',
      chatButton: 'Request access',
    },
    testimonials: [
      {
        quote:
          'We stopped rebuilding integrations for every provider. The API layer became boring, which is exactly what we needed.',
        author: 'Product team, internal AI tools',
      },
      {
        quote:
          'Model switching went from a roadmap task to a config decision. That changed how quickly we test new ideas.',
        author: 'Founder, B2B SaaS',
      },
      {
        quote:
          'Finance and procurement finally got a commercial flow that matched how engineering wanted to consume models.',
        author: 'Operations lead, enterprise client',
      },
    ],
    footer: {
      note: 'Unified API for 100+ AI models',
      rights: '© 2026 Tech Catalyst. All rights reserved.',
    },
  },
  ru: {
    brand: 'Tech Catalyst',
    nav: {
      features: 'Возможности',
      models: 'Модели',
      integration: 'Интеграция',
      pricing: 'Тарифы',
      reviews: 'Кому подходит',
      docs: 'Документация',
      start: 'Начать бесплатно',
      language: 'EN',
    },
    hero: {
      kicker: 'Единая платформа доступа к AI-моделям',
      title: 'Один API для ChatGPT, Claude, Gemini, Grok и 100+ AI-моделей.',
      lead:
        'Одна точка подключения, совместимость с OpenAI SDK, оплата в рублях и стабильный доступ без VPN. Переключение между провайдерами меняется одним параметром.',
      primary: 'Создать бесплатный аккаунт',
      secondary: 'Открыть документацию',
      panelTitle: 'Почему команды переходят',
      bullets: [
        'Работает с существующими сценариями на OpenAI SDK',
        'Маршрутизация и резервное переключение между провайдерами в одном API-слое',
        'Единый биллинг, ключи и лимиты для команд',
      ],
    },
    stats: {
      models: 'Моделей ИИ',
      providers: 'Провайдеров',
      latency: 'Быстрый старт',
      billing: 'Оплата в рублях',
    },
    sections: {
      features: 'Возможности платформы',
      featuresTitle: 'LLM-Gate слой между вашим продуктом и основными AI-провайдерами.',
      featuresLead:
        'Tech Catalyst можно использовать как управляющий слой для маршрутизации, отказоустойчивости, политик доступа и коммерческого контура вместо прямой работы с каждым поставщиком моделей. Это особенно важно для банков и финтеха, где CIO, CTO и руководителям ИБ нужен единый контролируемый контур.',
      integration: 'Интеграция',
      integrationTitle: 'Подключение за минуты, свобода переключения моделей сохраняется.',
      integrationLead:
        'Вы оставляете привычный SDK, авторизацию и продуктовую логику. Tech Catalyst меняет только слой маршрутизации, а не вашу архитектуру.',
      models: 'Каталог моделей',
      modelsTitle: 'Маршрутизируйте запросы между текстовыми, мультимодальными и моделями генерации изображений.',
      modelsLead:
        'Одна точка подключения к разным провайдерам позволяет сравнивать качество, задержку и стоимость без переписывания кода.',
      pricing: 'Тарифы',
      pricingTitle: 'Коммерческий доступ для частных пользователей и корпоративных команд.',
      pricingLead:
        'Розничный доступ остаётся с оплатой по использованию. Юридические лица работают по счёту, договору и с закрывающими документами. Для банков и финтех-компаний доступен формат закупки под корпоративные требования.',
      reviews: 'Кому подходит',
      reviewsTitle: 'Платформа для CIO, CTO и руководителей ИБ в российских банках и финтех-компаниях.',
      reviewsLead:
        'Сервис подходит для промышленного использования, быстрого пилота и последующей закупки в корпоративном контуре, когда нужны контроль доступа, маршрутизация и единая коммерческая схема.',
      ctaTitle: 'Нужна рабочая схема, а не ещё один каталог моделей?',
      ctaLead:
        'Запускайтесь с одним API-ключом, сохраняйте свободу выбора моделей и масштабируйте биллинг, контроль и закупку в одной платформе.',
    },
    features: [
      {
        title: 'Единый API',
        text: 'Один API-ключ и одна точка подключения с OpenAI-совместимой семантикой.',
        icon: <Code2 className="h-5 w-5" />,
      },
      {
        title: 'Маршрутизация и резервирование',
        text: 'Запросы переключаются между основными и резервными провайдерами при сбое или деградации маршрута.',
        icon: <ShieldCheck className="h-5 w-5" />,
      },
      {
        title: 'Без VPN',
        text: 'Стабильный доступ для российских команд и локальная коммерческая модель.',
        icon: <Globe className="h-5 w-5" />,
      },
      {
        title: 'Управление командой',
        text: 'Централизованные лимиты, бюджеты, ключи, окружения и организационные политики доступа для разработки, ИТ и ИБ.',
        icon: <Building2 className="h-5 w-5" />,
      },
      {
        title: 'Учёт и биллинг',
        text: 'Токены, расходы и сочетание провайдеров отслеживаются в едином операционном и коммерческом слое.',
        icon: <Wallet className="h-5 w-5" />,
      },
      {
        title: 'Переключение в рабочем контуре',
        text: 'Меняйте модели ради качества, скорости или экономики без изменений продуктового кода.',
        icon: <Network className="h-5 w-5" />,
      },
    ],
    steps: [
      {
        title: 'Создайте аккаунт',
        text: 'Получите API-ключ и доступ в кабинет без смены рабочего процесса.',
      },
      {
        title: 'Направьте SDK в Tech Catalyst',
        text: 'Укажите базовый адрес API и сохраните привычный формат запросов.',
      },
      {
        title: 'Переключайте модели параметром',
        text: 'Сравнивайте провайдеров, цены и задержку внутри одного продуктового контура.',
      },
    ],
    tabs: {
      all: 'Все',
      text: 'Текст',
      multimodal: 'Мультимодальные',
      image: 'Изображения',
      per: 'за 1M токенов',
    },
    pricing: {
      personalTitle: 'Для физических лиц',
      personalItems: [
        'Карты и гибкое пополнение баланса',
        'Прозрачный pay-as-you-go',
        'Без обязательной подписки',
        'Быстрый запуск личных проектов',
      ],
      businessTitle: 'Для юридических лиц',
      businessItems: [
        'Оплата по счёту',
        'Договор и закрывающие документы',
        'Поддержка закупочного контура',
        'Общий биллинг и управление командой',
      ],
      viewPrice: 'Запросить актуальный прайс',
      contactSales: 'Связаться с продажами',
    },
    channels: {
      docsTitle: 'Документация',
      docsText: 'API-справка, продуктовые материалы и документы для технической и закупочной проверки.',
      chatTitle: 'Веб и Telegram-доступ',
      chatText: 'Платформу можно оценить до полной интеграции и пройти более лёгкий пилотный сценарий.',
      docsButton: 'Открыть документацию',
      chatButton: 'Запросить доступ',
    },
    testimonials: [
      {
        quote:
          'Мы перестали пересобирать интеграции под каждого провайдера. Появился единый управляемый контур, который устроил и разработку, и ИБ.',
        author: 'CTO, финтех-компания',
      },
      {
        quote:
          'Для нас было критично получить контролируемый доступ к нескольким моделям сразу, с понятными лимитами, маршрутами и закупкой в рублях.',
        author: 'CIO, банк',
      },
      {
        quote:
          'Решение закрыло сразу три задачи: доступ к моделям без VPN, единый коммерческий контур и прозрачные правила для команд разработки и ИБ.',
        author: 'Руководитель ИБ, финтех-компания',
      },
    ],
    footer: {
      note: 'Единый API для 100+ AI-моделей',
      rights: '© 2026 Tech Catalyst. Все права защищены.',
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
)

print(response.choices[0].message.content)`;

function Wrap({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-[1140px] px-6 max-sm:px-[18px] ${className}`}>{children}</div>;
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

  const t = translations[language];

  const stats = [
    { number: '100+', label: t.stats.models, icon: <Brain className="h-5 w-5" /> },
    { number: '12+', label: t.stats.providers, icon: <Server className="h-5 w-5" /> },
    { number: '1 day', label: t.stats.latency, icon: <Clock3 className="h-5 w-5" /> },
    { number: 'RUB', label: t.stats.billing, icon: <CreditCard className="h-5 w-5" /> },
  ];

  const filteredModels =
    activeTab === 'all' ? models : models.filter((model) => model.type === activeTab);

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
    <>
      <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur-md">
        <Wrap className="flex min-h-[68px] items-center gap-6 py-3 max-sm:min-h-[58px]">
          <a href="#" className="flex items-center gap-2 text-lg font-bold tracking-[-0.01em] text-[#222]">
            <span className="text-blue">▲</span>
            <span>
              {t.brand} <span className="text-blue">AI</span>
            </span>
          </a>

          <nav className="ml-auto hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="text-[15px] font-medium text-muted transition-colors hover:text-blue">
                {t.nav[item.key]}
              </a>
            ))}
            <a href="https://docs.techcatalyst.ru" className="text-[15px] font-medium text-muted transition-colors hover:text-blue">
              {t.nav.docs}
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setLanguage(language === 'ru' ? 'en' : 'ru')}
            className="hidden rounded-full border border-line bg-soft px-3.5 py-2 text-[13px] font-semibold text-ink transition-colors hover:border-blue hover:text-blue md:inline-flex"
          >
            {t.nav.language}
          </button>

          <button
            type="button"
            onClick={() => handleCTAClick('header_start')}
            className="hidden rounded-full bg-blue px-5 py-2.5 text-[14.5px] font-semibold text-white transition-all duration-200 hover:-translate-y-px hover:bg-blue-bright hover:shadow-cta md:inline-flex"
          >
            {t.nav.start}
          </button>

          <button
            type="button"
            onClick={handleMenuToggle}
            className="ml-auto inline-flex rounded-full border border-line p-2 text-ink md:hidden"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </Wrap>

        {isMenuOpen ? (
          <div className="border-t border-line bg-white md:hidden">
            <Wrap className="flex flex-col gap-4 py-4">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="text-[15px] font-medium text-muted" onClick={() => setIsMenuOpen(false)}>
                  {t.nav[item.key]}
                </a>
              ))}
              <a href="https://docs.techcatalyst.ru" className="text-[15px] font-medium text-muted">
                {t.nav.docs}
              </a>
              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setLanguage(language === 'ru' ? 'en' : 'ru')}
                  className="rounded-full border border-line bg-soft px-4 py-2 text-[13px] font-semibold text-ink"
                >
                  {t.nav.language}
                </button>
                <button
                  type="button"
                  onClick={() => handleCTAClick('mobile_start')}
                  className="rounded-full bg-blue px-5 py-2 text-[13px] font-semibold text-white"
                >
                  {t.nav.start}
                </button>
              </div>
            </Wrap>
          </div>
        ) : null}
      </header>

      <main>
        <section
          className="overflow-hidden py-24 pb-[84px] max-md:py-12 max-md:pb-11"
          style={{
            background:
              'radial-gradient(900px 460px at 82% -12%, rgba(24,55,218,.07), transparent 60%), #fff',
          }}
        >
          <Wrap className="grid grid-cols-[1.05fr_1fr] items-center gap-14 max-md:grid-cols-1">
            <div>
              <span className="mb-3.5 block text-[13px] font-semibold uppercase tracking-[.12em] text-blue">
                {t.hero.kicker}
              </span>
              <h1 className="mb-5 text-[clamp(34px,4.5vw,56px)] font-bold leading-[1.12] tracking-[-.02em] text-[#222]">
                {t.hero.title}
              </h1>
              <p className="max-w-[660px] text-[clamp(16px,1.6vw,19px)] text-muted">{t.hero.lead}</p>
              <div className="mb-7 mt-8 flex flex-wrap gap-3.5">
                <button
                  type="button"
                  onClick={() => handleCTAClick('hero_primary')}
                  className="inline-flex items-center gap-2 rounded-full bg-blue px-7 py-[13px] text-[15.5px] font-semibold text-white transition-all duration-200 hover:-translate-y-px hover:bg-blue-bright hover:shadow-cta"
                >
                  {t.hero.primary}
                  <ArrowRight className="h-4 w-4" />
                </button>
                <a
                  href="https://docs.techcatalyst.ru"
                  onClick={() => trackCTAClick('hero_docs')}
                  className="inline-flex items-center gap-2 rounded-full border border-[#d6dcec] bg-white px-7 py-[13px] text-[15.5px] font-semibold text-ink transition-all duration-200 hover:border-blue hover:text-blue"
                >
                  {t.hero.secondary}
                </a>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {t.hero.bullets.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-line bg-soft px-3.5 py-1.5 text-[13.5px] font-medium text-muted before:mr-[7px] before:align-[1px] before:text-[9px] before:text-green before:content-['●']"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-panel border border-line bg-white p-6 shadow-panel">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <div className="text-[13px] font-semibold uppercase tracking-[.12em] text-blue">
                    {language === 'ru' ? 'Состояние API' : 'API Snapshot'}
                  </div>
                  <div className="mt-1 text-[28px] font-semibold tracking-[-.02em] text-[#222]">
                    {t.hero.panelTitle}
                  </div>
                </div>
                <div className="rounded-full bg-soft px-3 py-1 text-[12px] font-semibold text-blue">
                  {language === 'ru' ? 'Совместимо с OpenAI' : 'OpenAI-compatible'}
                </div>
              </div>

              <div className="rounded-card border border-line bg-soft p-5">
                <pre className="overflow-x-auto font-mono text-[13px] leading-6 text-[#394150]">
                  <code>{codeSample}</code>
                </pre>
              </div>

              <div className="mt-5 grid gap-3">
                {[
                  { label: language === 'ru' ? 'Маршрут' : 'Route', value: 'OpenAI, Anthropic, Google, xAI, DeepSeek' },
                  {
                    label: language === 'ru' ? 'Расчёты' : 'Billing',
                    value: language === 'ru' ? 'Рубли, счёт, командный биллинг' : 'Rubles, invoice, team billing',
                  },
                  {
                    label: language === 'ru' ? 'Сценарий' : 'Use case',
                    value: language === 'ru' ? 'Рабочий контур, прототип, внутренняя платформа' : 'Prod, prototype, internal platform',
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-start justify-between gap-4 rounded-card border border-line bg-white px-4 py-3">
                    <span className="text-[13px] font-semibold uppercase tracking-[.1em] text-dim">{item.label}</span>
                    <span className="text-right text-[14px] text-ink">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Wrap>
        </section>

        <section className="pb-6">
          <Wrap className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <article key={stat.label} className="rounded-card border border-line bg-white p-6 shadow-card">
                <div className="mb-4 inline-flex rounded-full bg-soft p-3 text-blue">{stat.icon}</div>
                <div className="text-[30px] font-semibold tracking-[-.03em] text-[#222]">{stat.number}</div>
                <div className="mt-1 text-[14px] text-muted">{stat.label}</div>
              </article>
            ))}
          </Wrap>
        </section>

        <section id="features" className="py-20">
          <Wrap>
            <span className="mb-3.5 block text-[13px] font-semibold uppercase tracking-[.12em] text-blue">
              {t.sections.features}
            </span>
            <h2 className="mb-3.5 max-w-[780px] text-[clamp(28px,3.4vw,42px)] font-semibold leading-[1.18] tracking-[-.015em] text-[#222]">
              {t.sections.featuresTitle}
            </h2>
            <p className="max-w-[720px] text-[clamp(16px,1.6vw,19px)] text-muted">{t.sections.featuresLead}</p>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {t.features.map((feature) => (
                <article key={feature.title} className="rounded-card border border-line bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-[3px]">
                  <div className="mb-5 inline-flex rounded-full bg-soft p-3 text-blue">{feature.icon}</div>
                  <h3 className="text-[22px] font-semibold tracking-[-.02em] text-[#222]">{feature.title}</h3>
                  <p className="mt-3 text-[15px] leading-7 text-muted">{feature.text}</p>
                </article>
              ))}
            </div>
          </Wrap>
        </section>

        <section id="integration" className="bg-soft py-20">
          <Wrap className="grid grid-cols-[0.98fr_1.02fr] gap-8 max-lg:grid-cols-1">
            <div>
              <span className="mb-3.5 block text-[13px] font-semibold uppercase tracking-[.12em] text-blue">
                {t.sections.integration}
              </span>
              <h2 className="mb-3.5 text-[clamp(28px,3.4vw,42px)] font-semibold leading-[1.18] tracking-[-.015em] text-[#222]">
                {t.sections.integrationTitle}
              </h2>
              <p className="max-w-[620px] text-[clamp(16px,1.6vw,19px)] text-muted">{t.sections.integrationLead}</p>

              <div className="mt-8 space-y-4">
                {t.steps.map((step, index) => (
                  <div key={step.title} className="rounded-card border border-line bg-white p-5 shadow-card">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue text-sm font-semibold text-white">
                        {index + 1}
                      </div>
                      <h3 className="text-[20px] font-semibold tracking-[-.02em] text-[#222]">{step.title}</h3>
                    </div>
                    <p className="text-[15px] leading-7 text-muted">{step.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-panel border border-line bg-white p-7 shadow-panel">
              <div className="mb-5 flex items-center gap-3">
                <div className="inline-flex rounded-full bg-soft p-3 text-blue">
                  <BadgeCheck className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[22px] font-semibold tracking-[-.02em] text-[#222]">
                    {language === 'ru' ? 'Подходит для миграции' : 'Migration fit'}
                  </div>
                  <div className="text-[14px] text-muted">
                    {language === 'ru' ? 'Тот же шаблон SDK, другой слой маршрутизации' : 'Same SDK pattern, different routing layer'}
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: language === 'ru' ? 'Сохраняете' : 'Keep',
                    items: [
                      language === 'ru' ? 'формат сообщений' : 'message format',
                      language === 'ru' ? 'SDK и клиентские обвязки' : 'SDK and client wrappers',
                      language === 'ru' ? 'продуктовую логику' : 'product logic',
                    ],
                  },
                  {
                    title: language === 'ru' ? 'Получаете' : 'Gain',
                    items: [
                      language === 'ru' ? 'маршрутизацию между провайдерами' : 'cross-provider routing',
                      language === 'ru' ? 'единый биллинг' : 'single billing layer',
                      language === 'ru' ? 'контур для команд и юрлиц' : 'team and enterprise controls',
                    ],
                  },
                ].map((column) => (
                  <div key={column.title} className="rounded-card border border-line bg-soft p-5">
                    <div className="text-[15px] font-semibold uppercase tracking-[.1em] text-blue">{column.title}</div>
                    <ul className="mt-4 space-y-3 text-[15px] text-muted">
                      {column.items.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <Check className="mt-0.5 h-4 w-4 text-green" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </Wrap>
        </section>

        <section id="models" className="py-20">
          <Wrap>
            <span className="mb-3.5 block text-[13px] font-semibold uppercase tracking-[.12em] text-blue">
              {t.sections.models}
            </span>
            <h2 className="mb-3.5 text-[clamp(28px,3.4vw,42px)] font-semibold leading-[1.18] tracking-[-.015em] text-[#222]">
              {t.sections.modelsTitle}
            </h2>
            <p className="max-w-[720px] text-[clamp(16px,1.6vw,19px)] text-muted">{t.sections.modelsLead}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              {(['all', 'text', 'multimodal', 'image'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => handleTabChange(tab)}
                  className={`rounded-full border px-4 py-2 text-[14px] font-semibold transition-all ${
                    activeTab === tab
                      ? 'border-blue bg-blue text-white shadow-cta'
                      : 'border-line bg-white text-ink hover:border-blue hover:text-blue'
                  }`}
                >
                  {t.tabs[tab]}
                </button>
              ))}
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {filteredModels.map((model) => (
                <article key={model.name} className="rounded-card border border-line bg-white p-6 shadow-card">
                  <div className="text-[12px] font-semibold uppercase tracking-[.12em] text-blue">{model.provider}</div>
                  <h3 className="mt-3 text-[22px] font-semibold tracking-[-.02em] text-[#222]">{model.name}</h3>
                  <div className="mt-6 flex items-end justify-between gap-3">
                    <div>
                      <div className="text-[15px] font-semibold text-ink">{model.price}</div>
                      <div className="mt-1 text-[13px] text-dim">{t.tabs.per}</div>
                    </div>
                    <span className="rounded-full border border-line bg-soft px-3 py-1 text-[12px] font-medium text-muted">
                      {t.tabs[model.type]}
                    </span>
                  </div>
                </article>
              ))}
            </div>

            <p className="mt-4 text-[13px] leading-6 text-dim">
              {language === 'ru'
                ? '* Для Gemini 2.5 Pro указана стандартная ставка для запросов до 200k токенов. Для моделей генерации изображений ставка может считаться за одно готовое изображение.'
                : '* Gemini 2.5 Pro shows standard pricing for prompts up to 200k tokens. Image models may charge per generated image.'}
            </p>
          </Wrap>
        </section>

        <section id="pricing" className="bg-soft py-20">
          <Wrap>
            <span className="mb-3.5 block text-[13px] font-semibold uppercase tracking-[.12em] text-blue">
              {t.sections.pricing}
            </span>
            <h2 className="mb-3.5 text-[clamp(28px,3.4vw,42px)] font-semibold leading-[1.18] tracking-[-.015em] text-[#222]">
              {t.sections.pricingTitle}
            </h2>
            <p className="max-w-[720px] text-[clamp(16px,1.6vw,19px)] text-muted">{t.sections.pricingLead}</p>

            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              <article className="rounded-panel border border-line bg-white p-7 shadow-panel">
                <div className="mb-5 inline-flex rounded-full bg-soft p-3 text-blue">
                  <CreditCard className="h-5 w-5" />
                </div>
                <h3 className="text-[26px] font-semibold tracking-[-.02em] text-[#222]">{t.pricing.personalTitle}</h3>
                <ul className="mt-5 space-y-3 text-[15px] text-muted">
                  {t.pricing.personalItems.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-4 w-4 text-green" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => handlePricingClick('personal')}
                  className="mt-7 inline-flex items-center gap-2 rounded-full border border-line bg-soft px-5 py-3 text-[14px] font-semibold text-ink transition-colors hover:border-blue hover:text-blue"
                >
                  {t.pricing.viewPrice}
                  <ChevronRight className="h-4 w-4" />
                </button>
              </article>

              <article className="rounded-panel border border-line bg-white p-7 shadow-panel">
                <div className="mb-5 inline-flex rounded-full bg-soft p-3 text-blue">
                  <Building2 className="h-5 w-5" />
                </div>
                <h3 className="text-[26px] font-semibold tracking-[-.02em] text-[#222]">{t.pricing.businessTitle}</h3>
                <ul className="mt-5 space-y-3 text-[15px] text-muted">
                  {t.pricing.businessItems.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-4 w-4 text-green" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => handlePricingClick('enterprise')}
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-blue px-5 py-3 text-[14px] font-semibold text-white transition-all duration-200 hover:-translate-y-px hover:bg-blue-bright hover:shadow-cta"
                >
                  {t.pricing.contactSales}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </article>
            </div>
          </Wrap>
        </section>

        <section className="py-20">
          <Wrap className="grid gap-5 lg:grid-cols-2">
            <article className="rounded-panel border border-line bg-white p-7 shadow-panel">
              <div className="mb-5 inline-flex rounded-full bg-soft p-3 text-blue">
                <BookOpen className="h-5 w-5" />
              </div>
              <h3 className="text-[26px] font-semibold tracking-[-.02em] text-[#222]">{t.channels.docsTitle}</h3>
              <p className="mt-3 text-[15px] leading-7 text-muted">{t.channels.docsText}</p>
              <a
                href="https://docs.techcatalyst.ru"
                onClick={() => trackCTAClick('channel_docs')}
                className="mt-7 inline-flex items-center gap-2 rounded-full border border-line bg-soft px-5 py-3 text-[14px] font-semibold text-ink transition-colors hover:border-blue hover:text-blue"
              >
                {t.channels.docsButton}
                <ChevronRight className="h-4 w-4" />
              </a>
            </article>

            <article className="rounded-panel border border-line bg-white p-7 shadow-panel">
              <div className="mb-5 inline-flex rounded-full bg-soft p-3 text-blue">
                <Smartphone className="h-5 w-5" />
              </div>
              <h3 className="text-[26px] font-semibold tracking-[-.02em] text-[#222]">{t.channels.chatTitle}</h3>
              <p className="mt-3 text-[15px] leading-7 text-muted">{t.channels.chatText}</p>
              <button
                type="button"
                onClick={() => handleCTAClick('channel_chat')}
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-blue px-5 py-3 text-[14px] font-semibold text-white transition-all duration-200 hover:-translate-y-px hover:bg-blue-bright hover:shadow-cta"
              >
                {t.channels.chatButton}
                <ArrowRight className="h-4 w-4" />
              </button>
            </article>
          </Wrap>
        </section>

        <section id="reviews" className="bg-soft py-20">
          <Wrap>
            <span className="mb-3.5 block text-[13px] font-semibold uppercase tracking-[.12em] text-blue">
              {t.sections.reviews}
            </span>
            <h2 className="mb-3.5 text-[clamp(28px,3.4vw,42px)] font-semibold leading-[1.18] tracking-[-.015em] text-[#222]">
              {t.sections.reviewsTitle}
            </h2>
            <p className="max-w-[720px] text-[clamp(16px,1.6vw,19px)] text-muted">{t.sections.reviewsLead}</p>

            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {t.testimonials.map((item) => (
                <article key={item.quote} className="rounded-card border border-line bg-white p-7 shadow-card">
                  <div className="mb-5 inline-flex rounded-full bg-soft p-3 text-blue">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <p className="text-[16px] leading-7 text-ink">“{item.quote}”</p>
                  <div className="mt-5 text-[14px] font-medium text-muted">{item.author}</div>
                </article>
              ))}
            </div>
          </Wrap>
        </section>

        <section className="py-20">
          <Wrap>
            <div className="rounded-panel border border-line bg-white p-8 shadow-panel sm:p-10">
              <span className="mb-3.5 block text-[13px] font-semibold uppercase tracking-[.12em] text-blue">
                Launch
              </span>
              <h2 className="max-w-[820px] text-[clamp(30px,3.8vw,46px)] font-semibold leading-[1.15] tracking-[-.02em] text-[#222]">
                {t.sections.ctaTitle}
              </h2>
              <p className="mt-4 max-w-[720px] text-[17px] leading-8 text-muted">{t.sections.ctaLead}</p>
              <div className="mt-8 flex flex-wrap gap-3.5">
                <button
                  type="button"
                  onClick={() => handleCTAClick('final_cta')}
                  className="inline-flex items-center gap-2 rounded-full bg-blue px-7 py-[13px] text-[15.5px] font-semibold text-white transition-all duration-200 hover:-translate-y-px hover:bg-blue-bright hover:shadow-cta"
                >
                  {t.nav.start}
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handlePricingClick('latest_price')}
                  className="inline-flex items-center gap-2 rounded-full border border-[#d6dcec] bg-white px-7 py-[13px] text-[15.5px] font-semibold text-ink transition-all duration-200 hover:border-blue hover:text-blue"
                >
                  {t.pricing.viewPrice}
                </button>
              </div>
            </div>
          </Wrap>
        </section>
      </main>

      <footer className="border-t border-line bg-soft py-[38px] text-[14.5px] text-dim">
        <Wrap className="flex flex-wrap items-center justify-between gap-[18px]">
          <div>
            <div className="font-semibold text-ink">{t.brand}</div>
            <div className="mt-1">{t.footer.note}</div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a href="mailto:info@2rm.ru" className="text-blue hover:underline">
              info@2rm.ru
            </a>
            <a href="https://t.me/pillardev" target="_blank" rel="noreferrer" className="text-blue hover:underline">
              Telegram
            </a>
            <span>{t.footer.rights}</span>
          </div>
        </Wrap>
      </footer>

      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        source={modalSource}
        language={language}
      />
    </>
  );
}

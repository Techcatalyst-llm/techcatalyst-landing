'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  Check,
  ChevronRight,
  FileCheck2,
  Globe,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Wallet,
} from 'lucide-react';

import { trackCTAClick } from '@/lib/analytics';
import ApplicationModal from '@/components/Modal/ApplicationModal';

const painCards = [
  {
    title: 'Подписка остановилась, а команда уже ждёт доступ',
    text:
      'Когда вендор недоступен напрямую, у команд встают рабочие процессы, пилоты и продления.',
  },
  {
    title: 'Финансы и закупки не готовы идти в серые схемы',
    text:
      'Нужны понятный контрагент, договор, счёт и пакет документов для согласования сделки.',
  },
  {
    title: 'Непрозрачная комиссия превращает закупку в риск',
    text:
      'Если в КП не разделены стоимость вендора и комиссия, согласование сразу тормозится.',
  },
];

const benefitCards = [
  {
    title: 'Документы для юрлиц',
    text: 'Счёт, договор и закрывающие документы для корпоративной закупки.',
    icon: <Building2 className="h-5 w-5" />,
  },
  {
    title: 'Прозрачное КП',
    text: 'Стоимость лицензий и сервисная комиссия фиксируются отдельно.',
    icon: <Wallet className="h-5 w-5" />,
  },
  {
    title: 'AI, SaaS и лицензии',
    text: 'Подходит для ИТ, продуктовых, дизайнерских и инженерных команд.',
    icon: <Globe className="h-5 w-5" />,
  },
];

const vendorGroups = [
  {
    title: 'AI и LLM-сервисы',
    vendors: ['OpenAI', 'Anthropic Claude', 'Google Gemini', 'xAI Grok', 'DeepSeek'],
  },
  {
    title: 'Рабочие и офисные платформы',
    vendors: ['Microsoft 365', 'Google Workspace', 'Notion', 'Slack', 'Zoom'],
  },
  {
    title: 'Дизайн и продуктовые команды',
    vendors: ['Adobe Creative Cloud', 'Figma', 'Miro', 'Canva Enterprise'],
  },
  {
    title: 'Разработка и инженерия',
    vendors: ['Atlassian', 'JetBrains', 'GitHub', 'Docker', 'Autodesk'],
  },
];

const steps = [
  {
    title: 'Вы присылаете список ПО и требования',
    text: 'Нужны вендор, число лицензий, срок и требования к документам.',
  },
  {
    title: 'Мы собираем маршрут закупки',
    text: 'Проверяем доступность и готовим коммерческое предложение.',
  },
  {
    title: 'Согласовываем стоимость и документы',
    text: 'Фиксируем стоимость, комиссию и формат поставки.',
  },
  {
    title: 'Проводим оплату и сопровождаем продление',
    text: 'После согласования сопровождаем оплату, доступ и продление.',
  },
];

const audienceCards = [
  {
    title: 'Для CFO и финансового блока',
    text: 'Нужны понятная стоимость, комиссия и пакет документов.',
    icon: <Banknote className="h-5 w-5" />,
  },
  {
    title: 'Для ИТ, CIO и CTO',
    text: 'Нужен быстрый доступ к ПО без остановки команд.',
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    title: 'Для закупки и юристов',
    text: 'Нужны понятный контрагент и предсказуемый пакет документов.',
    icon: <FileCheck2 className="h-5 w-5" />,
  },
];

const faqItems = [
  {
    question: 'Какое зарубежное ПО можно закупить через ТехКаталист?',
    answer:
      'AI-сервисы, SaaS и корпоративные лицензии: OpenAI, Claude, Gemini, Microsoft 365, Adobe, Atlassian, Figma и другие.',
  },
  {
    question: 'Подходит ли это для юридических лиц и корпоративного закупочного контура?',
    answer:
      'Да. Работаем с закупкой для юридических лиц: договор, счёт и закрывающие документы.',
  },
  {
    question: 'Можно ли провести продление действующих лицензий?',
    answer:
      'Да. Сопровождаем как первичную закупку, так и продление действующих лицензий.',
  },
  {
    question: 'Что нужно прислать для расчёта?',
    answer:
      'Обычно достаточно вендора, числа лицензий, срока и требований к документам.',
  },
  {
    question: 'Как вы снижаете риск непрозрачной комиссии?',
    answer:
      'В коммерческом предложении отдельно показываем стоимость вендора и сервисную комиссию.',
  },
  {
    question: 'Есть ли отдельный материал для внутреннего согласования?',
    answer:
      'Да. По запросу отправляем презентацию и коммерческие материалы.',
  },
];

function Wrap({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-[1140px] px-6 max-sm:px-[18px] ${className}`}>{children}</div>;
}

export default function ForeignSoftwareProcurementPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState('procurement_unknown');

  const handleCta = (source: string) => {
    trackCTAClick(source);
    setModalSource(source);
    setIsModalOpen(true);
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur-md">
        <Wrap className="flex min-h-[68px] items-center gap-6 py-3 max-sm:min-h-[58px]">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-[-0.01em] text-[#222]">
            <span className="text-blue">▲</span>
            <span>
              ТехКаталист <span className="text-blue">AI</span>
            </span>
          </Link>

          <nav className="ml-auto hidden items-center gap-6 md:flex">
            <Link href="/" className="text-[15px] font-medium text-muted transition-colors hover:text-blue">
              Главная
            </Link>
            <a href="#process" className="text-[15px] font-medium text-muted transition-colors hover:text-blue">
              Как это работает
            </a>
            <a href="#faq" className="text-[15px] font-medium text-muted transition-colors hover:text-blue">
              FAQ
            </a>
            <a href="https://docs.techcatalyst.ru" className="text-[15px] font-medium text-muted transition-colors hover:text-blue">
              Документация
            </a>
          </nav>

          <button
            type="button"
            onClick={() => handleCta('procurement_header')}
            className="hidden rounded-full bg-blue px-5 py-2.5 text-[14.5px] font-semibold text-white transition-all duration-200 hover:-translate-y-px hover:bg-blue-bright hover:shadow-cta md:inline-flex"
          >
            Получить расчёт
          </button>
        </Wrap>
      </header>

      <main>
        <section
          className="overflow-hidden py-24 pb-[84px] max-md:py-12 max-md:pb-11"
          style={{
            background:
              'radial-gradient(860px 440px at 85% -10%, rgba(24,55,218,.08), transparent 60%), radial-gradient(580px 260px at 5% 10%, rgba(255,105,0,.08), transparent 55%), #fff',
          }}
        >
          <Wrap className="grid grid-cols-[1.06fr_.94fr] items-center gap-14 max-lg:grid-cols-1">
            <div>
              <span className="mb-3.5 block text-[13px] font-semibold uppercase tracking-[.12em] text-blue">
                Корпоративная закупка и продление лицензий
              </span>
              <h1 className="mb-5 text-[clamp(34px,4.6vw,56px)] font-bold leading-[1.08] tracking-[-.02em] text-[#222]">
                Закупка зарубежного ПО для юридических лиц: AI-сервисы, SaaS и иностранные лицензии.
              </h1>
              <p className="max-w-[700px] text-[clamp(16px,1.6vw,19px)] leading-8 text-muted">
                Поставляем лицензии и подписки для бизнеса: от OpenAI, Claude и Gemini до Microsoft 365, Adobe и
                Atlassian. Счёт, договор, закрывающие документы и понятное коммерческое предложение.
              </p>

              <div className="mb-7 mt-8 flex flex-wrap gap-3.5">
                <button
                  type="button"
                  onClick={() => handleCta('procurement_hero_primary')}
                  className="inline-flex items-center gap-2 rounded-full bg-blue px-7 py-[13px] text-[15.5px] font-semibold text-white transition-all duration-200 hover:-translate-y-px hover:bg-blue-bright hover:shadow-cta"
                >
                  Получить расчёт закупки
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleCta('procurement_hero_kp')}
                  className="inline-flex items-center gap-2 rounded-full border border-[#d6dcec] bg-white px-7 py-[13px] text-[15.5px] font-semibold text-ink transition-all duration-200 hover:border-blue hover:text-blue"
                >
                  Запросить коммерческое предложение
                </button>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {[
                  'Оплата по счёту и договору',
                  'Закрывающие документы для юрлиц',
                  'Подходит для CIO, CFO и закупки',
                  'AI, SaaS и корпоративные лицензии',
                ].map((item) => (
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
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <div className="text-[13px] font-semibold uppercase tracking-[.12em] text-blue">Корпоративный контур</div>
                  <div className="mt-1 text-[28px] font-semibold tracking-[-.02em] text-[#222]">
                    Что входит
                  </div>
                </div>
                <div className="rounded-full bg-soft px-3 py-1 text-[12px] font-semibold text-blue">
                  Закупка для бизнеса
                </div>
              </div>

              <div className="grid gap-3">
                {[
                  {
                    label: 'Документы',
                    value: 'Счёт, договор и коммерческое предложение.',
                  },
                  {
                    label: 'Сценарии',
                    value: 'Первичная закупка, продление лицензий, AI- и SaaS-подписки.',
                  },
                  {
                    label: 'Прозрачность',
                    value: 'Стоимость вендора и сервисная комиссия видны заранее.',
                  },
                ].map((item) => (
                  <div key={item.label} className="rounded-card border border-line bg-soft px-4 py-4">
                    <div className="text-[13px] font-semibold uppercase tracking-[.1em] text-blue">{item.label}</div>
                    <div className="mt-2 text-[15px] leading-7 text-muted">{item.value}</div>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-card border border-[rgba(24,55,218,.12)] bg-[rgba(24,55,218,.04)] p-5">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 inline-flex rounded-full bg-white p-2 text-blue shadow-card">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-[18px] font-semibold tracking-[-.02em] text-[#222]">
                      Понятный маршрут сделки
                    </div>
                    <p className="mt-2 text-[15px] leading-7 text-muted">
                      От запроса на лицензии до оплаты, поставки и продления.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Wrap>
        </section>

        <section className="pb-6">
          <Wrap className="grid gap-4 md:grid-cols-3">
            {benefitCards.map((item) => (
              <article key={item.title} className="rounded-card border border-line bg-white p-6 shadow-card">
                <div className="mb-4 inline-flex rounded-full bg-soft p-3 text-blue">{item.icon}</div>
                <h2 className="text-[24px] font-semibold tracking-[-.02em] text-[#222]">{item.title}</h2>
                <p className="mt-3 text-[15px] leading-7 text-muted">{item.text}</p>
              </article>
            ))}
          </Wrap>
        </section>

        <section className="py-20">
          <Wrap>
            <span className="mb-3.5 block text-[13px] font-semibold uppercase tracking-[.12em] text-blue">
              Какие проблемы мы закрываем
            </span>
            <h2 className="mb-3.5 max-w-[860px] text-[clamp(28px,3.4vw,42px)] font-semibold leading-[1.18] tracking-[-.015em] text-[#222]">
              Где чаще всего тормозится закупка
            </h2>
            <p className="max-w-[780px] text-[clamp(16px,1.6vw,19px)] text-muted">
              Доступ к вендору, документы и прозрачность стоимости должны быть понятны сразу.
            </p>

            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {painCards.map((item) => (
                <article key={item.title} className="rounded-card border border-line bg-white p-7 shadow-card">
                  <div className="mb-5 inline-flex rounded-full bg-soft p-3 text-blue">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <h3 className="text-[22px] font-semibold tracking-[-.02em] text-[#222]">{item.title}</h3>
                  <p className="mt-3 text-[15px] leading-7 text-muted">{item.text}</p>
                </article>
              ))}
            </div>
          </Wrap>
        </section>

        <section className="bg-soft py-20">
          <Wrap className="grid grid-cols-[1fr_.98fr] gap-8 max-lg:grid-cols-1">
            <div>
              <span className="mb-3.5 block text-[13px] font-semibold uppercase tracking-[.12em] text-blue">
                Кому подходит услуга
              </span>
              <h2 className="mb-3.5 text-[clamp(28px,3.4vw,42px)] font-semibold leading-[1.18] tracking-[-.015em] text-[#222]">
                Для компаний, которые регулярно закупают зарубежное ПО.
              </h2>
              <p className="max-w-[700px] text-[clamp(16px,1.6vw,19px)] text-muted">
                Закрываем задачи ИТ, финансового блока, закупки и юридической функции.
              </p>
            </div>

            <div className="grid gap-4">
              {audienceCards.map((item) => (
                <article key={item.title} className="rounded-card border border-line bg-white p-6 shadow-card">
                  <div className="mb-4 inline-flex rounded-full bg-soft p-3 text-blue">{item.icon}</div>
                  <h3 className="text-[22px] font-semibold tracking-[-.02em] text-[#222]">{item.title}</h3>
                  <p className="mt-3 text-[15px] leading-7 text-muted">{item.text}</p>
                </article>
              ))}
            </div>
          </Wrap>
        </section>

        <section className="py-20">
          <Wrap>
            <span className="mb-3.5 block text-[13px] font-semibold uppercase tracking-[.12em] text-blue">
              Какие вендоры и сценарии
            </span>
            <h2 className="mb-3.5 text-[clamp(28px,3.4vw,42px)] font-semibold leading-[1.18] tracking-[-.015em] text-[#222]">
              Какие сервисы и лицензии можно закупать
            </h2>
            <p className="max-w-[780px] text-[clamp(16px,1.6vw,19px)] text-muted">
              Работаем с AI-платформами, SaaS и корпоративными лицензиями.
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {vendorGroups.map((group) => (
                <article key={group.title} className="rounded-card border border-line bg-white p-7 shadow-card">
                  <div className="mb-4 inline-flex rounded-full bg-soft p-3 text-blue">
                    <BriefcaseBusiness className="h-5 w-5" />
                  </div>
                  <h3 className="text-[24px] font-semibold tracking-[-.02em] text-[#222]">{group.title}</h3>
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    {group.vendors.map((vendor) => (
                      <span
                        key={vendor}
                        className="rounded-full border border-line bg-soft px-3.5 py-1.5 text-[13.5px] font-medium text-muted"
                      >
                        {vendor}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </Wrap>
        </section>

        <section id="process" className="bg-soft py-20">
          <Wrap>
            <span className="mb-3.5 block text-[13px] font-semibold uppercase tracking-[.12em] text-blue">
              Как это работает
            </span>
            <h2 className="mb-3.5 text-[clamp(28px,3.4vw,42px)] font-semibold leading-[1.18] tracking-[-.015em] text-[#222]">
              Как проходит закупка
            </h2>
            <p className="max-w-[760px] text-[clamp(16px,1.6vw,19px)] text-muted">
              Четыре шага от запроса до поставки.
            </p>

            <div className="mt-10 grid gap-4 lg:grid-cols-2">
              {steps.map((step, index) => (
                <article key={step.title} className="rounded-card border border-line bg-white p-7 shadow-card">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue text-sm font-semibold text-white">
                      {index + 1}
                    </div>
                    <h3 className="text-[22px] font-semibold tracking-[-.02em] text-[#222]">{step.title}</h3>
                  </div>
                  <p className="text-[15px] leading-7 text-muted">{step.text}</p>
                </article>
              ))}
            </div>
          </Wrap>
        </section>

        <section className="py-20">
          <Wrap className="grid gap-5 lg:grid-cols-2">
            <article className="rounded-panel border border-line bg-white p-7 shadow-panel">
              <div className="mb-5 inline-flex rounded-full bg-soft p-3 text-blue">
                <BookOpen className="h-5 w-5" />
              </div>
              <h3 className="text-[26px] font-semibold tracking-[-.02em] text-[#222]">
                Материалы для внутреннего согласования
              </h3>
              <p className="mt-3 text-[15px] leading-7 text-muted">
                Подготовим презентацию и материалы для CIO, CFO, закупки и ИБ.
              </p>
              <button
                type="button"
                onClick={() => handleCta('procurement_materials')}
                className="mt-7 inline-flex items-center gap-2 rounded-full border border-line bg-soft px-5 py-3 text-[14px] font-semibold text-ink transition-colors hover:border-blue hover:text-blue"
              >
                Запросить материалы
                <ChevronRight className="h-4 w-4" />
              </button>
            </article>

            <article className="rounded-panel border border-line bg-white p-7 shadow-panel">
              <div className="mb-5 inline-flex rounded-full bg-soft p-3 text-blue">
                <BadgeCheck className="h-5 w-5" />
              </div>
              <h3 className="text-[26px] font-semibold tracking-[-.02em] text-[#222]">Удобный формат первого контакта</h3>
              <p className="mt-3 text-[15px] leading-7 text-muted">
                Можно отправить запрос через форму, почту или Telegram.
              </p>
              <div className="mt-7 flex flex-wrap gap-3.5">
                <a
                  href="mailto:info@2rm.ru"
                  onClick={() => trackCTAClick('procurement_email')}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-soft px-5 py-3 text-[14px] font-semibold text-ink transition-colors hover:border-blue hover:text-blue"
                >
                  info@2rm.ru
                </a>
                <a
                  href="https://t.me/pillardev"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackCTAClick('procurement_telegram')}
                  className="inline-flex items-center gap-2 rounded-full bg-blue px-5 py-3 text-[14px] font-semibold text-white transition-all duration-200 hover:-translate-y-px hover:bg-blue-bright hover:shadow-cta"
                >
                  Telegram
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </article>
          </Wrap>
        </section>

        <section id="faq" className="bg-soft py-20">
          <Wrap>
            <span className="mb-3.5 block text-[13px] font-semibold uppercase tracking-[.12em] text-blue">
              FAQ
            </span>
            <h2 className="mb-3.5 text-[clamp(28px,3.4vw,42px)] font-semibold leading-[1.18] tracking-[-.015em] text-[#222]">
              Частые вопросы
            </h2>
            <p className="max-w-[760px] text-[clamp(16px,1.6vw,19px)] text-muted">
              Коротко о документах, продлениях и формате закупки.
            </p>

            <div className="mt-10 grid gap-4">
              {faqItems.map((item) => (
                <article key={item.question} className="rounded-card border border-line bg-white p-7 shadow-card">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="inline-flex rounded-full bg-soft p-2 text-blue">
                      <MessageSquare className="h-4 w-4" />
                    </div>
                    <h3 className="text-[22px] font-semibold tracking-[-.02em] text-[#222]">{item.question}</h3>
                  </div>
                  <p className="text-[15px] leading-7 text-muted">{item.answer}</p>
                </article>
              ))}
            </div>
          </Wrap>
        </section>

        <section className="py-20">
          <Wrap>
            <div className="rounded-panel border border-line bg-white p-8 shadow-panel sm:p-10">
              <span className="mb-3.5 block text-[13px] font-semibold uppercase tracking-[.12em] text-blue">
                Запрос на закупку
              </span>
              <h2 className="max-w-[860px] text-[clamp(30px,3.8vw,46px)] font-semibold leading-[1.15] tracking-[-.02em] text-[#222]">
                Нужно закупить зарубежное ПО?
              </h2>
              <p className="mt-4 max-w-[760px] text-[17px] leading-8 text-muted">
                Отправьте вендора, число лицензий и требования к документам. Подготовим расчёт и коммерческое предложение.
              </p>
              <div className="mt-8 flex flex-wrap gap-3.5">
                <button
                  type="button"
                  onClick={() => handleCta('procurement_final_primary')}
                  className="inline-flex items-center gap-2 rounded-full bg-blue px-7 py-[13px] text-[15.5px] font-semibold text-white transition-all duration-200 hover:-translate-y-px hover:bg-blue-bright hover:shadow-cta"
                >
                  Получить маршрут закупки
                  <ArrowRight className="h-4 w-4" />
                </button>
                <Link
                  href="/"
                  onClick={() => trackCTAClick('procurement_back_home')}
                  className="inline-flex items-center gap-2 rounded-full border border-[#d6dcec] bg-white px-7 py-[13px] text-[15.5px] font-semibold text-ink transition-all duration-200 hover:border-blue hover:text-blue"
                >
                  Вернуться на главную
                </Link>
              </div>
            </div>
          </Wrap>
        </section>
      </main>

      <footer className="border-t border-line bg-soft py-[38px] text-[14.5px] text-dim">
        <Wrap className="flex flex-wrap items-center justify-between gap-[18px]">
          <div>
            <div className="font-semibold text-ink">ТехКаталист</div>
            <div className="mt-1">Закупка зарубежного ПО для юридических лиц</div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a href="mailto:info@2rm.ru" className="text-blue hover:underline">
              info@2rm.ru
            </a>
            <a href="https://t.me/pillardev" target="_blank" rel="noreferrer" className="text-blue hover:underline">
              Telegram
            </a>
            <span>© 2026 ТехКаталист. Все права защищены.</span>
          </div>
        </Wrap>
      </footer>

      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        source={modalSource}
        language="ru"
        variant="procurement"
      />
    </>
  );
}

'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Inter, Lora } from 'next/font/google';
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  ChevronRight,
  FileText,
  Globe,
  MessageSquare,
  ShieldCheck,
  Wallet,
} from 'lucide-react';

import { trackCTAClick } from '@/lib/analytics';
import ApplicationModal from '@/components/Modal/ApplicationModal';

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

const overviewCards = [
  {
    title: 'Счёт и договор',
    text: 'Документы для корпоративной закупки и внутреннего согласования.',
    icon: <FileText className="h-4 w-4" />,
  },
  {
    title: 'Прозрачное КП',
    text: 'Стоимость вендора и сервисная комиссия показаны отдельно.',
    icon: <Wallet className="h-4 w-4" />,
  },
  {
    title: 'Продление лицензий',
    text: 'Подходит для первичной закупки и повторных продлений.',
    icon: <BadgeCheck className="h-4 w-4" />,
  },
];

const painRows = [
  {
    title: 'Доступ к вендору',
    text: 'Когда прямой платёж не проходит, команда остаётся без лицензий. Мы собираем рабочий маршрут закупки и продления.',
  },
  {
    title: 'Документы для юрлица',
    text: 'Финансовому блоку и закупке нужны счёт, договор и закрывающие документы. Это должно быть понятно до старта сделки.',
  },
  {
    title: 'Честная экономика',
    text: 'Коммерческое предложение должно сразу показывать стоимость вендора и сервисную комиссию без скрытых строк.',
  },
];

const audienceCards = [
  {
    title: 'Финансовый блок',
    text: 'Понятная стоимость и пакет документов.',
    icon: <Wallet className="h-4 w-4" />,
  },
  {
    title: 'ИТ и техдирекция',
    text: 'Быстрый доступ к нужному ПО для команд.',
    icon: <ShieldCheck className="h-4 w-4" />,
  },
  {
    title: 'Закупка и юристы',
    text: 'Предсказуемый контрагент и формат сделки.',
    icon: <Building2 className="h-4 w-4" />,
  },
];

const vendorGroups = [
  {
    id: 'ai',
    label: 'ИИ и языковые модели',
    items: ['OpenAI', 'Claude', 'Gemini', 'Grok', 'DeepSeek'],
  },
  {
    id: 'workspace',
    label: 'Рабочие сервисы',
    items: ['Microsoft 365', 'Google Workspace', 'Notion', 'Slack', 'Zoom'],
  },
  {
    id: 'design',
    label: 'Дизайн',
    items: ['Adobe Creative Cloud', 'Figma', 'Miro', 'Canva Enterprise'],
  },
  {
    id: 'dev',
    label: 'Разработка',
    items: ['Atlassian', 'JetBrains', 'GitHub', 'Docker', 'Autodesk'],
  },
] as const;

const steps = [
  {
    title: '1. Запрос',
    text: 'Вы присылаете вендора, число лицензий и требования к документам.',
  },
  {
    title: '2. Расчёт',
    text: 'Мы готовим маршрут закупки и коммерческое предложение.',
  },
  {
    title: '3. Согласование',
    text: 'Фиксируем стоимость, комиссию и формат поставки.',
  },
  {
    title: '4. Поставка',
    text: 'Сопровождаем оплату, доступ и продление.',
  },
];

const faqItems = [
  {
    question: 'Какое ПО можно закупить через ТехКаталист?',
    answer: 'ИИ-сервисы, облачные продукты и корпоративные лицензии: OpenAI, Claude, Gemini, Microsoft 365, Adobe, Atlassian, Figma и другие.',
  },
  {
    question: 'Подходит ли это для юридических лиц?',
    answer: 'Да. Работаем со счётом, договором и закрывающими документами для корпоративной закупки.',
  },
  {
    question: 'Можно ли продлевать действующие лицензии?',
    answer: 'Да. Сопровождаем как первичную закупку, так и продление действующих подписок.',
  },
  {
    question: 'Что нужно для расчёта?',
    answer: 'Обычно достаточно вендора, числа лицензий, срока и требований к документам.',
  },
];

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

export default function ForeignSoftwareProcurementPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState('procurement_unknown');
  const [activeVendorGroup, setActiveVendorGroup] = useState<(typeof vendorGroups)[number]['id']>('ai');

  const handleCta = (source: string) => {
    trackCTAClick(source);
    setModalSource(source);
    setIsModalOpen(true);
  };

  const activeGroup = vendorGroups.find((item) => item.id === activeVendorGroup) ?? vendorGroups[0];

  return (
    <div
      className={`${inter.className} bg-white text-[#1c1d1f]`}
      style={{ fontFeatureSettings: '"ss03"' }}
    >
      <header className="sticky top-0 z-50 border-b border-[#e4e7ec] bg-white/92 backdrop-blur-md">
        <Wrap className="flex min-h-[72px] items-center gap-6">
          <Link href="/" className="text-[16px] font-semibold tracking-[-0.01em] text-[#1c1d1f]">
            ТехКаталист
          </Link>

          <nav className="ml-auto hidden items-center gap-2 md:flex">
            <Link
              href="/"
              className="rounded-[10px] px-[10px] py-[6px] text-[14px] font-medium text-[#6f7988] transition-colors hover:bg-[#f3f4f6] hover:text-[#1c1d1f]"
            >
              Главная
            </Link>
            <a
              href="#vendors"
              className="rounded-[10px] px-[10px] py-[6px] text-[14px] font-medium text-[#6f7988] transition-colors hover:bg-[#f3f4f6] hover:text-[#1c1d1f]"
            >
              Вендоры
            </a>
            <a
              href="#process"
              className="rounded-[10px] px-[10px] py-[6px] text-[14px] font-medium text-[#6f7988] transition-colors hover:bg-[#f3f4f6] hover:text-[#1c1d1f]"
            >
              Процесс
            </a>
            <a
              href="#faq"
              className="rounded-[10px] px-[10px] py-[6px] text-[14px] font-medium text-[#6f7988] transition-colors hover:bg-[#f3f4f6] hover:text-[#1c1d1f]"
            >
              Вопросы
            </a>
            <a
              href="https://docs.techcatalyst.ru"
              className="rounded-[10px] px-[10px] py-[6px] text-[14px] font-medium text-[#6f7988] transition-colors hover:bg-[#f3f4f6] hover:text-[#1c1d1f]"
            >
              Документация
            </a>
          </nav>

          <PrimaryButton onClick={() => handleCta('procurement_header')} className="hidden md:inline-flex">
            Рассчитать стоимость
          </PrimaryButton>
        </Wrap>
      </header>

      <main>
        <section className="border-b border-[#e4e7ec]">
          <Wrap className="py-[80px] md:py-[100px]">
            <div className="mx-auto max-w-[980px] text-center">
              <div className="mb-4 text-[12px] font-medium uppercase tracking-[0.08em] text-[#407ff2]">
                Закупка зарубежного ПО для юридических лиц
              </div>
              <h1
                className={`${lora.className} mx-auto max-w-[900px] text-[40px] font-medium leading-[1.1] tracking-[-0.6px] text-[#1c1d1f] md:text-[56px] md:tracking-[-1.12px]`}
                style={{ fontFeatureSettings: '"ss03"' }}
              >
                Закупим и продлим иностранное ПО для вашего юрлица
              </h1>
              <p className="mx-auto mt-5 max-w-[780px] text-[16px] leading-[1.5] tracking-[-0.24px] text-[#6f7988] md:text-[20px] md:leading-[1.3] md:tracking-[-0.4px]">
                OpenAI, Claude, Gemini, Microsoft 365, Adobe, Atlassian и другие сервисы. Счёт, договор, закрывающие документы и понятное коммерческое предложение.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <PrimaryButton onClick={() => handleCta('procurement_hero_primary')}>
                  Рассчитать стоимость закупки
                  <ArrowRight className="h-4 w-4" />
                </PrimaryButton>
                <SecondaryButton onClick={() => handleCta('procurement_hero_secondary')}>
                  Получить презентацию
                </SecondaryButton>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-[12px] leading-[1.5] tracking-[-0.14px] text-[#8f99a8]">
                {['OpenAI', 'Claude', 'Microsoft 365', 'Adobe', 'Закрывающие документы'].map((item) => (
                  <span key={item} className="rounded-[4px] border border-[#e4e7ec] bg-white px-2 py-1">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <Card className="mx-auto mt-12 max-w-[1120px] p-4 md:p-5">
              <div className="grid gap-4 lg:grid-cols-[1.2fr_.8fr]">
                <div className="rounded-[8px] border border-[#e4e7ec] bg-[#f3f4f6] p-4">
                  <div className="flex items-center justify-between border-b border-[#d3d8df] pb-3">
                    <div>
                      <div className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#8f99a8]">Запрос на закупку</div>
                      <div className="mt-1 text-[20px] font-medium leading-[1.3] tracking-[-0.4px] text-[#1c1d1f]">
                        Запрос на закупку
                      </div>
                    </div>
                    <div className="rounded-[4px] border border-[#d3d8df] bg-white px-2 py-1 text-[12px] text-[#6f7988]">
                      Для бизнеса
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 md:grid-cols-3">
                    {[
                      ['Вендоры', 'OpenAI, Claude, Microsoft 365'],
                      ['Документы', 'Счёт, договор, закрывающие'],
                      ['Сценарии', 'Закупка и продление лицензий'],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-[8px] border border-[#e4e7ec] bg-white p-4">
                        <div className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#8f99a8]">{label}</div>
                        <div className="mt-2 text-[15px] leading-[1.47] tracking-[-0.15px] text-[#1c1d1f]">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-3">
                  {[
                    ['Что входит', 'Маршрут закупки, расчёт стоимости и сопровождение сделки.'],
                    ['Формат сделки', 'Коммерческое предложение с отдельной сервисной комиссией.'],
                    ['Кому подходит', 'ИТ, финансы, закупка, юридическая функция.'],
                  ].map(([title, text]) => (
                    <div key={title} className="rounded-[8px] border border-[#e4e7ec] bg-white p-4">
                      <div className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#8f99a8]">{title}</div>
                      <div className="mt-2 text-[15px] leading-[1.47] tracking-[-0.15px] text-[#1c1d1f]">{text}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </Wrap>
        </section>

        <section className="py-[80px] md:py-[96px]">
          <Wrap>
            <div className="max-w-[720px]">
              <div className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#407ff2]">Что вы получаете</div>
              <h2
                className={`${lora.className} mt-4 text-[28px] font-medium leading-[1.23] tracking-[-0.42px] text-[#1c1d1f] md:text-[40px] md:leading-[1.1] md:tracking-[-0.6px]`}
                style={{ fontFeatureSettings: '"ss03"' }}
              >
                Компактный и понятный контур закупки
              </h2>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {overviewCards.map((item) => (
                <Card key={item.title} className="p-4">
                  <div className="inline-flex rounded-[8px] border border-[#e4e7ec] bg-[#f3f4f6] p-2 text-[#505967]">
                    {item.icon}
                  </div>
                  <h3 className="mt-4 text-[20px] font-medium leading-[1.3] tracking-[-0.4px] text-[#1c1d1f]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-[1.43] tracking-[-0.14px] text-[#6f7988]">{item.text}</p>
                </Card>
              ))}
            </div>
          </Wrap>
        </section>

        <section className="border-y border-[#e4e7ec] bg-[#f3f4f6] py-[80px] md:py-[96px]">
          <Wrap>
            <div className="max-w-[760px]">
              <div className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#407ff2]">Где тормозится закупка</div>
              <h2
                className={`${lora.className} mt-4 text-[28px] font-medium leading-[1.23] tracking-[-0.42px] text-[#1c1d1f] md:text-[40px] md:leading-[1.1] md:tracking-[-0.6px]`}
                style={{ fontFeatureSettings: '"ss03"' }}
              >
                Три зоны, где сделка обычно теряет скорость
              </h2>
            </div>

            <div className="mt-8 grid gap-3">
              {painRows.map((item) => (
                <Card key={item.title} className="grid gap-4 p-4 md:grid-cols-[260px_1fr] md:items-start">
                  <div className="text-[20px] font-medium leading-[1.3] tracking-[-0.4px] text-[#1c1d1f]">{item.title}</div>
                  <p className="text-[15px] leading-[1.47] tracking-[-0.15px] text-[#6f7988]">{item.text}</p>
                </Card>
              ))}
            </div>
          </Wrap>
        </section>

        <section className="py-[80px] md:py-[96px]">
          <Wrap>
            <div className="grid gap-8 lg:grid-cols-[.82fr_1.18fr]">
              <div className="max-w-[560px]">
                <div className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#407ff2]">Кому подходит</div>
                <h2
                  className={`${lora.className} mt-4 text-[28px] font-medium leading-[1.23] tracking-[-0.42px] text-[#1c1d1f] md:text-[40px] md:leading-[1.1] md:tracking-[-0.6px]`}
                  style={{ fontFeatureSettings: '"ss03"' }}
                >
                  Для команд, которые регулярно закупают зарубежное ПО
                </h2>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {audienceCards.map((item) => (
                  <Card key={item.title} className="p-4">
                    <div className="inline-flex rounded-[8px] border border-[#e4e7ec] bg-[#f3f4f6] p-2 text-[#505967]">
                      {item.icon}
                    </div>
                    <h3 className="mt-4 text-[20px] font-medium leading-[1.3] tracking-[-0.4px] text-[#1c1d1f]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-[1.43] tracking-[-0.14px] text-[#6f7988]">{item.text}</p>
                  </Card>
                ))}
              </div>
            </div>
          </Wrap>
        </section>

        <section id="vendors" className="border-y border-[#e4e7ec] bg-white py-[80px] md:py-[96px]">
          <Wrap>
            <div className="max-w-[760px]">
              <div className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#407ff2]">Вендоры и сценарии</div>
              <h2
                className={`${lora.className} mt-4 text-[28px] font-medium leading-[1.23] tracking-[-0.42px] text-[#1c1d1f] md:text-[40px] md:leading-[1.1] md:tracking-[-0.6px]`}
                style={{ fontFeatureSettings: '"ss03"' }}
              >
                Что можно закупать и продлевать
              </h2>
            </div>

            <div className="mt-8 border-b border-[#d3d8df]">
              <div className="flex flex-wrap gap-6">
                {vendorGroups.map((group) => (
                  <button
                    key={group.id}
                    type="button"
                    onClick={() => setActiveVendorGroup(group.id)}
                    className={`border-b-2 px-0 pb-3 text-[15px] font-medium tracking-[-0.15px] transition-colors ${
                      activeVendorGroup === group.id
                        ? 'border-[#1c1d1f] text-[#1c1d1f]'
                        : 'border-transparent text-[#6f7988] hover:text-[#1c1d1f]'
                    }`}
                  >
                    {group.label}
                  </button>
                ))}
              </div>
            </div>

            <Card className="mt-6 p-4">
              <div className="grid gap-4 lg:grid-cols-[300px_1fr]">
                <div>
                  <div className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#8f99a8]">Категория</div>
                  <div className="mt-2 text-[20px] font-medium leading-[1.3] tracking-[-0.4px] text-[#1c1d1f]">
                    {activeGroup.label}
                  </div>
                  <p className="mt-2 text-[14px] leading-[1.43] tracking-[-0.14px] text-[#6f7988]">
                    Подбираем маршрут под конкретный вендор и формат лицензирования.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {activeGroup.items.map((item) => (
                    <div key={item} className="rounded-[4px] border border-[#d3d8df] bg-[#f3f4f6] px-3 py-2 text-[14px] text-[#1c1d1f]">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </Wrap>
        </section>

        <section id="process" className="bg-[#f3f4f6] py-[80px] md:py-[96px]">
          <Wrap>
            <div className="max-w-[720px]">
              <div className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#407ff2]">Процесс</div>
              <h2
                className={`${lora.className} mt-4 text-[28px] font-medium leading-[1.23] tracking-[-0.42px] text-[#1c1d1f] md:text-[40px] md:leading-[1.1] md:tracking-[-0.6px]`}
                style={{ fontFeatureSettings: '"ss03"' }}
              >
                От запроса до поставки
              </h2>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {steps.map((step) => (
                <Card key={step.title} className="p-4">
                  <div className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#8f99a8]">{step.title}</div>
                  <p className="mt-3 text-[15px] leading-[1.47] tracking-[-0.15px] text-[#1c1d1f]">{step.text}</p>
                </Card>
              ))}
            </div>
          </Wrap>
        </section>

        <section className="py-[80px] md:py-[96px]">
          <Wrap className="grid gap-4 lg:grid-cols-2">
            <Card className="p-4">
              <div className="inline-flex rounded-[8px] border border-[#e4e7ec] bg-[#f3f4f6] p-2 text-[#505967]">
                <MessageSquare className="h-4 w-4" />
              </div>
              <h3 className="mt-4 text-[20px] font-medium leading-[1.3] tracking-[-0.4px] text-[#1c1d1f]">
                Материалы для согласования
              </h3>
              <p className="mt-2 text-[14px] leading-[1.43] tracking-[-0.14px] text-[#6f7988]">
                Подготовим презентацию и коммерческие материалы для финансового блока, ИТ, закупки и ИБ.
              </p>
              <SecondaryButton onClick={() => handleCta('procurement_materials')} className="mt-6">
                Получить презентацию
                <ChevronRight className="h-4 w-4" />
              </SecondaryButton>
            </Card>

            <Card className="p-4">
              <div className="inline-flex rounded-[8px] border border-[#e4e7ec] bg-[#f3f4f6] p-2 text-[#505967]">
                <Globe className="h-4 w-4" />
              </div>
              <h3 className="mt-4 text-[20px] font-medium leading-[1.3] tracking-[-0.4px] text-[#1c1d1f]">
                Первый контакт
              </h3>
              <p className="mt-2 text-[14px] leading-[1.43] tracking-[-0.14px] text-[#6f7988]">
                Можно отправить запрос через форму, почту или Telegram.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="mailto:info@2rm.ru"
                  onClick={() => trackCTAClick('procurement_email')}
                  className="inline-flex items-center rounded-[10px] border border-[#d3d8df] px-3 py-2 text-[14px] font-medium text-[#1c1d1f] transition-colors hover:bg-[#f3f4f6]"
                >
                  info@2rm.ru
                </a>
                <a
                  href="https://t.me/pillardev"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackCTAClick('procurement_telegram')}
                  className="inline-flex items-center gap-2 rounded-[10px] border border-[#1c1d1f] bg-[#1c1d1f] px-3 py-2 text-[14px] font-medium text-white transition-colors hover:bg-black"
                >
                  Telegram
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </Card>
          </Wrap>
        </section>

        <section id="faq" className="border-y border-[#e4e7ec] bg-[#f3f4f6] py-[80px] md:py-[96px]">
          <Wrap>
            <div className="max-w-[720px]">
              <div className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#407ff2]">Вопросы</div>
              <h2
                className={`${lora.className} mt-4 text-[28px] font-medium leading-[1.23] tracking-[-0.42px] text-[#1c1d1f] md:text-[40px] md:leading-[1.1] md:tracking-[-0.6px]`}
                style={{ fontFeatureSettings: '"ss03"' }}
              >
                Частые вопросы
              </h2>
            </div>

            <Card className="mt-8 overflow-hidden">
              {faqItems.map((item, index) => (
                <details key={item.question} className={`${index !== 0 ? 'border-t border-[#e4e7ec]' : ''} group`}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 text-[16px] font-medium tracking-[-0.24px] text-[#1c1d1f]">
                    <span>{item.question}</span>
                    <span className="text-[#6f7988] transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <div className="px-4 pb-4 text-[14px] leading-[1.43] tracking-[-0.14px] text-[#6f7988]">
                    {item.answer}
                  </div>
                </details>
              ))}
            </Card>
          </Wrap>
        </section>

        <section className="py-[80px] md:py-[96px]">
          <Wrap>
            <Card className="mx-auto max-w-[1120px] p-5 md:p-6">
              <div className="max-w-[760px]">
                <div className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#407ff2]">Запрос на закупку</div>
                <h2
                  className={`${lora.className} mt-4 text-[28px] font-medium leading-[1.23] tracking-[-0.42px] text-[#1c1d1f] md:text-[40px] md:leading-[1.1] md:tracking-[-0.6px]`}
                  style={{ fontFeatureSettings: '"ss03"' }}
                >
                  Отправьте список ПО на расчёт
                </h2>
                <p className="mt-3 text-[16px] leading-[1.5] tracking-[-0.24px] text-[#6f7988]">
                  Пришлите вендора, число лицензий и требования к документам. Подготовим расчёт и коммерческое предложение.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <PrimaryButton onClick={() => handleCta('procurement_final_primary')}>
                  Отправить список ПО
                  <ArrowRight className="h-4 w-4" />
                </PrimaryButton>
                <SecondaryButton onClick={() => handleCta('procurement_final_secondary')}>
                  Получить презентацию
                </SecondaryButton>
              </div>
            </Card>
          </Wrap>
        </section>
      </main>

      <footer className="bg-[#000000] py-12 text-[14px]">
        <Wrap className="grid gap-10 md:grid-cols-[1.1fr_.9fr]">
          <div>
            <div className="text-[14px] font-medium text-white">ТехКаталист</div>
            <p className="mt-3 max-w-[440px] text-[14px] leading-[1.43] tracking-[-0.14px] text-[#8f99a8]">
              Закупка зарубежного ПО для юридических лиц: ИИ-сервисы, облачные продукты и корпоративные лицензии.
            </p>
          </div>

          <div className="grid gap-2 md:justify-end">
            <a href="mailto:info@2rm.ru" className="text-[#8f99a8] transition-colors hover:text-white">
              info@2rm.ru
            </a>
            <a href="https://t.me/pillardev" target="_blank" rel="noreferrer" className="text-[#8f99a8] transition-colors hover:text-white">
              Telegram
            </a>
            <span className="text-[#8f99a8]">© 2026 ТехКаталист. Все права защищены.</span>
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
    </div>
  );
}

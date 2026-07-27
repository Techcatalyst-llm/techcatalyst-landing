'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  ChevronRight,
  FileText,
  Globe,
  ShieldCheck,
  Wallet,
} from 'lucide-react';

import { trackCTAClick } from '@/lib/analytics';
import ApplicationModal from '@/components/Modal/ApplicationModal';

const overviewCards = [
  {
    title: 'Счёт, договор, закрывающие',
    text: 'Готовим пакет документов для оплаты и внутреннего согласования.',
    icon: <FileText className="h-4 w-4" />,
  },
  {
    title: 'Прозрачная стоимость',
    text: 'Сразу показываем цену поставщика и нашу комиссию отдельными строками.',
    icon: <Wallet className="h-4 w-4" />,
  },
  {
    title: 'Продление лицензий',
    text: 'Помогаем и с первой закупкой, и с продлением действующих лицензий.',
    icon: <BadgeCheck className="h-4 w-4" />,
  },
];

const trustStats = [
  { value: '3', label: 'зарубежных юрлица в закупочной инфраструктуре' },
  { value: '2', label: 'офиса: Кипр и Казахстан' },
  { value: '7', label: 'рабочих дней до поставки' },
  { value: '10+', label: 'компаний и реализованных проектов' },
];

const painRows = [
  {
    title: 'Доступ к поставщику',
    problem: 'Прямой платёж отклонён, команда ожидает лицензии, а срок запуска или продления сдвигается.',
    answer:
      'Проводим закупку через нашу зарубежную инфраструктуру и в стандартном сценарии поставляем доступ в течение 7 рабочих дней после оплаты.',
  },
  {
    title: 'Документы для юрлица',
    problem: 'Финансовому блоку и закупке нужны понятный исполнитель, прозрачная схема и полный комплект документов.',
    answer:
      'До старта сделки отправляем карточку контрагента, счёт, договор и пакет закрывающих документов для согласования.',
  },
  {
    title: 'Честная экономика',
    problem: 'Скрытая комиссия замедляет согласование закупки и сравнение вариантов.',
    answer:
      'В коммерческом предложении отдельно показываем стоимость лицензий, нашу комиссию и формат поставки до оплаты.',
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
    items: ['Cursor', 'OpenAI', 'Claude', 'Grok', 'DeepSeek'],
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

const vendorCloudItems = [
  'Cursor',
  'OpenAI',
  'Claude',
  'Microsoft 365',
  'Adobe',
  'Atlassian',
  'Figma',
  'Autodesk',
  'Notion',
  'Google Workspace',
];

const steps = [
  {
    title: '1. Запрос',
    text: 'Вы присылаете название поставщика, число лицензий и требования к документам.',
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
    text: 'Сопровождаем оплату и поставку. Стандартный срок — до 7 рабочих дней после оплаты.',
  },
];

const caseCards = [
  {
    title: 'Клиенты A-B',
    companies: '3Commas, AdSkill, Adsterra, BTC-Alpha',
    text: 'Закупка и продление зарубежного ПО для adtech, fintech и продуктовых команд.',
  },
  {
    title: 'Клиенты M-P',
    companies: 'MGTS, MTS, Propeller Ads',
    text: 'Рабочие сервисы, лицензии и инфраструктурные инструменты для телеком- и маркетинговых команд.',
  },
  {
    title: 'Клиенты А-Я',
    companies: 'Альфа Консалт, БКС, Студия Криптон',
    text: 'Рабочее ПО и продление лицензий для консалтинговых, финансовых и проектных команд.',
  },
];

const clientCloudItems = [
  '3Commas',
  'AdSkill',
  'Adsterra',
  'BTC-Alpha',
  'MGTS',
  'MTS',
  'Propeller Ads',
  'Альфа Консалт',
  'БКС',
  'Студия Криптон',
];

const faqItems = [
  {
    question: 'Какое ПО можно закупить через ТехКаталист?',
    answer: 'ИИ-сервисы, облачные продукты и корпоративные лицензии: Cursor, OpenAI, Claude, Microsoft 365, Adobe, Atlassian, Figma и другие.',
  },
  {
    question: 'Как подтверждается легальность сделки и документы для бухгалтерии?',
    answer:
      'Для согласования отправляем карточку контрагента, счёт, договор и закрывающие документы. Реквизиты передаём вместе с коммерческим предложением.',
  },
  {
    question: 'Какой срок поставки?',
    answer:
      'В стандартном сценарии поставка занимает до 7 рабочих дней после оплаты. Если у конкретного поставщика или типа лицензии есть дополнительные условия, фиксируем срок в коммерческом предложении заранее.',
  },
  {
    question: 'Как подтверждается подлинность лицензии?',
    answer:
      'Поставка идёт в официальный кабинет, рабочее пространство или учётную запись клиента. На этапе передачи вместе с вами проверяем доступ, активацию и состав лицензий.',
  },
  {
    question: 'Что происходит, если поставщик меняет условия или поставка задерживается?',
    answer:
      'До оплаты согласуем порядок закупки и формат поставки. Если по ходу сделки условия поставщика меняются, сразу предлагаем другой вариант и повторно согласуем его с вашей командой.',
  },
  {
    question: 'Можно ли продлевать действующие лицензии?',
    answer: 'Да. Сопровождаем как первичную закупку, так и продление действующих подписок.',
  },
  {
    question: 'Что нужно для расчёта?',
    answer: 'Обычно достаточно названия поставщика, числа лицензий, срока, требований к документам и контактного лица со стороны компании.',
  },
];

function Wrap({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-[1140px] px-6 max-sm:px-[18px] ${className}`}>{children}</div>;
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-[14px] border border-[#e4e8f4] bg-white transition duration-200 hover:-translate-y-0.5 hover:shadow-card ${className}`}
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
      className={`inline-flex items-center justify-center gap-2 rounded-[10px] border border-[#2b46f0] bg-[#2b46f0] px-7 py-3 text-[15px] font-semibold text-white transition hover:-translate-y-px hover:border-[#1c33d4] hover:bg-[#1c33d4] hover:shadow-cta ${className}`}
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
      className={`inline-flex items-center justify-center gap-2 rounded-[10px] border border-[#c9d2ea] bg-white px-7 py-3 text-[15px] font-semibold text-[#232a42] transition hover:border-[#2b46f0] hover:text-[#2b46f0] ${className}`}
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
    <div className="bg-white text-[#232a42]">
      <header className="sticky top-0 z-50 border-b border-[#e4e8f4] bg-white/90 backdrop-blur-md">
        <Wrap className="flex min-h-[68px] items-center gap-7 max-sm:min-h-[58px]">
          <Link href="/" className="flex items-center gap-2 text-[18px] font-bold tracking-[-0.01em] text-[#0d1326]">
            <span className="text-[#2b46f0]">▲</span>
            <span>ТехКаталист</span>
          </Link>

          <nav className="ml-auto hidden items-center gap-2 md:flex">
            <Link
              href="/"
              className="px-1 py-2 text-[15px] font-medium text-[#565e78] transition-colors hover:text-[#2b46f0]"
            >
              Главная
            </Link>
            <a
              href="#vendors"
              className="px-1 py-2 text-[15px] font-medium text-[#565e78] transition-colors hover:text-[#2b46f0]"
            >
              Поставщики
            </a>
            <a
              href="#process"
              className="px-1 py-2 text-[15px] font-medium text-[#565e78] transition-colors hover:text-[#2b46f0]"
            >
              Процесс
            </a>
            <a
              href="#faq"
              className="px-1 py-2 text-[15px] font-medium text-[#565e78] transition-colors hover:text-[#2b46f0]"
            >
              Вопросы
            </a>
            <a
              href="https://docs.techcatalyst.ru"
              className="px-1 py-2 text-[15px] font-medium text-[#565e78] transition-colors hover:text-[#2b46f0]"
            >
              Документация
            </a>
          </nav>

          <PrimaryButton onClick={() => handleCta('procurement_header')} className="hidden md:inline-flex">
            Рассчитать стоимость
          </PrimaryButton>
          <PrimaryButton onClick={() => handleCta('procurement_header_mobile')} className="ml-auto md:hidden">
            Расчёт
          </PrimaryButton>
        </Wrap>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-[#e4e8f4] bg-[radial-gradient(900px_460px_at_82%_-12%,rgba(43,70,240,.07),transparent_60%)]">
          <div className="bg-grid-light absolute inset-0" aria-hidden="true" />
          <Wrap className="relative py-[80px] md:py-[96px]">
            <div className="mx-auto max-w-[980px] text-center">
              <div className="mb-4 font-mono text-[11.5px] font-semibold uppercase tracking-[0.16em] text-[#2b46f0] before:mr-2 before:content-['//']">
                Закупка зарубежного ПО для юридических лиц
              </div>
              <h1
                className="mx-auto max-w-[900px] text-[clamp(36px,5vw,54px)] font-bold leading-[1.12] tracking-[-0.02em] text-[#0d1326]"
                style={{ fontFeatureSettings: '"ss03"' }}
              >
                Закупим и продлим иностранное ПО для вашего юрлица
              </h1>
              <p className="mx-auto mt-5 max-w-[780px] text-[17px] leading-[1.6] text-[#565e78] md:text-[19px]">
                Cursor, OpenAI, Claude, Microsoft 365, Adobe, Atlassian и другие сервисы. Счёт, договор, закрывающие документы и поставка от 7 рабочих дней.
              </p>

              <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <PrimaryButton onClick={() => handleCta('procurement_hero_primary')} className="w-full justify-center sm:w-auto">
                  Рассчитать стоимость закупки
                  <ArrowRight className="h-4 w-4" />
                </PrimaryButton>
                <SecondaryButton onClick={() => handleCta('procurement_hero_secondary')} className="w-full justify-center sm:w-auto">
                  Получить презентацию
                </SecondaryButton>
              </div>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
                {['Cursor', 'OpenAI', 'Microsoft 365', 'Adobe', 'Закрывающие документы'].map((item) => (
                  <span key={item} className="rounded-[10px] border border-[#e4e8f4] bg-[#f6f8fc] px-3.5 py-1.5 text-[13px] font-medium text-[#565e78] before:mr-2 before:text-[9px] before:text-[#0aa34f] before:content-['●']">
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
                {trustStats.map((item) => (
                  <Card key={item.label} className="p-4 text-left">
                    <div className="text-[28px] font-medium leading-none tracking-[-0.04em] text-[#232a42] sm:text-[32px]">{item.value}</div>
                    <div className="mt-2 text-[13px] leading-[1.43] tracking-[-0.13px] text-[#565e78] sm:text-[14px] sm:tracking-[-0.14px]">{item.label}</div>
                  </Card>
                ))}
              </div>
            </div>

            <Card className="mx-auto mt-12 max-w-[1080px] p-4 shadow-panel md:p-5">
              <div className="grid gap-4 lg:grid-cols-[1.2fr_.8fr]">
                <div className="rounded-[8px] border border-[#e4e8f4] bg-[#f6f8fc] p-4">
                  <div className="flex items-center justify-between border-b border-[#c9d2ea] pb-3">
                    <div>
                      <div className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#8d93ab]">Запрос на закупку</div>
                      <div className="mt-1 text-[20px] font-medium leading-[1.3] tracking-[-0.4px] text-[#232a42]">
                        Запрос на закупку
                      </div>
                    </div>
                    <div className="rounded-[4px] border border-[#c9d2ea] bg-white px-2 py-1 text-[12px] text-[#565e78]">
                      Для бизнеса
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 md:grid-cols-3">
                    {[
                      ['Поставщики', 'OpenAI, Claude, Microsoft 365'],
                      ['Документы', 'Счёт, договор, закрывающие'],
                      ['Сценарии', 'Закупка и продление лицензий'],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-[8px] border border-[#e4e8f4] bg-white p-4">
                        <div className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#8d93ab]">{label}</div>
                        <div className="mt-2 text-[15px] leading-[1.47] tracking-[-0.15px] text-[#232a42]">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-3">
                  {[
                    ['Что делаем', 'Подбираем схему закупки, считаем стоимость и сопровождаем сделку до поставки.'],
                    ['Как выглядит КП', 'В предложении отдельно показываем стоимость лицензий, комиссию и пакет документов.'],
                    ['Для кого', 'ИТ, финансы, закупка и юристы.'],
                  ].map(([title, text]) => (
                    <div key={title} className="rounded-[8px] border border-[#e4e8f4] bg-white p-4">
                      <div className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#8d93ab]">{title}</div>
                      <div className="mt-2 text-[15px] leading-[1.47] tracking-[-0.15px] text-[#232a42]">{text}</div>
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
              <div className="font-mono text-[11.5px] font-semibold uppercase tracking-[0.16em] text-[#2b46f0] before:mr-2 before:content-['//']">Что берем на себя</div>
              <h2
                className={`mt-4 text-[clamp(27px,3.4vw,40px)] font-semibold leading-[1.18] tracking-[-0.015em] text-[#0d1326]`}
                style={{ fontFeatureSettings: '"ss03"' }}
              >
                Закупка под ключ с понятной экономикой
              </h2>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {overviewCards.map((item) => (
                <Card key={item.title} className="p-4">
                  <div className="inline-flex rounded-[13px] bg-[#e3e9ff] p-3 text-[#2b46f0]">
                    {item.icon}
                  </div>
                  <h3 className="mt-4 text-[20px] font-medium leading-[1.3] tracking-[-0.4px] text-[#232a42]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-[1.43] tracking-[-0.14px] text-[#565e78]">{item.text}</p>
                </Card>
              ))}
            </div>
          </Wrap>
        </section>

        <section className="border-y border-[#e4e8f4] bg-[#f6f8fc] py-[80px] md:py-[96px]">
          <Wrap>
            <div className="max-w-[760px]">
              <div className="font-mono text-[11.5px] font-semibold uppercase tracking-[0.16em] text-[#2b46f0] before:mr-2 before:content-['//']">Где тормозится закупка</div>
              <h2
                className={`mt-4 text-[clamp(27px,3.4vw,40px)] font-semibold leading-[1.18] tracking-[-0.015em] text-[#0d1326]`}
                style={{ fontFeatureSettings: '"ss03"' }}
              >
                Три зоны, где сделка обычно теряет скорость
              </h2>
            </div>

            <div className="mt-8 grid gap-3">
              {painRows.map((item) => (
                <Card key={item.title} className="grid gap-4 p-4 md:grid-cols-[260px_1fr] md:items-start">
                  <div className="text-[20px] font-medium leading-[1.3] tracking-[-0.4px] text-[#232a42]">{item.title}</div>
                  <div className="grid gap-3">
                    <p className="text-[15px] leading-[1.47] tracking-[-0.15px] text-[#565e78]">{item.problem}</p>
                    <div className="rounded-[8px] border border-[#e4e8f4] bg-[#f6f8fc] p-3 text-[14px] leading-[1.43] tracking-[-0.14px] text-[#232a42]">
                      {item.answer}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Wrap>
        </section>

        <section className="py-[80px] md:py-[96px]">
          <Wrap>
            <div className="grid gap-8 lg:grid-cols-[.82fr_1.18fr]">
              <div className="max-w-[560px]">
                <div className="font-mono text-[11.5px] font-semibold uppercase tracking-[0.16em] text-[#2b46f0] before:mr-2 before:content-['//']">Кому подходит</div>
                <h2
                  className={`mt-4 text-[clamp(27px,3.4vw,40px)] font-semibold leading-[1.18] tracking-[-0.015em] text-[#0d1326]`}
                  style={{ fontFeatureSettings: '"ss03"' }}
                >
                  Для команд, которые регулярно закупают зарубежное ПО
                </h2>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {audienceCards.map((item) => (
                  <Card key={item.title} className="p-4">
                    <div className="inline-flex rounded-[13px] bg-[#e3e9ff] p-3 text-[#2b46f0]">
                      {item.icon}
                    </div>
                    <h3 className="mt-4 text-[20px] font-medium leading-[1.3] tracking-[-0.4px] text-[#232a42]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-[1.43] tracking-[-0.14px] text-[#565e78]">{item.text}</p>
                  </Card>
                ))}
              </div>
            </div>
          </Wrap>
        </section>

        <section className="border-y border-[#e4e8f4] bg-[#f6f8fc] py-[80px] md:py-[96px]">
          <Wrap>
            <div className="max-w-[780px]">
              <div className="font-mono text-[11.5px] font-semibold uppercase tracking-[0.16em] text-[#2b46f0] before:mr-2 before:content-['//']">Опыт и компании</div>
              <h2
                className={`mt-4 text-[clamp(27px,3.4vw,40px)] font-semibold leading-[1.18] tracking-[-0.015em] text-[#0d1326]`}
                style={{ fontFeatureSettings: '"ss03"' }}
              >
                Компании и проекты, с которыми работала команда
              </h2>
              <p className="mt-3 max-w-[700px] text-[15px] leading-[1.47] tracking-[-0.15px] text-[#565e78]">
                Телеком, adtech, fintech, crypto, консалтинг и продакшн. Ниже — открытый список компаний и типовых сценариев закупки.
              </p>
            </div>

            <Card className="mt-8 hidden overflow-hidden p-3 md:block md:p-4">
              <Image
                src="/procurement-clients-cloud.svg"
                alt="Компании и проекты: 3Commas, AdSkill, Adsterra, BTC-Alpha, MGTS, MTS, Propeller Ads, Альфа Консалт, БКС, Студия Криптон"
                width={1440}
                height={360}
                className="h-auto w-full rounded-[8px] border border-[#e4e8f4]"
                priority={false}
              />
            </Card>

            <div className="mt-8 grid grid-cols-2 gap-3 md:hidden">
              {clientCloudItems.map((item) => (
                <div
                  key={item}
                  className="rounded-[8px] border border-[#e4e8f4] bg-white px-3 py-4 text-center text-[14px] font-medium leading-[1.3] tracking-[-0.14px] text-[#232a42]"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {caseCards.map((item) => (
                <Card key={item.title} className="p-4">
                  <div className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#8d93ab]">{item.title}</div>
                  <h3 className="mt-3 text-[20px] font-medium leading-[1.3] tracking-[-0.4px] text-[#232a42]">{item.companies}</h3>
                  <p className="mt-2 text-[14px] leading-[1.43] tracking-[-0.14px] text-[#565e78]">{item.text}</p>
                </Card>
              ))}
            </div>
          </Wrap>
        </section>

        <section id="vendors" className="border-y border-[#e4e8f4] bg-white py-[80px] md:py-[96px]">
          <Wrap>
            <div className="max-w-[760px]">
              <div className="font-mono text-[11.5px] font-semibold uppercase tracking-[0.16em] text-[#2b46f0] before:mr-2 before:content-['//']">Поставщики и сценарии</div>
              <h2
                className={`mt-4 text-[clamp(27px,3.4vw,40px)] font-semibold leading-[1.18] tracking-[-0.015em] text-[#0d1326]`}
                style={{ fontFeatureSettings: '"ss03"' }}
              >
                Что можно закупать и продлевать
              </h2>
            </div>

            <Card className="mt-8 hidden overflow-hidden p-3 md:block md:p-4">
              <Image
                src="/procurement-vendors-cloud.svg"
                alt="Логотипы и названия поставщиков: Cursor, OpenAI, Claude, Microsoft 365, Adobe, Atlassian, Figma, Autodesk, Notion, Google Workspace"
                width={1440}
                height={360}
                className="h-auto w-full rounded-[8px] border border-[#e4e8f4]"
                priority={false}
              />
            </Card>

            <div className="mt-8 grid grid-cols-2 gap-3 md:hidden">
              {vendorCloudItems.map((item) => (
                <div
                  key={item}
                  className="rounded-[8px] border border-[#e4e8f4] bg-[#f6f8fc] px-3 py-4 text-center text-[14px] font-medium leading-[1.3] tracking-[-0.14px] text-[#232a42]"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-8 border-b border-[#c9d2ea]">
              <div className="flex flex-wrap gap-4 sm:gap-6">
                {vendorGroups.map((group) => (
                  <button
                    key={group.id}
                    type="button"
                    onClick={() => setActiveVendorGroup(group.id)}
                    className={`border-b-2 px-0 pb-3 text-[15px] font-medium tracking-[-0.15px] transition-colors ${
                      activeVendorGroup === group.id
                        ? 'border-[#232a42] text-[#232a42]'
                        : 'border-transparent text-[#565e78] hover:text-[#232a42]'
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
                  <div className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#8d93ab]">Категория</div>
                  <div className="mt-2 text-[20px] font-medium leading-[1.3] tracking-[-0.4px] text-[#232a42]">
                    {activeGroup.label}
                  </div>
                  <p className="mt-2 text-[14px] leading-[1.43] tracking-[-0.14px] text-[#565e78]">
                    Подбираем порядок закупки под конкретного поставщика и формат лицензирования.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {activeGroup.items.map((item) => (
                    <div key={item} className="rounded-[4px] border border-[#c9d2ea] bg-[#f6f8fc] px-3 py-2 text-[14px] text-[#232a42]">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </Wrap>
        </section>

        <section id="process" className="bg-[#f6f8fc] py-[80px] md:py-[96px]">
          <Wrap>
            <div className="max-w-[720px]">
              <div className="font-mono text-[11.5px] font-semibold uppercase tracking-[0.16em] text-[#2b46f0] before:mr-2 before:content-['//']">Процесс</div>
              <h2
                className={`mt-4 text-[clamp(27px,3.4vw,40px)] font-semibold leading-[1.18] tracking-[-0.015em] text-[#0d1326]`}
                style={{ fontFeatureSettings: '"ss03"' }}
              >
                От запроса до поставки
              </h2>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {steps.map((step) => (
                <Card key={step.title} className="p-4">
                  <div className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#8d93ab]">{step.title}</div>
                  <p className="mt-3 text-[15px] leading-[1.47] tracking-[-0.15px] text-[#232a42]">{step.text}</p>
                </Card>
              ))}
            </div>
          </Wrap>
        </section>

        <section className="py-[80px] md:py-[96px]">
          <Wrap className="grid gap-4 lg:grid-cols-2">
            <Card className="p-4">
              <div className="inline-flex rounded-[13px] bg-[#e3e9ff] p-3 text-[#2b46f0]">
                <FileText className="h-4 w-4" />
              </div>
              <h3 className="mt-4 text-[20px] font-medium leading-[1.3] tracking-[-0.4px] text-[#232a42]">
                Материалы для согласования
              </h3>
              <p className="mt-2 text-[14px] leading-[1.43] tracking-[-0.14px] text-[#565e78]">
                Подготовим презентацию и коммерческие материалы для финансового блока, ИТ, закупки и руководителя проекта.
              </p>
              <SecondaryButton onClick={() => handleCta('procurement_materials')} className="mt-6">
                Получить презентацию
                <ChevronRight className="h-4 w-4" />
              </SecondaryButton>
            </Card>

            <Card className="p-4">
              <div className="inline-flex rounded-[13px] bg-[#e3e9ff] p-3 text-[#2b46f0]">
                <Globe className="h-4 w-4" />
              </div>
              <h3 className="mt-4 text-[20px] font-medium leading-[1.3] tracking-[-0.4px] text-[#232a42]">
                Контакты для расчёта
              </h3>
              <p className="mt-2 text-[14px] leading-[1.43] tracking-[-0.14px] text-[#565e78]">
                Можно отправить список ПО на расчёт по почте или написать в Telegram для быстрого ответа.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="mailto:info@2rm.ru"
                  onClick={() => trackCTAClick('procurement_email')}
                  className="inline-flex items-center rounded-[10px] border border-[#c9d2ea] bg-white px-7 py-3 text-[15px] font-semibold text-[#232a42] transition hover:border-[#2b46f0] hover:text-[#2b46f0]"
                >
                  info@2rm.ru
                </a>
                <a
                  href="https://t.me/pillardev"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackCTAClick('procurement_telegram')}
                  className="inline-flex items-center gap-2 rounded-[10px] border border-[#2b46f0] bg-[#2b46f0] px-7 py-3 text-[15px] font-semibold text-white transition hover:border-[#1c33d4] hover:bg-[#1c33d4] hover:shadow-cta"
                >
                  @pillardev
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </Card>
          </Wrap>
        </section>

        <section id="faq" className="border-y border-[#e4e8f4] bg-[#f6f8fc] py-[80px] md:py-[96px]">
          <Wrap>
            <div className="max-w-[720px]">
              <div className="font-mono text-[11.5px] font-semibold uppercase tracking-[0.16em] text-[#2b46f0] before:mr-2 before:content-['//']">Вопросы</div>
              <h2
                className={`mt-4 text-[clamp(27px,3.4vw,40px)] font-semibold leading-[1.18] tracking-[-0.015em] text-[#0d1326]`}
                style={{ fontFeatureSettings: '"ss03"' }}
              >
                Частые вопросы
              </h2>
            </div>

            <Card className="mt-8 overflow-hidden">
              {faqItems.map((item, index) => (
                <details key={item.question} className={`${index !== 0 ? 'border-t border-[#e4e8f4]' : ''} group`}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 text-[15px] font-medium tracking-[-0.15px] text-[#232a42] sm:text-[16px] sm:tracking-[-0.24px]">
                    <span>{item.question}</span>
                    <span className="text-[#565e78] transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <div className="px-4 pb-4 text-[14px] leading-[1.43] tracking-[-0.14px] text-[#565e78]">
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
                <div className="font-mono text-[11.5px] font-semibold uppercase tracking-[0.16em] text-[#2b46f0] before:mr-2 before:content-['//']">Запрос на закупку</div>
                <h2
                  className={`mt-4 text-[clamp(27px,3.4vw,40px)] font-semibold leading-[1.18] tracking-[-0.015em] text-[#0d1326]`}
                  style={{ fontFeatureSettings: '"ss03"' }}
                >
                  Отправьте список ПО на расчёт
                </h2>
                <p className="mt-3 text-[16px] leading-[1.5] tracking-[-0.24px] text-[#565e78]">
                  Пришлите название поставщика, число лицензий и требования к документам. Подготовим расчёт, коммерческое предложение и срок поставки до 7 рабочих дней в стандартном сценарии.
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

      <footer className="border-t border-[#e4e8f4] bg-[#f6f8fc] py-12 text-[14px]">
        <Wrap className="grid gap-10 md:grid-cols-[1.1fr_.9fr]">
          <div>
            <div className="text-[14px] font-semibold text-[#0d1326]">TechCatalyst</div>
            <p className="mt-3 max-w-[440px] text-[14px] leading-[1.43] tracking-[-0.14px] text-[#565e78]">
              Закупка зарубежного ПО для юридических лиц: ИИ-сервисы, облачные продукты и корпоративные лицензии с поставкой от 7 рабочих дней.
            </p>
            <div className="mt-4 grid gap-1 text-[14px] leading-[1.43] tracking-[-0.14px] text-[#8d93ab]">
              <div>Исполнитель: ИП Борисов Иван Анатольевич</div>
              <div>ИНН 575307745402 · ОГРНИП 320574900010615</div>
            </div>
          </div>

          <div className="grid gap-2 md:justify-end">
            <a href="mailto:info@2rm.ru" className="text-[#565e78] transition-colors hover:text-[#2b46f0]">
              info@2rm.ru
            </a>
            <a href="https://t.me/pillardev" target="_blank" rel="noreferrer" className="text-[#565e78] transition-colors hover:text-[#2b46f0]">
              @pillardev
            </a>
            <Link href="/privacy" className="text-[#565e78] transition-colors hover:text-[#2b46f0]">
              Политика конфиденциальности
            </Link>
            <Link href="/cookie" className="text-[#565e78] transition-colors hover:text-[#2b46f0]">
              Политика cookie
            </Link>
            <span className="text-[#8d93ab]">© 2026 ТехКаталист. Все права защищены.</span>
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

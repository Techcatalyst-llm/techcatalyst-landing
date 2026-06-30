'use client';

import Image from 'next/image';
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
    title: 'Счёт, договор, закрывающие',
    text: 'Готовим пакет документов для оплаты и внутреннего согласования.',
    icon: <FileText className="h-4 w-4" />,
  },
  {
    title: 'Прозрачная стоимость',
    text: 'Сразу показываем цену вендора и нашу комиссию отдельными строками.',
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
  { value: '10+', label: 'компаний и проектов в кейсах' },
];

const legalFacts = [
  'Исполнитель — ИП Борисов Иван Анатольевич',
  'ИНН 575307745402',
  'ОГРНИП 320574900010615',
  'Счёт, договор, закрывающие документы',
];

const painRows = [
  {
    title: 'Доступ к вендору',
    problem: 'Прямой платёж не проходит, команда остаётся без лицензий, а запуск или продление сдвигаются.',
    answer:
      'Проводим закупку через нашу зарубежную инфраструктуру и в стандартном сценарии поставляем доступ в течение 7 рабочих дней после оплаты.',
  },
  {
    title: 'Документы для юрлица',
    problem: 'Финансовый блок и закупка не готовы согласовывать серую схему без понятного исполнителя и документов.',
    answer:
      'Работаем как ИП Борисов Иван Анатольевич, ИНН 575307745402. До старта сделки фиксируем счёт, договор и пакет закрывающих документов.',
  },
  {
    title: 'Честная экономика',
    problem: 'Если комиссия спрятана внутри суммы, невозможно быстро согласовать закупку и сравнить варианты.',
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

const faqItems = [
  {
    question: 'Какое ПО можно закупить через ТехКаталист?',
    answer: 'ИИ-сервисы, облачные продукты и корпоративные лицензии: Cursor, OpenAI, Claude, Microsoft 365, Adobe, Atlassian, Figma и другие.',
  },
  {
    question: 'Как подтверждается легальность сделки и документы для бухгалтерии?',
    answer:
      'Исполнитель по сделке — ИП Борисов Иван Анатольевич, ИНН 575307745402, ОГРНИП 320574900010615. Работаем по счёту, договору и закрывающим документам.',
  },
  {
    question: 'Какой срок поставки?',
    answer:
      'В стандартном сценарии поставка занимает до 7 рабочих дней после оплаты. Если у конкретного вендора или типа лицензии есть дополнительные условия, фиксируем срок в коммерческом предложении заранее.',
  },
  {
    question: 'Как подтверждается подлинность лицензии?',
    answer:
      'Поставка идёт в официальный кабинет, рабочий тенант или аккаунт клиента. На этапе передачи вместе с вами проверяем доступ, активацию и состав лицензий.',
  },
  {
    question: 'Что происходит, если вендор меняет условия или поставка стопорится?',
    answer:
      'До оплаты согласуем маршрут закупки и формат поставки. Если по ходу сделки условия вендора меняются, сразу предлагаем альтернативный сценарий и повторно согласуем его с вашей командой.',
  },
  {
    question: 'Можно ли продлевать действующие лицензии?',
    answer: 'Да. Сопровождаем как первичную закупку, так и продление действующих подписок.',
  },
  {
    question: 'Что нужно для расчёта?',
    answer: 'Обычно достаточно вендора, числа лицензий, срока, требований к документам и контактного лица со стороны компании.',
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
                Cursor, OpenAI, Claude, Microsoft 365, Adobe, Atlassian и другие сервисы. Счёт, договор, закрывающие документы и поставка от 7 рабочих дней.
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
                {['Cursor', 'OpenAI', 'Microsoft 365', 'Adobe', 'Закрывающие документы'].map((item) => (
                  <span key={item} className="rounded-[4px] border border-[#e4e7ec] bg-white px-2 py-1">
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {trustStats.map((item) => (
                  <Card key={item.label} className="p-4 text-left">
                    <div className="text-[32px] font-medium leading-none tracking-[-0.04em] text-[#1c1d1f]">{item.value}</div>
                    <div className="mt-2 text-[14px] leading-[1.43] tracking-[-0.14px] text-[#6f7988]">{item.label}</div>
                  </Card>
                ))}
              </div>
            </div>

            <Card className="mx-auto mt-8 max-w-[1120px] p-4 md:p-5">
              <div className="grid gap-4 lg:grid-cols-[1.05fr_.95fr] lg:items-start">
                <div>
                  <div className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#407ff2]">Юридическая рамка сделки</div>
                  <h2
                    className={`${lora.className} mt-4 max-w-[620px] text-[28px] font-medium leading-[1.23] tracking-[-0.42px] text-[#1c1d1f] md:text-[40px] md:leading-[1.1] md:tracking-[-0.6px]`}
                    style={{ fontFeatureSettings: '"ss03"' }}
                  >
                    Понятный исполнитель, документы для согласования и срок поставки до 7 рабочих дней
                  </h2>
                  <p className="mt-4 max-w-[620px] text-[15px] leading-[1.47] tracking-[-0.15px] text-[#6f7988]">
                    Закупку сопровождает ИП Борисов Иван Анатольевич. До старта сделки фиксируем формат поставки, пакет документов и экономику закупки.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {legalFacts.map((item) => (
                    <div key={item} className="rounded-[8px] border border-[#e4e7ec] bg-[#f3f4f6] p-4 text-[14px] leading-[1.43] tracking-[-0.14px] text-[#1c1d1f]">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </Card>

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
                    ['Что делаем', 'Подбираем схему закупки, считаем стоимость и сопровождаем сделку до поставки.'],
                    ['Как выглядит КП', 'В предложении отдельно показываем стоимость лицензий, комиссию и пакет документов.'],
                    ['Для кого', 'ИТ, финансы, закупка и юристы.'],
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
              <div className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#407ff2]">Что берем на себя</div>
              <h2
                className={`${lora.className} mt-4 text-[28px] font-medium leading-[1.23] tracking-[-0.42px] text-[#1c1d1f] md:text-[40px] md:leading-[1.1] md:tracking-[-0.6px]`}
                style={{ fontFeatureSettings: '"ss03"' }}
              >
                Закупка под ключ с понятной экономикой
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
                  <div className="grid gap-3">
                    <p className="text-[15px] leading-[1.47] tracking-[-0.15px] text-[#6f7988]">{item.problem}</p>
                    <div className="rounded-[8px] border border-[#e4e7ec] bg-[#f3f4f6] p-3 text-[14px] leading-[1.43] tracking-[-0.14px] text-[#1c1d1f]">
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

        <section className="border-y border-[#e4e7ec] bg-[#f3f4f6] py-[80px] md:py-[96px]">
          <Wrap>
            <div className="max-w-[780px]">
              <div className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#407ff2]">Кейсы и компании</div>
              <h2
                className={`${lora.className} mt-4 text-[28px] font-medium leading-[1.23] tracking-[-0.42px] text-[#1c1d1f] md:text-[40px] md:leading-[1.1] md:tracking-[-0.6px]`}
                style={{ fontFeatureSettings: '"ss03"' }}
              >
                Компании и проекты, с которыми работала команда
              </h2>
              <p className="mt-3 max-w-[700px] text-[15px] leading-[1.47] tracking-[-0.15px] text-[#6f7988]">
                Телеком, adtech, fintech, crypto, консалтинг и продакшн. Ниже — открытый список компаний и типовых сценариев закупки.
              </p>
            </div>

            <Card className="mt-8 overflow-hidden p-3 md:p-4">
              <Image
                src="/procurement-clients-cloud.svg"
                alt="Компании и проекты: 3Commas, AdSkill, Adsterra, BTC-Alpha, MGTS, MTS, Propeller Ads, Альфа Консалт, БКС, Студия Криптон"
                width={1440}
                height={360}
                className="h-auto w-full rounded-[8px] border border-[#e4e7ec]"
                priority={false}
              />
            </Card>

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {caseCards.map((item) => (
                <Card key={item.title} className="p-4">
                  <div className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#8f99a8]">{item.title}</div>
                  <h3 className="mt-3 text-[20px] font-medium leading-[1.3] tracking-[-0.4px] text-[#1c1d1f]">{item.companies}</h3>
                  <p className="mt-2 text-[14px] leading-[1.43] tracking-[-0.14px] text-[#6f7988]">{item.text}</p>
                </Card>
              ))}
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

            <Card className="mt-8 overflow-hidden p-3 md:p-4">
              <Image
                src="/procurement-vendors-cloud.svg"
                alt="Логотипы и названия вендоров: Cursor, OpenAI, Claude, Microsoft 365, Adobe, Atlassian, Figma, Autodesk, Notion, Google Workspace"
                width={1440}
                height={360}
                className="h-auto w-full rounded-[8px] border border-[#e4e7ec]"
                priority={false}
              />
            </Card>

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
                <FileText className="h-4 w-4" />
              </div>
              <h3 className="mt-4 text-[20px] font-medium leading-[1.3] tracking-[-0.4px] text-[#1c1d1f]">
                Реквизиты для согласования
              </h3>
              <p className="mt-2 text-[14px] leading-[1.43] tracking-[-0.14px] text-[#6f7988]">
                Исполнитель по сделке — ИП Борисов Иван Анатольевич. Для согласования даём счёт, договор, закрывающие документы, ИНН и ОГРНИП.
              </p>
              <div className="mt-4 grid gap-2 text-[14px] leading-[1.43] tracking-[-0.14px] text-[#1c1d1f]">
                <div>ИНН: 575307745402</div>
                <div>ОГРНИП: 320574900010615</div>
                <div>Формат: счёт, договор, закрывающие документы</div>
              </div>
              <SecondaryButton onClick={() => handleCta('procurement_materials')} className="mt-6">
                Получить карточку контрагента
                <ChevronRight className="h-4 w-4" />
              </SecondaryButton>
            </Card>

            <Card className="p-4">
              <div className="inline-flex rounded-[8px] border border-[#e4e7ec] bg-[#f3f4f6] p-2 text-[#505967]">
                <Globe className="h-4 w-4" />
              </div>
              <h3 className="mt-4 text-[20px] font-medium leading-[1.3] tracking-[-0.4px] text-[#1c1d1f]">
                Контакты для расчёта
              </h3>
              <p className="mt-2 text-[14px] leading-[1.43] tracking-[-0.14px] text-[#6f7988]">
                Можно отправить список ПО на расчёт по почте или написать в Telegram для быстрого ответа.
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
                  href="https://t.me/techcatalyst_support"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackCTAClick('procurement_telegram')}
                  className="inline-flex items-center gap-2 rounded-[10px] border border-[#1c1d1f] bg-[#1c1d1f] px-3 py-2 text-[14px] font-medium text-white transition-colors hover:bg-black"
                >
                  @techcatalyst_support
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
                  Пришлите вендора, число лицензий и требования к документам. Подготовим расчёт, коммерческое предложение и срок поставки до 7 рабочих дней в стандартном сценарии.
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
              Закупка зарубежного ПО для юридических лиц: ИИ-сервисы, облачные продукты и корпоративные лицензии с поставкой от 7 рабочих дней.
            </p>
            <div className="mt-4 grid gap-1 text-[14px] leading-[1.43] tracking-[-0.14px] text-[#8f99a8]">
              <div>Исполнитель: ИП Борисов Иван Анатольевич</div>
              <div>ИНН 575307745402 · ОГРНИП 320574900010615</div>
            </div>
          </div>

          <div className="grid gap-2 md:justify-end">
            <a href="mailto:info@2rm.ru" className="text-[#8f99a8] transition-colors hover:text-white">
              info@2rm.ru
            </a>
            <a href="https://t.me/techcatalyst_support" target="_blank" rel="noreferrer" className="text-[#8f99a8] transition-colors hover:text-white">
              @techcatalyst_support
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

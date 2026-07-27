'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  Code2,
  FileCheck2,
  Globe2,
  KeyRound,
  Network,
  ShieldCheck,
} from 'lucide-react';

import ApplicationModal from '@/components/Modal/ApplicationModal';
import { ContourPanel, HeroScanOverlay } from '@/components/HeroLoop';
import { MarketingFooter, MarketingHeader } from '@/components/MarketingChrome';
import { trackCTAClick } from '@/lib/analytics';

const products = [
  {
    number: '01',
    name: 'Поставка зарубежного ПО',
    line: 'Лицензии и подписки для российского юридического лица',
    description:
      'Закупаем и продлеваем корпоративное ПО через зарубежную инфраструктуру. До оплаты фиксируем маршрут, стоимость лицензий, комиссию, срок и комплект документов.',
    points: ['Счёт, договор и закрывающие документы', 'Первая закупка и продление', 'Сопровождение до активации'],
    href: '/zakupka-zarubezhnogo-po',
    cta: 'Открыть поставку ПО',
    icon: Globe2,
  },
  {
    number: '02',
    name: 'Поставка и интеграция ИИ',
    line: 'От корпоративного доступа до собственного контура ИИ',
    description:
      'Поставляем сервисы ИИ, подключаем единый программный интерфейс, совместимый с OpenAI, настраиваем ключи, роли, лимиты, учёт потребления и интеграцию в продукты и процессы компании.',
    points: ['ИИ-инструменты для сотрудников', 'Единый программный интерфейс', 'Интеграция и техническая поддержка'],
    href: '/postavka-i-integraciya-ai',
    cta: 'Открыть направление ИИ',
    icon: Bot,
  },
  {
    number: '03',
    name: 'TechCatalyst Guard',
    line: 'Безопасное рабочее место разработчика с ИИ-агентами',
    description:
      'Локальный агент контролирует терминал, MCP, ответы инструментов, репозитории и буфер обмена. Политики применяются до передачи данных внешней модели, а события остаются в контуре заказчика.',
    points: ['Локальный контроль', 'Маскирование и блокировка', 'Панель и политики в контуре'],
    href: process.env.NEXT_PUBLIC_GUARD_URL || 'https://guard.techcatalyst.ru',
    cta: 'Открыть TechCatalyst Guard',
    icon: ShieldCheck,
    external: true,
  },
  {
    number: '04',
    name: 'TechCatalyst VPN',
    line: 'Управляемая VPN- и серверная инфраструктура',
    description:
      'Три формата ответственности: VPN под ключ, выделенный сервер с административным доступом или централизованная панель для самостоятельного управления профилями и использованием.',
    points: ['Индивидуальные профили', 'Выделенный выходной IP-адрес', 'Выдача, ротация и отзыв доступа'],
    href: '/techcatalyst-vpn',
    cta: 'Открыть TechCatalyst VPN',
    icon: Network,
  },
];

const delivery = [
  {
    title: 'Разбираем задачу',
    text: 'Фиксируем пользователей, поставщиков, инфраструктуру, сроки, требования ИБ, закупки и бухгалтерии.',
  },
  {
    title: 'Проектируем схему',
    text: 'Показываем состав решения, зоны ответственности, стоимость, ограничения и критерии приёмки до старта.',
  },
  {
    title: 'Поставляем и внедряем',
    text: 'Организуем доступ, разворачиваем компоненты, подключаем интеграции и передаём рабочий результат.',
  },
  {
    title: 'Сопровождаем',
    text: 'Продления, лимиты, инциденты и изменения ведутся через одну точку коммуникации по условиям договора.',
  },
];

const experience = ['МТС', 'БКС', '3Commas', 'Adsterra', 'Propeller Ads', 'Альфа Консалт', 'Криптон Студио'];

function Wrap({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1180px] px-5 sm:px-7 lg:px-8 ${className}`}>{children}</div>;
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-[14px] border border-[#e4e8f4] bg-white shadow-[rgba(28,40,64,.06)_0_4px_18px_-8px] ${className}`}>
      {children}
    </div>
  );
}

export default function PortfolioLandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState('portfolio');

  const openModal = (source: string) => {
    trackCTAClick(source);
    setModalSource(source);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white text-[#0d1326]">
      <MarketingHeader />

      <main>
        <section className="relative overflow-hidden border-b border-[#e4e8f4] bg-[radial-gradient(760px_460px_at_90%_-14%,rgba(43,70,240,.10),transparent_62%)]">
          <div className="bg-grid-light absolute inset-0" aria-hidden="true" />
          <HeroScanOverlay />
          <Wrap className="relative grid items-center gap-12 py-[78px] lg:grid-cols-[1.35fr_1fr] lg:py-[104px]">
            <div>
              <div className="flex items-center font-mono text-[12px] font-semibold uppercase tracking-[2.1px] text-[#2b46f0] before:mr-2 before:content-['//']">
                Продуктовая линейка TechCatalyst
                <span aria-hidden className="ml-1 inline-block h-[15px] w-[9px] animate-caret bg-[#2b46f0]" />
              </div>
              <h1 className="mt-5 max-w-[780px] text-balance text-[clamp(34px,4.4vw,45px)] font-bold leading-[1.08] tracking-[-0.035em] text-[#0d1326]">
                Технологический контур для зарубежного ПО и ИИ
              </h1>
              <p className="mt-[22px] max-w-[540px] text-[17.5px] leading-[1.62] text-[#565e78]">
                Лицензии, интеграция ИИ и защита рабочих мест разработчиков. Один подрядчик — от коммерческой схемы до работающего контура.
              </p>

              <div className="mt-[30px] flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <button
                  type="button"
                  onClick={() => openModal('portfolio_hero')}
                  className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-[#2b46f0] bg-[#2b46f0] px-[26px] py-[13px] text-[15px] font-semibold text-white shadow-cta transition hover:-translate-y-px hover:border-[#1c33d4] hover:bg-[#1c33d4]"
                >
                  Обсудить задачу <ArrowRight className="h-4 w-4" />
                </button>
                <a
                  href="#products"
                  className="inline-flex items-center justify-center rounded-[10px] border border-[#c9d2ea] bg-white px-[26px] py-[13px] text-[15px] font-semibold text-[#232a42] transition hover:border-[#2b46f0] hover:text-[#2b46f0]"
                >
                  Смотреть продукты
                </a>
              </div>

              <div className="mt-7 flex flex-wrap gap-2.5">
                {['ИП · договор и документы', 'Корпоративная поставка', 'Инженерное внедрение'].map((item) => (
                  <span key={item} className="inline-flex items-center gap-2 rounded-[8px] border border-[#e4e8f4] bg-white px-[13px] py-2 text-[13.5px] font-medium text-[#565e78]">
                    <i aria-hidden className="h-[7px] w-[7px] shrink-0 rounded-full bg-[#0aa34f]" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <ContourPanel />
          </Wrap>
        </section>

        <section id="products" className="py-[82px] lg:py-[100px]">
          <Wrap>
            <div className="max-w-[820px]">
              <div className="font-mono text-[11.5px] font-semibold uppercase tracking-[0.16em] before:mr-2 before:content-['//'] text-[#2b46f0]">Продукты</div>
              <h2 className="mt-4 text-[32px] font-semibold leading-[1.15] tracking-[-0.025em] md:text-[46px]">
                Закрываем доступ, внедрение и безопасность как одну систему
              </h2>
              <p className="mt-4 text-[17px] leading-[1.6] text-[#565e78]">
                Каждый продукт можно купить отдельно. Вместе они образуют полный контур: от закупки лицензии и доступа к ИИ до управляемой сети и защиты рабочего места.
              </p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              {products.map((product) => {
                const Icon = product.icon;
                const card = (
                  <Card className="group h-full p-6 transition hover:-translate-y-1 hover:border-[#e3e9ff] hover:shadow-[rgba(43,70,240,.12)_0_14px_30px_-18px] sm:p-7">
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-mono text-[12px] font-semibold tracking-[0.08em] text-[#8d93ab]">{product.number}</span>
                      <span className="inline-flex rounded-[10px] border border-[#e4e8f4] bg-[#f6f8fc] p-2.5 text-[#2b46f0]">
                        <Icon className="h-5 w-5" />
                      </span>
                    </div>
                    <div className="mt-6 font-mono text-[11.5px] font-semibold uppercase tracking-[0.16em] before:mr-2 before:content-['//'] text-[#2b46f0]">{product.line}</div>
                    <h3 className="mt-3 text-[29px] font-semibold leading-[1.12] tracking-[-0.025em]">{product.name}</h3>
                    <p className="mt-4 text-[15px] leading-[1.62] text-[#565e78]">{product.description}</p>
                    <ul className="mt-5 grid gap-2.5">
                      {product.points.map((point) => (
                        <li key={point} className="flex items-center gap-2.5 text-[14px] text-[#232a42]">
                          <BadgeCheck className="h-4 w-4 shrink-0 text-[#2b46f0]" /> {point}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-7 inline-flex items-center gap-2 text-[14px] font-semibold text-[#2b46f0]">
                      {product.cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Card>
                );

                return product.external ? (
                  <a key={product.name} href={product.href} className="block" rel="noreferrer">
                    {card}
                  </a>
                ) : (
                  <Link key={product.name} href={product.href} className="block">
                    {card}
                  </Link>
                );
              })}
            </div>

            <div className="mt-7 flex flex-col gap-4 border border-[#e4e8f4] bg-[#f6f8fc] p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-[20px] font-semibold">Тарифы на модели ИИ</h3>
                <p className="mt-1 text-[14px] leading-[1.55] text-[#565e78]">
                  Отдельная таблица цен на языковые модели, генерацию, embedding, речь и сервисы.
                </p>
              </div>
              <Link href="/tarify" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-[10px] border border-[#2b46f0] bg-white px-5 py-3 text-[14px] font-semibold text-[#2b46f0] transition hover:bg-[#2b46f0] hover:text-white">
                Открыть тарифы <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Wrap>
        </section>

        <section className="border-y border-[#e4e8f4] bg-[#f6f8fc] py-[82px] lg:py-[100px]">
          <Wrap>
            <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
              <div>
                <div className="font-mono text-[11.5px] font-semibold uppercase tracking-[0.16em] before:mr-2 before:content-['//'] text-[#2b46f0]">Как работаем</div>
                <h2 className="mt-4 text-[32px] font-semibold leading-[1.15] tracking-[-0.025em] md:text-[44px]">
                  От набора сервисов к законченному результату
                </h2>
                <p className="mt-4 text-[16px] leading-[1.6] text-[#565e78]">
                  До оплаты заказчик понимает, что именно получит, кто отвечает за каждый участок и по каким признакам работа будет принята.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {delivery.map((item, index) => (
                  <Card key={item.title} className="p-5">
                    <div className="font-mono text-[11px] font-semibold tracking-[0.1em] text-[#2b46f0]">0{index + 1}</div>
                    <h3 className="mt-3 text-[21px] font-semibold tracking-[-0.01em]">{item.title}</h3>
                    <p className="mt-2 text-[14px] leading-[1.55] text-[#565e78]">{item.text}</p>
                  </Card>
                ))}
              </div>
            </div>
          </Wrap>
        </section>

        <section className="py-[82px] lg:py-[100px]">
          <Wrap>
            <div className="grid items-start gap-10 lg:grid-cols-[1fr_1fr]">
              <div>
                <div className="font-mono text-[11.5px] font-semibold uppercase tracking-[0.16em] before:mr-2 before:content-['//'] text-[#2b46f0]">Единый контур</div>
                <h2 className="mt-4 text-[32px] font-semibold leading-[1.15] tracking-[-0.025em] md:text-[44px]">
                  Один подрядчик для четырёх связанных рисков
                </h2>
              </div>
              <div className="grid gap-3">
                {[
                  [FileCheck2, 'Коммерческий', 'Договор, счёт, документы, стоимость и срок поставки.'],
                  [Code2, 'Технический', 'Настройка доступа, программных интерфейсов, инфраструктуры и интеграций.'],
                  [ShieldCheck, 'Безопасность', 'Политики, индивидуальные доступы, аудит и контуры заказчика.'],
                  [KeyRound, 'Эксплуатация', 'Выдача, ротация, отзыв, продление и поддержка.'],
                ].map(([Icon, title, text]) => (
                  <div key={String(title)} className="flex gap-4 rounded-[14px] border border-[#e4e8f4] p-5">
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#2b46f0]" />
                    <div>
                      <div className="text-[17px] font-semibold">{String(title)}</div>
                      <div className="mt-1 text-[14px] leading-[1.5] text-[#565e78]">{String(text)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Wrap>
        </section>

        <section className="border-y border-[#e4e8f4] bg-[#f6f8fc] py-[70px]">
          <Wrap>
            <div className="font-mono text-[11.5px] font-semibold uppercase tracking-[0.16em] before:mr-2 before:content-['//'] text-[#2b46f0]">Опыт команды</div>
            <h2 className="mt-4 max-w-[760px] text-[30px] font-semibold leading-[1.2] tracking-[-0.02em] md:text-[40px]">
              ИИ, инфраструктура и корпоративные поставки для продуктовых команд
            </h2>
            <div className="mt-8 flex flex-wrap gap-3">
              {experience.map((name) => (
                <span key={name} className="rounded-[10px] border border-[#c9d2ea] bg-white px-4 py-2 text-[14px] font-medium text-[#232a42]">
                  {name}
                </span>
              ))}
            </div>
            <p className="mt-5 max-w-[820px] text-[13px] leading-[1.55] text-[#8d93ab]">
              Перечень отражает опыт команды в поставках, разработке и инфраструктурных проектах; состав конкретных работ различается по договору.
            </p>
          </Wrap>
        </section>

        <section id="contact" className="py-[82px] lg:py-[100px]">
          <Wrap>
            <Card className="overflow-hidden bg-[radial-gradient(700px_280px_at_95%_0%,rgba(43,70,240,.13),transparent_62%)] p-6 sm:p-9">
              <div className="max-w-[820px]">
                <div className="font-mono text-[11.5px] font-semibold uppercase tracking-[0.16em] before:mr-2 before:content-['//'] text-[#2b46f0]">Следующий шаг</div>
                <h2 className="mt-4 text-[32px] font-semibold leading-[1.14] tracking-[-0.025em] md:text-[46px]">
                  Опишите задачу — соберём продуктовую схему и границы поставки
                </h2>
                <p className="mt-4 max-w-[720px] text-[16px] leading-[1.6] text-[#565e78]">
                  Достаточно назвать продукт, число пользователей, желаемый срок и требования вашей ИБ или закупки. Вернёмся с уточнениями и предложением по формату работы.
                </p>
                <button
                  type="button"
                  onClick={() => openModal('portfolio_final')}
                  className="mt-7 inline-flex items-center gap-2 rounded-[10px] bg-[#2b46f0] px-7 py-3 text-[15px] font-semibold text-white transition hover:-translate-y-px hover:bg-[#1c33d4]"
                >
                  Обсудить задачу <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </Card>
          </Wrap>
        </section>
      </main>

      <MarketingFooter note="Поставка зарубежного ПО, корпоративный ИИ, безопасные рабочие места разработчиков и VPN-инфраструктура." />

      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        source={modalSource}
        language="ru"
        variant="business"
      />
    </div>
  );
}

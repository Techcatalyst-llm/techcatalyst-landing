'use client';

import { useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bot,
  Boxes,
  Braces,
  Building2,
  Check,
  CircleGauge,
  FileCheck2,
  KeyRound,
  Network,
  RefreshCcw,
  Server,
  ShieldCheck,
  Users,
} from 'lucide-react';

import ApplicationModal from '@/components/Modal/ApplicationModal';
import { MarketingFooter, MarketingHeader } from '@/components/MarketingChrome';
import { trackCTAClick } from '@/lib/analytics';

type ProductKind = 'ai' | 'vpn';

const configs = {
  ai: {
    kicker: 'Поставка и интеграция AI для бизнеса',
    title: 'От корпоративного AI-доступа до собственного управляемого контура',
    lead:
      'Поставляем AI-сервисы, подключаем единый OpenAI-совместимый API и интегрируем модели в продукты и процессы. Ключи, роли, лимиты, потребление и поддержка — в одной схеме.',
    chips: ['AI-сервисы и подписки', 'Единый API', 'Лимиты и отчётность', 'Интеграция под задачу'],
    heroTitle: 'Три уровня поставки',
    heroItems: [
      ['01', 'Доступ', 'Лицензии и рабочие места'],
      ['02', 'Платформа', 'API, ключи и маршрутизация'],
      ['03', 'Интеграция', 'Встраивание в процессы'],
    ],
    sectionTitle: 'Выберите глубину внедрения, которая нужна вашей команде',
    offers: [
      {
        icon: Bot,
        title: 'AI-инструменты для сотрудников',
        text: 'Корпоративный доступ к ассистентам и специализированным сервисам для разработки, исследований, контента и работы со встречами.',
        items: ['Подбор инструмента под роль', 'Поставка и продление доступа', 'Инструкции и поддержка пользователей'],
      },
      {
        icon: Braces,
        title: 'TechCatalyst AI API',
        text: 'Одна совместимая точка подключения к нескольким AI-провайдерам без отдельной интеграции и учёта по каждому из них.',
        items: ['Организации, пользователи и API-ключи', 'Маршрутизация и смена провайдера', 'Лимиты, потребление, стоимость и баланс'],
      },
      {
        icon: Boxes,
        title: 'Интеграция в продукты и процессы',
        text: 'Проектируем прикладной сценарий, соединяем AI с вашими системами и доводим интеграцию до проверяемого результата.',
        items: ['Архитектура и критерии приёмки', 'API- и бизнес-интеграции', 'Тестирование, запуск и обучение'],
      },
      {
        icon: ShieldCheck,
        title: 'Корпоративное развёртывание',
        text: 'Настраиваем роли, доступ, мониторинг и отчётность; по проектной схеме разворачиваем выделенный экземпляр на инфраструктуре заказчика или исполнителя.',
        items: ['RBAC и организационные лимиты', 'Мониторинг интеграций и уведомления', 'SLA и сопровождение по договору'],
      },
    ],
    valueTitle: 'Не перепродаём «доступ к чату» — собираем рабочую AI-систему',
    values: [
      ['Один вход', 'Одна точка подключения вместо отдельных ключей и интеграций.', KeyRound],
      ['Управление', 'Роли, лимиты и расходы по организациям и пользователям.', Users],
      ['Наблюдаемость', 'Статусы провайдеров, потребление, стоимость и события.', BarChart3],
      ['Переносимость', 'Смена модели или провайдера без переписывания всего продукта.', RefreshCcw],
    ],
    process: [
      ['Сценарий', 'Определяем пользователей, системы, данные и ожидаемый результат.'],
      ['Архитектура', 'Фиксируем поставщиков, интеграции, безопасность и границы ответственности.'],
      ['Пилот', 'Собираем ограниченный рабочий контур и проверяем его на реальных данных.'],
      ['Запуск', 'Настраиваем доступы, лимиты, мониторинг, поддержку и передаём документацию.'],
    ],
    useTitle: 'Шесть прикладных направлений',
    useCases: [
      ['AI-ассистенты', 'Работа с документами, знаниями и внутренними задачами.'],
      ['Разработка', 'AI-инструменты для кода, ревью и инженерного поиска.'],
      ['Маркетинг и дизайн', 'Текст, изображения, видео и масштабирование контента.'],
      ['Исследования', 'Поиск, сопоставление источников и подготовка аналитики.'],
      ['Встречи', 'Транскрипция, резюме, задачи и фиксация решений.'],
      ['In-house продукты', 'Ассистенты и прикладные сервисы на едином API.'],
    ],
    proofTitle: 'Опыт, на котором строится AI-направление',
    proofs: [
      ['Корпоративный LLM-доступ', 'Проект оказания услуг по предоставлению удалённого доступа к большим языковым моделям — с 2025 года.'],
      ['Отраслевой AI-поиск', 'Разработка и внедрение модели для анализа и поиска судебной практики.'],
      ['Собственная платформа', 'TechCatalyst AI управляет организациями, пользователями, ключами, маршрутами, лимитами, потреблением и мониторингом.'],
    ],
    faq: [
      ['Можно начать только с поставки лицензий?', 'Да. Доступ, платформа и интеграция — самостоятельные уровни. Можно начать с лицензий, а технический контур подключить позже.'],
      ['Какие модели и сервисы поддерживаются?', 'Состав зависит от актуальных интеграций и требований заказчика. В предложении фиксируем конкретных провайдеров, модели, способ доступа и ограничения до оплаты.'],
      ['Можно развернуть платформу у заказчика?', 'Да, выделенное развёртывание входит в проектные варианты поставки. Архитектура, ресурсы, границы поддержки и SLA фиксируются отдельно.'],
      ['Как формируется цена?', 'По числу пользователей или организаций, объёму потребления, числу провайдеров, составу интеграций, уровню поддержки и требованиям к развёртыванию. Итог фиксируется в КП и договоре.'],
    ],
    modal: 'ai' as const,
    cta: 'Обсудить AI-задачу',
  },
  vpn: {
    kicker: 'TechCatalyst VPN и серверная инфраструктура',
    title: 'Корпоративный VPN — от готового доступа до self-service управления',
    lead:
      'Подбираем и разворачиваем серверную инфраструктуру, выдаём индивидуальные профили и закреплённый egress IP. Выберите управляемый сервис, выделенный сервер или централизованную панель.',
    chips: ['Индивидуальные ключи', 'Выделенный egress IP', 'Контроль выдачи и отзыва', 'Без инспекции содержимого'],
    heroTitle: 'Три формата ответственности',
    heroItems: [
      ['01', 'Managed', 'VPN под ключ'],
      ['02', 'Server', 'Root-доступ заказчику'],
      ['03', 'Control', 'Self-service панель'],
    ],
    sectionTitle: 'От полностью управляемого сервиса до самостоятельной эксплуатации',
    offers: [
      {
        icon: Network,
        title: 'VPN под ключ',
        text: 'Подбираем сервер, разворачиваем VPN-контур, создаём индивидуальные профили и сопровождаем работоспособность серверной части.',
        items: ['Готовый доступ для пользователей', 'Базовое администрирование', 'Контроль состояния и поддержка'],
      },
      {
        icon: Server,
        title: 'Выделенный сервер',
        text: 'Подбираем и арендуем сервер, передаём заказчику root-доступ. Настройку и эксплуатацию сервисов выполняет техническая команда заказчика.',
        items: ['Выделенная инфраструктура', 'Полный административный доступ', 'Коммуникация с хостинг-провайдером'],
      },
      {
        icon: CircleGauge,
        title: 'Централизованная панель',
        text: 'Единый интерфейс для жизненного цикла доступов, состояния шлюзов, закреплённых IP и технических событий.',
        items: ['Создание, ротация и отзыв профилей', 'Роли и изоляция организаций', 'Статусы, лимиты и отчётность'],
      },
      {
        icon: ShieldCheck,
        title: 'Корпоративная политика доступа',
        text: 'Индивидуальные ключи на пользователя и устройство, управляемый DNS, сетевые правила и журнал технических подключений без перехвата содержимого трафика.',
        items: ['Общие ключи не используются', 'ACL и egress-политика', 'Отзы и аудит действий'],
      },
    ],
    valueTitle: 'Безопасный корпоративный доступ, а не «общий конфиг в чате»',
    values: [
      ['Идентичность', 'Отдельный профиль и ключ для каждого пользователя и устройства.', KeyRound],
      ['Управление', 'Выдача, ротация, блокировка и отзыв из одной операционной схемы.', RefreshCcw],
      ['Инфраструктура', 'Закреплённый egress IP или согласованный пул IP для компании.', Server],
      ['Приватность', 'Технические метрики соединения без записи адресов назначения и содержимого.', ShieldCheck],
    ],
    process: [
      ['Требования', 'Фиксируем число пользователей, устройства, географию, IP, ACL и модель администрирования.'],
      ['Схема', 'Подбираем протокол, серверы, DNS, правила доступа, журналирование и границы SLA.'],
      ['Развёртывание', 'Поднимаем инфраструктуру, создаём политики и подключаем пилотную группу.'],
      ['Передача', 'Выдаём доступы безопасным способом, обучаем администраторов и передаём регламент.'],
    ],
    useTitle: 'Сравнение трёх форматов',
    useCases: [
      ['VPN под ключ', 'Минимум участия со стороны заказчика; серверную часть ведёт TechCatalyst.'],
      ['Сервер с root-доступом', 'Максимум технической свободы; настройка и эксплуатация на стороне заказчика.'],
      ['Админ-панель', 'Самостоятельная работа с большим числом профилей, ролей и статусов.'],
      ['Выделенный IP', 'Стабильный корпоративный egress для разрешённых бизнес-сценариев.'],
      ['Проектные команды', 'Быстрая выдача временного доступа и централизованный отзыв.'],
      ['AI Access Package', 'VPN может входить в персональный пакет доступа вместе с AI-лицензией и корпоративной идентичностью.'],
    ],
    proofTitle: 'Границы решения фиксируем до запуска',
    proofs: [
      ['Протоколы', 'Современные WireGuard-, IKEv2- или ZTNA-сценарии; устаревшие небезопасные протоколы не используем.'],
      ['Ответственность', 'Для каждой модели заранее определяем, кто настраивает, администрирует и восстанавливает серверную часть.'],
      ['Compliance', 'VPN — корпоративный канал доступа. Он не предназначен для обхода условий поставщика или маскировки недопустимой локации.'],
    ],
    faq: [
      ['Чем отличаются три формата?', 'В managed-варианте серверную часть ведём мы; при аренде сервера передаём root-доступ и эксплуатацию заказчику; панель добавляет self-service управление профилями и состоянием.'],
      ['Используются ли общие профили?', 'Нет. Целевая модель — отдельный ключ на пользователя и устройство. Это упрощает отзыв доступа и исключает бесконтрольное распространение общего конфига.'],
      ['Видите ли вы содержимое трафика?', 'Нет. Состав технических логов ограничен событиями подключения, устройством, шлюзом, результатом и эксплуатационными метриками. TLS-перехват не является частью продукта.'],
      ['Можно ли использовать VPN для доступа к любому сервису?', 'Только для согласованных и разрешённых сценариев. Страна фактического использования и правила конкретного поставщика проверяются отдельно; VPN не отменяет их условия.'],
    ],
    modal: 'vpn' as const,
    cta: 'Подобрать формат VPN',
  },
};

function Wrap({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1180px] px-5 sm:px-7 lg:px-8 ${className}`}>{children}</div>;
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-[20px] border border-[#edf0f7] bg-white ${className}`}>{children}</div>;
}

export default function ProductLandingPage({ kind }: { kind: ProductKind }) {
  const config = configs[kind];
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (source: string) => {
    trackCTAClick(`${kind}_${source}`);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white text-[#222]">
      <MarketingHeader />
      <main>
        <section className="overflow-hidden border-b border-[#edf0f7] bg-[radial-gradient(900px_520px_at_83%_-12%,rgba(24,55,218,.12),transparent_62%)]">
          <Wrap className="grid items-center gap-12 py-[78px] lg:grid-cols-[1.04fr_.96fr] lg:py-[104px]">
            <div>
              <div className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#1837da]">{config.kicker}</div>
              <h1 className="mt-5 text-[clamp(38px,5.1vw,62px)] font-bold leading-[1.06] tracking-[-0.035em]">{config.title}</h1>
              <p className="mt-6 max-w-[760px] text-[17px] leading-[1.62] text-[#63666a] md:text-[19px]">{config.lead}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button type="button" onClick={() => openModal('hero')} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1837da] px-7 py-3 text-[15px] font-semibold text-white transition hover:-translate-y-px hover:bg-[#0046f9]">
                  {config.cta} <ArrowRight className="h-4 w-4" />
                </button>
                <a href="#solutions" className="inline-flex items-center justify-center rounded-full border border-[#d6dcec] bg-white px-7 py-3 text-[15px] font-semibold text-[#313131] transition hover:border-[#1837da] hover:text-[#1837da]">
                  Смотреть состав решения
                </a>
              </div>
              <div className="mt-7 flex flex-wrap gap-2.5">
                {config.chips.map((chip) => (
                  <span key={chip} className="rounded-full border border-[#edf0f7] bg-white px-3.5 py-1.5 text-[13px] font-medium text-[#63666a] before:mr-2 before:text-[9px] before:text-[#10bc10] before:content-['●']">{chip}</span>
                ))}
              </div>
            </div>

            <Card className="p-5 shadow-[rgba(28,40,64,.08)_0_18px_45px_-22px] sm:p-6">
              <div className="flex items-center justify-between border-b border-[#edf0f7] pb-5">
                <div className="text-[22px] font-semibold tracking-[-0.02em]">{config.heroTitle}</div>
                {kind === 'ai' ? <Bot className="h-6 w-6 text-[#1837da]" /> : <Network className="h-6 w-6 text-[#1837da]" />}
              </div>
              <div className="mt-5 grid gap-3">
                {config.heroItems.map(([number, title, text]) => (
                  <div key={number} className="grid grid-cols-[48px_1fr] gap-3 rounded-[14px] border border-[#edf0f7] bg-[#f9fafc] p-4">
                    <div className="font-mono text-[13px] font-semibold text-[#1837da]">{number}</div>
                    <div>
                      <div className="text-[17px] font-semibold">{title}</div>
                      <div className="mt-1 text-[13px] text-[#63666a]">{text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Wrap>
        </section>

        <section id="solutions" className="py-[82px] lg:py-[100px]">
          <Wrap>
            <div className="max-w-[850px]">
              <div className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#1837da]">Линейка решения</div>
              <h2 className="mt-4 text-[32px] font-semibold leading-[1.15] tracking-[-0.025em] md:text-[46px]">{config.sectionTitle}</h2>
            </div>
            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              {config.offers.map((offer) => {
                const Icon = offer.icon;
                return (
                  <Card key={offer.title} className="p-6 sm:p-7">
                    <Icon className="h-6 w-6 text-[#1837da]" />
                    <h3 className="mt-5 text-[27px] font-semibold leading-[1.15] tracking-[-0.02em]">{offer.title}</h3>
                    <p className="mt-3 text-[15px] leading-[1.6] text-[#63666a]">{offer.text}</p>
                    <ul className="mt-5 space-y-2.5">
                      {offer.items.map((item) => (
                        <li key={item} className="flex gap-2.5 text-[14px] text-[#313131]"><BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#1837da]" />{item}</li>
                      ))}
                    </ul>
                  </Card>
                );
              })}
            </div>
          </Wrap>
        </section>

        <section className="border-y border-[#edf0f7] bg-[#f9fafc] py-[82px] lg:py-[100px]">
          <Wrap>
            <div className="max-w-[860px]">
              <div className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#1837da]">Ценность</div>
              <h2 className="mt-4 text-[32px] font-semibold leading-[1.15] tracking-[-0.025em] md:text-[44px]">{config.valueTitle}</h2>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {config.values.map(([title, text, Icon]) => (
                <Card key={String(title)} className="p-5">
                  <Icon className="h-5 w-5 text-[#1837da]" />
                  <h3 className="mt-4 text-[20px] font-semibold">{String(title)}</h3>
                  <p className="mt-2 text-[14px] leading-[1.55] text-[#63666a]">{String(text)}</p>
                </Card>
              ))}
            </div>
          </Wrap>
        </section>

        <section className="py-[82px] lg:py-[100px]">
          <Wrap className="grid gap-10 lg:grid-cols-[.78fr_1.22fr]">
            <div>
              <div className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#1837da]">Процесс</div>
              <h2 className="mt-4 text-[32px] font-semibold leading-[1.15] tracking-[-0.025em] md:text-[44px]">От запроса до рабочего контура</h2>
              <p className="mt-4 text-[15px] leading-[1.6] text-[#63666a]">Сроки и состав каждого этапа зависят от поставщика, масштаба и интеграций и фиксируются в коммерческом предложении.</p>
            </div>
            <div className="grid gap-3">
              {config.process.map(([title, text], index) => (
                <div key={title} className="grid grid-cols-[48px_1fr] gap-4 rounded-[16px] border border-[#edf0f7] p-5">
                  <div className="font-mono text-[12px] font-semibold text-[#1837da]">0{index + 1}</div>
                  <div>
                    <h3 className="text-[19px] font-semibold">{title}</h3>
                    <p className="mt-1 text-[14px] leading-[1.55] text-[#63666a]">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Wrap>
        </section>

        <section className="border-y border-[#edf0f7] bg-[#f9fafc] py-[82px] lg:py-[100px]">
          <Wrap>
            <div className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#1837da]">Сценарии</div>
            <h2 className="mt-4 text-[32px] font-semibold leading-[1.15] tracking-[-0.025em] md:text-[44px]">{config.useTitle}</h2>
            <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {config.useCases.map(([title, text]) => (
                <Card key={title} className="p-5">
                  <div className="flex items-center gap-2 text-[#1837da]"><Check className="h-4 w-4" /><span className="text-[11px] font-semibold uppercase tracking-[0.08em]">сценарий</span></div>
                  <h3 className="mt-4 text-[20px] font-semibold">{title}</h3>
                  <p className="mt-2 text-[14px] leading-[1.55] text-[#63666a]">{text}</p>
                </Card>
              ))}
            </div>
          </Wrap>
        </section>

        <section className="py-[82px] lg:py-[100px]">
          <Wrap>
            <div className="max-w-[800px]">
              <div className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#1837da]">Доказательная база</div>
              <h2 className="mt-4 text-[32px] font-semibold leading-[1.15] tracking-[-0.025em] md:text-[44px]">{config.proofTitle}</h2>
            </div>
            <div className="mt-9 grid gap-4 lg:grid-cols-3">
              {config.proofs.map(([title, text]) => (
                <Card key={title} className="p-5">
                  <FileCheck2 className="h-5 w-5 text-[#1837da]" />
                  <h3 className="mt-4 text-[20px] font-semibold">{title}</h3>
                  <p className="mt-2 text-[14px] leading-[1.55] text-[#63666a]">{text}</p>
                </Card>
              ))}
            </div>
          </Wrap>
        </section>

        <section className="border-y border-[#edf0f7] bg-[#f9fafc] py-[82px] lg:py-[100px]">
          <Wrap>
            <div className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#1837da]">FAQ</div>
            <h2 className="mt-4 text-[32px] font-semibold tracking-[-0.025em] md:text-[44px]">Частые вопросы</h2>
            <div className="mt-9 grid gap-3">
              {config.faq.map(([question, answer]) => (
                <details key={question} className="rounded-[16px] border border-[#edf0f7] bg-white px-5 open:border-[#dfe5ff]">
                  <summary className="cursor-pointer list-none py-5 text-[17px] font-semibold">{question}</summary>
                  <p className="max-w-[900px] pb-5 text-[14px] leading-[1.6] text-[#63666a]">{answer}</p>
                </details>
              ))}
            </div>
          </Wrap>
        </section>

        <section id="contact" className="py-[82px] lg:py-[100px]">
          <Wrap>
            <Card className="bg-[radial-gradient(700px_280px_at_95%_0%,rgba(24,55,218,.13),transparent_62%)] p-6 sm:p-9">
              <div className="max-w-[780px]">
                <div className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#1837da]">ТехКаталист · договор и документы</div>
                <h2 className="mt-4 text-[32px] font-semibold leading-[1.14] tracking-[-0.025em] md:text-[46px]">Соберём решение под ваш масштаб и требования</h2>
                <p className="mt-4 text-[16px] leading-[1.6] text-[#63666a]">Опишите число пользователей, текущую инфраструктуру и желаемый результат. Подготовим вопросы для обследования и предложим формат поставки.</p>
                <button type="button" onClick={() => openModal('final')} className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#1837da] px-7 py-3 text-[15px] font-semibold text-white transition hover:-translate-y-px hover:bg-[#0046f9]">
                  {config.cta} <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </Card>
          </Wrap>
        </section>
      </main>

      <MarketingFooter note={kind === 'ai' ? 'Поставка AI-сервисов, единый API, корпоративное управление и интеграция.' : 'Управляемый корпоративный VPN, выделенная серверная инфраструктура и self-service доступы.'} />

      <ApplicationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} source={`${kind}_landing`} language="ru" variant={config.modal} />
    </div>
  );
}

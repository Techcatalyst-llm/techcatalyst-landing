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
    kicker: 'Поставка и интеграция ИИ для бизнеса',
    title: 'От корпоративного доступа к ИИ до собственного управляемого контура',
    lead:
      'Поставляем сервисы ИИ, подключаем единый программный интерфейс, совместимый с OpenAI, и интегрируем модели в продукты и процессы. Ключи, роли, лимиты, потребление и поддержка — в одной схеме.',
    chips: ['Сервисы ИИ и подписки', 'Единый программный интерфейс', 'Лимиты и отчётность', 'Интеграция под задачу'],
    heroTitle: 'Три уровня поставки',
    heroItems: [
      ['01', 'Доступ', 'Лицензии и рабочие места'],
      ['02', 'Платформа', 'Интерфейс, ключи и маршрутизация'],
      ['03', 'Интеграция', 'Встраивание в процессы'],
    ],
    sectionTitle: 'Выберите глубину внедрения, которая нужна вашей команде',
    offers: [
      {
        icon: Bot,
        title: 'ИИ-инструменты для сотрудников',
        text: 'Корпоративный доступ к ассистентам и специализированным сервисам для разработки, исследований, контента и работы со встречами.',
        items: ['Подбор инструмента под роль', 'Поставка и продление доступа', 'Инструкции и поддержка пользователей'],
      },
      {
        icon: Braces,
        title: 'Платформа TechCatalyst AI',
        text: 'Одна совместимая точка объединяет подключения, интеграции и учёт по нескольким поставщикам ИИ.',
        items: ['Организации, пользователи и ключи доступа', 'Маршрутизация и смена поставщика', 'Лимиты, потребление, стоимость и баланс'],
      },
      {
        icon: Boxes,
        title: 'Интеграция в продукты и процессы',
        text: 'Проектируем прикладной сценарий, соединяем ИИ с вашими системами и доводим интеграцию до проверяемого результата.',
        items: ['Архитектура и критерии приёмки', 'Программные и бизнес-интеграции', 'Тестирование, запуск и обучение'],
      },
      {
        icon: ShieldCheck,
        title: 'Корпоративное развёртывание',
        text: 'Настраиваем роли, доступ, контроль состояния и отчётность; по проектной схеме разворачиваем выделенный экземпляр на инфраструктуре заказчика или исполнителя.',
        items: ['Ролевой доступ и организационные лимиты', 'Контроль интеграций и уведомления', 'Уровень сервиса и сопровождение по договору'],
      },
    ],
    valueTitle: 'Собираем рабочую ИИ-систему вокруг задач вашей компании',
    values: [
      ['Один вход', 'Одна точка подключения вместо отдельных ключей и интеграций.', KeyRound],
      ['Управление', 'Роли, лимиты и расходы по организациям и пользователям.', Users],
      ['Наблюдаемость', 'Статусы поставщиков, потребление, стоимость и события.', BarChart3],
      ['Переносимость', 'Смена модели или поставщика с сохранением кода продукта.', RefreshCcw],
    ],
    process: [
      ['Сценарий', 'Определяем пользователей, системы, данные и ожидаемый результат.'],
      ['Архитектура', 'Фиксируем поставщиков, интеграции, безопасность и границы ответственности.'],
      ['Пробное внедрение', 'Собираем ограниченный рабочий контур и проверяем его на реальных данных.'],
      ['Запуск', 'Настраиваем доступы, лимиты, контроль состояния, поддержку и передаём документацию.'],
    ],
    useTitle: 'Шесть прикладных направлений',
    useCases: [
      ['ИИ-ассистенты', 'Работа с документами, знаниями и внутренними задачами.'],
      ['Разработка', 'ИИ-инструменты для кода, проверки и инженерного поиска.'],
      ['Маркетинг и дизайн', 'Текст, изображения, видео и масштабирование контента.'],
      ['Исследования', 'Поиск, сопоставление источников и подготовка аналитики.'],
      ['Встречи', 'Транскрипция, резюме, задачи и фиксация решений.'],
      ['Внутренние продукты', 'Ассистенты и прикладные сервисы на едином программном интерфейсе.'],
    ],
    proofTitle: 'Опыт, на котором строится направление ИИ',
    proofs: [
      ['Корпоративный LLM-доступ', 'Проект оказания услуг по предоставлению удалённого доступа к большим языковым моделям — с 2025 года.'],
      ['Отраслевой ИИ-поиск', 'Разработка и внедрение модели для анализа и поиска судебной практики.'],
      ['Собственная платформа', 'TechCatalyst AI управляет организациями, пользователями, ключами, маршрутами, лимитами, потреблением и состоянием системы.'],
    ],
    faq: [
      ['Можно начать только с поставки лицензий?', 'Да. Доступ, платформа и интеграция — самостоятельные уровни. Можно начать с лицензий, а технический контур подключить позже.'],
      ['Какие модели и сервисы поддерживаются?', 'Состав зависит от актуальных интеграций и требований заказчика. В предложении фиксируем конкретных поставщиков, модели, способ доступа и ограничения до оплаты.'],
      ['Можно развернуть платформу у заказчика?', 'Да, выделенное развёртывание входит в проектные варианты поставки. Архитектура, ресурсы, границы поддержки и уровень сервиса фиксируются отдельно.'],
      ['Как формируется цена?', 'По числу пользователей или организаций, объёму потребления, числу поставщиков, составу интеграций, уровню поддержки и требованиям к развёртыванию. Итог фиксируется в КП и договоре.'],
    ],
    modal: 'ai' as const,
    cta: 'Обсудить задачу ИИ',
  },
  vpn: {
    kicker: 'TechCatalyst VPN и серверная инфраструктура',
    title: 'Корпоративный VPN — от готового доступа до самостоятельного управления',
    lead:
      'Подбираем и разворачиваем серверную инфраструктуру, выдаём индивидуальные профили и закреплённый выходной IP-адрес. Выберите управляемый сервис, выделенный сервер или централизованную панель.',
    chips: ['Индивидуальные ключи', 'Выделенный выходной IP-адрес', 'Контроль выдачи и отзыва', 'Конфиденциальность трафика'],
    heroTitle: 'Три формата ответственности',
    heroItems: [
      ['01', 'Под ключ', 'Управление TechCatalyst'],
      ['02', 'Сервер', 'Административный доступ заказчику'],
      ['03', 'Панель', 'Самостоятельное управление'],
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
        text: 'Подбираем и арендуем сервер, передаём заказчику административный доступ. Настройку и эксплуатацию сервисов выполняет техническая команда заказчика.',
        items: ['Выделенная инфраструктура', 'Полный административный доступ', 'Коммуникация с поставщиком серверов'],
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
        text: 'Индивидуальные ключи на пользователя и устройство, управляемый DNS, сетевые правила и журнал технических подключений с сохранением конфиденциальности содержимого трафика.',
        items: ['Отдельный ключ на пользователя и устройство', 'Правила доступа и политика выходных адресов', 'Отзы и аудит действий'],
      },
    ],
    valueTitle: 'Управляемый корпоративный доступ с индивидуальными профилями',
    values: [
      ['Идентичность', 'Отдельный профиль и ключ для каждого пользователя и устройства.', KeyRound],
      ['Управление', 'Выдача, ротация, блокировка и отзыв из одной операционной схемы.', RefreshCcw],
      ['Инфраструктура', 'Закреплённый выходной IP-адрес или согласованный пул адресов для компании.', Server],
      ['Конфиденциальность', 'Журнал содержит технические метрики соединения и сохраняет приватность содержимого.', ShieldCheck],
    ],
    process: [
      ['Требования', 'Фиксируем число пользователей, устройства, географию, IP, ACL и модель администрирования.'],
      ['Схема', 'Подбираем протокол, серверы, DNS, правила доступа, журналирование и границы уровня сервиса.'],
      ['Развёртывание', 'Поднимаем инфраструктуру, создаём политики и подключаем пробную группу.'],
      ['Передача', 'Выдаём доступы безопасным способом, обучаем администраторов и передаём регламент.'],
    ],
    useTitle: 'Сравнение трёх форматов',
    useCases: [
      ['VPN под ключ', 'Минимум участия со стороны заказчика; серверную часть ведёт TechCatalyst.'],
      ['Сервер с административным доступом', 'Максимум технической свободы; настройка и эксплуатация на стороне заказчика.'],
      ['Панель администратора', 'Самостоятельная работа с большим числом профилей, ролей и статусов.'],
      ['Выделенный IP-адрес', 'Стабильный корпоративный выход в сеть для разрешённых бизнес-сценариев.'],
      ['Проектные команды', 'Быстрая выдача временного доступа и централизованный отзыв.'],
      ['Персональный пакет доступа', 'VPN может входить в пакет вместе с лицензией ИИ и корпоративной учётной записью.'],
    ],
    proofTitle: 'Границы решения фиксируем до запуска',
    proofs: [
      ['Протоколы', 'Используем современные сценарии WireGuard, IKEv2 и ZTNA.'],
      ['Ответственность', 'Для каждой модели заранее определяем, кто настраивает, администрирует и восстанавливает серверную часть.'],
      ['Соответствие условиям', 'VPN служит корпоративным каналом для согласованных сценариев с учётом правил поставщика и фактической страны использования.'],
    ],
    faq: [
      ['Чем отличаются три формата?', 'В управляемом варианте серверную часть ведёт TechCatalyst; при аренде сервера заказчик получает административный доступ и эксплуатацию; панель добавляет самостоятельное управление профилями и состоянием.'],
      ['Как устроены профили доступа?', 'Каждый пользователь и устройство получают отдельный ключ. Такая модель упрощает отзыв доступа и поддерживает контролируемое распространение профилей.'],
      ['Какие данные фиксируются в журнале?', 'Журнал содержит события подключения, устройство, шлюз, результат и эксплуатационные метрики. Содержимое трафика сохраняет конфиденциальность.'],
      ['Для каких сервисов подходит VPN?', 'VPN работает в согласованных и разрешённых сценариях. Условия учитывают фактическую страну использования и правила конкретного поставщика.'],
    ],
    modal: 'vpn' as const,
    cta: 'Подобрать формат VPN',
  },
};

function Wrap({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1180px] px-5 sm:px-7 lg:px-8 ${className}`}>{children}</div>;
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-[14px] border border-[#e4e8f4] bg-white ${className}`}>{children}</div>;
}

export default function ProductLandingPage({ kind }: { kind: ProductKind }) {
  const config = configs[kind];
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (source: string) => {
    trackCTAClick(`${kind}_${source}`);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white text-[#0d1326]">
      <MarketingHeader />
      <main>
        <section className="relative overflow-hidden border-b border-[#e4e8f4] bg-[radial-gradient(900px_520px_at_83%_-12%,rgba(43,70,240,.09),transparent_62%)]">
          <div className="bg-grid-light absolute inset-0" aria-hidden="true" />
          <Wrap className="relative grid items-center gap-12 py-[78px] lg:grid-cols-[1.04fr_.96fr] lg:py-[104px]">
            <div>
              <div className="font-mono text-[11.5px] font-semibold uppercase tracking-[0.16em] before:mr-2 before:content-['//'] text-[#2b46f0]">{config.kicker}</div>
              <h1 className="mt-5 text-[clamp(38px,5.1vw,62px)] font-bold leading-[1.06] tracking-[-0.035em]">{config.title}</h1>
              <p className="mt-6 max-w-[760px] text-[17px] leading-[1.62] text-[#565e78] md:text-[19px]">{config.lead}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button type="button" onClick={() => openModal('hero')} className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-[#2b46f0] px-7 py-3 text-[15px] font-semibold text-white transition hover:-translate-y-px hover:bg-[#1c33d4]">
                  {config.cta} <ArrowRight className="h-4 w-4" />
                </button>
                <a href="#solutions" className="inline-flex items-center justify-center rounded-[10px] border border-[#c9d2ea] bg-white px-7 py-3 text-[15px] font-semibold text-[#232a42] transition hover:border-[#2b46f0] hover:text-[#2b46f0]">
                  Смотреть состав решения
                </a>
              </div>
              <div className="mt-7 flex flex-wrap gap-2.5">
                {config.chips.map((chip) => (
                  <span key={chip} className="rounded-[10px] border border-[#e4e8f4] bg-white px-3.5 py-1.5 text-[13px] font-medium text-[#565e78] before:mr-2 before:text-[9px] before:text-[#0aa34f] before:content-['●']">{chip}</span>
                ))}
              </div>
            </div>

            <Card className="p-5 shadow-[rgba(28,40,64,.08)_0_18px_45px_-22px] sm:p-6">
              <div className="flex items-center justify-between border-b border-[#e4e8f4] pb-5">
                <div className="text-[22px] font-semibold tracking-[-0.02em]">{config.heroTitle}</div>
                {kind === 'ai' ? <Bot className="h-6 w-6 text-[#2b46f0]" /> : <Network className="h-6 w-6 text-[#2b46f0]" />}
              </div>
              <div className="mt-5 grid gap-3">
                {config.heroItems.map(([number, title, text]) => (
                  <div key={number} className="grid grid-cols-[48px_1fr] gap-3 rounded-[14px] border border-[#e4e8f4] bg-[#f6f8fc] p-4">
                    <div className="font-mono text-[13px] font-semibold text-[#2b46f0]">{number}</div>
                    <div>
                      <div className="text-[17px] font-semibold">{title}</div>
                      <div className="mt-1 text-[13px] text-[#565e78]">{text}</div>
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
              <div className="font-mono text-[11.5px] font-semibold uppercase tracking-[0.16em] before:mr-2 before:content-['//'] text-[#2b46f0]">Линейка решения</div>
              <h2 className="mt-4 text-[32px] font-semibold leading-[1.15] tracking-[-0.025em] md:text-[46px]">{config.sectionTitle}</h2>
            </div>
            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              {config.offers.map((offer) => {
                const Icon = offer.icon;
                return (
                  <Card key={offer.title} className="p-6 sm:p-7">
                    <Icon className="h-6 w-6 text-[#2b46f0]" />
                    <h3 className="mt-5 text-[27px] font-semibold leading-[1.15] tracking-[-0.02em]">{offer.title}</h3>
                    <p className="mt-3 text-[15px] leading-[1.6] text-[#565e78]">{offer.text}</p>
                    <ul className="mt-5 space-y-2.5">
                      {offer.items.map((item) => (
                        <li key={item} className="flex gap-2.5 text-[14px] text-[#232a42]"><BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#2b46f0]" />{item}</li>
                      ))}
                    </ul>
                  </Card>
                );
              })}
            </div>
          </Wrap>
        </section>

        <section className="border-y border-[#e4e8f4] bg-[#f6f8fc] py-[82px] lg:py-[100px]">
          <Wrap>
            <div className="max-w-[860px]">
              <div className="font-mono text-[11.5px] font-semibold uppercase tracking-[0.16em] before:mr-2 before:content-['//'] text-[#2b46f0]">Ценность</div>
              <h2 className="mt-4 text-[32px] font-semibold leading-[1.15] tracking-[-0.025em] md:text-[44px]">{config.valueTitle}</h2>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {config.values.map(([title, text, Icon]) => (
                <Card key={String(title)} className="p-5">
                  <Icon className="h-5 w-5 text-[#2b46f0]" />
                  <h3 className="mt-4 text-[20px] font-semibold">{String(title)}</h3>
                  <p className="mt-2 text-[14px] leading-[1.55] text-[#565e78]">{String(text)}</p>
                </Card>
              ))}
            </div>
          </Wrap>
        </section>

        <section className="py-[82px] lg:py-[100px]">
          <Wrap className="grid gap-10 lg:grid-cols-[.78fr_1.22fr]">
            <div>
              <div className="font-mono text-[11.5px] font-semibold uppercase tracking-[0.16em] before:mr-2 before:content-['//'] text-[#2b46f0]">Процесс</div>
              <h2 className="mt-4 text-[32px] font-semibold leading-[1.15] tracking-[-0.025em] md:text-[44px]">От запроса до рабочего контура</h2>
              <p className="mt-4 text-[15px] leading-[1.6] text-[#565e78]">Сроки и состав каждого этапа зависят от поставщика, масштаба и интеграций и фиксируются в коммерческом предложении.</p>
            </div>
            <div className="grid gap-3">
              {config.process.map(([title, text], index) => (
                <div key={title} className="grid grid-cols-[48px_1fr] gap-4 rounded-[14px] border border-[#e4e8f4] p-5">
                  <div className="font-mono text-[12px] font-semibold text-[#2b46f0]">0{index + 1}</div>
                  <div>
                    <h3 className="text-[19px] font-semibold">{title}</h3>
                    <p className="mt-1 text-[14px] leading-[1.55] text-[#565e78]">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Wrap>
        </section>

        <section className="border-y border-[#e4e8f4] bg-[#f6f8fc] py-[82px] lg:py-[100px]">
          <Wrap>
            <div className="font-mono text-[11.5px] font-semibold uppercase tracking-[0.16em] before:mr-2 before:content-['//'] text-[#2b46f0]">Сценарии</div>
            <h2 className="mt-4 text-[32px] font-semibold leading-[1.15] tracking-[-0.025em] md:text-[44px]">{config.useTitle}</h2>
            <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {config.useCases.map(([title, text]) => (
                <Card key={title} className="p-5">
                  <div className="flex items-center gap-2 text-[#2b46f0]"><Check className="h-4 w-4" /><span className="text-[11px] font-semibold uppercase tracking-[0.08em]">сценарий</span></div>
                  <h3 className="mt-4 text-[20px] font-semibold">{title}</h3>
                  <p className="mt-2 text-[14px] leading-[1.55] text-[#565e78]">{text}</p>
                </Card>
              ))}
            </div>
          </Wrap>
        </section>

        <section className="py-[82px] lg:py-[100px]">
          <Wrap>
            <div className="max-w-[800px]">
              <div className="font-mono text-[11.5px] font-semibold uppercase tracking-[0.16em] before:mr-2 before:content-['//'] text-[#2b46f0]">Доказательная база</div>
              <h2 className="mt-4 text-[32px] font-semibold leading-[1.15] tracking-[-0.025em] md:text-[44px]">{config.proofTitle}</h2>
            </div>
            <div className="mt-9 grid gap-4 lg:grid-cols-3">
              {config.proofs.map(([title, text]) => (
                <Card key={title} className="p-5">
                  <FileCheck2 className="h-5 w-5 text-[#2b46f0]" />
                  <h3 className="mt-4 text-[20px] font-semibold">{title}</h3>
                  <p className="mt-2 text-[14px] leading-[1.55] text-[#565e78]">{text}</p>
                </Card>
              ))}
            </div>
          </Wrap>
        </section>

        <section className="border-y border-[#e4e8f4] bg-[#f6f8fc] py-[82px] lg:py-[100px]">
          <Wrap>
            <div className="font-mono text-[11.5px] font-semibold uppercase tracking-[0.16em] before:mr-2 before:content-['//'] text-[#2b46f0]">Вопросы и ответы</div>
            <h2 className="mt-4 text-[32px] font-semibold tracking-[-0.025em] md:text-[44px]">Частые вопросы</h2>
            <div className="mt-9 grid gap-3">
              {config.faq.map(([question, answer]) => (
                <details key={question} className="rounded-[14px] border border-[#e4e8f4] bg-white px-5 open:border-[#e3e9ff]">
                  <summary className="cursor-pointer list-none py-5 text-[17px] font-semibold">{question}</summary>
                  <p className="max-w-[900px] pb-5 text-[14px] leading-[1.6] text-[#565e78]">{answer}</p>
                </details>
              ))}
            </div>
          </Wrap>
        </section>

        <section id="contact" className="py-[82px] lg:py-[100px]">
          <Wrap>
            <Card className="bg-[radial-gradient(700px_280px_at_95%_0%,rgba(43,70,240,.13),transparent_62%)] p-6 sm:p-9">
              <div className="max-w-[780px]">
                <div className="font-mono text-[11.5px] font-semibold uppercase tracking-[0.16em] before:mr-2 before:content-['//'] text-[#2b46f0]">ТехКаталист · договор и документы</div>
                <h2 className="mt-4 text-[32px] font-semibold leading-[1.14] tracking-[-0.025em] md:text-[46px]">Соберём решение под ваш масштаб и требования</h2>
                <p className="mt-4 text-[16px] leading-[1.6] text-[#565e78]">Опишите число пользователей, текущую инфраструктуру и желаемый результат. Подготовим вопросы для обследования и предложим формат поставки.</p>
                <button type="button" onClick={() => openModal('final')} className="mt-7 inline-flex items-center gap-2 rounded-[10px] bg-[#2b46f0] px-7 py-3 text-[15px] font-semibold text-white transition hover:-translate-y-px hover:bg-[#1c33d4]">
                  {config.cta} <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </Card>
          </Wrap>
        </section>
      </main>

      <MarketingFooter note={kind === 'ai' ? 'Поставка сервисов ИИ, единый программный интерфейс, корпоративное управление и интеграция.' : 'Управляемый корпоративный VPN, выделенная серверная инфраструктура и самостоятельное управление доступами.'} />

      <ApplicationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} source={`${kind}_landing`} language="ru" variant={config.modal} />
    </div>
  );
}

import type { Metadata } from "next";
import {
  Badge,
  Button,
  Card,
  Chip,
  Field,
  GridBg,
  Glow,
  Header,
  Kicker,
  Reveal,
  SquareList,
  TermCaret,
  TermCmd,
  Terminal,
  TermMask,
  TermOut,
  TermPrompt,
  TermSecret,
  TermStatus,
  TextareaField,
} from "@/components/ds";

export const metadata: Metadata = {
  title: "Дизайн-система TechCatalyst — витрина компонентов",
  robots: { index: false, follow: false },
};

function Section({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-[1180px] px-5 py-12 sm:px-7 lg:px-8">
      <Kicker>{kicker}</Kicker>
      <h2 className="mt-2 text-[clamp(30px,3.4vw,42px)] font-[650] leading-[1.15] tracking-[-0.025em] text-heading">
        {title}
      </h2>
      <div className="mt-8">{children}</div>
    </section>
  );
}

export default function DesignSystemPage() {
  return (
    <main className="bg-white pb-24">
      {/* Hero — светлый (референс hero-light.html) */}
      <section className="relative overflow-hidden border-b border-line">
        <Glow />
        <GridBg />
        <div className="relative mx-auto max-w-[1180px] px-5 py-[72px] sm:px-7 lg:px-8">
          <div className="max-w-[760px]">
            <Kicker>Продуктовая линейка TechCatalyst</Kicker>
            <h1 className="mt-[18px] text-[clamp(36px,5vw,56px)] font-bold leading-[1.06] tracking-[-0.035em] text-heading">
              Технологический контур для работы с зарубежным ПО и ИИ
            </h1>
            <p className="mt-5 max-w-[640px] text-[17.5px] leading-[1.62] text-muted">
              Поставляем лицензии, подключаем и интегрируем ИИ, защищаем рабочие места
              разработчиков. Один подрядчик — от коммерческой схемы до работающего контура.
            </p>
            <div className="mt-[30px] flex flex-wrap gap-3">
              <Button href="#contact">Обсудить задачу →</Button>
              <Button variant="ghost" href="#products">
                Смотреть продукты
              </Button>
            </div>
            <div className="mt-[26px] flex flex-wrap gap-2.5">
              <Chip>ИП · договор и документы</Chip>
              <Chip>Корпоративная поставка</Chip>
              <Chip>Инженерное внедрение</Chip>
            </div>
          </div>
        </div>
      </section>

      <Section kicker="Шапка" title="Header — светлый и тёмный">
        <div className="grid gap-3.5">
          <Header
            nav={[
              { href: "#", label: "Продукты" },
              { href: "#", label: "Зарубежное ПО" },
              { href: "#", label: "ИИ и интеграция" },
              { href: "#", label: "Guard", active: true },
              { href: "#", label: "Документация" },
            ]}
            cta={{ href: "#", label: "Обсудить задачу" }}
          />
          <Header
            dark
            product="Guard"
            nav={[
              { href: "#", label: "Возможности" },
              { href: "#", label: "Архитектура" },
              { href: "#", label: "Внедрение" },
            ]}
            cta={{ href: "#", label: "Запросить пилот" }}
          />
        </div>
      </Section>

      <Section kicker="Кнопки" title="Buttons">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Обсудить задачу →</Button>
          <Button variant="ghost">Смотреть продукты</Button>
          <Button size="sm">Компактная</Button>
          <Button variant="ghost" size="sm">
            Компактная ghost
          </Button>
        </div>
        <div className="mt-3.5 flex flex-wrap items-center gap-3 rounded-panel bg-navy-950 p-6">
          <Button variant="darkGhost">Архитектура решения</Button>
          <Button>Запросить пробное внедрение</Button>
        </div>
      </Section>

      <Section kicker="Метки" title="Badges и чипы">
        <div className="flex flex-wrap items-center gap-3">
          <Badge>Продукт</Badge>
          <Badge variant="amber">Скоро</Badge>
          <Chip>В контуре заказчика</Chip>
          <Chip>Строгий режим</Chip>
        </div>
        <div className="mt-3.5 flex flex-wrap gap-2.5 rounded-panel bg-navy-950 p-6">
          <Chip dark>В контуре заказчика</Chip>
          <Chip dark>Локальная обработка</Chip>
        </div>
      </Section>

      <Section kicker="Карточки" title="Cards">
        <div className="grid gap-5 md:grid-cols-3">
          <Reveal delay={1}>
            <Card num="01">
              <h3 className="text-[19px] font-semibold tracking-[-0.01em] text-heading">
                Зарубежное ПО
              </h3>
              <p className="mt-2 text-[14.5px] leading-[1.55] text-muted">
                Лицензии и подписки с договором в рублях, закрывающими документами.
              </p>
              <SquareList
                className="mt-4"
                items={["Договор и счёт в РФ", "Поставка от 3 дней"]}
              />
            </Card>
          </Reveal>
          <Reveal delay={2}>
            <Card num="02">
              <h3 className="text-[19px] font-semibold tracking-[-0.01em] text-heading">
                ИИ и интеграция
              </h3>
              <p className="mt-2 text-[14.5px] leading-[1.55] text-muted">
                Корпоративный доступ к моделям и внедрение в рабочие процессы.
              </p>
              <SquareList className="mt-4" items={["Мульти-провайдер", "Учёт расходов"]} />
            </Card>
          </Reveal>
          <Reveal delay={3}>
            <Card num="03">
              <h3 className="text-[19px] font-semibold tracking-[-0.01em] text-heading">
                Guard
              </h3>
              <p className="mt-2 text-[14.5px] leading-[1.55] text-muted">
                Маскирование секретов до передачи ИИ-агенту, обработка в контуре.
              </p>
              <SquareList className="mt-4" items={["Терминал и MCP", "Строгий режим"]} />
            </Card>
          </Reveal>
        </div>
      </Section>

      <Section kicker="Формы" title="Форма заявки">
        <div className="max-w-[440px] rounded-panel border border-line bg-white p-7 shadow-card">
          <Kicker>Пилотное внедрение</Kicker>
          <h4 className="mb-1.5 mt-2.5 text-[22px] font-[650] tracking-[-0.02em] text-heading">
            Оставьте заявку
          </h4>
          <div className="grid gap-3.5 pt-2">
            <Field label="Рабочая почта" type="email" placeholder="name@company.ru" />
            <Field label="Компания" type="text" placeholder="ООО «Компания»" />
            <TextareaField label="Задача" placeholder="Коротко опишите контур и задачу" />
          </div>
          <Button type="submit" className="mt-[18px] w-full">
            Отправить заявку
          </Button>
          <p className="mt-3 text-[12px] leading-[1.5] text-dim">
            Отправляя форму, вы соглашаетесь с политикой конфиденциальности.
          </p>
        </div>
      </Section>

      <Section kicker="Терминал" title="Терминал Guard">
        <Terminal title="защищённый терминал — агент Guard v1.0" className="max-w-[640px]">
          <div>
            <TermPrompt>~/payments-service $</TermPrompt> <TermCmd>cat .env</TermCmd>
          </div>
          <div>
            <TermOut>DATABASE_URL=postgres://prod:</TermOut>
            <TermMask>[MASKED:DB_PASSWORD]</TermMask>
            <TermOut>@db.internal:5432</TermOut>
          </div>
          <div>
            <TermOut>AWS_ACCESS_KEY_ID=</TermOut>
            <TermMask>[MASKED:AWS_KEY]</TermMask>
          </div>
          <div>
            <TermOut>STRIPE_SECRET_KEY=</TermOut>
            <TermSecret>sk_live_fake_fake</TermSecret>
          </div>
          <TermStatus>▲ guard: 3 секрета замаскированы · policy corp-default v12</TermStatus>
          <div>&nbsp;</div>
          <div>
            <TermPrompt>~/payments-service $</TermPrompt> <TermCmd>tail -n2 users.log</TermCmd>
            <TermCaret />
          </div>
        </Terminal>
      </Section>

      {/* Hero — тёмный (референс hero-dark.html) */}
      <section className="relative overflow-hidden bg-navy-950">
        <GridBg dark />
        <Glow dark />
        <div className="relative z-[1] mx-auto max-w-[1180px] px-5 py-[72px] sm:px-7 lg:px-8">
          <div className="max-w-[760px]">
            <Kicker>Безопасность рабочей станции</Kicker>
            <h1 className="mt-[18px] text-[clamp(34px,4.8vw,52px)] font-bold leading-[1.08] tracking-[-0.035em] text-white">
              Учётные данные остаются на рабочей станции.{" "}
              <em className="not-italic text-[#8b9cff]">Под защитой при работе с ИИ.</em>
            </h1>
            <p className="mt-5 max-w-[620px] text-[17px] leading-[1.62] text-navy-text">
              TechCatalyst Guard перехватывает команды терминала, ответы MCP и буфер обмена — и
              маскирует секреты до передачи ИИ-агенту. Обработка в контуре заказчика.
            </p>
            <div className="mt-[30px] flex flex-wrap gap-3">
              <Button className="shadow-[0_10px_28px_-8px_rgba(43,70,240,.55)]">
                Запросить пробное внедрение
              </Button>
              <Button variant="darkGhost">Архитектура решения</Button>
            </div>
            <div className="mt-[26px] flex flex-wrap gap-2.5">
              <Chip dark>В контуре заказчика</Chip>
              <Chip dark>Строгий режим</Chip>
              <Chip dark>Локальная обработка</Chip>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

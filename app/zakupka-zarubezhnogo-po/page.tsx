import type { Metadata } from 'next';

import ForeignSoftwareProcurementPage from '@/components/ForeignSoftwareProcurementPage';

const title = 'Закупка зарубежного ПО для юридических лиц | ТехКаталист';
const description =
  'Закупка и продление лицензий иностранного ПО для юрлиц: Cursor, OpenAI, Claude, Microsoft 365, Adobe, Atlassian и другие. Оплата по счёту, договор, закрывающие документы и поставка от 7 рабочих дней.';
const url = 'https://techcatalyst.ru/zakupka-zarubezhnogo-po';

const faqItems = [
  {
    question: 'Какое зарубежное ПО можно закупить через ТехКаталист?',
    answer:
      'В первую очередь мы ориентируемся на ИИ-сервисы, облачные продукты и корпоративные лицензии: Cursor, OpenAI, Claude, Microsoft 365, Adobe, Atlassian, Figma и другие сценарии корпоративной закупки.',
  },
  {
    question: 'Как подтверждается легальность сделки и документы для бухгалтерии?',
    answer:
      'Исполнитель по сделке — ИП Борисов Иван Анатольевич, ИНН 575307745402, ОГРНИП 320574900010615. Работаем по счёту, договору и закрывающим документам.',
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
    question: 'Можно ли провести продление действующих лицензий?',
    answer:
      'Да. Мы рассматриваем не только первичную закупку, но и продление зарубежного ПО, когда у компании уже есть действующие подписки и нужен стабильный сценарий сопровождения.',
  },
  {
    question: 'Что нужно прислать для расчёта?',
    answer:
      'Обычно достаточно названия поставщика, числа лицензий, желаемого срока закупки, требований к документам и контактного лица со стороны компании.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: 'Закупка зарубежного ПО для юридических лиц',
      serviceType: 'Корпоративная закупка зарубежного ПО',
      url,
      description,
      areaServed: 'RU',
      provider: {
        '@type': 'Organization',
        name: 'ТехКаталист',
        legalName: 'ИП Борисов Иван Анатольевич',
        taxID: '575307745402',
        identifier: 'ОГРНИП 320574900010615',
        url: 'https://techcatalyst.ru',
      },
      audience: {
        '@type': 'BusinessAudience',
        audienceType: 'Юридические лица, ИТ, финансовый блок, закупка',
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'ТехКаталист',
          item: 'https://techcatalyst.ru',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Закупка зарубежного ПО',
          item: url,
        },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
  ],
};

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'закупка зарубежного ПО',
    'оплата зарубежного ПО',
    'закупка лицензий ПО за рубежом',
    'оплата лицензий иностранного ПО для юридических лиц',
    'купить зарубежное ПО для юрлиц',
    'продление лицензии иностранного ПО',
    'оплата OpenAI для юрлиц',
    'оплата Claude для бизнеса',
    'оплата Microsoft 365 из России',
    'закрывающие документы для оплаты зарубежного ПО',
  ],
  alternates: {
    canonical: '/zakupka-zarubezhnogo-po',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title,
    description,
    url,
    siteName: 'ТехКаталист',
    locale: 'ru_RU',
    type: 'website',
    images: [
      {
        url: '/zakupka-zarubezhnogo-po/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Закупка зарубежного ПО для юридических лиц — ТехКаталист',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/zakupka-zarubezhnogo-po/opengraph-image'],
  },
};

export default function ForeignSoftwareProcurementRoute() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ForeignSoftwareProcurementPage />
    </>
  );
}

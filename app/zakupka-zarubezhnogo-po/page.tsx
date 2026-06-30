import type { Metadata } from 'next';

import ForeignSoftwareProcurementPage from '@/components/ForeignSoftwareProcurementPage';

const title = 'Закупка зарубежного ПО для юридических лиц | ТехКаталист';
const description =
  'Закупка и продление лицензий иностранного ПО для юрлиц: OpenAI, Claude, Gemini, Microsoft 365, Adobe, Atlassian и другие. Оплата по счёту, договор, закрывающие документы, корпоративный закупочный контур.';
const url = 'https://techcatalyst.ru/zakupka-zarubezhnogo-po';

const faqItems = [
  {
    question: 'Какое зарубежное ПО можно закупить через ТехКаталист?',
    answer:
      'В первую очередь мы ориентируемся на ИИ-сервисы, облачные продукты и корпоративные лицензии: OpenAI, Claude, Gemini, Microsoft 365, Adobe, Atlassian, Figma и другие сценарии корпоративной закупки.',
  },
  {
    question: 'Подходит ли это для юридических лиц и корпоративного закупочного контура?',
    answer:
      'Да. Страница ориентирована именно на закупку зарубежного ПО для юридических лиц, где важны договор, счёт, закрывающие документы и согласование с финансами и закупкой.',
  },
  {
    question: 'Можно ли провести продление действующих лицензий?',
    answer:
      'Да. Мы рассматриваем не только первичную закупку, но и продление зарубежного ПО, когда у компании уже есть действующие подписки и нужен стабильный сценарий сопровождения.',
  },
  {
    question: 'Что нужно прислать для расчёта?',
    answer:
      'Обычно достаточно вендора, числа лицензий, желаемого срока закупки, требования к документам и контактного лица со стороны компании. После этого можно подготовить маршрут и коммерческое предложение.',
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

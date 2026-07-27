import type { Metadata } from 'next';

import ProductLandingPage from '@/components/ProductLandingPage';

export const metadata: Metadata = {
  title: 'Поставка и интеграция ИИ для бизнеса | TechCatalyst',
  description:
    'Поставка сервисов ИИ, единый программный интерфейс с поддержкой OpenAI, корпоративные ключи, лимиты, учёт потребления и интеграция ИИ в продукты и процессы.',
  alternates: { canonical: '/postavka-i-integraciya-ai' },
  openGraph: {
    title: 'Поставка и интеграция ИИ для бизнеса | TechCatalyst',
    description: 'От корпоративного доступа к ИИ до собственного управляемого контура.',
    url: 'https://techcatalyst.ru/postavka-i-integraciya-ai',
    type: 'website',
    locale: 'ru_RU',
  },
};

export default function AiDeliveryPage() {
  return <ProductLandingPage kind="ai" />;
}

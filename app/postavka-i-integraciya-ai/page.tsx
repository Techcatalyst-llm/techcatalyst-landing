import type { Metadata } from 'next';

import ProductLandingPage from '@/components/ProductLandingPage';

export const metadata: Metadata = {
  title: 'Поставка и интеграция AI для бизнеса | TechCatalyst',
  description:
    'Поставка AI-сервисов, единый OpenAI-совместимый API, корпоративные ключи, лимиты, учёт потребления и интеграция AI в продукты и процессы.',
  alternates: { canonical: '/postavka-i-integraciya-ai' },
  openGraph: {
    title: 'Поставка и интеграция AI для бизнеса | TechCatalyst',
    description: 'От корпоративного AI-доступа до собственного управляемого контура.',
    url: 'https://techcatalyst.ru/postavka-i-integraciya-ai',
    type: 'website',
    locale: 'ru_RU',
  },
};

export default function AiDeliveryPage() {
  return <ProductLandingPage kind="ai" />;
}

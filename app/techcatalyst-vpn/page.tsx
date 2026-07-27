import type { Metadata } from 'next';

import ProductLandingPage from '@/components/ProductLandingPage';

export const metadata: Metadata = {
  title: 'TechCatalyst VPN — корпоративный VPN и серверная инфраструктура',
  description:
    'VPN под ключ, выделенный сервер с административным доступом и централизованная панель управления индивидуальными профилями, выходными IP-адресами и доступами.',
  alternates: { canonical: '/techcatalyst-vpn' },
  openGraph: {
    title: 'TechCatalyst VPN — корпоративный VPN и серверная инфраструктура',
    description: 'От управляемого VPN-сервиса до самостоятельного управления доступами.',
    url: 'https://techcatalyst.ru/techcatalyst-vpn',
    type: 'website',
    locale: 'ru_RU',
  },
};

export default function VpnPage() {
  return <ProductLandingPage kind="vpn" />;
}

import Link from 'next/link';
import { Inter, Lora } from 'next/font/google';

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

interface LegalPageProps {
  title: string;
  subtitle: string;
  updatedAt: string;
  children: React.ReactNode;
}

export default function LegalPage({ title, subtitle, updatedAt, children }: LegalPageProps) {
  return (
    <div className={`${inter.className} min-h-screen bg-white text-[#1c1d1f]`} style={{ fontFeatureSettings: '"ss03"' }}>
      <header className="border-b border-[#e4e7ec] bg-white">
        <div className="mx-auto flex max-w-[1040px] items-center justify-between px-6 py-5 sm:px-8">
          <Link href="/" className="text-[16px] font-semibold tracking-[-0.01em] text-[#1c1d1f]">
            ТехКаталист
          </Link>
          <div className="flex items-center gap-4 text-[14px] text-[#6f7988]">
            <Link href="/privacy" className="transition-colors hover:text-[#1c1d1f]">
              Конфиденциальность
            </Link>
            <Link href="/cookie" className="transition-colors hover:text-[#1c1d1f]">
              Cookie
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1040px] px-6 py-14 sm:px-8 sm:py-16">
        <div className="max-w-[760px]">
          <div className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#407ff2]">Юридические документы</div>
          <h1
            className={`${lora.className} mt-4 text-[36px] font-medium leading-[1.08] tracking-[-0.7px] text-[#1c1d1f] sm:text-[48px]`}
            style={{ fontFeatureSettings: '"ss03"' }}
          >
            {title}
          </h1>
          <p className="mt-4 text-[16px] leading-[1.5] tracking-[-0.24px] text-[#6f7988]">{subtitle}</p>
          <p className="mt-3 text-[13px] leading-[1.4] tracking-[-0.13px] text-[#8f99a8]">Актуально на {updatedAt}</p>
        </div>

        <div className="mt-10 rounded-[8px] border border-[#e4e7ec] bg-white p-6 sm:p-8" style={{ boxShadow: 'rgba(28, 40, 64, 0.1) 0px 2px 3px -2px, rgba(28, 40, 64, 0.04) 0px 4px 6px -2px' }}>
          <div className="legal-content max-w-none [&_a]:text-[#407ff2] [&_a]:transition-colors [&_a:hover]:text-[#1c1d1f] [&_h2]:mt-8 [&_h2]:text-[24px] [&_h2]:font-medium [&_h2]:leading-[1.25] [&_h2]:tracking-[-0.36px] [&_h2]:text-[#1c1d1f] [&_li]:text-[15px] [&_li]:leading-[1.6] [&_li]:tracking-[-0.15px] [&_li]:text-[#505967] [&_ol]:my-4 [&_ol]:pl-5 [&_p]:mt-4 [&_p]:text-[15px] [&_p]:leading-[1.6] [&_p]:tracking-[-0.15px] [&_p]:text-[#505967] [&_strong]:font-semibold [&_strong]:text-[#1c1d1f] [&_ul]:my-4 [&_ul]:pl-5">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

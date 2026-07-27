import Link from 'next/link';

interface LegalPageProps {
  title: string;
  subtitle: string;
  updatedAt: string;
  children: React.ReactNode;
}

export default function LegalPage({ title, subtitle, updatedAt, children }: LegalPageProps) {
  return (
    <div className="min-h-screen bg-white font-sans text-[#0d1326]" style={{ fontFeatureSettings: '"ss03"' }}>
      <header className="border-b border-[#e4e8f4] bg-white">
        <div className="mx-auto flex max-w-[1040px] items-center justify-between px-6 py-5 sm:px-8">
          <Link href="/" className="text-[16px] font-semibold tracking-[-0.01em] text-[#0d1326]">
            TechCatalyst
          </Link>
          <div className="flex items-center gap-4 text-[14px] text-[#565e78]">
            <Link href="/privacy" className="transition-colors hover:text-[#0d1326]">
              Конфиденциальность
            </Link>
            <Link href="/cookie" className="transition-colors hover:text-[#0d1326]">
              Cookie
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1040px] px-6 py-14 sm:px-8 sm:py-16">
        <div className="max-w-[760px]">
          <div className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#4c6bff]">Юридические документы</div>
          <h1
            className="mt-4 text-[36px] font-medium leading-[1.08] tracking-[-0.7px] text-[#0d1326] sm:text-[48px]"
            style={{ fontFeatureSettings: '"ss03"' }}
          >
            {title}
          </h1>
          <p className="mt-4 text-[16px] leading-[1.5] tracking-[-0.24px] text-[#565e78]">{subtitle}</p>
          <p className="mt-3 text-[13px] leading-[1.4] tracking-[-0.13px] text-[#8d93ab]">Версия от {updatedAt}</p>
        </div>

        <div className="mt-10 rounded-[8px] border border-[#e4e8f4] bg-white p-6 sm:p-8" style={{ boxShadow: 'rgba(28, 40, 64, 0.1) 0px 2px 3px -2px, rgba(28, 40, 64, 0.04) 0px 4px 6px -2px' }}>
          <div className="legal-content max-w-none [&_a]:text-[#4c6bff] [&_a]:transition-colors [&_a:hover]:text-[#0d1326] [&_h2]:mt-8 [&_h2]:text-[24px] [&_h2]:font-medium [&_h2]:leading-[1.25] [&_h2]:tracking-[-0.36px] [&_h2]:text-[#0d1326] [&_li]:text-[15px] [&_li]:leading-[1.6] [&_li]:tracking-[-0.15px] [&_li]:text-[#454d68] [&_ol]:my-4 [&_ol]:pl-5 [&_p]:mt-4 [&_p]:text-[15px] [&_p]:leading-[1.6] [&_p]:tracking-[-0.15px] [&_p]:text-[#454d68] [&_strong]:font-semibold [&_strong]:text-[#0d1326] [&_ul]:my-4 [&_ul]:pl-5">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

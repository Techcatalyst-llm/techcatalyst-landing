import { ImageResponse } from 'next/og';

export const alt = 'Закупка зарубежного ПО для юридических лиц — ТехКаталист';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          background: '#ffffff',
          color: '#313131',
          padding: '56px 64px',
          fontFamily: 'Arial, sans-serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 78% 12%, rgba(24,55,218,.16), transparent 30%), radial-gradient(circle at 12% 18%, rgba(255,105,0,.12), transparent 26%)',
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 28, fontWeight: 700 }}>
            <span style={{ color: '#1837da' }}>▲</span>
            <span>ТехКаталист AI</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 900 }}>
            <div
              style={{
                display: 'flex',
                padding: '10px 18px',
                borderRadius: 999,
                background: 'rgba(24,55,218,.08)',
                color: '#1837da',
                fontSize: 24,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                alignSelf: 'flex-start',
              }}
            >
              B2B Procurement
            </div>
            <div style={{ fontSize: 68, lineHeight: 1.04, fontWeight: 800 }}>
              Закупка зарубежного ПО для юридических лиц
            </div>
            <div style={{ fontSize: 32, lineHeight: 1.35, color: '#63666a', maxWidth: 980 }}>
              AI-сервисы, SaaS и иностранные лицензии: счёт, договор, закрывающие документы и корпоративный закупочный контур.
            </div>
          </div>

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {['OpenAI', 'Claude', 'Gemini', 'Microsoft 365', 'Adobe', 'Atlassian'].map((item) => (
              <div
                key={item}
                style={{
                  display: 'flex',
                  padding: '12px 18px',
                  borderRadius: 999,
                  border: '1px solid #edf0f7',
                  background: '#f9fafc',
                  fontSize: 24,
                  color: '#63666a',
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}

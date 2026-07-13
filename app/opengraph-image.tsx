import { ImageResponse } from 'next/og';

export const alt = 'TechCatalyst — зарубежное ПО, AI, Guard и корпоративный VPN';
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
          color: '#1c1d1f',
          padding: '48px 56px',
          fontFamily: 'Arial, sans-serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 82% 16%, rgba(112,161,240,.20), transparent 28%), radial-gradient(circle at 16% 12%, rgba(220,163,165,.18), transparent 24%)',
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              fontSize: 24,
              fontWeight: 600,
            }}
          >
            <div
              style={{
                display: 'flex',
                border: '1px solid #d3d8df',
                borderRadius: 10,
                padding: '8px 12px',
                background: '#ffffff',
              }}
            >
              ▲ TechCatalyst
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 960 }}>
            <div
              style={{
                display: 'flex',
                padding: '8px 12px',
                borderRadius: 10,
                border: '1px solid #d3d8df',
                background: '#ffffff',
                color: '#6f7988',
                fontSize: 20,
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                alignSelf: 'flex-start',
              }}
            >
              Корпоративные технологии
            </div>
            <div style={{ fontSize: 62, lineHeight: 1.02, fontWeight: 500, letterSpacing: '-1.2px' }}>
              Доступ, внедрение и безопасность в одном контуре
            </div>
            <div style={{ fontSize: 28, lineHeight: 1.3, color: '#6f7988', maxWidth: 980 }}>
              Поставка зарубежного ПО, корпоративный AI, безопасное рабочее место разработчика и VPN-инфраструктура.
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {['Зарубежное ПО', 'AI и интеграция', 'TechCatalyst Guard', 'TechCatalyst VPN'].map((item) => (
              <div
                key={item}
                style={{
                  display: 'flex',
                  padding: '10px 14px',
                  borderRadius: 4,
                  border: '1px solid #d3d8df',
                  background: '#f3f4f6',
                  fontSize: 20,
                  color: '#505967',
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

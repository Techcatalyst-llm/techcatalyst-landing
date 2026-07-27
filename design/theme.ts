// Design tokens as a typed object (CSS-in-JS / styled-components)
export const theme = {
  color: {
    brand600:'#2b46f0', brand700:'#1c33d4', brand100:'#e3e9ff', brand050:'#f2f5ff',
    ink900:'#0d1326', ink700:'#232a42', ink500:'#565e78', ink400:'#8d93ab',
    line:'#e4e8f4', lineStrong:'#c9d2ea', surface:'#f6f8fc',
    navy950:'#070b1d', navy900:'#0c1228', navy800:'#141b38', navyLine:'#26305c', navyText:'#aab3d6',
    green:'#0aa34f', greenDeep:'#087a3c', amber:'#e07c00', danger:'#d92d47',
  },
  font: {
    sans: 'Inter,"Segoe UI",Arial,sans-serif',
    mono: '"JetBrains Mono","SF Mono",ui-monospace,Menlo,Consolas,monospace',
  },
  radius: { btn:'10px', card:'14px', panel:'16px', chip:'8px', badge:'6px' },
  shadow: {
    card:  '0 1px 2px rgba(13,19,38,.04),0 8px 24px -12px rgba(13,19,38,.10)',
    panel: '0 1px 2px rgba(13,19,38,.05),0 24px 48px -20px rgba(13,19,38,.16)',
    ringFocus: '0 0 0 3px rgba(43,70,240,.28)',
  },
} as const;
export type Theme = typeof theme;

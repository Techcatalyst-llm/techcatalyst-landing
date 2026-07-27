// Tailwind tokens — merge into tailwind.config.js under theme.extend
module.exports = {
  colors: {
    brand: { 600:'#2b46f0', 700:'#1c33d4', 100:'#e3e9ff', 50:'#f2f5ff' },
    ink:   { 900:'#0d1326', 700:'#232a42', 500:'#565e78', 400:'#8d93ab' },
    line:  { DEFAULT:'#e4e8f4', strong:'#c9d2ea' },
    surface: '#f6f8fc',
    navy:  { 950:'#070b1d', 900:'#0c1228', 800:'#141b38', line:'#26305c', text:'#aab3d6' },
    green: { DEFAULT:'#0aa34f', deep:'#087a3c' },
    amber: '#e07c00',
    danger:'#d92d47',
  },
  fontFamily: {
    sans: ['Inter','Segoe UI','Arial','sans-serif'],
    mono: ['JetBrains Mono','SF Mono','ui-monospace','Menlo','Consolas','monospace'],
  },
  borderRadius: { btn:'10px', card:'14px', panel:'16px', chip:'8px', badge:'6px' },
  boxShadow: {
    card:  '0 1px 2px rgba(13,19,38,.04),0 8px 24px -12px rgba(13,19,38,.10)',
    panel: '0 1px 2px rgba(13,19,38,.05),0 24px 48px -20px rgba(13,19,38,.16)',
  },
  letterSpacing: { kicker:'.16em' },
};

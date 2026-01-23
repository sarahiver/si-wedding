// src/context/ThemeContext.js
// Theme-Definitionen exakt wie die Wedding-Seiten
import React, { createContext, useContext, useState, useEffect } from 'react';

const themes = {
  editorial: {
    id: 'editorial',
    name: 'Editorial',
    description: 'Minimalistisch & Modern',
    // Fonts
    fontHeading: "'Instrument Serif', Georgia, serif",
    fontBody: "'Inter', -apple-system, sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    // Colors
    background: '#FFFFFF',
    backgroundAlt: '#FAFAFA',
    backgroundDark: '#F5F5F5',
    text: '#1A1A1A',
    textMuted: '#666666',
    textLight: '#999999',
    primary: '#000000',
    accent: '#000000',
    border: '#E0E0E0',
    borderLight: '#F0F0F0',
    // Styles
    borderRadius: '0px',
    boxShadow: 'none',
    buttonStyle: 'solid',
  },
  video: {
    id: 'video',
    name: 'Video',
    description: 'Cineastisch & Dramatisch',
    // Fonts - wie video-wedding
    fontHeading: "'Cormorant Garamond', Georgia, serif",
    fontBody: "'Inter', -apple-system, sans-serif",
    // Colors - Video Theme Palette
    background: '#0A0A0A',
    backgroundAlt: '#111111',
    backgroundDark: '#000000',
    backgroundLight: '#FAF8F5',
    text: '#FFFFFF',
    textMuted: 'rgba(255,255,255,0.6)',
    textLight: 'rgba(255,255,255,0.4)',
    textDark: '#1A1A1A',
    primary: '#B8976A',
    accent: '#B8976A',
    accentLight: '#D4AF37',
    accentDark: '#8B7355',
    border: 'rgba(184,151,106,0.3)',
    borderLight: 'rgba(184,151,106,0.15)',
    // Styles
    borderRadius: '0px',
    boxShadow: '0 0 60px rgba(184,151,106,0.15)',
    buttonStyle: 'outline',
    shimmer: true,
  },
  botanical: {
    id: 'botanical',
    name: 'Botanical',
    description: 'Natürlich & Organisch',
    // Fonts - wie botanical-wedding
    fontHeading: "'Playfair Display', Georgia, serif",
    fontBody: "'Lato', -apple-system, sans-serif",
    // Colors - CSS Variables aus botanical-wedding
    background: '#F5F1EB', // --cream
    backgroundAlt: '#FFFFFF',
    backgroundDark: '#E8E2D9', // --cream-dark
    text: '#2D3B2D', // --forest
    textMuted: '#5A6B5A', // --text-light
    textLight: '#7D9D7C',
    primary: '#8B9D83', // --sage
    accent: '#8B9D83',
    accentDark: '#6B7D63', // --sage-dark
    accentLight: '#A8B8A0', // --sage-light
    terracotta: '#C4A484',
    blush: '#E8D5D5',
    border: '#D4E0D4',
    borderLight: 'rgba(139,157,131,0.2)',
    // Styles
    borderRadius: '20px',
    boxShadow: '0 10px 40px rgba(92,124,91,0.1)',
    buttonStyle: 'rounded',
  },
  contemporary: {
    id: 'contemporary',
    name: 'Contemporary',
    description: 'Bold & Playful',
    // Fonts - wie contemporary-wedding
    fontHeading: "'Space Grotesk', sans-serif",
    fontBody: "'Space Grotesk', -apple-system, sans-serif",
    // Colors - CSS Variables aus contemporary-wedding
    background: '#FAFAFA', // --white
    backgroundAlt: '#FFFFFF',
    backgroundDark: '#F5F5F5', // --gray-100
    text: '#0D0D0D', // --black
    textMuted: '#525252', // --gray-600
    textLight: '#D4D4D4',
    primary: '#FF6B6B', // --coral
    accent: '#FF6B6B',
    accentDark: '#E85555', // --coral-dark
    electric: '#4ECDC4',
    yellow: '#FFE66D',
    purple: '#9B5DE5',
    pink: '#F15BB5',
    border: '#0D0D0D',
    borderLight: '#E5E5E5',
    // Styles
    borderRadius: '0px',
    boxShadow: '6px 6px 0 #0D0D0D',
    buttonStyle: 'brutalist',
    fontWeight: 700,
  },
  luxe: {
    id: 'luxe',
    name: 'Luxe',
    description: 'Opulent & Glamourös',
    // Fonts - wie luxe-wedding
    fontHeading: "'Cormorant Garamond', Georgia, serif",
    fontBody: "'Montserrat', -apple-system, sans-serif",
    // Colors - CSS Variables aus luxe-wedding
    background: '#0A0A0A', // --black
    backgroundAlt: '#1A1A1A', // --charcoal
    backgroundDark: '#000000',
    text: '#FEFEFE', // --white
    textMuted: 'rgba(255,255,255,0.5)',
    textLight: 'rgba(255,255,255,0.3)',
    primary: '#D4AF37', // --gold
    accent: '#D4AF37',
    accentLight: '#F4D03F', // --gold-light
    champagne: '#F7E7CE',
    rose: '#B76E79',
    burgundy: '#722F37',
    border: 'rgba(212,175,55,0.2)',
    borderLight: 'rgba(212,175,55,0.1)',
    // Styles
    borderRadius: '0px',
    boxShadow: '0 0 80px rgba(212,175,55,0.1)',
    buttonStyle: 'elegant',
    fontStyle: 'italic',
  },
  neon: {
    id: 'neon',
    name: 'Neon',
    description: 'Futuristisch & Elektrisierend',
    // Fonts - wie neon-wedding
    fontHeading: "'Space Grotesk', sans-serif",
    fontBody: "'Space Grotesk', -apple-system, sans-serif",
    // Colors - CSS Variables aus neon-wedding
    background: '#0a0a0f', // --black
    backgroundAlt: '#12121a', // --dark
    backgroundDark: '#1a1a2e', // --dark-purple
    text: '#FFFFFF',
    textMuted: 'rgba(255,255,255,0.6)',
    textLight: 'rgba(255,255,255,0.4)',
    primary: '#00ffff', // --neon-cyan
    accent: '#00ffff',
    accentPink: '#ff00ff', // --neon-pink
    accentBlue: '#00d4ff', // --neon-blue
    accentPurple: '#b347ff', // --neon-purple
    accentGreen: '#00ff88', // --neon-green
    accentYellow: '#ffff00',
    border: 'rgba(0,255,255,0.3)',
    borderLight: 'rgba(0,255,255,0.1)',
    // Styles
    borderRadius: '0px',
    boxShadow: '0 0 30px rgba(0,255,255,0.3)',
    glowCyan: '0 0 20px rgba(0,255,255,0.5), 0 0 40px rgba(0,255,255,0.3)',
    glowPink: '0 0 20px rgba(255,0,255,0.5), 0 0 40px rgba(255,0,255,0.3)',
    textGlowCyan: '0 0 10px rgba(0,255,255,0.8), 0 0 20px rgba(0,255,255,0.6)',
    textGlowPink: '0 0 10px rgba(255,0,255,0.8), 0 0 20px rgba(255,0,255,0.6)',
    buttonStyle: 'glow',
    fontWeight: 700,
  },
};

const STORAGE_KEY = 'si-wedding-selected-theme';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Initialize from localStorage or default to 'video'
  const [currentTheme, setCurrentTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && themes[saved]) {
        return saved;
      }
    }
    return 'video';
  });

  // Persist theme changes to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, currentTheme);
    }
  }, [currentTheme]);

  const switchTheme = (themeId) => {
    if (themes[themeId]) {
      setCurrentTheme(themeId);
    }
  };

  const theme = themes[currentTheme];

  return (
    <ThemeContext.Provider value={{ currentTheme, switchTheme, theme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export { themes };
export default ThemeContext;

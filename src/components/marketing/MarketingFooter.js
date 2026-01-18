// src/components/marketing/FooterSection.js
import React from 'react';
import styled, { css } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

const Footer = styled.footer`
  padding: 80px 5% 40px;
  position: relative;
  
  ${p => p.$themeId === 'editorial' && css`
    background: #FAFAFA;
    border-top: 1px solid #E0E0E0;
  `}
  ${p => p.$themeId === 'gold' && css`
    background: #0A0A0A;
    border-top: 1px solid rgba(212,175,55,0.1);
  `}
  ${p => p.$themeId === 'botanical' && css`
    background: #E8E4DC;
  `}
  ${p => p.$themeId === 'contemporary' && css`
    background: #FFFFFF;
    border-top: 3px solid #0D0D0D;
  `}
  ${p => p.$themeId === 'luxe' && css`
    background: #0A0A0A;
    border-top: 1px solid rgba(212,175,55,0.1);
  `}
  ${p => p.$themeId === 'neon' && css`
    background: #0a0a0f;
    border-top: 1px solid rgba(0,255,255,0.1);
  `}
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const TopRow = styled.div`
  display: grid;
  gap: 60px;
  margin-bottom: 60px;
  
  ${p => p.$themeId === 'editorial' && css`
    grid-template-columns: 2fr repeat(3, 1fr);
    @media (max-width: 900px) { grid-template-columns: 1fr 1fr; }
    @media (max-width: 500px) { grid-template-columns: 1fr; }
  `}
  ${p => p.$themeId === 'gold' && css`
    grid-template-columns: 2fr repeat(3, 1fr);
    @media (max-width: 900px) { grid-template-columns: 1fr 1fr; }
    @media (max-width: 500px) { grid-template-columns: 1fr; }
  `}
  ${p => p.$themeId === 'botanical' && css`
    grid-template-columns: 2fr repeat(3, 1fr);
    @media (max-width: 900px) { grid-template-columns: 1fr 1fr; }
    @media (max-width: 500px) { grid-template-columns: 1fr; }
  `}
  ${p => p.$themeId === 'contemporary' && css`
    grid-template-columns: repeat(4, 1fr);
    @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }
    @media (max-width: 500px) { grid-template-columns: 1fr; }
  `}
  ${p => p.$themeId === 'luxe' && css`
    grid-template-columns: 2fr repeat(3, 1fr);
    @media (max-width: 900px) { grid-template-columns: 1fr 1fr; }
    @media (max-width: 500px) { grid-template-columns: 1fr; }
  `}
  ${p => p.$themeId === 'neon' && css`
    grid-template-columns: 2fr repeat(3, 1fr);
    @media (max-width: 900px) { grid-template-columns: 1fr 1fr; }
    @media (max-width: 500px) { grid-template-columns: 1fr; }
  `}
`;

const BrandColumn = styled.div``;

const Logo = styled.div`
  margin-bottom: 20px;
  
  ${p => p.$themeId === 'editorial' && css`
    font-family: 'Instrument Serif', Georgia, serif;
    font-size: 1.5rem;
    font-style: italic;
    color: #1A1A1A;
  `}
  ${p => p.$themeId === 'gold' && css`
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.6rem;
    font-weight: 300;
    color: #D4AF37;
  `}
  ${p => p.$themeId === 'botanical' && css`
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 1.4rem;
    color: #2D3B2D;
  `}
  ${p => p.$themeId === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.3rem;
    font-weight: 700;
    color: #0D0D0D;
    text-transform: uppercase;
  `}
  ${p => p.$themeId === 'luxe' && css`
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.5rem;
    font-weight: 300;
    font-style: italic;
    color: #E8DDD4;
  `}
  ${p => p.$themeId === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.4rem;
    font-weight: 700;
    color: #00ffff;
    text-shadow: 0 0 10px rgba(0,255,255,0.5);
  `}
`;

const BrandDescription = styled.p`
  line-height: 1.7;
  max-width: 300px;
  
  ${p => p.$themeId === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    color: #666;
  `}
  ${p => p.$themeId === 'gold' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.85rem;
    color: rgba(255,255,255,0.5);
  `}
  ${p => p.$themeId === 'botanical' && css`
    font-family: 'Lato', sans-serif;
    font-size: 0.95rem;
    color: #5A6B5A;
  `}
  ${p => p.$themeId === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.9rem;
    color: #666;
  `}
  ${p => p.$themeId === 'luxe' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.85rem;
    color: rgba(255,255,255,0.4);
  `}
  ${p => p.$themeId === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.9rem;
    color: rgba(255,255,255,0.5);
  `}
`;

const LinkColumn = styled.div``;

const ColumnTitle = styled.h4`
  margin: 0 0 20px 0;
  
  ${p => p.$themeId === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #1A1A1A;
  `}
  ${p => p.$themeId === 'gold' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #D4AF37;
  `}
  ${p => p.$themeId === 'botanical' && css`
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 1rem;
    color: #2D3B2D;
  `}
  ${p => p.$themeId === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.85rem;
    font-weight: 700;
    color: #0D0D0D;
    text-transform: uppercase;
  `}
  ${p => p.$themeId === 'luxe' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.65rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: rgba(212,175,55,0.6);
  `}
  ${p => p.$themeId === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.8rem;
    font-weight: 600;
    color: #00ffff;
  `}
`;

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const LinkItem = styled.li`
  a {
    text-decoration: none;
    transition: all 0.3s ease;
    
    ${p => p.$themeId === 'editorial' && css`
      font-family: 'Inter', sans-serif;
      font-size: 0.9rem;
      color: #666;
      &:hover { color: #1A1A1A; }
    `}
    ${p => p.$themeId === 'gold' && css`
      font-family: 'Montserrat', sans-serif;
      font-size: 0.85rem;
      color: rgba(255,255,255,0.5);
      &:hover { color: #D4AF37; }
    `}
    ${p => p.$themeId === 'botanical' && css`
      font-family: 'Lato', sans-serif;
      font-size: 0.95rem;
      color: #5A6B5A;
      &:hover { color: #2D3B2D; }
    `}
    ${p => p.$themeId === 'contemporary' && css`
      font-family: 'Space Grotesk', sans-serif;
      font-size: 0.9rem;
      color: #666;
      &:hover { color: #FF6B6B; }
    `}
    ${p => p.$themeId === 'luxe' && css`
      font-family: 'Montserrat', sans-serif;
      font-size: 0.85rem;
      color: rgba(255,255,255,0.4);
      &:hover { color: rgba(212,175,55,0.8); }
    `}
    ${p => p.$themeId === 'neon' && css`
      font-family: 'Space Grotesk', sans-serif;
      font-size: 0.9rem;
      color: rgba(255,255,255,0.5);
      &:hover { 
        color: #00ffff;
        text-shadow: 0 0 10px rgba(0,255,255,0.5);
      }
    `}
  }
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 40px;
  flex-wrap: wrap;
  gap: 20px;
  
  ${p => p.$themeId === 'editorial' && css`border-top: 1px solid #E0E0E0;`}
  ${p => p.$themeId === 'gold' && css`border-top: 1px solid rgba(212,175,55,0.1);`}
  ${p => p.$themeId === 'botanical' && css`border-top: 1px solid rgba(139,157,131,0.2);`}
  ${p => p.$themeId === 'contemporary' && css`border-top: 2px solid #0D0D0D;`}
  ${p => p.$themeId === 'luxe' && css`border-top: 1px solid rgba(212,175,55,0.1);`}
  ${p => p.$themeId === 'neon' && css`border-top: 1px solid rgba(0,255,255,0.1);`}
`;

const Copyright = styled.p`
  margin: 0;
  
  ${p => p.$themeId === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    font-size: 0.8rem;
    color: #999;
  `}
  ${p => p.$themeId === 'gold' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.75rem;
    color: rgba(255,255,255,0.3);
  `}
  ${p => p.$themeId === 'botanical' && css`
    font-family: 'Lato', sans-serif;
    font-size: 0.85rem;
    color: #8B9D83;
  `}
  ${p => p.$themeId === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.8rem;
    color: #999;
  `}
  ${p => p.$themeId === 'luxe' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.7rem;
    color: rgba(255,255,255,0.25);
  `}
  ${p => p.$themeId === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.8rem;
    color: rgba(255,255,255,0.3);
  `}
`;

const LegalLinks = styled.div`
  display: flex;
  gap: 30px;
  
  a {
    text-decoration: none;
    transition: color 0.3s ease;
    
    ${p => p.$themeId === 'editorial' && css`
      font-family: 'Inter', sans-serif;
      font-size: 0.8rem;
      color: #999;
      &:hover { color: #1A1A1A; }
    `}
    ${p => p.$themeId === 'gold' && css`
      font-family: 'Montserrat', sans-serif;
      font-size: 0.75rem;
      color: rgba(255,255,255,0.3);
      &:hover { color: #D4AF37; }
    `}
    ${p => p.$themeId === 'botanical' && css`
      font-family: 'Lato', sans-serif;
      font-size: 0.85rem;
      color: #8B9D83;
      &:hover { color: #2D3B2D; }
    `}
    ${p => p.$themeId === 'contemporary' && css`
      font-family: 'Space Grotesk', sans-serif;
      font-size: 0.8rem;
      color: #999;
      &:hover { color: #0D0D0D; }
    `}
    ${p => p.$themeId === 'luxe' && css`
      font-family: 'Montserrat', sans-serif;
      font-size: 0.7rem;
      color: rgba(255,255,255,0.25);
      &:hover { color: rgba(212,175,55,0.6); }
    `}
    ${p => p.$themeId === 'neon' && css`
      font-family: 'Space Grotesk', sans-serif;
      font-size: 0.8rem;
      color: rgba(255,255,255,0.3);
      &:hover { color: #00ffff; }
    `}
  }
`;

const linkGroups = [
  {
    title: 'Navigation',
    links: [
      { label: 'Designs', href: '#themes' },
      { label: 'Features', href: '#features' },
      { label: 'Beispiele', href: '#examples' },
      { label: 'Über uns', href: '#about' }
    ]
  },
  {
    title: 'Kontakt',
    links: [
      { label: 'hello@sarahiver.de', href: 'mailto:hello@sarahiver.de' },
      { label: 'Instagram', href: '#' },
      { label: 'Pinterest', href: '#' }
    ]
  },
  {
    title: 'Rechtliches',
    links: [
      { label: 'Impressum', href: '/impressum' },
      { label: 'Datenschutz', href: '/datenschutz' },
      { label: 'AGB', href: '/agb' }
    ]
  }
];

function FooterSection() {
  const { currentTheme } = useTheme();

  return (
    <Footer $themeId={currentTheme}>
      <Container>
        <TopRow $themeId={currentTheme}>
          <BrandColumn>
            <Logo $themeId={currentTheme}>S & I</Logo>
            <BrandDescription $themeId={currentTheme}>
              Premium Hochzeitswebsites für Paare, die das Besondere lieben.
            </BrandDescription>
          </BrandColumn>
          
          {linkGroups.map(group => (
            <LinkColumn key={group.title}>
              <ColumnTitle $themeId={currentTheme}>{group.title}</ColumnTitle>
              <LinkList>
                {group.links.map(link => (
                  <LinkItem key={link.label} $themeId={currentTheme}>
                    <a href={link.href}>{link.label}</a>
                  </LinkItem>
                ))}
              </LinkList>
            </LinkColumn>
          ))}
        </TopRow>
        
        <BottomRow $themeId={currentTheme}>
          <Copyright $themeId={currentTheme}>
            © 2025 S & I. Alle Rechte vorbehalten.
          </Copyright>
          <LegalLinks $themeId={currentTheme}>
            <a href="/impressum">Impressum</a>
            <a href="/datenschutz">Datenschutz</a>
          </LegalLinks>
        </BottomRow>
      </Container>
    </Footer>
  );
}

export default FooterSection;

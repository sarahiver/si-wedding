// src/components/marketing/MarketingHero.js
import React, { useState, useEffect, useRef } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
`;

const scrollBounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

// Neon flicker
const neonFlicker = keyframes`
  0%, 100% { opacity: 1; text-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor; }
  92% { opacity: 1; }
  93% { opacity: 0.8; text-shadow: none; }
  94% { opacity: 1; text-shadow: 0 0 10px currentColor, 0 0 20px currentColor; }
  96% { opacity: 0.9; text-shadow: 0 0 5px currentColor; }
  97% { opacity: 1; text-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor; }
`;

const Section = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 120px 5% 60px;
  box-sizing: border-box;
  
  ${p => p.$themeId === 'editorial' && css`background: #FFFFFF;`}
  ${p => p.$themeId === 'video' && css`background: #0A0A0A;`}
  ${p => p.$themeId === 'botanical' && css`background: linear-gradient(180deg, #F8F6F0 0%, #EBE7DE 100%);`}
  ${p => p.$themeId === 'contemporary' && css`background: linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 50%, #FFE66D 100%); background-size: 200% 200%;`}
  ${p => p.$themeId === 'luxe' && css`background: #FAF9F7;`}
  ${p => p.$themeId === 'neon' && css`background: #0a0a0f;`}
`;

const VideoBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(10, 10, 10, 0.4) 0%,
      rgba(10, 10, 10, 0.6) 50%,
      rgba(10, 10, 10, 0.9) 100%
    );
  }
  
  video, img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Container = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Eyebrow = styled.div`
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  margin-bottom: 2rem;
  animation: ${fadeInUp} 1s ease forwards;
  animation-delay: 0.2s;
  opacity: 0;
  
  ${p => p.$themeId === 'editorial' && css`font-family: 'Inter', sans-serif; color: #999;`}
  ${p => p.$themeId === 'video' && css`font-family: 'Inter', sans-serif; color: #B8976A;`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Lato', sans-serif; color: #8B9D83;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #FFFFFF; font-weight: 600;`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Montserrat', sans-serif; color: #B4A08C; letter-spacing: 0.4em;`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: #00ffff; text-shadow: 0 0 10px rgba(0,255,255,0.5);`}
`;

const Title = styled.h1`
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 300;
  line-height: 1.1;
  margin: 0 0 1.5rem 0;
  animation: ${fadeInUp} 1s ease forwards;
  animation-delay: 0.4s;
  opacity: 0;
  
  ${p => p.$themeId === 'editorial' && css`font-family: 'Instrument Serif', Georgia, serif; color: #1A1A1A;`}
  ${p => p.$themeId === 'video' && css`font-family: 'Cormorant Garamond', Georgia, serif; color: #FFFFFF;`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Playfair Display', Georgia, serif; color: #2D3B2D;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #FFFFFF; font-weight: 700; text-transform: uppercase;`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Cormorant Garamond', Georgia, serif; color: #2A2A2A; font-style: italic;`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: #00ffff; font-weight: 700; animation: ${neonFlicker} 5s infinite;`}
  
  span {
    display: block;
    ${p => p.$themeId === 'video' && css`
      background: linear-gradient(135deg, #B8976A, #D4AF37, #B8976A);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: ${shimmer} 4s linear infinite;
    `}
    ${p => p.$themeId === 'luxe' && css`
      background: linear-gradient(135deg, #D4AF37, #F4D03F, #D4AF37);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: ${shimmer} 4s linear infinite;
    `}
    ${p => p.$themeId === 'neon' && css`
      color: #ff00ff;
      text-shadow: 0 0 20px rgba(255,0,255,0.8);
    `}
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  font-weight: 300;
  line-height: 1.8;
  max-width: 600px;
  margin: 0 auto 3rem;
  animation: ${fadeInUp} 1s ease forwards;
  animation-delay: 0.6s;
  opacity: 0;
  
  ${p => p.$themeId === 'editorial' && css`font-family: 'Inter', sans-serif; color: #666;`}
  ${p => p.$themeId === 'video' && css`font-family: 'Inter', sans-serif; color: rgba(255,255,255,0.6);`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Lato', sans-serif; color: #5A6B5A;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: rgba(255,255,255,0.9);`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Montserrat', sans-serif; color: rgba(42,42,42,0.6); font-size: 1rem;`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: rgba(255,255,255,0.6);`}
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  animation: ${fadeInUp} 1s ease forwards;
  animation-delay: 0.8s;
  opacity: 0;
`;

const PrimaryButton = styled.a`
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 18px 45px;
  text-decoration: none;
  transition: all 0.4s ease;
  
  ${p => p.$themeId === 'editorial' && css`
    font-family: 'Inter', sans-serif; color: #FFFFFF; background: #1A1A1A;
    &:hover { background: #333; }
  `}
  ${p => p.$themeId === 'video' && css`
    font-family: 'Inter', sans-serif; color: #0a0a0a; background: #B8976A;
    &:hover { background: #D4AF37; transform: translateY(-2px); }
  `}
  ${p => p.$themeId === 'botanical' && css`
    font-family: 'Lato', sans-serif; color: #FFFFFF; background: #8B9D83; border-radius: 30px;
    &:hover { background: #6B7D63; }
  `}
  ${p => p.$themeId === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif; color: #0D0D0D; background: #FFFFFF; font-weight: 700;
    border: 3px solid #0D0D0D; box-shadow: 4px 4px 0 #0D0D0D;
    &:hover { box-shadow: 6px 6px 0 #0D0D0D; transform: translate(-2px, -2px); }
  `}
  ${p => p.$themeId === 'luxe' && css`
    font-family: 'Montserrat', sans-serif; color: #FAF9F7; background: #2A2A2A;
    letter-spacing: 0.2em; font-size: 0.7rem;
    &:hover { background: #D4AF37; color: #0a0a0a; }
  `}
  ${p => p.$themeId === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif; color: #0a0a0f; background: #00ffff; font-weight: 600;
    box-shadow: 0 0 20px rgba(0,255,255,0.5);
    &:hover { box-shadow: 0 0 40px rgba(0,255,255,0.8); }
  `}
`;

const SecondaryButton = styled.a`
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 18px 45px;
  text-decoration: none;
  background: transparent;
  transition: all 0.4s ease;
  
  ${p => p.$themeId === 'editorial' && css`
    font-family: 'Inter', sans-serif; color: #1A1A1A; border: 1px solid #1A1A1A;
    &:hover { background: #1A1A1A; color: #FFFFFF; }
  `}
  ${p => p.$themeId === 'video' && css`
    font-family: 'Inter', sans-serif; color: #B8976A; border: 1px solid rgba(184,151,106,0.4);
    &:hover { border-color: #B8976A; background: rgba(184,151,106,0.1); }
  `}
  ${p => p.$themeId === 'botanical' && css`
    font-family: 'Lato', sans-serif; color: #2D3B2D; border: 2px solid #2D3B2D; border-radius: 30px;
    &:hover { background: #2D3B2D; color: #F8F6F0; }
  `}
  ${p => p.$themeId === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif; color: #FFFFFF; border: 3px solid #FFFFFF; font-weight: 700;
    &:hover { background: #FFFFFF; color: #0D0D0D; }
  `}
  ${p => p.$themeId === 'luxe' && css`
    font-family: 'Montserrat', sans-serif; color: #D4AF37; border: 1px solid rgba(212,175,55,0.3);
    letter-spacing: 0.2em; font-size: 0.7rem;
    &:hover { border-color: #D4AF37; }
  `}
  ${p => p.$themeId === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif; color: #ff00ff; border: 2px solid #ff00ff; font-weight: 600;
    &:hover { background: rgba(255,0,255,0.1); box-shadow: 0 0 20px rgba(255,0,255,0.3); }
  `}
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  animation: ${fadeInUp} 1s ease forwards;
  animation-delay: 1.2s;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  ${p => !p.$visible && css`opacity: 0 !important;`}
  
  span {
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    ${p => p.$themeId === 'editorial' && css`font-family: 'Inter', sans-serif; color: #999;`}
    ${p => p.$themeId === 'video' && css`font-family: 'Inter', sans-serif; color: rgba(255,255,255,0.4);`}
    ${p => p.$themeId === 'botanical' && css`font-family: 'Lato', sans-serif; color: #8B9D83;`}
    ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #FFFFFF;`}
    ${p => p.$themeId === 'luxe' && css`font-family: 'Montserrat', sans-serif; color: #B4A08C;`}
    ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: #00ffff;`}
  }
`;

const ScrollArrow = styled.div`
  animation: ${scrollBounce} 2s ease-in-out infinite;
  font-size: 1.2rem;
  
  ${p => p.$themeId === 'video' && css`color: #B8976A;`}
  ${p => p.$themeId === 'neon' && css`color: #00ffff; text-shadow: 0 0 10px rgba(0,255,255,0.5);`}
`;

// Video URL
const VIDEO_URL = "https://res.cloudinary.com/si-weddings/video/upload/v1769070616/si_comming_soon_video_hero_xga2ia.mp4";
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80";

function MarketingHero() {
  const { currentTheme } = useTheme();
  const sectionRef = useRef(null);
  const [scrollIndicatorVisible, setScrollIndicatorVisible] = useState(true);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollIndicatorVisible(window.scrollY < 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getContent = () => {
    switch(currentTheme) {
      case 'editorial':
        return { eyebrow: 'Premium Wedding Websites', title: 'Eure Geschichte, digital erzählt.', subtitle: 'Wir gestalten einzigartige Hochzeitswebsites, die eure Liebe feiern und eure Gäste begeistern.' };
      case 'video':
        return { eyebrow: '— Premium Wedding Websites —', title: <><span>Euer Film</span> beginnt hier</>, subtitle: 'Cineastische Hochzeitswebsites mit Video-Hintergründen. Eure Liebesgeschichte, filmreif inszeniert.' };
      case 'botanical':
        return { eyebrow: 'Natürlich Schön', title: 'Wo Liebe erblüht', subtitle: 'Organisch schön, liebevoll gestaltet. Hochzeitswebsites, die sich anfühlen wie ein Spaziergang durch einen blühenden Garten.' };
      case 'contemporary':
        return { eyebrow: 'Bold & Beautiful', title: 'MAKE IT COUNT', subtitle: 'Keine langweiligen Templates. Keine Kompromisse. Nur pure Kreativität für euren großen Tag.' };
      case 'luxe':
        return { eyebrow: 'Maßgeschneidert', title: 'Die Kunst der Einfachheit', subtitle: 'Weniger ist mehr. Entdeckt die Schönheit des Wesentlichen in einer Hochzeitswebsite, die Bände spricht.' };
      case 'neon':
        return { eyebrow: '// DIGITAL LOVE //', title: <>NEXT LEVEL <span>WEDDING</span></>, subtitle: 'Digitale Hochzeits-Experience der nächsten Generation. Cutting-edge Design trifft auf ewige Liebe.' };
      default:
        return { eyebrow: '— Premium Wedding Websites —', title: <><span>Euer Film</span> beginnt hier</>, subtitle: 'Cineastische Hochzeitswebsites.' };
    }
  };

  const content = getContent();

  return (
    <Section ref={sectionRef} $themeId={currentTheme}>
      {currentTheme === 'video' && (
        <VideoBackground>
          {!videoError ? (
            <video autoPlay muted loop playsInline onError={() => setVideoError(true)}>
              <source src={VIDEO_URL} type="video/mp4" />
            </video>
          ) : (
            <img src={FALLBACK_IMAGE} alt="Wedding background" />
          )}
        </VideoBackground>
      )}
      
      <Container>
        <Eyebrow $themeId={currentTheme}>{content.eyebrow}</Eyebrow>
        <Title $themeId={currentTheme}>{content.title}</Title>
        <Subtitle $themeId={currentTheme}>{content.subtitle}</Subtitle>
        <ButtonGroup>
          <PrimaryButton href="#contact" $themeId={currentTheme}>Jetzt starten</PrimaryButton>
          <SecondaryButton href="#themes" $themeId={currentTheme}>Designs entdecken</SecondaryButton>
        </ButtonGroup>
      </Container>
      
      <ScrollIndicator $themeId={currentTheme} $visible={scrollIndicatorVisible}>
        <span>Scroll</span>
        <ScrollArrow $themeId={currentTheme}>↓</ScrollArrow>
      </ScrollIndicator>
    </Section>
  );
}

export default MarketingHero;

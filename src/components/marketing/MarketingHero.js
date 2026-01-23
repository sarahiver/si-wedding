// src/components/marketing/MarketingHero.js
import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const neonFlicker = keyframes`
  0%, 100% { opacity: 1; }
  92% { opacity: 1; }
  93% { opacity: 0.8; }
  94% { opacity: 1; }
  96% { opacity: 0.9; }
`;

const Section = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  
  ${p => p.$themeId === 'video' && css`background: #0A0A0A;`}
  ${p => p.$themeId === 'editorial' && css`background: #FFFFFF;`}
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
  
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.4) 0%,
      rgba(0, 0, 0, 0.2) 50%,
      rgba(0, 0, 0, 0.6) 100%
    );
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 0 20px;
  max-width: 900px;
`;

const Eyebrow = styled.span`
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  margin-bottom: 30px;
  animation: ${fadeInUp} 1s ease 0.2s both;
  
  ${p => p.$themeId === 'video' && css`font-family: 'Inter', sans-serif; color: #B8976A;`}
  ${p => p.$themeId === 'editorial' && css`font-family: 'Inter', sans-serif; color: #999;`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Lato', sans-serif; color: #8B9D83;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #FFFFFF; font-weight: 600;`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Montserrat', sans-serif; color: #B4A08C; letter-spacing: 0.4em;`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: #00ffff; text-shadow: 0 0 10px rgba(0,255,255,0.5);`}
`;

const Title = styled.h1`
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 300;
  line-height: 1.1;
  margin-bottom: 25px;
  animation: ${fadeInUp} 1s ease 0.4s both;
  
  ${p => p.$themeId === 'video' && css`
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-style: italic;
    color: #FFFFFF;
    text-shadow: 0 4px 30px rgba(0,0,0,0.3);
    
    span {
      background: linear-gradient(135deg, #B8976A, #D4AF37, #B8976A);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: ${shimmer} 4s linear infinite;
    }
  `}
  ${p => p.$themeId === 'editorial' && css`
    font-family: 'Instrument Serif', Georgia, serif;
    color: #1A1A1A;
  `}
  ${p => p.$themeId === 'botanical' && css`
    font-family: 'Playfair Display', Georgia, serif;
    color: #2D3B2D;
  `}
  ${p => p.$themeId === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700;
    color: #FFFFFF;
    text-transform: uppercase;
  `}
  ${p => p.$themeId === 'luxe' && css`
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-style: italic;
    color: #2A2A2A;
    
    span {
      background: linear-gradient(135deg, #D4AF37, #F4D03F, #D4AF37);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: ${shimmer} 4s linear infinite;
    }
  `}
  ${p => p.$themeId === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700;
    color: #00ffff;
    text-shadow: 0 0 30px rgba(0,255,255,0.5);
    animation: ${neonFlicker} 5s infinite;
    
    span {
      color: #ff00ff;
      text-shadow: 0 0 30px rgba(255,0,255,0.5);
    }
  `}
`;

const Subtitle = styled.p`
  font-size: clamp(1rem, 2vw, 1.2rem);
  font-weight: 300;
  line-height: 1.8;
  margin-bottom: 50px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  animation: ${fadeInUp} 1s ease 0.6s both;
  
  ${p => p.$themeId === 'video' && css`font-family: 'Inter', sans-serif; color: rgba(255,255,255,0.7);`}
  ${p => p.$themeId === 'editorial' && css`font-family: 'Inter', sans-serif; color: #666;`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Lato', sans-serif; color: #5A6B5A;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: rgba(255,255,255,0.9);`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Montserrat', sans-serif; color: rgba(42,42,42,0.6);`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: rgba(255,255,255,0.6);`}
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
  animation: ${fadeInUp} 1s ease 0.8s both;
`;

const PrimaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 20px 45px;
  text-decoration: none;
  transition: all 0.4s ease;
  
  ${p => p.$themeId === 'video' && css`
    font-family: 'Inter', sans-serif;
    color: #1A1A1A;
    background: #B8976A;
    &:hover { background: #D4AF37; transform: translateY(-3px); }
  `}
  ${p => p.$themeId === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    color: #FFFFFF;
    background: #1A1A1A;
    &:hover { background: #333; }
  `}
  ${p => p.$themeId === 'botanical' && css`
    font-family: 'Lato', sans-serif;
    color: #FFFFFF;
    background: #8B9D83;
    border-radius: 30px;
    &:hover { background: #6B7D63; }
  `}
  ${p => p.$themeId === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700;
    color: #0D0D0D;
    background: #FFFFFF;
    border: 3px solid #0D0D0D;
    box-shadow: 4px 4px 0 #0D0D0D;
    &:hover { box-shadow: 6px 6px 0 #0D0D0D; transform: translate(-2px, -2px); }
  `}
  ${p => p.$themeId === 'luxe' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    color: #FAF9F7;
    background: #2A2A2A;
    &:hover { background: #D4AF37; color: #0a0a0a; }
  `}
  ${p => p.$themeId === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 600;
    color: #0a0a0f;
    background: #00ffff;
    box-shadow: 0 0 20px rgba(0,255,255,0.5);
    &:hover { box-shadow: 0 0 40px rgba(0,255,255,0.8); }
  `}
`;

const SecondaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 20px 45px;
  text-decoration: none;
  background: transparent;
  transition: all 0.4s ease;
  
  ${p => p.$themeId === 'video' && css`
    font-family: 'Inter', sans-serif;
    color: #B8976A;
    border: 1px solid rgba(184,151,106,0.4);
    &:hover { border-color: #B8976A; background: rgba(184,151,106,0.1); }
  `}
  ${p => p.$themeId === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    color: #1A1A1A;
    border: 1px solid #1A1A1A;
    &:hover { background: #1A1A1A; color: #FFFFFF; }
  `}
  ${p => p.$themeId === 'botanical' && css`
    font-family: 'Lato', sans-serif;
    color: #2D3B2D;
    border: 2px solid #2D3B2D;
    border-radius: 30px;
    &:hover { background: #2D3B2D; color: #F8F6F0; }
  `}
  ${p => p.$themeId === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700;
    color: #FFFFFF;
    border: 3px solid #FFFFFF;
    &:hover { background: #FFFFFF; color: #0D0D0D; }
  `}
  ${p => p.$themeId === 'luxe' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    color: #D4AF37;
    border: 1px solid rgba(212,175,55,0.3);
    &:hover { border-color: #D4AF37; }
  `}
  ${p => p.$themeId === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 600;
    color: #ff00ff;
    border: 2px solid #ff00ff;
    &:hover { background: rgba(255,0,255,0.1); box-shadow: 0 0 20px rgba(255,0,255,0.3); }
  `}
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  animation: ${fadeInUp} 1s ease 1.2s both;
  z-index: 2;
`;

const ScrollText = styled.span`
  display: block;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  margin-bottom: 15px;
  
  ${p => p.$themeId === 'video' && css`font-family: 'Inter', sans-serif; color: rgba(255,255,255,0.5);`}
  ${p => p.$themeId === 'editorial' && css`font-family: 'Inter', sans-serif; color: #999;`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Lato', sans-serif; color: #8B9D83;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #FFFFFF;`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Montserrat', sans-serif; color: #B4A08C;`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: #00ffff;`}
`;

const ScrollArrow = styled.div`
  animation: ${float} 2s ease-in-out infinite;
  font-size: 1.2rem;
  
  ${p => p.$themeId === 'video' && css`color: #B8976A;`}
  ${p => p.$themeId === 'editorial' && css`color: #1A1A1A;`}
  ${p => p.$themeId === 'botanical' && css`color: #8B9D83;`}
  ${p => p.$themeId === 'contemporary' && css`color: #FFFFFF;`}
  ${p => p.$themeId === 'luxe' && css`color: #D4AF37;`}
  ${p => p.$themeId === 'neon' && css`color: #00ffff; text-shadow: 0 0 10px rgba(0,255,255,0.5);`}
`;

const VIDEO_URL = "https://res.cloudinary.com/si-weddings/video/upload/v1769070616/si_comming_soon_video_hero_xga2ia.mp4";

const heroContent = {
  video: {
    eyebrow: '— Premium Wedding Websites —',
    title: <><span>Euer Film</span> beginnt hier</>,
    subtitle: 'Cineastische Hochzeitswebsites mit Video-Hintergründen. Eure Liebesgeschichte, filmreif inszeniert.'
  },
  editorial: {
    eyebrow: 'Premium Wedding Websites',
    title: 'Eure Geschichte, digital erzählt.',
    subtitle: 'Minimalistische Hochzeitswebsites mit klarem Design. Zeitlos elegant, modern umgesetzt.'
  },
  botanical: {
    eyebrow: 'Natürlich Schön',
    title: 'Wo Liebe erblüht',
    subtitle: 'Organisch schön, liebevoll gestaltet. Hochzeitswebsites, die sich anfühlen wie ein Spaziergang durch einen blühenden Garten.'
  },
  contemporary: {
    eyebrow: 'Bold & Beautiful',
    title: 'MAKE IT COUNT',
    subtitle: 'Keine langweiligen Templates. Keine Kompromisse. Nur pure Kreativität für euren großen Tag.'
  },
  luxe: {
    eyebrow: 'Maßgeschneidert',
    title: <>Die Kunst der <span>Einfachheit</span></>,
    subtitle: 'Weniger ist mehr. Entdeckt die Schönheit des Wesentlichen in einer Hochzeitswebsite, die Bände spricht.'
  },
  neon: {
    eyebrow: '// DIGITAL LOVE //',
    title: <>NEXT LEVEL <span>WEDDING</span></>,
    subtitle: 'Digitale Hochzeits-Experience der nächsten Generation. Cutting-edge Design trifft auf ewige Liebe.'
  }
};

function MarketingHero() {
  const { currentTheme } = useTheme();
  const [videoError, setVideoError] = useState(false);
  const content = heroContent[currentTheme];

  return (
    <Section $themeId={currentTheme} id="hero">
      {currentTheme === 'video' && (
        <VideoBackground>
          <video autoPlay muted loop playsInline onError={() => setVideoError(true)}>
            <source src={VIDEO_URL} type="video/mp4" />
          </video>
        </VideoBackground>
      )}
      
      <Content>
        <Eyebrow $themeId={currentTheme}>{content.eyebrow}</Eyebrow>
        <Title $themeId={currentTheme}>{content.title}</Title>
        <Subtitle $themeId={currentTheme}>{content.subtitle}</Subtitle>
        <ButtonGroup>
          <PrimaryButton href="#contact" $themeId={currentTheme}>Jetzt starten</PrimaryButton>
          <SecondaryButton href="#designs" $themeId={currentTheme}>Designs entdecken</SecondaryButton>
        </ButtonGroup>
      </Content>
      
      <ScrollIndicator>
        <ScrollText $themeId={currentTheme}>Entdecken</ScrollText>
        <ScrollArrow $themeId={currentTheme}>↓</ScrollArrow>
      </ScrollIndicator>
    </Section>
  );
}

export default MarketingHero;

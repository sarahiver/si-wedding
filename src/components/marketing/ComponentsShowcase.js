// src/components/marketing/ComponentsShowcase.js
import React, { useEffect, useRef, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { useTheme } from '../../context/ThemeContext'

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
`

const Section = styled.section`
  padding: 140px 5%;
  position: relative;
  
  ${p => p.$themeId === 'editorial' && css`background: #FAFAFA;`}
  ${p => p.$themeId === 'video' && css`background: #FAF8F5;`}
  ${p => p.$themeId === 'botanical' && css`background: #F5F1EB;`}
  ${p => p.$themeId === 'contemporary' && css`background: #FAFAFA;`}
  ${p => p.$themeId === 'luxe' && css`background: #FAF9F7;`}
  ${p => p.$themeId === 'neon' && css`background: #0a0a0f;`}
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 80px;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '40px'});
  transition: all 0.9s cubic-bezier(0.16, 1, 0.3, 1);
`

const Eyebrow = styled.span`
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  display: block;
  margin-bottom: 1.5rem;
  
  ${p => p.$themeId === 'editorial' && css`font-family: 'Inter', sans-serif; color: #999;`}
  ${p => p.$themeId === 'video' && css`font-family: 'Inter', sans-serif; color: #B8976A;`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Lato', sans-serif; color: #8B9D83;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #FF6B6B;`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Montserrat', sans-serif; color: #D4AF37;`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: #00ffff;`}
`

const Title = styled.h2`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 300;
  margin: 0 0 1.5rem 0;
  
  ${p => p.$themeId === 'editorial' && css`font-family: 'Instrument Serif', Georgia, serif; color: #1A1A1A;`}
  ${p => p.$themeId === 'video' && css`font-family: 'Cormorant Garamond', Georgia, serif; color: #1A1A1A;`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Playfair Display', Georgia, serif; color: #2D3B2D;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #0D0D0D; font-weight: 700;`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Cormorant Garamond', Georgia, serif; color: #2A2A2A; font-style: italic;`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: #ffffff; font-weight: 700;`}
`

const Subtitle = styled.p`
  font-size: 1rem;
  font-weight: 300;
  max-width: 550px;
  margin: 0 auto;
  line-height: 1.8;
  
  ${p => p.$themeId === 'editorial' && css`font-family: 'Inter', sans-serif; color: #666;`}
  ${p => p.$themeId === 'video' && css`font-family: 'Inter', sans-serif; color: rgba(26,26,26,0.6);`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Lato', sans-serif; color: #5A6B5A;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #525252;`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Montserrat', sans-serif; color: rgba(42,42,42,0.6);`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: rgba(255,255,255,0.6);`}
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  
  @media (max-width: 1000px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
`

const ComponentCard = styled.div`
  text-align: center;
  padding: 30px 20px;
  transition: all 0.4s ease;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '30px'});
  transition-delay: ${p => p.$delay}s;
  
  ${p => p.$themeId === 'editorial' && css`
    background: #FFFFFF;
    border: 1px solid #E0E0E0;
    &:hover { border-color: #1A1A1A; }
  `}
  ${p => p.$themeId === 'video' && css`
    background: #FFFFFF;
    border: 1px solid rgba(184,151,106,0.2);
    &:hover { border-color: #B8976A; box-shadow: 0 10px 40px rgba(184,151,106,0.1); }
  `}
  ${p => p.$themeId === 'botanical' && css`
    background: #FFFFFF;
    border: 1px solid rgba(139,157,131,0.2);
    border-radius: 16px;
    &:hover { border-color: #8B9D83; }
  `}
  ${p => p.$themeId === 'contemporary' && css`
    background: #FFFFFF;
    border: 3px solid #0D0D0D;
    &:hover { box-shadow: 4px 4px 0 #FF6B6B; }
  `}
  ${p => p.$themeId === 'luxe' && css`
    background: #FFFFFF;
    border: 1px solid rgba(212,175,55,0.1);
    &:hover { border-color: rgba(212,175,55,0.3); }
  `}
  ${p => p.$themeId === 'neon' && css`
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(0,255,255,0.2);
    &:hover { border-color: #00ffff; box-shadow: 0 0 20px rgba(0,255,255,0.2); }
  `}
`

const IconWrapper = styled.div`
  font-size: 2.5rem;
  margin-bottom: 15px;
  
  ${p => p.$included && p.$themeId === 'video' && css`
    &::after {
      content: 'INKLUSIVE';
      display: block;
      font-size: 0.5rem;
      font-family: 'Inter', sans-serif;
      letter-spacing: 0.15em;
      color: #B8976A;
      margin-top: 8px;
    }
  `}
  ${p => p.$included && p.$themeId === 'neon' && css`
    &::after {
      content: 'INKLUSIVE';
      display: block;
      font-size: 0.5rem;
      font-family: 'Space Grotesk', sans-serif;
      letter-spacing: 0.1em;
      color: #00ffff;
      margin-top: 8px;
    }
  `}
  ${p => p.$included && p.$themeId !== 'video' && p.$themeId !== 'neon' && css`
    &::after {
      content: 'INKLUSIVE';
      display: block;
      font-size: 0.5rem;
      letter-spacing: 0.1em;
      color: #999;
      margin-top: 8px;
    }
  `}
`

const ComponentName = styled.h3`
  font-size: 0.9rem;
  font-weight: 500;
  margin: 0 0 8px 0;
  
  ${p => p.$themeId === 'editorial' && css`font-family: 'Inter', sans-serif; color: #1A1A1A;`}
  ${p => p.$themeId === 'video' && css`font-family: 'Inter', sans-serif; color: #1A1A1A;`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Lato', sans-serif; color: #2D3B2D;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #0D0D0D; font-weight: 600;`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Montserrat', sans-serif; color: #2A2A2A;`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: #ffffff;`}
`

const ComponentDesc = styled.p`
  font-size: 0.75rem;
  margin: 0;
  line-height: 1.5;
  
  ${p => p.$themeId === 'editorial' && css`font-family: 'Inter', sans-serif; color: #999;`}
  ${p => p.$themeId === 'video' && css`font-family: 'Inter', sans-serif; color: rgba(26,26,26,0.5);`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Lato', sans-serif; color: #7D9D7C;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #999;`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Montserrat', sans-serif; color: rgba(42,42,42,0.5);`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: rgba(255,255,255,0.4);`}
`

const components = [
  { icon: '🏠', name: 'Hero', desc: 'Der erste Eindruck', included: true },
  { icon: '💕', name: 'Unsere Geschichte', desc: 'Eure Love Story', included: true },
  { icon: '💌', name: 'RSVP', desc: 'Digitale Zusagen', included: true },
  { icon: '🔔', name: 'Countdown', desc: 'Tage bis zum Tag', included: true },
  { icon: '📅', name: 'Ablauf', desc: 'Tagesplanung', included: false },
  { icon: '⏰', name: 'Timeline', desc: 'Zeitlicher Überblick', included: false },
  { icon: '📍', name: 'Location', desc: 'Mit Karte & Infos', included: false },
  { icon: '📌', name: 'Anfahrt', desc: 'Navigation & Tipps', included: false },
  { icon: '✏️', name: 'Gästebuch', desc: 'Wünsche sammeln', included: false },
  { icon: '🏨', name: 'Unterkünfte', desc: 'Hotelempfehlungen', included: false },
  { icon: '👗', name: 'Dresscode', desc: 'Was anziehen?', included: false },
  { icon: '🎁', name: 'Wunschliste', desc: 'Geschenkideen', included: false },
  { icon: '🎵', name: 'Musikwünsche', desc: 'Playlist mitgestalten', included: false },
  { icon: '❓', name: 'FAQ', desc: 'Häufige Fragen', included: false },
  { icon: '🖼️', name: 'Galerie', desc: 'Eure schönsten Bilder', included: false },
  { icon: '🚗', name: 'Shuttle', desc: 'Transport-Infos', included: false },
  { icon: '👶', name: 'Kinder', desc: 'Kinderbetreuung', included: false },
]

function ComponentsShowcase() {
  const { currentTheme } = useTheme()
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <Section ref={sectionRef} $themeId={currentTheme} id="features">
      <Container>
        <Header $visible={isVisible}>
          <Eyebrow $themeId={currentTheme}>— Komponenten —</Eyebrow>
          <Title $themeId={currentTheme}>Alles was ihr braucht</Title>
          <Subtitle $themeId={currentTheme}>
            Wählt aus 17 liebevoll gestalteten Komponenten – 4 davon immer inklusive.
          </Subtitle>
        </Header>
        
        <Grid>
          {components.map((comp, i) => (
            <ComponentCard 
              key={comp.name}
              $themeId={currentTheme}
              $visible={isVisible}
              $delay={0.05 * i}
            >
              <IconWrapper $themeId={currentTheme} $included={comp.included}>
                {comp.icon}
              </IconWrapper>
              <ComponentName $themeId={currentTheme}>{comp.name}</ComponentName>
              <ComponentDesc $themeId={currentTheme}>{comp.desc}</ComponentDesc>
            </ComponentCard>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}

export default ComponentsShowcase

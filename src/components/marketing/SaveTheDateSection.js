// src/components/marketing/SaveTheDateSection.js
import React, { useEffect, useRef, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { useTheme } from '../../context/ThemeContext'

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
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
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 60px;
  }
`

const Content = styled.div`
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateX(${p => p.$visible ? 0 : '-40px'});
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
  font-size: clamp(2.2rem, 4vw, 3.5rem);
  font-weight: 300;
  margin: 0 0 1.5rem 0;
  line-height: 1.2;
  
  ${p => p.$themeId === 'editorial' && css`font-family: 'Instrument Serif', Georgia, serif; color: #1A1A1A;`}
  ${p => p.$themeId === 'video' && css`font-family: 'Cormorant Garamond', Georgia, serif; color: #1A1A1A;`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Playfair Display', Georgia, serif; color: #2D3B2D;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #0D0D0D; font-weight: 700;`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Cormorant Garamond', Georgia, serif; color: #2A2A2A; font-style: italic;`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: #ffffff;`}
`

const Description = styled.p`
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.8;
  margin: 0 0 2rem 0;
  
  ${p => p.$themeId === 'editorial' && css`font-family: 'Inter', sans-serif; color: #666;`}
  ${p => p.$themeId === 'video' && css`font-family: 'Inter', sans-serif; color: rgba(26, 26, 26, 0.6);`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Lato', sans-serif; color: #5A6B5A;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #525252;`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Montserrat', sans-serif; color: rgba(42,42,42,0.6);`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: rgba(255,255,255,0.6);`}
`

const Features = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const Feature = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.9rem;
  
  ${p => p.$themeId === 'editorial' && css`font-family: 'Inter', sans-serif; color: #1A1A1A;`}
  ${p => p.$themeId === 'video' && css`font-family: 'Inter', sans-serif; color: #1A1A1A;`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Lato', sans-serif; color: #2D3B2D;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #0D0D0D;`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Montserrat', sans-serif; color: #2A2A2A;`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: #ffffff;`}
  
  &::before {
    content: '✓';
    font-weight: 600;
    ${p => p.$themeId === 'editorial' && css`color: #1A1A1A;`}
    ${p => p.$themeId === 'video' && css`color: #B8976A;`}
    ${p => p.$themeId === 'botanical' && css`color: #8B9D83;`}
    ${p => p.$themeId === 'contemporary' && css`color: #FF6B6B;`}
    ${p => p.$themeId === 'luxe' && css`color: #D4AF37;`}
    ${p => p.$themeId === 'neon' && css`color: #00ffff;`}
  }
`

const Preview = styled.div`
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateX(${p => p.$visible ? 0 : '40px'});
  transition: all 0.9s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: 0.2s;
`

const PreviewWrapper = styled.div`
  position: relative;
  display: flex;
  gap: 20px;
  align-items: flex-start;
  
  @media (max-width: 500px) {
    flex-direction: column;
    align-items: center;
  }
`

const PhoneMockup = styled.div`
  width: 180px;
  height: 360px;
  border-radius: 30px;
  padding: 10px;
  position: relative;
  
  ${p => p.$themeId === 'editorial' && css`background: #1A1A1A; box-shadow: 0 30px 80px rgba(26,26,26,0.2);`}
  ${p => p.$themeId === 'video' && css`background: #0a0a0a; box-shadow: 0 30px 80px rgba(26, 26, 26, 0.25);`}
  ${p => p.$themeId === 'botanical' && css`background: #2D3B2D; box-shadow: 0 30px 80px rgba(45,59,45,0.2);`}
  ${p => p.$themeId === 'contemporary' && css`background: #0D0D0D; box-shadow: 6px 6px 0 #FF6B6B;`}
  ${p => p.$themeId === 'luxe' && css`background: #0a0a0a; box-shadow: 0 30px 80px rgba(0,0,0,0.3);`}
  ${p => p.$themeId === 'neon' && css`background: #0a0a0f; box-shadow: 0 0 40px rgba(0,255,255,0.2);`}
  
  &::before {
    content: '';
    position: absolute;
    top: 15px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 6px;
    border-radius: 3px;
    ${p => p.$themeId === 'editorial' && css`background: #333;`}
    ${p => p.$themeId === 'video' && css`background: #1a1a1a;`}
    ${p => p.$themeId === 'botanical' && css`background: #1a2a1a;`}
    ${p => p.$themeId === 'contemporary' && css`background: #222;`}
    ${p => p.$themeId === 'luxe' && css`background: #1a1a1a;`}
    ${p => p.$themeId === 'neon' && css`background: #1a1a2e;`}
  }
  
  &:nth-child(3) {
    margin-top: 40px;
  }
`

const PhoneScreen = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 22px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px 15px;
  text-align: center;
  
  ${p => p.$dark && css`
    ${p.$themeId === 'editorial' && css`background: #1A1A1A;`}
    ${p.$themeId === 'video' && css`background: #0a0a0a;`}
    ${p.$themeId === 'botanical' && css`background: #2D3B2D;`}
    ${p.$themeId === 'contemporary' && css`background: #0D0D0D;`}
    ${p.$themeId === 'luxe' && css`background: #0a0a0a;`}
    ${p.$themeId === 'neon' && css`background: #0a0a0f;`}
  `}
  
  ${p => !p.$dark && css`
    ${p.$themeId === 'editorial' && css`background: #FFFFFF;`}
    ${p.$themeId === 'video' && css`background: #FAF8F5;`}
    ${p.$themeId === 'botanical' && css`background: #F5F1EB;`}
    ${p.$themeId === 'contemporary' && css`background: #FAFAFA;`}
    ${p.$themeId === 'luxe' && css`background: #FAF9F7;`}
    ${p.$themeId === 'neon' && css`background: #12121a;`}
  `}
`

const ScreenEyebrow = styled.div`
  font-size: 0.4rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  margin-bottom: 10px;
  
  ${p => p.$themeId === 'editorial' && css`font-family: 'Inter', sans-serif; color: ${p.$dark ? '#999' : '#999'};`}
  ${p => p.$themeId === 'video' && css`font-family: 'Inter', sans-serif; color: #B8976A;`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Lato', sans-serif; color: #8B9D83;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #FF6B6B;`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Montserrat', sans-serif; color: #D4AF37;`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: #00ffff;`}
`

const ScreenTitle = styled.div`
  font-size: 1.3rem;
  font-weight: 300;
  margin-bottom: 8px;
  
  ${p => p.$themeId === 'editorial' && css`font-family: 'Instrument Serif', Georgia, serif; color: ${p.$dark ? '#fff' : '#1A1A1A'};`}
  ${p => p.$themeId === 'video' && css`font-family: 'Cormorant Garamond', Georgia, serif; color: ${p.$dark ? '#fff' : '#1A1A1A'};`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Playfair Display', Georgia, serif; color: ${p.$dark ? '#F5F1EB' : '#2D3B2D'};`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: ${p.$dark ? '#fff' : '#0D0D0D'}; font-weight: 700;`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Cormorant Garamond', Georgia, serif; color: ${p.$dark ? '#E8DDD4' : '#2A2A2A'};`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: #00ffff;`}
  
  span {
    background: linear-gradient(135deg, 
      ${p => p.$themeId === 'video' ? '#B8976A, #D4AF37, #B8976A' :
             p.$themeId === 'botanical' ? '#8B9D83, #A8B8A0, #8B9D83' :
             p.$themeId === 'contemporary' ? '#FF6B6B, #4ECDC4, #FF6B6B' :
             p.$themeId === 'luxe' ? '#D4AF37, #F4D03F, #D4AF37' :
             p.$themeId === 'neon' ? '#00ffff, #ff00ff, #00ffff' :
             '#1A1A1A, #666, #1A1A1A'}
    );
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: ${shimmer} 4s linear infinite;
  }
`

const ScreenDate = styled.div`
  font-size: 0.5rem;
  margin-bottom: 15px;
  
  ${p => p.$themeId === 'editorial' && css`font-family: 'Inter', sans-serif; color: ${p.$dark ? 'rgba(255,255,255,0.5)' : '#999'};`}
  ${p => p.$themeId === 'video' && css`font-family: 'Inter', sans-serif; color: ${p.$dark ? 'rgba(255,255,255,0.5)' : 'rgba(26,26,26,0.5)'};`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Lato', sans-serif; color: ${p.$dark ? 'rgba(245,241,235,0.5)' : '#5A6B5A'};`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: ${p.$dark ? 'rgba(255,255,255,0.5)' : '#525252'};`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Montserrat', sans-serif; color: ${p.$dark ? 'rgba(255,255,255,0.4)' : 'rgba(42,42,42,0.5)'};`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: rgba(255,255,255,0.5);`}
`

const ScreenDivider = styled.div`
  width: 40px;
  height: 1px;
  margin-bottom: 15px;
  
  ${p => p.$themeId === 'editorial' && css`background: #E0E0E0;`}
  ${p => p.$themeId === 'video' && css`background: rgba(184, 151, 106, 0.4);`}
  ${p => p.$themeId === 'botanical' && css`background: rgba(139,157,131,0.4);`}
  ${p => p.$themeId === 'contemporary' && css`background: #FF6B6B;`}
  ${p => p.$themeId === 'luxe' && css`background: rgba(212,175,55,0.3);`}
  ${p => p.$themeId === 'neon' && css`background: rgba(0,255,255,0.4);`}
`

const ScreenText = styled.div`
  font-size: 0.4rem;
  line-height: 1.6;
  
  ${p => p.$themeId === 'editorial' && css`font-family: 'Inter', sans-serif; color: ${p.$dark ? 'rgba(255,255,255,0.4)' : '#999'};`}
  ${p => p.$themeId === 'video' && css`font-family: 'Inter', sans-serif; color: ${p.$dark ? 'rgba(255,255,255,0.4)' : 'rgba(26,26,26,0.4)'};`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Lato', sans-serif; color: ${p.$dark ? 'rgba(245,241,235,0.4)' : '#7D9D7C'};`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: ${p.$dark ? 'rgba(255,255,255,0.4)' : '#999'};`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Montserrat', sans-serif; color: ${p.$dark ? 'rgba(255,255,255,0.3)' : 'rgba(42,42,42,0.4)'};`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: rgba(255,255,255,0.4);`}
`

const Arrow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  
  ${p => p.$themeId === 'editorial' && css`color: #1A1A1A;`}
  ${p => p.$themeId === 'video' && css`color: #B8976A;`}
  ${p => p.$themeId === 'botanical' && css`color: #8B9D83;`}
  ${p => p.$themeId === 'contemporary' && css`color: #FF6B6B;`}
  ${p => p.$themeId === 'luxe' && css`color: #D4AF37;`}
  ${p => p.$themeId === 'neon' && css`color: #00ffff; text-shadow: 0 0 10px rgba(0,255,255,0.5);`}
  
  @media (max-width: 500px) {
    transform: rotate(90deg);
    position: relative;
    top: auto;
    left: auto;
  }
`

const Label = styled.div`
  font-size: 0.6rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-align: center;
  margin-top: 15px;
  
  ${p => p.$themeId === 'editorial' && css`font-family: 'Inter', sans-serif; color: #999;`}
  ${p => p.$themeId === 'video' && css`font-family: 'Inter', sans-serif; color: rgba(26, 26, 26, 0.4);`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Lato', sans-serif; color: #7D9D7C;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #999;`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Montserrat', sans-serif; color: rgba(42,42,42,0.4);`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: rgba(255,255,255,0.4);`}
`

function SaveTheDateSection() {
  const { currentTheme } = useTheme()
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <Section ref={sectionRef} $themeId={currentTheme}>
      <Container>
        <Content $visible={isVisible}>
          <Eyebrow $themeId={currentTheme}>— Save the Date —</Eyebrow>
          <Title $themeId={currentTheme}>Eine URL, zwei Erlebnisse</Title>
          <Description $themeId={currentTheme}>
            Eure Gäste besuchen die gleiche Website – zuerst sehen sie die 
            elegante Save-the-Date Ankündigung. Zur Hochzeit schaltet ihr 
            einfach auf die vollständige Wedding-Page um.
          </Description>
          <Features>
            <Feature $themeId={currentTheme}>Gleiche URL für Save-the-Date & Wedding</Feature>
            <Feature $themeId={currentTheme}>Nahtloser Übergang per Klick im Admin</Feature>
            <Feature $themeId={currentTheme}>Countdown bis zur Hochzeit</Feature>
            <Feature $themeId={currentTheme}>Frühzeitige Vorfreude bei euren Gästen</Feature>
          </Features>
        </Content>
        
        <Preview $visible={isVisible}>
          <PreviewWrapper>
            <div>
              <PhoneMockup $themeId={currentTheme}>
                <PhoneScreen $dark $themeId={currentTheme}>
                  <ScreenEyebrow $themeId={currentTheme} $dark>— Save the Date —</ScreenEyebrow>
                  <ScreenTitle $themeId={currentTheme} $dark><span>Sarah & Iver</span></ScreenTitle>
                  <ScreenDate $themeId={currentTheme} $dark>15. August 2026</ScreenDate>
                  <ScreenDivider $themeId={currentTheme} />
                  <ScreenText $themeId={currentTheme} $dark>
                    Wir heiraten!<br/>
                    Einladung folgt
                  </ScreenText>
                </PhoneScreen>
              </PhoneMockup>
              <Label $themeId={currentTheme}>Save the Date</Label>
            </div>
            
            <Arrow $themeId={currentTheme}>→</Arrow>
            
            <div>
              <PhoneMockup $themeId={currentTheme}>
                <PhoneScreen $themeId={currentTheme}>
                  <ScreenEyebrow $themeId={currentTheme}>— Willkommen —</ScreenEyebrow>
                  <ScreenTitle $themeId={currentTheme}><span>Sarah & Iver</span></ScreenTitle>
                  <ScreenDate $themeId={currentTheme}>15. August 2026 • Hamburg</ScreenDate>
                  <ScreenDivider $themeId={currentTheme} />
                  <ScreenText $themeId={currentTheme}>
                    Ablauf • Location<br/>
                    RSVP • Galerie
                  </ScreenText>
                </PhoneScreen>
              </PhoneMockup>
              <Label $themeId={currentTheme}>Wedding Page</Label>
            </div>
          </PreviewWrapper>
        </Preview>
      </Container>
    </Section>
  )
}

export default SaveTheDateSection

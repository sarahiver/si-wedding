// src/components/marketing/MarketingHero.js
import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { useTheme } from '../../context/ThemeContext'

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`

const Section = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: ${p => p.$bg};
  transition: background 0.5s ease;
`

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
    background: ${p => p.$isDark 
      ? `linear-gradient(to bottom, ${p.$bg}66 0%, ${p.$bg}99 50%, ${p.$bg}ee 100%)`
      : `linear-gradient(to bottom, ${p.$bg}66 0%, ${p.$bg}cc 50%, ${p.$bg} 100%)`
    };
  }
  
  video, img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const Content = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 900px;
  padding: 0 5%;
`

const Eyebrow = styled.div`
  font-family: ${p => p.$fontBody};
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: ${p => p.$accent};
  margin-bottom: 2rem;
  animation: ${fadeIn} 1s ease forwards;
  animation-delay: 0.2s;
  opacity: 0;
  transition: color 0.5s ease;
`

const Title = styled.h1`
  font-family: ${p => p.$fontHeading};
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 300;
  color: ${p => p.$textColor};
  line-height: 1.1;
  margin: 0 0 1.5rem 0;
  animation: ${fadeIn} 1s ease forwards;
  animation-delay: 0.4s;
  opacity: 0;
  transition: color 0.5s ease;
  
  span {
    display: block;
    background: linear-gradient(135deg, ${p => p.$accent}, ${p => p.$accentLight || p.$accent}, ${p => p.$accent});
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: ${shimmer} 4s linear infinite;
  }
`

const Subtitle = styled.p`
  font-family: ${p => p.$fontBody};
  font-size: 1.1rem;
  font-weight: 300;
  color: ${p => p.$textMuted};
  line-height: 1.8;
  max-width: 600px;
  margin: 0 auto 3rem;
  animation: ${fadeIn} 1s ease forwards;
  animation-delay: 0.6s;
  opacity: 0;
  transition: color 0.5s ease;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  animation: ${fadeIn} 1s ease forwards;
  animation-delay: 0.8s;
  opacity: 0;
`

const PrimaryButton = styled.a`
  font-family: ${p => p.$fontBody};
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${p => p.$isDark ? '#0a0a0a' : '#ffffff'};
  background: ${p => p.$accent};
  padding: 18px 45px;
  text-decoration: none;
  transition: all 0.4s ease;
  
  &:hover {
    filter: brightness(1.1);
    transform: translateY(-2px);
  }
`

const SecondaryButton = styled.a`
  font-family: ${p => p.$fontBody};
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${p => p.$accent};
  background: transparent;
  padding: 18px 45px;
  text-decoration: none;
  border: 1px solid ${p => p.$accent}66;
  transition: all 0.4s ease;
  
  &:hover {
    border-color: ${p => p.$accent};
    background: ${p => p.$accent}15;
  }
`

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  animation: ${fadeIn} 1s ease forwards;
  animation-delay: 1.2s;
  opacity: 0;
  
  span {
    font-family: ${p => p.$fontBody};
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: ${p => p.$textMuted};
    transition: color 0.5s ease;
  }
  
  &::after {
    content: '';
    width: 1px;
    height: 40px;
    background: linear-gradient(to bottom, ${p => p.$accent}, transparent);
  }
`

// Video URL
const VIDEO_URL = "https://res.cloudinary.com/si-weddings/video/upload/v1769070616/si_comming_soon_video_hero_xga2ia.mp4"

// Fallback Bild - Unsplash
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80"

function MarketingHero() {
  const { theme, currentTheme } = useTheme()
  const [videoError, setVideoError] = useState(false)
  
  const isDark = ['video', 'luxe', 'neon'].includes(currentTheme)
  const bg = theme?.background || '#0a0a0a'
  const textColor = theme?.text || '#ffffff'
  const textMuted = theme?.textMuted || 'rgba(255,255,255,0.6)'
  const accent = theme?.primary || '#B8976A'
  const accentLight = theme?.accentLight || accent
  const fontHeading = theme?.fontHeading || "'Cormorant Garamond', Georgia, serif"
  const fontBody = theme?.fontBody || "'Inter', sans-serif"

  return (
    <Section $bg={bg}>
      <VideoBackground $bg={bg} $isDark={isDark}>
        {!videoError ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            onError={() => setVideoError(true)}
          >
            <source src={VIDEO_URL} type="video/mp4" />
          </video>
        ) : (
          <img 
            src={FALLBACK_IMAGE} 
            alt="Wedding background"
          />
        )}
      </VideoBackground>
      
      <Content>
        <Eyebrow $accent={accent} $fontBody={fontBody}>
          — Premium Wedding Websites —
        </Eyebrow>
        <Title 
          $textColor={textColor} 
          $accent={accent} 
          $accentLight={accentLight}
          $fontHeading={fontHeading}
        >
          <span>Euer Film</span>
          beginnt hier
        </Title>
        <Subtitle $textMuted={textMuted} $fontBody={fontBody}>
          Cineastische Hochzeitswebsites mit Video-Hintergründen. 
          Eure Liebesgeschichte, filmreif inszeniert.
        </Subtitle>
        <ButtonGroup>
          <PrimaryButton href="#contact" $accent={accent} $isDark={isDark} $fontBody={fontBody}>
            Jetzt starten
          </PrimaryButton>
          <SecondaryButton href="#examples" $accent={accent} $fontBody={fontBody}>
            Themes entdecken
          </SecondaryButton>
        </ButtonGroup>
      </Content>
      
      <ScrollIndicator $accent={accent} $textMuted={textMuted} $fontBody={fontBody}>
        <span>Scroll</span>
      </ScrollIndicator>
    </Section>
  )
}

export default MarketingHero

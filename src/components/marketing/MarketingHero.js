// src/components/marketing/MarketingHero.js
import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'

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
  background: #0a0a0a;
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
`

const Content = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 900px;
  padding: 0 5%;
`

const Eyebrow = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #B8976A;
  margin-bottom: 2rem;
  animation: ${fadeIn} 1s ease forwards;
  animation-delay: 0.2s;
  opacity: 0;
`

const Title = styled.h1`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 300;
  color: #ffffff;
  line-height: 1.1;
  margin: 0 0 1.5rem 0;
  animation: ${fadeIn} 1s ease forwards;
  animation-delay: 0.4s;
  opacity: 0;
  
  span {
    display: block;
    background: linear-gradient(135deg, #B8976A, #D4AF37, #B8976A);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: ${shimmer} 4s linear infinite;
  }
`

const Subtitle = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.8;
  max-width: 600px;
  margin: 0 auto 3rem;
  animation: ${fadeIn} 1s ease forwards;
  animation-delay: 0.6s;
  opacity: 0;
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
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #0a0a0a;
  background: #B8976A;
  padding: 18px 45px;
  text-decoration: none;
  transition: all 0.4s ease;
  
  &:hover {
    background: #D4AF37;
    transform: translateY(-2px);
  }
`

const SecondaryButton = styled.a`
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #B8976A;
  background: transparent;
  padding: 18px 45px;
  text-decoration: none;
  border: 1px solid rgba(184, 151, 106, 0.4);
  transition: all 0.4s ease;
  
  &:hover {
    border-color: #B8976A;
    background: rgba(184, 151, 106, 0.1);
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
    font-family: 'Inter', sans-serif;
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.4);
  }
  
  &::after {
    content: '';
    width: 1px;
    height: 40px;
    background: linear-gradient(to bottom, #B8976A, transparent);
  }
`

// Video URL - ersetzen mit eigenem Video
const VIDEO_URL = "https://res.cloudinary.com/si-weddings/video/upload/v1769070616/si_comming_soon_video_hero_xga2ia.mp4"

// Fallback Bild - Unsplash Hochzeitsbild
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80"

function MarketingHero() {
  const [videoError, setVideoError] = useState(false)

  return (
    <Section>
      <VideoBackground>
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
        <Eyebrow>— Premium Wedding Websites —</Eyebrow>
        <Title>
          <span>Euer Film</span>
          beginnt hier
        </Title>
        <Subtitle>
          Cineastische Hochzeitswebsites mit Video-Hintergründen. 
          Eure Liebesgeschichte, filmreif inszeniert.
        </Subtitle>
        <ButtonGroup>
          <PrimaryButton href="#contact">Jetzt starten</PrimaryButton>
          <SecondaryButton href="#examples">Themes entdecken</SecondaryButton>
        </ButtonGroup>
      </Content>
      
      <ScrollIndicator>
        <span>Scroll</span>
      </ScrollIndicator>
    </Section>
  )
}

export default MarketingHero

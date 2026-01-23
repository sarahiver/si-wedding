// src/components/marketing/ExamplesShowcase.js
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`

const Section = styled.section`
  padding: 140px 5%;
  background: #0a0a0a;
  position: relative;
`

const Container = styled.div`
  max-width: 1300px;
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
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #B8976A;
  display: block;
  margin-bottom: 1.5rem;
`

const Title = styled.h2`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 300;
  color: #ffffff;
  margin: 0 0 1.5rem 0;
`

const Subtitle = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.5);
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.8;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
  
  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

const Card = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '30px'});
  transition: opacity 0.6s ease ${p => p.$delay}s, 
              transform 0.6s ease ${p => p.$delay}s,
              border-color 0.4s ease,
              box-shadow 0.4s ease;
  
  &:hover {
    border-color: rgba(184, 151, 106, 0.4);
    box-shadow: 0 0 50px rgba(184, 151, 106, 0.1);
    
    img {
      transform: scale(1.05);
    }
  }
`

const ImageWrapper = styled.div`
  position: relative;
  height: 280px;
  overflow: hidden;
  background: ${p => p.$bgColor || '#1a1a1a'};
`

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
`

const CardContent = styled.div`
  padding: 30px 25px;
  text-align: center;
`

const CardInitials = styled.div`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.8rem;
  font-weight: 300;
  letter-spacing: 0.1em;
  background: linear-gradient(135deg, #B8976A, #D4AF37, #B8976A);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${shimmer} 4s linear infinite;
  margin-bottom: 12px;
`

const CardName = styled.h3`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.3rem;
  font-weight: 400;
  color: #ffffff;
  margin: 0 0 6px 0;
`

const CardTagline = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 15px;
`

const ColorSwatches = styled.div`
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-bottom: 15px;
`

const Swatch = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${p => p.$color};
  border: 1px solid rgba(255, 255, 255, 0.1);
`

const CardCTA = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.6rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #B8976A;
  padding-top: 15px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`

// Theme examples mit echten Unsplash Bildern
const themeExamples = [
  {
    id: 'video',
    name: 'Video',
    tagline: 'Cineastisch & Dramatisch',
    colors: ['#FAF8F5', '#1A1A1A', '#B8976A'],
    bgColor: '#0a0a0a',
    // Cinematic wedding - dramatic lighting
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80',
    demoUrl: '/demo?theme=video'
  },
  {
    id: 'editorial',
    name: 'Editorial',
    tagline: 'Zeitlose Magazin-Ästhetik',
    colors: ['#FFFFFF', '#1A1A1A', '#666666'],
    bgColor: '#ffffff',
    // Clean, editorial style wedding
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80',
    demoUrl: '/demo?theme=editorial'
  },
  {
    id: 'botanical',
    name: 'Botanical',
    tagline: 'Organisch & Natürlich',
    colors: ['#F8F6F0', '#2D3B2D', '#8B9D83'],
    bgColor: '#F8F6F0',
    // Garden/nature wedding with greenery
    image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=600&q=80',
    demoUrl: '/demo?theme=botanical'
  },
  {
    id: 'contemporary',
    name: 'Contemporary',
    tagline: 'Modern & Playful',
    colors: ['#FF6B6B', '#4ECDC4', '#FFE66D'],
    bgColor: '#FAFAFA',
    // Modern, colorful wedding
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80',
    demoUrl: '/demo?theme=contemporary'
  },
  {
    id: 'luxe',
    name: 'Luxe',
    tagline: 'Opulent & Glamourös',
    colors: ['#FAF9F7', '#2A2A2A', '#D4AF37'],
    bgColor: '#0a0a0a',
    // Luxury, gold accents wedding
    image: 'https://images.unsplash.com/photo-1549416878-7e58e89bae85?w=600&q=80',
    demoUrl: '/demo?theme=luxe'
  },
  {
    id: 'neon',
    name: 'Neon',
    tagline: 'Bold & Digital',
    colors: ['#0A0A0F', '#00FFFF', '#FF00FF'],
    bgColor: '#0A0A0F',
    // Night wedding with lights
    image: 'https://images.unsplash.com/photo-1528495612343-9ca9f4a4de28?w=600&q=80',
    demoUrl: '/demo?theme=neon'
  }
]

function ExamplesShowcase() {
  const navigate = useNavigate()
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

  const handleCardClick = (theme) => {
    navigate(theme.demoUrl)
  }

  return (
    <Section ref={sectionRef} id="examples">
      <Container>
        <Header $visible={isVisible}>
          <Eyebrow>— Themes —</Eyebrow>
          <Title>Unsere Design-Welten</Title>
          <Subtitle>
            Sechs einzigartige Ästhetiken. Welche erzählt eure Geschichte?
          </Subtitle>
        </Header>
        
        <Grid>
          {themeExamples.map((theme, i) => (
            <Card 
              key={theme.id} 
              $visible={isVisible} 
              $delay={0.1 + i * 0.08}
              onClick={() => handleCardClick(theme)}
            >
              <ImageWrapper $bgColor={theme.bgColor}>
                <PreviewImage 
                  src={theme.image} 
                  alt={`${theme.name} Theme Preview`}
                />
              </ImageWrapper>
              
              <CardContent>
                <CardInitials>{theme.name.substring(0, 2).toUpperCase()}</CardInitials>
                <CardName>{theme.name}</CardName>
                <CardTagline>{theme.tagline}</CardTagline>
                <ColorSwatches>
                  {theme.colors.map((color, j) => (
                    <Swatch key={j} $color={color} />
                  ))}
                </ColorSwatches>
                <CardCTA>Demo ansehen →</CardCTA>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}

export default ExamplesShowcase

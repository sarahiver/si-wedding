// src/components/marketing/ComponentsShowcase.js
import React, { useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
`

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`

const Section = styled.section`
  padding: 140px 5%;
  background: #FAF8F5;
  position: relative;
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
  color: #1A1A1A;
  margin: 0 0 1.5rem 0;
`

const Subtitle = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 300;
  color: rgba(26, 26, 26, 0.6);
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.8;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  
  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

const Card = styled.div`
  background: #ffffff;
  padding: 40px 30px;
  text-align: center;
  border: 1px solid rgba(26, 26, 26, 0.08);
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '30px'});
  transition: opacity 0.6s ease ${p => p.$delay}s, 
              transform 0.6s ease ${p => p.$delay}s,
              box-shadow 0.4s ease,
              border-color 0.4s ease;
  
  &:hover {
    border-color: rgba(184, 151, 106, 0.3);
    box-shadow: 0 20px 60px rgba(26, 26, 26, 0.08);
  }
`

const IncludedBadge = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  font-family: 'Inter', sans-serif;
  font-size: 0.55rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background: linear-gradient(135deg, #B8976A, #D4AF37);
  background-size: 200% auto;
  animation: ${shimmer} 3s linear infinite;
  color: #ffffff;
  padding: 5px 10px;
`

const Icon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 20px;
`

const CardTitle = styled.h3`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.3rem;
  font-weight: 500;
  color: #1A1A1A;
  margin: 0 0 10px 0;
`

const CardDesc = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 300;
  color: rgba(26, 26, 26, 0.5);
  line-height: 1.6;
  margin: 0;
`

const components = [
  { icon: '🏠', title: 'Hero', description: 'Fullscreen Video oder Bild mit Animation', included: true },
  { icon: '💍', title: 'Countdown', description: 'Eleganter Timer bis zum großen Tag', included: true },
  { icon: '📖', title: 'Love Story', description: 'Eure Geschichte, schön erzählt', included: true },
  { icon: '📍', title: 'Locations', description: 'Interaktive Karten für alle Orte', included: true },
  { icon: '✉️', title: 'RSVP', description: 'Digitale Zusagen mit Menüwahl', included: true },
  { icon: '📸', title: 'Galerie', description: 'Elegante Foto-Präsentation', included: true },
  { icon: '❓', title: 'FAQ', description: 'Wichtige Infos für eure Gäste', included: true },
  { icon: '👗', title: 'Dresscode', description: 'Style-Guide für den Tag', included: false },
  { icon: '🎁', title: 'Geschenke', description: 'Wunschliste elegant integriert', included: false },
  { icon: '🎵', title: 'Musikwünsche', description: 'Gäste wählen Songs', included: false },
  { icon: '📱', title: 'Photo Upload', description: 'Gäste teilen ihre Fotos', included: false },
  { icon: '✍️', title: 'Gästebuch', description: 'Digitale Glückwünsche', included: false },
]

function ComponentsShowcase() {
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
    <Section ref={sectionRef} id="features">
      <Container>
        <Header $visible={isVisible}>
          <Eyebrow>— Module —</Eyebrow>
          <Title>Alles für eure Hochzeitswebsite</Title>
          <Subtitle>
            Wählt aus 12 handgefertigten Komponenten. Kombiniert sie nach euren Wünschen.
          </Subtitle>
        </Header>
        
        <Grid>
          {components.map((comp, i) => (
            <Card 
              key={comp.title} 
              $visible={isVisible} 
              $delay={0.1 + i * 0.05}
            >
              {comp.included && <IncludedBadge>Inklusive</IncludedBadge>}
              <Icon>{comp.icon}</Icon>
              <CardTitle>{comp.title}</CardTitle>
              <CardDesc>{comp.description}</CardDesc>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}

export default ComponentsShowcase

// src/components/marketing/USPSection.js
import React, { useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'

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
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

const Card = styled.div`
  background: #ffffff;
  padding: 50px 40px;
  border: 1px solid rgba(26, 26, 26, 0.08);
  transition: all 0.4s ease;
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

const Icon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 25px;
`

const CardTitle = styled.h3`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.5rem;
  font-weight: 500;
  color: #1A1A1A;
  margin: 0 0 12px 0;
`

const Highlight = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background: linear-gradient(135deg, #B8976A, #D4AF37, #B8976A);
  background-size: 200% auto;
  animation: ${shimmer} 3s linear infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

const usps = [
  {
    icon: '✨',
    title: 'Handgemachtes Design',
    highlight: 'Keine Templates'
  },
  {
    icon: '🎬',
    title: 'Video-Hintergründe',
    highlight: 'Cineastisch'
  },
  {
    icon: '📱',
    title: 'Mobile-First',
    highlight: 'Perfekt auf allen Geräten'
  },
  {
    icon: '🔒',
    title: 'Passwortschutz',
    highlight: 'Privatsphäre garantiert'
  },
  {
    icon: '⚡',
    title: 'Blitzschnell',
    highlight: 'Optimierte Performance'
  },
  {
    icon: '💬',
    title: 'Persönlicher Support',
    highlight: 'Immer für euch da'
  }
]

function USPSection() {
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
    <Section ref={sectionRef}>
      <Container>
        <Header $visible={isVisible}>
          <Eyebrow>— Warum S&I —</Eyebrow>
          <Title>Das macht uns besonders</Title>
          <Subtitle>
            Wir verbinden Technologie mit Leidenschaft für Design.
          </Subtitle>
        </Header>
        
        <Grid>
          {usps.map((usp, i) => (
            <Card key={usp.title} $visible={isVisible} $delay={0.1 + i * 0.08}>
              <Icon>{usp.icon}</Icon>
              <CardTitle>{usp.title}</CardTitle>
              <Highlight>{usp.highlight}</Highlight>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}

export default USPSection

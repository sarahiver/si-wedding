// src/components/marketing/SaveTheDateSection.js
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const Section = styled.section`
  padding: 140px 5%;
  background: #FAF8F5;
  position: relative;
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
  font-size: clamp(2.2rem, 4vw, 3.5rem);
  font-weight: 300;
  color: #1A1A1A;
  margin: 0 0 1.5rem 0;
  line-height: 1.2;
`

const Description = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 300;
  color: rgba(26, 26, 26, 0.6);
  line-height: 1.8;
  margin: 0 0 2rem 0;
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
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #1A1A1A;
  
  &::before {
    content: '✓';
    color: #B8976A;
    font-weight: 600;
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
`

const PreviewImage = styled.img`
  width: 100%;
  height: auto;
  box-shadow: 0 30px 80px rgba(26, 26, 26, 0.15);
`

// Unsplash - Hochzeitseinladung / Save the Date Style
const SAVE_THE_DATE_IMAGE = "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&q=80"

function SaveTheDateSection() {
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
    <Section ref={sectionRef}>
      <Container>
        <Content $visible={isVisible}>
          <Eyebrow>— Save the Date —</Eyebrow>
          <Title>Digitale Save-the-Dates die begeistern</Title>
          <Description>
            Vergesst Papier. Überrascht eure Gäste mit einer eleganten 
            digitalen Ankündigung, die direkt zu eurer Hochzeitswebsite führt.
          </Description>
          <Features>
            <Feature>QR-Code für einfachen Zugang</Feature>
            <Feature>Automatische Kalender-Integration</Feature>
            <Feature>Animierte Vorschau-Karten</Feature>
            <Feature>Perfekt für WhatsApp & E-Mail</Feature>
          </Features>
        </Content>
        
        <Preview $visible={isVisible}>
          <PreviewWrapper>
            <PreviewImage 
              src={SAVE_THE_DATE_IMAGE}
              alt="Save the Date Beispiel"
            />
          </PreviewWrapper>
        </Preview>
      </Container>
    </Section>
  )
}

export default SaveTheDateSection

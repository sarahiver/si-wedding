// src/components/marketing/SaveTheDateSection.js
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

const PlaceholderNote = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: rgba(184, 151, 106, 0.9);
  color: #0a0a0a;
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 8px 15px;
`

const PreviewCard = styled.div`
  background: #0a0a0a;
  padding: 60px 50px;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(184, 151, 106, 0.03), transparent);
  }
`

const PreviewEyebrow = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.6rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #B8976A;
  margin-bottom: 20px;
  position: relative;
`

const PreviewTitle = styled.div`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 2.5rem;
  font-weight: 300;
  background: linear-gradient(135deg, #B8976A, #D4AF37, #B8976A);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${shimmer} 4s linear infinite;
  margin-bottom: 15px;
  position: relative;
`

const PreviewDate = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 30px;
  position: relative;
`

const PreviewDivider = styled.div`
  width: 60px;
  height: 1px;
  background: rgba(184, 151, 106, 0.4);
  margin: 0 auto 30px;
  position: relative;
`

const PreviewText = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.4);
  letter-spacing: 0.1em;
  position: relative;
`

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
            {/* Option 1: Mit echtem Mockup-Bild */}
            {/* 
            <PreviewImage 
              src="https://placehold.co/500x700/0a0a0a/B8976A?text=Save+the+Date%0AMockup%0A(Handy+mit+Karte)"
              alt="Save the Date Beispiel"
            />
            <PlaceholderNote>📷 Mockup ersetzen</PlaceholderNote>
            */}
            
            {/* Option 2: Live Preview Card */}
            <PreviewCard>
              <PreviewEyebrow>— Save the Date —</PreviewEyebrow>
              <PreviewTitle>Sarah & Iver</PreviewTitle>
              <PreviewDate>15. August 2026 • Hamburg</PreviewDate>
              <PreviewDivider />
              <PreviewText>Wir heiraten und ihr sollt dabei sein</PreviewText>
            </PreviewCard>
          </PreviewWrapper>
        </Preview>
      </Container>
    </Section>
  )
}

export default SaveTheDateSection

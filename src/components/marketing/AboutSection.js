// src/components/marketing/AboutSection.js
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const Section = styled.section`
  padding: 140px 5%;
  background: #0a0a0a;
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

const ImageWrapper = styled.div`
  position: relative;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateX(${p => p.$visible ? 0 : '-40px'});
  transition: all 0.9s cubic-bezier(0.16, 1, 0.3, 1);
  
  &::before {
    content: '';
    position: absolute;
    top: 20px;
    left: 20px;
    right: -20px;
    bottom: -20px;
    border: 1px solid rgba(184, 151, 106, 0.3);
    z-index: 0;
  }
`

const Image = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;
  position: relative;
  z-index: 1;
  filter: grayscale(20%);
  
  @media (max-width: 600px) {
    height: 400px;
  }
`

const PlaceholderNote = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  background: rgba(184, 151, 106, 0.9);
  color: #0a0a0a;
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 8px 15px;
  z-index: 2;
`

const Content = styled.div`
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateX(${p => p.$visible ? 0 : '40px'});
  transition: all 0.9s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: 0.2s;
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
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 300;
  color: #ffffff;
  margin: 0 0 1.5rem 0;
`

const Divider = styled.div`
  width: 60px;
  height: 1px;
  background: rgba(184, 151, 106, 0.4);
  margin-bottom: 2rem;
`

const Text = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.9;
  margin: 0 0 1.5rem 0;
`

const Quote = styled.blockquote`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.4rem;
  font-weight: 300;
  font-style: italic;
  color: #B8976A;
  margin: 2rem 0;
  padding-left: 20px;
  border-left: 2px solid rgba(184, 151, 106, 0.3);
  line-height: 1.6;
`

const Signature = styled.div`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.5rem;
  font-weight: 300;
  color: #ffffff;
  margin-top: 2rem;
  
  span {
    color: #B8976A;
  }
`

function AboutSection() {
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
    <Section ref={sectionRef} id="about">
      <Container>
        <ImageWrapper $visible={isVisible}>
          <Image 
            src="https://placehold.co/600x750/1a1a1a/B8976A?text=Sarah+%26+Iver%0AFoto" 
            alt="Sarah & Iver - Gründer von S&I Wedding"
          />
          <PlaceholderNote>📷 Bild ersetzen</PlaceholderNote>
        </ImageWrapper>
        
        <Content $visible={isVisible}>
          <Eyebrow>— Über uns —</Eyebrow>
          <Title>Sarah & Iver</Title>
          <Divider />
          
          <Text>
            Wir sind Sarah und Iver – ein Paar aus Hamburg, das selbst vor der 
            Herausforderung stand, eine Hochzeitswebsite zu finden, die unseren 
            Ansprüchen gerecht wird.
          </Text>
          
          <Quote>
            „Wir wollten keine 08/15-Vorlage. Wir wollten etwas, 
            das unsere Geschichte erzählt."
          </Quote>
          
          <Text>
            Aus dieser Frustration entstand S&I – Hochzeitswebsites, die so 
            einzigartig sind wie eure Liebe. Jedes Design wird mit Liebe zum 
            Detail handgefertigt.
          </Text>
          
          <Signature>
            Sarah <span>&</span> Iver
          </Signature>
        </Content>
      </Container>
    </Section>
  )
}

export default AboutSection

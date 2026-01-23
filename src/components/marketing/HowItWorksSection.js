// src/components/marketing/HowItWorksSection.js
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const Section = styled.section`
  padding: 140px 5%;
  background: #0a0a0a;
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

const Steps = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 60px;
    left: 12.5%;
    right: 12.5%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(184, 151, 106, 0.3), transparent);
    
    @media (max-width: 900px) {
      display: none;
    }
  }
  
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

const Step = styled.div`
  text-align: center;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '30px'});
  transition: all 0.6s ease ${p => p.$delay}s;
`

const StepNumber = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 2rem;
  font-weight: 300;
  color: #B8976A;
  border: 1px solid rgba(184, 151, 106, 0.3);
  background: rgba(184, 151, 106, 0.03);
  position: relative;
`

const StepTitle = styled.h3`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.4rem;
  font-weight: 500;
  color: #ffffff;
  margin: 0 0 12px 0;
`

const StepDesc = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.7;
  margin: 0;
`

const steps = [
  {
    number: '01',
    title: 'Theme wählen',
    description: 'Wählt aus 6 handgefertigten Design-Welten euren Favoriten.'
  },
  {
    number: '02',
    title: 'Inhalt anpassen',
    description: 'Fügt eure Texte, Fotos und alle wichtigen Infos hinzu.'
  },
  {
    number: '03',
    title: 'Review & Feedback',
    description: 'Wir perfektionieren jedes Detail bis ihr 100% zufrieden seid.'
  },
  {
    number: '04',
    title: 'Launch',
    description: 'Eure Website geht live – rechtzeitig für eure Save-the-Dates.'
  }
]

function HowItWorksSection() {
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
          <Eyebrow>— Prozess —</Eyebrow>
          <Title>So funktioniert's</Title>
          <Subtitle>
            In vier einfachen Schritten zu eurer traumhaften Hochzeitswebsite.
          </Subtitle>
        </Header>
        
        <Steps>
          {steps.map((step, i) => (
            <Step key={step.number} $visible={isVisible} $delay={0.2 + i * 0.1}>
              <StepNumber>{step.number}</StepNumber>
              <StepTitle>{step.title}</StepTitle>
              <StepDesc>{step.description}</StepDesc>
            </Step>
          ))}
        </Steps>
      </Container>
    </Section>
  )
}

export default HowItWorksSection

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
  background: #0a0a0a;
  border-radius: 30px;
  padding: 10px;
  box-shadow: 0 30px 80px rgba(26, 26, 26, 0.25);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 15px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 6px;
    background: #1a1a1a;
    border-radius: 3px;
  }
  
  &:nth-child(2) {
    margin-top: 40px;
  }
`

const PhoneScreen = styled.div`
  width: 100%;
  height: 100%;
  background: ${p => p.$dark ? '#0a0a0a' : '#FAF8F5'};
  border-radius: 22px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px 15px;
  text-align: center;
`

const ScreenEyebrow = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.4rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #B8976A;
  margin-bottom: 10px;
`

const ScreenTitle = styled.div`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.3rem;
  font-weight: 300;
  color: ${p => p.$dark ? '#ffffff' : '#1A1A1A'};
  margin-bottom: 8px;
  
  span {
    background: linear-gradient(135deg, #B8976A, #D4AF37, #B8976A);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: ${shimmer} 4s linear infinite;
  }
`

const ScreenDate = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.5rem;
  color: ${p => p.$dark ? 'rgba(255,255,255,0.5)' : 'rgba(26,26,26,0.5)'};
  margin-bottom: 15px;
`

const ScreenDivider = styled.div`
  width: 40px;
  height: 1px;
  background: rgba(184, 151, 106, 0.4);
  margin-bottom: 15px;
`

const ScreenText = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.4rem;
  color: ${p => p.$dark ? 'rgba(255,255,255,0.4)' : 'rgba(26,26,26,0.4)'};
  line-height: 1.6;
`

const Arrow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  color: #B8976A;
  
  @media (max-width: 500px) {
    transform: rotate(90deg);
    position: relative;
    top: auto;
    left: auto;
  }
`

const Label = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.6rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(26, 26, 26, 0.4);
  text-align: center;
  margin-top: 15px;
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
          <Title>Eine URL, zwei Erlebnisse</Title>
          <Description>
            Eure Gäste besuchen die gleiche Website – zuerst sehen sie die 
            elegante Save-the-Date Ankündigung. Zur Hochzeit schaltet ihr 
            einfach auf die vollständige Wedding-Page um.
          </Description>
          <Features>
            <Feature>Gleiche URL für Save-the-Date & Wedding</Feature>
            <Feature>Nahtloser Übergang per Klick im Admin</Feature>
            <Feature>Countdown bis zur Hochzeit</Feature>
            <Feature>Frühzeitige Vorfreude bei euren Gästen</Feature>
          </Features>
        </Content>
        
        <Preview $visible={isVisible}>
          <PreviewWrapper>
            <div>
              <PhoneMockup>
                <PhoneScreen $dark>
                  <ScreenEyebrow>— Save the Date —</ScreenEyebrow>
                  <ScreenTitle $dark><span>Sarah & Iver</span></ScreenTitle>
                  <ScreenDate $dark>15. August 2026</ScreenDate>
                  <ScreenDivider />
                  <ScreenText $dark>
                    Wir heiraten!<br/>
                    Einladung folgt
                  </ScreenText>
                </PhoneScreen>
              </PhoneMockup>
              <Label>Save the Date</Label>
            </div>
            
            <Arrow>→</Arrow>
            
            <div>
              <PhoneMockup>
                <PhoneScreen>
                  <ScreenEyebrow>— Willkommen —</ScreenEyebrow>
                  <ScreenTitle><span>Sarah & Iver</span></ScreenTitle>
                  <ScreenDate>15. August 2026 • Hamburg</ScreenDate>
                  <ScreenDivider />
                  <ScreenText>
                    Ablauf • Location<br/>
                    RSVP • Galerie
                  </ScreenText>
                </PhoneScreen>
              </PhoneMockup>
              <Label>Wedding Page</Label>
            </div>
          </PreviewWrapper>
        </Preview>
      </Container>
    </Section>
  )
}

export default SaveTheDateSection

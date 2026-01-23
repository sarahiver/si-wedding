// src/components/marketing/AboutSection.js
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const Section = styled.section`
  padding: 140px 5%;
  background: #0a0a0a;
  position: relative;
`

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`

const Content = styled.div`
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
  margin: 0 0 2rem 0;
`

const Divider = styled.div`
  width: 80px;
  height: 1px;
  background: rgba(184, 151, 106, 0.4);
  margin: 0 auto 2.5rem;
`

const Text = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1.05rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.6);
  line-height: 2;
  margin: 0 0 2rem 0;
`

const Quote = styled.blockquote`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.5rem;
  font-weight: 300;
  font-style: italic;
  color: #B8976A;
  margin: 3rem 0;
  padding: 0;
  line-height: 1.6;
`

const Signature = styled.div`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.8rem;
  font-weight: 300;
  color: #ffffff;
  margin-top: 3rem;
  
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
            Detail handgefertigt, jede Zeile Code mit Leidenschaft geschrieben.
          </Text>
          
          <Text>
            Heute helfen wir Paaren auf der ganzen Welt, ihre Geschichte 
            digital zu erzählen. Und wir könnten nicht stolzer sein.
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

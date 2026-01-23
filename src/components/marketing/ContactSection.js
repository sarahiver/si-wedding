// src/components/marketing/ContactSection.js
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const Section = styled.section`
  padding: 140px 5%;
  background: #FAF8F5;
  position: relative;
`

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
`

const Content = styled.div`
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '40px'});
  transition: all 0.9s cubic-bezier(0.16, 1, 0.3, 1);
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 50px;
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
  margin: 0 0 1rem 0;
`

const Subtitle = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 300;
  color: rgba(26, 26, 26, 0.6);
  line-height: 1.8;
  margin: 0;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const Label = styled.label`
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #1A1A1A;
`

const Input = styled.input`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  padding: 18px 20px;
  border: 1px solid rgba(26, 26, 26, 0.15);
  background: #ffffff;
  color: #1A1A1A;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #B8976A;
  }
  
  &::placeholder {
    color: rgba(26, 26, 26, 0.3);
  }
`

const Select = styled.select`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  padding: 18px 20px;
  border: 1px solid rgba(26, 26, 26, 0.15);
  background: #ffffff;
  color: #1A1A1A;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #B8976A;
  }
`

const Textarea = styled.textarea`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  padding: 18px 20px;
  border: 1px solid rgba(26, 26, 26, 0.15);
  background: #ffffff;
  color: #1A1A1A;
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #B8976A;
  }
  
  &::placeholder {
    color: rgba(26, 26, 26, 0.3);
  }
`

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`

const SubmitButton = styled.button`
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #FAF8F5;
  background: #1A1A1A;
  padding: 20px 40px;
  border: none;
  cursor: pointer;
  transition: all 0.4s ease;
  margin-top: 10px;
  
  &:hover {
    background: #B8976A;
  }
`

const SuccessMessage = styled.div`
  text-align: center;
  padding: 60px 40px;
  background: rgba(184, 151, 106, 0.05);
  border: 1px solid rgba(184, 151, 106, 0.2);
`

const SuccessTitle = styled.h3`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 2rem;
  font-weight: 300;
  color: #1A1A1A;
  margin: 0 0 15px 0;
`

const SuccessText = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: rgba(26, 26, 26, 0.6);
  margin: 0;
`

function ContactSection() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    names: '',
    email: '',
    date: '',
    theme: '',
    message: ''
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would normally send the form data
    console.log('Form submitted:', formData)
    setSubmitted(true)
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <Section ref={sectionRef} id="contact">
      <Container>
        <Content $visible={isVisible}>
          <Header>
            <Eyebrow>— Kontakt —</Eyebrow>
            <Title>Lasst uns starten</Title>
            <Subtitle>
              Erzählt uns von eurer Hochzeit. Wir melden uns innerhalb von 24 Stunden.
            </Subtitle>
          </Header>
          
          {submitted ? (
            <SuccessMessage>
              <SuccessTitle>Vielen Dank!</SuccessTitle>
              <SuccessText>
                Wir haben eure Anfrage erhalten und melden uns bald bei euch.
              </SuccessText>
            </SuccessMessage>
          ) : (
            <Form onSubmit={handleSubmit}>
              <InputGroup>
                <Label>Eure Namen</Label>
                <Input 
                  type="text" 
                  name="names"
                  placeholder="z.B. Sarah & Iver"
                  value={formData.names}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
              
              <Row>
                <InputGroup>
                  <Label>E-Mail</Label>
                  <Input 
                    type="email" 
                    name="email"
                    placeholder="eure@email.de"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
                
                <InputGroup>
                  <Label>Hochzeitsdatum</Label>
                  <Input 
                    type="date" 
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </InputGroup>
              </Row>
              
              <InputGroup>
                <Label>Bevorzugtes Theme</Label>
                <Select 
                  name="theme"
                  value={formData.theme}
                  onChange={handleChange}
                >
                  <option value="">Bitte wählen...</option>
                  <option value="video">Video – Cineastisch Dramatisch</option>
                  <option value="editorial">Editorial – Zeitlos Elegant</option>
                  <option value="botanical">Botanical – Natürlich Organisch</option>
                  <option value="contemporary">Contemporary – Modern Bold</option>
                  <option value="luxe">Luxe – Opulent Glamourös</option>
                  <option value="neon">Neon – Futuristisch Digital</option>
                </Select>
              </InputGroup>
              
              <InputGroup>
                <Label>Eure Nachricht</Label>
                <Textarea 
                  name="message"
                  placeholder="Erzählt uns von eurer Hochzeit und euren Wünschen..."
                  value={formData.message}
                  onChange={handleChange}
                />
              </InputGroup>
              
              <SubmitButton type="submit">Anfrage senden</SubmitButton>
            </Form>
          )}
        </Content>
      </Container>
    </Section>
  )
}

export default ContactSection

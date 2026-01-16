// src/components/marketing/ContactSection.js
import styled from "styled-components"
import { useState } from "react"

const Section = styled.section`
  padding: 8rem 4rem;
  background: #000000;
  color: #ffffff;

  @media (max-width: 768px) {
    padding: 4rem 2rem;
  }
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
`

const Content = styled.div``

const Eyebrow = styled.div`
  font-family: "Inter", sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 1.5rem;
`

const Title = styled.h2`
  font-family: "Instrument Serif", serif;
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 400;
  color: #ffffff;
  margin-bottom: 2rem;
  line-height: 1.2;

  span {
    font-style: italic;
  }
`

const Description = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.8;
  margin-bottom: 3rem;
`

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const ContactItem = styled.a`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  color: #ffffff;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    color: rgba(255, 255, 255, 0.7);
  }

  span {
    font-size: 1.2rem;
  }
`

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 3rem;
`

const SocialLink = styled.a`
  font-family: "Inter", sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #ffffff;
  }
`

const FormContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 3rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Label = styled.label`
  font-family: "Inter", sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
`

const Input = styled.input`
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1rem 0;
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  color: #ffffff;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #ffffff;
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`

const TextArea = styled.textarea`
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1rem 0;
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  color: #ffffff;
  resize: vertical;
  min-height: 100px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #ffffff;
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`

const Select = styled.select`
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1rem 0;
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  color: #ffffff;
  cursor: pointer;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #ffffff;
  }

  option {
    background: #000000;
    color: #ffffff;
  }
`

const SubmitButton = styled.button`
  font-family: "Inter", sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  background: #ffffff;
  color: #000000;
  border: none;
  padding: 1.2rem 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover {
    background: rgba(255, 255, 255, 0.9);
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const SuccessMessage = styled.div`
  text-align: center;
  padding: 3rem;

  h3 {
    font-family: "Instrument Serif", serif;
    font-size: 2rem;
    color: #ffffff;
    margin-bottom: 1rem;
  }

  p {
    font-family: "Inter", sans-serif;
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.6;
  }
`

function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    package: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    // Hier später echte Form-Submission (z.B. zu Supabase oder Email-Service)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setSubmitted(true)
    setSubmitting(false)
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Section id='kontakt'>
      <Container>
        <Content>
          <Eyebrow>Kontakt</Eyebrow>

          <Title>
            Lass uns eure Geschichte <span>erzählen</span>
          </Title>

          <Description>
            Bereit, eure Hochzeits-Website zu starten? Füllt das Formular aus
            und wir melden uns innerhalb von 24 Stunden bei euch für ein
            unverbindliches Beratungsgespräch.
          </Description>

          <ContactInfo>
            <ContactItem href='mailto:hello@sarahiver.de'>
              <span>✉</span> hello@sarahiver.de
            </ContactItem>
            <ContactItem href='tel:+4915123456789'>
              <span>☎</span> +49 151 234 567 89
            </ContactItem>
          </ContactInfo>

          <SocialLinks>
            <SocialLink
              href='https://instagram.com/sarahiver.weddings'
              target='_blank'
            >
              Instagram
            </SocialLink>
            <SocialLink href='https://pinterest.com/sarahiver' target='_blank'>
              Pinterest
            </SocialLink>
          </SocialLinks>
        </Content>

        <FormContainer>
          {submitted ? (
            <SuccessMessage>
              <h3>Vielen Dank!</h3>
              <p>
                Wir haben eure Anfrage erhalten und melden uns innerhalb von 24
                Stunden bei euch.
              </p>
            </SuccessMessage>
          ) : (
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Eure Namen</Label>
                <Input
                  type='text'
                  placeholder='Anna & Max'
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>E-Mail</Label>
                <Input
                  type='email'
                  placeholder='hallo@beispiel.de'
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Hochzeitsdatum</Label>
                <Input
                  type='date'
                  value={formData.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <Label>Gewünschtes Paket</Label>
                <Select
                  value={formData.package}
                  onChange={(e) => handleChange("package", e.target.value)}
                >
                  <option value=''>Noch nicht sicher</option>
                  <option value='starter'>Starter (990€)</option>
                  <option value='signature'>Signature (1.800€)</option>
                  <option value='couture'>Couture (2.800€)</option>
                  <option value='bespoke'>Bespoke (ab 3.500€)</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>Eure Nachricht</Label>
                <TextArea
                  placeholder='Erzählt uns von euch und eurer Hochzeit...'
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                />
              </FormGroup>

              <SubmitButton type='submit' disabled={submitting}>
                {submitting ? "Wird gesendet..." : "Anfrage senden"}
              </SubmitButton>
            </Form>
          )}
        </FormContainer>
      </Container>
    </Section>
  )
}

export default ContactSection

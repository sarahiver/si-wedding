// src/components/marketing/ContactSection.js
import { useState } from "react"
import toast from "react-hot-toast"
import styled, { css, keyframes } from "styled-components"
import { useTheme } from "../../context/ThemeContext"
import { createContactRequest } from "../../lib/contact"
import { sendContactNotification } from "../../lib/emailjs"

// ============================================
// KEYFRAME ANIMATIONS
// ============================================

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(0,255,255,0.3); }
  50% { box-shadow: 0 0 40px rgba(0,255,255,0.6); }
`

// ============================================
// STYLED COMPONENTS
// ============================================

const Section = styled.section`
  position: relative;
  padding: 120px 5%;
  overflow: hidden;

  ${(p) =>
    p.$themeId === "editorial" &&
    css`
      background: #ffffff;
    `}
  ${(p) =>
    p.$themeId === "gold" &&
    css`
      background: linear-gradient(180deg, #0d0b08 0%, #1a1510 100%);
    `}
  ${(p) =>
    p.$themeId === "botanical" &&
    css`
      background: #2d3b2d;
    `}
  ${(p) =>
    p.$themeId === "contemporary" &&
    css`
      background: #0d0d0d;
    `}
  ${(p) =>
    p.$themeId === "luxe" &&
    css`
      background: #0a0a0a;
    `}
  ${(p) =>
    p.$themeId === "neon" &&
    css`
      background: linear-gradient(180deg, #0a0a0f 0%, #120a18 100%);
    `}
`

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`

const Eyebrow = styled.div`
  font-size: 0.75rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  margin-bottom: 1.5rem;

  ${(p) =>
    p.$themeId === "editorial" &&
    css`
      color: #666;
      font-family: "Inter", sans-serif;
    `}
  ${(p) =>
    p.$themeId === "gold" &&
    css`
      color: #d4af37;
      font-family: "Montserrat", sans-serif;
    `}
  ${(p) =>
    p.$themeId === "botanical" &&
    css`
      color: #8fbc8f;
      font-family: "Lato", sans-serif;
    `}
  ${(p) =>
    p.$themeId === "contemporary" &&
    css`
      color: #ff6b6b;
      font-family: "Space Grotesk", sans-serif;
    `}
  ${(p) =>
    p.$themeId === "luxe" &&
    css`
      color: #d4af37;
      font-family: "Montserrat", sans-serif;
    `}
  ${(p) =>
    p.$themeId === "neon" &&
    css`
      color: #00ffff;
      font-family: "Space Grotesk", sans-serif;
    `}
`

const Title = styled.h2`
  font-size: clamp(2.5rem, 5vw, 4rem);
  line-height: 1.1;
  margin-bottom: 1.5rem;

  ${(p) =>
    p.$themeId === "editorial" &&
    css`
      font-family: "Instrument Serif", serif;
      color: #000;
    `}
  ${(p) =>
    p.$themeId === "gold" &&
    css`
      font-family: "Cormorant Garamond", serif;
      color: #f5f0e6;
    `}
  ${(p) =>
    p.$themeId === "botanical" &&
    css`
      font-family: "Playfair Display", serif;
      color: #f5f5dc;
    `}
  ${(p) =>
    p.$themeId === "contemporary" &&
    css`
      font-family: "Space Grotesk", sans-serif;
      color: #fff;
      font-weight: 700;
    `}
  ${(p) =>
    p.$themeId === "luxe" &&
    css`
      font-family: "Cormorant Garamond", serif;
      color: #fff;
    `}
  ${(p) =>
    p.$themeId === "neon" &&
    css`
      font-family: "Space Grotesk", sans-serif;
      color: #fff;
      font-weight: 700;
    `}
`

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  max-width: 600px;
  margin: 0 auto;

  ${(p) =>
    p.$themeId === "editorial" &&
    css`
      color: #666;
      font-family: "Inter", sans-serif;
    `}
  ${(p) =>
    p.$themeId === "gold" &&
    css`
      color: rgba(245, 240, 230, 0.7);
      font-family: "Montserrat", sans-serif;
    `}
  ${(p) =>
    p.$themeId === "botanical" &&
    css`
      color: rgba(245, 245, 220, 0.8);
      font-family: "Lato", sans-serif;
    `}
  ${(p) =>
    p.$themeId === "contemporary" &&
    css`
      color: rgba(255, 255, 255, 0.7);
      font-family: "Space Grotesk", sans-serif;
    `}
  ${(p) =>
    p.$themeId === "luxe" &&
    css`
      color: rgba(255, 255, 255, 0.6);
      font-family: "Montserrat", sans-serif;
    `}
  ${(p) =>
    p.$themeId === "neon" &&
    css`
      color: rgba(255, 255, 255, 0.6);
      font-family: "Space Grotesk", sans-serif;
    `}
`

// Form Card
const FormCard = styled.div`
  padding: 3rem;
  position: relative;

  ${(p) =>
    p.$themeId === "editorial" &&
    css`
      background: #fafafa;
      border: 2px solid #000;
    `}
  ${(p) =>
    p.$themeId === "gold" &&
    css`
      background: rgba(212, 175, 55, 0.05);
      border: 1px solid rgba(212, 175, 55, 0.3);
    `}
  ${(p) =>
    p.$themeId === "botanical" &&
    css`
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(143, 188, 143, 0.3);
      border-radius: 20px;
    `}
  ${(p) =>
    p.$themeId === "contemporary" &&
    css`
      background: #1a1a1a;
      border: 3px solid #ff6b6b;
    `}
  ${(p) =>
    p.$themeId === "luxe" &&
    css`
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(212, 175, 55, 0.2);
    `}
  ${(p) =>
    p.$themeId === "neon" &&
    css`
      background: rgba(0, 255, 255, 0.02);
      border: 1px solid rgba(0, 255, 255, 0.3);
      animation: ${glow} 3s ease-in-out infinite;
    `}

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Label = styled.label`
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;

  ${(p) =>
    p.$themeId === "editorial" &&
    css`
      color: #000;
      font-family: "Inter", sans-serif;
    `}
  ${(p) =>
    p.$themeId === "gold" &&
    css`
      color: #d4af37;
      font-family: "Montserrat", sans-serif;
    `}
  ${(p) =>
    p.$themeId === "botanical" &&
    css`
      color: #8fbc8f;
      font-family: "Lato", sans-serif;
    `}
  ${(p) =>
    p.$themeId === "contemporary" &&
    css`
      color: #ff6b6b;
      font-family: "Space Grotesk", sans-serif;
    `}
  ${(p) =>
    p.$themeId === "luxe" &&
    css`
      color: #d4af37;
      font-family: "Montserrat", sans-serif;
    `}
  ${(p) =>
    p.$themeId === "neon" &&
    css`
      color: #00ffff;
      font-family: "Space Grotesk", sans-serif;
    `}
`

const RequiredStar = styled.span`
  color: #e74c3c;
`

const Input = styled.input`
  padding: 1rem;
  font-size: 1rem;
  border: none;
  outline: none;
  transition: all 0.3s ease;

  ${(p) =>
    p.$themeId === "editorial" &&
    css`
      background: #fff;
      border: 2px solid #e0e0e0;
      color: #000;
      font-family: "Inter", sans-serif;
      &:focus {
        border-color: #000;
      }
    `}
  ${(p) =>
    p.$themeId === "gold" &&
    css`
      background: rgba(0, 0, 0, 0.3);
      border: 1px solid rgba(212, 175, 55, 0.3);
      color: #f5f0e6;
      font-family: "Montserrat", sans-serif;
      &:focus {
        border-color: #d4af37;
      }
    `}
  ${(p) =>
    p.$themeId === "botanical" &&
    css`
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(143, 188, 143, 0.3);
      border-radius: 10px;
      color: #f5f5dc;
      font-family: "Lato", sans-serif;
      &:focus {
        border-color: #8fbc8f;
      }
    `}
  ${(p) =>
    p.$themeId === "contemporary" &&
    css`
      background: #0d0d0d;
      border: 2px solid #333;
      color: #fff;
      font-family: "Space Grotesk", sans-serif;
      &:focus {
        border-color: #ff6b6b;
      }
    `}
  ${(p) =>
    p.$themeId === "luxe" &&
    css`
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #fff;
      font-family: "Montserrat", sans-serif;
      &:focus {
        border-color: #d4af37;
      }
    `}
  ${(p) =>
    p.$themeId === "neon" &&
    css`
      background: rgba(0, 0, 0, 0.5);
      border: 1px solid rgba(0, 255, 255, 0.3);
      color: #fff;
      font-family: "Space Grotesk", sans-serif;
      &:focus {
        border-color: #00ffff;
        box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
      }
    `}
`

const Select = styled.select`
  padding: 1rem;
  font-size: 1rem;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease;

  ${(p) =>
    p.$themeId === "editorial" &&
    css`
      background: #fff;
      border: 2px solid #e0e0e0;
      color: #000;
      font-family: "Inter", sans-serif;
      &:focus {
        border-color: #000;
      }
    `}
  ${(p) =>
    p.$themeId === "gold" &&
    css`
      background: rgba(0, 0, 0, 0.3);
      border: 1px solid rgba(212, 175, 55, 0.3);
      color: #f5f0e6;
      font-family: "Montserrat", sans-serif;
      &:focus {
        border-color: #d4af37;
      }
    `}
  ${(p) =>
    p.$themeId === "botanical" &&
    css`
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(143, 188, 143, 0.3);
      border-radius: 10px;
      color: #f5f5dc;
      font-family: "Lato", sans-serif;
      &:focus {
        border-color: #8fbc8f;
      }
    `}
  ${(p) =>
    p.$themeId === "contemporary" &&
    css`
      background: #0d0d0d;
      border: 2px solid #333;
      color: #fff;
      font-family: "Space Grotesk", sans-serif;
      &:focus {
        border-color: #ff6b6b;
      }
    `}
  ${(p) =>
    p.$themeId === "luxe" &&
    css`
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #fff;
      font-family: "Montserrat", sans-serif;
      &:focus {
        border-color: #d4af37;
      }
    `}
  ${(p) =>
    p.$themeId === "neon" &&
    css`
      background: rgba(0, 0, 0, 0.5);
      border: 1px solid rgba(0, 255, 255, 0.3);
      color: #fff;
      font-family: "Space Grotesk", sans-serif;
      &:focus {
        border-color: #00ffff;
      }
    `}

  option {
    background: #1a1a1a;
    color: #fff;
  }
`

const TextArea = styled.textarea`
  padding: 1rem;
  font-size: 1rem;
  border: none;
  outline: none;
  resize: vertical;
  min-height: 120px;
  transition: all 0.3s ease;

  ${(p) =>
    p.$themeId === "editorial" &&
    css`
      background: #fff;
      border: 2px solid #e0e0e0;
      color: #000;
      font-family: "Inter", sans-serif;
      &:focus {
        border-color: #000;
      }
    `}
  ${(p) =>
    p.$themeId === "gold" &&
    css`
      background: rgba(0, 0, 0, 0.3);
      border: 1px solid rgba(212, 175, 55, 0.3);
      color: #f5f0e6;
      font-family: "Montserrat", sans-serif;
      &:focus {
        border-color: #d4af37;
      }
    `}
  ${(p) =>
    p.$themeId === "botanical" &&
    css`
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(143, 188, 143, 0.3);
      border-radius: 10px;
      color: #f5f5dc;
      font-family: "Lato", sans-serif;
      &:focus {
        border-color: #8fbc8f;
      }
    `}
  ${(p) =>
    p.$themeId === "contemporary" &&
    css`
      background: #0d0d0d;
      border: 2px solid #333;
      color: #fff;
      font-family: "Space Grotesk", sans-serif;
      &:focus {
        border-color: #ff6b6b;
      }
    `}
  ${(p) =>
    p.$themeId === "luxe" &&
    css`
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #fff;
      font-family: "Montserrat", sans-serif;
      &:focus {
        border-color: #d4af37;
      }
    `}
  ${(p) =>
    p.$themeId === "neon" &&
    css`
      background: rgba(0, 0, 0, 0.5);
      border: 1px solid rgba(0, 255, 255, 0.3);
      color: #fff;
      font-family: "Space Grotesk", sans-serif;
      &:focus {
        border-color: #00ffff;
      }
    `}
`

const SubmitButton = styled.button`
  padding: 1.2rem 2rem;
  font-size: 0.85rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${(p) =>
    p.$themeId === "editorial" &&
    css`
      background: #000;
      color: #fff;
      font-family: "Inter", sans-serif;
      &:hover:not(:disabled) {
        background: #333;
      }
    `}
  ${(p) =>
    p.$themeId === "gold" &&
    css`
      background: linear-gradient(
        135deg,
        #d4af37 0%,
        #f5e6a3 50%,
        #d4af37 100%
      );
      background-size: 200% auto;
      color: #000;
      font-family: "Montserrat", sans-serif;
      &:hover:not(:disabled) {
        background-position: right center;
      }
    `}
  ${(p) =>
    p.$themeId === "botanical" &&
    css`
      background: #8fbc8f;
      color: #1a2e1a;
      border-radius: 30px;
      font-family: "Lato", sans-serif;
      &:hover:not(:disabled) {
        background: #7cac7c;
        transform: translateY(-2px);
      }
    `}
  ${(p) =>
    p.$themeId === "contemporary" &&
    css`
      background: #ff6b6b;
      color: #000;
      font-family: "Space Grotesk", sans-serif;
      &:hover:not(:disabled) {
        background: #ff8585;
        transform: translateY(-2px);
      }
    `}
  ${(p) =>
    p.$themeId === "luxe" &&
    css`
      background: transparent;
      border: 1px solid #d4af37;
      color: #d4af37;
      font-family: "Montserrat", sans-serif;
      &:hover:not(:disabled) {
        background: #d4af37;
        color: #000;
      }
    `}
  ${(p) =>
    p.$themeId === "neon" &&
    css`
      background: transparent;
      border: 2px solid #00ffff;
      color: #00ffff;
      font-family: "Space Grotesk", sans-serif;
      &:hover:not(:disabled) {
        background: #00ffff;
        color: #000;
        box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
      }
    `}
`

const SuccessMessage = styled.div`
  text-align: center;
  padding: 3rem;

  ${(p) =>
    p.$themeId === "editorial" &&
    css`
      color: #000;
    `}
  ${(p) =>
    p.$themeId === "gold" &&
    css`
      color: #d4af37;
    `}
  ${(p) =>
    p.$themeId === "botanical" &&
    css`
      color: #8fbc8f;
    `}
  ${(p) =>
    p.$themeId === "contemporary" &&
    css`
      color: #ff6b6b;
    `}
  ${(p) =>
    p.$themeId === "luxe" &&
    css`
      color: #d4af37;
    `}
  ${(p) =>
    p.$themeId === "neon" &&
    css`
      color: #00ffff;
    `}
`

const SuccessIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1.5rem;
  animation: ${float} 3s ease-in-out infinite;
`

const SuccessTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 1rem;

  ${(p) =>
    p.$themeId === "editorial" &&
    css`
      font-family: "Instrument Serif", serif;
    `}
  ${(p) =>
    p.$themeId === "gold" &&
    css`
      font-family: "Cormorant Garamond", serif;
    `}
  ${(p) =>
    p.$themeId === "botanical" &&
    css`
      font-family: "Playfair Display", serif;
    `}
  ${(p) =>
    p.$themeId === "contemporary" &&
    css`
      font-family: "Space Grotesk", sans-serif;
    `}
  ${(p) =>
    p.$themeId === "luxe" &&
    css`
      font-family: "Cormorant Garamond", serif;
    `}
  ${(p) =>
    p.$themeId === "neon" &&
    css`
      font-family: "Space Grotesk", sans-serif;
    `}
`

const SuccessText = styled.p`
  font-size: 1rem;
  opacity: 0.8;
`

// ============================================
// COMPONENT
// ============================================

function ContactSection() {
  const { currentTheme } = useTheme()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    weddingDate: "",
    guestCount: "",
    interestedTheme: "",
    interestedPackage: "",
    message: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validierung
    if (!formData.name || !formData.email || !formData.weddingDate) {
      toast.error("Bitte alle Pflichtfelder ausfüllen")
      return
    }

    // Email validieren
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast.error("Bitte eine gültige E-Mail-Adresse eingeben")
      return
    }

    setIsSubmitting(true)

    try {
      const { error } = await createContactRequest({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        weddingDate: formData.weddingDate,
        guestCount: formData.guestCount,
        interestedTheme: formData.interestedTheme,
        interestedPackage: formData.interestedPackage,
        message: formData.message,
        source: "website",
      })

      if (error) throw new Error(error)

      // E-Mail-Benachrichtigung senden (im Hintergrund, blockiert nicht)
      sendContactNotification(formData).catch(console.error)

      setIsSuccess(true)
      toast.success("Anfrage gesendet! Wir melden uns innerhalb von 24h. 💌")

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        weddingDate: "",
        guestCount: "",
        interestedTheme: "",
        interestedPackage: "",
        message: "",
      })
    } catch (error) {
      console.error("Submit error:", error)
      toast.error("Fehler beim Senden. Bitte versucht es erneut.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Section id='kontakt' $themeId={currentTheme}>
      <Container>
        <Header>
          <Eyebrow $themeId={currentTheme}>
            {currentTheme === "neon" ? "// KONTAKT" : "Kontakt"}
          </Eyebrow>
          <Title $themeId={currentTheme}>
            {currentTheme === "editorial" && "Erzählt uns von eurer Hochzeit."}
            {currentTheme === "gold" && "Wir freuen uns auf eure Geschichte"}
            {currentTheme === "botanical" && "Erzählt uns von eurer Hochzeit"}
            {currentTheme === "contemporary" &&
              "LET'S CREATE SOMETHING SPECIAL"}
            {currentTheme === "luxe" && "Persönliche Beratung anfragen"}
            {currentTheme === "neon" && "START YOUR PROJECT"}
          </Title>
          <Description $themeId={currentTheme}>
            Jede Hochzeit ist einzigartig – genau wie eure Website. Füllt das
            Formular aus und wir melden uns innerhalb von 24 Stunden für ein
            kostenloses Beratungsgespräch.
          </Description>
        </Header>

        <FormCard $themeId={currentTheme}>
          {isSuccess ? (
            <SuccessMessage $themeId={currentTheme}>
              <SuccessIcon>💌</SuccessIcon>
              <SuccessTitle $themeId={currentTheme}>
                Anfrage erhalten!
              </SuccessTitle>
              <SuccessText>
                Wir melden uns innerhalb von 24 Stunden bei euch, um einen
                Termin für ein kostenloses Beratungsgespräch zu vereinbaren.
              </SuccessText>
            </SuccessMessage>
          ) : (
            <Form onSubmit={handleSubmit}>
              {/* Namen */}
              <FormRow>
                <FormGroup>
                  <Label $themeId={currentTheme}>
                    Eure Namen <RequiredStar>*</RequiredStar>
                  </Label>
                  <Input
                    $themeId={currentTheme}
                    type='text'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    placeholder='z.B. Sarah & Max'
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label $themeId={currentTheme}>
                    E-Mail <RequiredStar>*</RequiredStar>
                  </Label>
                  <Input
                    $themeId={currentTheme}
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='eure@email.de'
                    required
                  />
                </FormGroup>
              </FormRow>

              {/* Hochzeitsdatum & Telefon */}
              <FormRow>
                <FormGroup>
                  <Label $themeId={currentTheme}>
                    Hochzeitsdatum <RequiredStar>*</RequiredStar>
                  </Label>
                  <Input
                    $themeId={currentTheme}
                    type='date'
                    name='weddingDate'
                    value={formData.weddingDate}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label $themeId={currentTheme}>Telefon (optional)</Label>
                  <Input
                    $themeId={currentTheme}
                    type='tel'
                    name='phone'
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder='+49 ...'
                  />
                </FormGroup>
              </FormRow>

              {/* Gästeanzahl */}
              <FormGroup>
                <Label $themeId={currentTheme}>Gästeanzahl (optional)</Label>
                <Select
                  $themeId={currentTheme}
                  name='guestCount'
                  value={formData.guestCount}
                  onChange={handleChange}
                >
                  <option value=''>Bitte wählen...</option>
                  <option value='unter-50'>Unter 50 Gäste</option>
                  <option value='50-100'>50 - 100 Gäste</option>
                  <option value='100-150'>100 - 150 Gäste</option>
                  <option value='150-200'>150 - 200 Gäste</option>
                  <option value='ueber-200'>Über 200 Gäste</option>
                </Select>
              </FormGroup>

              {/* Theme & Paket Interesse */}
              <FormRow>
                <FormGroup>
                  <Label $themeId={currentTheme}>Design-Stil (optional)</Label>
                  <Select
                    $themeId={currentTheme}
                    name='interestedTheme'
                    value={formData.interestedTheme}
                    onChange={handleChange}
                  >
                    <option value=''>Weiß ich noch nicht</option>
                    <option value='editorial'>
                      Editorial – Minimalistisch
                    </option>
                    <option value='gold'>Gold – Klassisch Elegant</option>
                    <option value='botanical'>Botanical – Natürlich</option>
                    <option value='contemporary'>
                      Contemporary – Modern Bold
                    </option>
                    <option value='luxe'>Luxe – Zeitlos Edel</option>
                    <option value='neon'>Neon – Ausgefallen</option>
                  </Select>
                </FormGroup>
                <FormGroup>
                  <Label $themeId={currentTheme}>Paket (optional)</Label>
                  <Select
                    $themeId={currentTheme}
                    name='interestedPackage'
                    value={formData.interestedPackage}
                    onChange={handleChange}
                  >
                    <option value=''>Weiß ich noch nicht</option>
                    <option value='essential'>Essential – ab 1.890€</option>
                    <option value='premium'>Premium – ab 2.490€</option>
                    <option value='luxe'>Luxe – ab 3.290€</option>
                    <option value='individual'>Individual – auf Anfrage</option>
                  </Select>
                </FormGroup>
              </FormRow>

              {/* Nachricht */}
              <FormGroup>
                <Label $themeId={currentTheme}>
                  Erzählt uns mehr (optional)
                </Label>
                <TextArea
                  $themeId={currentTheme}
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  placeholder='Wie habt ihr euch kennengelernt? Was ist euch bei eurer Website wichtig? Habt ihr besondere Wünsche?'
                />
              </FormGroup>

              <SubmitButton
                $themeId={currentTheme}
                type='submit'
                disabled={isSubmitting}
              >
                {isSubmitting ? "Wird gesendet..." : "Beratung anfragen"}
              </SubmitButton>
            </Form>
          )}
        </FormCard>
      </Container>
    </Section>
  )
}

export default ContactSection

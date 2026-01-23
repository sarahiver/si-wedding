// src/components/marketing/ContactSection.js
import React, { useEffect, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
`;

const Section = styled.section`
  padding: 100px 20px;
  overflow: hidden;
  @media (min-width: 600px) { padding: 140px 5%; }
  ${p => p.$themeId === 'video' && css`background: #FAF8F5;`}
  ${p => p.$themeId === 'editorial' && css`background: #FAFAFA;`}
  ${p => p.$themeId === 'botanical' && css`background: #F5F1EB;`}
  ${p => p.$themeId === 'contemporary' && css`background: #FAFAFA;`}
  ${p => p.$themeId === 'luxe' && css`background: #FAF9F7;`}
  ${p => p.$themeId === 'neon' && css`background: #0a0a0f;`}
`;

const Container = styled.div`max-width: 900px; margin: 0 auto; width: 100%;`;

const Header = styled.div`
  text-align: center; margin-bottom: 50px;
  opacity: ${p => p.$visible ? 1 : 0}; transform: translateY(${p => p.$visible ? 0 : '30px'}); transition: all 0.8s ease;
  @media (min-width: 600px) { margin-bottom: 60px; }
`;

const Eyebrow = styled.span`
  display: block; font-size: 0.7rem; font-weight: 500; letter-spacing: 0.3em; text-transform: uppercase; margin-bottom: 20px;
  ${p => p.$themeId === 'video' && css`font-family: 'Inter', sans-serif; color: #B8976A;`}
  ${p => p.$themeId === 'editorial' && css`font-family: 'Inter', sans-serif; color: #999;`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Lato', sans-serif; color: #8B9D83;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #FF6B6B;`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Montserrat', sans-serif; color: #D4AF37;`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: #00ffff;`}
`;

const Title = styled.h2`
  font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 300; margin-bottom: 15px;
  ${p => p.$themeId === 'video' && css`font-family: 'Cormorant Garamond', Georgia, serif; color: #1A1A1A;`}
  ${p => p.$themeId === 'editorial' && css`font-family: 'Instrument Serif', Georgia, serif; color: #1A1A1A;`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Playfair Display', Georgia, serif; color: #2D3B2D;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #0D0D0D; font-weight: 700;`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Cormorant Garamond', Georgia, serif; color: #2A2A2A; font-style: italic;`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: #ffffff; font-weight: 700;`}
`;

const Subtitle = styled.p`
  font-size: 1rem; max-width: 500px; margin: 0 auto; line-height: 1.7;
  ${p => p.$themeId === 'video' && css`font-family: 'Montserrat', sans-serif; color: rgba(26,26,26,0.6);`}
  ${p => p.$themeId === 'editorial' && css`font-family: 'Inter', sans-serif; color: #666;`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Lato', sans-serif; color: #6B7B6C;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #666;`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Montserrat', sans-serif; color: rgba(42,42,42,0.6);`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: rgba(255,255,255,0.5);`}
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 50px;
  @media (min-width: 768px) { grid-template-columns: 1fr 1fr; gap: 60px; }
`;

// Contact Options (Left Side)
const ContactOptions = styled.div`
  opacity: ${p => p.$visible ? 1 : 0}; 
  transform: translateY(${p => p.$visible ? 0 : '30px'}); 
  transition: all 0.8s ease 0.1s;
`;

const ContactCard = styled.a`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 25px;
  margin-bottom: 20px;
  text-decoration: none;
  transition: all 0.3s ease;
  
  ${p => p.$themeId === 'video' && css`
    background: #FFFFFF; border: 1px solid rgba(184,151,106,0.15);
    &:hover { border-color: #B8976A; transform: translateX(5px); }
  `}
  ${p => p.$themeId === 'editorial' && css`
    background: #FFFFFF; border: 1px solid #E0E0E0;
    &:hover { border-color: #1A1A1A; transform: translateX(5px); }
  `}
  ${p => p.$themeId === 'botanical' && css`
    background: #FFFFFF; border: 1px solid rgba(139,157,131,0.2); border-radius: 16px;
    &:hover { border-color: #8B9D83; transform: translateX(5px); }
  `}
  ${p => p.$themeId === 'contemporary' && css`
    background: #FFFFFF; border: 3px solid #0D0D0D;
    &:hover { box-shadow: 5px 5px 0 #FF6B6B; transform: translate(-3px, -3px); }
  `}
  ${p => p.$themeId === 'luxe' && css`
    background: #FFFFFF; border: 1px solid rgba(212,175,55,0.15);
    &:hover { border-color: #D4AF37; transform: translateX(5px); }
  `}
  ${p => p.$themeId === 'neon' && css`
    background: rgba(255,255,255,0.02); border: 1px solid rgba(0,255,255,0.2);
    &:hover { border-color: #00ffff; box-shadow: 0 0 20px rgba(0,255,255,0.15); transform: translateX(5px); }
  `}
`;

const ContactIcon = styled.div`
  font-size: 1.8rem;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  ${p => p.$themeId === 'video' && css`background: rgba(184,151,106,0.1); color: #B8976A;`}
  ${p => p.$themeId === 'editorial' && css`background: #F5F5F5; color: #1A1A1A;`}
  ${p => p.$themeId === 'botanical' && css`background: rgba(139,157,131,0.1); color: #7A9972; border-radius: 12px;`}
  ${p => p.$themeId === 'contemporary' && css`background: #FF6B6B; color: #FFF;`}
  ${p => p.$themeId === 'luxe' && css`background: rgba(212,175,55,0.1); color: #D4AF37;`}
  ${p => p.$themeId === 'neon' && css`background: rgba(0,255,255,0.1); color: #00ffff;`}
`;

const ContactInfo = styled.div`flex: 1;`;

const ContactLabel = styled.div`
  font-size: 0.7rem; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 5px;
  ${p => p.$themeId === 'video' && css`font-family: 'Inter', sans-serif; color: rgba(26,26,26,0.5);`}
  ${p => p.$themeId === 'editorial' && css`font-family: 'Inter', sans-serif; color: #999;`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Lato', sans-serif; color: #7D9D7C;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #999;`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Montserrat', sans-serif; color: rgba(42,42,42,0.5);`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: rgba(255,255,255,0.4);`}
`;

const ContactValue = styled.div`
  font-size: 1rem;
  ${p => p.$themeId === 'video' && css`font-family: 'Inter', sans-serif; color: #1A1A1A;`}
  ${p => p.$themeId === 'editorial' && css`font-family: 'Inter', sans-serif; color: #1A1A1A;`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Lato', sans-serif; color: #2D3B2D;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #0D0D0D; font-weight: 600;`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Montserrat', sans-serif; color: #2A2A2A;`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: #ffffff;`}
`;

// Quick Form (Right Side)
const QuickForm = styled.form`
  opacity: ${p => p.$visible ? 1 : 0}; 
  transform: translateY(${p => p.$visible ? 0 : '30px'}); 
  transition: all 0.8s ease 0.2s;
`;

const FormTitle = styled.h3`
  font-size: 1.3rem; margin-bottom: 25px;
  ${p => p.$themeId === 'video' && css`font-family: 'Cormorant Garamond', Georgia, serif; color: #1A1A1A;`}
  ${p => p.$themeId === 'editorial' && css`font-family: 'Instrument Serif', Georgia, serif; color: #1A1A1A;`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Playfair Display', Georgia, serif; color: #2D3B2D;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #0D0D0D; font-weight: 700;`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Cormorant Garamond', Georgia, serif; color: #2A2A2A;`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: #ffffff; font-weight: 600;`}
`;

const Field = styled.div`margin-bottom: 20px;`;

const Label = styled.label`
  display: block; font-size: 0.7rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 8px;
  ${p => p.$themeId === 'video' && css`font-family: 'Inter', sans-serif; color: rgba(26,26,26,0.6);`}
  ${p => p.$themeId === 'editorial' && css`font-family: 'Inter', sans-serif; color: #666;`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Lato', sans-serif; color: #5A6B5A;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #666;`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Montserrat', sans-serif; color: rgba(42,42,42,0.6);`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: rgba(255,255,255,0.5);`}
`;

const inputStyles = css`
  padding: 16px 18px; font-size: 1rem; transition: all 0.3s ease; width: 100%;
  ${p => p.$themeId === 'video' && css`
    font-family: 'Inter', sans-serif; background: #FFFFFF; color: #1A1A1A;
    border: 1px solid rgba(184,151,106,0.2);
    &:focus { outline: none; border-color: #B8976A; }
  `}
  ${p => p.$themeId === 'editorial' && css`
    font-family: 'Inter', sans-serif; background: #FFFFFF; color: #1A1A1A; border: 1px solid #E0E0E0;
    &:focus { outline: none; border-color: #1A1A1A; }
  `}
  ${p => p.$themeId === 'botanical' && css`
    font-family: 'Lato', sans-serif; background: #FFFFFF; color: #2D3B2D;
    border: 1px solid rgba(139,157,131,0.3); border-radius: 12px;
    &:focus { outline: none; border-color: #8B9D83; }
  `}
  ${p => p.$themeId === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif; background: #FFFFFF; color: #0D0D0D; border: 3px solid #0D0D0D;
    &:focus { outline: none; box-shadow: 4px 4px 0 #FF6B6B; }
  `}
  ${p => p.$themeId === 'luxe' && css`
    font-family: 'Montserrat', sans-serif; background: #FFFFFF; color: #2A2A2A;
    border: 1px solid rgba(212,175,55,0.2);
    &:focus { outline: none; border-color: #D4AF37; }
  `}
  ${p => p.$themeId === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif; background: rgba(255,255,255,0.05); color: #ffffff;
    border: 1px solid rgba(0,255,255,0.3);
    &:focus { outline: none; border-color: #00ffff; box-shadow: 0 0 15px rgba(0,255,255,0.2); }
  `}
  ${p => p.$error && css`border-color: #FF6B6B !important;`}
`;

const Input = styled.input`${inputStyles}`;
const Textarea = styled.textarea`${inputStyles} min-height: 100px; resize: vertical;`;
const ErrorText = styled.span`font-size: 0.7rem; color: #FF6B6B; margin-top: 5px; display: block;`;

const SubmitButton = styled.button`
  width: 100%; padding: 18px 30px; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase;
  cursor: pointer; transition: all 0.3s ease; border: none;
  ${p => p.$themeId === 'video' && css`font-family: 'Inter', sans-serif; background: #B8976A; color: #0a0a0a; &:hover { background: #D4AF37; }`}
  ${p => p.$themeId === 'editorial' && css`font-family: 'Inter', sans-serif; background: #1A1A1A; color: #FFFFFF; &:hover { background: #333; }`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Lato', sans-serif; background: #8B9D83; color: #FFFFFF; border-radius: 30px; &:hover { background: #6B7D63; }`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; background: #FF6B6B; color: #FFFFFF; &:hover { background: #E85555; }`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Montserrat', sans-serif; background: #D4AF37; color: #0a0a0a; &:hover { background: #F4D03F; }`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; background: #00ffff; color: #0a0a0f; box-shadow: 0 0 20px rgba(0,255,255,0.3); &:hover { box-shadow: 0 0 30px rgba(0,255,255,0.5); }`}
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

const SuccessMessage = styled.div`
  text-align: center; padding: 50px 30px;
  ${p => p.$themeId === 'video' && css`background: rgba(184,151,106,0.1); border: 1px solid rgba(184,151,106,0.3);`}
  ${p => p.$themeId === 'editorial' && css`background: #F5F5F5; border: 1px solid #E0E0E0;`}
  ${p => p.$themeId === 'botanical' && css`background: rgba(139,157,131,0.1); border: 1px solid rgba(139,157,131,0.2); border-radius: 16px;`}
  ${p => p.$themeId === 'contemporary' && css`background: #FFFFFF; border: 3px solid #0D0D0D;`}
  ${p => p.$themeId === 'luxe' && css`background: rgba(212,175,55,0.05); border: 1px solid rgba(212,175,55,0.2);`}
  ${p => p.$themeId === 'neon' && css`background: rgba(0,255,255,0.05); border: 1px solid rgba(0,255,255,0.3);`}
  h3 { font-size: 1.8rem; margin-bottom: 10px; }
  p { font-size: 0.95rem; opacity: 0.7; }
`;

function ContactSection() {
  const { currentTheme } = useTheme();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '', email: '', message: ''
  });

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Bitte Name eingeben';
    if (!formData.email) newErrors.email = 'Bitte E-Mail eingeben';
    if (!formData.message) newErrors.message = 'Bitte Nachricht eingeben';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Section $themeId={currentTheme} id="contact">
        <Container>
          <SuccessMessage $themeId={currentTheme}>
            <h3>Vielen Dank! 💕</h3>
            <p>Wir melden uns innerhalb von 24 Stunden bei euch.</p>
          </SuccessMessage>
        </Container>
      </Section>
    );
  }

  return (
    <Section ref={sectionRef} $themeId={currentTheme} id="contact">
      <Container>
        <Header $visible={isVisible}>
          <Eyebrow $themeId={currentTheme}>— Kontakt —</Eyebrow>
          <Title $themeId={currentTheme}>Lasst uns sprechen</Title>
          <Subtitle $themeId={currentTheme}>
            Schreibt uns direkt oder nutzt das Formular - wir freuen uns auf eure Geschichte!
          </Subtitle>
        </Header>
        
        <ContentGrid>
          {/* Contact Options */}
          <ContactOptions $visible={isVisible}>
            <ContactCard href="mailto:wedding@sarahiver.de" $themeId={currentTheme}>
              <ContactIcon $themeId={currentTheme}>✉️</ContactIcon>
              <ContactInfo>
                <ContactLabel $themeId={currentTheme}>E-Mail</ContactLabel>
                <ContactValue $themeId={currentTheme}>wedding@sarahiver.de</ContactValue>
              </ContactInfo>
            </ContactCard>
            
            <ContactCard href="https://instagram.com/sarah.iver.wedding" target="_blank" rel="noopener noreferrer" $themeId={currentTheme}>
              <ContactIcon $themeId={currentTheme}>📷</ContactIcon>
              <ContactInfo>
                <ContactLabel $themeId={currentTheme}>Instagram</ContactLabel>
                <ContactValue $themeId={currentTheme}>@sarah.iver.wedding</ContactValue>
              </ContactInfo>
            </ContactCard>
            
            <ContactCard href="https://pinterest.de/sandiwedding" target="_blank" rel="noopener noreferrer" $themeId={currentTheme}>
              <ContactIcon $themeId={currentTheme}>📌</ContactIcon>
              <ContactInfo>
                <ContactLabel $themeId={currentTheme}>Pinterest</ContactLabel>
                <ContactValue $themeId={currentTheme}>S&I Wedding</ContactValue>
              </ContactInfo>
            </ContactCard>
          </ContactOptions>
          
          {/* Quick Form */}
          <QuickForm $visible={isVisible} onSubmit={handleSubmit}>
            <FormTitle $themeId={currentTheme}>Schnelle Anfrage</FormTitle>
            
            <Field>
              <Label $themeId={currentTheme}>Euer Name *</Label>
              <Input 
                $themeId={currentTheme} 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                $error={errors.name} 
                placeholder="Anna & Max" 
              />
              {errors.name && <ErrorText>{errors.name}</ErrorText>}
            </Field>
            
            <Field>
              <Label $themeId={currentTheme}>E-Mail *</Label>
              <Input 
                $themeId={currentTheme} 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                $error={errors.email} 
                placeholder="eure@email.de" 
              />
              {errors.email && <ErrorText>{errors.email}</ErrorText>}
            </Field>
            
            <Field>
              <Label $themeId={currentTheme}>Eure Nachricht *</Label>
              <Textarea 
                $themeId={currentTheme} 
                name="message" 
                value={formData.message} 
                onChange={handleChange}
                $error={errors.message}
                placeholder="Wann ist eure Hochzeit? Welches Paket interessiert euch?" 
              />
              {errors.message && <ErrorText>{errors.message}</ErrorText>}
            </Field>
            
            <SubmitButton type="submit" $themeId={currentTheme}>Nachricht senden</SubmitButton>
          </QuickForm>
        </ContentGrid>
      </Container>
    </Section>
  );
}

export default ContactSection;

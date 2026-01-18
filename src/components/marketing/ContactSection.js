// src/components/marketing/ContactSection.js
import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

const Section = styled.section`
  padding: 140px 5%;
  position: relative;
  overflow: hidden;
  
  ${p => p.$themeId === 'editorial' && css`background: #FFFFFF;`}
  ${p => p.$themeId === 'gold' && css`
    background: #0A0A0A;
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse at 50% 100%, rgba(212,175,55,0.05) 0%, transparent 50%);
    }
  `}
  ${p => p.$themeId === 'botanical' && css`background: #FFFFFF;`}
  ${p => p.$themeId === 'contemporary' && css`background: #FFFFFF;`}
  ${p => p.$themeId === 'luxe' && css`background: #0A0A0A;`}
  ${p => p.$themeId === 'neon' && css`
    background: #0a0a0f;
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at 50% 50%, rgba(255,0,255,0.03) 0%, transparent 40%);
    }
  `}
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const Grid = styled.div`
  display: grid;
  gap: 80px;
  
  ${p => p.$themeId === 'editorial' && css`
    grid-template-columns: 1fr 1fr;
    @media (max-width: 768px) { grid-template-columns: 1fr; }
  `}
  ${p => p.$themeId === 'gold' && css`
    grid-template-columns: 1fr;
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
  `}
  ${p => p.$themeId === 'botanical' && css`
    grid-template-columns: 1fr 1fr;
    @media (max-width: 768px) { grid-template-columns: 1fr; }
  `}
  ${p => p.$themeId === 'contemporary' && css`
    grid-template-columns: 1fr;
  `}
  ${p => p.$themeId === 'luxe' && css`
    grid-template-columns: 1fr;
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
  `}
  ${p => p.$themeId === 'neon' && css`
    grid-template-columns: 1fr 1fr;
    @media (max-width: 768px) { grid-template-columns: 1fr; }
  `}
`;

const Content = styled.div`
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '40px'});
  transition: all 0.9s cubic-bezier(0.16, 1, 0.3, 1);
`;

const Eyebrow = styled.span`
  display: inline-block;
  margin-bottom: 1rem;
  
  ${p => p.$themeId === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #999;
  `}
  ${p => p.$themeId === 'gold' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.75rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: #D4AF37;
  `}
  ${p => p.$themeId === 'botanical' && css`
    font-family: 'Lato', sans-serif;
    font-size: 0.8rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #8B9D83;
  `}
  ${p => p.$themeId === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.8rem;
    font-weight: 700;
    color: #FF6B6B;
    &::before { content: '→ '; }
  `}
  ${p => p.$themeId === 'luxe' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.7rem;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: rgba(212,175,55,0.5);
  `}
  ${p => p.$themeId === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #00ffff;
    text-shadow: 0 0 10px rgba(0,255,255,0.5);
  `}
`;

const Title = styled.h2`
  margin: 0 0 1.5rem 0;
  
  ${p => p.$themeId === 'editorial' && css`
    font-family: 'Instrument Serif', Georgia, serif;
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 400;
    font-style: italic;
    color: #1A1A1A;
  `}
  ${p => p.$themeId === 'gold' && css`
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 300;
    color: #FFFFFF;
  `}
  ${p => p.$themeId === 'botanical' && css`
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 400;
    color: #2D3B2D;
  `}
  ${p => p.$themeId === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(3rem, 7vw, 5rem);
    font-weight: 700;
    color: #0D0D0D;
    text-transform: uppercase;
    line-height: 0.9;
  `}
  ${p => p.$themeId === 'luxe' && css`
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 300;
    font-style: italic;
    color: #E8DDD4;
  `}
  ${p => p.$themeId === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 700;
    color: #FFFFFF;
  `}
`;

const Description = styled.p`
  line-height: 1.8;
  margin: 0 0 2rem 0;
  
  ${p => p.$themeId === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
    color: #666;
  `}
  ${p => p.$themeId === 'gold' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 1rem;
    color: rgba(255,255,255,0.6);
  `}
  ${p => p.$themeId === 'botanical' && css`
    font-family: 'Lato', sans-serif;
    font-size: 1.05rem;
    color: #5A6B5A;
  `}
  ${p => p.$themeId === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.1rem;
    color: #666;
  `}
  ${p => p.$themeId === 'luxe' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 1rem;
    color: rgba(255,255,255,0.5);
  `}
  ${p => p.$themeId === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1rem;
    color: rgba(255,255,255,0.6);
  `}
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ContactItem = styled.a`
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 15px;
  transition: all 0.3s ease;
  
  ${p => p.$themeId === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
    color: #1A1A1A;
    &:hover { color: #666; }
  `}
  ${p => p.$themeId === 'gold' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 1rem;
    color: #FFFFFF;
    justify-content: center;
    &:hover { color: #D4AF37; }
  `}
  ${p => p.$themeId === 'botanical' && css`
    font-family: 'Lato', sans-serif;
    font-size: 1rem;
    color: #2D3B2D;
    &:hover { color: #8B9D83; }
  `}
  ${p => p.$themeId === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.1rem;
    font-weight: 600;
    color: #0D0D0D;
    &:hover { color: #FF6B6B; }
  `}
  ${p => p.$themeId === 'luxe' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 1rem;
    color: rgba(255,255,255,0.7);
    justify-content: center;
    &:hover { color: #D4AF37; }
  `}
  ${p => p.$themeId === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1rem;
    color: rgba(255,255,255,0.7);
    &:hover { 
      color: #00ffff;
      text-shadow: 0 0 10px rgba(0,255,255,0.5);
    }
  `}
`;

const Icon = styled.span`
  font-size: 1.2rem;
`;

const FormWrapper = styled.div`
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '40px'});
  transition: all 0.9s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: 0.2s;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  
  ${p => p.$themeId === 'contemporary' && css`
    flex-direction: row;
    flex-wrap: wrap;
    gap: 15px;
  `}
`;

const Input = styled.input`
  width: 100%;
  padding: 18px 20px;
  border: none;
  outline: none;
  transition: all 0.3s ease;
  
  ${p => p.$themeId === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
    background: #F5F5F5;
    color: #1A1A1A;
    &:focus { background: #EEEEEE; }
    &::placeholder { color: #999; }
  `}
  ${p => p.$themeId === 'gold' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.9rem;
    background: rgba(212,175,55,0.05);
    border: 1px solid rgba(212,175,55,0.2);
    color: #FFFFFF;
    &:focus { border-color: #D4AF37; }
    &::placeholder { color: rgba(255,255,255,0.4); }
  `}
  ${p => p.$themeId === 'botanical' && css`
    font-family: 'Lato', sans-serif;
    font-size: 1rem;
    background: #F5F1EB;
    border-radius: 10px;
    color: #2D3B2D;
    &:focus { box-shadow: 0 0 0 2px #8B9D83; }
    &::placeholder { color: #8B9D83; }
  `}
  ${p => p.$themeId === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1rem;
    background: #FFFFFF;
    border: 2px solid #0D0D0D;
    color: #0D0D0D;
    flex: 1;
    min-width: 200px;
    &:focus { background: #F5F5F5; }
    &::placeholder { color: #999; }
  `}
  ${p => p.$themeId === 'luxe' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.9rem;
    background: transparent;
    border: 1px solid rgba(212,175,55,0.2);
    color: #FFFFFF;
    &:focus { border-color: rgba(212,175,55,0.5); }
    &::placeholder { color: rgba(255,255,255,0.3); }
  `}
  ${p => p.$themeId === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1rem;
    background: rgba(0,255,255,0.02);
    border: 1px solid rgba(0,255,255,0.2);
    color: #FFFFFF;
    &:focus { 
      border-color: rgba(0,255,255,0.5);
      box-shadow: 0 0 15px rgba(0,255,255,0.1);
    }
    &::placeholder { color: rgba(255,255,255,0.4); }
  `}
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 18px 20px;
  border: none;
  outline: none;
  resize: vertical;
  min-height: 150px;
  transition: all 0.3s ease;
  
  ${p => p.$themeId === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
    background: #F5F5F5;
    color: #1A1A1A;
    &:focus { background: #EEEEEE; }
    &::placeholder { color: #999; }
  `}
  ${p => p.$themeId === 'gold' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.9rem;
    background: rgba(212,175,55,0.05);
    border: 1px solid rgba(212,175,55,0.2);
    color: #FFFFFF;
    &:focus { border-color: #D4AF37; }
    &::placeholder { color: rgba(255,255,255,0.4); }
  `}
  ${p => p.$themeId === 'botanical' && css`
    font-family: 'Lato', sans-serif;
    font-size: 1rem;
    background: #F5F1EB;
    border-radius: 10px;
    color: #2D3B2D;
    &:focus { box-shadow: 0 0 0 2px #8B9D83; }
    &::placeholder { color: #8B9D83; }
  `}
  ${p => p.$themeId === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1rem;
    background: #FFFFFF;
    border: 2px solid #0D0D0D;
    color: #0D0D0D;
    width: 100%;
    &:focus { background: #F5F5F5; }
    &::placeholder { color: #999; }
  `}
  ${p => p.$themeId === 'luxe' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.9rem;
    background: transparent;
    border: 1px solid rgba(212,175,55,0.2);
    color: #FFFFFF;
    &:focus { border-color: rgba(212,175,55,0.5); }
    &::placeholder { color: rgba(255,255,255,0.3); }
  `}
  ${p => p.$themeId === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1rem;
    background: rgba(0,255,255,0.02);
    border: 1px solid rgba(0,255,255,0.2);
    color: #FFFFFF;
    &:focus { 
      border-color: rgba(0,255,255,0.5);
      box-shadow: 0 0 15px rgba(0,255,255,0.1);
    }
    &::placeholder { color: rgba(255,255,255,0.4); }
  `}
`;

const SubmitButton = styled.button`
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
  
  ${p => p.$themeId === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    color: #FFFFFF;
    background: #1A1A1A;
    padding: 18px 40px;
    align-self: flex-start;
    &:hover { background: #333; transform: translateY(-2px); }
  `}
  ${p => p.$themeId === 'gold' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #0A0A0A;
    background: linear-gradient(135deg, #D4AF37, #F4D03F);
    padding: 18px 45px;
    &:hover { box-shadow: 0 10px 30px rgba(212,175,55,0.3); transform: translateY(-2px); }
  `}
  ${p => p.$themeId === 'botanical' && css`
    font-family: 'Lato', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: #FFFFFF;
    background: #8B9D83;
    padding: 18px 40px;
    border-radius: 30px;
    align-self: flex-start;
    &:hover { background: #7A8C73; transform: translateY(-2px); }
  `}
  ${p => p.$themeId === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #FFFFFF;
    background: #0D0D0D;
    padding: 18px 40px;
    border: 2px solid #0D0D0D;
    &:hover { background: #FF6B6B; border-color: #FF6B6B; }
  `}
  ${p => p.$themeId === 'luxe' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.75rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #D4AF37;
    background: transparent;
    padding: 18px 45px;
    border: 1px solid rgba(212,175,55,0.5);
    &:hover { background: rgba(212,175,55,0.1); border-color: #D4AF37; }
  `}
  ${p => p.$themeId === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: #0a0a0f;
    background: #00ffff;
    padding: 18px 40px;
    box-shadow: 0 0 20px rgba(0,255,255,0.3);
    align-self: flex-start;
    &:hover { box-shadow: 0 0 30px rgba(0,255,255,0.5); transform: translateY(-2px); }
  `}
`;

function ContactSection() {
  const { currentTheme } = useTheme();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Section ref={sectionRef} $themeId={currentTheme} id="contact">
      <Container>
        <Grid $themeId={currentTheme}>
          <Content $visible={isVisible}>
            <Eyebrow $themeId={currentTheme}>Kontakt</Eyebrow>
            <Title $themeId={currentTheme}>
              Lass uns sprechen
            </Title>
            <Description $themeId={currentTheme}>
              Hast du Fragen oder möchtest du ein unverbindliches Beratungsgespräch? 
              Wir freuen uns auf dich!
            </Description>
            
            <ContactInfo>
              <ContactItem href="mailto:hello@sarahiver.de" $themeId={currentTheme}>
                <Icon>✉️</Icon>
                hello@sarahiver.de
              </ContactItem>
              <ContactItem href="tel:+4915123456789" $themeId={currentTheme}>
                <Icon>📱</Icon>
                +49 151 234 567 89
              </ContactItem>
              <ContactItem href="#" $themeId={currentTheme}>
                <Icon>📍</Icon>
                Hamburg, Deutschland
              </ContactItem>
            </ContactInfo>
          </Content>
          
          {['editorial', 'botanical', 'neon'].includes(currentTheme) && (
            <FormWrapper $visible={isVisible}>
              <Form $themeId={currentTheme}>
                <Input $themeId={currentTheme} placeholder="Dein Name" type="text" />
                <Input $themeId={currentTheme} placeholder="Deine E-Mail" type="email" />
                <TextArea $themeId={currentTheme} placeholder="Deine Nachricht" />
                <SubmitButton $themeId={currentTheme} type="submit">
                  Nachricht senden
                </SubmitButton>
              </Form>
            </FormWrapper>
          )}
        </Grid>
      </Container>
    </Section>
  );
}

export default ContactSection;

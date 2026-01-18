// src/components/marketing/ExamplesSection.js
import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

const Section = styled.section`
  padding: 140px 5%;
  position: relative;
  overflow: hidden;
  
  ${p => p.$themeId === 'editorial' && css`background: #FAFAFA;`}
  ${p => p.$themeId === 'gold' && css`background: #0A0A0A;`}
  ${p => p.$themeId === 'botanical' && css`background: #F5F1EB;`}
  ${p => p.$themeId === 'contemporary' && css`background: #FFFFFF;`}
  ${p => p.$themeId === 'luxe' && css`background: #0A0A0A;`}
  ${p => p.$themeId === 'neon' && css`
    background: #0a0a0f;
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: 
        radial-gradient(circle at 80% 20%, rgba(0,255,255,0.03) 0%, transparent 30%),
        radial-gradient(circle at 20% 80%, rgba(255,0,255,0.03) 0%, transparent 30%);
    }
  `}
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const Header = styled.div`
  margin-bottom: 60px;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '40px'});
  transition: all 0.9s cubic-bezier(0.16, 1, 0.3, 1);
  
  ${p => p.$themeId === 'editorial' && css`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 20px;
    }
  `}
  ${p => p.$themeId === 'gold' && css`text-align: center;`}
  ${p => p.$themeId === 'botanical' && css`text-align: center;`}
  ${p => p.$themeId === 'contemporary' && css`text-align: left;`}
  ${p => p.$themeId === 'luxe' && css`text-align: center;`}
  ${p => p.$themeId === 'neon' && css`text-align: center;`}
`;

const HeaderContent = styled.div``;

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
  margin: 0;
  
  ${p => p.$themeId === 'editorial' && css`
    font-family: 'Instrument Serif', Georgia, serif;
    font-size: clamp(2.5rem, 5vw, 4rem);
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
    font-size: clamp(2.2rem, 4vw, 3.5rem);
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
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 700;
    color: #FFFFFF;
  `}
`;

const Filters = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 40px;
  
  ${p => p.$themeId === 'editorial' && css`margin-bottom: 0;`}
  ${p => p.$themeId === 'gold' && css`justify-content: center; margin-top: 30px;`}
  ${p => p.$themeId === 'botanical' && css`justify-content: center; margin-top: 30px;`}
  ${p => p.$themeId === 'contemporary' && css`margin-top: 30px;`}
  ${p => p.$themeId === 'luxe' && css`justify-content: center; margin-top: 30px;`}
  ${p => p.$themeId === 'neon' && css`justify-content: center; margin-top: 30px;`}
`;

const FilterButton = styled.button`
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${p => p.$themeId === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    font-size: 0.8rem;
    padding: 8px 16px;
    background: ${p.$active ? '#1A1A1A' : 'transparent'};
    color: ${p.$active ? '#FFFFFF' : '#666'};
    border: 1px solid ${p.$active ? '#1A1A1A' : '#E0E0E0'};
    &:hover { border-color: #1A1A1A; }
  `}
  ${p => p.$themeId === 'gold' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    padding: 10px 20px;
    background: ${p.$active ? '#D4AF37' : 'transparent'};
    color: ${p.$active ? '#0A0A0A' : 'rgba(255,255,255,0.5)'};
    border: 1px solid ${p.$active ? '#D4AF37' : 'rgba(212,175,55,0.3)'};
    &:hover { border-color: #D4AF37; }
  `}
  ${p => p.$themeId === 'botanical' && css`
    font-family: 'Lato', sans-serif;
    font-size: 0.85rem;
    padding: 10px 20px;
    background: ${p.$active ? '#8B9D83' : '#FFFFFF'};
    color: ${p.$active ? '#FFFFFF' : '#5A6B5A'};
    border-radius: 25px;
    border: none;
    &:hover { background: ${p.$active ? '#8B9D83' : '#E8E4DC'}; }
  `}
  ${p => p.$themeId === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.8rem;
    font-weight: 600;
    padding: 10px 20px;
    background: ${p.$active ? '#0D0D0D' : '#FFFFFF'};
    color: ${p.$active ? '#FFFFFF' : '#0D0D0D'};
    border: 2px solid #0D0D0D;
    text-transform: uppercase;
    &:hover { 
      background: #0D0D0D;
      color: #FFFFFF;
    }
  `}
  ${p => p.$themeId === 'luxe' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.7rem;
    letter-spacing: 0.15em;
    padding: 12px 25px;
    background: transparent;
    color: ${p.$active ? '#D4AF37' : 'rgba(255,255,255,0.4)'};
    border: 1px solid ${p.$active ? 'rgba(212,175,55,0.5)' : 'rgba(255,255,255,0.1)'};
    &:hover { border-color: rgba(212,175,55,0.3); }
  `}
  ${p => p.$themeId === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.8rem;
    font-weight: 600;
    padding: 10px 20px;
    background: ${p.$active ? 'rgba(0,255,255,0.1)' : 'transparent'};
    color: ${p.$active ? '#00ffff' : 'rgba(255,255,255,0.5)'};
    border: 1px solid ${p.$active ? 'rgba(0,255,255,0.5)' : 'rgba(0,255,255,0.2)'};
    &:hover { 
      border-color: rgba(0,255,255,0.5);
      text-shadow: 0 0 10px rgba(0,255,255,0.5);
    }
  `}
`;

const ExamplesGrid = styled.div`
  ${p => p.$themeId === 'editorial' && css`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
    @media (max-width: 768px) { grid-template-columns: 1fr; }
  `}
  ${p => p.$themeId === 'gold' && css`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 25px;
    @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }
    @media (max-width: 500px) { grid-template-columns: 1fr; }
  `}
  ${p => p.$themeId === 'botanical' && css`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 25px;
    @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }
    @media (max-width: 500px) { grid-template-columns: 1fr; }
  `}
  ${p => p.$themeId === 'contemporary' && css`
    display: flex;
    gap: 20px;
    overflow-x: auto;
    padding-bottom: 20px;
    &::-webkit-scrollbar { height: 4px; }
    &::-webkit-scrollbar-track { background: #E0E0E0; }
    &::-webkit-scrollbar-thumb { background: #0D0D0D; }
  `}
  ${p => p.$themeId === 'luxe' && css`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }
    @media (max-width: 500px) { grid-template-columns: 1fr; }
  `}
  ${p => p.$themeId === 'neon' && css`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }
    @media (max-width: 500px) { grid-template-columns: 1fr; }
  `}
`;

const ExampleCard = styled.div`
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '30px'});
  transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: ${p => p.$delay}s;
  cursor: pointer;
  
  ${p => p.$themeId === 'editorial' && css`
    background: #FFFFFF;
    border: 1px solid #E0E0E0;
    &:hover {
      border-color: #1A1A1A;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    }
  `}
  ${p => p.$themeId === 'gold' && css`
    border: 1px solid rgba(212,175,55,0.15);
    background: rgba(212,175,55,0.02);
    &:hover {
      border-color: rgba(212,175,55,0.4);
      box-shadow: 0 20px 50px rgba(0,0,0,0.3);
    }
  `}
  ${p => p.$themeId === 'botanical' && css`
    background: #FFFFFF;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 20px 40px rgba(45,59,45,0.15);
    }
  `}
  ${p => p.$themeId === 'contemporary' && css`
    flex: 0 0 350px;
    background: #0D0D0D;
    border: 3px solid #0D0D0D;
    &:hover {
      transform: translate(-5px, -5px);
      box-shadow: 10px 10px 0 #FF6B6B;
    }
  `}
  ${p => p.$themeId === 'luxe' && css`
    border: 1px solid rgba(212,175,55,0.1);
    background: rgba(255,255,255,0.01);
    &:hover {
      border-color: rgba(212,175,55,0.25);
    }
  `}
  ${p => p.$themeId === 'neon' && css`
    border: 1px solid rgba(0,255,255,0.15);
    background: rgba(0,255,255,0.02);
    &:hover {
      border-color: rgba(0,255,255,0.5);
      box-shadow: 0 0 30px rgba(0,255,255,0.1);
    }
  `}
`;

const CardImage = styled.div`
  aspect-ratio: 16/10;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  
  ${p => p.$themeId === 'editorial' && css`background: #F5F5F5;`}
  ${p => p.$themeId === 'gold' && css`
    background: linear-gradient(135deg, rgba(212,175,55,0.1) 0%, transparent 100%);
  `}
  ${p => p.$themeId === 'botanical' && css`background: #F8F6F0;`}
  ${p => p.$themeId === 'contemporary' && css`background: #1A1A1A;`}
  ${p => p.$themeId === 'luxe' && css`
    background: linear-gradient(180deg, #1A1520 0%, #0A0A0A 100%);
  `}
  ${p => p.$themeId === 'neon' && css`
    background: linear-gradient(135deg, rgba(0,255,255,0.05) 0%, rgba(255,0,255,0.05) 100%);
  `}
`;

const CardContent = styled.div`
  padding: 25px;
  
  ${p => p.$themeId === 'editorial' && css`border-top: 1px solid #E0E0E0;`}
  ${p => p.$themeId === 'contemporary' && css`padding: 20px;`}
`;

const CardTitle = styled.h3`
  margin: 0 0 8px 0;
  
  ${p => p.$themeId === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    font-size: 1.1rem;
    font-weight: 600;
    color: #1A1A1A;
  `}
  ${p => p.$themeId === 'gold' && css`
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.3rem;
    font-weight: 500;
    color: #FFFFFF;
  `}
  ${p => p.$themeId === 'botanical' && css`
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 1.2rem;
    font-weight: 500;
    color: #2D3B2D;
  `}
  ${p => p.$themeId === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: #FFFFFF;
    text-transform: uppercase;
  `}
  ${p => p.$themeId === 'luxe' && css`
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.3rem;
    font-weight: 400;
    font-style: italic;
    color: #E8DDD4;
  `}
  ${p => p.$themeId === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.1rem;
    font-weight: 600;
    color: #00ffff;
  `}
`;

const CardMeta = styled.p`
  margin: 0;
  
  ${p => p.$themeId === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    color: #999;
  `}
  ${p => p.$themeId === 'gold' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.75rem;
    color: rgba(255,255,255,0.4);
  `}
  ${p => p.$themeId === 'botanical' && css`
    font-family: 'Lato', sans-serif;
    font-size: 0.9rem;
    color: #8B9D83;
  `}
  ${p => p.$themeId === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.8rem;
    color: #4ECDC4;
  `}
  ${p => p.$themeId === 'luxe' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.7rem;
    color: rgba(255,255,255,0.3);
    letter-spacing: 0.1em;
  `}
  ${p => p.$themeId === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.8rem;
    color: rgba(255,255,255,0.5);
  `}
`;

const examples = [
  { title: 'Lisa & Markus', style: 'Klassisch', emoji: '💒' },
  { title: 'Anna & Tom', style: 'Modern', emoji: '🏙️' },
  { title: 'Julia & Ben', style: 'Rustikal', emoji: '🌾' },
  { title: 'Sophie & Max', style: 'Romantisch', emoji: '🌹' },
  { title: 'Marie & Paul', style: 'Minimalistisch', emoji: '◻️' },
  { title: 'Laura & Felix', style: 'Bohemian', emoji: '🌻' }
];

const filters = ['Alle', 'Klassisch', 'Modern', 'Rustikal', 'Romantisch'];

function ExamplesSection() {
  const { currentTheme } = useTheme();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Alle');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const filteredExamples = activeFilter === 'Alle' 
    ? examples 
    : examples.filter(e => e.style === activeFilter);

  return (
    <Section ref={sectionRef} $themeId={currentTheme} id="examples">
      <Container>
        <Header $themeId={currentTheme} $visible={isVisible}>
          <HeaderContent>
            <Eyebrow $themeId={currentTheme}>Portfolio</Eyebrow>
            <Title $themeId={currentTheme}>Unsere Arbeiten</Title>
          </HeaderContent>
          
          {currentTheme === 'editorial' && (
            <Filters $themeId={currentTheme}>
              {filters.map(filter => (
                <FilterButton
                  key={filter}
                  $themeId={currentTheme}
                  $active={activeFilter === filter}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </FilterButton>
              ))}
            </Filters>
          )}
        </Header>
        
        {currentTheme !== 'editorial' && (
          <Filters $themeId={currentTheme}>
            {filters.map(filter => (
              <FilterButton
                key={filter}
                $themeId={currentTheme}
                $active={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </FilterButton>
            ))}
          </Filters>
        )}

        <ExamplesGrid $themeId={currentTheme}>
          {filteredExamples.map((example, index) => (
            <ExampleCard 
              key={example.title} 
              $themeId={currentTheme}
              $visible={isVisible}
              $delay={0.1 + index * 0.08}
            >
              <CardImage $themeId={currentTheme}>
                {example.emoji}
              </CardImage>
              <CardContent $themeId={currentTheme}>
                <CardTitle $themeId={currentTheme}>{example.title}</CardTitle>
                <CardMeta $themeId={currentTheme}>{example.style}</CardMeta>
              </CardContent>
            </ExampleCard>
          ))}
        </ExamplesGrid>
      </Container>
    </Section>
  );
}

export default ExamplesSection;

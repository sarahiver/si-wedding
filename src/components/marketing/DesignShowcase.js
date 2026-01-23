// src/components/marketing/DesignShowcase.js
import React, { useEffect, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

// Animations
const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-5px) rotate(2deg); }
`;

const neonGlow = keyframes`
  0%, 100% { text-shadow: 0 0 10px rgba(0,255,255,0.5), 0 0 20px rgba(0,255,255,0.3); }
  50% { text-shadow: 0 0 20px rgba(0,255,255,0.8), 0 0 40px rgba(0,255,255,0.5); }
`;

const drawLine = keyframes`
  from { width: 0; }
  to { width: 60px; }
`;

const goldShimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

// Theme data
const themes = [
  { id: 'editorial', name: 'Editorial', desc: 'Minimalistisch & Zeitlos' },
  { id: 'botanical', name: 'Botanical', desc: 'Natürlich & Organisch' },
  { id: 'contemporary', name: 'Contemporary', desc: 'Bold & Playful' },
  { id: 'neon', name: 'Neon', desc: 'Futuristisch & Elektrisierend' },
  { id: 'video', name: 'Video', desc: 'Cineastisch & Elegant' },
  { id: 'luxe', name: 'Luxe', desc: 'Opulent & Glamourös' },
];

function DesignShowcase() {
  const { currentTheme, switchTheme } = useTheme();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTheme, setActiveTheme] = useState('editorial');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleThemeSelect = (themeId) => {
    setActiveTheme(themeId);
  };

  const handleApplyTheme = () => {
    switchTheme(activeTheme);
  };

  return (
    <Section ref={sectionRef} $themeId={currentTheme} id="designs">
      <Container>
        <Header $visible={isVisible} $themeId={currentTheme}>
          <Eyebrow $themeId={currentTheme}>— 6 einzigartige Designs —</Eyebrow>
          <Title $themeId={currentTheme}>Wählt euren Stil</Title>
          <Subtitle $themeId={currentTheme}>
            Jedes Design erzählt eure Geschichte auf seine eigene Art
          </Subtitle>
        </Header>

        {/* Theme Tabs */}
        <ThemeTabs $visible={isVisible} $themeId={currentTheme}>
          {themes.map((theme) => (
            <ThemeTab
              key={theme.id}
              $active={activeTheme === theme.id}
              $themeId={currentTheme}
              onClick={() => handleThemeSelect(theme.id)}
            >
              {theme.name}
            </ThemeTab>
          ))}
        </ThemeTabs>

        {/* Preview Area */}
        <PreviewContainer $visible={isVisible}>
          {/* Editorial Preview */}
          {activeTheme === 'editorial' && (
            <EditorialPreview>
              <EditorialLine $position="top" />
              <EditorialLine $position="bottom" />
              <EditorialLineV $position="left" />
              <EditorialLineV $position="right" />
              <EditorialContent>
                <EditorialEyebrow>— Wir heiraten —</EditorialEyebrow>
                <EditorialNames>Sarah & Ivar</EditorialNames>
                <EditorialDate>21. Juni 2025</EditorialDate>
              </EditorialContent>
            </EditorialPreview>
          )}

          {/* Botanical Preview */}
          {activeTheme === 'botanical' && (
            <BotanicalPreview>
              <BotanicalLeaf $pos="tl">🌿</BotanicalLeaf>
              <BotanicalLeaf $pos="tr">🍃</BotanicalLeaf>
              <BotanicalLeaf $pos="bl">🌱</BotanicalLeaf>
              <BotanicalLeaf $pos="br">🌸</BotanicalLeaf>
              <BotanicalContent>
                <BotanicalEyebrow>Wo Liebe erblüht</BotanicalEyebrow>
                <BotanicalNames>Sarah & Ivar</BotanicalNames>
                <BotanicalDate>21. Juni 2025</BotanicalDate>
              </BotanicalContent>
            </BotanicalPreview>
          )}

          {/* Contemporary Preview */}
          {activeTheme === 'contemporary' && (
            <ContemporaryPreview>
              <ContemporaryGradient />
              <ContemporaryShapes>
                <ContemporaryCircle $top="20%" $left="10%" $color="#FF6B6B" $size="40px" />
                <ContemporaryCircle $top="60%" $right="15%" $color="#4ECDC4" $size="30px" />
                <ContemporarySquare $bottom="25%" $left="20%" $color="#FFE66D" $size="25px" />
              </ContemporaryShapes>
              <ContemporaryContent>
                <ContemporaryDateBox>21. JUNI 2025</ContemporaryDateBox>
                <ContemporaryNames>
                  <span className="name1">SARAH</span>
                  <span className="amp">&</span>
                  <span className="name2">IVAR</span>
                </ContemporaryNames>
                <ContemporaryLocation>HAMBURG</ContemporaryLocation>
              </ContemporaryContent>
            </ContemporaryPreview>
          )}

          {/* Neon Preview */}
          {activeTheme === 'neon' && (
            <NeonPreview>
              <NeonGrid />
              <NeonFrame>
                <NeonCorner $pos="tl" />
                <NeonCorner $pos="tr" />
                <NeonCorner $pos="bl" />
                <NeonCorner $pos="br" />
              </NeonFrame>
              <NeonContent>
                <NeonEyebrow>// LOADING LOVE.exe //</NeonEyebrow>
                <NeonNames>S & I</NeonNames>
                <NeonDate>&gt; 21.06.2025_</NeonDate>
              </NeonContent>
              <NeonScanline />
            </NeonPreview>
          )}

          {/* Video Preview */}
          {activeTheme === 'video' && (
            <VideoPreview>
              <VideoOverlay />
              <VideoContent>
                <VideoEyebrow>— Eine Liebesgeschichte —</VideoEyebrow>
                <VideoNames>Sarah & Ivar</VideoNames>
                <VideoLine />
                <VideoDate>21. Juni 2025 · Hamburg</VideoDate>
              </VideoContent>
            </VideoPreview>
          )}

          {/* Luxe Preview */}
          {activeTheme === 'luxe' && (
            <LuxePreview>
              <LuxePattern />
              <LuxeContent>
                <LuxeDiamond>✦</LuxeDiamond>
                <LuxeEyebrow>THE WEDDING OF</LuxeEyebrow>
                <LuxeNames>Sarah & Ivar</LuxeNames>
                <LuxeDivider />
                <LuxeDate>XXI · VI · MMXXV</LuxeDate>
                <LuxeDiamond>✦</LuxeDiamond>
              </LuxeContent>
            </LuxePreview>
          )}
        </PreviewContainer>

        {/* Theme Info */}
        <ThemeInfo $visible={isVisible} $themeId={currentTheme}>
          <ThemeName $themeId={currentTheme}>
            {themes.find(t => t.id === activeTheme)?.name}
          </ThemeName>
          <ThemeDesc $themeId={currentTheme}>
            {themes.find(t => t.id === activeTheme)?.desc}
          </ThemeDesc>
          <ThemeButton $themeId={currentTheme} onClick={handleApplyTheme}>
            Theme anwenden
          </ThemeButton>
        </ThemeInfo>
      </Container>
    </Section>
  );
}

export default DesignShowcase;

// ============================================
// SHARED STYLES
// ============================================
const Section = styled.section`
  padding: 140px 5%;
  position: relative;
  overflow: hidden;
  ${p => p.$themeId === 'video' && css`background: #FFFFFF;`}
  ${p => p.$themeId === 'editorial' && css`background: #FAFAFA;`}
  ${p => p.$themeId === 'botanical' && css`background: linear-gradient(180deg, #FAF9F6 0%, #F0EDE5 100%);`}
  ${p => p.$themeId === 'contemporary' && css`background: #FFFFFF;`}
  ${p => p.$themeId === 'luxe' && css`background: #FAF9F7;`}
  ${p => p.$themeId === 'neon' && css`background: #0a0a0f;`}
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 50px;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '30px'});
  transition: all 0.8s ease;
`;

const Eyebrow = styled.span`
  display: block;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  margin-bottom: 20px;
  ${p => p.$themeId === 'video' && css`font-family: 'Montserrat', sans-serif; color: #B8976A;`}
  ${p => p.$themeId === 'editorial' && css`font-family: 'Inter', sans-serif; color: #999;`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Lato', sans-serif; color: #7A9972;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #FF6B6B;`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Montserrat', sans-serif; color: #D4AF37;`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: #00ffff;`}
`;

const Title = styled.h2`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 300;
  margin-bottom: 20px;
  ${p => p.$themeId === 'video' && css`font-family: 'Cormorant Garamond', Georgia, serif; color: #1A1A1A; font-style: italic;`}
  ${p => p.$themeId === 'editorial' && css`font-family: 'Instrument Serif', Georgia, serif; color: #1A1A1A; font-style: italic;`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Playfair Display', Georgia, serif; color: #2C3E2D; font-style: italic;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #0D0D0D; font-weight: 700;`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Cormorant Garamond', Georgia, serif; color: #2A2A2A; font-style: italic;`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: #FFFFFF; font-weight: 700;`}
`;

const Subtitle = styled.p`
  font-size: 1rem;
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.8;
  ${p => p.$themeId === 'video' && css`font-family: 'Montserrat', sans-serif; color: rgba(26,26,26,0.6);`}
  ${p => p.$themeId === 'editorial' && css`font-family: 'Inter', sans-serif; color: #666;`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Lato', sans-serif; color: #6B7B6C;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #666;`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Montserrat', sans-serif; color: rgba(42,42,42,0.6);`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: rgba(255,255,255,0.5);`}
`;

// ============================================
// THEME TABS
// ============================================
const ThemeTabs = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 40px;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '20px'});
  transition: all 0.8s ease;
  transition-delay: 0.2s;
`;

const ThemeTab = styled.button`
  padding: 12px 24px;
  border: none;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  transition: all 0.3s ease;
  
  ${p => p.$themeId === 'video' && css`
    font-family: 'Montserrat', sans-serif;
    background: ${p.$active ? '#B8976A' : 'transparent'};
    color: ${p.$active ? '#FFFFFF' : '#1A1A1A'};
    border: 1px solid ${p.$active ? '#B8976A' : 'rgba(184,151,106,0.3)'};
  `}
  ${p => p.$themeId === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    background: ${p.$active ? '#1A1A1A' : 'transparent'};
    color: ${p.$active ? '#FFFFFF' : '#1A1A1A'};
    border: 1px solid ${p.$active ? '#1A1A1A' : '#E0E0E0'};
  `}
  ${p => p.$themeId === 'botanical' && css`
    font-family: 'Lato', sans-serif;
    background: ${p.$active ? '#7A9972' : 'transparent'};
    color: ${p.$active ? '#FFFFFF' : '#2C3E2D'};
    border: 1px solid ${p.$active ? '#7A9972' : 'rgba(122,153,114,0.3)'};
    border-radius: 25px;
  `}
  ${p => p.$themeId === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    background: ${p.$active ? '#FF6B6B' : 'transparent'};
    color: ${p.$active ? '#FFFFFF' : '#0D0D0D'};
    border: 2px solid ${p.$active ? '#FF6B6B' : '#0D0D0D'};
  `}
  ${p => p.$themeId === 'luxe' && css`
    font-family: 'Montserrat', sans-serif;
    background: ${p.$active ? '#D4AF37' : 'transparent'};
    color: ${p.$active ? '#FFFFFF' : '#2A2A2A'};
    border: 1px solid ${p.$active ? '#D4AF37' : 'rgba(212,175,55,0.3)'};
  `}
  ${p => p.$themeId === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif;
    background: ${p.$active ? 'rgba(0,255,255,0.2)' : 'transparent'};
    color: ${p.$active ? '#00ffff' : 'rgba(255,255,255,0.6)'};
    border: 1px solid ${p.$active ? '#00ffff' : 'rgba(0,255,255,0.3)'};
  `}
  
  &:hover {
    transform: translateY(-2px);
  }
`;

// ============================================
// PREVIEW CONTAINER
// ============================================
const PreviewContainer = styled.div`
  width: 100%;
  height: 450px;
  margin-bottom: 40px;
  border-radius: 8px;
  overflow: hidden;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '20px'});
  transition: all 0.8s ease;
  transition-delay: 0.3s;
  
  @media (max-width: 600px) {
    height: 350px;
  }
`;

// ============================================
// EDITORIAL PREVIEW
// ============================================
const EditorialPreview = styled.div`
  width: 100%;
  height: 100%;
  background: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const EditorialLine = styled.div`
  position: absolute;
  height: 1px;
  background: #E0E0E0;
  ${p => p.$position === 'top' && css`top: 15%; left: 10%; right: 10%;`}
  ${p => p.$position === 'bottom' && css`bottom: 15%; left: 10%; right: 10%;`}
`;

const EditorialLineV = styled.div`
  position: absolute;
  width: 1px;
  background: #E0E0E0;
  ${p => p.$position === 'left' && css`left: 10%; top: 15%; bottom: 15%;`}
  ${p => p.$position === 'right' && css`right: 10%; top: 15%; bottom: 15%;`}
`;

const EditorialContent = styled.div`
  text-align: center;
  z-index: 1;
`;

const EditorialEyebrow = styled.span`
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  color: #999;
  margin-bottom: 20px;
`;

const EditorialNames = styled.h3`
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 400;
  font-style: italic;
  color: #1A1A1A;
  margin-bottom: 15px;
`;

const EditorialDate = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  letter-spacing: 0.2em;
  color: #666;
`;

// ============================================
// BOTANICAL PREVIEW
// ============================================
const BotanicalPreview = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #FAF9F6 0%, #F0EDE5 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const BotanicalLeaf = styled.div`
  position: absolute;
  font-size: 2.5rem;
  opacity: 0.3;
  animation: ${float} 4s ease-in-out infinite;
  ${p => p.$pos === 'tl' && css`top: 10%; left: 8%; animation-delay: 0s;`}
  ${p => p.$pos === 'tr' && css`top: 15%; right: 10%; animation-delay: 0.5s;`}
  ${p => p.$pos === 'bl' && css`bottom: 15%; left: 12%; animation-delay: 1s;`}
  ${p => p.$pos === 'br' && css`bottom: 10%; right: 8%; animation-delay: 1.5s;`}
`;

const BotanicalContent = styled.div`
  text-align: center;
  z-index: 1;
`;

const BotanicalEyebrow = styled.span`
  display: block;
  font-family: 'Lato', sans-serif;
  font-size: 0.8rem;
  letter-spacing: 0.3em;
  color: #7A9972;
  margin-bottom: 20px;
`;

const BotanicalNames = styled.h3`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 400;
  font-style: italic;
  color: #2C3E2D;
  margin-bottom: 15px;
`;

const BotanicalDate = styled.span`
  font-family: 'Lato', sans-serif;
  font-size: 0.85rem;
  letter-spacing: 0.15em;
  color: #6B7B6C;
`;

// ============================================
// CONTEMPORARY PREVIEW
// ============================================
const ContemporaryPreview = styled.div`
  width: 100%;
  height: 100%;
  background: #FAFAFA;
  display: flex;
  position: relative;
  overflow: hidden;
`;

const ContemporaryGradient = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 45%;
  background: linear-gradient(160deg, #FF6B6B 0%, #4ECDC4 50%, #FFE66D 100%);
`;

const ContemporaryShapes = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
`;

const ContemporaryCircle = styled.div`
  position: absolute;
  width: ${p => p.$size};
  height: ${p => p.$size};
  border-radius: 50%;
  background: ${p => p.$color};
  opacity: 0.7;
  top: ${p => p.$top || 'auto'};
  bottom: ${p => p.$bottom || 'auto'};
  left: ${p => p.$left || 'auto'};
  right: ${p => p.$right || 'auto'};
  animation: ${float} 5s ease-in-out infinite;
`;

const ContemporarySquare = styled.div`
  position: absolute;
  width: ${p => p.$size};
  height: ${p => p.$size};
  background: ${p => p.$color};
  transform: rotate(12deg);
  top: ${p => p.$top || 'auto'};
  bottom: ${p => p.$bottom || 'auto'};
  left: ${p => p.$left || 'auto'};
  right: ${p => p.$right || 'auto'};
  animation: ${float} 6s ease-in-out infinite reverse;
`;

const ContemporaryContent = styled.div`
  position: relative;
  z-index: 1;
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ContemporaryDateBox = styled.div`
  display: inline-block;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #FFFFFF;
  background: #0D0D0D;
  padding: 10px 20px;
  margin-bottom: 25px;
  align-self: flex-start;
`;

const ContemporaryNames = styled.div`
  font-family: 'Space Grotesk', sans-serif;
  margin-bottom: 20px;
  
  .name1 {
    display: block;
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 700;
    color: #FF6B6B;
    line-height: 1;
  }
  .amp {
    display: block;
    font-size: 1.5rem;
    font-style: italic;
    color: #999;
    margin: 5px 0;
  }
  .name2 {
    display: block;
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 700;
    color: #0D0D0D;
    line-height: 1;
  }
`;

const ContemporaryLocation = styled.span`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  color: #0D0D0D;
  background: #FFE66D;
  padding: 8px 16px;
  align-self: flex-start;
`;

// ============================================
// NEON PREVIEW
// ============================================
const NeonPreview = styled.div`
  width: 100%;
  height: 100%;
  background: #0a0a0f;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const NeonGrid = styled.div`
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(0,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,255,255,0.03) 1px, transparent 1px);
  background-size: 50px 50px;
`;

const NeonFrame = styled.div`
  position: absolute;
  inset: 40px;
  border: 1px solid rgba(0,255,255,0.2);
`;

const NeonCorner = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  border-color: #00ffff;
  border-style: solid;
  ${p => p.$pos === 'tl' && css`top: -1px; left: -1px; border-width: 2px 0 0 2px;`}
  ${p => p.$pos === 'tr' && css`top: -1px; right: -1px; border-width: 2px 2px 0 0;`}
  ${p => p.$pos === 'bl' && css`bottom: -1px; left: -1px; border-width: 0 0 2px 2px;`}
  ${p => p.$pos === 'br' && css`bottom: -1px; right: -1px; border-width: 0 2px 2px 0;`}
`;

const NeonContent = styled.div`
  text-align: center;
  z-index: 1;
`;

const NeonEyebrow = styled.span`
  display: block;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0.3em;
  color: #ff00ff;
  margin-bottom: 20px;
`;

const NeonNames = styled.h3`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom: 15px;
  animation: ${neonGlow} 2s ease-in-out infinite;
`;

const NeonDate = styled.span`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  color: #00ffff;
`;

const NeonScanline = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(0,255,255,0.3), transparent);
  animation: scanMove 4s linear infinite;
  
  @keyframes scanMove {
    0% { top: -10%; }
    100% { top: 110%; }
  }
`;

// ============================================
// VIDEO PREVIEW
// ============================================
const VideoPreview = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #1A1A1A 0%, #0D0D0D 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const VideoOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%);
`;

const VideoContent = styled.div`
  text-align: center;
  z-index: 1;
`;

const VideoEyebrow = styled.span`
  display: block;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.4em;
  color: #B8976A;
  margin-bottom: 25px;
`;

const VideoNames = styled.h3`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 300;
  font-style: italic;
  color: #FFFFFF;
  margin-bottom: 20px;
`;

const VideoLine = styled.div`
  width: 60px;
  height: 1px;
  background: #B8976A;
  margin: 0 auto 20px;
`;

const VideoDate = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  letter-spacing: 0.2em;
  color: rgba(255,255,255,0.6);
`;

// ============================================
// LUXE PREVIEW
// ============================================
const LuxePreview = styled.div`
  width: 100%;
  height: 100%;
  background: #0A0A0A;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const LuxePattern = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.03;
  background-image: repeating-linear-gradient(
    45deg,
    #D4AF37 0px,
    #D4AF37 1px,
    transparent 1px,
    transparent 20px
  );
`;

const LuxeContent = styled.div`
  text-align: center;
  z-index: 1;
`;

const LuxeDiamond = styled.div`
  font-size: 1.2rem;
  color: #D4AF37;
  margin: 15px 0;
`;

const LuxeEyebrow = styled.span`
  display: block;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.65rem;
  font-weight: 400;
  letter-spacing: 0.5em;
  color: rgba(212,175,55,0.7);
  margin-bottom: 20px;
`;

const LuxeNames = styled.h3`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 300;
  font-style: italic;
  color: #D4AF37;
  margin-bottom: 15px;
`;

const LuxeDivider = styled.div`
  width: 80px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #D4AF37, transparent);
  margin: 20px auto;
`;

const LuxeDate = styled.span`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1rem;
  font-style: italic;
  letter-spacing: 0.3em;
  color: rgba(212,175,55,0.6);
`;

// ============================================
// THEME INFO
// ============================================
const ThemeInfo = styled.div`
  text-align: center;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '20px'});
  transition: all 0.8s ease;
  transition-delay: 0.4s;
`;

const ThemeName = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
  ${p => p.$themeId === 'video' && css`font-family: 'Cormorant Garamond', Georgia, serif; color: #1A1A1A; font-style: italic;`}
  ${p => p.$themeId === 'editorial' && css`font-family: 'Instrument Serif', Georgia, serif; color: #1A1A1A; font-style: italic;`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Playfair Display', Georgia, serif; color: #2C3E2D; font-style: italic;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #0D0D0D; font-weight: 700;`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Cormorant Garamond', Georgia, serif; color: #2A2A2A; font-style: italic;`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: #FFFFFF; font-weight: 700;`}
`;

const ThemeDesc = styled.p`
  font-size: 1rem;
  margin-bottom: 25px;
  ${p => p.$themeId === 'video' && css`font-family: 'Montserrat', sans-serif; color: rgba(26,26,26,0.6);`}
  ${p => p.$themeId === 'editorial' && css`font-family: 'Inter', sans-serif; color: #666;`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Lato', sans-serif; color: #6B7B6C;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #666;`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Montserrat', sans-serif; color: rgba(42,42,42,0.6);`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: rgba(255,255,255,0.5);`}
`;

const ThemeButton = styled.button`
  padding: 15px 40px;
  border: none;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  transition: all 0.3s ease;
  
  ${p => p.$themeId === 'video' && css`
    font-family: 'Montserrat', sans-serif;
    background: #B8976A;
    color: #FFFFFF;
    &:hover { background: #A68659; }
  `}
  ${p => p.$themeId === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    background: #1A1A1A;
    color: #FFFFFF;
    &:hover { background: #333; }
  `}
  ${p => p.$themeId === 'botanical' && css`
    font-family: 'Lato', sans-serif;
    background: #7A9972;
    color: #FFFFFF;
    border-radius: 30px;
    &:hover { background: #6B8A63; }
  `}
  ${p => p.$themeId === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    background: #FF6B6B;
    color: #FFFFFF;
    &:hover { box-shadow: 4px 4px 0 #0D0D0D; transform: translate(-2px, -2px); }
  `}
  ${p => p.$themeId === 'luxe' && css`
    font-family: 'Montserrat', sans-serif;
    background: #D4AF37;
    color: #0A0A0A;
    &:hover { background: #C9A432; }
  `}
  ${p => p.$themeId === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif;
    background: transparent;
    color: #00ffff;
    border: 1px solid #00ffff;
    &:hover { background: rgba(0,255,255,0.1); box-shadow: 0 0 20px rgba(0,255,255,0.3); }
  `}
`;

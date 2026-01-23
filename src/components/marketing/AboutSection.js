// src/components/marketing/AboutSection.js
import { useEffect, useRef, useState } from "react"
import styled, { css, keyframes } from "styled-components"
import { useTheme } from "../../context/ThemeContext"

// ============================================
// KEYFRAME ANIMATIONS (nur verwendete)
// ============================================
const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(2deg); }
`

const videoShimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`

const neonPulse = keyframes`
  0%, 100% { text-shadow: 0 0 5px currentColor, 0 0 10px currentColor; }
  50% { text-shadow: 0 0 20px currentColor, 0 0 30px currentColor, 0 0 40px currentColor; }
`

// ============================================
// MAIN SECTION
// ============================================
const Section = styled.section`
  position: relative;
  overflow: hidden;
  ${(p) =>
    p.$themeId === "editorial" &&
    css`
      background: #ffffff;
    `}
  ${(p) =>
    p.$themeId === "video" &&
    css`
      background: #0a0a0a;
    `}
  ${(p) =>
    p.$themeId === "botanical" &&
    css`
      background: linear-gradient(
        180deg,
        #f8f6f0 0%,
        #ffffff 50%,
        #f8f6f0 100%
      );
    `}
  ${(p) =>
    p.$themeId === "contemporary" &&
    css`
      background: #0d0d0d;
    `}
  ${(p) =>
    p.$themeId === "luxe" &&
    css`
      background: #faf9f7;
    `}
  ${(p) =>
    p.$themeId === "neon" &&
    css`
      background: #0a0a0f;
    `}
`

// ============================================
// PARALLAX ELEMENTS
// ============================================
const ParallaxContainer = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
`

const ParallaxElement = styled.div`
  position: absolute;
  transform: translateY(${(p) => p.$offset}px);
  transition: transform 0.15s ease-out;
`

const FloatingHeart = styled(ParallaxElement)`
  font-size: ${(p) => p.$size || "40px"};
  opacity: ${(p) => p.$opacity || 0.1};
  animation: ${float} ${(p) => p.$duration || "8s"} ease-in-out infinite;
  animation-delay: ${(p) => p.$delay || "0s"};
  top: ${(p) => p.$top};
  left: ${(p) => p.$left};
  right: ${(p) => p.$right};
`

const GlowOrb = styled(ParallaxElement)`
  width: ${(p) => p.$size || "300px"};
  height: ${(p) => p.$size || "300px"};
  border-radius: 50%;
  background: ${(p) => p.$color || "rgba(212,175,55,0.1)"};
  filter: blur(80px);
  top: ${(p) => p.$top};
  left: ${(p) => p.$left};
  right: ${(p) => p.$right};
`

// ============================================
// EDITORIAL THEME
// ============================================
const EditorialWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`

const EditorialImageSide = styled.div`
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px;
  position: relative;
  overflow: hidden;
  @media (max-width: 1000px) {
    min-height: 50vh;
    padding: 60px;
  }
`

const EditorialImageFrame = styled.div`
  width: 100%;
  max-width: 400px;
  aspect-ratio: 3/4;
  background: linear-gradient(135deg, #e8e8e8 0%, #d0d0d0 100%);
  position: relative;
  &::before {
    content: "S & I";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: "Instrument Serif", Georgia, serif;
    font-size: 4rem;
    font-style: italic;
    color: rgba(0, 0, 0, 0.1);
  }
  &::after {
    content: "";
    position: absolute;
    inset: 20px;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
`

const EditorialFloatingQuote = styled.div`
  position: absolute;
  bottom: 60px;
  left: 60px;
  right: 60px;
  background: #ffffff;
  padding: 30px 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  .quote {
    font-family: "Instrument Serif", Georgia, serif;
    font-size: 1.3rem;
    font-style: italic;
    color: #1a1a1a;
    margin: 0 0 15px 0;
    line-height: 1.6;
  }
  .attribution {
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #999;
  }
`

const EditorialContentSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 100px 80px;
  @media (max-width: 1000px) {
    padding: 80px 5%;
  }
`

const EditorialEyebrow = styled.div`
  font-family: "Inter", sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #999;
  margin-bottom: 20px;
`

const EditorialTitle = styled.h2`
  font-family: "Instrument Serif", Georgia, serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 400;
  font-style: italic;
  color: #1a1a1a;
  margin: 0 0 30px 0;
  line-height: 1.1;
`

const EditorialHighlight = styled.span`
  position: relative;
  &::after {
    content: "";
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    height: 8px;
    background: rgba(0, 0, 0, 0.08);
    z-index: -1;
  }
`

const EditorialText = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 1.05rem;
  color: #666;
  line-height: 1.9;
  margin: 0 0 25px 0;
  max-width: 500px;
`

const EditorialSignature = styled.div`
  margin-top: 40px;
  .names {
    font-family: "Instrument Serif", Georgia, serif;
    font-size: 1.8rem;
    font-style: italic;
    color: #1a1a1a;
    margin-bottom: 5px;
  }
  .role {
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #999;
  }
`

// ============================================
// GOLD THEME
// ============================================
const VideoWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120px 5%;
  text-align: center;
  position: relative;
`

const VideoDecorTop = styled.div`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 1.5rem;
  background: linear-gradient(90deg, #d4af37, #f4d03f, #d4af37);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${videoShimmer} 3s linear infinite;
  margin-bottom: 40px;
  letter-spacing: 0.5em;
`

const VideoTitle = styled.h2`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 300;
  color: #ffffff;
  margin: 0 0 20px 0;
  line-height: 1.1;
`

const VideoSubtitle = styled.div`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-style: italic;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 60px;
`

const VideoDivider = styled.div`
  width: 100px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #d4af37, transparent);
  margin: 0 auto 60px;
`

const VideoTextBlock = styled.div`
  max-width: 700px;
  margin: 0 auto;
`

const VideoText = styled.p`
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 2;
  margin: 0 0 30px 0;
  strong {
    color: #d4af37;
    font-weight: 500;
  }
`

const VideoQuote = styled.blockquote`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 1.8rem;
  font-style: italic;
  color: #ffffff;
  margin: 60px 0;
  padding: 40px;
  position: relative;
  &::before,
  &::after {
    content: "✦";
    position: absolute;
    color: #d4af37;
    font-size: 1rem;
  }
  &::before {
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  &::after {
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
`

const VideoSignature = styled.div`
  margin-top: 60px;
  .names {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-size: 2.5rem;
    background: linear-gradient(135deg, #d4af37, #f4d03f);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 10px;
  }
  .tagline {
    font-family: "Montserrat", sans-serif;
    font-size: 0.65rem;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.4);
  }
`

// ============================================
// BOTANICAL THEME
// ============================================
const BotanicalWrapper = styled.div`
  padding: 120px 5%;
  position: relative;
`

const BotanicalInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 80px;
  align-items: center;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 60px;
  }
`

const BotanicalImageSection = styled.div`
  position: relative;
`

const BotanicalImageFrame = styled.div`
  aspect-ratio: 4/5;
  background: linear-gradient(135deg, #e8e4dc 0%, #d8d4cc 100%);
  border-radius: 200px 200px 30px 30px;
  position: relative;
  overflow: hidden;
  &::before {
    content: "💑";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 5rem;
    opacity: 0.3;
  }
`

const BotanicalFloatingCard = styled.div`
  position: absolute;
  bottom: -30px;
  right: -30px;
  background: #ffffff;
  padding: 30px;
  border-radius: 25px;
  box-shadow: 0 20px 60px rgba(45, 59, 45, 0.15);
  max-width: 250px;
  .emoji {
    font-size: 2rem;
    margin-bottom: 15px;
  }
  .text {
    font-family: "Playfair Display", Georgia, serif;
    font-size: 1.1rem;
    color: #2d3b2d;
    line-height: 1.5;
  }
  @media (max-width: 900px) {
    position: relative;
    bottom: auto;
    right: auto;
    margin-top: 20px;
    max-width: 100%;
  }
`

const BotanicalContent = styled.div``

const BotanicalEyebrow = styled.div`
  font-family: "Lato", sans-serif;
  font-size: 0.85rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #8b9d83;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  &::before,
  &::after {
    content: "✿";
    font-size: 0.7rem;
  }
`

const BotanicalTitle = styled.h2`
  font-family: "Playfair Display", Georgia, serif;
  font-size: clamp(2.2rem, 4vw, 3.5rem);
  font-weight: 400;
  color: #2d3b2d;
  margin: 0 0 30px 0;
  line-height: 1.2;
`

const BotanicalText = styled.p`
  font-family: "Lato", sans-serif;
  font-size: 1.05rem;
  color: #5a6b5a;
  line-height: 1.9;
  margin: 0 0 25px 0;
`

const BotanicalHighlight = styled.div`
  background: #2d3b2d;
  color: #ffffff;
  padding: 30px 40px;
  border-radius: 25px;
  margin: 40px 0;
  .title {
    font-family: "Playfair Display", Georgia, serif;
    font-size: 1.3rem;
    margin-bottom: 10px;
  }
  .text {
    font-family: "Lato", sans-serif;
    font-size: 0.95rem;
    opacity: 0.8;
    line-height: 1.7;
  }
`

const BotanicalSignature = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 40px;
  .avatar {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: #8b9d83;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
  }
  .info {
    .names {
      font-family: "Playfair Display", Georgia, serif;
      font-size: 1.3rem;
      color: #2d3b2d;
    }
    .role {
      font-family: "Lato", sans-serif;
      font-size: 0.8rem;
      color: #8b9d83;
    }
  }
`

// ============================================
// CONTEMPORARY THEME
// ============================================
const ContemporaryWrapper = styled.div`
  min-height: 100vh;
  position: relative;
  overflow: hidden;
`

const ContemporaryHero = styled.div`
  padding: 120px 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  z-index: 2;
`

const ContemporaryBgText = styled.div`
  position: absolute;
  font-family: "Space Grotesk", sans-serif;
  font-size: 25vw;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.02);
  text-transform: uppercase;
  white-space: nowrap;
  top: ${(p) => p.$top || "50%"};
  left: ${(p) => p.$left || "50%"};
  transform: translate(-50%, -50%) rotate(${(p) => p.$rotate || "0deg"});
  pointer-events: none;
`

const ContemporaryLabel = styled.div`
  font-family: "Space Grotesk", sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  color: #ffffff;
  background: #ff6b6b;
  padding: 12px 30px;
  margin-bottom: 40px;
  transform: rotate(-2deg);
`

const ContemporaryTitle = styled.h2`
  font-family: "Space Grotesk", sans-serif;
  font-size: clamp(4rem, 12vw, 10rem);
  font-weight: 700;
  color: #ffffff;
  text-transform: uppercase;
  line-height: 0.85;
  margin: 0 0 40px 0;
  .highlight {
    color: #ff6b6b;
    display: block;
  }
`

const ContemporarySubtitle = styled.div`
  font-family: "Space Grotesk", sans-serif;
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.6);
  max-width: 600px;
  line-height: 1.6;
  margin-bottom: 60px;
`

const ContemporaryCards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

const ContemporaryCard = styled.div`
  background: ${(p) => ["#FF6B6B", "#4ECDC4", "#FFE66D"][p.$index % 3]};
  padding: 50px 40px;
  border: 4px solid #0d0d0d;
  box-shadow: 8px 8px 0 #0d0d0d;
  transition: all 0.3s ease;
  &:hover {
    transform: translate(-4px, -4px);
    box-shadow: 12px 12px 0 #0d0d0d;
  }
  .icon {
    font-size: 3rem;
    margin-bottom: 25px;
  }
  .title {
    font-family: "Space Grotesk", sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: #0d0d0d;
    text-transform: uppercase;
    margin-bottom: 15px;
  }
  .text {
    font-family: "Space Grotesk", sans-serif;
    font-size: 0.95rem;
    color: rgba(0, 0, 0, 0.7);
    line-height: 1.6;
  }
`

const ContemporarySignature = styled.div`
  margin-top: 80px;
  text-align: center;
  .names {
    font-family: "Space Grotesk", sans-serif;
    font-size: 3rem;
    font-weight: 700;
    color: #ffffff;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
  .tagline {
    font-family: "Space Grotesk", sans-serif;
    font-size: 1rem;
    color: #4ecdc4;
    text-transform: uppercase;
    font-weight: 700;
  }
`

// ============================================
// LUXE THEME
// ============================================
const LuxeWrapper = styled.div`
  padding: 140px 5%;
  position: relative;
`

const LuxeInner = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
`

const LuxeDecorLine = styled.div`
  width: 60px;
  height: 1px;
  background: #b4a08c;
  margin: 0 auto 40px;
`

const LuxeEyebrow = styled.div`
  font-family: "Montserrat", sans-serif;
  font-size: 0.6rem;
  letter-spacing: 0.5em;
  text-transform: uppercase;
  color: #b4a08c;
  margin-bottom: 30px;
`

const LuxeTitle = styled.h2`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 300;
  color: #2a2a2a;
  margin: 0 0 50px 0;
  line-height: 1.3;
`

const LuxeQuote = styled.blockquote`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 1.8rem;
  font-style: italic;
  color: #2a2a2a;
  margin: 0 0 50px 0;
  padding: 0 10%;
  line-height: 1.6;
  position: relative;
  &::before {
    content: '"';
    position: absolute;
    top: -20px;
    left: 5%;
    font-size: 5rem;
    color: rgba(180, 160, 140, 0.2);
    font-family: Georgia, serif;
  }
`

const LuxeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 60px;
  margin: 80px 0;
  text-align: left;
  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`

const LuxeGridItem = styled.div`
  .number {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-size: 3rem;
    font-weight: 300;
    color: #b4a08c;
    line-height: 1;
    margin-bottom: 15px;
  }
  .title {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-size: 1.3rem;
    color: #2a2a2a;
    margin-bottom: 10px;
  }
  .text {
    font-family: "Montserrat", sans-serif;
    font-size: 0.85rem;
    color: #888;
    line-height: 1.8;
  }
`

const LuxeSignature = styled.div`
  margin-top: 80px;
  padding-top: 60px;
  border-top: 1px solid rgba(180, 160, 140, 0.2);
  .names {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-size: 2rem;
    font-weight: 300;
    color: #2a2a2a;
    margin-bottom: 10px;
  }
  .tagline {
    font-family: "Montserrat", sans-serif;
    font-size: 0.6rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: #b4a08c;
  }
`

// ============================================
// NEON THEME
// ============================================
const NeonWrapper = styled.div`
  min-height: 100vh;
  padding: 120px 5%;
  position: relative;
  display: flex;
  align-items: center;
`

const NeonGrid = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none;
`

const NeonScanLine = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(0, 255, 255, 0.5),
    transparent
  );
  animation: ${keyframes`
    0% { top: 0; }
    100% { top: 100%; }
  `} 8s linear infinite;
`

const NeonInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  position: relative;
  z-index: 2;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 60px;
  }
`

const NeonContent = styled.div``

const NeonLabel = styled.div`
  font-family: "Space Grotesk", sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #ff00ff;
  margin-bottom: 20px;
  &::before {
    content: "// ";
    color: #00ffff;
  }
`

const NeonTitle = styled.h2`
  font-family: "Space Grotesk", sans-serif;
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 700;
  color: #00ffff;
  text-shadow: 0 0 30px rgba(0, 255, 255, 0.5);
  margin: 0 0 30px 0;
  line-height: 1.1;
  animation: ${neonPulse} 3s ease-in-out infinite;
`

const NeonText = styled.p`
  font-family: "Space Grotesk", sans-serif;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.8;
  margin: 0 0 25px 0;
  strong {
    color: #ff00ff;
  }
`

const NeonTerminal = styled.div`
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(0, 255, 255, 0.3);
  position: relative;
  overflow: hidden;
`

const NeonTerminalHeader = styled.div`
  background: rgba(0, 255, 255, 0.1);
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid rgba(0, 255, 255, 0.2);
`

const NeonDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${(p) => p.$color};
  box-shadow: 0 0 8px ${(p) => p.$color};
`

const NeonTerminalTitle = styled.div`
  font-family: "Space Grotesk", sans-serif;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.5);
  margin-left: 10px;
`

const NeonTerminalContent = styled.div`
  padding: 30px;
`

const NeonCodeLine = styled.div`
  font-family: "Space Grotesk", monospace;
  font-size: 0.85rem;
  color: ${(p) => p.$color || "rgba(255,255,255,0.7)"};
  margin-bottom: 15px;
  .comment {
    color: rgba(255, 255, 255, 0.3);
  }
  .key {
    color: #ff00ff;
  }
  .value {
    color: #00ffff;
  }
  .string {
    color: #ffe66d;
  }
`

const NeonSignature = styled.div`
  margin-top: 40px;
  padding-top: 30px;
  border-top: 1px solid rgba(0, 255, 255, 0.2);
  .names {
    font-family: "Space Grotesk", sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: #ff00ff;
    text-shadow: 0 0 15px rgba(255, 0, 255, 0.5);
    margin-bottom: 5px;
  }
  .tagline {
    font-family: "Space Grotesk", sans-serif;
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.4);
  }
`

// ============================================
// MAIN COMPONENT
// ============================================
function AboutSection() {
  const { currentTheme } = useTheme()
  const sectionRef = useRef(null)
  const [parallaxOffset, setParallaxOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const scrollProgress = -rect.top / window.innerHeight
        setParallaxOffset(scrollProgress * 100)
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const renderContent = () => {
    switch (currentTheme) {
      case "editorial":
        return (
          <EditorialWrapper>
            <EditorialImageSide>
              <EditorialImageFrame />
              <EditorialFloatingQuote>
                <p className='quote'>
                  „Wir glauben, dass eure Hochzeitswebsite genauso einzigartig
                  sein sollte wie eure Liebe."
                </p>
                <span className='attribution'>— Sarah & Iver</span>
              </EditorialFloatingQuote>
            </EditorialImageSide>
            <EditorialContentSide>
              <EditorialEyebrow>Über uns</EditorialEyebrow>
              <EditorialTitle>
                Wir sind <EditorialHighlight>Sarah & Iver</EditorialHighlight>
              </EditorialTitle>
              <EditorialText>
                Als wir unsere eigene Hochzeit geplant haben, standen wir vor
                dem gleichen Problem wie ihr: Unzählige Template-Websites, die
                alle gleich aussehen. Unpersönlich. Austauschbar.
              </EditorialText>
              <EditorialText>
                Das wollten wir ändern. Deshalb haben wir S&I gegründet – mit
                einer klaren Mission:{" "}
                <strong>
                  Jedes Paar verdient eine Website, die so einzigartig ist wie
                  ihre Geschichte.
                </strong>
              </EditorialText>
              <EditorialText>
                Bei uns bekommt ihr keine anonyme Massenware. Ihr bekommt uns –
                als eure persönlichen Ansprechpartner, von der ersten Idee bis
                zum großen Tag.
              </EditorialText>
              <EditorialSignature>
                <div className='names'>Sarah & Iver</div>
                <div className='role'>Gründer von S&I</div>
              </EditorialSignature>
            </EditorialContentSide>
          </EditorialWrapper>
        )

      case "video":
        return (
          <VideoWrapper>
            <ParallaxContainer>
              <GlowOrb
                $top='10%'
                $left='10%'
                $size='400px'
                $offset={parallaxOffset * 0.3}
                $color='rgba(212,175,55,0.1)'
              />
              <GlowOrb
                $top='60%'
                $right='5%'
                $size='300px'
                $offset={parallaxOffset * 0.5}
                $color='rgba(212,175,55,0.08)'
              />
            </ParallaxContainer>
            <VideoDecorTop>✦ ✦ ✦</VideoDecorTop>
            <VideoTitle>Sarah & Iver</VideoTitle>
            <VideoSubtitle>Die Menschen hinter S&I</VideoSubtitle>
            <VideoDivider />
            <VideoTextBlock>
              <VideoText>
                Was als Suche nach unserer eigenen perfekten Hochzeitswebsite
                begann, wurde zu einer <strong>Leidenschaft</strong>. Wir haben
                erlebt, wie frustrierend es ist, zwischen unpersönlichen
                Templates wählen zu müssen.
              </VideoText>
              <VideoQuote>
                „Eure Liebe ist einzigartig. Eure Website sollte es auch sein."
              </VideoQuote>
              <VideoText>
                Bei S&I steht <strong>persönliche Betreuung</strong> an erster
                Stelle. Kein Callcenter, kein Chatbot – nur wir. Wir lernen euch
                und eure Geschichte kennen und kreieren eine Website, die
                wirklich zu euch passt.
              </VideoText>
              <VideoText>
                Jedes Projekt ist für uns <strong>Herzensangelegenheit</strong>.
                Wir arbeiten erst dann weiter, wenn ihr vollkommen zufrieden
                seid. Das ist unser Versprechen.
              </VideoText>
            </VideoTextBlock>
            <VideoSignature>
              <div className='names'>S & I</div>
              <div className='tagline'>Mit Liebe zum Detail</div>
            </VideoSignature>
          </VideoWrapper>
        )

      case "botanical":
        return (
          <BotanicalWrapper>
            <ParallaxContainer>
              <FloatingHeart
                $top='10%'
                $left='5%'
                $size='50px'
                $offset={parallaxOffset * 0.3}
                $opacity={0.15}
              >
                🌿
              </FloatingHeart>
              <FloatingHeart
                $top='30%'
                $right='8%'
                $size='40px'
                $offset={parallaxOffset * 0.5}
                $delay='1s'
                $opacity={0.1}
              >
                🌸
              </FloatingHeart>
              <FloatingHeart
                $top='70%'
                $left='10%'
                $size='45px'
                $offset={parallaxOffset * 0.4}
                $delay='2s'
                $opacity={0.12}
              >
                🍃
              </FloatingHeart>
            </ParallaxContainer>
            <BotanicalInner>
              <BotanicalImageSection>
                <BotanicalImageFrame />
                <BotanicalFloatingCard>
                  <div className='emoji'>💕</div>
                  <p className='text'>
                    „Persönlich bedeutet für uns: Wir kennen eure Namen, eure
                    Geschichte, eure Wünsche."
                  </p>
                </BotanicalFloatingCard>
              </BotanicalImageSection>
              <BotanicalContent>
                <BotanicalEyebrow>Über uns</BotanicalEyebrow>
                <BotanicalTitle>Hallo, wir sind Sarah & Iver</BotanicalTitle>
                <BotanicalText>
                  Wir glauben an echte Verbindungen – nicht nur zwischen euch
                  als Paar, sondern auch zwischen uns und euch. Deshalb haben
                  wir S&I gegründet.
                </BotanicalText>
                <BotanicalText>
                  Als wir selbst geheiratet haben, war uns eines besonders
                  wichtig: Authentizität. Keine 08/15-Lösung, sondern etwas, das
                  wirklich unsere Geschichte erzählt.
                </BotanicalText>
                <BotanicalHighlight>
                  <div className='title'>💚 Unser Versprechen</div>
                  <p className='text'>
                    Bei uns seid ihr keine Nummer. Wir begleiten euch persönlich
                    durch den gesamten Prozess – mit Herz, Zeit und voller
                    Aufmerksamkeit.
                  </p>
                </BotanicalHighlight>
                <BotanicalSignature>
                  <div className='avatar'>👫</div>
                  <div className='info'>
                    <div className='names'>Sarah & Iver</div>
                    <div className='role'>Gründer von S&I</div>
                  </div>
                </BotanicalSignature>
              </BotanicalContent>
            </BotanicalInner>
          </BotanicalWrapper>
        )

      case "contemporary":
        return (
          <ContemporaryWrapper>
            <ContemporaryBgText $top='30%' $rotate='-5deg'>
              PERSONAL
            </ContemporaryBgText>
            <ContemporaryBgText $top='70%' $rotate='3deg'>
              UNIQUE
            </ContemporaryBgText>
            <ContemporaryHero>
              <ContemporaryLabel>ABOUT US</ContemporaryLabel>
              <ContemporaryTitle>
                WE ARE
                <span className='highlight'>SARAH & IVER</span>
              </ContemporaryTitle>
              <ContemporarySubtitle>
                Keine Agentur. Keine Templates. Nur wir – und unsere Mission,
                eure Liebe digital unvergesslich zu machen.
              </ContemporarySubtitle>
              <ContemporaryCards>
                <ContemporaryCard $index={0}>
                  <div className='icon'>💬</div>
                  <h3 className='title'>Persönlich</h3>
                  <p className='text'>
                    Ihr redet direkt mit uns. Immer. Bei jedem Schritt. Keine
                    Callcenter, keine Chatbots.
                  </p>
                </ContemporaryCard>
                <ContemporaryCard $index={1}>
                  <div className='icon'>🎨</div>
                  <h3 className='title'>Individuell</h3>
                  <p className='text'>
                    Jede Website ist ein Unikat. Wir designen nicht für die
                    Masse, sondern für euch.
                  </p>
                </ContemporaryCard>
                <ContemporaryCard $index={2}>
                  <div className='icon'>❤️</div>
                  <h3 className='title'>Leidenschaft</h3>
                  <p className='text'>
                    Wir lieben, was wir tun. Und das sieht man in jedem Detail
                    eurer Website.
                  </p>
                </ContemporaryCard>
              </ContemporaryCards>
              <ContemporarySignature>
                <div className='names'>S & I</div>
                <div className='tagline'>
                  {"// Real People, Real Connection"}
                </div>
              </ContemporarySignature>
            </ContemporaryHero>
          </ContemporaryWrapper>
        )

      case "luxe":
        return (
          <LuxeWrapper>
            <ParallaxContainer>
              <ParallaxElement
                as='div'
                $top='20%'
                $left='5%'
                $offset={parallaxOffset * 0.3}
                style={{
                  width: "200px",
                  height: "1px",
                  background: "linear-gradient(90deg, #B4A08C, transparent)",
                }}
              />
              <ParallaxElement
                as='div'
                $top='50%'
                $right='5%'
                $offset={parallaxOffset * 0.5}
                style={{
                  width: "150px",
                  height: "1px",
                  background: "linear-gradient(90deg, transparent, #B4A08C)",
                }}
              />
              <ParallaxElement
                as='div'
                $top='80%'
                $left='10%'
                $offset={parallaxOffset * 0.4}
                style={{
                  width: "180px",
                  height: "1px",
                  background: "linear-gradient(90deg, #B4A08C, transparent)",
                }}
              />
            </ParallaxContainer>
            <LuxeInner>
              <LuxeDecorLine />
              <LuxeEyebrow>Über uns</LuxeEyebrow>
              <LuxeTitle>Die Essenz von S&I: Persönliche Hingabe</LuxeTitle>
              <LuxeQuote>
                In einer Welt der Massenproduktion glauben wir an die Schönheit
                des Individuellen.
              </LuxeQuote>
              <LuxeGrid>
                <LuxeGridItem>
                  <div className='number'>01</div>
                  <h3 className='title'>Persönliche Betreuung</h3>
                  <p className='text'>
                    Von Anfang bis Ende habt ihr direkten Kontakt zu uns. Wir
                    sind eure Ansprechpartner – nicht ein anonymes Team.
                  </p>
                </LuxeGridItem>
                <LuxeGridItem>
                  <div className='number'>02</div>
                  <h3 className='title'>Maßgeschneidert</h3>
                  <p className='text'>
                    Keine vorgefertigten Lösungen. Jedes Design wird individuell
                    für euch und eure Geschichte entwickelt.
                  </p>
                </LuxeGridItem>
                <LuxeGridItem>
                  <div className='number'>03</div>
                  <h3 className='title'>Zeitlose Qualität</h3>
                  <p className='text'>
                    Wir schaffen Websites, die auch in Jahren noch beeindrucken.
                    Klassische Eleganz statt kurzlebiger Trends.
                  </p>
                </LuxeGridItem>
              </LuxeGrid>
              <LuxeSignature>
                <div className='names'>Sarah & Iver</div>
                <div className='tagline'>Gründer von S&I</div>
              </LuxeSignature>
            </LuxeInner>
          </LuxeWrapper>
        )

      case "neon":
        return (
          <NeonWrapper>
            <NeonGrid />
            <NeonScanLine />
            <ParallaxContainer>
              <GlowOrb
                $top='20%'
                $left='5%'
                $size='300px'
                $offset={parallaxOffset * 0.3}
                $color='rgba(0,255,255,0.1)'
              />
              <GlowOrb
                $top='60%'
                $right='10%'
                $size='250px'
                $offset={parallaxOffset * 0.5}
                $color='rgba(255,0,255,0.1)'
              />
            </ParallaxContainer>
            <NeonInner>
              <NeonContent>
                <NeonLabel>ABOUT_US.exe</NeonLabel>
                <NeonTitle>SARAH & IVER</NeonTitle>
                <NeonText>
                  Wir sind keine anonyme Agentur. Wir sind{" "}
                  <strong>zwei Menschen</strong>, die glauben, dass eure
                  Hochzeitswebsite mehr verdient als ein 08/15-Template.
                </NeonText>
                <NeonText>
                  Bei uns gibt es keine Ticket-Nummern und keine automatischen
                  Antworten. Ihr bekommt <strong>uns</strong> – mit voller
                  Aufmerksamkeit und Leidenschaft für Design.
                </NeonText>
                <NeonText>
                  Eure Geschichte ist einzigartig. Zeit, dass eure Website das
                  auch ist.
                </NeonText>
                <NeonSignature>
                  <div className='names'>S & I</div>
                  <div className='tagline'>
                    {"// Human connection in a digital world"}
                  </div>
                </NeonSignature>
              </NeonContent>
              <NeonTerminal>
                <NeonTerminalHeader>
                  <NeonDot $color='#ff5f56' />
                  <NeonDot $color='#ffbd2e' />
                  <NeonDot $color='#27c93f' />
                  <NeonTerminalTitle>founders.json</NeonTerminalTitle>
                </NeonTerminalHeader>
                <NeonTerminalContent>
                  <NeonCodeLine>
                    <span className='comment'>{"// Das sind wir"}</span>
                  </NeonCodeLine>
                  <NeonCodeLine>{"{"}</NeonCodeLine>
                  <NeonCodeLine>
                    {" "}
                    <span className='key'>"names"</span>:{" "}
                    <span className='string'>"Sarah & Iver"</span>,
                  </NeonCodeLine>
                  <NeonCodeLine>
                    {" "}
                    <span className='key'>"mission"</span>:{" "}
                    <span className='string'>"Einzigartige Websites"</span>,
                  </NeonCodeLine>
                  <NeonCodeLine>
                    {" "}
                    <span className='key'>"approach"</span>:{" "}
                    <span className='string'>"100% persönlich"</span>,
                  </NeonCodeLine>
                  <NeonCodeLine>
                    {" "}
                    <span className='key'>"templates"</span>:{" "}
                    <span className='value'>false</span>,
                  </NeonCodeLine>
                  <NeonCodeLine>
                    {" "}
                    <span className='key'>"chatbots"</span>:{" "}
                    <span className='value'>false</span>,
                  </NeonCodeLine>
                  <NeonCodeLine>
                    {" "}
                    <span className='key'>"callcenter"</span>:{" "}
                    <span className='value'>false</span>,
                  </NeonCodeLine>
                  <NeonCodeLine>
                    {" "}
                    <span className='key'>"passion"</span>:{" "}
                    <span className='value'>true</span>,
                  </NeonCodeLine>
                  <NeonCodeLine>
                    {" "}
                    <span className='key'>"love"</span>:{" "}
                    <span className='value'>Infinity</span>
                  </NeonCodeLine>
                  <NeonCodeLine>{"}"}</NeonCodeLine>
                </NeonTerminalContent>
              </NeonTerminal>
            </NeonInner>
          </NeonWrapper>
        )

      default:
        return null
    }
  }

  return (
    <Section ref={sectionRef} $themeId={currentTheme} id='about'>
      {renderContent()}
    </Section>
  )
}

export default AboutSection

// src/components/marketing/SaveTheDateSection.js
import { useEffect, useRef, useState } from "react"
import styled, { css, keyframes } from "styled-components"
import { useTheme } from "../../context/ThemeContext"

// ============================================
// KEYFRAME ANIMATIONS
// ============================================

const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(2deg); }
`

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.1); opacity: 1; }
`

const videoShimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`

const neonPulse = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(0,255,255,0.3), 0 0 40px rgba(0,255,255,0.1); }
  50% { box-shadow: 0 0 40px rgba(0,255,255,0.5), 0 0 80px rgba(0,255,255,0.2); }
`

const sparkle = keyframes`
  0%, 100% { opacity: 0; transform: scale(0); }
  50% { opacity: 1; transform: scale(1); }
`

const countdown = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0); }
`

// ============================================
// MAIN SECTION
// ============================================

const Section = styled.section`
  position: relative;
  overflow: hidden;
  padding: 120px 5%;

  ${(p) =>
    p.$themeId === "editorial" &&
    css`
      background: #f5f5f5;
    `}
  ${(p) =>
    p.$themeId === "video" &&
    css`
      background: linear-gradient(180deg, #0d0b08 0%, #0a0a0a 100%);
    `}
  ${(p) =>
    p.$themeId === "botanical" &&
    css`
      background: #2d3b2d;
    `}
  ${(p) =>
    p.$themeId === "contemporary" &&
    css`
      background: #ffe66d;
    `}
  ${(p) =>
    p.$themeId === "luxe" &&
    css`
      background: #ffffff;
    `}
  ${(p) =>
    p.$themeId === "neon" &&
    css`
      background: linear-gradient(180deg, #0a0a0f 0%, #0f0a15 100%);
    `}
`

const Container = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`

// ============================================
// PARALLAX BACKGROUNDS
// ============================================

const ParallaxBg = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
`

const FloatingElement = styled.div`
  position: absolute;
  transform: translateY(${(p) => p.$offset}px);
  transition: transform 0.15s ease-out;
  top: ${(p) => p.$top};
  left: ${(p) => p.$left};
  right: ${(p) => p.$right};
  bottom: ${(p) => p.$bottom};
  font-size: ${(p) => p.$size || "40px"};
  opacity: ${(p) => p.$opacity || 0.15};
  animation: ${float} ${(p) => p.$duration || "8s"} ease-in-out infinite;
  animation-delay: ${(p) => p.$delay || "0s"};
`

const GlowOrb = styled.div`
  position: absolute;
  width: ${(p) => p.$size || "300px"};
  height: ${(p) => p.$size || "300px"};
  border-radius: 50%;
  background: ${(p) => p.$color || "rgba(212,175,55,0.1)"};
  filter: blur(80px);
  transform: translateY(${(p) => p.$offset}px);
  transition: transform 0.15s ease-out;
  top: ${(p) => p.$top};
  left: ${(p) => p.$left};
  right: ${(p) => p.$right};
`

// ============================================
// HEADER STYLES
// ============================================

const Header = styled.div`
  text-align: center;
  margin-bottom: 60px;
`

const Eyebrow = styled.span`
  display: inline-block;
  margin-bottom: 1rem;

  ${(p) =>
    p.$themeId === "editorial" &&
    css`
      font-family: "Inter", sans-serif;
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: #999;
    `}
  ${(p) =>
    p.$themeId === "video" &&
    css`
      font-family: "Montserrat", sans-serif;
      font-size: 0.75rem;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: #d4af37;
    `}
  ${(p) =>
    p.$themeId === "botanical" &&
    css`
      font-family: "Lato", sans-serif;
      font-size: 0.85rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.6);
    `}
  ${(p) =>
    p.$themeId === "contemporary" &&
    css`
      font-family: "Space Grotesk", sans-serif;
      font-size: 0.9rem;
      font-weight: 700;
      color: #ffffff;
      background: #0d0d0d;
      padding: 8px 20px;
    `}
  ${(p) =>
    p.$themeId === "luxe" &&
    css`
      font-family: "Montserrat", sans-serif;
      font-size: 0.6rem;
      letter-spacing: 0.5em;
      text-transform: uppercase;
      color: #b4a08c;
    `}
  ${(p) =>
    p.$themeId === "neon" &&
    css`
      font-family: "Space Grotesk", sans-serif;
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: #ff00ff;
    `}
`

const Title = styled.h2`
  margin: 0 0 1.5rem 0;

  ${(p) =>
    p.$themeId === "editorial" &&
    css`
      font-family: "Instrument Serif", Georgia, serif;
      font-size: clamp(2.5rem, 5vw, 4rem);
      font-weight: 400;
      font-style: italic;
      color: #1a1a1a;
    `}
  ${(p) =>
    p.$themeId === "video" &&
    css`
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: clamp(2.5rem, 5vw, 4rem);
      font-weight: 300;
      color: #ffffff;
    `}
  ${(p) =>
    p.$themeId === "botanical" &&
    css`
      font-family: "Playfair Display", Georgia, serif;
      font-size: clamp(2.2rem, 4vw, 3.5rem);
      font-weight: 400;
      color: #ffffff;
    `}
  ${(p) =>
    p.$themeId === "contemporary" &&
    css`
      font-family: "Space Grotesk", sans-serif;
      font-size: clamp(3rem, 8vw, 6rem);
      font-weight: 700;
      color: #0d0d0d;
      text-transform: uppercase;
      line-height: 0.9;
    `}
  ${(p) =>
    p.$themeId === "luxe" &&
    css`
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 300;
      color: #2a2a2a;
    `}
  ${(p) =>
    p.$themeId === "neon" &&
    css`
      font-family: "Space Grotesk", sans-serif;
      font-size: clamp(2.5rem, 5vw, 4rem);
      font-weight: 700;
      color: #00ffff;
      text-shadow: 0 0 30px rgba(0, 255, 255, 0.5);
    `}
`

const Subtitle = styled.p`
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.8;

  ${(p) =>
    p.$themeId === "editorial" &&
    css`
      font-family: "Inter", sans-serif;
      font-size: 1.1rem;
      color: #666;
    `}
  ${(p) =>
    p.$themeId === "video" &&
    css`
      font-family: "Montserrat", sans-serif;
      font-size: 1rem;
      color: rgba(255, 255, 255, 0.5);
    `}
  ${(p) =>
    p.$themeId === "botanical" &&
    css`
      font-family: "Lato", sans-serif;
      font-size: 1.1rem;
      color: rgba(255, 255, 255, 0.7);
    `}
  ${(p) =>
    p.$themeId === "contemporary" &&
    css`
      font-family: "Space Grotesk", sans-serif;
      font-size: 1.1rem;
      color: rgba(0, 0, 0, 0.6);
    `}
  ${(p) =>
    p.$themeId === "luxe" &&
    css`
      font-family: "Montserrat", sans-serif;
      font-size: 0.95rem;
      color: #888;
    `}
  ${(p) =>
    p.$themeId === "neon" &&
    css`
      font-family: "Space Grotesk", sans-serif;
      font-size: 1rem;
      color: rgba(255, 255, 255, 0.5);
    `}
`

// ============================================
// MAIN CONTENT GRID
// ============================================

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 80px;
  align-items: center;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    gap: 60px;
  }
`

// ============================================
// PREVIEW MOCKUP
// ============================================

const PreviewContainer = styled.div`
  position: relative;
`

// Editorial Preview
const EditorialPreview = styled.div`
  background: #ffffff;
  border: 1px solid #e0e0e0;
  padding: 60px 50px;
  position: relative;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.1);

  &::before {
    content: "📅";
    position: absolute;
    top: -30px;
    right: 40px;
    font-size: 3rem;
    animation: ${float} 4s ease-in-out infinite;
  }
`

const EditorialPreviewContent = styled.div`
  text-align: center;

  .date-label {
    font-family: "Inter", sans-serif;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #999;
    margin-bottom: 20px;
  }

  .names {
    font-family: "Instrument Serif", Georgia, serif;
    font-size: 3rem;
    font-style: italic;
    color: #1a1a1a;
    margin-bottom: 15px;
  }

  .date {
    font-family: "Instrument Serif", Georgia, serif;
    font-size: 1.8rem;
    color: #1a1a1a;
    margin-bottom: 10px;
  }

  .location {
    font-family: "Inter", sans-serif;
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 40px;
  }

  .countdown {
    display: flex;
    justify-content: center;
    gap: 30px;
  }

  .countdown-item {
    text-align: center;

    .number {
      font-family: "Instrument Serif", Georgia, serif;
      font-size: 2.5rem;
      font-style: italic;
      color: #1a1a1a;
      animation: ${countdown} 2s ease-in-out infinite;
    }

    .label {
      font-family: "Inter", sans-serif;
      font-size: 0.65rem;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #999;
    }
  }
`

// Gold Preview
const VideoPreview = styled.div`
  background: linear-gradient(
    135deg,
    rgba(212, 175, 55, 0.05) 0%,
    rgba(0, 0, 0, 0.3) 100%
  );
  border: 1px solid rgba(212, 175, 55, 0.3);
  padding: 70px 50px;
  position: relative;
  text-align: center;

  &::before,
  &::after {
    content: "✦";
    position: absolute;
    color: #d4af37;
    font-size: 1.5rem;
    animation: ${sparkle} 2s ease-in-out infinite;
  }

  &::before {
    top: 20px;
    left: 20px;
  }
  &::after {
    bottom: 20px;
    right: 20px;
    animation-delay: 1s;
  }
`

const VideoPreviewContent = styled.div`
  .monogram {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-size: 4rem;
    font-weight: 300;
    background: linear-gradient(135deg, #d4af37, #f4d03f, #d4af37);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: ${videoShimmer} 3s linear infinite;
    margin-bottom: 20px;
  }

  .save-the-date {
    font-family: "Montserrat", sans-serif;
    font-size: 0.7rem;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: #d4af37;
    margin-bottom: 30px;
  }

  .date {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-size: 2.2rem;
    font-weight: 300;
    color: #ffffff;
    margin-bottom: 15px;
  }

  .location {
    font-family: "Montserrat", sans-serif;
    font-size: 0.75rem;
    letter-spacing: 0.15em;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 40px;
  }

  .divider {
    width: 60px;
    height: 1px;
    background: linear-gradient(90deg, transparent, #d4af37, transparent);
    margin: 0 auto 30px;
  }

  .message {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-size: 1.1rem;
    font-style: italic;
    color: rgba(255, 255, 255, 0.6);
  }
`

// Botanical Preview
const BotanicalPreview = styled.div`
  background: #ffffff;
  border-radius: 40px;
  padding: 60px 50px;
  position: relative;
  box-shadow: 0 30px 80px rgba(45, 59, 45, 0.3);
  text-align: center;
  overflow: hidden;

  &::before {
    content: "🌿";
    position: absolute;
    top: -20px;
    left: -20px;
    font-size: 6rem;
    opacity: 0.1;
    transform: rotate(-30deg);
  }

  &::after {
    content: "🌸";
    position: absolute;
    bottom: -20px;
    right: -20px;
    font-size: 5rem;
    opacity: 0.1;
    transform: rotate(20deg);
  }
`

const BotanicalPreviewContent = styled.div`
  position: relative;
  z-index: 1;

  .wreath {
    font-size: 4rem;
    margin-bottom: 20px;
    animation: ${pulse} 3s ease-in-out infinite;
  }

  .names {
    font-family: "Playfair Display", Georgia, serif;
    font-size: 2.5rem;
    color: #2d3b2d;
    margin-bottom: 20px;
  }

  .date {
    font-family: "Lato", sans-serif;
    font-size: 1.3rem;
    color: #5a6b5a;
    margin-bottom: 10px;
  }

  .location {
    font-family: "Lato", sans-serif;
    font-size: 0.9rem;
    color: #8b9d83;
    margin-bottom: 30px;
  }

  .badge {
    display: inline-block;
    font-family: "Lato", sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    color: #ffffff;
    background: #8b9d83;
    padding: 10px 25px;
    border-radius: 30px;
  }
`

// Contemporary Preview
const ContemporaryPreview = styled.div`
  background: #0d0d0d;
  border: 4px solid #0d0d0d;
  box-shadow: 12px 12px 0 #ff6b6b;
  padding: 50px 40px;
  position: relative;
`

const ContemporaryPreviewContent = styled.div`
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 40px;
  }

  .save {
    font-family: "Space Grotesk", sans-serif;
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #ff6b6b;
    writing-mode: vertical-rl;
    text-orientation: mixed;
  }

  .date-big {
    font-family: "Space Grotesk", sans-serif;
    font-size: 5rem;
    font-weight: 700;
    color: #ffffff;
    line-height: 0.9;
    text-align: right;

    span {
      display: block;
      color: #4ecdc4;
    }
  }

  .names {
    font-family: "Space Grotesk", sans-serif;
    font-size: 2rem;
    font-weight: 700;
    color: #ffffff;
    text-transform: uppercase;
    margin-bottom: 20px;

    span {
      color: #ff6b6b;
    }
  }

  .location {
    font-family: "Space Grotesk", sans-serif;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.5);
  }
`

// Luxe Preview
const LuxePreview = styled.div`
  border: 1px solid rgba(180, 160, 140, 0.3);
  padding: 70px 50px;
  position: relative;
  text-align: center;

  &::before {
    content: "";
    position: absolute;
    top: 15px;
    left: 15px;
    right: 15px;
    bottom: 15px;
    border: 1px solid rgba(180, 160, 140, 0.15);
  }
`

const LuxePreviewContent = styled.div`
  position: relative;
  z-index: 1;

  .top-line {
    width: 40px;
    height: 1px;
    background: #b4a08c;
    margin: 0 auto 30px;
  }

  .save-the-date {
    font-family: "Montserrat", sans-serif;
    font-size: 0.55rem;
    letter-spacing: 0.5em;
    text-transform: uppercase;
    color: #b4a08c;
    margin-bottom: 30px;
  }

  .names {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-size: 2.8rem;
    font-weight: 300;
    color: #2a2a2a;
    margin-bottom: 25px;
  }

  .date {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-size: 1.5rem;
    font-weight: 300;
    color: #2a2a2a;
    margin-bottom: 10px;
  }

  .location {
    font-family: "Montserrat", sans-serif;
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #888;
  }
`

// Neon Preview
const NeonPreview = styled.div`
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(0, 255, 255, 0.3);
  padding: 50px 40px;
  position: relative;
  animation: ${neonPulse} 3s ease-in-out infinite;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #00ffff, #ff00ff, #00ffff);
  }
`

const NeonPreviewContent = styled.div`
  text-align: center;

  .terminal-header {
    font-family: "Space Grotesk", monospace;
    font-size: 0.7rem;
    color: rgba(255, 255, 255, 0.4);
    margin-bottom: 30px;
    text-align: left;

    span {
      color: #00ff00;
    }
  }

  .date-display {
    font-family: "Space Grotesk", sans-serif;
    font-size: 4rem;
    font-weight: 700;
    color: #00ffff;
    text-shadow: 0 0 30px rgba(0, 255, 255, 0.5);
    margin-bottom: 20px;
    letter-spacing: 0.1em;
  }

  .names {
    font-family: "Space Grotesk", sans-serif;
    font-size: 1.5rem;
    font-weight: 600;
    color: #ff00ff;
    text-shadow: 0 0 15px rgba(255, 0, 255, 0.5);
    margin-bottom: 20px;
  }

  .location {
    font-family: "Space Grotesk", sans-serif;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 30px;
  }

  .status {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-family: "Space Grotesk", sans-serif;
    font-size: 0.75rem;
    color: #00ff00;
    border: 1px solid rgba(0, 255, 0, 0.3);
    padding: 8px 20px;

    &::before {
      content: "";
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #00ff00;
      box-shadow: 0 0 10px #00ff00;
      animation: ${pulse} 2s ease-in-out infinite;
    }
  }
`

// ============================================
// FEATURES & PRICING
// ============================================

const FeaturesContainer = styled.div`
  ${(p) =>
    p.$themeId === "editorial" &&
    css`
      background: #ffffff;
      border: 1px solid #e0e0e0;
      padding: 50px;
    `}
  ${(p) =>
    p.$themeId === "video" &&
    css`
      background: rgba(212, 175, 55, 0.03);
      border: 1px solid rgba(212, 175, 55, 0.2);
      padding: 50px;
    `}
  ${(p) =>
    p.$themeId === "botanical" &&
    css`
      background: rgba(255, 255, 255, 0.1);
      border-radius: 30px;
      padding: 50px;
    `}
  ${(p) =>
    p.$themeId === "contemporary" &&
    css`
      background: #ffffff;
      border: 4px solid #0d0d0d;
      box-shadow: 8px 8px 0 #0d0d0d;
      padding: 40px;
    `}
  ${(p) =>
    p.$themeId === "luxe" &&
    css`
      padding: 40px 0;
    `}
  ${(p) =>
    p.$themeId === "neon" &&
    css`
      background: rgba(0, 255, 255, 0.02);
      border: 1px solid rgba(0, 255, 255, 0.15);
      padding: 40px;
    `}
`

const FeatureTitle = styled.h3`
  margin: 0 0 30px 0;

  ${(p) =>
    p.$themeId === "editorial" &&
    css`
      font-family: "Instrument Serif", Georgia, serif;
      font-size: 1.8rem;
      font-style: italic;
      color: #1a1a1a;
    `}
  ${(p) =>
    p.$themeId === "video" &&
    css`
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 1.8rem;
      font-weight: 300;
      color: #d4af37;
    `}
  ${(p) =>
    p.$themeId === "botanical" &&
    css`
      font-family: "Playfair Display", Georgia, serif;
      font-size: 1.6rem;
      color: #ffffff;
    `}
  ${(p) =>
    p.$themeId === "contemporary" &&
    css`
      font-family: "Space Grotesk", sans-serif;
      font-size: 1.5rem;
      font-weight: 700;
      color: #0d0d0d;
      text-transform: uppercase;
    `}
  ${(p) =>
    p.$themeId === "luxe" &&
    css`
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 1.6rem;
      font-weight: 300;
      color: #2a2a2a;
    `}
  ${(p) =>
    p.$themeId === "neon" &&
    css`
      font-family: "Space Grotesk", sans-serif;
      font-size: 1.3rem;
      font-weight: 600;
      color: #00ffff;
    `}
`

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 40px 0;
`

const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 15px;
  margin-bottom: 20px;

  .icon {
    font-size: 1.2rem;
    flex-shrink: 0;
  }

  .text {
    ${(p) =>
      p.$themeId === "editorial" &&
      css`
        font-family: "Inter", sans-serif;
        font-size: 0.95rem;
        color: #666;
        line-height: 1.6;
      `}
    ${(p) =>
      p.$themeId === "video" &&
      css`
        font-family: "Montserrat", sans-serif;
        font-size: 0.9rem;
        color: rgba(255, 255, 255, 0.7);
        line-height: 1.6;
      `}
    ${(p) =>
      p.$themeId === "botanical" &&
      css`
        font-family: "Lato", sans-serif;
        font-size: 0.95rem;
        color: rgba(255, 255, 255, 0.8);
        line-height: 1.6;
      `}
    ${(p) =>
      p.$themeId === "contemporary" &&
      css`
        font-family: "Space Grotesk", sans-serif;
        font-size: 0.95rem;
        color: #666;
        line-height: 1.5;
      `}
    ${(p) =>
      p.$themeId === "luxe" &&
      css`
        font-family: "Montserrat", sans-serif;
        font-size: 0.85rem;
        color: #666;
        line-height: 1.7;
      `}
    ${(p) =>
      p.$themeId === "neon" &&
      css`
        font-family: "Space Grotesk", sans-serif;
        font-size: 0.9rem;
        color: rgba(255, 255, 255, 0.7);
        line-height: 1.6;
      `}
  }
`

// ============================================
// PRICING BOXES
// ============================================

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-top: 30px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

const PricingBox = styled.div`
  text-align: center;
  padding: 25px 20px;
  position: relative;

  ${(p) =>
    p.$themeId === "editorial" &&
    css`
      background: ${p.$included ? "#1A1A1A" : "#F5F5F5"};
      color: ${p.$included ? "#FFFFFF" : "#1A1A1A"};

      .package {
        font-family: "Inter", sans-serif;
        font-size: 0.65rem;
        font-weight: 600;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        color: ${p.$included ? "rgba(255,255,255,0.6)" : "#999"};
        margin-bottom: 10px;
      }

      .price {
        font-family: "Instrument Serif", Georgia, serif;
        font-size: 1.8rem;
        font-style: italic;
      }

      .note {
        font-family: "Inter", sans-serif;
        font-size: 0.7rem;
        color: ${p.$included ? "rgba(255,255,255,0.5)" : "#999"};
        margin-top: 5px;
      }
    `}

  ${(p) =>
    p.$themeId === "video" &&
    css`
      background: ${p.$included
        ? "linear-gradient(135deg, rgba(212,175,55,0.2), rgba(212,175,55,0.05))"
        : "rgba(255,255,255,0.02)"};
      border: 1px solid ${p.$included ? "#D4AF37" : "rgba(212,175,55,0.15)"};

      .package {
        font-family: "Montserrat", sans-serif;
        font-size: 0.6rem;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: ${p.$included ? "#D4AF37" : "rgba(255,255,255,0.4)"};
        margin-bottom: 10px;
      }

      .price {
        font-family: "Cormorant Garamond", Georgia, serif;
        font-size: 1.8rem;
        font-weight: 300;
        color: ${p.$included ? "#D4AF37" : "#FFFFFF"};
      }

      .note {
        font-family: "Montserrat", sans-serif;
        font-size: 0.6rem;
        color: rgba(255, 255, 255, 0.4);
        margin-top: 5px;
      }
    `}
  
  ${(p) =>
    p.$themeId === "botanical" &&
    css`
      background: ${p.$included ? "#8B9D83" : "rgba(255,255,255,0.1)"};
      border-radius: 20px;

      .package {
        font-family: "Lato", sans-serif;
        font-size: 0.75rem;
        font-weight: 600;
        color: ${p.$included
          ? "rgba(255,255,255,0.8)"
          : "rgba(255,255,255,0.5)"};
        margin-bottom: 10px;
      }

      .price {
        font-family: "Playfair Display", Georgia, serif;
        font-size: 1.6rem;
        color: #ffffff;
      }

      .note {
        font-family: "Lato", sans-serif;
        font-size: 0.7rem;
        color: rgba(255, 255, 255, 0.6);
        margin-top: 5px;
      }
    `}
  
  ${(p) =>
    p.$themeId === "contemporary" &&
    css`
      background: ${p.$included ? "#4ECDC4" : "#F5F5F5"};
      border: 3px solid #0d0d0d;

      .package {
        font-family: "Space Grotesk", sans-serif;
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        color: ${p.$included ? "#0D0D0D" : "#666"};
        margin-bottom: 8px;
      }

      .price {
        font-family: "Space Grotesk", sans-serif;
        font-size: 1.8rem;
        font-weight: 700;
        color: #0d0d0d;
      }

      .note {
        font-family: "Space Grotesk", sans-serif;
        font-size: 0.7rem;
        color: ${p.$included ? "rgba(0,0,0,0.6)" : "#999"};
        margin-top: 5px;
      }
    `}
  
  ${(p) =>
    p.$themeId === "luxe" &&
    css`
      border: 1px solid ${p.$included ? "#B4A08C" : "rgba(180,160,140,0.2)"};
      background: ${p.$included ? "rgba(180,160,140,0.05)" : "transparent"};

      .package {
        font-family: "Montserrat", sans-serif;
        font-size: 0.55rem;
        letter-spacing: 0.3em;
        text-transform: uppercase;
        color: #b4a08c;
        margin-bottom: 10px;
      }

      .price {
        font-family: "Cormorant Garamond", Georgia, serif;
        font-size: 1.6rem;
        font-weight: 300;
        color: ${p.$included ? "#B4A08C" : "#2A2A2A"};
      }

      .note {
        font-family: "Montserrat", sans-serif;
        font-size: 0.6rem;
        color: #888;
        margin-top: 5px;
      }
    `}
  
  ${(p) =>
    p.$themeId === "neon" &&
    css`
      background: ${p.$included
        ? "rgba(0,255,255,0.1)"
        : "rgba(255,255,255,0.02)"};
      border: 1px solid ${p.$included ? "#00ffff" : "rgba(0,255,255,0.1)"};

      .package {
        font-family: "Space Grotesk", sans-serif;
        font-size: 0.65rem;
        font-weight: 600;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        color: ${p.$included ? "#00ffff" : "rgba(255,255,255,0.4)"};
        margin-bottom: 10px;
      }

      .price {
        font-family: "Space Grotesk", sans-serif;
        font-size: 1.6rem;
        font-weight: 700;
        color: ${p.$included ? "#00ffff" : "#FFFFFF"};
        ${p.$included &&
        css`
          text-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
        `}
      }

      .note {
        font-family: "Space Grotesk", sans-serif;
        font-size: 0.65rem;
        color: rgba(255, 255, 255, 0.4);
        margin-top: 5px;
      }
    `}
`

const IncludedBadge = styled.div`
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.6rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 4px 12px;
  white-space: nowrap;

  ${(p) =>
    p.$themeId === "editorial" &&
    css`
      background: #ff6b6b;
      color: #ffffff;
    `}
  ${(p) =>
    p.$themeId === "video" &&
    css`
      background: #d4af37;
      color: #0a0a0a;
    `}
  ${(p) =>
    p.$themeId === "botanical" &&
    css`
      background: #ffffff;
      color: #2d3b2d;
      border-radius: 10px;
    `}
  ${(p) =>
    p.$themeId === "contemporary" &&
    css`
      background: #ff6b6b;
      color: #ffffff;
    `}
  ${(p) =>
    p.$themeId === "luxe" &&
    css`
      background: #2a2a2a;
      color: #ffffff;
    `}
  ${(p) =>
    p.$themeId === "neon" &&
    css`
      background: #ff00ff;
      color: #ffffff;
    `}
`

// ============================================
// MAIN COMPONENT
// ============================================

function SaveTheDateSection() {
  const { currentTheme } = useTheme()
  const sectionRef = useRef(null)
  const [parallaxOffset, setParallaxOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const scrollProgress = -rect.top / window.innerHeight
        setParallaxOffset(scrollProgress * 80)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const features = [
    {
      icon: "🚀",
      text: "Sofort live – noch bevor eure Hauptwebsite fertig ist",
    },
    { icon: "🔗", text: "Läuft unter eurer finalen Domain (sarah-und-max.de)" },
    { icon: "⏰", text: "Live-Countdown bis zum großen Tag" },
    { icon: "📍", text: "Location-Teaser mit Save-the-Date Nachricht" },
    { icon: "🔄", text: "Nahtloser Übergang zur fertigen Website" },
  ]

  const pricingData = [
    { package: "Essential", price: "+€250", note: "Aufpreis", included: false },
    { package: "Premium", price: "+€125", note: "Aufpreis", included: false },
    {
      package: "Luxe",
      price: "Inklusive",
      note: "Im Paket enthalten",
      included: true,
    },
  ]

  const renderPreview = () => {
    switch (currentTheme) {
      case "editorial":
        return (
          <EditorialPreview>
            <EditorialPreviewContent>
              <div className='date-label'>Save the Date</div>
              <div className='names'>Sarah & Thomas</div>
              <div className='date'>15. August 2026</div>
              <div className='location'>Schloss Heidelberg</div>
              <div className='countdown'>
                <div className='countdown-item'>
                  <div className='number'>186</div>
                  <div className='label'>Tage</div>
                </div>
                <div className='countdown-item'>
                  <div className='number'>12</div>
                  <div className='label'>Stunden</div>
                </div>
                <div className='countdown-item'>
                  <div className='number'>34</div>
                  <div className='label'>Minuten</div>
                </div>
              </div>
            </EditorialPreviewContent>
          </EditorialPreview>
        )

      case "video":
        return (
          <VideoPreview>
            <VideoPreviewContent>
              <div className='monogram'>S & T</div>
              <div className='save-the-date'>Save the Date</div>
              <div className='date'>15. August 2026</div>
              <div className='location'>Schloss Heidelberg · Deutschland</div>
              <div className='divider' />
              <div className='message'>Einladung folgt</div>
            </VideoPreviewContent>
          </VideoPreview>
        )

      case "botanical":
        return (
          <BotanicalPreview>
            <BotanicalPreviewContent>
              <div className='wreath'>💐</div>
              <div className='names'>Sarah & Thomas</div>
              <div className='date'>15. August 2026</div>
              <div className='location'>Schloss Heidelberg</div>
              <div className='badge'>Einladung folgt</div>
            </BotanicalPreviewContent>
          </BotanicalPreview>
        )

      case "contemporary":
        return (
          <ContemporaryPreview>
            <ContemporaryPreviewContent>
              <div className='header'>
                <div className='save'>SAVE THE DATE</div>
                <div className='date-big'>
                  15
                  <span>AUG</span>
                  26
                </div>
              </div>
              <div className='names'>
                Sarah <span>&</span> Thomas
              </div>
              <div className='location'>
                SCHLOSS HEIDELBERG {"// "}DEUTSCHLAND
              </div>
            </ContemporaryPreviewContent>
          </ContemporaryPreview>
        )

      case "luxe":
        return (
          <LuxePreview>
            <LuxePreviewContent>
              <div className='top-line' />
              <div className='save-the-date'>Save the Date</div>
              <div className='names'>Sarah & Thomas</div>
              <div className='date'>15. August 2026</div>
              <div className='location'>Schloss Heidelberg</div>
            </LuxePreviewContent>
          </LuxePreview>
        )

      case "neon":
        return (
          <NeonPreview>
            <NeonPreviewContent>
              <div className='terminal-header'>
                <span>●</span> save_the_date.exe running...
              </div>
              <div className='date-display'>15.08.26</div>
              <div className='names'>SARAH & THOMAS</div>
              <div className='location'>{"// "}SCHLOSS HEIDELBERG</div>
              <div className='status'>INVITATION PENDING</div>
            </NeonPreviewContent>
          </NeonPreview>
        )

      default:
        return null
    }
  }

  const renderParallax = () => {
    switch (currentTheme) {
      case "video":
        return (
          <ParallaxBg>
            <GlowOrb
              $top='10%'
              $left='5%'
              $size='300px'
              $offset={parallaxOffset * 0.3}
              $color='rgba(212,175,55,0.08)'
            />
            <GlowOrb
              $top='60%'
              $right='10%'
              $size='250px'
              $offset={parallaxOffset * 0.5}
              $color='rgba(212,175,55,0.06)'
            />
          </ParallaxBg>
        )
      case "botanical":
        return (
          <ParallaxBg>
            <FloatingElement
              $top='10%'
              $left='5%'
              $size='50px'
              $offset={parallaxOffset * 0.3}
              $opacity={0.2}
            >
              🌿
            </FloatingElement>
            <FloatingElement
              $top='40%'
              $right='8%'
              $size='40px'
              $offset={parallaxOffset * 0.5}
              $delay='1s'
              $opacity={0.15}
            >
              🌸
            </FloatingElement>
            <FloatingElement
              $bottom='15%'
              $left='10%'
              $size='45px'
              $offset={parallaxOffset * 0.4}
              $delay='2s'
              $opacity={0.18}
            >
              💐
            </FloatingElement>
          </ParallaxBg>
        )
      case "neon":
        return (
          <ParallaxBg>
            <GlowOrb
              $top='20%'
              $left='5%'
              $size='250px'
              $offset={parallaxOffset * 0.3}
              $color='rgba(0,255,255,0.05)'
            />
            <GlowOrb
              $top='50%'
              $right='10%'
              $size='200px'
              $offset={parallaxOffset * 0.5}
              $color='rgba(255,0,255,0.05)'
            />
          </ParallaxBg>
        )
      default:
        return null
    }
  }

  return (
    <Section ref={sectionRef} $themeId={currentTheme} id='save-the-date'>
      {renderParallax()}

      <Container>
        <Header>
          <Eyebrow $themeId={currentTheme}>Optional</Eyebrow>
          <Title $themeId={currentTheme}>
            {currentTheme === "contemporary"
              ? "SAVE THE DATE PAGE"
              : currentTheme === "neon"
                ? "SAVE_THE_DATE.exe"
                : "Save the Date Seite"}
          </Title>
          <Subtitle $themeId={currentTheme}>
            Baut schon vor dem Go-Live eurer Hauptwebsite Vorfreude auf. Eure
            persönliche Save the Date Seite läuft unter eurer finalen Domain.
          </Subtitle>
        </Header>

        <ContentGrid>
          <PreviewContainer>{renderPreview()}</PreviewContainer>

          <FeaturesContainer $themeId={currentTheme}>
            <FeatureTitle $themeId={currentTheme}>
              {currentTheme === "contemporary"
                ? "WHAT YOU GET"
                : currentTheme === "neon"
                  ? "// FEATURES"
                  : "Das bekommt ihr"}
            </FeatureTitle>

            <FeatureList>
              {features.map((feature, index) => (
                <FeatureItem key={index} $themeId={currentTheme}>
                  <span className='icon'>{feature.icon}</span>
                  <span className='text'>{feature.text}</span>
                </FeatureItem>
              ))}
            </FeatureList>

            <PricingGrid>
              {pricingData.map((item, index) => (
                <PricingBox
                  key={index}
                  $themeId={currentTheme}
                  $included={item.included}
                >
                  {item.included && (
                    <IncludedBadge $themeId={currentTheme}>
                      Inklusive
                    </IncludedBadge>
                  )}
                  <div className='package'>{item.package}</div>
                  <div className='price'>{item.price}</div>
                  <div className='note'>{item.note}</div>
                </PricingBox>
              ))}
            </PricingGrid>
          </FeaturesContainer>
        </ContentGrid>
      </Container>
    </Section>
  )
}

export default SaveTheDateSection

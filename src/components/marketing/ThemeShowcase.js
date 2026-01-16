// src/components/marketing/ThemeShowcase.js
import { useState } from "react"
import styled from "styled-components"

const Section = styled.section`
  padding: 8rem 4rem;
  background: #fafafa;

  @media (max-width: 768px) {
    padding: 4rem 2rem;
  }
`

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 5rem;
`

const Eyebrow = styled.div`
  font-family: "Inter", sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: #666666;
  margin-bottom: 1.5rem;
`

const Title = styled.h2`
  font-family: "Instrument Serif", serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 400;
  color: #000000;
  margin-bottom: 1.5rem;

  span {
    font-style: italic;
  }
`

const Subtitle = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  color: #666666;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.8;
`

const ThemeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    max-width: 600px;
  }
`

const ThemeCard = styled.div`
  position: relative;
  cursor: pointer;
  transition: all 0.5s ease;

  &:hover {
    transform: translateY(-10px);
  }

  &:hover .theme-preview {
    transform: scale(1.02);
  }

  &:hover .theme-overlay {
    opacity: 1;
  }
`

const ThemePreview = styled.div`
  aspect-ratio: 3/4;
  overflow: hidden;
  position: relative;
  transition: transform 0.5s ease;
`

const ThemeImage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  transition: all 0.5s ease;

  /* Gold Theme */
  ${(props) =>
    props.theme === "gold" &&
    `
    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
    color: #d4af37;
    font-family: 'Playfair Display', serif;
  `}

  /* Editorial Theme */
  ${(props) =>
    props.theme === "editorial" &&
    `
    background: #FFFFFF;
    color: #000000;
    font-family: 'Instrument Serif', serif;
    border: 1px solid #E5E5E5;
  `}

  /* Botanical Theme */
  ${(props) =>
    props.theme === "botanical" &&
    `
    background: linear-gradient(135deg, #FAF7F0 0%, #FEFDF8 100%);
    color: #7D9D7C;
    font-family: 'Cormorant Garamond', serif;
  `}
`

const PreviewNames = styled.div`
  font-size: 2.5rem;
  font-weight: 400;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
  text-align: center;

  span {
    font-style: italic;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`

const PreviewDate = styled.div`
  font-size: 0.8rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  opacity: 0.7;
  margin-bottom: 2rem;
`

const PreviewDivider = styled.div`
  width: 60px;
  height: 1px;
  background: currentColor;
  opacity: 0.5;
  margin-bottom: 2rem;
`

const PreviewQuote = styled.div`
  font-size: 1rem;
  font-style: italic;
  text-align: center;
  opacity: 0.8;
  line-height: 1.6;
`

const ThemeOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.4s ease;
`

const ViewButton = styled.span`
  font-family: "Inter", sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #ffffff;
  padding: 1rem 2rem;
  border: 1px solid #ffffff;
  transition: all 0.3s ease;

  &:hover {
    background: #ffffff;
    color: #000000;
  }
`

const ThemeInfo = styled.div`
  padding: 2rem 0.5rem;
`

const ThemeName = styled.h3`
  font-family: "Instrument Serif", serif;
  font-size: 1.8rem;
  font-weight: 400;
  color: #000000;
  margin-bottom: 0.5rem;
`

const ThemeDescription = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 0.9rem;
  color: #666666;
  line-height: 1.6;
`

const ThemeFeatures = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
`

const FeatureTag = styled.span`
  font-family: "Inter", sans-serif;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #666666;
  padding: 0.4rem 0.8rem;
  background: #ffffff;
  border: 1px solid #e5e5e5;
`

const themes = [
  {
    id: "gold",
    name: "Gold Luxury",
    description:
      "Opulente Eleganz mit goldenen Akzenten auf dunklem Grund. Für Paare, die das Besondere lieben.",
    features: ["Dunkel & Elegant", "Gold-Akzente", "Serif-Typografie"],
    quote: '"Zusammen ist unser liebster Ort"',
  },
  {
    id: "editorial",
    name: "Editorial",
    description:
      "Zeitlose Klarheit in Schwarz-Weiß. Minimalistisch, modern, magazin-würdig.",
    features: ["Schwarz & Weiß", "Clean Design", "Magazin-Style"],
    quote: '"Two souls, one story"',
  },
  {
    id: "botanical",
    name: "Botanical Garden",
    description:
      "Natürliche Romantik mit sanften Grüntönen und floralen Elementen. Organic und warm.",
    features: ["Natur-Töne", "Soft & Romantic", "Organic Feel"],
    quote: '"Wo die Liebe wächst"',
  },
]

function ThemeShowcase() {
  const [hoveredTheme, setHoveredTheme] = useState(null)

  return (
    <Section id='themes'>
      <SectionHeader>
        <Eyebrow>Unsere Design-Welten</Eyebrow>
        <Title>
          Drei <span>Themes</span>, unendliche Möglichkeiten
        </Title>
        <Subtitle>
          Jedes unserer Themes ist mehr als nur ein Design – es ist eine eigene
          Welt, die eure Geschichte auf einzigartige Weise erzählt.
        </Subtitle>
      </SectionHeader>

      <ThemeGrid>
        {themes.map((theme) => (
          <ThemeCard
            key={theme.id}
            onMouseEnter={() => setHoveredTheme(theme.id)}
            onMouseLeave={() => setHoveredTheme(null)}
          >
            <ThemePreview className='theme-preview'>
              <ThemeImage theme={theme.id}>
                <PreviewNames>
                  Anna <span>&</span> Max
                </PreviewNames>
                <PreviewDate>15. Juni 2026</PreviewDate>
                <PreviewDivider />
                <PreviewQuote>{theme.quote}</PreviewQuote>
              </ThemeImage>

              <ThemeOverlay className='theme-overlay'>
                <ViewButton>Theme ansehen</ViewButton>
              </ThemeOverlay>
            </ThemePreview>

            <ThemeInfo>
              <ThemeName>{theme.name}</ThemeName>
              <ThemeDescription>{theme.description}</ThemeDescription>
              <ThemeFeatures>
                {theme.features.map((feature) => (
                  <FeatureTag key={feature}>{feature}</FeatureTag>
                ))}
              </ThemeFeatures>
            </ThemeInfo>
          </ThemeCard>
        ))}
      </ThemeGrid>
    </Section>
  )
}

export default ThemeShowcase

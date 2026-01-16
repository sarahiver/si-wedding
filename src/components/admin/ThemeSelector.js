// src/components/admin/ThemeSelector.js
import styled from "styled-components"
import { THEMES } from "../../utils/constants"

const Container = styled.div`
  margin-bottom: 3rem;
`

const Title = styled.h2`
  font-family: ${(props) => props.theme.fontHeading};
  font-size: 1.8rem;
  color: ${(props) => props.theme.primary};
  margin-bottom: 0.5rem;
  letter-spacing: 0.05em;
`

const Subtitle = styled.p`
  color: ${(props) => props.theme.textSecondary};
  margin-bottom: 2rem;
  font-size: 0.9rem;
`

const ThemeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const ThemeCard = styled.div`
  padding: 2rem;
  border: 2px solid
    ${(props) => (props.selected ? props.theme.primary : props.theme.border)};
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  border-radius: ${(props) => props.theme.cardRadius};
  background: ${(props) =>
    props.selected ? props.theme.surface : props.theme.background};
  position: relative;

  &:hover {
    border-color: ${(props) => props.theme.primary};
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
`

const CheckMark = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 30px;
  height: 30px;
  background: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.background};
  border-radius: 50%;
  display: ${(props) => (props.show ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1rem;
`

const ThemePreview = styled.div`
  width: 100%;
  height: 120px;
  margin-bottom: 1rem;
  border-radius: calc(${(props) => props.theme.cardRadius} / 2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 700;
  background: ${(props) => props.background};
  color: ${(props) => props.color};
  border: ${(props) => (props.border ? `1px solid ${props.border}` : "none")};
`

const ThemeName = styled.div`
  font-family: ${(props) => props.theme.fontHeading};
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: ${(props) => props.theme.text};
`

const ThemeDescription = styled.div`
  font-size: 0.85rem;
  color: ${(props) => props.theme.textSecondary};
`

function ThemeSelector({ selectedTheme, onThemeChange }) {
  return (
    <Container>
      <Title>Design-Theme wählen</Title>
      <Subtitle>
        Das gewählte Theme wird für das gesamte Kundenerlebnis verwendet
        (Formular, Rechnung, Website).
      </Subtitle>

      <ThemeGrid>
        {Object.values(THEMES).map((theme) => (
          <ThemeCard
            key={theme.id}
            selected={selectedTheme === theme.id}
            onClick={() => onThemeChange(theme.id)}
          >
            <CheckMark show={selectedTheme === theme.id}>✓</CheckMark>

            <ThemePreview
              background={
                theme.id === "gold"
                  ? "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)"
                  : theme.id === "editorial"
                  ? "linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 100%)"
                  : "linear-gradient(135deg, #FAF7F0 0%, #FEFDF8 100%)"
              }
              color={theme.color}
              border={theme.id === "editorial" ? "#E5E5E5" : null}
            >
              {theme.id === "botanical" ? "S&I 🌿" : "S&I"}
            </ThemePreview>

            <ThemeName>{theme.name}</ThemeName>
            <ThemeDescription>{theme.description}</ThemeDescription>
          </ThemeCard>
        ))}
      </ThemeGrid>
    </Container>
  )
}

export default ThemeSelector

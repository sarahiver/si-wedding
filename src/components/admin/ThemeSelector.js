// src/components/admin/ThemeSelector.js
import styled from "styled-components"
import { THEMES, THEME_PREVIEWS } from "../../utils/constants"

const Container = styled.div``

const ThemeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
`

const ThemeCard = styled.div`
  background: ${props => props.preview?.background || '#F5F5F5'};
  border: 3px solid ${props => props.selected ? props.preview?.color || '#1A1A1A' : 'transparent'};
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 8px;
  text-align: center;
  min-height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  }

  ${props => props.selected && `
    &::after {
      content: '✓';
      position: absolute;
      top: 10px;
      right: 10px;
      width: 24px;
      height: 24px;
      background: ${props.preview?.color || '#1A1A1A'};
      color: ${props.preview?.background?.includes('#0') || props.preview?.background?.includes('#1') ? '#FFFFFF' : '#FFFFFF'};
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      font-weight: 700;
    }
  `}
`

const ThemePreviewText = styled.div`
  font-family: ${props => props.fontFamily || "'Cormorant Garamond', serif"};
  font-size: 1.8rem;
  font-weight: 400;
  color: ${props => props.color || '#1A1A1A'};
  margin-bottom: 0.5rem;
`

const ThemeName = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${props => props.color || '#1A1A1A'};
  opacity: 0.8;
`

const ThemeDescription = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  color: ${props => props.color || '#666'};
  opacity: 0.6;
  margin-top: 0.3rem;
`

function ThemeSelector({ selectedTheme, onThemeChange }) {
  return (
    <Container>
      <ThemeGrid>
        {Object.values(THEMES).map(theme => {
          const preview = THEME_PREVIEWS[theme.id] || {}
          const isSelected = selectedTheme === theme.id

          return (
            <ThemeCard
              key={theme.id}
              selected={isSelected}
              preview={preview}
              onClick={() => onThemeChange(theme.id)}
            >
              <ThemePreviewText 
                fontFamily={preview.fontFamily} 
                color={preview.color}
              >
                {preview.text || 'S & I'}
              </ThemePreviewText>
              <ThemeName color={preview.color}>{theme.name}</ThemeName>
              <ThemeDescription color={preview.color}>
                {theme.description}
              </ThemeDescription>
            </ThemeCard>
          )
        })}
      </ThemeGrid>
    </Container>
  )
}

export default ThemeSelector

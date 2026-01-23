// src/components/admin/ComponentCheckboxes.js
import styled from "styled-components"
import {
  OPTIONAL_COMPONENTS,
  CORE_COMPONENTS,
  PACKAGES,
} from "../../utils/constants"

const Container = styled.div``

const SectionLabel = styled.div`
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #999;
  margin-bottom: 1rem;
  font-family: 'Inter', sans-serif;
`

const ComponentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`

const ComponentCard = styled.div`
  background: ${props => props.disabled ? '#F5F5F5' : props.selected ? '#F0F7FF' : '#FFFFFF'};
  border: 2px solid ${props => props.selected ? '#2196F3' : props.locked ? '#4CAF50' : '#E0E0E0'};
  padding: 1rem 1.25rem;
  cursor: ${props => props.disabled || props.locked ? 'default' : 'pointer'};
  transition: all 0.2s ease;
  border-radius: 8px;
  opacity: ${props => props.disabled ? 0.6 : 1};
  position: relative;

  &:hover {
    ${props => !props.disabled && !props.locked && `
      border-color: #2196F3;
    `}
  }
`

const LockedBadge = styled.div`
  position: absolute;
  top: -8px;
  right: 10px;
  background: #4CAF50;
  color: #FFFFFF;
  padding: 0.2rem 0.6rem;
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  border-radius: 4px;
  font-family: 'Inter', sans-serif;
`

const CheckboxRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
`

const Checkbox = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid ${props => props.checked ? '#2196F3' : props.locked ? '#4CAF50' : '#CCC'};
  background: ${props => props.checked || props.locked ? (props.locked ? '#4CAF50' : '#2196F3') : 'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 4px;
  transition: all 0.2s ease;
  margin-top: 2px;

  &::after {
    content: "${props => props.locked ? '🔒' : '✓'}";
    color: #FFFFFF;
    font-size: ${props => props.locked ? '0.6rem' : '0.75rem'};
    font-weight: 700;
    opacity: ${props => props.checked || props.locked ? 1 : 0};
  }
`

const ComponentInfo = styled.div`
  flex: 1;
`

const ComponentName = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  color: #1A1A1A;
  margin-bottom: 0.2rem;
  font-family: 'Inter', sans-serif;
`

const ComponentDescription = styled.div`
  font-size: 0.75rem;
  color: #666;
  line-height: 1.4;
  font-family: 'Inter', sans-serif;
`

const Divider = styled.div`
  height: 1px;
  background: #E0E0E0;
  margin: 1.5rem 0;
`

const LimitInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: ${props => props.warning ? '#FFF3E0' : '#F5F5F5'};
  border: 1px solid ${props => props.warning ? '#FFB74D' : '#E0E0E0'};
  border-radius: 8px;
  margin-top: 1rem;
`

const LimitText = styled.div`
  font-size: 0.85rem;
  color: ${props => props.warning ? '#E65100' : '#666'};
  font-family: 'Inter', sans-serif;
`

const LimitCount = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${props => props.warning ? '#E65100' : '#1A1A1A'};
  font-family: 'Inter', sans-serif;
`

function ComponentCheckboxes({ selectedComponents, onComponentsChange, selectedPackage }) {
  const pkg = PACKAGES[selectedPackage]
  const maxOptional = pkg ? pkg.maxOptionalComponents : 999

  // Count selected optional components
  const selectedOptionalCount = OPTIONAL_COMPONENTS.filter(
    comp => selectedComponents[comp.id]
  ).length

  const isLimitReached = selectedOptionalCount >= maxOptional && maxOptional !== 999

  const handleToggle = (componentId) => {
    // Check if trying to enable when limit is reached
    if (!selectedComponents[componentId] && isLimitReached) {
      return
    }

    onComponentsChange({
      ...selectedComponents,
      [componentId]: !selectedComponents[componentId]
    })
  }

  return (
    <Container>
      {/* Core Components - Always Included */}
      <SectionLabel>✨ Immer inklusive (Basis-Komponenten)</SectionLabel>
      <ComponentsGrid>
        {CORE_COMPONENTS.map(component => (
          <ComponentCard key={component.id} locked>
            <LockedBadge>Inklusive</LockedBadge>
            <CheckboxRow>
              <Checkbox checked locked />
              <ComponentInfo>
                <ComponentName>{component.name}</ComponentName>
                <ComponentDescription>{component.description}</ComponentDescription>
              </ComponentInfo>
            </CheckboxRow>
          </ComponentCard>
        ))}
      </ComponentsGrid>

      <Divider />

      {/* Optional Components */}
      <SectionLabel>
        🎨 Optionale Komponenten
        {maxOptional !== 999 && ` (max. ${maxOptional} im ${pkg?.name}-Paket)`}
      </SectionLabel>
      <ComponentsGrid>
        {OPTIONAL_COMPONENTS.map(component => {
          const isSelected = selectedComponents[component.id]
          const isDisabled = !isSelected && isLimitReached

          return (
            <ComponentCard
              key={component.id}
              selected={isSelected}
              disabled={isDisabled}
              onClick={() => !isDisabled && handleToggle(component.id)}
            >
              <CheckboxRow>
                <Checkbox checked={isSelected} />
                <ComponentInfo>
                  <ComponentName>{component.name}</ComponentName>
                  <ComponentDescription>{component.description}</ComponentDescription>
                </ComponentInfo>
              </CheckboxRow>
            </ComponentCard>
          )
        })}
      </ComponentsGrid>

      {/* Limit Info */}
      {maxOptional !== 999 && (
        <LimitInfo warning={isLimitReached}>
          <LimitText warning={isLimitReached}>
            {isLimitReached 
              ? `⚠️ Limit erreicht! Deaktiviere eine Komponente um eine andere zu aktivieren.`
              : `Optionale Komponenten ausgewählt:`
            }
          </LimitText>
          <LimitCount warning={isLimitReached}>
            {selectedOptionalCount} / {maxOptional}
          </LimitCount>
        </LimitInfo>
      )}
    </Container>
  )
}

export default ComponentCheckboxes

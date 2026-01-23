// src/components/admin/AddonsSelector.js
import styled from "styled-components"
import { ADDONS } from "../../utils/constants"

const Container = styled.div``

const AddonsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
`

const AddonCard = styled.div`
  background: ${props => props.selected ? '#F0F7FF' : '#FAFAFA'};
  border: 2px solid ${props => props.selected ? '#2196F3' : '#E0E0E0'};
  padding: 1.25rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 8px;
  display: flex;
  gap: 1rem;
  align-items: flex-start;

  &:hover {
    border-color: ${props => props.selected ? '#2196F3' : '#999'};
  }
`

const Checkbox = styled.div`
  width: 22px;
  height: 22px;
  border: 2px solid ${props => props.checked ? '#2196F3' : '#CCC'};
  background: ${props => props.checked ? '#2196F3' : 'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 4px;
  transition: all 0.2s ease;

  &::after {
    content: "✓";
    color: #FFFFFF;
    font-size: 0.8rem;
    font-weight: 700;
    opacity: ${props => props.checked ? 1 : 0};
  }
`

const AddonInfo = styled.div`
  flex: 1;
`

const AddonName = styled.div`
  font-size: 0.95rem;
  font-weight: 600;
  color: #1A1A1A;
  margin-bottom: 0.3rem;
  font-family: 'Inter', sans-serif;
`

const AddonDescription = styled.div`
  font-size: 0.8rem;
  color: #666;
  line-height: 1.4;
  font-family: 'Inter', sans-serif;
`

const AddonPrice = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: ${props => props.selected ? '#2196F3' : '#1A1A1A'};
  white-space: nowrap;
  font-family: 'Inter', sans-serif;
`

const TotalSection = styled.div`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #E0E0E0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const TotalLabel = styled.div`
  font-size: 0.9rem;
  color: #666;
  font-family: 'Inter', sans-serif;
`

const TotalPrice = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  color: #1A1A1A;
  font-family: 'Inter', sans-serif;
`

function AddonsSelector({ selectedAddons, onAddonsChange }) {
  const handleToggle = (addonId) => {
    onAddonsChange({
      ...selectedAddons,
      [addonId]: !selectedAddons[addonId]
    })
  }

  const totalAddonsPrice = ADDONS.reduce((total, addon) => {
    return total + (selectedAddons[addon.id] ? addon.price : 0)
  }, 0)

  const selectedCount = Object.values(selectedAddons).filter(Boolean).length

  return (
    <Container>
      <AddonsGrid>
        {ADDONS.map(addon => {
          const isSelected = selectedAddons[addon.id] || false
          
          return (
            <AddonCard
              key={addon.id}
              selected={isSelected}
              onClick={() => handleToggle(addon.id)}
            >
              <Checkbox checked={isSelected} />
              <AddonInfo>
                <AddonName>{addon.name}</AddonName>
                <AddonDescription>{addon.description}</AddonDescription>
              </AddonInfo>
              <AddonPrice selected={isSelected}>+{addon.price}€</AddonPrice>
            </AddonCard>
          )
        })}
      </AddonsGrid>

      {selectedCount > 0 && (
        <TotalSection>
          <TotalLabel>{selectedCount} Add-on{selectedCount > 1 ? 's' : ''} ausgewählt</TotalLabel>
          <TotalPrice>+{totalAddonsPrice.toLocaleString('de-DE')} €</TotalPrice>
        </TotalSection>
      )}
    </Container>
  )
}

export default AddonsSelector

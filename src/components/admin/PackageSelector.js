// src/components/admin/PackageSelector.js
import styled from "styled-components"
import { PACKAGES } from "../../utils/constants"

const Container = styled.div``

const PackageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
`

const PackageCard = styled.div`
  background: #FFFFFF;
  border: 2px solid ${props => props.selected ? '#1A1A1A' : '#E0E0E0'};
  padding: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 8px;
  position: relative;
  text-align: center;

  ${props => props.popular && `
    border-color: #FF6B6B;
  `}

  ${props => props.selected && `
    background: #FAFAFA;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  `}

  &:hover {
    border-color: ${props => props.selected ? '#1A1A1A' : '#999'};
    transform: translateY(-3px);
  }
`

const PopularBadge = styled.div`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: #FF6B6B;
  color: #FFFFFF;
  padding: 0.4rem 1rem;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border-radius: 20px;
  font-family: 'Inter', sans-serif;
`

const SelectedBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 28px;
  height: 28px;
  background: #1A1A1A;
  color: #FFFFFF;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 700;
`

const PackageName = styled.h3`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.6rem;
  font-weight: 400;
  color: #1A1A1A;
  margin-bottom: 0.3rem;
`

const PackageDescription = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 1rem;
`

const PackagePrice = styled.div`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 2.5rem;
  font-weight: 400;
  color: #1A1A1A;
  margin-bottom: 0.3rem;

  span {
    font-size: 1rem;
    color: #666;
  }
`

const PriceNote = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  color: #999;
  margin-bottom: 1.5rem;
`

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
`

const Feature = styled.li`
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: #333;
  padding: 0.5rem 0;
  border-bottom: 1px solid #F0F0F0;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:last-child {
    border-bottom: none;
  }

  &::before {
    content: '✓';
    color: #4CAF50;
    font-weight: 700;
  }
`

const ComponentLimit = styled.div`
  margin-top: 1rem;
  padding: 0.8rem;
  background: #F5F5F5;
  border-radius: 6px;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: #666;

  strong {
    color: #1A1A1A;
  }
`

function PackageSelector({ selectedPackage, onPackageChange }) {
  return (
    <Container>
      <PackageGrid>
        {Object.values(PACKAGES).map(pkg => {
          const isSelected = selectedPackage === pkg.id

          return (
            <PackageCard
              key={pkg.id}
              selected={isSelected}
              popular={pkg.popular}
              onClick={() => onPackageChange(pkg.id)}
            >
              {pkg.popular && <PopularBadge>Bestseller</PopularBadge>}
              {isSelected && <SelectedBadge>✓</SelectedBadge>}

              <PackageName>{pkg.name}</PackageName>
              <PackageDescription>{pkg.description}</PackageDescription>

              <PackagePrice>
                {pkg.price.toLocaleString('de-DE')} <span>€</span>
              </PackagePrice>
              <PriceNote>zzgl. MwSt.</PriceNote>

              <FeatureList>
                {pkg.features.map((feature, idx) => (
                  <Feature key={idx}>{feature}</Feature>
                ))}
              </FeatureList>

              <ComponentLimit>
                <strong>
                  {pkg.maxOptionalComponents === 999 
                    ? 'Unbegrenzte' 
                    : pkg.maxOptionalComponents
                  }
                </strong> optionale Komponenten
              </ComponentLimit>
            </PackageCard>
          )
        })}
      </PackageGrid>
    </Container>
  )
}

export default PackageSelector

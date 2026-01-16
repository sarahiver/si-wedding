// src/components/marketing/PricingSection.js
import styled from "styled-components"

const Section = styled.section`
  padding: 8rem 4rem;
  background: #ffffff;

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

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    max-width: 400px;
  }
`

const PricingCard = styled.div`
  background: ${(props) => (props.featured ? "#000000" : "#FFFFFF")};
  color: ${(props) => (props.featured ? "#FFFFFF" : "#000000")};
  border: 1px solid ${(props) => (props.featured ? "#000000" : "#E5E5E5")};
  padding: 3rem 2rem;
  position: relative;
  transition: all 0.4s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }
`

const PopularBadge = styled.div`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  font-family: "Inter", sans-serif;
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  background: #ffffff;
  color: #000000;
  padding: 0.5rem 1rem;
  border: 1px solid #000000;
`

const PackageName = styled.h3`
  font-family: "Instrument Serif", serif;
  font-size: 1.8rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
`

const PackageTagline = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 0.8rem;
  color: ${(props) => (props.featured ? "rgba(255,255,255,0.7)" : "#666666")};
  margin-bottom: 2rem;
`

const Price = styled.div`
  font-family: "Instrument Serif", serif;
  font-size: 3rem;
  font-weight: 400;
  margin-bottom: 0.5rem;

  span {
    font-size: 1rem;
    font-family: "Inter", sans-serif;
  }
`

const PriceNote = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 0.75rem;
  color: ${(props) => (props.featured ? "rgba(255,255,255,0.5)" : "#999999")};
  margin-bottom: 2rem;
`

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: ${(props) =>
    props.featured ? "rgba(255,255,255,0.2)" : "#E5E5E5"};
  margin: 2rem 0;
`

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
`

const Feature = styled.li`
  font-family: "Inter", sans-serif;
  font-size: 0.85rem;
  color: ${(props) => (props.featured ? "rgba(255,255,255,0.9)" : "#333333")};
  padding: 0.6rem 0;
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  line-height: 1.4;

  &::before {
    content: "✓";
    font-weight: 700;
    color: ${(props) => (props.featured ? "#FFFFFF" : "#000000")};
    flex-shrink: 0;
  }
`

const CTAButton = styled.a`
  display: block;
  text-align: center;
  font-family: "Inter", sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  padding: 1rem 1.5rem;
  text-decoration: none;
  transition: all 0.3s ease;

  background: ${(props) => (props.featured ? "#FFFFFF" : "transparent")};
  color: ${(props) => (props.featured ? "#000000" : "#000000")};
  border: 1px solid ${(props) => (props.featured ? "#FFFFFF" : "#000000")};

  &:hover {
    background: ${(props) => (props.featured ? "#E5E5E5" : "#000000")};
    color: ${(props) => (props.featured ? "#000000" : "#FFFFFF")};
  }
`

const Note = styled.p`
  text-align: center;
  font-family: "Inter", sans-serif;
  font-size: 0.85rem;
  color: #666666;
  margin-top: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`

const packages = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Der perfekte Einstieg",
    price: "990",
    features: [
      "5 Komponenten nach Wahl",
      "Ein Theme eurer Wahl",
      "Responsive Design",
      "RSVP-Funktion",
      "12 Monate Hosting inkl.",
      "SSL-Verschlüsselung",
    ],
  },
  {
    id: "signature",
    name: "Signature",
    tagline: "Unser Bestseller",
    price: "1.800",
    featured: true,
    features: [
      "8 Komponenten nach Wahl",
      "Alle Themes verfügbar",
      "Responsive Design",
      "RSVP + Gästemanagement",
      "24 Monate Hosting inkl.",
      "Eigene Domain",
      "Persönliche Beratung",
    ],
  },
  {
    id: "couture",
    name: "Couture",
    tagline: "Für höchste Ansprüche",
    price: "2.800",
    features: [
      "Alle Komponenten",
      "Alle Themes + Anpassungen",
      "Premium Support",
      "RSVP + Gästemanagement",
      "36 Monate Hosting inkl.",
      "Eigene Domain",
      "Priority Support",
      "Print-Einladungen (10 Stk.)",
    ],
  },
  {
    id: "bespoke",
    name: "Bespoke",
    tagline: "100% individuell",
    price: "Ab 3.500",
    features: [
      "Komplett maßgeschneidert",
      "Individuelles Design",
      "Unbegrenzte Komponenten",
      "White-Glove Service",
      "Unbegrenztes Hosting",
      "Mehrere Domains möglich",
      "Dedicated Support",
      "Print-Suite nach Wunsch",
    ],
  },
]

function PricingSection() {
  return (
    <Section id='pakete'>
      <SectionHeader>
        <Eyebrow>Transparente Preise</Eyebrow>
        <Title>
          Unsere <span>Pakete</span>
        </Title>
        <Subtitle>
          Von elegant bis maßgeschneidert – findet das Paket, das zu eurer
          Vision passt.
        </Subtitle>
      </SectionHeader>

      <PricingGrid>
        {packages.map((pkg) => (
          <PricingCard key={pkg.id} featured={pkg.featured}>
            {pkg.featured && <PopularBadge>Beliebt</PopularBadge>}

            <PackageName>{pkg.name}</PackageName>
            <PackageTagline featured={pkg.featured}>
              {pkg.tagline}
            </PackageTagline>

            <Price>
              {pkg.price}
              <span>€</span>
            </Price>
            <PriceNote featured={pkg.featured}>zzgl. MwSt.</PriceNote>

            <Divider featured={pkg.featured} />

            <FeatureList>
              {pkg.features.map((feature) => (
                <Feature key={feature} featured={pkg.featured}>
                  {feature}
                </Feature>
              ))}
            </FeatureList>

            <CTAButton href='#kontakt' featured={pkg.featured}>
              Auswählen
            </CTAButton>
          </PricingCard>
        ))}
      </PricingGrid>

      <Note>
        Alle Pakete beinhalten persönliche Betreuung und unser Content-Formular,
        mit dem ihr eure Inhalte einfach einreichen könnt.
      </Note>
    </Section>
  )
}

export default PricingSection

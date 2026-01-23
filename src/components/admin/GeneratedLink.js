// src/components/admin/GeneratedLink.js
import { useState } from "react"
import toast from "react-hot-toast"
import styled from "styled-components"
import { THEMES, PACKAGES, ADDONS, CORE_COMPONENTS, OPTIONAL_COMPONENTS } from "../../utils/constants"

const Container = styled.div`
  background: #FFFFFF;
  border: 2px solid #4CAF50;
  padding: 2rem;
  margin-top: 2rem;
  border-radius: 8px;
  display: ${props => props.show ? "block" : "none"};
  animation: fadeIn 0.4s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #E0E0E0;
`

const StatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #E8F5E9;
  color: #2E7D32;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border-radius: 20px;
  font-family: 'Inter', sans-serif;
`

const Title = styled.h2`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.8rem;
  color: #1A1A1A;
  margin: 0;
  flex: 1;
`

const Description = styled.p`
  color: #666;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  line-height: 1.6;
  font-family: 'Inter', sans-serif;
`

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #FAFAFA;
  border-radius: 8px;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`

const LinkInput = styled.input`
  flex-grow: 1;
  background: #FFFFFF;
  border: 2px solid #E0E0E0;
  padding: 1rem 1.5rem;
  color: #1A1A1A;
  font-family: "Monaco", "Courier New", monospace;
  font-size: 0.85rem;
  border-radius: 6px;
  cursor: text;

  &:focus {
    outline: none;
    border-color: #1A1A1A;
  }

  @media (max-width: 640px) {
    width: 100%;
  }
`

const CopyButton = styled.button`
  padding: 1rem 2rem;
  background: #1A1A1A;
  color: #FFFFFF;
  border: none;
  cursor: pointer;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  transition: all 0.3s ease;
  border-radius: 6px;
  flex-shrink: 0;

  &:hover {
    background: #333;
  }

  @media (max-width: 640px) {
    width: 100%;
  }
`

// Summary Section
const SummarySection = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #E0E0E0;
`

const SummaryTitle = styled.h3`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.3rem;
  color: #1A1A1A;
  margin-bottom: 1.5rem;
`

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`

const SummaryCard = styled.div`
  background: #FAFAFA;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  padding: 1.25rem;
`

const SummaryCardTitle = styled.div`
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #999;
  margin-bottom: 0.75rem;
  font-family: 'Inter', sans-serif;
`

const SummaryCardContent = styled.div`
  font-family: 'Inter', sans-serif;
`

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.4rem 0;
  font-size: 0.85rem;
  color: #333;
  border-bottom: 1px solid #F0F0F0;

  &:last-child {
    border-bottom: none;
  }

  span:first-child {
    color: #666;
  }

  span:last-child {
    font-weight: 500;
  }
`

const ThemePreview = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

const ThemeColor = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${props => props.color};
  border: 2px solid #E0E0E0;
`

const ThemeName = styled.span`
  font-weight: 600;
  color: #1A1A1A;
`

const ComponentsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

const ComponentTag = styled.span`
  display: inline-block;
  padding: 0.3rem 0.6rem;
  background: ${props => props.core ? '#E8F5E9' : '#E3F2FD'};
  color: ${props => props.core ? '#2E7D32' : '#1565C0'};
  font-size: 0.7rem;
  font-weight: 500;
  border-radius: 4px;
`

const AddonTag = styled.span`
  display: inline-block;
  padding: 0.3rem 0.6rem;
  background: #FFF3E0;
  color: #E65100;
  font-size: 0.7rem;
  font-weight: 500;
  border-radius: 4px;
`

const PriceBox = styled.div`
  background: #1A1A1A;
  color: #FFFFFF;
  padding: 1rem 1.25rem;
  border-radius: 6px;
  margin-top: 1rem;
`

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.3rem 0;
  font-size: 0.85rem;

  &.total {
    border-top: 1px solid rgba(255,255,255,0.2);
    margin-top: 0.5rem;
    padding-top: 0.75rem;
    font-weight: 700;
    font-size: 1rem;
  }
`

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`

const ActionButton = styled.button`
  flex: 1;
  padding: 1rem 2rem;
  background: transparent;
  border: 2px solid #1A1A1A;
  color: #1A1A1A;
  cursor: pointer;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  transition: all 0.3s ease;
  border-radius: 6px;

  &:hover {
    background: #1A1A1A;
    color: #FFFFFF;
  }

  @media (max-width: 640px) {
    width: 100%;
  }
`

function GeneratedLink({ projectData, show }) {
  const [copied, setCopied] = useState(false)

  if (!projectData) return null

  const formUrl = `${window.location.origin}/form/${projectData.slug}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formUrl)
      setCopied(true)
      toast.success("Link kopiert!")
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error("Fehler beim Kopieren")
    }
  }

  const handleEmailLink = () => {
    const subject = encodeURIComponent(`Eure Hochzeits-Website - Inhalte hochladen`)
    const body = encodeURIComponent(
      `Hallo ${projectData.partner1_first_name || projectData.partner1FirstName} & ${projectData.partner2_first_name || projectData.partner2FirstName},\n\n` +
      `vielen Dank für euer Vertrauen! 🎉\n\n` +
      `Hier ist der Link, um eure Inhalte für die Website hochzuladen:\n` +
      `${formUrl}\n\n` +
      `Bitte ladet alle Texte, Bilder und Informationen über dieses Formular hoch.\n\n` +
      `Bei Fragen stehen wir euch jederzeit zur Verfügung!\n\n` +
      `Liebe Grüße,\nSarah & Iver`
    )
    window.location.href = `mailto:${projectData.customer_email || projectData.customerEmail}?subject=${subject}&body=${body}`
  }

  const handleViewForm = () => {
    window.open(formUrl, "_blank")
  }

  // Get theme info
  const themeInfo = THEMES[projectData.theme] || { name: projectData.theme, color: '#1A1A1A' }
  
  // Get package info
  const packageInfo = PACKAGES[projectData.package] || { name: projectData.package, price: 0 }
  
  // Get selected components
  const components = projectData.components || {}
  const selectedCoreComponents = CORE_COMPONENTS.filter(c => components[c.id])
  const selectedOptionalComponents = OPTIONAL_COMPONENTS.filter(c => components[c.id])
  
  // Get selected addons
  const addons = projectData.addons || {}
  const selectedAddons = ADDONS.filter(a => addons[a.id])
  
  // Calculate prices
  const packagePrice = packageInfo.price || projectData.priceNetto || 0
  const addonsPrice = selectedAddons.reduce((sum, a) => sum + a.price, 0)
  const totalNetto = packagePrice + addonsPrice
  const totalBrutto = totalNetto * 1.19

  return (
    <Container show={show}>
      <Header>
        <Title>Projekt erstellt</Title>
        <StatusBadge>
          <span style={{ fontSize: '1rem' }}>✓</span> AKTIV
        </StatusBadge>
      </Header>

      <Description>
        Das Projekt wurde erfolgreich erstellt. Sende den folgenden Link an deine Kunden, 
        damit sie die Inhalte für ihre Website hochladen können:
      </Description>

      <LinkContainer>
        <LinkInput
          type="text"
          value={formUrl}
          readOnly
          onClick={(e) => e.target.select()}
        />
        <CopyButton onClick={handleCopy}>
          {copied ? "✓ Kopiert!" : "Link Kopieren"}
        </CopyButton>
      </LinkContainer>

      {/* SUMMARY */}
      <SummarySection>
        <SummaryTitle>📋 Projekt-Zusammenfassung</SummaryTitle>
        
        <SummaryGrid>
          {/* Projekt Info */}
          <SummaryCard>
            <SummaryCardTitle>Projekt-Details</SummaryCardTitle>
            <SummaryCardContent>
              <SummaryItem>
                <span>Projekt-ID</span>
                <span>{projectData.id?.slice(0, 8) || '—'}...</span>
              </SummaryItem>
              <SummaryItem>
                <span>Slug</span>
                <span>{projectData.slug}</span>
              </SummaryItem>
              <SummaryItem>
                <span>Erstellt am</span>
                <span>{new Date(projectData.created_at || Date.now()).toLocaleDateString("de-DE")}</span>
              </SummaryItem>
            </SummaryCardContent>
          </SummaryCard>

          {/* Kunden Info */}
          <SummaryCard>
            <SummaryCardTitle>Kundendaten</SummaryCardTitle>
            <SummaryCardContent>
              <SummaryItem>
                <span>Namen</span>
                <span>
                  {projectData.partner1_first_name || projectData.partner1FirstName} & {projectData.partner2_first_name || projectData.partner2FirstName}
                </span>
              </SummaryItem>
              <SummaryItem>
                <span>Hochzeitsdatum</span>
                <span>
                  {projectData.wedding_date || projectData.weddingDate 
                    ? new Date(projectData.wedding_date || projectData.weddingDate).toLocaleDateString("de-DE")
                    : '—'
                  }
                </span>
              </SummaryItem>
              <SummaryItem>
                <span>E-Mail</span>
                <span>{projectData.customer_email || projectData.customerEmail}</span>
              </SummaryItem>
            </SummaryCardContent>
          </SummaryCard>

          {/* Theme & Paket */}
          <SummaryCard>
            <SummaryCardTitle>Theme & Paket</SummaryCardTitle>
            <SummaryCardContent>
              <SummaryItem>
                <span>Theme</span>
                <ThemePreview>
                  <ThemeColor color={themeInfo.color} />
                  <ThemeName>{themeInfo.name}</ThemeName>
                </ThemePreview>
              </SummaryItem>
              <SummaryItem>
                <span>Paket</span>
                <span>{packageInfo.name}</span>
              </SummaryItem>
            </SummaryCardContent>
          </SummaryCard>

          {/* Preisübersicht */}
          <SummaryCard>
            <SummaryCardTitle>Preisübersicht</SummaryCardTitle>
            <PriceBox>
              <PriceRow>
                <span>Paket ({packageInfo.name})</span>
                <span>{packagePrice.toLocaleString('de-DE')} €</span>
              </PriceRow>
              {addonsPrice > 0 && (
                <PriceRow>
                  <span>Add-ons</span>
                  <span>+{addonsPrice.toLocaleString('de-DE')} €</span>
                </PriceRow>
              )}
              <PriceRow>
                <span>MwSt. (19%)</span>
                <span>{(totalNetto * 0.19).toLocaleString('de-DE', { minimumFractionDigits: 2 })} €</span>
              </PriceRow>
              <PriceRow className="total">
                <span>Gesamt (brutto)</span>
                <span>{totalBrutto.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €</span>
              </PriceRow>
            </PriceBox>
          </SummaryCard>
        </SummaryGrid>

        {/* Komponenten */}
        <SummaryCard style={{ marginTop: '1.5rem' }}>
          <SummaryCardTitle>Gebuchte Komponenten</SummaryCardTitle>
          <SummaryCardContent>
            <div style={{ marginBottom: '0.75rem' }}>
              <div style={{ fontSize: '0.7rem', color: '#666', marginBottom: '0.5rem' }}>Basis (immer inklusive):</div>
              <ComponentsList>
                {CORE_COMPONENTS.map(c => (
                  <ComponentTag key={c.id} core>{c.name}</ComponentTag>
                ))}
              </ComponentsList>
            </div>
            {selectedOptionalComponents.length > 0 && (
              <div>
                <div style={{ fontSize: '0.7rem', color: '#666', marginBottom: '0.5rem' }}>Optional hinzugebucht:</div>
                <ComponentsList>
                  {selectedOptionalComponents.map(c => (
                    <ComponentTag key={c.id}>{c.name}</ComponentTag>
                  ))}
                </ComponentsList>
              </div>
            )}
          </SummaryCardContent>
        </SummaryCard>

        {/* Add-ons */}
        {selectedAddons.length > 0 && (
          <SummaryCard style={{ marginTop: '1rem' }}>
            <SummaryCardTitle>Gebuchte Add-ons</SummaryCardTitle>
            <SummaryCardContent>
              <ComponentsList>
                {selectedAddons.map(a => (
                  <AddonTag key={a.id}>{a.name} (+{a.price}€)</AddonTag>
                ))}
              </ComponentsList>
            </SummaryCardContent>
          </SummaryCard>
        )}
      </SummarySection>

      <ActionButtons>
        <ActionButton onClick={handleViewForm}>📄 Formular ansehen</ActionButton>
        <ActionButton onClick={handleEmailLink}>✉️ Per E-Mail senden</ActionButton>
      </ActionButtons>
    </Container>
  )
}

export default GeneratedLink

// src/components/admin/ContractInvoiceSection.js
import styled from "styled-components"
import toast from "react-hot-toast"

const Container = styled.div``

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const Card = styled.div`
  background: #FAFAFA;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  padding: 1.5rem;
`

const CardTitle = styled.h3`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.3rem;
  font-weight: 400;
  color: #1A1A1A;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.3rem 0.8rem;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  border-radius: 20px;
  font-family: 'Inter', sans-serif;
  
  ${props => props.status === 'pending' && `
    background: #FFF3E0;
    color: #E65100;
  `}
  
  ${props => props.status === 'sent' && `
    background: #E3F2FD;
    color: #1565C0;
  `}
  
  ${props => props.status === 'completed' && `
    background: #E8F5E9;
    color: #2E7D32;
  `}
`

const StatusRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem 0;
  border-bottom: 1px solid #E0E0E0;

  &:last-child {
    border-bottom: none;
  }
`

const StatusLabel = styled.div`
  font-size: 0.85rem;
  color: #333;
  font-family: 'Inter', sans-serif;
`

const StatusDate = styled.div`
  font-size: 0.75rem;
  color: #999;
  margin-top: 0.2rem;
  font-family: 'Inter', sans-serif;
`

const Checkbox = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid ${props => props.checked ? '#4CAF50' : '#CCC'};
  background: ${props => props.checked ? '#4CAF50' : 'transparent'};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &::after {
    content: "✓";
    color: #FFFFFF;
    font-size: 0.75rem;
    font-weight: 700;
    opacity: ${props => props.checked ? 1 : 0};
  }

  &:hover {
    border-color: ${props => props.checked ? '#4CAF50' : '#999'};
  }
`

const ActionButton = styled.button`
  width: 100%;
  padding: 1rem;
  margin-top: 1rem;
  background: ${props => props.primary ? '#1A1A1A' : 'transparent'};
  color: ${props => props.primary ? '#FFFFFF' : '#1A1A1A'};
  border: 2px solid #1A1A1A;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.primary ? '#333' : '#1A1A1A'};
    color: #FFFFFF;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const PriceSummary = styled.div`
  background: #FFFFFF;
  border: 2px solid #E0E0E0;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 2rem;
`

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #333;

  &.total {
    border-top: 2px solid #1A1A1A;
    margin-top: 0.5rem;
    padding-top: 1rem;
    font-weight: 700;
    font-size: 1.1rem;
  }

  &.brutto {
    color: #666;
    font-size: 0.85rem;
  }
`

function ContractInvoiceSection({ contractStatus, onStatusChange, totalPrice, customerData }) {
  const handleContractSent = () => {
    onStatusChange({
      ...contractStatus,
      contractSent: true,
      contractSentDate: new Date().toISOString()
    })
    toast.success('Vertrag als gesendet markiert')
  }

  const handleContractSigned = () => {
    onStatusChange({
      ...contractStatus,
      contractSigned: !contractStatus.contractSigned,
      contractSignedDate: !contractStatus.contractSigned ? new Date().toISOString() : null
    })
  }

  const handleInvoiceSent = () => {
    onStatusChange({
      ...contractStatus,
      invoiceSent: true,
      invoiceSentDate: new Date().toISOString()
    })
    toast.success('Rechnung als gesendet markiert')
  }

  const handleInvoicePaid = () => {
    onStatusChange({
      ...contractStatus,
      invoicePaid: !contractStatus.invoicePaid,
      invoicePaidDate: !contractStatus.invoicePaid ? new Date().toISOString() : null
    })
  }

  const formatDate = (dateString) => {
    if (!dateString) return null
    return new Date(dateString).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getContractStatus = () => {
    if (contractStatus.contractSigned) return 'completed'
    if (contractStatus.contractSent) return 'sent'
    return 'pending'
  }

  const getInvoiceStatus = () => {
    if (contractStatus.invoicePaid) return 'completed'
    if (contractStatus.invoiceSent) return 'sent'
    return 'pending'
  }

  return (
    <Container>
      <Grid>
        {/* Contract Section */}
        <Card>
          <CardTitle>
            📄 Vertrag
            <StatusBadge status={getContractStatus()}>
              {getContractStatus() === 'completed' && '✓ Unterschrieben'}
              {getContractStatus() === 'sent' && '📤 Gesendet'}
              {getContractStatus() === 'pending' && '⏳ Ausstehend'}
            </StatusBadge>
          </CardTitle>

          <StatusRow>
            <div>
              <StatusLabel>Vertrag gesendet</StatusLabel>
              {contractStatus.contractSentDate && (
                <StatusDate>{formatDate(contractStatus.contractSentDate)}</StatusDate>
              )}
            </div>
            <Checkbox 
              checked={contractStatus.contractSent} 
              onClick={() => !contractStatus.contractSent && handleContractSent()}
              style={{ cursor: contractStatus.contractSent ? 'default' : 'pointer' }}
            />
          </StatusRow>

          <StatusRow>
            <div>
              <StatusLabel>Vertrag unterschrieben</StatusLabel>
              {contractStatus.contractSignedDate && (
                <StatusDate>{formatDate(contractStatus.contractSignedDate)}</StatusDate>
              )}
            </div>
            <Checkbox 
              checked={contractStatus.contractSigned} 
              onClick={handleContractSigned}
            />
          </StatusRow>

          <ActionButton 
            onClick={() => toast('Vertrag wird erstellt... (Demo)', { icon: '📄' })}
            disabled={!customerData.customerEmail}
          >
            Vertrag erstellen & senden
          </ActionButton>
        </Card>

        {/* Invoice Section */}
        <Card>
          <CardTitle>
            💰 Rechnung
            <StatusBadge status={getInvoiceStatus()}>
              {getInvoiceStatus() === 'completed' && '✓ Bezahlt'}
              {getInvoiceStatus() === 'sent' && '📤 Gesendet'}
              {getInvoiceStatus() === 'pending' && '⏳ Ausstehend'}
            </StatusBadge>
          </CardTitle>

          <StatusRow>
            <div>
              <StatusLabel>Rechnung gesendet</StatusLabel>
              {contractStatus.invoiceSentDate && (
                <StatusDate>{formatDate(contractStatus.invoiceSentDate)}</StatusDate>
              )}
            </div>
            <Checkbox 
              checked={contractStatus.invoiceSent} 
              onClick={() => !contractStatus.invoiceSent && handleInvoiceSent()}
              style={{ cursor: contractStatus.invoiceSent ? 'default' : 'pointer' }}
            />
          </StatusRow>

          <StatusRow>
            <div>
              <StatusLabel>Zahlung eingegangen</StatusLabel>
              {contractStatus.invoicePaidDate && (
                <StatusDate>{formatDate(contractStatus.invoicePaidDate)}</StatusDate>
              )}
            </div>
            <Checkbox 
              checked={contractStatus.invoicePaid} 
              onClick={handleInvoicePaid}
            />
          </StatusRow>

          <ActionButton 
            onClick={() => toast('Rechnung wird erstellt... (Demo)', { icon: '💰' })}
            disabled={!contractStatus.contractSigned}
          >
            Rechnung erstellen & senden
          </ActionButton>
        </Card>
      </Grid>

      {/* Price Summary */}
      <PriceSummary>
        <CardTitle style={{ marginBottom: '1rem' }}>💵 Preisübersicht</CardTitle>
        <PriceRow>
          <span>Paketpreis (netto)</span>
          <span>{totalPrice.toLocaleString('de-DE')} €</span>
        </PriceRow>
        <PriceRow>
          <span>MwSt. (19%)</span>
          <span>{(totalPrice * 0.19).toLocaleString('de-DE', { minimumFractionDigits: 2 })} €</span>
        </PriceRow>
        <PriceRow className="total">
          <span>Gesamtbetrag (brutto)</span>
          <span>{(totalPrice * 1.19).toLocaleString('de-DE', { minimumFractionDigits: 2 })} €</span>
        </PriceRow>
      </PriceSummary>
    </Container>
  )
}

export default ContractInvoiceSection

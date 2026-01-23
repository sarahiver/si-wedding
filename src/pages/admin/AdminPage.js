// src/pages/admin/AdminPage.js
import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import styled from "styled-components"
import ComponentCheckboxes from "../../components/admin/ComponentCheckboxes"
import ContactRequestDetail from "../../components/admin/ContactRequestDetail"
import ContactRequestsList from "../../components/admin/ContactRequestsList"
import CustomerForm from "../../components/admin/CustomerForm"
import GeneratedLink from "../../components/admin/GeneratedLink"
import PackageSelector from "../../components/admin/PackageSelector"
import ThemeSelector from "../../components/admin/ThemeSelector"
import AddonsSelector from "../../components/admin/AddonsSelector"
import ContractInvoiceSection from "../../components/admin/ContractInvoiceSection"
import { linkRequestToProject } from "../../lib/contactRequests"
import { createProject } from "../../lib/projects"
import {
  OPTIONAL_COMPONENTS,
  CORE_COMPONENTS,
  PACKAGES,
  ADDONS,
  ADMIN_CREDENTIALS,
} from "../../utils/constants"

// ============================================
// LOGIN SCREEN STYLES
// ============================================
const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
  padding: 20px;
`

const LoginCard = styled.div`
  background: #FFFFFF;
  padding: 50px 40px;
  max-width: 400px;
  width: 100%;
  text-align: center;
`

const LoginLogo = styled.div`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 2.5rem;
  font-weight: 300;
  color: #1A1A1A;
  margin-bottom: 10px;
`

const LoginSubtitle = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  color: #999;
  text-transform: uppercase;
  margin-bottom: 40px;
`

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const LoginInput = styled.input`
  padding: 16px 20px;
  border: 2px solid #E0E0E0;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #1A1A1A;
  }
  
  &::placeholder {
    color: #999;
  }
`

const LoginButton = styled.button`
  padding: 18px;
  background: #1A1A1A;
  color: #FFFFFF;
  border: none;
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #333;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const LoginError = styled.div`
  color: #FF6B6B;
  font-size: 0.85rem;
  margin-top: -10px;
`

// ============================================
// ADMIN DASHBOARD STYLES
// ============================================
const PageContainer = styled.div`
  min-height: 100vh;
  background: #FAFAFA;
`

const Navigation = styled.nav`
  background: #FFFFFF;
  padding: 1rem 2rem;
  border-bottom: 2px solid #E0E0E0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
`

const Logo = styled.div`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.8rem;
  font-weight: 400;
  color: #1A1A1A;
`

const NavTabs = styled.div`
  display: flex;
  gap: 0.5rem;
  background: #F5F5F5;
  padding: 0.3rem;
  border-radius: 8px;
`

const NavTab = styled.button`
  padding: 0.7rem 1.5rem;
  background: ${props => props.active ? '#1A1A1A' : 'transparent'};
  color: ${props => props.active ? '#FFFFFF' : '#666'};
  border: none;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Inter', sans-serif;

  &:hover:not(:disabled) {
    background: ${props => props.active ? '#1A1A1A' : '#E0E0E0'};
  }
`

const NavActions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`

const NavButton = styled.button`
  padding: 0.7rem 1.5rem;
  background: transparent;
  border: 2px solid #1A1A1A;
  color: #1A1A1A;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 600;
  transition: all 0.3s ease;
  font-family: 'Inter', sans-serif;

  &:hover {
    background: #1A1A1A;
    color: #FFFFFF;
  }
`

const LogoutButton = styled.button`
  padding: 0.7rem 1.5rem;
  background: transparent;
  border: 1px solid #CCC;
  color: #666;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 500;
  transition: all 0.3s ease;
  font-family: 'Inter', sans-serif;

  &:hover {
    border-color: #FF6B6B;
    color: #FF6B6B;
  }
`

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }
`

const PageHeader = styled.div`
  margin-bottom: 2rem;
`

const PageTitle = styled.h1`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 2.2rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
  color: #1A1A1A;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`

const PageSubtitle = styled.p`
  font-size: 0.9rem;
  color: #666;
  font-family: 'Inter', sans-serif;
`

const Section = styled.div`
  background: #FFFFFF;
  border: 1px solid #E0E0E0;
  padding: 2rem;
  margin-bottom: 1.5rem;
  border-radius: 8px;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`

const SectionTitle = styled.h2`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.5rem;
  font-weight: 400;
  color: #1A1A1A;
  margin-bottom: 0.5rem;
`

const SectionSubtitle = styled.p`
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 1.5rem;
  font-family: 'Inter', sans-serif;
`

const SubmitButton = styled.button`
  display: inline-block;
  padding: 1.2rem 3rem;
  background: #1A1A1A;
  color: #FFFFFF;
  border: none;
  cursor: pointer;
  font-size: 0.8rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  transition: all 0.3s ease;
  margin-top: 1.5rem;

  &:hover:not(:disabled) {
    background: #333;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 2px solid #FFFFFF;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s linear infinite;
  margin-right: 10px;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`

const FromRequestBanner = styled.div`
  background: #F0F7FF;
  border: 1px solid #B8D4FF;
  border-radius: 8px;
  padding: 1.2rem 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`

const BannerInfo = styled.div``

const BannerTitle = styled.div`
  font-weight: 600;
  color: #1A1A1A;
  margin-bottom: 0.2rem;
  font-size: 0.95rem;
`

const BannerText = styled.div`
  font-size: 0.8rem;
  color: #666;
`

const BannerButton = styled.button`
  padding: 0.5rem 1rem;
  background: transparent;
  border: 1px solid #666;
  color: #666;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Inter', sans-serif;

  &:hover {
    border-color: #FF6B6B;
    color: #FF6B6B;
  }
`

// Step Indicator
const StepIndicator = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`

const Step = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: ${props => props.active ? '#1A1A1A' : props.completed ? '#E8F5E9' : '#F5F5F5'};
  color: ${props => props.active ? '#FFFFFF' : props.completed ? '#4CAF50' : '#999'};
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
  
  span {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${props => props.active ? '#FFFFFF' : props.completed ? '#4CAF50' : '#CCC'};
    color: ${props => props.active ? '#1A1A1A' : '#FFFFFF'};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.65rem;
  }
`

// View states
const VIEW = {
  REQUESTS_LIST: "requests_list",
  REQUEST_DETAIL: "request_detail",
  PROJECT_CONFIG: "project_config",
}

function AdminPage() {
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [loginError, setLoginError] = useState("")

  // Check session on mount
  useEffect(() => {
    const session = sessionStorage.getItem('adminAuth')
    if (session === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault()
    setLoginError("")
    
    if (loginEmail === ADMIN_CREDENTIALS.email && loginPassword === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true)
      sessionStorage.setItem('adminAuth', 'true')
      toast.success('Willkommen! 👋')
    } else {
      setLoginError("Ungültige Anmeldedaten")
    }
  }

  // Handle Logout
  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('adminAuth')
    setLoginEmail("")
    setLoginPassword("")
  }

  // View State
  const [currentView, setCurrentView] = useState(VIEW.REQUESTS_LIST)
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [fromRequest, setFromRequest] = useState(null)

  // Project Config State
  const [selectedTheme, setSelectedTheme] = useState("editorial")
  const [selectedPackage, setSelectedPackage] = useState("signature")
  const [selectedAddons, setSelectedAddons] = useState({})
  const [selectedComponents, setSelectedComponents] = useState(() => {
    const initial = {}
    CORE_COMPONENTS.forEach(comp => { initial[comp.id] = true })
    OPTIONAL_COMPONENTS.forEach(comp => { initial[comp.id] = false })
    return initial
  })

  // Customer Data
  const [customerData, setCustomerData] = useState({
    partner1FirstName: "",
    partner1LastName: "",
    partner2FirstName: "",
    partner2LastName: "",
    weddingDate: "",
    customerEmail: "",
    customerPhone: "",
    customerStreet: "",
    customerZip: "",
    customerCity: "",
    slug: "",
    slugManuallyEdited: false,
    internalName: "",
    internalNotes: "",
  })

  // Contract/Invoice State
  const [contractStatus, setContractStatus] = useState({
    contractSent: false,
    contractSentDate: null,
    contractSigned: false,
    contractSignedDate: null,
    invoiceSent: false,
    invoiceSentDate: null,
    invoicePaid: false,
    invoicePaidDate: null,
  })

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [createdProject, setCreatedProject] = useState(null)
  const [showGeneratedLink, setShowGeneratedLink] = useState(false)

  // Calculate total price
  const calculateTotalPrice = () => {
    const pkg = PACKAGES[selectedPackage]
    let total = pkg ? pkg.price : 0
    
    Object.entries(selectedAddons).forEach(([addonId, isSelected]) => {
      if (isSelected) {
        const addon = ADDONS.find(a => a.id === addonId)
        if (addon) total += addon.price
      }
    })
    
    return total
  }

  // Handlers
  const handleSelectRequest = (request) => {
    setSelectedRequest(request)
    setCurrentView(VIEW.REQUEST_DETAIL)
  }

  const handleBackToList = () => {
    setSelectedRequest(null)
    setCurrentView(VIEW.REQUESTS_LIST)
  }

  const handleStatusChange = (updatedRequest) => {
    setSelectedRequest(updatedRequest)
  }

  const handleCreateProjectFromRequest = (request) => {
    setFromRequest(request)
    const nameParts = request.name?.split(" ") || []
    const firstName = nameParts[0] || ""
    const lastName = nameParts.slice(1).join(" ") || ""

    setCustomerData({
      partner1FirstName: firstName,
      partner1LastName: lastName,
      partner2FirstName: "",
      partner2LastName: "",
      weddingDate: request.wedding_date || "",
      customerEmail: request.email || "",
      customerPhone: request.phone || "",
      customerStreet: "",
      customerZip: "",
      customerCity: "",
      slug: "",
      slugManuallyEdited: false,
      internalName: "",
      internalNotes: request.message || "",
    })

    if (request.package) setSelectedPackage(request.package)
    if (request.theme) setSelectedTheme(request.theme)

    setCurrentView(VIEW.PROJECT_CONFIG)
  }

  const handleNewProject = () => {
    setFromRequest(null)
    resetProjectForm()
    setCurrentView(VIEW.PROJECT_CONFIG)
  }

  const resetProjectForm = () => {
    setCustomerData({
      partner1FirstName: "",
      partner1LastName: "",
      partner2FirstName: "",
      partner2LastName: "",
      weddingDate: "",
      customerEmail: "",
      customerPhone: "",
      customerStreet: "",
      customerZip: "",
      customerCity: "",
      slug: "",
      slugManuallyEdited: false,
      internalName: "",
      internalNotes: "",
    })
    setSelectedTheme("editorial")
    setSelectedPackage("signature")
    setSelectedAddons({})
    setSelectedComponents(() => {
      const initial = {}
      CORE_COMPONENTS.forEach(comp => { initial[comp.id] = true })
      OPTIONAL_COMPONENTS.forEach(comp => { initial[comp.id] = false })
      return initial
    })
    setContractStatus({
      contractSent: false,
      contractSentDate: null,
      contractSigned: false,
      contractSignedDate: null,
      invoiceSent: false,
      invoiceSentDate: null,
      invoicePaid: false,
      invoicePaidDate: null,
    })
    setCreatedProject(null)
    setShowGeneratedLink(false)
  }

  const validateForm = () => {
    const errors = []
    if (!customerData.partner1FirstName) errors.push("Partner 1 Vorname fehlt")
    if (!customerData.partner2FirstName) errors.push("Partner 2 Vorname fehlt")
    if (!customerData.weddingDate) errors.push("Hochzeitsdatum fehlt")
    if (!customerData.customerEmail) errors.push("Kunden-Email fehlt")
    if (!customerData.slug) errors.push("Projekt-Slug fehlt")

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (customerData.customerEmail && !emailRegex.test(customerData.customerEmail)) {
      errors.push("Ungültige Email-Adresse")
    }

    if (customerData.slug && (customerData.slug.length < 3 || customerData.slug.length > 50)) {
      errors.push("Slug muss zwischen 3 und 50 Zeichen lang sein")
    }

    return errors
  }

  const handleSubmit = async () => {
    const errors = validateForm()
    if (errors.length > 0) {
      errors.forEach(error => toast.error(error))
      return
    }

    setIsSubmitting(true)

    try {
      const totalPrice = calculateTotalPrice()
      const priceBrutto = totalPrice * 1.19

      const projectData = {
        slug: customerData.slug,
        internalName: customerData.internalName || 
          `Hochzeit ${customerData.partner1FirstName} & ${customerData.partner2FirstName}`,
        partner1FirstName: customerData.partner1FirstName,
        partner1LastName: customerData.partner1LastName,
        partner2FirstName: customerData.partner2FirstName,
        partner2LastName: customerData.partner2LastName,
        customerStreet: customerData.customerStreet,
        customerZip: customerData.customerZip,
        customerCity: customerData.customerCity,
        customerEmail: customerData.customerEmail,
        customerPhone: customerData.customerPhone,
        weddingDate: customerData.weddingDate,
        theme: selectedTheme,
        package: selectedPackage,
        addons: selectedAddons,
        components: selectedComponents,
        priceNetto: totalPrice,
        priceBrutto: priceBrutto,
        contractStatus: contractStatus,
        internalNotes: customerData.internalNotes,
      }

      const { data, error } = await createProject(projectData)

      if (error) throw new Error(error)

      if (fromRequest) {
        await linkRequestToProject(fromRequest.id, data.id)
      }

      toast.success("Projekt erfolgreich erstellt! 🎉")
      setCreatedProject(data)
      setShowGeneratedLink(true)

      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
      }, 100)
    } catch (error) {
      console.error("Error creating project:", error)
      toast.error(`Fehler: ${error.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAnotherProject = () => {
    setFromRequest(null)
    resetProjectForm()
    setCurrentView(VIEW.REQUESTS_LIST)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleCancelProjectCreation = () => {
    setFromRequest(null)
    resetProjectForm()
    setCurrentView(VIEW.REQUESTS_LIST)
  }

  // ============================================
  // LOGIN SCREEN
  // ============================================
  if (!isAuthenticated) {
    return (
      <LoginContainer>
        <LoginCard>
          <LoginLogo>S & I</LoginLogo>
          <LoginSubtitle>Admin Dashboard</LoginSubtitle>
          
          <LoginForm onSubmit={handleLogin}>
            <LoginInput
              type="email"
              placeholder="E-Mail"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />
            <LoginInput
              type="password"
              placeholder="Passwort"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />
            {loginError && <LoginError>{loginError}</LoginError>}
            <LoginButton type="submit">Anmelden</LoginButton>
          </LoginForm>
        </LoginCard>
      </LoginContainer>
    )
  }

  // ============================================
  // ADMIN DASHBOARD
  // ============================================
  return (
    <PageContainer>
      <Navigation>
        <Logo>S&I Admin</Logo>

        <NavTabs>
          <NavTab
            active={currentView === VIEW.REQUESTS_LIST || currentView === VIEW.REQUEST_DETAIL}
            onClick={() => { setCurrentView(VIEW.REQUESTS_LIST); setSelectedRequest(null); }}
          >
            📥 Anfragen
          </NavTab>
          <NavTab
            active={currentView === VIEW.PROJECT_CONFIG}
            onClick={handleNewProject}
          >
            ➕ Neues Projekt
          </NavTab>
        </NavTabs>

        <NavActions>
          <NavButton onClick={() => (window.location.href = "/")}>
            ← Website
          </NavButton>
          <LogoutButton onClick={handleLogout}>
            Abmelden
          </LogoutButton>
        </NavActions>
      </Navigation>

      <Container>
        {/* REQUESTS LIST VIEW */}
        {currentView === VIEW.REQUESTS_LIST && (
          <>
            <PageHeader>
              <PageTitle>Kontaktanfragen</PageTitle>
              <PageSubtitle>Verwalte eingehende Anfragen und erstelle Projekte</PageSubtitle>
            </PageHeader>
            <ContactRequestsList
              onSelectRequest={handleSelectRequest}
              selectedRequestId={selectedRequest?.id}
            />
          </>
        )}

        {/* REQUEST DETAIL VIEW */}
        {currentView === VIEW.REQUEST_DETAIL && selectedRequest && (
          <ContactRequestDetail
            request={selectedRequest}
            onBack={handleBackToList}
            onStatusChange={handleStatusChange}
            onCreateProject={handleCreateProjectFromRequest}
          />
        )}

        {/* PROJECT CONFIG VIEW */}
        {currentView === VIEW.PROJECT_CONFIG && (
          <>
            <PageHeader>
              <PageTitle>Website Konfigurator</PageTitle>
              <PageSubtitle>Erstelle die perfekte Hochzeitswebsite für deine Kunden</PageSubtitle>
            </PageHeader>

            {fromRequest && (
              <FromRequestBanner>
                <BannerInfo>
                  <BannerTitle>Projekt aus Anfrage: {fromRequest.name}</BannerTitle>
                  <BannerText>{fromRequest.email}</BannerText>
                </BannerInfo>
                <BannerButton onClick={handleCancelProjectCreation}>
                  Abbrechen
                </BannerButton>
              </FromRequestBanner>
            )}

            {/* Step Indicator */}
            <StepIndicator>
              <Step active><span>1</span> Theme</Step>
              <Step><span>2</span> Paket</Step>
              <Step><span>3</span> Add-ons</Step>
              <Step><span>4</span> Komponenten</Step>
              <Step><span>5</span> Kundendaten</Step>
              <Step><span>6</span> Vertrag</Step>
            </StepIndicator>

            {/* 1. Theme Selection */}
            <Section>
              <SectionTitle>1. Theme auswählen</SectionTitle>
              <SectionSubtitle>Wähle das Design-Theme für die Hochzeitswebsite</SectionSubtitle>
              <ThemeSelector
                selectedTheme={selectedTheme}
                onThemeChange={setSelectedTheme}
              />
            </Section>

            {/* 2. Package Selection */}
            <Section>
              <SectionTitle>2. Paket auswählen</SectionTitle>
              <SectionSubtitle>Wähle das passende Paket für den Kunden</SectionSubtitle>
              <PackageSelector
                selectedPackage={selectedPackage}
                onPackageChange={setSelectedPackage}
              />
            </Section>

            {/* 3. Add-ons */}
            <Section>
              <SectionTitle>3. Add-ons hinzufügen</SectionTitle>
              <SectionSubtitle>Optionale Zusatzleistungen auswählen</SectionSubtitle>
              <AddonsSelector
                selectedAddons={selectedAddons}
                onAddonsChange={setSelectedAddons}
              />
            </Section>

            {/* 4. Components */}
            <Section>
              <SectionTitle>4. Komponenten konfigurieren</SectionTitle>
              <SectionSubtitle>
                Basis-Komponenten sind immer inklusive. Optionale Komponenten je nach Paket.
              </SectionSubtitle>
              <ComponentCheckboxes
                selectedComponents={selectedComponents}
                onComponentsChange={setSelectedComponents}
                selectedPackage={selectedPackage}
              />
            </Section>

            {/* 5. Customer Form */}
            <Section>
              <SectionTitle>5. Kundendaten</SectionTitle>
              <SectionSubtitle>Alle wichtigen Informationen zum Brautpaar</SectionSubtitle>
              <CustomerForm
                formData={customerData}
                onChange={setCustomerData}
              />
            </Section>

            {/* 6. Contract & Invoice */}
            <Section>
              <SectionTitle>6. Vertrag & Rechnung</SectionTitle>
              <SectionSubtitle>Vertragsverwaltung und Rechnungsstellung</SectionSubtitle>
              <ContractInvoiceSection
                contractStatus={contractStatus}
                onStatusChange={setContractStatus}
                totalPrice={calculateTotalPrice()}
                customerData={customerData}
              />
            </Section>

            {/* Price Summary & Submit */}
            <Section style={{ background: '#1A1A1A', color: '#FFFFFF' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', letterSpacing: '0.1em', opacity: 0.6, marginBottom: '0.3rem' }}>GESAMTPREIS NETTO</div>
                  <div style={{ fontSize: '2rem', fontFamily: "'Cormorant Garamond', serif" }}>
                    {calculateTotalPrice().toLocaleString('de-DE')} €
                  </div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>
                    inkl. MwSt: {(calculateTotalPrice() * 1.19).toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
                  </div>
                </div>
                <SubmitButton 
                  onClick={handleSubmit} 
                  disabled={isSubmitting}
                  style={{ background: '#FFFFFF', color: '#1A1A1A', marginTop: 0 }}
                >
                  {isSubmitting && <LoadingSpinner style={{ borderColor: '#1A1A1A', borderTopColor: 'transparent' }} />}
                  {isSubmitting ? "Wird erstellt..." : "Projekt erstellen & Link generieren"}
                </SubmitButton>
              </div>
            </Section>

            {/* Generated Link */}
            {showGeneratedLink && (
              <>
                <GeneratedLink
                  projectData={createdProject}
                  show={showGeneratedLink}
                />
                <Section style={{ textAlign: 'center' }}>
                  <NavButton onClick={handleAnotherProject}>
                    ← Zurück zu Anfragen
                  </NavButton>
                </Section>
              </>
            )}
          </>
        )}
      </Container>
    </PageContainer>
  )
}

export default AdminPage

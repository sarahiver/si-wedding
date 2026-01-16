// src/pages/admin/AdminPage.js
import { useState } from "react"
import toast from "react-hot-toast"
import styled from "styled-components"
import ComponentCheckboxes from "../../components/admin/ComponentCheckboxes"
import CustomerForm from "../../components/admin/CustomerForm"
import GeneratedLink from "../../components/admin/GeneratedLink"
import PackageSelector from "../../components/admin/PackageSelector"
import ThemeSelector from "../../components/admin/ThemeSelector"
import { createProject } from "../../lib/projects"
import {
  OPTIONAL_COMPONENTS,
  PACKAGES,
  STANDARD_COMPONENTS,
} from "../../utils/constants"

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${(props) => props.theme.background};
`

const Navigation = styled.nav`
  background: ${(props) => props.theme.background};
  padding: 1.5rem 4rem;
  border-bottom: 2px solid ${(props) => props.theme.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 1rem 2rem;
    flex-direction: column;
    gap: 1rem;
  }
`

const Logo = styled.div`
  font-family: ${(props) => props.theme.fontBody};
  font-size: 2rem;
  font-weight: 800;
  color: ${(props) => props.theme.text};
  letter-spacing: 0.05em;

  &::after {
    content: ${(props) => (props.theme.name === "botanical" ? "' 🌿'" : "''")};
    font-size: 1.5rem;
  }
`

const NavActions = styled.div`
  display: flex;
  gap: 1rem;
`

const NavButton = styled.button`
  padding: 0.8rem 2rem;
  background: transparent;
  border: 2px solid ${(props) => props.theme.primary};
  color: ${(props) => props.theme.primary};
  cursor: pointer;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: 600;
  transition: all 0.3s ease;
  font-family: ${(props) => props.theme.fontBody};
  border-radius: ${(props) => props.theme.buttonRadius};

  &:hover {
    background: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.background};
  }
`

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 4rem 2rem;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`

const PageHeader = styled.div`
  margin-bottom: 3rem;
`

const PageTitle = styled.h1`
  font-family: ${(props) => props.theme.fontHeading};
  font-size: 3rem;
  font-weight: 400;
  margin-bottom: 1rem;
  color: ${(props) => props.theme.primary};
  letter-spacing: 0.05em;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const PageSubtitle = styled.p`
  font-size: 1rem;
  font-weight: 300;
  color: ${(props) => props.theme.textSecondary};
  letter-spacing: 0.1em;
`

const Section = styled.div`
  background: ${(props) => props.theme.surface};
  border: 2px solid ${(props) => props.theme.border};
  padding: 3rem;
  margin-bottom: 3rem;
  border-radius: ${(props) => props.theme.cardRadius};
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`

const SubmitButton = styled.button`
  display: inline-block;
  padding: 1.3rem 4rem;
  background: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.background};
  border: none;
  cursor: pointer;
  font-size: 0.85rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-weight: 700;
  font-family: ${(props) => props.theme.fontBody};
  transition: all 0.3s ease;
  margin-top: 2rem;
  border-radius: ${(props) => props.theme.buttonRadius};

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 1.3rem 2rem;
  }
`

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid ${(props) => props.theme.background};
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s linear infinite;
  margin-right: 10px;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`

function AdminPage({ setTheme }) {
  // State für Theme
  const [selectedTheme, setSelectedTheme] = useState("gold")

  // State für Package
  const [selectedPackage, setSelectedPackage] = useState("signature")

  // State für Customer Form
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

  // State für Components
  const [selectedComponents, setSelectedComponents] = useState(() => {
    const initial = {}
    // Standard components are always true
    STANDARD_COMPONENTS.forEach((comp) => {
      initial[comp.id] = true
    })
    // Optional components start as false
    OPTIONAL_COMPONENTS.forEach((comp) => {
      initial[comp.id] = false
    })
    return initial
  })

  // State für Submission
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [createdProject, setCreatedProject] = useState(null)
  const [showGeneratedLink, setShowGeneratedLink] = useState(false)

  // Handle Theme Change
  const handleThemeChange = (theme) => {
    setSelectedTheme(theme)
    setTheme(theme) // Update global theme
  }

  // Validate Form
  const validateForm = () => {
    const errors = []

    if (!customerData.partner1FirstName) errors.push("Partner 1 Vorname fehlt")
    if (!customerData.partner1LastName) errors.push("Partner 1 Nachname fehlt")
    if (!customerData.partner2FirstName) errors.push("Partner 2 Vorname fehlt")
    if (!customerData.partner2LastName) errors.push("Partner 2 Nachname fehlt")
    if (!customerData.weddingDate) errors.push("Hochzeitsdatum fehlt")
    if (!customerData.customerEmail) errors.push("Kunden-Email fehlt")
    if (!customerData.slug) errors.push("Projekt-Slug fehlt")

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (
      customerData.customerEmail &&
      !emailRegex.test(customerData.customerEmail)
    ) {
      errors.push("Ungültige Email-Adresse")
    }

    // Validate slug
    if (
      customerData.slug &&
      (customerData.slug.length < 3 || customerData.slug.length > 50)
    ) {
      errors.push("Slug muss zwischen 3 und 50 Zeichen lang sein")
    }

    return errors
  }

  // Handle Submit
  const handleSubmit = async () => {
    // Validate
    const errors = validateForm()
    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error))
      return
    }

    setIsSubmitting(true)

    try {
      // Calculate prices
      const pkg = PACKAGES[selectedPackage]
      const priceNetto = pkg.price
      const priceBrutto = priceNetto * 1.19 // 19% MwSt

      // Prepare project data
      const projectData = {
        slug: customerData.slug,
        internalName:
          customerData.internalName ||
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

        components: selectedComponents,

        priceNetto: priceNetto,
        priceBrutto: priceBrutto,

        internalNotes: customerData.internalNotes,
      }

      // Create project in Supabase
      const { data, error } = await createProject(projectData)

      if (error) {
        throw new Error(error)
      }

      // Success!
      toast.success("Projekt erfolgreich erstellt! 🎉")
      setCreatedProject(data)
      setShowGeneratedLink(true)

      // Scroll to generated link
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        })
      }, 100)
    } catch (error) {
      console.error("Error creating project:", error)
      toast.error(`Fehler: ${error.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle New Project
  const handleNewProject = () => {
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
    setSelectedTheme("gold")
    setTheme("gold")
    setSelectedPackage("signature")
    setSelectedComponents(() => {
      const initial = {}
      STANDARD_COMPONENTS.forEach((comp) => {
        initial[comp.id] = true
      })
      OPTIONAL_COMPONENTS.forEach((comp) => {
        initial[comp.id] = false
      })
      return initial
    })
    setCreatedProject(null)
    setShowGeneratedLink(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <PageContainer>
      <Navigation>
        <Logo>S&I</Logo>
        <NavActions>
          <NavButton onClick={() => (window.location.href = "/")}>
            ← Zurück
          </NavButton>
          <NavButton onClick={handleNewProject}>+ Neues Projekt</NavButton>
        </NavActions>
      </Navigation>

      <Container>
        <PageHeader>
          <PageTitle>Website Konfigurator</PageTitle>
          <PageSubtitle>
            Erstelle die perfekte Hochzeitswebsite für deine Kunden
          </PageSubtitle>
        </PageHeader>

        {/* Theme Selection */}
        <Section>
          <ThemeSelector
            selectedTheme={selectedTheme}
            onThemeChange={handleThemeChange}
          />
        </Section>

        {/* Package Selection */}
        <Section>
          <PackageSelector
            selectedPackage={selectedPackage}
            onPackageChange={setSelectedPackage}
          />
        </Section>

        {/* Customer Form */}
        <Section>
          <CustomerForm formData={customerData} onChange={setCustomerData} />
        </Section>

        {/* Component Checkboxes */}
        <Section>
          <ComponentCheckboxes
            selectedComponents={selectedComponents}
            onComponentsChange={setSelectedComponents}
            selectedPackage={selectedPackage}
          />

          <SubmitButton onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting && <LoadingSpinner />}
            {isSubmitting
              ? "Projekt wird erstellt..."
              : "Konfiguration Speichern & Link Generieren"}
          </SubmitButton>
        </Section>

        {/* Generated Link */}
        <GeneratedLink projectData={createdProject} show={showGeneratedLink} />
      </Container>
    </PageContainer>
  )
}

export default AdminPage

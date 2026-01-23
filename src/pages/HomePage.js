// src/pages/HomePage.js
import styled from "styled-components"
import { useTheme } from "../context/ThemeContext"
import AboutSection from "../components/marketing/AboutSection"
import ComponentsShowcase from "../components/marketing/ComponentsShowcase"
import ContactSection from "../components/marketing/ContactSection"
import ExamplesShowcase from "../components/marketing/ExamplesShowcase"
import HowItWorksSection from "../components/marketing/HowItWorksSection"
import MarketingFooter from "../components/marketing/MarketingFooter"
import MarketingHero from "../components/marketing/MarketingHero"
import MarketingNav from "../components/marketing/MarketingNav"
import PricingSection from "../components/marketing/PricingSection"
import SaveTheDateSection from "../components/marketing/SaveTheDateSection"
import USPSection from "../components/marketing/USPSection"

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${p => p.$theme?.background || '#0a0a0a'};
  transition: background 0.5s ease;
`

function HomePage() {
  const { theme } = useTheme()
  
  return (
    <PageContainer $theme={theme}>
      {/* Navigation */}
      <MarketingNav />

      {/* Hero Section */}
      <MarketingHero />

      {/* Komponenten-Showcase */}
      <ComponentsShowcase />

      {/* So funktioniert's - 4 Schritte */}
      <HowItWorksSection />

      <ExamplesShowcase />

      {/* USP / Warum S&I */}
      <USPSection />

      {/* Preise */}
      <PricingSection />
      <SaveTheDateSection />

      {/* Über uns */}
      <AboutSection />

      {/* Kontakt */}
      <ContactSection />

      {/* Footer */}
      <MarketingFooter />
    </PageContainer>
  )
}

export default HomePage

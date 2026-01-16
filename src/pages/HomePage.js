// src/pages/HomePage.js
import styled from "styled-components"
import AboutSection from "../components/marketing/AboutSection"
import ContactSection from "../components/marketing/ContactSection"
import MarketingFooter from "../components/marketing/MarketingFooter"
import MarketingHero from "../components/marketing/MarketingHero"
import MarketingNav from "../components/marketing/MarketingNav"
import PricingSection from "../components/marketing/PricingSection"
import ThemeShowcase from "../components/marketing/ThemeShowcase"

const PageContainer = styled.div`
  min-height: 100vh;
  background: #ffffff;
`

function HomePage() {
  return (
    <PageContainer>
      <MarketingNav />
      <MarketingHero />
      <ThemeShowcase />
      <PricingSection />
      <AboutSection />
      <ContactSection />
      <MarketingFooter />
    </PageContainer>
  )
}

export default HomePage

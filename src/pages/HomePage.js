// src/pages/HomePage.js
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import MarketingNav from '../components/marketing/MarketingNav';
import MarketingHero from '../components/marketing/MarketingHero';
import ComponentsShowcase from '../components/marketing/ComponentsShowcase';
import HowItWorks from '../components/marketing/HowItWorks';
import DesignShowcase from '../components/marketing/DesignShowcase';
import USPSection from '../components/marketing/USPSection';
import PricingSection from '../components/marketing/PricingSection';
import SaveTheDateSection from '../components/marketing/SaveTheDateSection';
import ContactSection from '../components/marketing/ContactSection';
import AboutSection from '../components/marketing/AboutSection';
import MarketingFooter from '../components/marketing/MarketingFooter';

const Page = styled.div`min-height: 100vh;`;

function HomePage() {
  const { switchTheme } = useTheme();

  // Restore theme and scroll position when returning from demo
  useEffect(() => {
    const savedPosition = sessionStorage.getItem('returnScrollPosition');
    const savedTheme = sessionStorage.getItem('returnTheme');
    
    if (savedTheme) {
      switchTheme(savedTheme);
      sessionStorage.removeItem('returnTheme');
    }
    
    if (savedPosition) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedPosition));
        sessionStorage.removeItem('returnScrollPosition');
      }, 100);
    }
  }, [switchTheme]);

  return (
    <Page>
      <MarketingNav />
      <MarketingHero />
      <ComponentsShowcase />
      <HowItWorks />
      <DesignShowcase />
      <USPSection />
      <PricingSection />
      <SaveTheDateSection />
      <AboutSection />
      <ContactSection />
      <MarketingFooter />
    </Page>
  );
}

export default HomePage;

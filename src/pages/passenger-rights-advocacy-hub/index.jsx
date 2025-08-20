import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import RightsHeroSection from './components/RightsHeroSection';
import RightsCategoriesGrid from './components/RightsCategoriesGrid';
import CompensationCalculator from './components/CompensationCalculator';
import LegalResourcesSection from './components/LegalResourcesSection';
import AdvocacyToolsSection from './components/AdvocacyToolsSection';
import MultilingualResourcesSection from './components/MultilingualResourcesSection';

const PassengerRightsAdvocacyHub = () => {
  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'english';
    // Language preference would be used by components for content display
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Passenger Rights & Advocacy Hub - RailMadad AI</title>
        <meta 
          name="description" 
          content="Comprehensive passenger rights information, compensation calculators, legal resources, and advocacy tools. Know your railway rights, calculate compensation, and access multilingual support across India." 
        />
        <meta 
          name="keywords" 
          content="passenger rights, railway compensation, legal resources, advocacy tools, multilingual support, complaint templates, consumer protection, railway law" 
        />
        <meta property="og:title" content="Passenger Rights & Advocacy Hub - RailMadad AI" />
        <meta 
          property="og:description" 
          content="Empower yourself with comprehensive railway passenger rights knowledge, compensation calculators, and advocacy tools in multiple Indian languages." 
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/passenger-rights-advocacy-hub" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section */}
          <RightsHeroSection />
          
          {/* Rights Categories Overview */}
          <RightsCategoriesGrid />
          
          {/* Interactive Compensation Calculator */}
          <CompensationCalculator />
          
          {/* Legal Resources & Expert Network */}
          <LegalResourcesSection />
          
          {/* Advocacy Tools & Campaigns */}
          <AdvocacyToolsSection />
          
          {/* Multilingual Resources & Regional Support */}
          <MultilingualResourcesSection />
        </main>

        {/* Footer */}
        <footer className="bg-card border-t border-border py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-primary transition-colors">Rights Calculator</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Legal Templates</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Expert Network</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Success Stories</a></li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Resources</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-primary transition-colors">Compensation Guide</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Refund Policies</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Safety Standards</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Consumer Rights</a></li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Support</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-primary transition-colors">Helpline: 139</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Email Support</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Live Chat</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Regional Offices</a></li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Languages</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-primary transition-colors">हिंदी (Hindi)</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">தமிழ் (Tamil)</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">বাংলা (Bengali)</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">View All 12 Languages</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-muted-foreground">
                © {new Date()?.getFullYear()} RailMadad AI. Empowering passenger rights through technology.
              </div>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</a>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Accessibility</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default PassengerRightsAdvocacyHub;
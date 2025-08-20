import React from 'react';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import DashboardWidgets from './components/DashboardWidgets';
import PredictiveAlerts from './components/PredictiveAlerts';
import NavigationSection from './components/NavigationSection';
import Footer from './components/Footer';

const AIDashboardHomepage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Main Content */}
      <main className="pt-16">
        <HeroSection />
        <DashboardWidgets />
        <PredictiveAlerts />
        <NavigationSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default AIDashboardHomepage;
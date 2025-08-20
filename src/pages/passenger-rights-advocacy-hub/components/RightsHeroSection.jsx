import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RightsHeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary via-secondary to-authority text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full"></div>
        <div className="absolute top-32 right-20 w-24 h-24 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 border border-white/20 rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <Icon name="Shield" size={24} color="white" strokeWidth={2.5} />
                </div>
                <span className="text-white/80 font-medium">Passenger Rights & Advocacy</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Know Your Rights,
                <span className="block text-trust">Protect Your Journey</span>
              </h1>
              
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
                Comprehensive legal guidance, compensation calculators, and advocacy tools to ensure your railway travel rights are protected and respected.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="secondary"
                size="lg"
                iconName="Calculator"
                iconPosition="left"
                className="bg-white text-primary hover:bg-white/90"
              >
                Compensation Calculator
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                iconName="Download"
                iconPosition="left"
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                Download Rights Guide
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">₹2.5Cr+</div>
                <div className="text-sm text-white/80">Compensation Secured</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">15,000+</div>
                <div className="text-sm text-white/80">Cases Resolved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">12</div>
                <div className="text-sm text-white/80">Languages Supported</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white">Quick Rights Check</h3>
                  <Icon name="Zap" size={20} color="white" />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-white/10 rounded-lg">
                    <Icon name="Clock" size={16} color="white" />
                    <span className="text-white text-sm">Delay compensation eligibility</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-white/10 rounded-lg">
                    <Icon name="RefreshCw" size={16} color="white" />
                    <span className="text-white text-sm">Refund policy guidelines</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-white/10 rounded-lg">
                    <Icon name="AlertTriangle" size={16} color="white" />
                    <span className="text-white text-sm">Safety violation reporting</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-white/10 rounded-lg">
                    <Icon name="FileText" size={16} color="white" />
                    <span className="text-white text-sm">Legal documentation help</span>
                  </div>
                </div>
                
                <Button
                  variant="secondary"
                  fullWidth
                  iconName="ArrowRight"
                  iconPosition="right"
                  className="bg-white text-primary hover:bg-white/90"
                >
                  Start Rights Assessment
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RightsHeroSection;
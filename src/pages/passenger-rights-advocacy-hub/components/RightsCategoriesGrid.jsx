import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RightsCategoriesGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const rightsCategories = [
    {
      id: 'compensation',
      title: 'Compensation Rights',
      description: 'Delay, cancellation, and service failure compensation guidelines',
      icon: 'IndianRupee',
      color: 'bg-success',
      stats: '₹50L+ recovered',
      features: [
        'Delay compensation calculator',
        'Cancellation refund policies',
        'Food quality compensation',
        'Berth allocation issues'
      ]
    },
    {
      id: 'refunds',
      title: 'Refund Policies',
      description: 'Complete guide to ticket refunds and cancellation procedures',
      icon: 'RefreshCw',
      color: 'bg-primary',
      stats: '2,500+ refunds',
      features: [
        'Online cancellation process',
        'Counter refund procedures',
        'Partial journey refunds',
        'Medical emergency refunds'
      ]
    },
    {
      id: 'safety',
      title: 'Safety Standards',
      description: 'Railway safety protocols and passenger protection measures',
      icon: 'Shield',
      color: 'bg-warning',
      stats: '500+ safety reports',
      features: [
        'Coach safety standards',
        'Food safety regulations',
        'Emergency procedures',
        'Security complaint process'
      ]
    },
    {
      id: 'accessibility',
      title: 'Accessibility Rights',
      description: 'Special provisions for differently-abled passengers',
      icon: 'Heart',
      color: 'bg-secondary',
      stats: '1,200+ assisted',
      features: [
        'Wheelchair accessibility',
        'Escort allowances',
        'Priority booking',
        'Special assistance services'
      ]
    },
    {
      id: 'consumer',
      title: 'Consumer Protection',
      description: 'Legal remedies and consumer court procedures',
      icon: 'Scale',
      color: 'bg-accent',
      stats: '800+ cases won',
      features: [
        'Consumer court filing',
        'RTI application process',
        'Legal documentation',
        'Advocate network access'
      ]
    },
    {
      id: 'digital',
      title: 'Digital Rights',
      description: 'Online booking, app issues, and digital service rights',
      icon: 'Smartphone',
      color: 'bg-trust',
      stats: '3,000+ resolved',
      features: [
        'App malfunction compensation',
        'Payment gateway issues',
        'Digital receipt problems',
        'Online booking disputes'
      ]
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Comprehensive Rights Coverage
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore detailed information about your railway passenger rights across all service categories
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rightsCategories?.map((category) => (
            <div
              key={category?.id}
              className={`group relative bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-all duration-300 cursor-pointer ${
                selectedCategory === category?.id ? 'ring-2 ring-primary shadow-lg' : ''
              }`}
              onClick={() => setSelectedCategory(selectedCategory === category?.id ? null : category?.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${category?.color} rounded-lg flex items-center justify-center text-white`}>
                  <Icon name={category?.icon} size={24} strokeWidth={2.5} />
                </div>
                <div className="text-right">
                  <div className="text-xs font-medium text-muted-foreground">Success Rate</div>
                  <div className="text-sm font-bold text-success">{category?.stats}</div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {category?.title}
              </h3>
              
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {category?.description}
              </p>

              <div className={`transition-all duration-300 overflow-hidden ${
                selectedCategory === category?.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="border-t border-border pt-4 mb-4">
                  <h4 className="font-medium text-foreground mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {category?.features?.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Icon name="Check" size={14} className="text-success" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="ExternalLink"
                  iconPosition="right"
                  className="text-primary hover:text-primary/80"
                >
                  Learn More
                </Button>
                
                <Icon 
                  name={selectedCategory === category?.id ? "ChevronUp" : "ChevronDown"} 
                  size={16} 
                  className="text-muted-foreground group-hover:text-primary transition-colors" 
                />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            iconName="BookOpen"
            iconPosition="left"
          >
            View Complete Rights Manual
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RightsCategoriesGrid;
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LegalResourcesSection = () => {
  const [activeTab, setActiveTab] = useState('templates');

  const documentTemplates = [
    {
      id: 'complaint_template',
      title: 'Formal Complaint Template',
      description: 'Standard format for filing railway service complaints',
      format: 'PDF',
      size: '245 KB',
      downloads: '12,450',
      languages: ['Hindi', 'English', 'Tamil', 'Telugu', 'Bengali']
    },
    {
      id: 'rti_application',
      title: 'RTI Application Template',
      description: 'Right to Information application for railway matters',
      format: 'PDF',
      size: '189 KB',
      downloads: '8,320',
      languages: ['Hindi', 'English', 'Marathi', 'Gujarati']
    },
    {
      id: 'consumer_court',
      title: 'Consumer Court Filing',
      description: 'Complete guide for consumer court proceedings',
      format: 'PDF',
      size: '567 KB',
      downloads: '5,670',
      languages: ['Hindi', 'English', 'Kannada', 'Malayalam']
    },
    {
      id: 'compensation_claim',
      title: 'Compensation Claim Form',
      description: 'Detailed compensation claim documentation',
      format: 'PDF',
      size: '298 KB',
      downloads: '15,890',
      languages: ['Hindi', 'English', 'Punjabi', 'Odia']
    }
  ];

  const legalExperts = [
    {
      id: 'adv_sharma',
      name: 'Adv. Rajesh Sharma',
      specialization: 'Railway Consumer Law',
      experience: '15 years',
      location: 'New Delhi',
      rating: 4.8,
      cases: '500+ cases',
      languages: ['Hindi', 'English'],
      contact: '+91-98765-43210',
      availability: 'Available'
    },
    {
      id: 'adv_patel',
      name: 'Adv. Priya Patel',
      specialization: 'Transportation Rights',
      experience: '12 years',
      location: 'Mumbai',
      rating: 4.9,
      cases: '350+ cases',
      languages: ['Hindi', 'English', 'Gujarati'],
      contact: '+91-98765-43211',
      availability: 'Busy'
    },
    {
      id: 'adv_kumar',
      name: 'Adv. Suresh Kumar',
      specialization: 'Consumer Protection',
      experience: '18 years',
      location: 'Chennai',
      rating: 4.7,
      cases: '600+ cases',
      languages: ['Tamil', 'English', 'Telugu'],
      contact: '+91-98765-43212',
      availability: 'Available'
    },
    {
      id: 'adv_singh',
      name: 'Adv. Manjeet Singh',
      specialization: 'Railway Accident Claims',
      experience: '20 years',
      location: 'Kolkata',
      rating: 4.9,
      cases: '400+ cases',
      languages: ['Bengali', 'Hindi', 'English'],
      contact: '+91-98765-43213',
      availability: 'Available'
    }
  ];

  const successStories = [
    {
      id: 'case_001',
      title: 'AC Failure Compensation - ₹15,000',
      description: 'Passenger received full compensation for 12-hour AC failure during summer journey from Delhi to Chennai.',
      duration: '21 days',
      category: 'Service Failure',
      outcome: 'Successful',
      amount: '₹15,000'
    },
    {
      id: 'case_002',
      title: 'Train Cancellation Refund - ₹8,500',
      description: 'Complete refund plus compensation for last-minute train cancellation affecting wedding attendance.',
      duration: '14 days',
      category: 'Cancellation',
      outcome: 'Successful',
      amount: '₹8,500'
    },
    {
      id: 'case_003',
      title: 'Food Poisoning Case - ₹25,000',
      description: 'Medical expenses and compensation awarded for food poisoning from railway catering service.',
      duration: '45 days',
      category: 'Health & Safety',
      outcome: 'Successful',
      amount: '₹25,000'
    },
    {
      id: 'case_004',
      title: 'Berth Allocation Issue - ₹5,000',
      description: 'Compensation for confirmed berth not provided, passenger had to travel in general compartment.',
      duration: '18 days',
      category: 'Booking Issue',
      outcome: 'Successful',
      amount: '₹5,000'
    }
  ];

  const tabs = [
    { id: 'templates', label: 'Document Templates', icon: 'FileText' },
    { id: 'experts', label: 'Legal Experts', icon: 'Users' },
    { id: 'success', label: 'Success Stories', icon: 'Trophy' }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Legal Resources & Support
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Access professional legal assistance, document templates, and proven success stories
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-8 bg-card rounded-lg p-2 border border-border max-w-md mx-auto">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === tab?.id
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span className="hidden sm:inline">{tab?.label}</span>
            </button>
          ))}
        </div>

        {/* Document Templates Tab */}
        {activeTab === 'templates' && (
          <div className="grid md:grid-cols-2 gap-6">
            {documentTemplates?.map((template) => (
              <div key={template?.id} className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name="FileText" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{template?.title}</h3>
                      <p className="text-sm text-muted-foreground">{template?.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">{template?.format}</div>
                    <div className="text-xs text-muted-foreground">{template?.size}</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Downloads:</span>
                    <span className="font-medium text-foreground">{template?.downloads}</span>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Available Languages:</div>
                    <div className="flex flex-wrap gap-2">
                      {template?.languages?.map((lang, index) => (
                        <span key={index} className="px-2 py-1 bg-muted rounded-md text-xs font-medium text-foreground">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-3 pt-4 border-t border-border">
                    <Button
                      variant="primary"
                      size="sm"
                      iconName="Download"
                      iconPosition="left"
                      className="flex-1"
                    >
                      Download
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Eye"
                      iconPosition="left"
                      className="flex-1"
                    >
                      Preview
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Legal Experts Tab */}
        {activeTab === 'experts' && (
          <div className="grid md:grid-cols-2 gap-6">
            {legalExperts?.map((expert) => (
              <div key={expert?.id} className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {expert?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{expert?.name}</h3>
                      <p className="text-sm text-muted-foreground">{expert?.specialization}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Icon name="MapPin" size={12} className="text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{expert?.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    expert?.availability === 'Available' ?'bg-success/10 text-success' :'bg-warning/10 text-warning'
                  }`}>
                    {expert?.availability}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Experience:</span>
                      <div className="font-medium text-foreground">{expert?.experience}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Cases:</span>
                      <div className="font-medium text-foreground">{expert?.cases}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Rating:</span>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)]?.map((_, i) => (
                        <Icon 
                          key={i} 
                          name="Star" 
                          size={14} 
                          className={i < Math.floor(expert?.rating) ? 'text-warning fill-current' : 'text-muted-foreground'} 
                        />
                      ))}
                      <span className="text-sm font-medium text-foreground ml-1">{expert?.rating}</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Languages:</div>
                    <div className="flex flex-wrap gap-2">
                      {expert?.languages?.map((lang, index) => (
                        <span key={index} className="px-2 py-1 bg-muted rounded-md text-xs font-medium text-foreground">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-3 pt-4 border-t border-border">
                    <Button
                      variant="primary"
                      size="sm"
                      iconName="Phone"
                      iconPosition="left"
                      className="flex-1"
                    >
                      Contact
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Calendar"
                      iconPosition="left"
                      className="flex-1"
                    >
                      Schedule
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Success Stories Tab */}
        {activeTab === 'success' && (
          <div className="grid md:grid-cols-2 gap-6">
            {successStories?.map((story) => (
              <div key={story?.id} className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                      <Icon name="Trophy" size={24} className="text-success" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{story?.title}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs font-medium">
                          {story?.category}
                        </span>
                        <span className="px-2 py-1 bg-success/10 text-success rounded-md text-xs font-medium">
                          {story?.outcome}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-success">{story?.amount}</div>
                    <div className="text-xs text-muted-foreground">{story?.duration}</div>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {story?.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="Clock" size={14} />
                    <span>Resolved in {story?.duration}</span>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="ExternalLink"
                    iconPosition="right"
                    className="text-primary hover:text-primary/80"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <div className="bg-card rounded-xl border border-border p-8 max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Scale" size={32} className="text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Need Personalized Legal Assistance?
            </h3>
            <p className="text-muted-foreground mb-6">
              Connect with our network of railway law experts for personalized guidance on your case
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="primary"
                iconName="MessageCircle"
                iconPosition="left"
              >
                Chat with Expert
              </Button>
              <Button
                variant="outline"
                iconName="Calendar"
                iconPosition="left"
              >
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LegalResourcesSection;
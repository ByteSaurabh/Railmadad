import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ComplaintForm from './components/ComplaintForm';
import AIAssistant from './components/AIAssistant';
import ComplaintTracker from './components/ComplaintTracker';
import RecentComplaints from './components/RecentComplaints';
import QuickActions from './components/QuickActions';

const SmartComplaintPortal = () => {
  const [activeTab, setActiveTab] = useState('file');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('english');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submittedComplaint, setSubmittedComplaint] = useState(null);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const tabs = [
    {
      id: 'file',
      name: 'File Complaint',
      icon: 'Plus',
      description: 'Submit a new complaint with AI assistance'
    },
    {
      id: 'track',
      name: 'Track Status',
      icon: 'Search',
      description: 'Monitor your complaint progress'
    },
    {
      id: 'history',
      name: 'My Complaints',
      icon: 'History',
      description: 'View your complaint history'
    },
    {
      id: 'quick',
      name: 'Quick Actions',
      icon: 'Zap',
      description: 'Emergency reports & shortcuts'
    }
  ];

  const handleComplaintSubmit = async (formData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const complaintId = `RMA${new Date()?.getFullYear()}${String(new Date()?.getMonth() + 1)?.padStart(2, '0')}${String(new Date()?.getDate())?.padStart(2, '0')}${String(Math.floor(Math.random() * 10000))?.padStart(5, '0')}`;
      
      const complaint = {
        id: complaintId,
        ...formData,
        submittedAt: new Date()?.toISOString(),
        status: 'submitted',
        blockchainHash: `0x${Math.random()?.toString(16)?.substr(2, 16)}...`
      };
      
      setSubmittedComplaint(complaint);
      setShowSuccessModal(true);
      
    } catch (error) {
      console.error('Error submitting complaint:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAISuggestion = (type, value) => {
    console.log('AI Suggestion applied:', type, value);
    // This would update the form data based on AI suggestions
  };

  const handleQuickAction = (actionType, data) => {
    if (actionType === 'voice' || actionType === 'photo') {
      setActiveTab('file');
    }
    console.log('Quick action:', actionType, data);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    setSubmittedComplaint(null);
    setActiveTab('track');
  };

  const stats = [
    {
      label: 'Total Complaints',
      value: '12,456',
      change: '+8.2%',
      icon: 'MessageSquare',
      color: 'text-primary'
    },
    {
      label: 'Resolved Today',
      value: '89',
      change: '+12.5%',
      icon: 'CheckCircle',
      color: 'text-success'
    },
    {
      label: 'Avg Resolution Time',
      value: '2.3 days',
      change: '-15.3%',
      icon: 'Clock',
      color: 'text-warning'
    },
    {
      label: 'Satisfaction Rate',
      value: '94.2%',
      change: '+2.1%',
      icon: 'Star',
      color: 'text-success'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Smart Complaint Portal - RailMadad AI</title>
        <meta name="description" content="File railway complaints with AI-powered categorization, multilingual support, and blockchain verification. Track your complaint status in real-time." />
        <meta name="keywords" content="railway complaints, AI assistance, blockchain verification, multilingual support, complaint tracking" />
      </Helmet>
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 via-secondary/5 to-background py-12">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Smart Complaint Portal
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Revolutionary AI-powered complaint system with multilingual support, 
                blockchain verification, and real-time tracking for transparent resolution.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats?.map((stat, index) => (
                <div key={index} className="bg-card border border-border rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Icon name={stat?.icon} size={20} className={stat?.color} />
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-1">
                    {stat?.value}
                  </div>
                  <div className="text-sm text-muted-foreground mb-1">
                    {stat?.label}
                  </div>
                  <div className={`text-xs font-medium ${
                    stat?.change?.startsWith('+') ? 'text-success' : 'text-destructive'
                  }`}>
                    {stat?.change} from last month
                  </div>
                </div>
              ))}
            </div>

            {/* Language Selector */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <Icon name="Globe" size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Available in 10+ Indian languages</span>
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-success" />
                <span className="text-sm text-success font-medium">Blockchain Verified</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 mb-8 p-1 bg-muted rounded-lg">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex-1 min-w-0 flex items-center justify-center space-x-2 px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeTab === tab?.id
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span className="hidden sm:inline">{tab?.name}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content Area */}
              <div className="lg:col-span-2">
                {activeTab === 'file' && (
                  <div className="bg-card border border-border rounded-lg p-6">
                    <div className="flex items-center space-x-3 mb-6">
                      <Icon name="Plus" size={24} className="text-primary" />
                      <div>
                        <h2 className="text-xl font-semibold text-foreground">
                          File New Complaint
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          AI-powered form with smart categorization and multilingual support
                        </p>
                      </div>
                    </div>
                    
                    <ComplaintForm 
                      onSubmit={handleComplaintSubmit}
                      isSubmitting={isSubmitting}
                    />
                  </div>
                )}

                {activeTab === 'track' && (
                  <div className="bg-card border border-border rounded-lg p-6">
                    <div className="flex items-center space-x-3 mb-6">
                      <Icon name="Search" size={24} className="text-primary" />
                      <div>
                        <h2 className="text-xl font-semibold text-foreground">
                          Track Complaint Status
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Real-time tracking with blockchain verification
                        </p>
                      </div>
                    </div>
                    
                    <ComplaintTracker />
                  </div>
                )}

                {activeTab === 'history' && (
                  <div className="bg-card border border-border rounded-lg p-6">
                    <div className="flex items-center space-x-3 mb-6">
                      <Icon name="History" size={24} className="text-primary" />
                      <div>
                        <h2 className="text-xl font-semibold text-foreground">
                          My Complaints
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          View and manage your complaint history
                        </p>
                      </div>
                    </div>
                    
                    <RecentComplaints />
                  </div>
                )}

                {activeTab === 'quick' && (
                  <div className="bg-card border border-border rounded-lg p-6">
                    <div className="flex items-center space-x-3 mb-6">
                      <Icon name="Zap" size={24} className="text-primary" />
                      <div>
                        <h2 className="text-xl font-semibold text-foreground">
                          Quick Actions
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Emergency reports and helpful shortcuts
                        </p>
                      </div>
                    </div>
                    
                    <QuickActions onNewComplaint={handleQuickAction} />
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* AI Assistant - Only show on file tab */}
                {activeTab === 'file' && (
                  <AIAssistant 
                    onSuggestion={handleAISuggestion}
                    currentFormData={{}}
                  />
                )}

                {/* System Status */}
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center space-x-2">
                    <Icon name="Activity" size={16} />
                    <span>Live System Status</span>
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">AI Processing</span>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-success rounded-full sensor-active"></div>
                        <span className="text-xs text-success">Active</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Blockchain Network</span>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-success rounded-full sensor-active"></div>
                        <span className="text-xs text-success">Verified</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Authority Response</span>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-warning rounded-full"></div>
                        <span className="text-xs text-warning">2.3h avg</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Help & Support */}
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center space-x-2">
                    <Icon name="HelpCircle" size={16} />
                    <span>Need Help?</span>
                  </h3>
                  
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Book"
                      iconPosition="left"
                      fullWidth
                    >
                      User Guide
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="MessageCircle"
                      iconPosition="left"
                      fullWidth
                    >
                      Live Chat
                    </Button>
                    
                    <Button
                      variant="destructive"
                      size="sm"
                      iconName="Phone"
                      iconPosition="left"
                      fullWidth
                    >
                      Emergency: 139
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Success Modal */}
      {showSuccessModal && submittedComplaint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-lg p-6 max-w-md mx-4 shadow-xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="CheckCircle" size={32} className="text-success" />
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Complaint Submitted Successfully!
              </h3>
              
              <p className="text-sm text-muted-foreground mb-4">
                Your complaint has been blockchain-verified and assigned ID:
              </p>
              
              <div className="bg-muted p-3 rounded-lg mb-4">
                <div className="font-mono text-sm font-semibold text-foreground">
                  {submittedComplaint?.id}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Blockchain Hash: {submittedComplaint?.blockchainHash}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={closeSuccessModal}
                  fullWidth
                >
                  Track Status
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => setShowSuccessModal(false)}
                  fullWidth
                >
                  File Another
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartComplaintPortal;
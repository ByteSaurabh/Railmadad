import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onNewComplaint }) => {
  const quickActions = [
    {
      id: 'emergency',
      title: 'Emergency Report',
      description: 'Report urgent safety concerns immediately',
      icon: 'AlertTriangle',
      color: 'bg-destructive text-destructive-foreground',
      action: () => console.log('Emergency report'),
      urgent: true
    },
    {
      id: 'voice_complaint',
      title: 'Voice Complaint',
      description: 'File complaint using voice recording',
      icon: 'Mic',
      color: 'bg-primary text-primary-foreground',
      action: () => onNewComplaint('voice')
    },
    {
      id: 'photo_complaint',
      title: 'Photo Complaint',
      description: 'Upload photos and describe the issue',
      icon: 'Camera',
      color: 'bg-secondary text-secondary-foreground',
      action: () => onNewComplaint('photo')
    },
    {
      id: 'ar_complaint',
      title: 'AR Assistant',
      description: 'Use camera to identify and report issues',
      icon: 'Scan',
      color: 'bg-accent text-accent-foreground',
      action: () => console.log('AR complaint'),
      badge: 'New'
    }
  ];

  const helpfulLinks = [
    {
      title: 'Passenger Rights',
      description: 'Know your rights and entitlements',
      icon: 'Shield',
      path: '/passenger-rights-advocacy-hub'
    },
    {
      title: 'Community Forum',
      description: 'Connect with fellow passengers',
      icon: 'MessageCircle',
      path: '/community-forum-support-network'
    },
    {
      title: 'IoT Monitoring',
      description: 'Check real-time infrastructure status',
      icon: 'Wifi',
      path: '/io-t-railway-monitoring-network'
    },
    {
      title: 'Authority Dashboard',
      description: 'View official responses and updates',
      icon: 'Users',
      path: '/authority-management-dashboard'
    }
  ];

  const complaintCategories = [
    { name: 'Cleanliness', icon: 'Sparkles', count: 156 },
    { name: 'Food Quality', icon: 'UtensilsCrossed', count: 89 },
    { name: 'Staff Behavior', icon: 'Users', count: 67 },
    { name: 'Technical Issues', icon: 'Settings', count: 134 },
    { name: 'Safety Concerns', icon: 'Shield', count: 45 },
    { name: 'Punctuality', icon: 'Clock', count: 203 }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions?.map((action) => (
          <button
            key={action?.id}
            onClick={action?.action}
            className={`relative p-4 rounded-lg text-left transition-all duration-200 hover:scale-105 hover:shadow-lg ${action?.color} ${
              action?.urgent ? 'authority-glow' : ''
            }`}
          >
            {action?.badge && (
              <span className="absolute -top-2 -right-2 px-2 py-1 bg-warning text-warning-foreground text-xs font-medium rounded-full">
                {action?.badge}
              </span>
            )}
            
            <div className="flex items-center space-x-3 mb-2">
              <Icon name={action?.icon} size={24} />
              <h3 className="font-semibold">{action?.title}</h3>
            </div>
            
            <p className="text-sm opacity-90">
              {action?.description}
            </p>
            
            {action?.urgent && (
              <div className="flex items-center space-x-1 mt-2 text-xs">
                <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                <span>24/7 Available</span>
              </div>
            )}
          </button>
        ))}
      </div>
      {/* Popular Categories */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="TrendingUp" size={20} />
          <span>Popular Complaint Categories</span>
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {complaintCategories?.map((category) => (
            <button
              key={category?.name}
              onClick={() => onNewComplaint('category', category?.name?.toLowerCase()?.replace(' ', '_'))}
              className="p-3 bg-muted/50 hover:bg-muted rounded-lg transition-colors text-center group"
            >
              <Icon 
                name={category?.icon} 
                size={20} 
                className="mx-auto mb-2 text-muted-foreground group-hover:text-primary transition-colors" 
              />
              <div className="text-xs font-medium text-foreground mb-1">
                {category?.name}
              </div>
              <div className="text-xs text-muted-foreground">
                {category?.count} reports
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Helpful Links */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="ExternalLink" size={20} />
          <span>Helpful Resources</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {helpfulLinks?.map((link) => (
            <Link
              key={link?.path}
              to={link?.path}
              className="flex items-center space-x-3 p-3 bg-muted/30 hover:bg-muted rounded-lg transition-colors group"
            >
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Icon name={link?.icon} size={16} className="text-primary" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {link?.title}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {link?.description}
                </p>
              </div>
              
              <Icon name="ChevronRight" size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          ))}
        </div>
      </div>
      {/* System Status */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Activity" size={20} />
          <span>System Status</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-success rounded-full sensor-active"></div>
            <div>
              <div className="text-sm font-medium text-foreground">AI Processing</div>
              <div className="text-xs text-muted-foreground">Online & Active</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-success rounded-full sensor-active"></div>
            <div>
              <div className="text-sm font-medium text-foreground">Blockchain Network</div>
              <div className="text-xs text-muted-foreground">Verified & Secure</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-success rounded-full sensor-active"></div>
            <div>
              <div className="text-sm font-medium text-foreground">Authority Response</div>
              <div className="text-xs text-muted-foreground">Avg 2.3 hours</div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-success/10 rounded-lg">
          <div className="flex items-center space-x-2 text-success">
            <Icon name="CheckCircle" size={16} />
            <span className="text-sm font-medium">All systems operational</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Last updated: {new Date()?.toLocaleTimeString('en-IN')}
          </p>
        </div>
      </div>
      {/* Emergency Contact */}
      <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <Icon name="Phone" size={20} className="text-destructive" />
          <div>
            <h4 className="text-sm font-semibold text-foreground">Emergency Helpline</h4>
            <p className="text-xs text-muted-foreground">For immediate assistance call</p>
          </div>
          <div className="ml-auto">
            <Button
              variant="destructive"
              size="sm"
              iconName="Phone"
              iconPosition="left"
            >
              139
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggle }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const location = useLocation();

  const navigationSections = [
    {
      title: 'Core Services',
      items: [
        {
          name: 'AI Dashboard',
          path: '/ai-dashboard-homepage',
          icon: 'BarChart3',
          description: 'Real-time analytics & insights'
        },
        {
          name: 'Smart Complaints',
          path: '/smart-complaint-portal',
          icon: 'MessageSquare',
          description: 'AI-powered complaint filing',
          badge: 'New'
        },
        {
          name: 'IoT Monitoring',
          path: '/io-t-railway-monitoring-network',
          icon: 'Wifi',
          description: 'Live infrastructure tracking'
        }
      ]
    },
    {
      title: 'Advocacy & Support',
      items: [
        {
          name: 'Passenger Rights',
          path: '/passenger-rights-advocacy-hub',
          icon: 'Shield',
          description: 'Know your rights & protections'
        },
        {
          name: 'Community Forum',
          path: '/community-forum-support-network',
          icon: 'MessageCircle',
          description: 'Connect with fellow passengers'
        }
      ]
    },
    {
      title: 'Administration',
      items: [
        {
          name: 'Authority Dashboard',
          path: '/authority-management-dashboard',
          icon: 'Users',
          description: 'Railway authority management',
          restricted: true
        }
      ]
    }
  ];

  const quickActions = [
    {
      name: 'File Complaint',
      icon: 'Plus',
      action: () => console.log('Quick complaint filing'),
      variant: 'default'
    },
    {
      name: 'Emergency',
      icon: 'AlertTriangle',
      action: () => console.log('Emergency report'),
      variant: 'destructive'
    }
  ];

  const isActivePath = (path) => location?.pathname === path;

  const toggleSubmenu = (index) => {
    setActiveSubmenu(activeSubmenu === index ? null : index);
  };

  const closeMobile = () => {
    setIsMobileOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className={`p-4 border-b border-border ${isCollapsed ? 'px-2' : ''}`}>
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Train" size={18} color="white" strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="font-semibold text-sm text-foreground">RailMadad AI</h2>
                <p className="text-xs text-muted-foreground font-mono">Navigation</p>
              </div>
            </div>
          )}
          
          {onToggle && (
            <button
              onClick={onToggle}
              className="p-1.5 rounded-md hover:bg-muted transition-colors"
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <Icon 
                name={isCollapsed ? "ChevronRight" : "ChevronLeft"} 
                size={16} 
              />
            </button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-6">
          {navigationSections?.map((section, sectionIndex) => (
            <div key={section?.title} className={`${isCollapsed ? 'px-2' : 'px-4'}`}>
              {!isCollapsed && (
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  {section?.title}
                </h3>
              )}
              
              <div className="space-y-1">
                {section?.items?.map((item) => (
                  <div key={item?.path}>
                    <Link
                      to={item?.path}
                      onClick={closeMobile}
                      className={`group flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                        isActivePath(item?.path)
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      } ${isCollapsed ? 'justify-center' : ''}`}
                      title={isCollapsed ? item?.name : ''}
                    >
                      <div className="relative">
                        <Icon 
                          name={item?.icon} 
                          size={18} 
                          className={`${isActivePath(item?.path) ? 'text-primary-foreground' : ''}`}
                        />
                        {item?.badge && !isCollapsed && (
                          <span className="absolute -top-1 -right-1 w-2 h-2 bg-success rounded-full"></span>
                        )}
                      </div>
                      
                      {!isCollapsed && (
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="truncate">{item?.name}</span>
                            {item?.badge && (
                              <span className="ml-2 px-1.5 py-0.5 text-xs font-medium bg-success text-success-foreground rounded-full">
                                {item?.badge}
                              </span>
                            )}
                            {item?.restricted && (
                              <Icon name="Lock" size={12} className="ml-2 opacity-60" />
                            )}
                          </div>
                          {item?.description && (
                            <p className="text-xs text-muted-foreground mt-0.5 truncate">
                              {item?.description}
                            </p>
                          )}
                        </div>
                      )}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Quick Actions */}
      <div className={`p-4 border-t border-border ${isCollapsed ? 'px-2' : ''}`}>
        {!isCollapsed && (
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Quick Actions
          </h3>
        )}
        
        <div className={`space-y-2 ${isCollapsed ? 'space-y-3' : ''}`}>
          {quickActions?.map((action, index) => (
            <Button
              key={index}
              variant={action?.variant}
              size={isCollapsed ? 'icon' : 'sm'}
              iconName={action?.icon}
              iconPosition={isCollapsed ? undefined : 'left'}
              onClick={action?.action}
              fullWidth={!isCollapsed}
              title={isCollapsed ? action?.name : ''}
            >
              {!isCollapsed && action?.name}
            </Button>
          ))}
        </div>
      </div>

      {/* System Status */}
      {!isCollapsed && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full sensor-active"></div>
              <span className="text-muted-foreground">System Status</span>
            </div>
            <span className="text-success font-medium">Online</span>
          </div>
          
          <div className="mt-2 text-xs text-muted-foreground font-mono">
            Last updated: {new Date()?.toLocaleTimeString()}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside 
        className={`hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex-col bg-card border-r border-border transition-all duration-300 ${
          isCollapsed ? 'lg:w-16' : 'lg:w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={closeMobile}
        />
      )}

      {/* Mobile Sidebar */}
      <aside 
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed bottom-4 left-4 z-40 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-200 touch-target"
        aria-label="Open sidebar"
      >
        <Icon name="Menu" size={20} />
      </button>
    </>
  );
};

export default Sidebar;
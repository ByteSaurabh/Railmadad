import React, { useState, useEffect } from 'react';
import LoginModal from './LoginModal';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import { useAuth } from '../../utils/auth.jsx';
import { signOut } from 'firebase/auth';
import { auth } from '../../utils/firebase';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const location = useLocation();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    {
      name: 'AI Dashboard',
      path: '/ai-dashboard-homepage',
      icon: 'BarChart3'
    },
    {
      name: 'Smart Complaints',
      path: '/smart-complaint-portal',
      icon: 'MessageSquare'
    },
    {
      name: 'IoT Monitoring',
      path: '/io-t-railway-monitoring-network',
      icon: 'Wifi'
    },
    {
      name: 'Passenger Rights',
      path: '/passenger-rights-advocacy-hub',
      icon: 'Shield'
    }
  ];

  const moreItems = [
    {
      name: 'Authority Dashboard',
      path: '/authority-management-dashboard',
      icon: 'Users'
    },
    {
      name: 'Community Forum',
      path: '/community-forum-support-network',
      icon: 'MessageCircle'
    }
  ];

  const isActivePath = (path) => location?.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-border' 
          : 'bg-white border-b border-border'
      }`}
    >
      <div className="w-full">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <Link to="/ai-dashboard-homepage" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center authority-glow">
                  <Icon name="Train" size={24} color="white" strokeWidth={2.5} />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full flex items-center justify-center blockchain-pulse">
                  <Icon name="Shield" size={10} color="white" strokeWidth={3} />
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  RailMadad AI
                </h1>
                <p className="text-xs text-muted-foreground font-mono">
                  Intelligent Railway Advocacy
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.name}</span>
              </Link>
            ))}
            
            {/* More Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200">
                <Icon name="MoreHorizontal" size={16} />
                <span>More</span>
              </button>
              
              <div className="absolute top-full right-0 mt-2 w-56 bg-popover border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-2">
                  {moreItems?.map((item) => (
                    <Link
                      key={item?.path}
                      to={item?.path}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors ${
                        isActivePath(item?.path)
                          ? 'bg-primary text-primary-foreground'
                          : 'text-popover-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon name={item?.icon} size={16} />
                      <span>{item?.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            {/* Live Status Indicator */}
            <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 bg-success/10 rounded-full">
              <div className="w-2 h-2 bg-success rounded-full sensor-active"></div>
              <span className="text-xs font-medium text-success">System Active</span>
            </div>

            {/* Emergency Button */}
            <Button
              variant="destructive"
              size="sm"
              iconName="AlertTriangle"
              iconPosition="left"
              className="hidden sm:flex"
            >
              Emergency
            </Button>

            {/* Dark Mode Button */}
            <Button
              variant={darkMode ? "default" : "outline"}
              size="sm"
              iconName={darkMode ? "Moon" : "Sun"}
              iconPosition="left"
              className="hidden sm:flex"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? "Dark" : "Light"}
            </Button>

            {/* Login/Logout Button */}
            {!user ? (
              <>
                <Button
                  variant="default"
                  size="sm"
                  iconName="User"
                  iconPosition="left"
                  className="hidden sm:flex"
                  onClick={() => setIsLoginOpen(true)}
                >
                  Login
                </Button>
                {/* Register Button */}
                <a href="/register">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="UserPlus"
                    iconPosition="left"
                    className="hidden sm:flex"
                  >
                    Register
                  </Button>
                </a>
              </>
            ) : (
              <Button
                variant="outline"
                size="sm"
                iconName="LogOut"
                iconPosition="left"
                className="hidden sm:flex"
                onClick={() => {
                  signOut(auth);
                  window.location.href = "/";
                }}
              >
                Logout
              </Button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors touch-target"
              aria-label="Toggle mobile menu"
            >
              <Icon 
                name={isMobileMenuOpen ? "X" : "Menu"} 
                size={24} 
                className="transition-transform duration-200"
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen 
              ? 'max-h-screen opacity-100' :'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="px-4 py-4 bg-muted/50 border-t border-border">
            <nav className="space-y-2">
              {[...navigationItems, ...moreItems]?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors touch-target ${
                    isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.name}</span>
                </Link>
              ))}
            </nav>
            
            <div className="mt-4 pt-4 border-t border-border">
              <Button
                variant="destructive"
                size="sm"
                iconName="AlertTriangle"
                iconPosition="left"
                fullWidth
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Emergency Report
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Login Modal */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </header>
  );
};

export default Header;
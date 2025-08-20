import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const Footer = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [currentYear] = useState(new Date()?.getFullYear());

  useEffect(() => {
    const savedLanguage = localStorage.getItem('railmadad_language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const footerContent = {
    en: {
      tagline: 'Transforming Railway Complaints with AI Intelligence',
      quickLinks: 'Quick Links',
      services: 'Services',
      support: 'Support & Resources',
      connect: 'Connect With Us',
      newsletter: 'Stay Updated',
      newsletterDesc: 'Get the latest updates on railway services and AI innovations',
      subscribe: 'Subscribe',
      emailPlaceholder: 'Enter your email',
      copyright: 'All rights reserved. RailMadad AI - Official Indian Railways Partner',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      accessibility: 'Accessibility',
      contact: 'Contact Us'
    },
    hi: {
      tagline: 'AI इंटेलिजेंस के साथ रेलवे शिकायतों को बदलना',
      quickLinks: 'त्वरित लिंक',
      services: 'सेवाएं',
      support: 'सहायता और संसाधन',
      connect: 'हमसे जुड़ें',
      newsletter: 'अपडेट रहें',
      newsletterDesc: 'रेलवे सेवाओं और AI नवाचारों पर नवीनतम अपडेट प्राप्त करें',
      subscribe: 'सदस्यता लें',
      emailPlaceholder: 'अपना ईमेल दर्ज करें',
      copyright: 'सभी अधिकार सुरक्षित। RailMadad AI - आधिकारिक भारतीय रेलवे पार्टनर',
      privacy: 'गोपनीयता नीति',
      terms: 'सेवा की शर्तें',
      accessibility: 'पहुंच',
      contact: 'संपर्क करें'
    },
    ta: {
      tagline: 'AI நுண்ணறிவுடன் ரயில்வே புகார்களை மாற்றுதல்',
      quickLinks: 'விரைவு இணைப்புகள்',
      services: 'சேவைகள்',
      support: 'ஆதரவு மற்றும் வளங்கள்',
      connect: 'எங்களுடன் இணையுங்கள்',
      newsletter: 'புதுப்பித்த நிலையில் இருங்கள்',
      newsletterDesc: 'ரயில்வே சேவைகள் மற்றும் AI கண்டுபிடிப்புகளில் சமீபத்திய புதுப்பிப்புகளைப் பெறுங்கள்',
      subscribe: 'குழுசேரவும்',
      emailPlaceholder: 'உங்கள் மின்னஞ்சலை உள்ளிடவும்',
      copyright: 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை। RailMadad AI - அதிகாரப்பூர்வ இந்திய ரயில்வே பார்ட்னர்',
      privacy: 'தனியுரிமைக் கொள்கை',
      terms: 'சேவை விதிமுறைகள்',
      accessibility: 'அணுகல்',
      contact: 'எங்களைத் தொடர்பு கொள்ளுங்கள்'
    },
    te: {
      tagline: 'AI ఇంటెలిజెన్స్‌తో రైల్వే ఫిర్యాదులను మార్చడం',
      quickLinks: 'త్వరిత లింక్‌లు',
      services: 'సేవలు',
      support: 'మద్దతు మరియు వనరులు',
      connect: 'మాతో కనెక్ట్ అవ్వండి',
      newsletter: 'అప్‌డేట్‌గా ఉండండి',
      newsletterDesc: 'రైల్వే సేవలు మరియు AI ఆవిష్కరణలపై తాజా అప్‌డేట్‌లను పొందండి',
      subscribe: 'సబ్‌స్క్రైబ్ చేయండి',
      emailPlaceholder: 'మీ ఇమెయిల్ ఎంటర్ చేయండి',
      copyright: 'అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి। RailMadad AI - అధికారిక ఇండియన్ రైల్వేస్ పార్టనర్',
      privacy: 'గోప్యతా విధానం',
      terms: 'సేవా నిబంధనలు',
      accessibility: 'యాక్సెసిబిలిటీ',
      contact: 'మమ్మల్ని సంప్రదించండి'
    }
  };

  const content = footerContent?.[currentLanguage];

  const quickLinks = [
    { name: 'AI Dashboard', path: '/ai-dashboard-homepage' },
    { name: 'Smart Complaints', path: '/smart-complaint-portal' },
    { name: 'IoT Monitoring', path: '/io-t-railway-monitoring-network' },
    { name: 'Passenger Rights', path: '/passenger-rights-advocacy-hub' }
  ];

  const services = [
    { name: 'Authority Dashboard', path: '/authority-management-dashboard' },
    { name: 'Community Forum', path: '/community-forum-support-network' },
    { name: 'Emergency Support', path: '#' },
    { name: 'Mobile App', path: '#' }
  ];

  const supportLinks = [
    { name: 'Help Center', path: '#' },
    { name: 'User Guide', path: '#' },
    { name: 'API Documentation', path: '#' },
    { name: 'System Status', path: '#' }
  ];

  const socialLinks = [
    { name: 'Twitter', icon: 'Twitter', url: '#' },
    { name: 'Facebook', icon: 'Facebook', url: '#' },
    { name: 'LinkedIn', icon: 'Linkedin', url: '#' },
    { name: 'YouTube', icon: 'Youtube', url: '#' }
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Icon name="Train" size={24} color="white" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">RailMadad AI</h3>
                  <p className="text-xs text-muted-foreground font-mono">
                    Intelligent Railway Advocacy
                  </p>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {content?.tagline}
              </p>

              {/* Partnership Badge */}
              <div className="inline-flex items-center space-x-2 bg-muted/50 px-4 py-2 rounded-full border border-border mb-6">
                <Icon name="Shield" size={16} className="text-success" />
                <span className="text-sm font-medium text-foreground">Official Indian Railways Partner</span>
                <div className="w-2 h-2 bg-success rounded-full sensor-active"></div>
              </div>

              {/* Newsletter Signup */}
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">{content?.newsletter}</h4>
                <p className="text-sm text-muted-foreground">{content?.newsletterDesc}</p>
                <div className="flex space-x-2">
                  <input
                    type="email"
                    placeholder={content?.emailPlaceholder}
                    className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <Button
                    variant="default"
                    size="sm"
                    iconName="Send"
                    iconPosition="right"
                  >
                    {content?.subscribe}
                  </Button>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">{content?.quickLinks}</h4>
              <ul className="space-y-3">
                {quickLinks?.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link?.path}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link?.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">{content?.services}</h4>
              <ul className="space-y-3">
                {services?.map((service, index) => (
                  <li key={index}>
                    <Link
                      to={service?.path}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {service?.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">{content?.support}</h4>
              <ul className="space-y-3">
                {supportLinks?.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link?.path}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link?.name}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Social Links */}
              <div className="mt-6">
                <h5 className="font-medium text-foreground mb-3">{content?.connect}</h5>
                <div className="flex space-x-2">
                  {socialLinks?.map((social, index) => (
                    <a
                      key={index}
                      href={social?.url}
                      className="w-8 h-8 bg-muted hover:bg-primary hover:text-primary-foreground rounded-lg flex items-center justify-center transition-all duration-200"
                      aria-label={social?.name}
                    >
                      <Icon name={social?.icon} size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © {currentYear} RailMadad AI. {content?.copyright}
            </div>
            
            <div className="flex items-center space-x-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {content?.privacy}
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {content?.terms}
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {content?.accessibility}
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {content?.contact}
              </a>
            </div>
          </div>

          {/* System Status */}
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full sensor-active"></div>
                <span>All Systems Operational</span>
              </div>
              <span>•</span>
              <span>Last updated: {new Date()?.toLocaleTimeString()}</span>
              <span>•</span>
              <span>Response time: &lt; 200ms</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
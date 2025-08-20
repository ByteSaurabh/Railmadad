import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [liveStats, setLiveStats] = useState({
    complaintsResolved: 230000,
    satisfactionRate: 94,
    avgResolutionTime: 48
  });

  const languages = [
    { code: 'en', name: 'English', flag: '🇮🇳' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' }
  ];

  const heroContent = {
    en: {
      title: "AI-Powered Railway Complaint Management",
      subtitle: "Transforming passenger grievances into intelligent solutions with real-time monitoring and predictive analytics",
      cta: "File Smart Complaint",
      emergencyCta: "Emergency Report"
    },
    hi: {
      title: "एआई-संचालित रेलवे शिकायत प्रबंधन",
      subtitle: "वास्तविक समय निगरानी और भविष्यवाणी विश्लेषण के साथ यात्री शिकायतों को बुद्धिमान समाधान में बदलना",
      cta: "स्मार्ट शिकायत दर्ज करें",
      emergencyCta: "आपातकालीन रिपोर्ट"
    },
    ta: {
      title: "AI-இயங்கும் ரயில்வே புகார் மேலாண்மை",
      subtitle: "நிகழ்நேர கண்காணிப்பு மற்றும் முன்கணிப்பு பகுப்பாய்வுடன் பயணிகள் புகார்களை அறிவார்ந்த தீர்வுகளாக மாற்றுதல்",
      cta: "ஸ்மார்ட் புகார் பதிவு செய்யுங்கள்",
      emergencyCta: "அவசர அறிக்கை"
    },
    te: {
      title: "AI-శక్తితో రైల్వే ఫిర్యాదుల నిర్వహణ",
      subtitle: "రియల్-టైమ్ మానిటరింగ్ మరియు ప్రిడిక్టివ్ అనలిటిక్స్‌తో ప్రయాణికుల ఫిర్యాదులను తెలివైన పరిష్కారాలుగా మార్చడం",
      cta: "స్మార్ట్ ఫిర్యాదు దాఖలు చేయండి",
      emergencyCta: "అత్యవసర నివేదిక"
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('railmadad_language') || 'en';
    setCurrentLanguage(savedLanguage);

    // Simulate live stats updates
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        complaintsResolved: prev?.complaintsResolved + Math.floor(Math.random() * 5),
        satisfactionRate: Math.min(99, prev?.satisfactionRate + (Math.random() > 0.7 ? 1 : 0)),
        avgResolutionTime: Math.max(24, prev?.avgResolutionTime + (Math.random() > 0.5 ? -1 : 1))
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleLanguageChange = (langCode) => {
    setCurrentLanguage(langCode);
    localStorage.setItem('railmadad_language', langCode);
  };

  const content = heroContent?.[currentLanguage];

  return (
    <section className="relative bg-gradient-to-br from-primary via-primary/90 to-secondary min-h-[600px] flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full"></div>
        <div className="absolute top-32 right-20 w-24 h-24 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-20 h-20 border border-white/20 rounded-full"></div>
      </div>
      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Section */}
          <div className="text-white space-y-8">
            {/* Language Switcher */}
            <div className="flex items-center space-x-2 mb-6">
              <Icon name="Globe" size={20} className="text-white/80" />
              <div className="flex space-x-1">
                {languages?.map((lang) => (
                  <button
                    key={lang?.code}
                    onClick={() => handleLanguageChange(lang?.code)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                      currentLanguage === lang?.code
                        ? 'bg-white text-primary shadow-md'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {lang?.flag} {lang?.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Partnership Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <Icon name="Shield" size={16} className="text-success" />
              <span className="text-sm font-medium">Official Indian Railways Partner</span>
              <div className="w-2 h-2 bg-success rounded-full sensor-active"></div>
            </div>

            {/* Main Content */}
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                {content?.title}
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 leading-relaxed max-w-2xl">
                {content?.subtitle}
              </p>
            </div>

            {/* Live Stats */}
            <div className="grid grid-cols-3 gap-6 py-6">
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-success">
                  {(liveStats?.complaintsResolved / 100000)?.toFixed(1)}L+
                </div>
                <div className="text-sm text-white/80 mt-1">Complaints Resolved</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-warning">
                  {liveStats?.satisfactionRate}%
                </div>
                <div className="text-sm text-white/80 mt-1">Satisfaction Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-trust">
                  {liveStats?.avgResolutionTime}h
                </div>
                <div className="text-sm text-white/80 mt-1">Avg Resolution</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="secondary"
                size="lg"
                iconName="MessageSquare"
                iconPosition="left"
                className="bg-white text-primary hover:bg-white/90 shadow-lg"
              >
                {content?.cta}
              </Button>
              <Button
                variant="destructive"
                size="lg"
                iconName="AlertTriangle"
                iconPosition="left"
                className="shadow-lg"
              >
                {content?.emergencyCta}
              </Button>
            </div>
          </div>

          {/* Visual Section */}
          <div className="relative">
            {/* Main Dashboard Preview */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-semibold text-lg">Live Command Center</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full sensor-active"></div>
                  <span className="text-white/80 text-sm">Real-time</span>
                </div>
              </div>

              {/* Mini Charts */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/80 text-sm">Complaints Today</span>
                    <Icon name="TrendingUp" size={16} className="text-success" />
                  </div>
                  <div className="text-2xl font-bold text-white">1,247</div>
                  <div className="text-xs text-success">+12% from yesterday</div>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/80 text-sm">Active Issues</span>
                    <Icon name="AlertCircle" size={16} className="text-warning" />
                  </div>
                  <div className="text-2xl font-bold text-white">89</div>
                  <div className="text-xs text-warning">Requires attention</div>
                </div>
              </div>

              {/* Route Status */}
              <div className="space-y-3">
                <h4 className="text-white font-medium text-sm">Popular Routes Status</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                    <div className="flex items-center space-x-3">
                      <Icon name="Train" size={16} className="text-white" />
                      <span className="text-white text-sm">Delhi - Mumbai</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span className="text-success text-xs">Normal</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                    <div className="flex items-center space-x-3">
                      <Icon name="Train" size={16} className="text-white" />
                      <span className="text-white text-sm">Chennai - Bangalore</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-warning rounded-full"></div>
                      <span className="text-warning text-xs">Delayed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-success text-white p-3 rounded-full shadow-lg blockchain-pulse">
              <Icon name="Shield" size={20} />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-warning text-white p-3 rounded-full shadow-lg">
              <Icon name="Zap" size={20} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
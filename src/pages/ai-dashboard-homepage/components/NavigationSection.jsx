import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NavigationSection = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('railmadad_language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const navigationItems = {
    en: [
      {
        title: 'Smart Complaint Portal',
        description: 'File complaints with AI-powered categorization and real-time tracking',
        path: '/smart-complaint-portal',
        icon: 'MessageSquare',
        color: 'from-blue-500 to-blue-600',
        features: ['Voice Recognition', 'Multi-language Support', 'Real-time Status'],
        badge: 'Popular'
      },
      {
        title: 'IoT Railway Monitoring',
        description: 'Real-time infrastructure monitoring with sensor data and predictive maintenance',
        path: '/io-t-railway-monitoring-network',
        icon: 'Wifi',
        color: 'from-green-500 to-green-600',
        features: ['Live Sensor Data', 'Predictive Analytics', 'Station Health'],
        badge: 'Live'
      },
      {
        title: 'Passenger Rights Hub',
        description: 'Know your rights, compensation procedures, and legal resources',
        path: '/passenger-rights-advocacy-hub',
        icon: 'Shield',
        color: 'from-purple-500 to-purple-600',
        features: ['Rights Information', 'Compensation Guide', 'Legal Support'],
        badge: null
      },
      {
        title: 'Authority Dashboard',
        description: 'Railway authority management interface for complaint resolution',
        path: '/authority-management-dashboard',
        icon: 'Users',
        color: 'from-orange-500 to-orange-600',
        features: ['Admin Controls', 'Performance Metrics', 'Resolution Tools'],
        badge: 'Admin'
      },
      {
        title: 'Community Forum',
        description: 'Connect with fellow passengers and share experiences',
        path: '/community-forum-support-network',
        icon: 'MessageCircle',
        color: 'from-pink-500 to-pink-600',
        features: ['Peer Support', 'Experience Sharing', 'Community Help'],
        badge: null
      }
    ],
    hi: [
      {
        title: 'स्मार्ट शिकायत पोर्टल',
        description: 'AI-संचालित वर्गीकरण और वास्तविक समय ट्रैकिंग के साथ शिकायत दर्ज करें',
        path: '/smart-complaint-portal',
        icon: 'MessageSquare',
        color: 'from-blue-500 to-blue-600',
        features: ['आवाज पहचान', 'बहुभाषी समर्थन', 'वास्तविक समय स्थिति'],
        badge: 'लोकप्रिय'
      },
      {
        title: 'IoT रेलवे निगरानी',
        description: 'सेंसर डेटा और भविष्यवाणी रखरखाव के साथ वास्तविक समय अवसंरचना निगरानी',
        path: '/io-t-railway-monitoring-network',
        icon: 'Wifi',
        color: 'from-green-500 to-green-600',
        features: ['लाइव सेंसर डेटा', 'भविष्यवाणी विश्लेषण', 'स्टेशन स्वास्थ्य'],
        badge: 'लाइव'
      },
      {
        title: 'यात्री अधिकार केंद्र',
        description: 'अपने अधिकार, मुआवजा प्रक्रिया और कानूनी संसाधन जानें',
        path: '/passenger-rights-advocacy-hub',
        icon: 'Shield',
        color: 'from-purple-500 to-purple-600',
        features: ['अधिकार जानकारी', 'मुआवजा गाइड', 'कानूनी सहायता'],
        badge: null
      },
      {
        title: 'प्राधिकरण डैशबोर्ड',
        description: 'शिकायत समाधान के लिए रेलवे प्राधिकरण प्रबंधन इंटरफेस',
        path: '/authority-management-dashboard',
        icon: 'Users',
        color: 'from-orange-500 to-orange-600',
        features: ['व्यवस्थापक नियंत्रण', 'प्रदर्शन मेट्रिक्स', 'समाधान उपकरण'],
        badge: 'व्यवस्थापक'
      },
      {
        title: 'सामुदायिक मंच',
        description: 'साथी यात्रियों से जुड़ें और अनुभव साझा करें',
        path: '/community-forum-support-network',
        icon: 'MessageCircle',
        color: 'from-pink-500 to-pink-600',
        features: ['सहकर्मी सहायता', 'अनुभव साझाकरण', 'सामुदायिक सहायता'],
        badge: null
      }
    ],
    ta: [
      {
        title: 'ஸ்மார்ட் புகார் போர்ட்டல்',
        description: 'AI-இயங்கும் வகைப்படுத்தல் மற்றும் நிகழ்நேர கண்காணிப்புடன் புகார்களை பதிவு செய்யுங்கள்',
        path: '/smart-complaint-portal',
        icon: 'MessageSquare',
        color: 'from-blue-500 to-blue-600',
        features: ['குரல் அங்கீகாரம்', 'பல மொழி ஆதரவு', 'நிகழ்நேர நிலை'],
        badge: 'பிரபலமான'
      },
      {
        title: 'IoT ரயில்வே கண்காணிப்பு',
        description: 'சென்சார் தரவு மற்றும் முன்கணிப்பு பராமரிப்புடன் நிகழ்நேர உள்கட்டமைப்பு கண்காணிப்பு',
        path: '/io-t-railway-monitoring-network',
        icon: 'Wifi',
        color: 'from-green-500 to-green-600',
        features: ['நேரடி சென்சார் தரவு', 'முன்கணிப்பு பகுப்பாய்வு', 'நிலைய ஆரோக்கியம்'],
        badge: 'நேரடி'
      },
      {
        title: 'பயணிகள் உரிமைகள் மையம்',
        description: 'உங்கள் உரிமைகள், இழப்பீட்டு நடைமுறைகள் மற்றும் சட்ட வளங்களை அறியுங்கள்',
        path: '/passenger-rights-advocacy-hub',
        icon: 'Shield',
        color: 'from-purple-500 to-purple-600',
        features: ['உரிமைகள் தகவல்', 'இழப்பீட்டு வழிகாட்டி', 'சட்ட ஆதரவு'],
        badge: null
      },
      {
        title: 'அதிகாரிகள் டாஷ்போர்டு',
        description: 'புகார் தீர்வுக்கான ரயில்வே அதிகாரிகள் மேலாண்மை இடைமுகம்',
        path: '/authority-management-dashboard',
        icon: 'Users',
        color: 'from-orange-500 to-orange-600',
        features: ['நிர்வாக கட்டுப்பாடுகள்', 'செயல்திறன் அளவீடுகள்', 'தீர்வு கருவிகள்'],
        badge: 'நிர்வாகி'
      },
      {
        title: 'சமூக மன்றம்',
        description: 'சக பயணிகளுடன் இணைந்து அனுபவங்களைப் பகிருங்கள்',
        path: '/community-forum-support-network',
        icon: 'MessageCircle',
        color: 'from-pink-500 to-pink-600',
        features: ['சக ஆதரவு', 'அனுபவ பகிர்வு', 'சமூக உதவி'],
        badge: null
      }
    ],
    te: [
      {
        title: 'స్మార్ట్ ఫిర్యాదు పోర్టల్',
        description: 'AI-శక్తితో వర్గీకరణ మరియు రియల్-టైమ్ ట్రాకింగ్‌తో ఫిర్యాదులను దాఖలు చేయండి',
        path: '/smart-complaint-portal',
        icon: 'MessageSquare',
        color: 'from-blue-500 to-blue-600',
        features: ['వాయిస్ రికగ్నిషన్', 'బహుభాషా మద్దతు', 'రియల్-టైమ్ స్థితి'],
        badge: 'ప్రసిద్ధ'
      },
      {
        title: 'IoT రైల్వే మానిటరింగ్',
        description: 'సెన్సార్ డేటా మరియు ప్రిడిక్టివ్ మెయింటెనెన్స్‌తో రియల్-టైమ్ ఇన్‌ఫ్రాస్ట్రక్చర్ మానిటరింగ్',
        path: '/io-t-railway-monitoring-network',
        icon: 'Wifi',
        color: 'from-green-500 to-green-600',
        features: ['లైవ్ సెన్సార్ డేటా', 'ప్రిడిక్టివ్ అనలిటిక్స్', 'స్టేషన్ హెల్త్'],
        badge: 'లైవ్'
      },
      {
        title: 'ప్రయాణికుల హక్కుల కేంద్రం',
        description: 'మీ హక్కులు, పరిహారం విధానాలు మరియు చట్టపరమైన వనరులను తెలుసుకోండి',
        path: '/passenger-rights-advocacy-hub',
        icon: 'Shield',
        color: 'from-purple-500 to-purple-600',
        features: ['హక్కుల సమాచారం', 'పరిహారం గైడ్', 'చట్టపరమైన మద్దతు'],
        badge: null
      },
      {
        title: 'అథారిటీ డాష్‌బోర్డ్',
        description: 'ఫిర్యాదు పరిష్కారం కోసం రైల్వే అథారిటీ మేనేజ్‌మెంట్ ఇంటర్‌ఫేస్',
        path: '/authority-management-dashboard',
        icon: 'Users',
        color: 'from-orange-500 to-orange-600',
        features: ['అడ్మిన్ కంట్రోల్స్', 'పర్ఫార్మెన్స్ మెట్రిక్స్', 'రిజల్యూషన్ టూల్స్'],
        badge: 'అడ్మిన్'
      },
      {
        title: 'కమ్యూనిటీ ఫోరమ్',
        description: 'తోటి ప్రయాణికులతో కనెక్ట్ అవ్వండి మరియు అనుభవాలను పంచుకోండి',
        path: '/community-forum-support-network',
        icon: 'MessageCircle',
        color: 'from-pink-500 to-pink-600',
        features: ['పీర్ సపోర్ట్', 'ఎక్స్‌పీరియన్స్ షేరింగ్', 'కమ్యూనిటీ హెల్ప్'],
        badge: null
      }
    ]
  };

  const sectionTitles = {
    en: {
      title: 'Explore RailMadad AI Services',
      subtitle: 'Comprehensive railway complaint management and passenger advocacy tools',
      getStarted: 'Get Started'
    },
    hi: {
      title: 'RailMadad AI सेवाओं का अन्वेषण करें',
      subtitle: 'व्यापक रेलवे शिकायत प्रबंधन और यात्री वकालत उपकरण',
      getStarted: 'शुरू करें'
    },
    ta: {
      title: 'RailMadad AI சேவைகளை ஆராயுங்கள்',
      subtitle: 'விரிவான ரயில்வே புகார் மேலாண்மை மற்றும் பயணிகள் வக்காலத்து கருவிகள்',
      getStarted: 'தொடங்குங்கள்'
    },
    te: {
      title: 'RailMadad AI సేవలను అన్వేషించండి',
      subtitle: 'సమగ్ర రైల్వే ఫిర్యాదు నిర్వహణ మరియు ప్రయాణికుల న్యాయవాద సాధనాలు',
      getStarted: 'ప్రారంభించండి'
    }
  };

  const content = sectionTitles?.[currentLanguage];
  const items = navigationItems?.[currentLanguage];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {content?.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {content?.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items?.map((item, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl border border-border shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              {/* Header with Icon and Badge */}
              <div className={`bg-gradient-to-r ${item?.color} p-6 relative`}>
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Icon name={item?.icon} size={24} color="white" strokeWidth={2} />
                  </div>
                  {item?.badge && (
                    <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full">
                      {item?.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-white mt-4 mb-2">
                  {item?.title}
                </h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  {item?.description}
                </p>
              </div>

              {/* Features List */}
              <div className="p-6">
                <div className="space-y-3 mb-6">
                  {item?.features?.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <Icon name="Check" size={16} className="text-success" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <Link to={item?.path} className="block">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="ArrowRight"
                    iconPosition="right"
                    fullWidth
                    className="group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-200"
                  >
                    {content?.getStarted}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Access Section */}
        <div className="mt-16 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl border border-primary/20 p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Quick Access
            </h3>
            <p className="text-muted-foreground">
              Fast track to most used features
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              to="/smart-complaint-portal"
              className="flex flex-col items-center space-y-2 p-4 rounded-xl bg-white/50 hover:bg-white/80 transition-all duration-200 group"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Icon name="Plus" size={20} className="text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">File Complaint</span>
            </Link>

            <Link
              to="/io-t-railway-monitoring-network"
              className="flex flex-col items-center space-y-2 p-4 rounded-xl bg-white/50 hover:bg-white/80 transition-all duration-200 group"
            >
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center group-hover:bg-success/20 transition-colors">
                <Icon name="Activity" size={20} className="text-success" />
              </div>
              <span className="text-sm font-medium text-foreground">Live Status</span>
            </Link>

            <Link
              to="/passenger-rights-advocacy-hub"
              className="flex flex-col items-center space-y-2 p-4 rounded-xl bg-white/50 hover:bg-white/80 transition-all duration-200 group"
            >
              <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center group-hover:bg-warning/20 transition-colors">
                <Icon name="BookOpen" size={20} className="text-warning" />
              </div>
              <span className="text-sm font-medium text-foreground">Know Rights</span>
            </Link>

            <Link
              to="/community-forum-support-network"
              className="flex flex-col items-center space-y-2 p-4 rounded-xl bg-white/50 hover:bg-white/80 transition-all duration-200 group"
            >
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                <Icon name="Users" size={20} className="text-secondary" />
              </div>
              <span className="text-sm font-medium text-foreground">Community</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NavigationSection;
import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PredictiveAlerts = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('railmadad_language') || 'en';
    setCurrentLanguage(savedLanguage);

    // Simulate real-time alerts
    const mockAlerts = [
      {
        id: 1,
        type: 'delay',
        severity: 'medium',
        route: 'Delhi - Mumbai',
        trainNumber: '12951',
        message: {
          en: 'Potential 45-minute delay predicted due to heavy rainfall in Vadodara region',
          hi: 'वडोदरा क्षेत्र में भारी बारिश के कारण 45 मिनट की संभावित देरी की भविष्यवाणी',
          ta: 'வடோதரா பகுதியில் கனமழை காரணமாக 45 நிமிட தாமதம் எதிர்பார்க்கப்படுகிறது',
          te: 'వడోదరా ప్రాంతంలో భారీ వర్షాల కారణంగా 45 నిమిషాల ఆలస్యం అంచనా'
        },
        timestamp: new Date(Date.now() - 300000),
        confidence: 87,
        affectedPassengers: 1247
      },
      {
        id: 2,
        type: 'maintenance',
        severity: 'high',
        route: 'Chennai - Bangalore',
        trainNumber: '12607',
        message: {
          en: 'Track maintenance scheduled at Katpadi Junction may cause 20-minute delays',
          hi: 'कटपाडी जंक्शन पर ट्रैक रखरखाव से 20 मिनट की देरी हो सकती है',
          ta: 'கட்பாடி சந்திப்பில் பாதை பராமரிப்பு 20 நிமிட தாமதத்தை ஏற்படுத்தலாம்',
          te: 'కట్పాడి జంక్షన్‌లో ట్రాక్ మెయింటెనెన్స్ 20 నిమిషాల ఆలస్యం కలిగించవచ్చు'
        },
        timestamp: new Date(Date.now() - 600000),
        confidence: 95,
        affectedPassengers: 892
      },
      {
        id: 3,
        type: 'crowd',
        severity: 'low',
        route: 'Mumbai - Pune',
        trainNumber: '11301',
        message: {
          en: 'High passenger volume expected during evening hours (5-7 PM)',
          hi: 'शाम के समय (5-7 बजे) यात्रियों की अधिक संख्या की उम्मीद',
          ta: 'மாலை நேரங்களில் (5-7 மணி) அதிக பயணிகள் எதிர்பார்க்கப்படுகிறது',
          te: 'సాయంత్రం సమయంలో (5-7 గంటలు) అధిక ప్రయాణికుల సంఖ్య అంచనా'
        },
        timestamp: new Date(Date.now() - 900000),
        confidence: 78,
        affectedPassengers: 2156
      },
      {
        id: 4,
        type: 'weather',
        severity: 'medium',
        route: 'Kolkata - Bhubaneswar',
        trainNumber: '12801',
        message: {
          en: 'Cyclonic weather conditions may affect train schedules in coastal Odisha',
          hi: 'तटीय ओडिशा में चक्रवाती मौसम ट्रेन समय को प्रभावित कर सकता है',
          ta: 'கடலோர ஒடிசாவில் சூறாவளி வானிலை ரயில் அட்டவணையை பாதிக்கலாம்',
          te: 'తీరప్రాంత ఒడిశాలో తుఫాను వాతావరణం రైలు షెడ్యూల్‌లను ప్రభావితం చేయవచ్చు'
        },
        timestamp: new Date(Date.now() - 1200000),
        confidence: 82,
        affectedPassengers: 1534
      }
    ];

    setAlerts(mockAlerts);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setAlerts(prev => prev?.map(alert => ({
        ...alert,
        confidence: Math.max(60, alert?.confidence + (Math.random() > 0.5 ? 1 : -1))
      })));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityConfig = (severity) => {
    switch (severity) {
      case 'high':
        return {
          color: 'text-destructive',
          bg: 'bg-destructive/10',
          border: 'border-destructive/20',
          icon: 'AlertTriangle'
        };
      case 'medium':
        return {
          color: 'text-warning',
          bg: 'bg-warning/10',
          border: 'border-warning/20',
          icon: 'AlertCircle'
        };
      case 'low':
        return {
          color: 'text-blue-600',
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          icon: 'Info'
        };
      default:
        return {
          color: 'text-muted-foreground',
          bg: 'bg-muted',
          border: 'border-border',
          icon: 'Bell'
        };
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'delay': return 'Clock';
      case 'maintenance': return 'Wrench';
      case 'crowd': return 'Users';
      case 'weather': return 'Cloud';
      default: return 'Bell';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return timestamp?.toLocaleDateString();
  };

  const sectionTitles = {
    en: {
      title: 'Predictive Alerts & Insights',
      subtitle: 'AI-powered predictions to help you plan your journey better',
      viewAll: 'View All Alerts',
      subscribe: 'Subscribe to Alerts'
    },
    hi: {
      title: 'भविष्यवाणी अलर्ट और अंतर्दृष्टि',
      subtitle: 'आपकी यात्रा की बेहतर योजना बनाने के लिए AI-संचालित भविष्यवाणियां',
      viewAll: 'सभी अलर्ट देखें',
      subscribe: 'अलर्ट की सदस्यता लें'
    },
    ta: {
      title: 'முன்கணிப்பு எச்சரிக்கைகள் மற்றும் நுண்ணறிவுகள்',
      subtitle: 'உங்கள் பயணத்தை சிறப்பாக திட்டமிட AI-இயங்கும் முன்கணிப்புகள்',
      viewAll: 'அனைத்து எச்சரிக்கைகளையும் பார்க்கவும்',
      subscribe: 'எச்சரிக்கைகளுக்கு குழுசேரவும்'
    },
    te: {
      title: 'ప్రిడిక్టివ్ అలర్ట్స్ & ఇన్‌సైట్స్',
      subtitle: 'మీ ప్రయాణాన్ని మెరుగ్గా ప్లాన్ చేయడానికి AI-శక్తితో కూడిన అంచనాలు',
      viewAll: 'అన్ని అలర్ట్‌లను చూడండి',
      subscribe: 'అలర్ట్‌లకు సబ్‌స్క్రైబ్ చేయండి'
    }
  };

  const content = sectionTitles?.[currentLanguage];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {content?.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {content?.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Alerts List */}
          <div className="space-y-6">
            {alerts?.map((alert) => {
              const severityConfig = getSeverityConfig(alert?.severity);
              return (
                <div
                  key={alert?.id}
                  className={`bg-card rounded-xl border ${severityConfig?.border} p-6 shadow-sm hover:shadow-md transition-all duration-200`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-lg ${severityConfig?.bg}`}>
                      <Icon 
                        name={getTypeIcon(alert?.type)} 
                        size={20} 
                        className={severityConfig?.color}
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-foreground">
                            {alert?.route}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            #{alert?.trainNumber}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Icon 
                            name={severityConfig?.icon} 
                            size={16} 
                            className={severityConfig?.color}
                          />
                          <span className={`text-xs font-medium ${severityConfig?.color}`}>
                            {alert?.severity?.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-foreground mb-3 leading-relaxed">
                        {alert?.message?.[currentLanguage]}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Icon name="Clock" size={14} />
                            <span>{formatTimestamp(alert?.timestamp)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Icon name="Users" size={14} />
                            <span>{alert?.affectedPassengers?.toLocaleString()} affected</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Target" size={14} />
                          <span>{alert?.confidence}% confidence</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Alert Summary & Actions */}
          <div className="space-y-6">
            {/* Summary Stats */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Alert Summary
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-destructive rounded-full"></div>
                    <span className="text-sm text-muted-foreground">High Priority</span>
                  </div>
                  <span className="font-medium text-foreground">
                    {alerts?.filter(a => a?.severity === 'high')?.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-warning rounded-full"></div>
                    <span className="text-sm text-muted-foreground">Medium Priority</span>
                  </div>
                  <span className="font-medium text-foreground">
                    {alerts?.filter(a => a?.severity === 'medium')?.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-muted-foreground">Low Priority</span>
                  </div>
                  <span className="font-medium text-foreground">
                    {alerts?.filter(a => a?.severity === 'low')?.length}
                  </span>
                </div>
              </div>
            </div>

            {/* AI Insights */}
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border border-primary/20 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Brain" size={20} className="text-primary" />
                <h3 className="text-lg font-semibold text-foreground">AI Insights</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Icon name="TrendingUp" size={16} className="text-success mt-0.5" />
                  <p className="text-sm text-foreground">
                    Complaint resolution rate improved by 12% this month
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <Icon name="MapPin" size={16} className="text-warning mt-0.5" />
                  <p className="text-sm text-foreground">
                    Western region showing higher delay patterns due to monsoon
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <Icon name="Users" size={16} className="text-blue-500 mt-0.5" />
                  <p className="text-sm text-foreground">
                    Peak travel hours: 7-9 AM and 6-8 PM across major routes
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                variant="default"
                size="lg"
                iconName="Bell"
                iconPosition="left"
                fullWidth
              >
                {content?.subscribe}
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="ExternalLink"
                iconPosition="left"
                fullWidth
              >
                {content?.viewAll}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PredictiveAlerts;
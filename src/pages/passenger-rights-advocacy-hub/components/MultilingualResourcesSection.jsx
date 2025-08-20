import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const MultilingualResourcesSection = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [selectedResourceType, setSelectedResourceType] = useState('all');

  const languages = [
    { value: 'english', label: 'English', flag: '🇬🇧', speakers: '125M+' },
    { value: 'hindi', label: 'हिंदी (Hindi)', flag: '🇮🇳', speakers: '600M+' },
    { value: 'tamil', label: 'தமிழ் (Tamil)', flag: '🇮🇳', speakers: '75M+' },
    { value: 'telugu', label: 'తెలుగు (Telugu)', flag: '🇮🇳', speakers: '95M+' },
    { value: 'bengali', label: 'বাংলা (Bengali)', flag: '🇮🇳', speakers: '300M+' },
    { value: 'marathi', label: 'मराठी (Marathi)', flag: '🇮🇳', speakers: '83M+' },
    { value: 'gujarati', label: 'ગુજરાતી (Gujarati)', flag: '🇮🇳', speakers: '56M+' },
    { value: 'kannada', label: 'ಕನ್ನಡ (Kannada)', flag: '🇮🇳', speakers: '44M+' },
    { value: 'malayalam', label: 'മലയാളം (Malayalam)', flag: '🇮🇳', speakers: '38M+' },
    { value: 'punjabi', label: 'ਪੰਜਾਬੀ (Punjabi)', flag: '🇮🇳', speakers: '33M+' },
    { value: 'odia', label: 'ଓଡ଼ିଆ (Odia)', flag: '🇮🇳', speakers: '38M+' },
    { value: 'assamese', label: 'অসমীয়া (Assamese)', flag: '🇮🇳', speakers: '15M+' }
  ];

  const resourceTypes = [
    { value: 'all', label: 'All Resources' },
    { value: 'guides', label: 'Rights Guides' },
    { value: 'forms', label: 'Complaint Forms' },
    { value: 'videos', label: 'Video Tutorials' },
    { value: 'audio', label: 'Audio Guides' },
    { value: 'infographics', label: 'Visual Guides' }
  ];

  const multilingualResources = [
    {
      id: 'passenger_rights_guide',
      title: {
        english: 'Complete Passenger Rights Guide',
        hindi: 'संपूर्ण यात्री अधिकार गाइड',
        tamil: 'முழுமையான பயணிகள் உரிமைகள் வழிகாட்டி',
        telugu: 'పూర్తి ప్రయాణికుల హక్కుల గైడ్',
        bengali: 'সম্পূর্ণ যাত্রী অধিকার গাইড',
        marathi: 'संपूर्ण प्रवासी हक्क मार्गदर्शक',
        gujarati: 'સંપૂર્ણ પ્રવાસી અધિકાર માર્ગદર્શિકા',
        kannada: 'ಸಂಪೂರ್ಣ ಪ್ರಯಾಣಿಕರ ಹಕ್ಕುಗಳ ಮಾರ್ಗದರ್ಶಿ',
        malayalam: 'സമ്പൂർണ്ണ യാത്രക്കാരുടെ അവകാശ ഗൈഡ്',
        punjabi: 'ਸੰਪੂਰਨ ਯਾਤਰੀ ਅਧਿਕਾਰ ਗਾਈਡ',
        odia: 'ସମ୍ପୂର୍ଣ୍ଣ ଯାତ୍ରୀ ଅଧିକାର ଗାଇଡ୍',
        assamese: 'সম্পূৰ্ণ যাত্ৰী অধিকাৰ গাইড'
      },
      type: 'guides',
      format: 'PDF',
      size: '2.5 MB',
      downloads: 45000,
      rating: 4.8,
      lastUpdated: '2025-01-15'
    },
    {
      id: 'complaint_form_template',
      title: {
        english: 'Railway Complaint Form Template',
        hindi: 'रेलवे शिकायत फॉर्म टेम्प्लेट',
        tamil: 'ரயில்வே புகார் படிவ வார்ப்புரு',
        telugu: 'రైల్వే ఫిర్యాదు ఫారం టెంప్లేట్',
        bengali: 'রেলওয়ে অভিযোগ ফর্ম টেমপ্লেট',
        marathi: 'रेल्वे तक्रार फॉर्म टेम्प्लेट',
        gujarati: 'રેલવે ફરિયાદ ફોર્મ ટેમ્પ્લેટ',
        kannada: 'ರೈಲ್ವೆ ದೂರು ಫಾರ್ಮ್ ಟೆಂಪ್ಲೇಟ್',
        malayalam: 'റെയിൽവേ പരാതി ഫോം ടെംപ്ലേറ്റ്',
        punjabi: 'ਰੇਲਵੇ ਸ਼ਿਕਾਇਤ ਫਾਰਮ ਟੈਂਪਲੇਟ',
        odia: 'ରେଳବାଇ ଅଭିଯୋଗ ଫର୍ମ ଟେମ୍ପଲେଟ୍',
        assamese: 'ৰেলৱে অভিযোগ ফৰ্ম টেমপ্লেট'
      },
      type: 'forms',
      format: 'PDF',
      size: '850 KB',
      downloads: 32000,
      rating: 4.6,
      lastUpdated: '2025-01-10'
    },
    {
      id: 'compensation_calculator_video',
      title: {
        english: 'How to Calculate Compensation - Video Tutorial',
        hindi: 'मुआवजे की गणना कैसे करें - वीडियो ट्यूटोरियल',
        tamil: 'இழப்பீடு கணக்கிடுவது எப்படி - வீடியோ டுடோரியல்',
        telugu: 'పరిహారం ఎలా లెక్కించాలి - వీడియో ట్యుటోరియల్',
        bengali: 'ক্ষতিপূরণ কীভাবে গণনা করবেন - ভিডিও টিউটোরিয়াল',
        marathi: 'नुकसानभरपाईची गणना कशी करावी - व्हिडिओ ट्यूटोरियल',
        gujarati: 'વળતર કેવી રીતે ગણવું - વિડિયો ટ્યુટોરિયલ',
        kannada: 'ಪರಿಹಾರವನ್ನು ಹೇಗೆ ಲೆಕ್ಕಾಚಾರ ಮಾಡುವುದು - ವೀಡಿಯೊ ಟ್ಯುಟೋರಿಯಲ್',
        malayalam: 'നഷ്ടപരിഹാരം എങ്ങനെ കണക്കാക്കാം - വീഡിയോ ട്യൂട്ടോറിയൽ',
        punjabi: 'ਮੁਆਵਜ਼ਾ ਕਿਵੇਂ ਗਿਣਿਆ ਜਾਵੇ - ਵੀਡੀਓ ਟਿਊਟੋਰਿਅਲ',
        odia: 'କ୍ଷତିପୂରଣ କିପରି ଗଣନା କରିବେ - ଭିଡିଓ ଟ୍ୟୁଟୋରିଆଲ୍',
        assamese: 'ক্ষতিপূৰণ কেনেকৈ গণনা কৰিব - ভিডিঅ\' টিউটৰিয়েল'
      },
      type: 'videos',
      format: 'MP4',
      size: '125 MB',
      downloads: 28000,
      rating: 4.9,
      lastUpdated: '2025-01-08'
    },
    {
      id: 'rights_infographic',
      title: {
        english: 'Passenger Rights Visual Guide',
        hindi: 'यात्री अधिकार दृश्य गाइड',
        tamil: 'பயணிகள் உரிமைகள் காட்சி வழிகாட்டி',
        telugu: 'ప్రయాణికుల హక్కుల దృశ్య గైడ్',
        bengali: 'যাত্রী অধিকার ভিজ্যুয়াল গাইড',
        marathi: 'प्रवासी हक्क व्हिज्युअल गाईड',
        gujarati: 'પ્રવાસી અધિકાર વિઝ્યુઅલ ગાઇડ',
        kannada: 'ಪ್ರಯಾಣಿಕರ ಹಕ್ಕುಗಳ ದೃಶ್ಯ ಮಾರ್ಗದರ್ಶಿ',
        malayalam: 'യാത്രക്കാരുടെ അവകാശങ്ങളുടെ വിഷ്വൽ ഗൈഡ്',
        punjabi: 'ਯਾਤਰੀ ਅਧਿਕਾਰ ਵਿਜ਼ੂਅਲ ਗਾਈਡ',
        odia: 'ଯାତ୍ରୀ ଅଧିକାର ଭିଜୁଆଲ୍ ଗାଇଡ୍',
        assamese: 'যাত্ৰী অধিকাৰ ভিজুৱেল গাইড'
      },
      type: 'infographics',
      format: 'PNG',
      size: '5.2 MB',
      downloads: 18000,
      rating: 4.7,
      lastUpdated: '2025-01-12'
    }
  ];

  const regionalSpecificInfo = [
    {
      region: 'Northern Railway',
      languages: ['Hindi', 'English', 'Punjabi'],
      specialProvisions: [
        'Winter delay compensation guidelines',
        'Fog-related service disruption policies',
        'Festival season booking priorities'
      ],
      contactInfo: {
        helpline: '139 (Press 1 for Hindi)',
        email: 'nr.complaints@indianrailways.gov.in'
      }
    },
    {
      region: 'Southern Railway',
      languages: ['Tamil', 'Telugu', 'Kannada', 'Malayalam', 'English'],
      specialProvisions: [
        'Monsoon service adjustment policies',
        'Regional festival travel guidelines',
        'Coastal route safety protocols'
      ],
      contactInfo: {
        helpline: '139 (Press 2 for Tamil)',
        email: 'sr.complaints@indianrailways.gov.in'
      }
    },
    {
      region: 'Eastern Railway',
      languages: ['Bengali', 'Hindi', 'English', 'Assamese'],
      specialProvisions: [
        'Cyclone emergency procedures',
        'Cross-border travel documentation',
        'Cultural event travel arrangements'
      ],
      contactInfo: {
        helpline: '139 (Press 3 for Bengali)',
        email: 'er.complaints@indianrailways.gov.in'
      }
    },
    {
      region: 'Western Railway',
      languages: ['Gujarati', 'Marathi', 'Hindi', 'English'],
      specialProvisions: [
        'Business travel priority services',
        'Port connectivity guidelines',
        'Industrial area service standards'
      ],
      contactInfo: {
        helpline: '139 (Press 4 for Gujarati)',
        email: 'wr.complaints@indianrailways.gov.in'
      }
    }
  ];

  const filteredResources = multilingualResources?.filter(resource => 
    selectedResourceType === 'all' || resource?.type === selectedResourceType
  );

  const selectedLangData = languages?.find(lang => lang?.value === selectedLanguage);

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Multilingual Resources & Regional Support
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Access passenger rights information in your preferred language with region-specific guidelines
          </p>
        </div>

        {/* Language & Filter Selection */}
        <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-2xl mx-auto">
          <Select
            label="Select Language"
            placeholder="Choose your preferred language"
            options={languages?.map(lang => ({
              value: lang?.value,
              label: `${lang?.flag} ${lang?.label}`,
              description: `${lang?.speakers} speakers`
            }))}
            value={selectedLanguage}
            onChange={setSelectedLanguage}
            searchable
          />

          <Select
            label="Resource Type"
            placeholder="Filter by resource type"
            options={resourceTypes}
            value={selectedResourceType}
            onChange={setSelectedResourceType}
          />
        </div>

        {/* Selected Language Info */}
        {selectedLangData && (
          <div className="bg-card rounded-xl border border-border p-6 mb-12 max-w-2xl mx-auto">
            <div className="flex items-center space-x-4 mb-4">
              <div className="text-4xl">{selectedLangData?.flag}</div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">{selectedLangData?.label}</h3>
                <p className="text-muted-foreground">Spoken by {selectedLangData?.speakers} people</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-success">
              <Icon name="CheckCircle" size={16} />
              <span>All resources available in this language</span>
            </div>
          </div>
        )}

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredResources?.map((resource) => (
            <div key={resource?.id} className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    resource?.type === 'guides' ? 'bg-primary/10 text-primary' :
                    resource?.type === 'forms' ? 'bg-secondary/10 text-secondary' :
                    resource?.type === 'videos'? 'bg-warning/10 text-warning' : 'bg-accent/10 text-accent'
                  }`}>
                    <Icon 
                      name={
                        resource?.type === 'guides' ? 'BookOpen' :
                        resource?.type === 'forms' ? 'FileText' :
                        resource?.type === 'videos'? 'Play' : 'Image'
                      } 
                      size={24} 
                    />
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">{resource?.format}</div>
                    <div className="text-xs text-muted-foreground">{resource?.size}</div>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-2 leading-tight">
                {resource?.title?.[selectedLanguage] || resource?.title?.english}
              </h3>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Downloads:</span>
                  <span className="font-medium text-foreground">{resource?.downloads?.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Rating:</span>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)]?.map((_, i) => (
                      <Icon 
                        key={i} 
                        name="Star" 
                        size={12} 
                        className={i < Math.floor(resource?.rating) ? 'text-warning fill-current' : 'text-muted-foreground'} 
                      />
                    ))}
                    <span className="font-medium text-foreground ml-1">{resource?.rating}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Updated:</span>
                  <span className="font-medium text-foreground">
                    {new Date(resource.lastUpdated)?.toLocaleDateString('en-IN')}
                  </span>
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
          ))}
        </div>

        {/* Regional Specific Information */}
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
            Regional Railway Zones & Language Support
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {regionalSpecificInfo?.map((region, index) => (
              <div key={index} className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="MapPin" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground">{region?.region}</h4>
                    <p className="text-sm text-muted-foreground">Zone-specific support</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-foreground mb-2">Supported Languages:</div>
                    <div className="flex flex-wrap gap-2">
                      {region?.languages?.map((lang, langIndex) => (
                        <span key={langIndex} className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs font-medium">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium text-foreground mb-2">Special Provisions:</div>
                    <ul className="space-y-1">
                      {region?.specialProvisions?.map((provision, provIndex) => (
                        <li key={provIndex} className="flex items-start space-x-2 text-sm text-muted-foreground">
                          <Icon name="Check" size={14} className="text-success mt-0.5" />
                          <span>{provision}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="text-sm font-medium text-foreground mb-2">Contact Information:</div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Icon name="Phone" size={14} className="text-primary" />
                        <span className="text-muted-foreground">{region?.contactInfo?.helpline}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="Mail" size={14} className="text-primary" />
                        <span className="text-muted-foreground text-xs">{region?.contactInfo?.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Language Accessibility Features */}
        <div className="mt-16 bg-card rounded-xl border border-border p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Accessibility" size={32} className="text-success" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Accessibility Features
            </h3>
            <p className="text-muted-foreground">
              Ensuring rights information is accessible to all passengers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name="Volume2" size={24} className="text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Audio Support</h4>
              <p className="text-sm text-muted-foreground">
                Text-to-speech in regional languages for visually impaired passengers
              </p>
            </div>

            <div className="text-center p-4">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name="Type" size={24} className="text-secondary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Large Text</h4>
              <p className="text-sm text-muted-foreground">
                Adjustable font sizes and high contrast modes for better readability
              </p>
            </div>

            <div className="text-center p-4">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name="Smartphone" size={24} className="text-warning" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Mobile Optimized</h4>
              <p className="text-sm text-muted-foreground">
                Responsive design optimized for smartphones and tablets
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MultilingualResourcesSection;
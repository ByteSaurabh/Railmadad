import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIAssistant = ({ onSuggestion, currentFormData }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const aiSuggestions = [
    {
      id: 1,
      type: 'category',
      title: 'Suggested Category',
      content: 'Based on your description, this seems like a "Cleanliness Issue"',
      action: () => onSuggestion('category', 'cleanliness'),
      icon: 'Sparkles',
      confidence: 92
    },
    {
      id: 2,
      type: 'priority',
      title: 'Priority Assessment',
      content: 'This issue appears to be Medium Priority - affects passenger comfort',
      action: () => onSuggestion('priority', 'medium'),
      icon: 'TrendingUp',
      confidence: 87
    },
    {
      id: 3,
      type: 'similar',
      title: 'Similar Resolved Cases',
      content: '3 similar complaints resolved in avg 2.5 days',
      action: () => console.log('Show similar cases'),
      icon: 'History',
      confidence: 78
    },
    {
      id: 4,
      type: 'improvement',
      title: 'Description Enhancement',
      content: 'Consider adding specific coach number and time of occurrence',
      action: () => onSuggestion('description_tip', 'add_details'),
      icon: 'Edit',
      confidence: 85
    }
  ];

  const quickTemplates = [
    {
      category: 'cleanliness',
      subject: 'Washroom Cleanliness Issue',
      description: `The washroom in coach [COACH_NUMBER] is in poor condition:\n• Dirty floors and walls\n• Non-functional taps\n• No toilet paper or soap\n• Unpleasant odor\n\nThis is affecting passenger comfort and hygiene.`
    },
    {
      category: 'food',
      subject: 'Food Quality Complaint',
      description: `Poor quality food served during journey:\n• Food was cold/stale\n• Unhygienic packaging\n• Overpriced for quality\n• Staff behavior was unprofessional\n\nRequest immediate attention to catering services.`
    },
    {
      category: 'technical',
      subject: 'AC/Electrical Issue',
      description: `Technical malfunction in coach [COACH_NUMBER]:\n• Air conditioning not working\n• Charging points not functional\n• Lights flickering/not working\n• Fan speed issues\n\nCausing discomfort to passengers.`
    }
  ];

  useEffect(() => {
    if (currentFormData?.description && currentFormData?.description?.length > 20) {
      setIsAnalyzing(true);
      // Simulate AI analysis
      setTimeout(() => {
        setSuggestions(aiSuggestions);
        setIsAnalyzing(false);
      }, 2000);
    }
  }, [currentFormData?.description]);

  const applyTemplate = (template) => {
    onSuggestion('template', template);
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-success';
    if (confidence >= 80) return 'text-warning';
    return 'text-muted-foreground';
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm">
      {/* Header */}
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <Icon name="Bot" size={16} color="white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">AI Assistant</h3>
            <p className="text-xs text-muted-foreground">Smart suggestions & templates</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {isAnalyzing && (
            <div className="flex items-center space-x-1 text-primary">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-xs">Analyzing...</span>
            </div>
          )}
          <Icon 
            name={isExpanded ? "ChevronUp" : "ChevronDown"} 
            size={16} 
            className="text-muted-foreground"
          />
        </div>
      </div>
      {/* Content */}
      {isExpanded && (
        <div className="border-t border-border">
          {/* Quick Templates */}
          <div className="p-4 border-b border-border">
            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center space-x-2">
              <Icon name="FileText" size={14} />
              <span>Quick Templates</span>
            </h4>
            
            <div className="grid grid-cols-1 gap-2">
              {quickTemplates?.map((template, index) => (
                <button
                  key={index}
                  onClick={() => applyTemplate(template)}
                  className="text-left p-3 bg-muted/50 hover:bg-muted rounded-lg transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground group-hover:text-primary">
                      {template?.subject}
                    </span>
                    <Icon name="ArrowRight" size={12} className="text-muted-foreground group-hover:text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 capitalize">
                    {template?.category?.replace('_', ' ')} complaint template
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* AI Suggestions */}
          {suggestions?.length > 0 && (
            <div className="p-4">
              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center space-x-2">
                <Icon name="Sparkles" size={14} />
                <span>AI Suggestions</span>
              </h4>
              
              <div className="space-y-3">
                {suggestions?.map((suggestion) => (
                  <div key={suggestion?.id} className="p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Icon name={suggestion?.icon} size={14} className="text-primary" />
                        <span className="text-sm font-medium text-foreground">
                          {suggestion?.title}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className={`text-xs font-medium ${getConfidenceColor(suggestion?.confidence)}`}>
                          {suggestion?.confidence}%
                        </span>
                        <Icon name="Target" size={10} className={getConfidenceColor(suggestion?.confidence)} />
                      </div>
                    </div>
                    
                    <p className="text-xs text-muted-foreground mb-2">
                      {suggestion?.content}
                    </p>
                    
                    <Button
                      variant="outline"
                      size="xs"
                      iconName="Check"
                      iconPosition="left"
                      onClick={suggestion?.action}
                    >
                      Apply
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Help Tips */}
          <div className="p-4 bg-muted/20 border-t border-border">
            <div className="flex items-start space-x-3">
              <Icon name="Lightbulb" size={16} className="text-warning mt-0.5" />
              <div>
                <h5 className="text-sm font-medium text-foreground mb-1">Pro Tips</h5>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Include specific details like coach number, seat, and time</li>
                  <li>• Upload photos/videos for faster resolution</li>
                  <li>• Use voice recording in your preferred language</li>
                  <li>• Check similar resolved cases for reference</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AdvocacyToolsSection = () => {
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const advocacyTools = [
    {
      id: 'collective_action',
      title: 'Collective Action Platform',
      description: 'Join forces with other passengers for route improvements and policy changes',
      icon: 'Users',
      color: 'bg-primary',
      features: [
        'Create or join campaigns',
        'Petition government authorities',
        'Track campaign progress',
        'Share success stories'
      ],
      stats: {
        campaigns: '45 Active',
        participants: '12,500+',
        success: '78% Success Rate'
      }
    },
    {
      id: 'policy_tracker',
      title: 'Policy Change Tracker',
      description: 'Monitor railway policy changes and their impact on passenger rights',
      icon: 'FileSearch',
      color: 'bg-secondary',
      features: [
        'Real-time policy updates',
        'Impact analysis',
        'Comment on proposals',
        'Get notification alerts'
      ],
      stats: {
        policies: '23 Tracked',
        updates: '156 This Month',
        engagement: '89% Accuracy'
      }
    },
    {
      id: 'social_amplifier',
      title: 'Social Media Amplifier',
      description: 'Amplify your voice through coordinated social media campaigns',
      icon: 'Megaphone',
      color: 'bg-warning',
      features: [
        'Pre-written campaign posts',
        'Hashtag coordination',
        'Viral content creation',
        'Influencer network access'
      ],
      stats: {
        reach: '2.5M+ Reach',
        hashtags: '50+ Trending',
        engagement: '15% Avg Rate'
      }
    },
    {
      id: 'government_connect',
      title: 'Government Portal Integration',
      description: 'Direct integration with official government complaint portals',
      icon: 'Building',
      color: 'bg-accent',
      features: [
        'Auto-fill government forms',
        'Track official responses',
        'Escalation pathways',
        'RTI application support'
      ],
      stats: {
        portals: '8 Integrated',
        submissions: '5,600+',
        response: '72% Response Rate'
      }
    }
  ];

  const activeCampaigns = [
    {
      id: 'clean_trains',
      title: 'Clean Trains Initiative',
      description: 'Demanding better cleanliness standards in all railway coaches',
      category: 'Hygiene & Cleanliness',
      participants: 3420,
      target: 5000,
      progress: 68,
      timeLeft: '12 days',
      status: 'Active',
      impact: 'High',
      routes: ['Delhi-Mumbai', 'Chennai-Bangalore', 'Kolkata-Guwahati']
    },
    {
      id: 'punctuality_drive',
      title: 'On-Time Performance Drive',
      description: 'Pushing for improved punctuality on chronically delayed routes',
      category: 'Service Quality',
      participants: 2890,
      target: 4000,
      progress: 72,
      timeLeft: '8 days',
      status: 'Active',
      impact: 'Medium',
      routes: ['Delhi-Patna', 'Mumbai-Pune', 'Hyderabad-Vijayawada']
    },
    {
      id: 'food_quality',
      title: 'Railway Food Quality Standards',
      description: 'Establishing stricter food safety and quality protocols',
      category: 'Food & Catering',
      participants: 4560,
      target: 6000,
      progress: 76,
      timeLeft: '15 days',
      status: 'Trending',
      impact: 'High',
      routes: ['All Major Routes']
    },
    {
      id: 'accessibility_rights',
      title: 'Accessibility for All',
      description: 'Improving facilities for differently-abled passengers',
      category: 'Accessibility',
      participants: 1890,
      target: 3000,
      progress: 63,
      timeLeft: '20 days',
      status: 'Active',
      impact: 'High',
      routes: ['Metro Cities', 'Tier-1 Stations']
    }
  ];

  const recentWins = [
    {
      title: 'AC Coach Temperature Control',
      description: 'Successfully lobbied for standardized AC temperature controls',
      participants: 2500,
      timeframe: '3 months',
      impact: 'Implemented across 500+ trains'
    },
    {
      title: 'Digital Complaint Tracking',
      description: 'Pushed for real-time complaint status updates',
      participants: 1800,
      timeframe: '2 months',
      impact: 'Now available on all digital platforms'
    },
    {
      title: 'Senior Citizen Priority',
      description: 'Enhanced priority services for elderly passengers',
      participants: 3200,
      timeframe: '4 months',
      impact: 'Policy change across all zones'
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Advocacy Tools & Campaigns
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Empower your voice through collective action and systematic advocacy for passenger rights
          </p>
        </div>

        {/* Advocacy Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {advocacyTools?.map((tool) => (
            <div key={tool?.id} className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-all duration-300 group">
              <div className={`w-12 h-12 ${tool?.color} rounded-lg flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                <Icon name={tool?.icon} size={24} strokeWidth={2.5} />
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {tool?.title}
              </h3>
              
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {tool?.description}
              </p>

              <div className="space-y-3 mb-4">
                {tool?.features?.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="Check" size={14} className="text-success" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-2 text-xs border-t border-border pt-4">
                {Object.entries(tool?.stats)?.map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-muted-foreground capitalize">{key}:</span>
                    <span className="font-medium text-foreground">{value}</span>
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                fullWidth
                iconName="ArrowRight"
                iconPosition="right"
                className="mt-4"
              >
                Explore Tool
              </Button>
            </div>
          ))}
        </div>

        {/* Active Campaigns */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-foreground">Active Campaigns</h3>
            <Button
              variant="primary"
              iconName="Plus"
              iconPosition="left"
            >
              Start Campaign
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {activeCampaigns?.map((campaign) => (
              <div key={campaign?.id} className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="text-lg font-semibold text-foreground">{campaign?.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        campaign?.status === 'Trending' ?'bg-warning/10 text-warning' :'bg-success/10 text-success'
                      }`}>
                        {campaign?.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{campaign?.description}</p>
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs font-medium">
                      {campaign?.category}
                    </span>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${
                    campaign?.impact === 'High' ? 'bg-success' : 'bg-warning'
                  }`} title={`${campaign?.impact} Impact`}></div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium text-foreground">
                        {campaign?.participants?.toLocaleString()} / {campaign?.target?.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${campaign?.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>{campaign?.progress}% complete</span>
                      <span>{campaign?.timeLeft} left</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Affected Routes:</div>
                    <div className="flex flex-wrap gap-2">
                      {campaign?.routes?.map((route, index) => (
                        <span key={index} className="px-2 py-1 bg-muted rounded-md text-xs font-medium text-foreground">
                          {route}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-3 pt-4 border-t border-border">
                    <Button
                      variant="primary"
                      size="sm"
                      iconName="UserPlus"
                      iconPosition="left"
                      className="flex-1"
                    >
                      Join Campaign
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Share"
                      iconPosition="left"
                      className="flex-1"
                    >
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Wins */}
        <div className="bg-card rounded-xl border border-border p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-success rounded-lg flex items-center justify-center">
              <Icon name="Trophy" size={24} color="white" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground">Recent Campaign Victories</h3>
              <p className="text-muted-foreground">Successful advocacy efforts that made a difference</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {recentWins?.map((win, index) => (
              <div key={index} className="p-4 bg-success/5 rounded-lg border border-success/20">
                <h4 className="font-semibold text-foreground mb-2">{win?.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{win?.description}</p>
                
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Participants:</span>
                    <span className="font-medium text-foreground">{win?.participants?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium text-foreground">{win?.timeframe}</span>
                  </div>
                  <div className="pt-2 border-t border-success/20">
                    <div className="text-success font-medium">{win?.impact}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button
              variant="outline"
              iconName="ExternalLink"
              iconPosition="right"
            >
              View All Success Stories
            </Button>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Make a Difference?</h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Join thousands of passengers working together to improve railway services across India
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                size="lg"
                iconName="Users"
                iconPosition="left"
                className="bg-white text-primary hover:bg-white/90"
              >
                Join Community
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="Megaphone"
                iconPosition="left"
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                Start Your Campaign
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvocacyToolsSection;
import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ExpertContributors = () => {
  const experts = [
    {
      id: 1,
      name: "Rajesh Kumar",
      title: "Railway Veteran",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      badge: "Expert",
      contributions: 1247,
      helpfulVotes: 8934,
      specialties: ["Booking", "Routes", "Safety"],
      isOnline: true,
      responseTime: "< 2 hours"
    },
    {
      id: 2,
      name: "Priya Sharma",
      title: "Travel Enthusiast",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      badge: "Mentor",
      contributions: 892,
      helpfulVotes: 5672,
      specialties: ["Food", "Facilities", "Tips"],
      isOnline: true,
      responseTime: "< 1 hour"
    },
    {
      id: 3,
      name: "Amit Patel",
      title: "Tech Savvy Traveler",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      badge: "Helper",
      contributions: 634,
      helpfulVotes: 3421,
      specialties: ["Apps", "Digital", "Booking"],
      isOnline: false,
      responseTime: "< 4 hours"
    },
    {
      id: 4,
      name: "Sunita Reddy",
      title: "Frequent Commuter",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      badge: "Guide",
      contributions: 456,
      helpfulVotes: 2134,
      specialties: ["Local Trains", "Mumbai", "Delays"],
      isOnline: true,
      responseTime: "< 3 hours"
    }
  ];

  const getBadgeColor = (badge) => {
    const colors = {
      'Expert': 'bg-primary text-primary-foreground',
      'Mentor': 'bg-secondary text-secondary-foreground',
      'Helper': 'bg-success text-success-foreground',
      'Guide': 'bg-warning text-warning-foreground'
    };
    return colors?.[badge] || 'bg-muted text-muted-foreground';
  };

  return (
    <div className="bg-white border border-border rounded-lg">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground flex items-center space-x-2">
            <Icon name="Award" size={18} className="text-primary" />
            <span>Expert Contributors</span>
          </h3>
          <button className="text-sm text-primary hover:text-primary/80 transition-colors">
            View All
          </button>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Get help from experienced community members
        </p>
      </div>
      <div className="p-4">
        <div className="space-y-4">
          {experts?.map((expert) => (
            <div key={expert?.id} className="p-4 border border-border rounded-lg hover:shadow-sm transition-all duration-200">
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <Image
                    src={expert?.avatar}
                    alt={expert?.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {expert?.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success border-2 border-white rounded-full"></div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-foreground truncate">
                      {expert?.name}
                    </h4>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getBadgeColor(expert?.badge)}`}>
                      {expert?.badge}
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">
                    {expert?.title}
                  </p>

                  <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-3">
                    <div className="flex items-center space-x-1">
                      <Icon name="MessageSquare" size={12} />
                      <span>{expert?.contributions} posts</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="ThumbsUp" size={12} />
                      <span>{expert?.helpfulVotes?.toLocaleString()} helpful</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={12} />
                      <span>{expert?.responseTime}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {expert?.specialties?.map((specialty, index) => (
                      <span
                        key={index}
                        className="px-2 py-0.5 text-xs bg-muted text-muted-foreground rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" iconName="MessageCircle" iconPosition="left">
                      Message
                    </Button>
                    <Button variant="ghost" size="sm" iconName="User" iconPosition="left">
                      Profile
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <div className="text-center">
            <Button variant="outline" iconName="Users" iconPosition="left">
              Become a Contributor
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertContributors;
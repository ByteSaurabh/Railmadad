import React from 'react';
import Icon from '../../../components/AppIcon';

const TrendingTopics = () => {
  const trendingTopics = [
    {
      id: 1,
      title: "Rajdhani Express AC Issues",
      posts: 45,
      trend: "up",
      category: "facilities",
      urgency: "high"
    },
    {
      id: 2,
      title: "Mumbai Local Delays Today",
      posts: 78,
      trend: "up",
      category: "delays",
      urgency: "high"
    },
    {
      id: 3,
      title: "New Vande Bharat Routes",
      posts: 32,
      trend: "up",
      category: "general",
      urgency: "low"
    },
    {
      id: 4,
      title: "Station Food Quality Concerns",
      posts: 56,
      trend: "stable",
      category: "food",
      urgency: "medium"
    },
    {
      id: 5,
      title: "Booking App Issues",
      posts: 23,
      trend: "down",
      category: "booking",
      urgency: "medium"
    }
  ];

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return { icon: 'TrendingUp', color: 'text-success' };
      case 'down': return { icon: 'TrendingDown', color: 'text-error' };
      default: return { icon: 'Minus', color: 'text-muted-foreground' };
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'bg-error/10 border-l-error';
      case 'medium': return 'bg-warning/10 border-l-warning';
      case 'low': return 'bg-success/10 border-l-success';
      default: return 'bg-muted/10 border-l-muted';
    }
  };

  return (
    <div className="bg-white border border-border rounded-lg">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground flex items-center space-x-2">
            <Icon name="TrendingUp" size={18} className="text-primary" />
            <span>Trending Topics</span>
          </h3>
          <button className="text-sm text-primary hover:text-primary/80 transition-colors">
            View All
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="space-y-3">
          {trendingTopics?.map((topic, index) => {
            const trendInfo = getTrendIcon(topic?.trend);
            return (
              <div
                key={topic?.id}
                className={`p-3 rounded-lg border-l-4 transition-all duration-200 hover:shadow-sm cursor-pointer ${getUrgencyColor(topic?.urgency)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium text-muted-foreground">
                        #{index + 1}
                      </span>
                      <h4 className="font-medium text-foreground truncate">
                        {topic?.title}
                      </h4>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>{topic?.posts} posts</span>
                      <span>•</span>
                      <span className="capitalize">{topic?.category}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 flex-shrink-0">
                    <Icon 
                      name={trendInfo?.icon} 
                      size={14} 
                      className={trendInfo?.color}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <div className="text-center">
            <button className="text-sm text-primary hover:text-primary/80 transition-colors font-medium">
              Explore More Topics →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingTopics;
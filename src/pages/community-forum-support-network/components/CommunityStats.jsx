import React from 'react';
import Icon from '../../../components/AppIcon';

const CommunityStats = () => {
  const stats = [
    {
      title: "Active Discussions",
      value: "2,847",
      change: "+12%",
      trend: "up",
      icon: "MessageSquare",
      color: "text-primary"
    },
    {
      title: "Community Members",
      value: "45,672",
      change: "+8%",
      trend: "up",
      icon: "Users",
      color: "text-secondary"
    },
    {
      title: "Issues Resolved",
      value: "1,234",
      change: "+15%",
      trend: "up",
      icon: "CheckCircle",
      color: "text-success"
    },
    {
      title: "Expert Contributors",
      value: "892",
      change: "+5%",
      trend: "up",
      icon: "Award",
      color: "text-warning"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      user: "Rajesh Kumar",
      action: "resolved a discussion about",
      topic: "AC issues in Rajdhani Express",
      time: "2 minutes ago",
      type: "resolution"
    },
    {
      id: 2,
      user: "Priya Sharma",
      action: "started a new discussion on",
      topic: "Food quality at New Delhi station",
      time: "5 minutes ago",
      type: "discussion"
    },
    {
      id: 3,
      user: "Railway Authority",
      action: "responded to",
      topic: "Platform cleanliness concerns",
      time: "8 minutes ago",
      type: "official"
    },
    {
      id: 4,
      user: "Amit Patel",
      action: "shared helpful tips about",
      topic: "Booking tatkal tickets",
      time: "12 minutes ago",
      type: "tip"
    }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'resolution': return { icon: 'CheckCircle', color: 'text-success' };
      case 'discussion': return { icon: 'MessageCircle', color: 'text-primary' };
      case 'official': return { icon: 'Shield', color: 'text-authority' };
      case 'tip': return { icon: 'Lightbulb', color: 'text-warning' };
      default: return { icon: 'Activity', color: 'text-muted-foreground' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="bg-white border border-border rounded-lg p-6">
        <h3 className="font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="BarChart3" size={18} className="text-primary" />
          <span>Community Statistics</span>
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          {stats?.map((stat, index) => (
            <div key={index} className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Icon name={stat?.icon} size={24} className={stat?.color} />
              </div>
              <div className="text-2xl font-bold text-foreground">{stat?.value}</div>
              <div className="text-sm text-muted-foreground">{stat?.title}</div>
              <div className="flex items-center justify-center space-x-1 mt-1">
                <Icon name="TrendingUp" size={12} className="text-success" />
                <span className="text-xs text-success">{stat?.change}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Recent Activity */}
      <div className="bg-white border border-border rounded-lg">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-foreground flex items-center space-x-2">
            <Icon name="Activity" size={18} className="text-primary" />
            <span>Recent Activity</span>
          </h3>
        </div>

        <div className="p-4">
          <div className="space-y-4">
            {recentActivity?.map((activity) => {
              const activityInfo = getActivityIcon(activity?.type);
              return (
                <div key={activity?.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                      <Icon 
                        name={activityInfo?.icon} 
                        size={14} 
                        className={activityInfo?.color}
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">
                      <span className="font-medium">{activity?.user}</span>
                      {' '}{activity?.action}{' '}
                      <span className="font-medium text-primary">{activity?.topic}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {activity?.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-border text-center">
            <button className="text-sm text-primary hover:text-primary/80 transition-colors">
              View All Activity
            </button>
          </div>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="bg-white border border-border rounded-lg p-6">
        <h3 className="font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Zap" size={18} className="text-primary" />
          <span>Quick Actions</span>
        </h3>
        
        <div className="space-y-3">
          <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-muted/50 rounded-lg transition-colors">
            <Icon name="Plus" size={16} className="text-primary" />
            <span className="text-sm font-medium">Start New Discussion</span>
          </button>
          
          <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-muted/50 rounded-lg transition-colors">
            <Icon name="HelpCircle" size={16} className="text-secondary" />
            <span className="text-sm font-medium">Ask for Help</span>
          </button>
          
          <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-muted/50 rounded-lg transition-colors">
            <Icon name="AlertTriangle" size={16} className="text-warning" />
            <span className="text-sm font-medium">Report Issue</span>
          </button>
          
          <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-muted/50 rounded-lg transition-colors">
            <Icon name="Users" size={16} className="text-success" />
            <span className="text-sm font-medium">Join Route Group</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityStats;
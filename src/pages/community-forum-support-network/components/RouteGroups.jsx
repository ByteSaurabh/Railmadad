import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RouteGroups = () => {
  const routeGroups = [
    {
      id: 1,
      name: "Mumbai-Delhi Rajdhani",
      route: "MMCT-NDLS",
      members: 2847,
      activeDiscussions: 45,
      lastActivity: "2 minutes ago",
      category: "premium",
      isJoined: true
    },
    {
      id: 2,
      name: "Chennai-Bangalore Shatabdi",
      route: "MAS-SBC",
      members: 1923,
      activeDiscussions: 32,
      lastActivity: "5 minutes ago",
      category: "premium",
      isJoined: false
    },
    {
      id: 3,
      name: "Mumbai Local Western Line",
      route: "CCG-VR",
      members: 5672,
      activeDiscussions: 89,
      lastActivity: "1 minute ago",
      category: "local",
      isJoined: true
    },
    {
      id: 4,
      name: "Delhi-Kolkata Duronto",
      route: "NDLS-HWH",
      members: 1456,
      activeDiscussions: 23,
      lastActivity: "8 minutes ago",
      category: "express",
      isJoined: false
    },
    {
      id: 5,
      name: "Bangalore-Hyderabad Express",
      route: "SBC-SC",
      members: 987,
      activeDiscussions: 18,
      lastActivity: "12 minutes ago",
      category: "express",
      isJoined: false
    },
    {
      id: 6,
      name: "Kerala Express Routes",
      route: "Multiple",
      members: 2134,
      activeDiscussions: 34,
      lastActivity: "6 minutes ago",
      category: "regional",
      isJoined: true
    }
  ];

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'premium': return { icon: 'Crown', color: 'text-warning' };
      case 'local': return { icon: 'MapPin', color: 'text-primary' };
      case 'express': return { icon: 'Zap', color: 'text-secondary' };
      case 'regional': return { icon: 'Map', color: 'text-success' };
      default: return { icon: 'Train', color: 'text-muted-foreground' };
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'premium': return 'bg-warning/10 border-warning/20';
      case 'local': return 'bg-primary/10 border-primary/20';
      case 'express': return 'bg-secondary/10 border-secondary/20';
      case 'regional': return 'bg-success/10 border-success/20';
      default: return 'bg-muted/10 border-border';
    }
  };

  return (
    <div className="bg-white border border-border rounded-lg">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground flex items-center space-x-2">
            <Icon name="Users" size={18} className="text-primary" />
            <span>Route Groups</span>
          </h3>
          <button className="text-sm text-primary hover:text-primary/80 transition-colors">
            Browse All
          </button>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Join discussions specific to your travel routes
        </p>
      </div>
      <div className="p-4">
        <div className="space-y-3">
          {routeGroups?.map((group) => {
            const categoryInfo = getCategoryIcon(group?.category);
            return (
              <div
                key={group?.id}
                className={`p-4 border rounded-lg transition-all duration-200 hover:shadow-sm ${getCategoryColor(group?.category)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-white border border-border rounded-lg flex items-center justify-center">
                        <Icon 
                          name={categoryInfo?.icon} 
                          size={18} 
                          className={categoryInfo?.color}
                        />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-foreground truncate">
                          {group?.name}
                        </h4>
                        {group?.isJoined && (
                          <Icon name="CheckCircle" size={14} className="text-success flex-shrink-0" />
                        )}
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">
                        {group?.route}
                      </p>

                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Icon name="Users" size={12} />
                          <span>{group?.members?.toLocaleString()} members</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="MessageSquare" size={12} />
                          <span>{group?.activeDiscussions} active</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Clock" size={12} />
                          <span>{group?.lastActivity}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-shrink-0 ml-3">
                    {group?.isJoined ? (
                      <Button variant="outline" size="sm">
                        Joined
                      </Button>
                    ) : (
                      <Button variant="default" size="sm">
                        Join
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <div className="text-center">
            <Button variant="outline" iconName="Plus" iconPosition="left">
              Create New Group
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteGroups;
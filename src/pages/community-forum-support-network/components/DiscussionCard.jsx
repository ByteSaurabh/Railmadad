import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const DiscussionCard = ({ discussion }) => {
  const [isLiked, setIsLiked] = useState(discussion?.isLiked || false);
  const [likeCount, setLikeCount] = useState(discussion?.likes || 0);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'delays': 'bg-warning/10 text-warning border-warning/20',
      'facilities': 'bg-success/10 text-success border-success/20',
      'safety': 'bg-error/10 text-error border-error/20',
      'food': 'bg-secondary/10 text-secondary border-secondary/20',
      'booking': 'bg-primary/10 text-primary border-primary/20',
      'general': 'bg-muted text-muted-foreground border-border'
    };
    return colors?.[category] || colors?.general;
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return { icon: 'AlertTriangle', color: 'text-error' };
      case 'medium': return { icon: 'AlertCircle', color: 'text-warning' };
      case 'low': return { icon: 'Info', color: 'text-success' };
      default: return { icon: 'MessageSquare', color: 'text-muted-foreground' };
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const priorityInfo = getPriorityIcon(discussion?.priority);

  return (
    <div className="bg-white border border-border rounded-lg p-6 hover:shadow-md transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3 flex-1">
          <Image
            src={discussion?.author?.avatar}
            alt={discussion?.author?.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-semibold text-foreground hover:text-primary cursor-pointer truncate">
                {discussion?.title}
              </h3>
              {discussion?.isVerified && (
                <Icon name="BadgeCheck" size={16} className="text-success flex-shrink-0" />
              )}
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span className="font-medium">{discussion?.author?.name}</span>
              {discussion?.author?.badge && (
                <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                  {discussion?.author?.badge}
                </span>
              )}
              <span>•</span>
              <span>{formatTimeAgo(discussion?.createdAt)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 flex-shrink-0">
          <Icon 
            name={priorityInfo?.icon} 
            size={16} 
            className={priorityInfo?.color}
          />
          <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
        </div>
      </div>
      {/* Content */}
      <div className="mb-4">
        <p className="text-foreground leading-relaxed">
          {discussion?.content}
        </p>
        
        {discussion?.images && discussion?.images?.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mt-3">
            {discussion?.images?.slice(0, 2)?.map((image, index) => (
              <div key={index} className="relative rounded-lg overflow-hidden">
                <Image
                  src={image}
                  alt={`Discussion image ${index + 1}`}
                  className="w-full h-32 object-cover hover:scale-105 transition-transform duration-200"
                />
                {discussion?.images?.length > 2 && index === 1 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-medium">
                      +{discussion?.images?.length - 2} more
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Tags and Route */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getCategoryColor(discussion?.category)}`}>
          {discussion?.categoryLabel}
        </span>
        
        {discussion?.route && (
          <span className="px-2 py-1 text-xs font-medium bg-trust/10 text-trust border border-trust/20 rounded-full">
            {discussion?.route}
          </span>
        )}
        
        {discussion?.trainNumber && (
          <span className="px-2 py-1 text-xs font-medium bg-authority/10 text-authority border border-authority/20 rounded-full">
            {discussion?.trainNumber}
          </span>
        )}
      </div>
      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-1 text-sm transition-colors ${
              isLiked ? 'text-error' : 'text-muted-foreground hover:text-error'
            }`}
          >
            <Icon name={isLiked ? "Heart" : "Heart"} size={16} fill={isLiked ? "currentColor" : "none"} />
            <span>{likeCount}</span>
          </button>
          
          <button className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <Icon name="MessageCircle" size={16} />
            <span>{discussion?.replies}</span>
          </button>
          
          <button className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <Icon name="Share2" size={16} />
            <span>Share</span>
          </button>
        </div>

        <div className="flex items-center space-x-2">
          {discussion?.isResolved && (
            <span className="flex items-center space-x-1 text-xs text-success">
              <Icon name="CheckCircle" size={14} />
              <span>Resolved</span>
            </span>
          )}
          
          <Button variant="outline" size="sm">
            View Discussion
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DiscussionCard;
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentComplaints = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const recentComplaints = [
    {
      id: 'RMA2024081800125',
      subject: 'AC not working in Coach B2',
      category: 'technical',
      priority: 'high',
      status: 'resolved',
      submittedAt: '2024-08-18T09:15:00Z',
      resolvedAt: '2024-08-18T15:30:00Z',
      train: '12345 - Rajdhani Express',
      location: 'New Delhi to Mumbai',
      rating: 4
    },
    {
      id: 'RMA2024081800124',
      subject: 'Food quality poor in pantry car',
      category: 'food',
      priority: 'medium',
      status: 'under_investigation',
      submittedAt: '2024-08-18T08:45:00Z',
      train: '12951 - Mumbai Rajdhani',
      location: 'Mumbai Central',
      estimatedResolution: '2024-08-19T18:00:00Z'
    },
    {
      id: 'RMA2024081800123',
      subject: 'Washroom cleanliness issue',
      category: 'cleanliness',
      priority: 'medium',
      status: 'action_taken',
      submittedAt: '2024-08-18T07:30:00Z',
      train: '12002 - Shatabdi Express',
      location: 'New Delhi Railway Station'
    },
    {
      id: 'RMA2024081700122',
      subject: 'Staff behavior inappropriate',
      category: 'staff',
      priority: 'high',
      status: 'resolved',
      submittedAt: '2024-08-17T16:20:00Z',
      resolvedAt: '2024-08-18T10:15:00Z',
      train: '12301 - Howrah Rajdhani',
      location: 'Howrah Junction',
      rating: 5
    },
    {
      id: 'RMA2024081700121',
      subject: 'Train delay without announcement',
      category: 'punctuality',
      priority: 'low',
      status: 'closed',
      submittedAt: '2024-08-17T14:10:00Z',
      resolvedAt: '2024-08-17T18:45:00Z',
      train: '12423 - Dibrugarh Rajdhani',
      location: 'Guwahati Station',
      rating: 3
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Complaints', count: recentComplaints?.length },
    { value: 'resolved', label: 'Resolved', count: recentComplaints?.filter(c => c?.status === 'resolved')?.length },
    { value: 'pending', label: 'Pending', count: recentComplaints?.filter(c => ['under_investigation', 'action_taken']?.includes(c?.status))?.length },
    { value: 'high_priority', label: 'High Priority', count: recentComplaints?.filter(c => c?.priority === 'high')?.length }
  ];

  const getStatusColor = (status) => {
    const colors = {
      submitted: 'bg-blue-100 text-blue-800',
      acknowledged: 'bg-yellow-100 text-yellow-800',
      assigned: 'bg-purple-100 text-purple-800',
      under_investigation: 'bg-orange-100 text-orange-800',
      action_taken: 'bg-indigo-100 text-indigo-800',
      resolved: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800'
    };
    return colors?.[status] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: 'text-green-600',
      medium: 'text-yellow-600',
      high: 'text-red-600',
      urgent: 'text-red-800'
    };
    return colors?.[priority] || 'text-gray-600';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      cleanliness: 'Sparkles',
      food: 'UtensilsCrossed',
      staff: 'Users',
      technical: 'Settings',
      safety: 'Shield',
      punctuality: 'Clock',
      booking: 'Ticket',
      accessibility: 'Accessibility',
      other: 'HelpCircle'
    };
    return icons?.[category] || 'MessageSquare';
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp)?.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getResolutionTime = (submittedAt, resolvedAt) => {
    if (!resolvedAt) return null;
    const diff = new Date(resolvedAt) - new Date(submittedAt);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
      return `${days}d ${hours % 24}h`;
    }
    return `${hours}h`;
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={12}
        className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  const filteredComplaints = recentComplaints?.filter(complaint => {
    switch (selectedFilter) {
      case 'resolved':
        return complaint?.status === 'resolved';
      case 'pending':
        return ['under_investigation', 'action_taken']?.includes(complaint?.status);
      case 'high_priority':
        return complaint?.priority === 'high';
      default:
        return true;
    }
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="History" size={20} />
          <span>Recent Complaints</span>
        </h3>
        
        <Button
          variant="outline"
          size="sm"
          iconName="Download"
          iconPosition="left"
        >
          Export Report
        </Button>
      </div>
      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {filterOptions?.map((option) => (
          <button
            key={option?.value}
            onClick={() => setSelectedFilter(option?.value)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selectedFilter === option?.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {option?.label} ({option?.count})
          </button>
        ))}
      </div>
      {/* Complaints List */}
      <div className="space-y-4">
        {filteredComplaints?.map((complaint) => (
          <div key={complaint?.id} className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                  <Icon name={getCategoryIcon(complaint?.category)} size={16} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-foreground mb-1">
                    {complaint?.subject}
                  </h4>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>ID: {complaint?.id}</span>
                    <span>{complaint?.train}</span>
                    <span>{complaint?.location}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(complaint?.status)}`}>
                  {complaint?.status?.replace('_', ' ')?.toUpperCase()}
                </span>
                <Icon 
                  name="Flag" 
                  size={12} 
                  className={getPriorityColor(complaint?.priority)}
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center space-x-4">
                <span>Submitted: {formatTimestamp(complaint?.submittedAt)}</span>
                {complaint?.resolvedAt && (
                  <span className="text-success">
                    Resolved in {getResolutionTime(complaint?.submittedAt, complaint?.resolvedAt)}
                  </span>
                )}
                {complaint?.estimatedResolution && !complaint?.resolvedAt && (
                  <span>
                    Est. Resolution: {formatTimestamp(complaint?.estimatedResolution)}
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                {complaint?.rating && (
                  <div className="flex items-center space-x-1">
                    <span>Rating:</span>
                    <div className="flex space-x-0.5">
                      {renderStars(complaint?.rating)}
                    </div>
                  </div>
                )}
                
                <Button
                  variant="ghost"
                  size="xs"
                  iconName="ExternalLink"
                  onClick={() => console.log('View details:', complaint?.id)}
                >
                  View
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Empty State */}
      {filteredComplaints?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Inbox" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No complaints found</h3>
          <p className="text-muted-foreground">
            No complaints match the selected filter criteria.
          </p>
        </div>
      )}
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-6 border-t border-border">
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">
            {recentComplaints?.filter(c => c?.status === 'resolved')?.length}
          </div>
          <div className="text-sm text-muted-foreground">Resolved</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">
            {recentComplaints?.filter(c => ['under_investigation', 'action_taken']?.includes(c?.status))?.length}
          </div>
          <div className="text-sm text-muted-foreground">In Progress</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">2.3d</div>
          <div className="text-sm text-muted-foreground">Avg Resolution</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">4.2</div>
          <div className="text-sm text-muted-foreground">Avg Rating</div>
        </div>
      </div>
    </div>
  );
};

export default RecentComplaints;
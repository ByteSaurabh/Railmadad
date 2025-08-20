import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ComplaintQueue = ({ complaints, onComplaintSelect, onStatusUpdate }) => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('priority');

  const priorityColors = {
    'Critical': 'bg-red-100 text-red-800 border-red-200',
    'High': 'bg-orange-100 text-orange-800 border-orange-200',
    'Medium': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Low': 'bg-green-100 text-green-800 border-green-200'
  };

  const statusColors = {
    'Pending': 'bg-gray-100 text-gray-800',
    'In Progress': 'bg-blue-100 text-blue-800',
    'Under Review': 'bg-purple-100 text-purple-800',
    'Resolved': 'bg-green-100 text-green-800'
  };

  const filteredComplaints = complaints?.filter(complaint => {
    if (filter === 'all') return true;
    return complaint?.status?.toLowerCase() === filter?.toLowerCase();
  });

  const sortedComplaints = [...filteredComplaints]?.sort((a, b) => {
    if (sortBy === 'priority') {
      const priorityOrder = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
      return priorityOrder?.[b?.priority] - priorityOrder?.[a?.priority];
    }
    if (sortBy === 'time') {
      return new Date(b.submittedAt) - new Date(a.submittedAt);
    }
    return 0;
  });

  const getTimeAgo = (date) => {
    const now = new Date();
    const diffInHours = Math.floor((now - new Date(date)) / (1000 * 60 * 60));
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Complaint Queue</h3>
            <p className="text-sm text-gray-600 mt-1">
              {sortedComplaints?.length} complaints requiring attention
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={filter}
              onChange={(e) => setFilter(e?.target?.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in progress">In Progress</option>
              <option value="under review">Under Review</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e?.target?.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="priority">Sort by Priority</option>
              <option value="time">Sort by Time</option>
            </select>
          </div>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {sortedComplaints?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="CheckCircle" size={48} className="mx-auto text-gray-400 mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">All caught up!</h4>
            <p className="text-gray-600">No complaints matching your filters.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {sortedComplaints?.map((complaint) => (
              <div
                key={complaint?.id}
                className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => onComplaintSelect(complaint)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${priorityColors?.[complaint?.priority]}`}>
                        {complaint?.priority}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors?.[complaint?.status]}`}>
                        {complaint?.status}
                      </span>
                      <span className="text-xs text-gray-500">
                        #{complaint?.id}
                      </span>
                    </div>
                    
                    <h4 className="text-sm font-medium text-gray-900 mb-1 truncate">
                      {complaint?.title}
                    </h4>
                    
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {complaint?.description}
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Icon name="MapPin" size={12} />
                        <span>{complaint?.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="User" size={12} />
                        <span>{complaint?.passengerName}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Clock" size={12} />
                        <span>{getTimeAgo(complaint?.submittedAt)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    {complaint?.aiRecommendation && (
                      <div className="flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        <Icon name="Brain" size={12} />
                        <span>AI Rec</span>
                      </div>
                    )}
                    
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="ArrowRight"
                      iconPosition="right"
                      onClick={(e) => {
                        e?.stopPropagation();
                        onComplaintSelect(complaint);
                      }}
                    >
                      View
                    </Button>
                  </div>
                </div>
                
                {complaint?.aiRecommendation && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-start gap-2">
                      <Icon name="Brain" size={16} className="text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-blue-800 mb-1">AI Recommendation</p>
                        <p className="text-xs text-blue-700">{complaint?.aiRecommendation}</p>
                        <p className="text-xs text-blue-600 mt-1">
                          Suggested response time: {complaint?.suggestedResponseTime}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplaintQueue;
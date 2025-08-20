import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const PredictiveAlerts = ({ alerts, onAlertAction }) => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('priority');

  const filteredAlerts = alerts?.filter(alert => {
    if (filter === 'all') return true;
    return alert?.priority === filter;
  });

  const sortedAlerts = [...filteredAlerts]?.sort((a, b) => {
    if (sortBy === 'priority') {
      const priorityOrder = { critical: 3, high: 2, medium: 1, low: 0 };
      return priorityOrder?.[b?.priority] - priorityOrder?.[a?.priority];
    }
    if (sortBy === 'time') {
      return new Date(b.timestamp) - new Date(a.timestamp);
    }
    return 0;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical':
        return 'text-error bg-error/10 border-error/20';
      case 'high':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'medium':
        return 'text-primary bg-primary/10 border-primary/20';
      case 'low':
        return 'text-muted-foreground bg-muted border-border';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'critical':
        return 'AlertTriangle';
      case 'high':
        return 'AlertCircle';
      case 'medium':
        return 'Info';
      case 'low':
        return 'Bell';
      default:
        return 'Bell';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'maintenance':
        return 'Wrench';
      case 'safety':
        return 'Shield';
      case 'cleanliness':
        return 'Droplets';
      case 'crowd':
        return 'Users';
      case 'weather':
        return 'Cloud';
      case 'equipment':
        return 'Cog';
      default:
        return 'Bell';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const alertTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - alertTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Predictive Alerts</h2>
          <p className="text-sm text-muted-foreground">AI-powered maintenance & safety predictions</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <select
            value={filter}
            onChange={(e) => setFilter(e?.target?.value)}
            className="bg-background border border-border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Priorities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="bg-background border border-border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="priority">Sort by Priority</option>
            <option value="time">Sort by Time</option>
          </select>
        </div>
      </div>
      {/* Alert Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-error/10 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-error" />
            <span className="text-sm font-medium text-error">Critical</span>
          </div>
          <p className="text-xl font-bold text-error mt-1">
            {alerts?.filter(a => a?.priority === 'critical')?.length}
          </p>
        </div>
        
        <div className="bg-warning/10 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} className="text-warning" />
            <span className="text-sm font-medium text-warning">High</span>
          </div>
          <p className="text-xl font-bold text-warning mt-1">
            {alerts?.filter(a => a?.priority === 'high')?.length}
          </p>
        </div>
        
        <div className="bg-primary/10 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <Icon name="Info" size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">Medium</span>
          </div>
          <p className="text-xl font-bold text-primary mt-1">
            {alerts?.filter(a => a?.priority === 'medium')?.length}
          </p>
        </div>
        
        <div className="bg-muted rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <Icon name="Bell" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Low</span>
          </div>
          <p className="text-xl font-bold text-muted-foreground mt-1">
            {alerts?.filter(a => a?.priority === 'low')?.length}
          </p>
        </div>
      </div>
      {/* Alerts List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {sortedAlerts?.map((alert) => (
          <div key={alert?.id} className="border border-border rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getPriorityColor(alert?.priority)?.split(' ')?.[1]} ${getPriorityColor(alert?.priority)?.split(' ')?.[2]}`}>
                    <Icon name={getTypeIcon(alert?.type)} size={16} className={getPriorityColor(alert?.priority)?.split(' ')?.[0]} />
                  </div>
                  <div className={`px-2 py-1 rounded-full border text-xs font-medium ${getPriorityColor(alert?.priority)}`}>
                    <div className="flex items-center space-x-1">
                      <Icon name={getPriorityIcon(alert?.priority)} size={10} />
                      <span className="capitalize">{alert?.priority}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-foreground">{alert?.title}</h3>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                      {alert?.type}
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">{alert?.description}</p>
                  
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="MapPin" size={12} />
                      <span>{alert?.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={12} />
                      <span>{formatTimeAgo(alert?.timestamp)}</span>
                    </div>
                    {alert?.predictedImpact && (
                      <div className="flex items-center space-x-1">
                        <Icon name="TrendingUp" size={12} />
                        <span>Impact: {alert?.predictedImpact}</span>
                      </div>
                    )}
                  </div>

                  {alert?.recommendation && (
                    <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <Icon name="Lightbulb" size={14} className="text-primary mt-0.5" />
                        <div>
                          <p className="text-xs font-medium text-foreground mb-1">AI Recommendation</p>
                          <p className="text-xs text-muted-foreground">{alert?.recommendation}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                {alert?.actions?.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => onAlertAction(alert?.id, action?.type)}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                      action?.type === 'acknowledge' ? 'bg-primary text-primary-foreground hover:bg-primary/90' :
                      action?.type === 'schedule' ? 'bg-secondary text-secondary-foreground hover:bg-secondary/90' :
                      'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {action?.label}
                  </button>
                ))}
                
                <button className="p-1 hover:bg-muted rounded">
                  <Icon name="MoreVertical" size={16} className="text-muted-foreground" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {sortedAlerts?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-foreground mb-2">All Clear!</h3>
          <p className="text-muted-foreground">No alerts matching your current filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default PredictiveAlerts;
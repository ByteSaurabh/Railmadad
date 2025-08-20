import React from 'react';
import Icon from '../../../components/AppIcon';

const SensorStatusCard = ({ sensor }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'normal':
        return 'text-success bg-success/10 border-success/20';
      case 'warning':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'critical':
        return 'text-error bg-error/10 border-error/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'normal':
        return 'CheckCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'critical':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name={sensor?.icon} size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{sensor?.name}</h3>
            <p className="text-sm text-muted-foreground">{sensor?.location}</p>
          </div>
        </div>
        <div className={`px-2 py-1 rounded-full border text-xs font-medium ${getStatusColor(sensor?.status)}`}>
          <div className="flex items-center space-x-1">
            <Icon name={getStatusIcon(sensor?.status)} size={12} />
            <span className="capitalize">{sensor?.status}</span>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Current Reading</span>
          <span className="font-semibold text-foreground">{sensor?.currentValue} {sensor?.unit}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Threshold</span>
          <span className="text-sm text-muted-foreground">{sensor?.threshold} {sensor?.unit}</span>
        </div>

        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              sensor?.status === 'normal' ? 'bg-success' :
              sensor?.status === 'warning' ? 'bg-warning' : 'bg-error'
            }`}
            style={{ width: `${Math.min((sensor?.currentValue / sensor?.threshold) * 100, 100)}%` }}
          />
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Last Updated</span>
          <span>{sensor?.lastUpdated}</span>
        </div>
      </div>
    </div>
  );
};

export default SensorStatusCard;
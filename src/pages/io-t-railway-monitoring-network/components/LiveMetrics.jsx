import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const LiveMetrics = ({ metrics, onMetricClick }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [refreshInterval, setRefreshInterval] = useState(5000);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  const categories = [
    { id: 'all', name: 'All Metrics', icon: 'BarChart3' },
    { id: 'cleanliness', name: 'Cleanliness', icon: 'Droplets' },
    { id: 'temperature', name: 'Temperature', icon: 'Thermometer' },
    { id: 'crowd', name: 'Crowd Density', icon: 'Users' },
    { id: 'noise', name: 'Noise Level', icon: 'Volume2' },
    { id: 'safety', name: 'Safety', icon: 'Shield' }
  ];

  const filteredMetrics = selectedCategory === 'all' 
    ? metrics 
    : metrics?.filter(metric => metric?.category === selectedCategory);

  const getMetricStatus = (value, thresholds) => {
    if (value <= thresholds?.normal) return 'normal';
    if (value <= thresholds?.warning) return 'warning';
    return 'critical';
  };

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

  const getProgressColor = (status) => {
    switch (status) {
      case 'normal':
        return 'bg-success';
      case 'warning':
        return 'bg-warning';
      case 'critical':
        return 'bg-error';
      default:
        return 'bg-muted-foreground';
    }
  };

  const formatValue = (value, unit, type) => {
    if (type === 'percentage') {
      return `${Math.round(value)}%`;
    }
    if (type === 'decimal') {
      return `${value?.toFixed(1)} ${unit}`;
    }
    return `${Math.round(value)} ${unit}`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Live Metrics Dashboard</h2>
          <p className="text-sm text-muted-foreground">Real-time sensor data across railway network</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <div className="w-2 h-2 bg-success rounded-full sensor-active"></div>
            <span>Live</span>
          </div>
          
          <select
            value={refreshInterval}
            onChange={(e) => setRefreshInterval(Number(e?.target?.value))}
            className="bg-background border border-border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value={1000}>1s refresh</option>
            <option value={5000}>5s refresh</option>
            <option value={10000}>10s refresh</option>
            <option value={30000}>30s refresh</option>
          </select>
          
          <div className="text-xs text-muted-foreground">
            Updated: {lastUpdate?.toLocaleTimeString()}
          </div>
        </div>
      </div>
      {/* Category Filter */}
      <div className="flex items-center space-x-2 mb-6 overflow-x-auto pb-2">
        {categories?.map((category) => (
          <button
            key={category?.id}
            onClick={() => setSelectedCategory(category?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              selectedCategory === category?.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            <Icon name={category?.icon} size={16} />
            <span>{category?.name}</span>
          </button>
        ))}
      </div>
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredMetrics?.map((metric) => {
          const status = getMetricStatus(metric?.currentValue, metric?.thresholds);
          const progressPercentage = Math.min((metric?.currentValue / metric?.thresholds?.critical) * 100, 100);
          
          return (
            <div
              key={metric?.id}
              onClick={() => onMetricClick(metric)}
              className="border border-border rounded-lg p-4 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon name={metric?.icon} size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">{metric?.name}</h3>
                    <p className="text-xs text-muted-foreground">{metric?.location}</p>
                  </div>
                </div>
                
                <div className={`px-2 py-1 rounded-full border text-xs font-medium ${getStatusColor(status)}`}>
                  {status}
                </div>
              </div>
              {/* Current Value */}
              <div className="mb-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-bold text-foreground">
                    {formatValue(metric?.currentValue, metric?.unit, metric?.type)}
                  </span>
                  <div className="flex items-center space-x-1 text-xs">
                    {metric?.trend === 'up' && <Icon name="TrendingUp" size={12} className="text-success" />}
                    {metric?.trend === 'down' && <Icon name="TrendingDown" size={12} className="text-error" />}
                    {metric?.trend === 'stable' && <Icon name="Minus" size={12} className="text-muted-foreground" />}
                    <span className={`${
                      metric?.trend === 'up' ? 'text-success' :
                      metric?.trend === 'down' ? 'text-error' : 'text-muted-foreground'
                    }`}>
                      {metric?.changePercent}%
                    </span>
                  </div>
                </div>
                
                <div className="w-full bg-muted rounded-full h-2 mt-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(status)}`}
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
              {/* Thresholds */}
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Normal</span>
                  <span className="text-success">≤ {metric?.thresholds?.normal} {metric?.unit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Warning</span>
                  <span className="text-warning">≤ {metric?.thresholds?.warning} {metric?.unit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Critical</span>
                  <span className="text-error">&gt; {metric?.thresholds?.warning} {metric?.unit}</span>
                </div>
              </div>
              {/* Additional Info */}
              <div className="mt-3 pt-3 border-t border-border">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-1">
                    <Icon name="Wifi" size={12} className="text-success" />
                    <span className="text-muted-foreground">Sensor ID: {metric?.sensorId}</span>
                  </div>
                  <span className="text-muted-foreground">{metric?.lastUpdate}</span>
                </div>
              </div>
              {/* Quick Actions */}
              {status !== 'normal' && (
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="flex items-center space-x-2">
                    <button className="flex-1 bg-primary/10 text-primary text-xs py-1 px-2 rounded hover:bg-primary/20 transition-colors">
                      View Details
                    </button>
                    <button className="flex-1 bg-warning/10 text-warning text-xs py-1 px-2 rounded hover:bg-warning/20 transition-colors">
                      Create Alert
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* Summary Statistics */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Network Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-success mb-1">
              {filteredMetrics?.filter(m => getMetricStatus(m?.currentValue, m?.thresholds) === 'normal')?.length}
            </div>
            <div className="text-sm text-muted-foreground">Normal</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-warning mb-1">
              {filteredMetrics?.filter(m => getMetricStatus(m?.currentValue, m?.thresholds) === 'warning')?.length}
            </div>
            <div className="text-sm text-muted-foreground">Warning</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-error mb-1">
              {filteredMetrics?.filter(m => getMetricStatus(m?.currentValue, m?.thresholds) === 'critical')?.length}
            </div>
            <div className="text-sm text-muted-foreground">Critical</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground mb-1">
              {filteredMetrics?.length}
            </div>
            <div className="text-sm text-muted-foreground">Total Sensors</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveMetrics;
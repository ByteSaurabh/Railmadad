import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const WeatherIntegration = ({ weatherData, weatherAlerts }) => {
  const [selectedRegion, setSelectedRegion] = useState('all');

  const getWeatherIcon = (condition) => {
    switch (condition?.toLowerCase()) {
      case 'sunny': case'clear':
        return 'Sun';
      case 'cloudy': case'overcast':
        return 'Cloud';
      case 'rainy': case'rain':
        return 'CloudRain';
      case 'stormy': case'thunderstorm':
        return 'CloudLightning';
      case 'foggy': case'mist':
        return 'CloudDrizzle';
      case 'snowy': case'snow':
        return 'CloudSnow';
      default:
        return 'Cloud';
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high':
        return 'text-error bg-error/10 border-error/20';
      case 'medium':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'low':
        return 'text-success bg-success/10 border-success/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const filteredData = selectedRegion === 'all' 
    ? weatherData 
    : weatherData?.filter(data => data?.region === selectedRegion);

  const regions = [...new Set(weatherData.map(data => data.region))];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Weather Integration</h2>
          <p className="text-sm text-muted-foreground">Weather impact on railway operations</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e?.target?.value)}
            className="bg-background border border-border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Regions</option>
            {regions?.map((region) => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
          
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Icon name="RefreshCw" size={14} />
            <span>Updated 5 min ago</span>
          </div>
        </div>
      </div>
      {/* Weather Alerts */}
      {weatherAlerts?.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-3">Active Weather Alerts</h3>
          <div className="space-y-3">
            {weatherAlerts?.map((alert) => (
              <div key={alert?.id} className={`border rounded-lg p-4 ${getImpactColor(alert?.severity)}`}>
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getImpactColor(alert?.severity)?.split(' ')?.[1]}`}>
                    <Icon name="AlertTriangle" size={16} className={getImpactColor(alert?.severity)?.split(' ')?.[0]} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-foreground">{alert?.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(alert?.severity)}`}>
                        {alert?.severity} impact
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{alert?.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Icon name="MapPin" size={12} />
                        <span>{alert?.affectedRoutes?.join(', ')}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={12} />
                        <span>Valid until {alert?.validUntil}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Regional Weather Data */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredData?.map((data) => (
          <div key={data?.id} className="border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold text-foreground">{data?.location}</h3>
                <p className="text-sm text-muted-foreground">{data?.region}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <Icon name={getWeatherIcon(data?.condition)} size={24} className="text-primary" />
                  <span className="text-xl font-bold text-foreground">{data?.temperature}°C</span>
                </div>
                <p className="text-xs text-muted-foreground capitalize">{data?.condition}</p>
              </div>
            </div>

            <div className="space-y-3">
              {/* Weather Metrics */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center space-x-2">
                  <Icon name="Droplets" size={14} className="text-primary" />
                  <span className="text-muted-foreground">Humidity:</span>
                  <span className="text-foreground font-medium">{data?.humidity}%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Wind" size={14} className="text-primary" />
                  <span className="text-muted-foreground">Wind:</span>
                  <span className="text-foreground font-medium">{data?.windSpeed} km/h</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Eye" size={14} className="text-primary" />
                  <span className="text-muted-foreground">Visibility:</span>
                  <span className="text-foreground font-medium">{data?.visibility} km</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Gauge" size={14} className="text-primary" />
                  <span className="text-muted-foreground">Pressure:</span>
                  <span className="text-foreground font-medium">{data?.pressure} mb</span>
                </div>
              </div>

              {/* Railway Impact */}
              <div className="pt-3 border-t border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Railway Impact</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(data?.railwayImpact?.level)}`}>
                    {data?.railwayImpact?.level}
                  </span>
                </div>
                
                <div className="space-y-2">
                  {data?.railwayImpact?.factors?.map((factor, index) => (
                    <div key={index} className="flex items-center space-x-2 text-xs">
                      <div className={`w-2 h-2 rounded-full ${
                        factor?.status === 'normal' ? 'bg-success' :
                        factor?.status === 'caution' ? 'bg-warning' : 'bg-error'
                      }`}></div>
                      <span className="text-muted-foreground">{factor?.name}:</span>
                      <span className="text-foreground font-medium capitalize">{factor?.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Forecast */}
              <div className="pt-3 border-t border-border">
                <h4 className="text-sm font-medium text-foreground mb-2">24h Forecast</h4>
                <div className="flex items-center justify-between">
                  {data?.forecast?.map((hour, index) => (
                    <div key={index} className="text-center">
                      <p className="text-xs text-muted-foreground">{hour?.time}</p>
                      <Icon name={getWeatherIcon(hour?.condition)} size={16} className="text-primary mx-auto my-1" />
                      <p className="text-xs font-medium text-foreground">{hour?.temp}°</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Weather-Railway Correlation */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Weather-Railway Correlation</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-2">
              <Icon name="CloudRain" size={20} className="text-primary" />
              <h4 className="font-medium text-foreground">Rain Impact</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Heavy rainfall detected in 3 regions affecting train schedules
            </p>
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-warning">12 trains delayed</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-error">2 routes affected</span>
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-2">
              <Icon name="CloudDrizzle" size={20} className="text-primary" />
              <h4 className="font-medium text-foreground">Fog Advisory</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Low visibility conditions expected in northern regions
            </p>
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-warning">Visibility &lt; 200m</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-primary">Speed restrictions active</span>
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-2">
              <Icon name="Sun" size={20} className="text-primary" />
              <h4 className="font-medium text-foreground">Clear Conditions</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Optimal weather conditions in 8 major routes
            </p>
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-success">Normal operations</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-success">On-time performance: 94%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherIntegration;
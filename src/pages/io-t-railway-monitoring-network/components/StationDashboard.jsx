import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const StationDashboard = ({ stations, onStationSelect }) => {
  const [selectedStation, setSelectedStation] = useState(stations?.[0]?.id || null);

  const currentStation = stations?.find(s => s?.id === selectedStation);

  const getMetricColor = (value, threshold) => {
    if (value <= threshold?.normal) return 'text-success';
    if (value <= threshold?.warning) return 'text-warning';
    return 'text-error';
  };

  const getMetricBgColor = (value, threshold) => {
    if (value <= threshold?.normal) return 'bg-success/10';
    if (value <= threshold?.warning) return 'bg-warning/10';
    return 'bg-error/10';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Station Monitoring</h2>
          <p className="text-sm text-muted-foreground">Real-time facility conditions</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Icon name="MapPin" size={16} className="text-muted-foreground" />
          <select
            value={selectedStation}
            onChange={(e) => setSelectedStation(e?.target?.value)}
            className="bg-background border border-border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {stations?.map((station) => (
              <option key={station?.id} value={station?.id}>
                {station?.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {currentStation && (
        <div className="space-y-6">
          {/* Station Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Users" size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Current Crowd</p>
                  <p className="text-xl font-semibold text-foreground">{currentStation?.crowdLevel}</p>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Thermometer" size={20} className="text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Temperature</p>
                  <p className="text-xl font-semibold text-foreground">{currentStation?.temperature}°C</p>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Icon name="Volume2" size={20} className="text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Noise Level</p>
                  <p className="text-xl font-semibold text-foreground">{currentStation?.noiseLevel} dB</p>
                </div>
              </div>
            </div>
          </div>

          {/* Facility Metrics */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Facility Conditions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentStation?.facilities?.map((facility) => (
                <div key={facility?.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getMetricBgColor(facility?.score, facility?.threshold)}`}>
                        <Icon name={facility?.icon} size={16} className={getMetricColor(facility?.score, facility?.threshold)} />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{facility?.name}</h4>
                        <p className="text-xs text-muted-foreground">{facility?.location}</p>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getMetricBgColor(facility?.score, facility?.threshold)} ${getMetricColor(facility?.score, facility?.threshold)}`}>
                      {facility?.score}/10
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Cleanliness</span>
                      <span className="text-foreground">{facility?.cleanliness}/10</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          facility?.cleanliness >= 8 ? 'bg-success' :
                          facility?.cleanliness >= 6 ? 'bg-warning' : 'bg-error'
                        }`}
                        style={{ width: `${facility?.cleanliness * 10}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Last Maintenance</span>
                      <span className="text-foreground">{facility?.lastMaintenance}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Platform Status */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Platform Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {currentStation?.platforms?.map((platform) => (
                <div key={platform?.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-foreground">Platform {platform?.number}</h4>
                    <div className={`w-3 h-3 rounded-full ${
                      platform?.status === 'operational' ? 'bg-success' :
                      platform?.status === 'maintenance' ? 'bg-warning' : 'bg-error'
                    } sensor-active`}></div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Crowd Density</span>
                      <span className="text-foreground">{platform?.crowdDensity}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Next Train</span>
                      <span className="text-foreground">{platform?.nextTrain}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Amenities</span>
                      <div className="flex space-x-1">
                        {platform?.amenities?.map((amenity, index) => (
                          <Icon key={index} name={amenity} size={12} className="text-muted-foreground" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StationDashboard;
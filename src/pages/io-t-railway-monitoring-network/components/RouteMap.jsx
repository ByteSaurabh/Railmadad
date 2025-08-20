import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const RouteMap = ({ routes, onRouteSelect }) => {
  const [selectedRoute, setSelectedRoute] = useState(null);

  const handleRouteClick = (route) => {
    setSelectedRoute(route?.id);
    onRouteSelect(route);
  };

  const getRouteStatusColor = (status) => {
    switch (status) {
      case 'normal':
        return 'stroke-success';
      case 'warning':
        return 'stroke-warning';
      case 'critical':
        return 'stroke-error';
      default:
        return 'stroke-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Railway Network Map</h2>
          <p className="text-sm text-muted-foreground">Golden Quadrilateral & Major Routes</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-xs text-muted-foreground">Normal</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span className="text-xs text-muted-foreground">Warning</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-error rounded-full"></div>
            <span className="text-xs text-muted-foreground">Critical</span>
          </div>
        </div>
      </div>
      <div className="relative bg-muted/30 rounded-lg p-8 min-h-[400px]">
        {/* Simplified India Map with Railway Routes */}
        <svg viewBox="0 0 400 500" className="w-full h-full">
          {/* India outline (simplified) */}
          <path
            d="M100 50 L300 50 L320 100 L350 200 L340 300 L320 400 L280 450 L200 460 L120 450 L80 400 L60 300 L70 200 L100 50 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-border"
          />

          {/* Major Cities */}
          <g className="text-foreground">
            {/* Delhi */}
            <circle cx="200" cy="120" r="6" fill="currentColor" />
            <text x="210" y="115" className="text-xs font-medium">Delhi</text>
            
            {/* Mumbai */}
            <circle cx="140" cy="220" r="6" fill="currentColor" />
            <text x="100" y="215" className="text-xs font-medium">Mumbai</text>
            
            {/* Chennai */}
            <circle cx="260" cy="350" r="6" fill="currentColor" />
            <text x="270" y="345" className="text-xs font-medium">Chennai</text>
            
            {/* Kolkata */}
            <circle cx="280" cy="200" r="6" fill="currentColor" />
            <text x="290" y="195" className="text-xs font-medium">Kolkata</text>
          </g>

          {/* Railway Routes */}
          {routes?.map((route, index) => (
            <g key={route?.id}>
              <path
                d={route?.path}
                fill="none"
                strokeWidth="4"
                className={`${getRouteStatusColor(route?.status)} cursor-pointer hover:stroke-primary transition-colors`}
                onClick={() => handleRouteClick(route)}
              />
              {selectedRoute === route?.id && (
                <path
                  d={route?.path}
                  fill="none"
                  strokeWidth="6"
                  className="stroke-primary opacity-50"
                />
              )}
            </g>
          ))}

          {/* Sensor Indicators */}
          {routes?.map((route) =>
            route?.sensors?.map((sensor, index) => (
              <circle
                key={`${route?.id}-sensor-${index}`}
                cx={sensor?.x}
                cy={sensor?.y}
                r="3"
                className={`${
                  sensor?.status === 'normal' ? 'fill-success' :
                  sensor?.status === 'warning' ? 'fill-warning' : 'fill-error'
                } cursor-pointer sensor-active`}
                title={sensor?.name}
              />
            ))
          )}
        </svg>

        {/* Route Information Panel */}
        {selectedRoute && (
          <div className="absolute top-4 right-4 bg-card border border-border rounded-lg p-4 w-64 shadow-lg">
            {(() => {
              const route = routes?.find(r => r?.id === selectedRoute);
              return (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-foreground">{route?.name}</h3>
                    <button
                      onClick={() => setSelectedRoute(null)}
                      className="p-1 hover:bg-muted rounded"
                    >
                      <Icon name="X" size={16} />
                    </button>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Distance</span>
                      <span className="text-foreground">{route?.distance} km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Active Sensors</span>
                      <span className="text-foreground">{route?.activeSensors}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status</span>
                      <span className={`capitalize ${
                        route?.status === 'normal' ? 'text-success' :
                        route?.status === 'warning' ? 'text-warning' : 'text-error'
                      }`}>
                        {route?.status}
                      </span>
                    </div>
                  </div>
                  {route?.alerts && route?.alerts?.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <h4 className="text-xs font-medium text-muted-foreground mb-2">Recent Alerts</h4>
                      <div className="space-y-1">
                        {route?.alerts?.slice(0, 2)?.map((alert, index) => (
                          <div key={index} className="text-xs text-warning">
                            • {alert}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};

export default RouteMap;
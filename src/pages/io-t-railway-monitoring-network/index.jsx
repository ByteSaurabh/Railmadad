import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Header from '../../components/ui/Header';
import SensorStatusCard from './components/SensorStatusCard';
import RouteMap from './components/RouteMap';
import StationDashboard from './components/StationDashboard';
import PredictiveAlerts from './components/PredictiveAlerts';
import WeatherIntegration from './components/WeatherIntegration';
import LiveMetrics from './components/LiveMetrics';

const IoTRailwayMonitoringNetwork = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [refreshRate, setRefreshRate] = useState(5000);

  // Mock sensor data
  const sensorData = [
    {
      id: 'toilet-001',
      name: 'Toilet Cleanliness',
      location: 'Coach B3, Train 12345',
      icon: 'Droplets',
      currentValue: 7.2,
      threshold: 8.0,
      unit: '/10',
      status: 'warning',
      lastUpdated: '2 min ago'
    },
    {
      id: 'temp-002',
      name: 'AC Temperature',
      location: 'Coach A1, Train 12345',
      icon: 'Thermometer',
      currentValue: 22.5,
      threshold: 25.0,
      unit: '°C',
      status: 'normal',
      lastUpdated: '1 min ago'
    },
    {
      id: 'crowd-003',
      name: 'Platform Crowd',
      location: 'Platform 3, New Delhi',
      icon: 'Users',
      currentValue: 85,
      threshold: 70,
      unit: '%',
      status: 'critical',
      lastUpdated: '30 sec ago'
    },
    {
      id: 'noise-004',
      name: 'Noise Level',
      location: 'Waiting Room, Mumbai Central',
      icon: 'Volume2',
      currentValue: 65,
      threshold: 70,
      unit: 'dB',
      status: 'normal',
      lastUpdated: '1 min ago'
    }
  ];

  // Mock route data
  const routeData = [
    {
      id: 'gq-delhi-mumbai',
      name: 'Delhi - Mumbai',
      path: 'M200 120 Q170 170 140 220',
      distance: 1384,
      activeSensors: 156,
      status: 'normal',
      sensors: [
        { x: 180, y: 150, status: 'normal', name: 'Jaipur Junction' },
        { x: 160, y: 180, status: 'warning', name: 'Ajmer' },
        { x: 150, y: 200, status: 'normal', name: 'Ahmedabad' }
      ],
      alerts: []
    },
    {
      id: 'gq-mumbai-chennai',
      name: 'Mumbai - Chennai',
      path: 'M140 220 Q200 280 260 350',
      distance: 1279,
      activeSensors: 142,
      status: 'warning',
      sensors: [
        { x: 170, y: 250, status: 'normal', name: 'Pune' },
        { x: 200, y: 300, status: 'critical', name: 'Bangalore' },
        { x: 230, y: 330, status: 'warning', name: 'Salem' }
      ],
      alerts: ['Heavy rainfall affecting Pune-Bangalore section', 'Signal maintenance at Bangalore']
    },
    {
      id: 'gq-chennai-kolkata',
      name: 'Chennai - Kolkata',
      path: 'M260 350 Q270 280 280 200',
      distance: 1663,
      activeSensors: 189,
      status: 'normal',
      sensors: [
        { x: 265, y: 320, status: 'normal', name: 'Vijayawada' },
        { x: 270, y: 280, status: 'normal', name: 'Visakhapatnam' },
        { x: 275, y: 240, status: 'warning', name: 'Bhubaneswar' }
      ],
      alerts: []
    },
    {
      id: 'gq-kolkata-delhi',
      name: 'Kolkata - Delhi',
      path: 'M280 200 Q240 160 200 120',
      distance: 1472,
      activeSensors: 167,
      status: 'warning',
      sensors: [
        { x: 260, y: 180, status: 'normal', name: 'Dhanbad' },
        { x: 240, y: 160, status: 'warning', name: 'Varanasi' },
        { x: 220, y: 140, status: 'normal', name: 'Allahabad' }
      ],
      alerts: ['Fog advisory for Varanasi-Allahabad section']
    }
  ];

  // Mock station data
  const stationData = [
    {
      id: 'ndls',
      name: 'New Delhi Railway Station',
      crowdLevel: 'High',
      temperature: 28,
      noiseLevel: 72,
      facilities: [
        {
          id: 'waiting-room-1',
          name: 'AC Waiting Room',
          location: 'Platform 1',
          icon: 'Home',
          score: 8.5,
          cleanliness: 9,
          threshold: { normal: 8, warning: 6 },
          lastMaintenance: '2 hours ago'
        },
        {
          id: 'toilet-1',
          name: 'Public Toilets',
          location: 'Platform 2',
          icon: 'Droplets',
          score: 6.2,
          cleanliness: 6,
          threshold: { normal: 8, warning: 6 },
          lastMaintenance: '4 hours ago'
        },
        {
          id: 'food-court',
          name: 'Food Court',
          location: 'Main Concourse',
          icon: 'Coffee',
          score: 7.8,
          cleanliness: 8,
          threshold: { normal: 8, warning: 6 },
          lastMaintenance: '1 hour ago'
        }
      ],
      platforms: [
        {
          id: 'platform-1',
          number: 1,
          status: 'operational',
          crowdDensity: 65,
          nextTrain: '12:45 PM',
          amenities: ['Wifi', 'Bench', 'Display']
        },
        {
          id: 'platform-2',
          number: 2,
          status: 'maintenance',
          crowdDensity: 20,
          nextTrain: '1:30 PM',
          amenities: ['Display']
        },
        {
          id: 'platform-3',
          number: 3,
          status: 'operational',
          crowdDensity: 85,
          nextTrain: '12:30 PM',
          amenities: ['Wifi', 'Bench', 'Display', 'Food']
        }
      ]
    },
    {
      id: 'cstm',
      name: 'Mumbai Chhatrapati Shivaji Terminus',
      crowdLevel: 'Very High',
      temperature: 32,
      noiseLevel: 78,
      facilities: [
        {
          id: 'waiting-room-2',
          name: 'General Waiting Room',
          location: 'Main Hall',
          icon: 'Home',
          score: 7.2,
          cleanliness: 7,
          threshold: { normal: 8, warning: 6 },
          lastMaintenance: '3 hours ago'
        },
        {
          id: 'toilet-2',
          name: 'Platform Toilets',
          location: 'Platform 5',
          icon: 'Droplets',
          score: 5.8,
          cleanliness: 6,
          threshold: { normal: 8, warning: 6 },
          lastMaintenance: '6 hours ago'
        }
      ],
      platforms: [
        {
          id: 'platform-4',
          number: 4,
          status: 'operational',
          crowdDensity: 92,
          nextTrain: '12:25 PM',
          amenities: ['Wifi', 'Display']
        },
        {
          id: 'platform-5',
          number: 5,
          status: 'operational',
          crowdDensity: 78,
          nextTrain: '12:35 PM',
          amenities: ['Bench', 'Display', 'Food']
        }
      ]
    }
  ];

  // Mock predictive alerts
  const predictiveAlerts = [
    {
      id: 'alert-001',
      title: 'AC System Failure Predicted',
      description: 'Temperature sensors in Coach A1 showing irregular patterns. Potential AC failure within 6 hours.',
      type: 'equipment',
      priority: 'critical',
      location: 'Train 12345, Coach A1',
      timestamp: new Date(Date.now() - 300000),
      predictedImpact: 'High passenger discomfort',
      recommendation: 'Schedule immediate maintenance check and prepare backup cooling system.',
      actions: [
        { type: 'acknowledge', label: 'Acknowledge' },
        { type: 'schedule', label: 'Schedule Maintenance' }
      ]
    },
    {
      id: 'alert-002',
      title: 'Platform Overcrowding Expected',
      description: 'Multiple train arrivals scheduled simultaneously. Platform 3 crowd density may exceed safe limits.',
      type: 'crowd',
      priority: 'high',
      location: 'New Delhi Station, Platform 3',
      timestamp: new Date(Date.now() - 600000),
      predictedImpact: 'Safety risk, delayed boarding',
      recommendation: 'Deploy additional crowd management staff and announce platform changes.',
      actions: [
        { type: 'acknowledge', label: 'Acknowledge' },
        { type: 'deploy', label: 'Deploy Staff' }
      ]
    },
    {
      id: 'alert-003',
      title: 'Toilet Maintenance Required',
      description: 'Cleanliness scores consistently declining in Coach B3 toilets over past 4 hours.',
      type: 'cleanliness',
      priority: 'medium',
      location: 'Train 12345, Coach B3',
      timestamp: new Date(Date.now() - 900000),
      predictedImpact: 'Passenger complaints, hygiene concerns',
      recommendation: 'Schedule cleaning crew at next major station stop.',
      actions: [
        { type: 'acknowledge', label: 'Acknowledge' },
        { type: 'schedule', label: 'Schedule Cleaning' }
      ]
    }
  ];

  // Mock weather data
  const weatherData = [
    {
      id: 'weather-north',
      location: 'New Delhi',
      region: 'Northern Railway',
      condition: 'Foggy',
      temperature: 18,
      humidity: 85,
      windSpeed: 12,
      visibility: 0.5,
      pressure: 1015,
      railwayImpact: {
        level: 'high',
        factors: [
          { name: 'Visibility', status: 'critical' },
          { name: 'Speed Restrictions', status: 'caution' },
          { name: 'Signal Systems', status: 'normal' }
        ]
      },
      forecast: [
        { time: '2PM', condition: 'foggy', temp: 20 },
        { time: '4PM', condition: 'cloudy', temp: 22 },
        { time: '6PM', condition: 'clear', temp: 19 },
        { time: '8PM', condition: 'clear', temp: 16 }
      ]
    },
    {
      id: 'weather-west',
      location: 'Mumbai',
      region: 'Western Railway',
      condition: 'Rainy',
      temperature: 26,
      humidity: 92,
      windSpeed: 25,
      visibility: 2.0,
      pressure: 1008,
      railwayImpact: {
        level: 'medium',
        factors: [
          { name: 'Track Conditions', status: 'caution' },
          { name: 'Electrical Systems', status: 'normal' },
          { name: 'Passenger Comfort', status: 'normal' }
        ]
      },
      forecast: [
        { time: '2PM', condition: 'rainy', temp: 25 },
        { time: '4PM', condition: 'rainy', temp: 24 },
        { time: '6PM', condition: 'cloudy', temp: 23 },
        { time: '8PM', condition: 'cloudy', temp: 22 }
      ]
    }
  ];

  const weatherAlerts = [
    {
      id: 'weather-alert-001',
      title: 'Dense Fog Warning',
      description: 'Visibility below 200 meters expected in Delhi-Ambala section. Speed restrictions in effect.',
      severity: 'high',
      affectedRoutes: ['Delhi-Chandigarh', 'Delhi-Amritsar'],
      validUntil: '6:00 AM tomorrow'
    }
  ];

  // Mock live metrics
  const liveMetrics = [
    {
      id: 'metric-001',
      name: 'Coach Temperature',
      location: 'Train 12345, AC-1',
      category: 'temperature',
      icon: 'Thermometer',
      currentValue: 22.5,
      unit: '°C',
      type: 'decimal',
      thresholds: { normal: 25, warning: 28, critical: 32 },
      trend: 'stable',
      changePercent: 0.2,
      sensorId: 'TEMP-001',
      lastUpdate: '30s ago'
    },
    {
      id: 'metric-002',
      name: 'Toilet Cleanliness',
      location: 'Platform 2, NDLS',
      category: 'cleanliness',
      icon: 'Droplets',
      currentValue: 6.2,
      unit: '/10',
      type: 'decimal',
      thresholds: { normal: 8, warning: 6, critical: 4 },
      trend: 'down',
      changePercent: -12.5,
      sensorId: 'CLEAN-002',
      lastUpdate: '1m ago'
    },
    {
      id: 'metric-003',
      name: 'Platform Crowd',
      location: 'Platform 3, NDLS',
      category: 'crowd',
      icon: 'Users',
      currentValue: 85,
      unit: '%',
      type: 'percentage',
      thresholds: { normal: 60, warning: 80, critical: 90 },
      trend: 'up',
      changePercent: 15.2,
      sensorId: 'CROWD-003',
      lastUpdate: '15s ago'
    },
    {
      id: 'metric-004',
      name: 'Noise Level',
      location: 'Waiting Room, CST',
      category: 'noise',
      icon: 'Volume2',
      currentValue: 68,
      unit: 'dB',
      type: 'decimal',
      thresholds: { normal: 65, warning: 75, critical: 85 },
      trend: 'up',
      changePercent: 8.3,
      sensorId: 'NOISE-004',
      lastUpdate: '45s ago'
    }
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: 'BarChart3' },
    { id: 'sensors', name: 'Sensors', icon: 'Wifi' },
    { id: 'routes', name: 'Route Map', icon: 'Map' },
    { id: 'stations', name: 'Stations', icon: 'Building' },
    { id: 'alerts', name: 'Predictive Alerts', icon: 'AlertTriangle' },
    { id: 'weather', name: 'Weather', icon: 'Cloud' },
    { id: 'metrics', name: 'Live Metrics', icon: 'Activity' }
  ];

  const handleRouteSelect = (route) => {
    setSelectedRoute(route);
  };

  const handleAlertAction = (alertId, actionType) => {
    console.log(`Alert ${alertId} - Action: ${actionType}`);
  };

  const handleMetricClick = (metric) => {
    console.log('Metric clicked:', metric);
  };

  useEffect(() => {
    document.title = 'IoT Railway Monitoring Network - RailMadad AI';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                  <Icon name="Wifi" size={32} color="white" />
                </div>
                <div className="w-2 h-2 bg-success rounded-full sensor-active"></div>
              </div>
              <h1 className="text-4xl font-bold mb-4">IoT Railway Monitoring Network</h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Real-time sensor data from railway infrastructure across India's major routes and stations. 
                Monitor cleanliness, temperature, crowd density, and safety metrics with AI-powered predictive analytics.
              </p>
              
              <div className="flex items-center justify-center space-x-8 mt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold">2,847</div>
                  <div className="text-white/80">Active Sensors</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">156</div>
                  <div className="text-white/80">Railway Stations</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">94.2%</div>
                  <div className="text-white/80">System Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">24/7</div>
                  <div className="text-white/80">Monitoring</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-card border-b border-border sticky top-16 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-1 overflow-x-auto py-4">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    activeTab === tab?.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                      <Icon name="CheckCircle" size={24} className="text-success" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Normal Status</p>
                      <p className="text-2xl font-bold text-foreground">2,456</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                      <Icon name="AlertTriangle" size={24} className="text-warning" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Warnings</p>
                      <p className="text-2xl font-bold text-foreground">284</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-error/10 rounded-lg flex items-center justify-center">
                      <Icon name="XCircle" size={24} className="text-error" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Critical</p>
                      <p className="text-2xl font-bold text-foreground">107</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name="Activity" size={24} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Active Monitoring</p>
                      <p className="text-2xl font-bold text-foreground">2,847</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Featured Sensors */}
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-6">Critical Sensor Status</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {sensorData?.map((sensor) => (
                    <SensorStatusCard key={sensor?.id} sensor={sensor} />
                  ))}
                </div>
              </div>

              {/* Quick Navigation */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">Quick Access</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {[
                    { name: 'Smart Complaints', path: '/smart-complaint-portal', icon: 'MessageSquare', color: 'primary' },
                    { name: 'AI Dashboard', path: '/ai-dashboard-homepage', icon: 'BarChart3', color: 'secondary' },
                    { name: 'Passenger Rights', path: '/passenger-rights-advocacy-hub', icon: 'Shield', color: 'accent' },
                    { name: 'Authority Panel', path: '/authority-management-dashboard', icon: 'Users', color: 'warning' },
                    { name: 'Community Forum', path: '/community-forum-support-network', icon: 'MessageCircle', color: 'success' },
                    { name: 'Emergency', path: '#', icon: 'AlertTriangle', color: 'error' }
                  ]?.map((item) => (
                    <Link
                      key={item?.name}
                      to={item?.path}
                      className={`flex flex-col items-center space-y-2 p-4 rounded-lg border border-border hover:shadow-md transition-all group`}
                    >
                      <div className={`w-12 h-12 bg-${item?.color}/10 rounded-lg flex items-center justify-center group-hover:bg-${item?.color}/20 transition-colors`}>
                        <Icon name={item?.icon} size={24} className={`text-${item?.color}`} />
                      </div>
                      <span className="text-sm font-medium text-foreground text-center">{item?.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sensors' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sensorData?.map((sensor) => (
                  <SensorStatusCard key={sensor?.id} sensor={sensor} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'routes' && (
            <RouteMap routes={routeData} onRouteSelect={handleRouteSelect} />
          )}

          {activeTab === 'stations' && (
            <StationDashboard stations={stationData} onStationSelect={(station) => console.log('Station selected:', station)} />
          )}

          {activeTab === 'alerts' && (
            <PredictiveAlerts alerts={predictiveAlerts} onAlertAction={handleAlertAction} />
          )}

          {activeTab === 'weather' && (
            <WeatherIntegration weatherData={weatherData} weatherAlerts={weatherAlerts} />
          )}

          {activeTab === 'metrics' && (
            <LiveMetrics metrics={liveMetrics} onMetricClick={handleMetricClick} />
          )}
        </div>
      </div>
    </div>
  );
};

export default IoTRailwayMonitoringNetwork;
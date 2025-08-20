import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const DashboardWidgets = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [activeWidget, setActiveWidget] = useState('complaints');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('railmadad_language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const complaintVolumeData = [
    { month: 'Jan', complaints: 1200, resolved: 1150 },
    { month: 'Feb', complaints: 1400, resolved: 1380 },
    { month: 'Mar', complaints: 1100, resolved: 1090 },
    { month: 'Apr', complaints: 1600, resolved: 1550 },
    { month: 'May', complaints: 1300, resolved: 1280 },
    { month: 'Jun', complaints: 1500, resolved: 1470 }
  ];

  const resolutionTimeData = [
    { category: 'Cleanliness', avgTime: 24, target: 48 },
    { category: 'Food Quality', avgTime: 36, target: 48 },
    { category: 'Staff Behavior', avgTime: 18, target: 24 },
    { category: 'Technical Issues', avgTime: 72, target: 96 },
    { category: 'Safety Concerns', avgTime: 12, target: 12 }
  ];

  const categoryDistribution = [
    { name: 'Cleanliness', value: 35, color: '#2563EB' },
    { name: 'Food Quality', value: 25, color: '#059669' },
    { name: 'Staff Behavior', value: 20, color: '#DC2626' },
    { name: 'Technical Issues', value: 15, color: '#F59E0B' },
    { name: 'Safety', value: 5, color: '#7C3AED' }
  ];

  const iotSensorData = [
    { station: 'New Delhi', temperature: 28, humidity: 65, airQuality: 85, crowdLevel: 'High' },
    { station: 'Mumbai Central', temperature: 32, humidity: 78, airQuality: 72, crowdLevel: 'Medium' },
    { station: 'Chennai Central', temperature: 35, humidity: 82, airQuality: 68, crowdLevel: 'High' },
    { station: 'Kolkata', temperature: 30, humidity: 88, airQuality: 75, crowdLevel: 'Low' },
    { station: 'Bangalore', temperature: 26, humidity: 70, airQuality: 90, crowdLevel: 'Medium' }
  ];

  const widgetTitles = {
    en: {
      complaints: 'Complaint Volume Trends',
      resolution: 'Resolution Time Analysis',
      categories: 'Issue Categories',
      iot: 'IoT Sensor Monitoring'
    },
    hi: {
      complaints: 'शिकायत मात्रा रुझान',
      resolution: 'समाधान समय विश्लेषण',
      categories: 'मुद्दे की श्रेणियां',
      iot: 'IoT सेंसर निगरानी'
    },
    ta: {
      complaints: 'புகார் அளவு போக்குகள்',
      resolution: 'தீர்வு நேர பகுப்பாய்வு',
      categories: 'பிரச்சினை வகைகள்',
      iot: 'IoT சென்சார் கண்காணிப்பு'
    },
    te: {
      complaints: 'ఫిర్యాదుల వాల్యూమ్ ట్రెండ్స్',
      resolution: 'రిజల్యూషన్ టైమ్ అనాలిసిస్',
      categories: 'సమస్య వర్గాలు',
      iot: 'IoT సెన్సార్ మానిటరింగ్'
    }
  };

  const titles = widgetTitles?.[currentLanguage];

  const widgets = [
    { id: 'complaints', name: titles?.complaints, icon: 'BarChart3' },
    { id: 'resolution', name: titles?.resolution, icon: 'Clock' },
    { id: 'categories', name: titles?.categories, icon: 'PieChart' },
    { id: 'iot', name: titles?.iot, icon: 'Wifi' }
  ];

  const getCrowdLevelColor = (level) => {
    switch (level) {
      case 'High': return 'text-destructive bg-destructive/10';
      case 'Medium': return 'text-warning bg-warning/10';
      case 'Low': return 'text-success bg-success/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const renderWidget = () => {
    switch (activeWidget) {
      case 'complaints':
        return (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={complaintVolumeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar dataKey="complaints" fill="#2563EB" name="Total Complaints" radius={[4, 4, 0, 0]} />
                <Bar dataKey="resolved" fill="#059669" name="Resolved" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );

      case 'resolution':
        return (
          <div className="space-y-4">
            {resolutionTimeData?.map((item, index) => (
              <div key={index} className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-foreground">{item?.category}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">{item?.avgTime}h avg</span>
                    <span className="text-xs text-muted-foreground">/ {item?.target}h target</span>
                  </div>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      item?.avgTime <= item?.target ? 'bg-success' : 'bg-warning'
                    }`}
                    style={{ width: `${Math.min((item?.avgTime / item?.target) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'categories':
        return (
          <div className="flex items-center justify-center h-80">
            <div className="w-full max-w-md">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={categoryDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryDistribution?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry?.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {categoryDistribution?.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item?.color }}
                    ></div>
                    <span className="text-sm text-muted-foreground">{item?.name}</span>
                    <span className="text-sm font-medium">{item?.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'iot':
        return (
          <div className="space-y-4">
            {iotSensorData?.map((station, index) => (
              <div key={index} className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Icon name="MapPin" size={16} className="text-primary" />
                    <span className="font-medium text-foreground">{station?.station}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCrowdLevelColor(station?.crowdLevel)}`}>
                    {station?.crowdLevel} Crowd
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Icon name="Thermometer" size={14} className="text-warning" />
                      <span className="text-sm text-muted-foreground">Temp</span>
                    </div>
                    <span className="text-lg font-semibold text-foreground">{station?.temperature}°C</span>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Icon name="Droplets" size={14} className="text-blue-500" />
                      <span className="text-sm text-muted-foreground">Humidity</span>
                    </div>
                    <span className="text-lg font-semibold text-foreground">{station?.humidity}%</span>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Icon name="Wind" size={14} className="text-success" />
                      <span className="text-sm text-muted-foreground">Air Quality</span>
                    </div>
                    <span className="text-lg font-semibold text-foreground">{station?.airQuality}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Real-Time Analytics Dashboard
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Monitor railway system health, complaint trends, and IoT sensor data across India's rail network
          </p>
        </div>

        <div className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden">
          {/* Widget Navigation */}
          <div className="border-b border-border bg-muted/30">
            <div className="flex overflow-x-auto">
              {widgets?.map((widget) => (
                <button
                  key={widget?.id}
                  onClick={() => setActiveWidget(widget?.id)}
                  className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    activeWidget === widget?.id
                      ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Icon name={widget?.icon} size={16} />
                  <span>{widget?.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Widget Content */}
          <div className="p-6">
            {renderWidget()}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          <div className="bg-card rounded-xl border border-border p-6 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Icon name="Users" size={24} className="text-primary" />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">2.3M+</div>
            <div className="text-sm text-muted-foreground">Active Users</div>
          </div>
          <div className="bg-card rounded-xl border border-border p-6 text-center">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircle" size={24} className="text-success" />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">94.2%</div>
            <div className="text-sm text-muted-foreground">Resolution Rate</div>
          </div>
          <div className="bg-card rounded-xl border border-border p-6 text-center">
            <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Icon name="Clock" size={24} className="text-warning" />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">48h</div>
            <div className="text-sm text-muted-foreground">Avg Response</div>
          </div>
          <div className="bg-card rounded-xl border border-border p-6 text-center">
            <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Icon name="Wifi" size={24} className="text-secondary" />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">1,247</div>
            <div className="text-sm text-muted-foreground">IoT Sensors</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardWidgets;
import React from 'react';
import Icon from '../../../components/AppIcon';

const PerformanceMetrics = ({ metrics, timeframe, onTimeframeChange }) => {
  const metricCards = [
    {
      title: 'Total Complaints',
      value: metrics?.totalComplaints,
      change: metrics?.complaintsChange,
      icon: 'MessageSquare',
      color: 'blue'
    },
    {
      title: 'Resolution Rate',
      value: `${metrics?.resolutionRate}%`,
      change: metrics?.resolutionChange,
      icon: 'CheckCircle',
      color: 'green'
    },
    {
      title: 'Avg Response Time',
      value: `${metrics?.avgResponseTime}h`,
      change: metrics?.responseTimeChange,
      icon: 'Clock',
      color: 'orange'
    },
    {
      title: 'Satisfaction Score',
      value: `${metrics?.satisfactionScore}/5`,
      change: metrics?.satisfactionChange,
      icon: 'Star',
      color: 'purple'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600',
      green: 'bg-green-50 text-green-600',
      orange: 'bg-orange-50 text-orange-600',
      purple: 'bg-purple-50 text-purple-600'
    };
    return colors?.[color] || colors?.blue;
  };

  const getChangeColor = (change) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getChangeIcon = (change) => {
    if (change > 0) return 'TrendingUp';
    if (change < 0) return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Performance Overview</h3>
            <p className="text-sm text-gray-600 mt-1">
              Key metrics for your department
            </p>
          </div>
          
          <select
            value={timeframe}
            onChange={(e) => onTimeframeChange(e?.target?.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metricCards?.map((metric, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getColorClasses(metric?.color)}`}>
                  <Icon name={metric?.icon} size={20} />
                </div>
                <div className={`flex items-center gap-1 text-sm ${getChangeColor(metric?.change)}`}>
                  <Icon name={getChangeIcon(metric?.change)} size={14} />
                  <span>{Math.abs(metric?.change)}%</span>
                </div>
              </div>
              
              <div>
                <p className="text-2xl font-bold text-gray-900 mb-1">
                  {metric?.value}
                </p>
                <p className="text-sm text-gray-600">
                  {metric?.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Department Comparison */}
        <div className="mt-8">
          <h4 className="text-sm font-medium text-gray-900 mb-4">Department Comparison</h4>
          <div className="space-y-4">
            {metrics?.departmentComparison?.map((dept, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                    dept?.rank === 1 ? 'bg-yellow-100 text-yellow-800' :
                    dept?.rank === 2 ? 'bg-gray-100 text-gray-800' :
                    dept?.rank === 3 ? 'bg-orange-100 text-orange-800': 'bg-blue-100 text-blue-800'
                  }`}>
                    #{dept?.rank}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{dept?.name}</p>
                    <p className="text-xs text-gray-600">{dept?.complaints} complaints</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{dept?.resolutionRate}%</p>
                  <p className="text-xs text-gray-600">resolution rate</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Trends */}
        <div className="mt-8">
          <h4 className="text-sm font-medium text-gray-900 mb-4">Weekly Trends</h4>
          <div className="grid grid-cols-7 gap-2">
            {metrics?.weeklyTrends?.map((day, index) => (
              <div key={index} className="text-center">
                <p className="text-xs text-gray-600 mb-2">{day?.day}</p>
                <div className="relative h-20 bg-gray-100 rounded">
                  <div 
                    className="absolute bottom-0 left-0 right-0 bg-blue-500 rounded"
                    style={{ height: `${(day?.complaints / Math.max(...metrics?.weeklyTrends?.map(d => d?.complaints))) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs font-medium text-gray-900 mt-2">{day?.complaints}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;
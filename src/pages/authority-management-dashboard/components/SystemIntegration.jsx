import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SystemIntegration = ({ integrations, onToggleIntegration, onSyncData }) => {
  const [activeTab, setActiveTab] = useState('systems');
  const [syncStatus, setSyncStatus] = useState({});

  const systemCategories = [
    {
      id: 'core',
      name: 'Core Railway Systems',
      systems: integrations?.filter(i => i?.category === 'core')
    },
    {
      id: 'external',
      name: 'External Services',
      systems: integrations?.filter(i => i?.category === 'external')
    },
    {
      id: 'monitoring',
      name: 'Monitoring & Analytics',
      systems: integrations?.filter(i => i?.category === 'monitoring')
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Connected': return 'bg-green-100 text-green-800';
      case 'Disconnected': return 'bg-red-100 text-red-800';
      case 'Syncing': return 'bg-blue-100 text-blue-800';
      case 'Error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Connected': return 'CheckCircle';
      case 'Disconnected': return 'XCircle';
      case 'Syncing': return 'RefreshCw';
      case 'Error': return 'AlertTriangle';
      default: return 'Circle';
    }
  };

  const handleSync = async (systemId) => {
    setSyncStatus(prev => ({ ...prev, [systemId]: 'syncing' }));
    
    // Simulate sync process
    setTimeout(() => {
      setSyncStatus(prev => ({ ...prev, [systemId]: 'completed' }));
      onSyncData(systemId);
      
      setTimeout(() => {
        setSyncStatus(prev => ({ ...prev, [systemId]: null }));
      }, 2000);
    }, 3000);
  };

  const tabs = [
    { id: 'systems', label: 'System Status', icon: 'Server' },
    { id: 'api', label: 'API Endpoints', icon: 'Code' },
    { id: 'logs', label: 'Integration Logs', icon: 'FileText' }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">System Integration</h3>
            <p className="text-sm text-gray-600 mt-1">
              Manage connections to railway systems and external services
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" iconName="RefreshCw" iconPosition="left">
              Sync All
            </Button>
            <Button variant="outline" iconName="Settings" iconPosition="left">
              Configure
            </Button>
          </div>
        </div>
      </div>
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab?.id
                  ? 'border-blue-500 text-blue-600' :'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              {tab?.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="p-6">
        {activeTab === 'systems' && (
          <div className="space-y-8">
            {systemCategories?.map((category) => (
              <div key={category?.id}>
                <h4 className="text-md font-medium text-gray-900 mb-4">{category?.name}</h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {category?.systems?.map((system) => (
                    <div key={system?.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            system?.status === 'Connected' ? 'bg-green-100' : 'bg-red-100'
                          }`}>
                            <Icon 
                              name={system?.icon} 
                              size={20} 
                              className={system?.status === 'Connected' ? 'text-green-600' : 'text-red-600'} 
                            />
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900">{system?.name}</h5>
                            <p className="text-sm text-gray-600">{system?.description}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(system?.status)}`}>
                            <Icon 
                              name={getStatusIcon(system?.status)} 
                              size={12} 
                              className={`mr-1 ${syncStatus?.[system?.id] === 'syncing' ? 'animate-spin' : ''}`} 
                            />
                            {syncStatus?.[system?.id] === 'syncing' ? 'Syncing...' : system?.status}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Last Sync:</span>
                          <span className="text-gray-900">{system?.lastSync}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Data Records:</span>
                          <span className="text-gray-900">{system?.recordCount?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Response Time:</span>
                          <span className="text-gray-900">{system?.responseTime}ms</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          iconName="RefreshCw"
                          disabled={syncStatus?.[system?.id] === 'syncing'}
                          onClick={() => handleSync(system?.id)}
                        >
                          {syncStatus?.[system?.id] === 'syncing' ? 'Syncing...' : 'Sync'}
                        </Button>
                        
                        <Button
                          variant={system?.enabled ? "destructive" : "default"}
                          size="sm"
                          onClick={() => onToggleIntegration(system?.id, !system?.enabled)}
                        >
                          {system?.enabled ? 'Disable' : 'Enable'}
                        </Button>
                        
                        <Button variant="ghost" size="sm" iconName="Settings">
                          Config
                        </Button>
                      </div>

                      {syncStatus?.[system?.id] === 'completed' && (
                        <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded text-sm text-green-800">
                          <Icon name="CheckCircle" size={14} className="inline mr-1" />
                          Sync completed successfully
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'api' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-4">Available Endpoints</h4>
                <div className="space-y-3">
                  {[
                    { method: 'GET', endpoint: '/api/complaints', description: 'Fetch complaints data' },
                    { method: 'POST', endpoint: '/api/complaints', description: 'Create new complaint' },
                    { method: 'PUT', endpoint: '/api/complaints/{id}', description: 'Update complaint status' },
                    { method: 'GET', endpoint: '/api/staff', description: 'Get staff information' },
                    { method: 'GET', endpoint: '/api/analytics', description: 'Fetch analytics data' }
                  ]?.map((api, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 rounded text-xs font-mono font-medium ${
                          api?.method === 'GET' ? 'bg-green-100 text-green-800' :
                          api?.method === 'POST'? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'
                        }`}>
                          {api?.method}
                        </span>
                        <div>
                          <p className="text-sm font-mono text-gray-900">{api?.endpoint}</p>
                          <p className="text-xs text-gray-600">{api?.description}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" iconName="Copy">
                        Copy
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-md font-medium text-gray-900 mb-4">API Usage Statistics</h4>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Total Requests (24h)</span>
                      <span className="text-lg font-semibold text-gray-900">12,847</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Success Rate</span>
                      <span className="text-lg font-semibold text-green-600">99.2%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '99.2%' }}></div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Avg Response Time</span>
                      <span className="text-lg font-semibold text-gray-900">245ms</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-md font-medium text-gray-900">Integration Logs</h4>
              <div className="flex gap-2">
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>All Systems</option>
                  <option>PRS System</option>
                  <option>FOIS</option>
                  <option>CRIS</option>
                </select>
                <Button variant="outline" size="sm" iconName="Download">
                  Export
                </Button>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="max-h-96 overflow-y-auto">
                {[
                  { time: '2025-01-18 06:20:15', system: 'PRS System', action: 'Data Sync', status: 'Success', message: 'Successfully synced 1,247 passenger records' },
                  { time: '2025-01-18 06:15:32', system: 'FOIS', action: 'Connection Test', status: 'Success', message: 'Connection established successfully' },
                  { time: '2025-01-18 06:10:45', system: 'CRIS', action: 'Data Fetch', status: 'Error', message: 'Timeout while fetching complaint data' },
                  { time: '2025-01-18 06:05:12', system: 'SMS Gateway', action: 'Send Notification', status: 'Success', message: 'SMS sent to passenger +91-9876543210' },
                  { time: '2025-01-18 06:00:28', system: 'Blockchain', action: 'Record Update', status: 'Success', message: 'Complaint #12847 status updated on blockchain' }
                ]?.map((log, index) => (
                  <div key={index} className="p-4 border-b border-gray-200 last:border-b-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-sm font-mono text-gray-600">{log?.time}</span>
                          <span className="text-sm font-medium text-gray-900">{log?.system}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            log?.status === 'Success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {log?.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{log?.action}: {log?.message}</p>
                      </div>
                      <Icon 
                        name={log?.status === 'Success' ? 'CheckCircle' : 'XCircle'} 
                        size={16} 
                        className={log?.status === 'Success' ? 'text-green-500' : 'text-red-500'} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SystemIntegration;
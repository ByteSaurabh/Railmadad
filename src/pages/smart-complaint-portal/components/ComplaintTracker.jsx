import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ComplaintTracker = () => {
  const [trackingId, setTrackingId] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const mockComplaintData = {
    id: 'RMA2024081800123',
    status: 'under_investigation',
    priority: 'medium',
    category: 'cleanliness',
    subject: 'Washroom Cleanliness Issue in Coach S1',
    submittedAt: '2024-08-18T10:30:00Z',
    estimatedResolution: '2024-08-20T18:00:00Z',
    assignedTo: 'Delhi Division - Maintenance Team',
    timeline: [
      {
        id: 1,
        status: 'submitted',
        title: 'Complaint Submitted',
        description: 'Your complaint has been received and blockchain-verified',
        timestamp: '2024-08-18T10:30:00Z',
        completed: true,
        blockchainHash: '0x1a2b3c4d5e6f...',
        icon: 'Send'
      },
      {
        id: 2,
        status: 'acknowledged',
        title: 'Acknowledged by Authority',
        description: 'Delhi Division has acknowledged your complaint',
        timestamp: '2024-08-18T11:15:00Z',
        completed: true,
        blockchainHash: '0x2b3c4d5e6f7a...',
        icon: 'CheckCircle'
      },
      {
        id: 3,
        status: 'assigned',
        title: 'Assigned to Team',
        description: 'Complaint assigned to Maintenance Team for investigation',
        timestamp: '2024-08-18T12:00:00Z',
        completed: true,
        blockchainHash: '0x3c4d5e6f7a8b...',
        icon: 'Users'
      },
      {
        id: 4,
        status: 'under_investigation',
        title: 'Under Investigation',
        description: 'Team is investigating the issue at the reported location',
        timestamp: '2024-08-18T14:30:00Z',
        completed: true,
        blockchainHash: '0x4d5e6f7a8b9c...',
        icon: 'Search',
        current: true
      },
      {
        id: 5,
        status: 'action_taken',
        title: 'Action Taken',
        description: 'Corrective measures implemented',
        timestamp: null,
        completed: false,
        icon: 'Tool'
      },
      {
        id: 6,
        status: 'resolved',
        title: 'Resolved',
        description: 'Issue resolved and verified',
        timestamp: null,
        completed: false,
        icon: 'CheckCircle2'
      }
    ],
    updates: [
      {
        id: 1,
        timestamp: '2024-08-18T14:45:00Z',
        author: 'Maintenance Team',
        message: 'Site inspection completed. Cleaning staff has been notified and immediate cleaning initiated.',
        type: 'progress'
      },
      {
        id: 2,
        timestamp: '2024-08-18T13:20:00Z',
        author: 'System',
        message: 'Similar complaint resolved in Coach S2 yesterday. Expected resolution time: 24-48 hours.',
        type: 'info'
      }
    ]
  };

  const handleTrack = () => {
    if (!trackingId?.trim()) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setTrackingResult(mockComplaintData);
      setIsLoading(false);
    }, 1500);
  };

  const getStatusColor = (status) => {
    const colors = {
      submitted: 'text-blue-600',
      acknowledged: 'text-yellow-600',
      assigned: 'text-purple-600',
      under_investigation: 'text-orange-600',
      action_taken: 'text-indigo-600',
      resolved: 'text-green-600',
      closed: 'text-gray-600'
    };
    return colors?.[status] || 'text-gray-600';
  };

  const getStatusBg = (status) => {
    const colors = {
      submitted: 'bg-blue-100',
      acknowledged: 'bg-yellow-100',
      assigned: 'bg-purple-100',
      under_investigation: 'bg-orange-100',
      action_taken: 'bg-indigo-100',
      resolved: 'bg-green-100',
      closed: 'bg-gray-100'
    };
    return colors?.[status] || 'bg-gray-100';
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'Pending';
    return new Date(timestamp)?.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard?.writeText(text);
  };

  return (
    <div className="space-y-6">
      {/* Tracking Input */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Search" size={20} />
          <span>Track Your Complaint</span>
        </h3>
        
        <div className="flex space-x-3">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Enter complaint ID (e.g., RMA2024081800123)"
              value={trackingId}
              onChange={(e) => setTrackingId(e?.target?.value)}
              onKeyPress={(e) => e?.key === 'Enter' && handleTrack()}
            />
          </div>
          <Button
            variant="default"
            iconName="Search"
            iconPosition="left"
            onClick={handleTrack}
            loading={isLoading}
            disabled={!trackingId?.trim() || isLoading}
          >
            Track
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground mt-2">
          Enter your complaint ID to track real-time status with blockchain verification
        </p>
      </div>
      {/* Tracking Results */}
      {trackingResult && (
        <div className="space-y-6">
          {/* Complaint Overview */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {trackingResult?.subject}
                </h3>
                <p className="text-sm text-muted-foreground">
                  ID: {trackingResult?.id}
                </p>
              </div>
              
              <div className="text-right">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBg(trackingResult?.status)} ${getStatusColor(trackingResult?.status)}`}>
                  {trackingResult?.status?.replace('_', ' ')?.toUpperCase()}
                </span>
                <p className="text-xs text-muted-foreground mt-1">
                  Priority: {trackingResult?.priority?.toUpperCase()}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Submitted:</span>
                <p className="font-medium text-foreground">
                  {formatTimestamp(trackingResult?.submittedAt)}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Assigned to:</span>
                <p className="font-medium text-foreground">
                  {trackingResult?.assignedTo}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Expected Resolution:</span>
                <p className="font-medium text-foreground">
                  {formatTimestamp(trackingResult?.estimatedResolution)}
                </p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h4 className="text-lg font-semibold text-foreground mb-6 flex items-center space-x-2">
              <Icon name="Clock" size={20} />
              <span>Progress Timeline</span>
            </h4>
            
            <div className="space-y-6">
              {trackingResult?.timeline?.map((step, index) => (
                <div key={step?.id} className="flex items-start space-x-4">
                  {/* Timeline Icon */}
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    step?.completed 
                      ? step?.current 
                        ? 'bg-primary text-primary-foreground blockchain-pulse' 
                        : 'bg-success text-success-foreground' :'bg-muted text-muted-foreground'
                  }`}>
                    <Icon name={step?.icon} size={16} />
                  </div>
                  
                  {/* Timeline Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h5 className={`text-sm font-semibold ${
                        step?.completed ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {step?.title}
                      </h5>
                      {step?.timestamp && (
                        <span className="text-xs text-muted-foreground">
                          {formatTimestamp(step?.timestamp)}
                        </span>
                      )}
                    </div>
                    
                    <p className={`text-sm mt-1 ${
                      step?.completed ? 'text-muted-foreground' : 'text-muted-foreground/70'
                    }`}>
                      {step?.description}
                    </p>
                    
                    {/* Blockchain Hash */}
                    {step?.blockchainHash && (
                      <div className="flex items-center space-x-2 mt-2">
                        <Icon name="Shield" size={12} className="text-success" />
                        <span className="text-xs text-success font-mono">
                          Blockchain Verified
                        </span>
                        <button
                          onClick={() => copyToClipboard(step?.blockchainHash)}
                          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {step?.blockchainHash}
                        </button>
                        <Icon name="Copy" size={10} className="text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  
                  {/* Timeline Line */}
                  {index < trackingResult?.timeline?.length - 1 && (
                    <div className="absolute left-9 mt-10 w-0.5 h-6 bg-border"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Recent Updates */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
              <Icon name="MessageCircle" size={20} />
              <span>Recent Updates</span>
            </h4>
            
            <div className="space-y-4">
              {trackingResult?.updates?.map((update) => (
                <div key={update?.id} className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">
                      {update?.author}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatTimestamp(update?.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {update?.message}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div className="text-sm text-muted-foreground">
              <Icon name="Bell" size={16} className="inline mr-1" />
              Get notified about updates via SMS/Email
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                iconPosition="left"
              >
                Download Report
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Share"
                iconPosition="left"
              >
                Share Status
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplaintTracker;
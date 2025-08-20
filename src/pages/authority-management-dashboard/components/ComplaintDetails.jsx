import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ComplaintDetails = ({ complaint, onClose, onStatusUpdate, onAssign }) => {
  const [newStatus, setNewStatus] = useState(complaint?.status || '');
  const [response, setResponse] = useState('');
  const [assignee, setAssignee] = useState('');
  const [activeTab, setActiveTab] = useState('details');

  if (!complaint) return null;

  const statusOptions = [
    'Pending',
    'In Progress', 
    'Under Review',
    'Resolved',
    'Closed',
    'Escalated'
  ];

  const priorityColors = {
    'Critical': 'bg-red-100 text-red-800 border-red-200',
    'High': 'bg-orange-100 text-orange-800 border-orange-200',
    'Medium': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Low': 'bg-green-100 text-green-800 border-green-200'
  };

  const handleStatusUpdate = () => {
    if (newStatus && newStatus !== complaint?.status) {
      onStatusUpdate(complaint?.id, newStatus, response);
      setResponse('');
    }
  };

  const handleAssignment = () => {
    if (assignee) {
      onAssign(complaint?.id, assignee);
      setAssignee('');
    }
  };

  const tabs = [
    { id: 'details', label: 'Details', icon: 'FileText' },
    { id: 'timeline', label: 'Timeline', icon: 'Clock' },
    { id: 'attachments', label: 'Attachments', icon: 'Paperclip' },
    { id: 'ai-insights', label: 'AI Insights', icon: 'Brain' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Complaint #{complaint?.id}
            </h2>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${priorityColors?.[complaint?.priority]}`}>
              {complaint?.priority}
            </span>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            iconName="X"
            onClick={onClose}
          />
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'details' && (
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Complaint Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Title</label>
                      <p className="text-sm text-gray-900 mt-1">{complaint?.title}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Description</label>
                      <p className="text-sm text-gray-900 mt-1">{complaint?.description}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Category</label>
                      <p className="text-sm text-gray-900 mt-1">{complaint?.category}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Location</label>
                      <p className="text-sm text-gray-900 mt-1">{complaint?.location}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Passenger Details</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Name</label>
                      <p className="text-sm text-gray-900 mt-1">{complaint?.passengerName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Contact</label>
                      <p className="text-sm text-gray-900 mt-1">{complaint?.passengerContact}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">PNR Number</label>
                      <p className="text-sm text-gray-900 mt-1">{complaint?.pnrNumber || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Submitted</label>
                      <p className="text-sm text-gray-900 mt-1">
                        {new Date(complaint.submittedAt)?.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Update */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Update Status</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">New Status</label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e?.target?.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {statusOptions?.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Assign To</label>
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        placeholder="Enter staff member name"
                        value={assignee}
                        onChange={(e) => setAssignee(e?.target?.value)}
                      />
                      <Button
                        variant="outline"
                        onClick={handleAssignment}
                        disabled={!assignee}
                      >
                        Assign
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Response Message</label>
                  <textarea
                    value={response}
                    onChange={(e) => setResponse(e?.target?.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your response to the passenger..."
                  />
                </div>
                
                <div className="mt-4 flex gap-3">
                  <Button
                    variant="default"
                    onClick={handleStatusUpdate}
                    disabled={!newStatus || newStatus === complaint?.status}
                  >
                    Update Status
                  </Button>
                  <Button variant="outline">
                    Send SMS Update
                  </Button>
                  <Button variant="outline">
                    Generate Report
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Complaint Timeline</h3>
              <div className="space-y-4">
                {complaint?.timeline?.map((event, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Icon name="Clock" size={16} className="text-blue-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{event?.action}</p>
                      <p className="text-sm text-gray-600">{event?.description}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(event.timestamp)?.toLocaleString()} • {event?.user}
                      </p>
                    </div>
                  </div>
                )) || (
                  <p className="text-gray-600">No timeline events available.</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'attachments' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Attachments</h3>
              {complaint?.attachments?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {complaint?.attachments?.map((attachment, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <Icon name="Paperclip" size={20} className="text-gray-400" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{attachment?.name}</p>
                          <p className="text-xs text-gray-600">{attachment?.size} • {attachment?.type}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No attachments available.</p>
              )}
            </div>
          )}

          {activeTab === 'ai-insights' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">AI Analysis & Recommendations</h3>
              
              {complaint?.aiRecommendation && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Icon name="Brain" size={20} className="text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900 mb-2">Recommended Action</h4>
                      <p className="text-blue-800 mb-3">{complaint?.aiRecommendation}</p>
                      <p className="text-sm text-blue-700">
                        <strong>Suggested Response Time:</strong> {complaint?.suggestedResponseTime}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Sentiment Analysis</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Frustration Level</span>
                      <span className="font-medium text-red-600">High (8.2/10)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: '82%' }}></div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Similar Cases</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Found 12 similar complaints in the last 30 days
                  </p>
                  <Button variant="outline" size="sm">
                    View Similar Cases
                  </Button>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Predicted Outcomes</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-sm text-green-800">Resolution within 24 hours</span>
                    <span className="text-sm font-medium text-green-600">85% probability</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <span className="text-sm text-yellow-800">Requires escalation</span>
                    <span className="text-sm font-medium text-yellow-600">15% probability</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetails;
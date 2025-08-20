import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StaffManagement = ({ staff, onStaffUpdate, onAssignComplaint }) => {
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [filter, setFilter] = useState('all');

  const statusColors = {
    'Available': 'bg-green-100 text-green-800',
    'Busy': 'bg-yellow-100 text-yellow-800',
    'Offline': 'bg-gray-100 text-gray-800',
    'On Leave': 'bg-red-100 text-red-800'
  };

  const roleColors = {
    'Station Master': 'bg-blue-100 text-blue-800',
    'Supervisor': 'bg-purple-100 text-purple-800',
    'Technical Officer': 'bg-orange-100 text-orange-800',
    'Customer Service': 'bg-green-100 text-green-800'
  };

  const filteredStaff = staff?.filter(member => {
    if (filter === 'all') return true;
    return member?.status?.toLowerCase() === filter?.toLowerCase();
  });

  const getWorkloadColor = (workload) => {
    if (workload >= 80) return 'bg-red-500';
    if (workload >= 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Staff Management</h3>
            <p className="text-sm text-gray-600 mt-1">
              {filteredStaff?.length} staff members • {staff?.filter(s => s?.status === 'Available')?.length} available
            </p>
          </div>
          
          <div className="flex gap-3">
            <select
              value={filter}
              onChange={(e) => setFilter(e?.target?.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Staff</option>
              <option value="available">Available</option>
              <option value="busy">Busy</option>
              <option value="offline">Offline</option>
            </select>
            
            <Button variant="outline" iconName="Plus" iconPosition="left">
              Add Staff
            </Button>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredStaff?.map((member) => (
            <div
              key={member?.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedStaff(member)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <Icon name="User" size={20} className="text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{member?.name}</h4>
                    <p className="text-sm text-gray-600">{member?.employeeId}</p>
                  </div>
                </div>
                
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColors?.[member?.status]}`}>
                  {member?.status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Role</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${roleColors?.[member?.role]}`}>
                    {member?.role}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Department</span>
                  <span className="text-gray-900">{member?.department}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Location</span>
                  <span className="text-gray-900">{member?.location}</span>
                </div>
              </div>

              {/* Workload Indicator */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">Current Workload</span>
                  <span className="text-gray-900">{member?.activeComplaints} complaints</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${getWorkloadColor(member?.workloadPercentage)}`}
                    style={{ width: `${member?.workloadPercentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{member?.workloadPercentage}% capacity</p>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-900">{member?.resolutionRate}%</p>
                  <p className="text-xs text-gray-600">Resolution Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-900">{member?.avgResponseTime}h</p>
                  <p className="text-xs text-gray-600">Avg Response</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="MessageSquare"
                  disabled={member?.status !== 'Available'}
                  onClick={(e) => {
                    e?.stopPropagation();
                    onAssignComplaint(member?.id);
                  }}
                >
                  Assign
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Phone"
                  onClick={(e) => {
                    e?.stopPropagation();
                    window.open(`tel:${member?.phone}`);
                  }}
                >
                  Call
                </Button>
              </div>

              {/* Last Activity */}
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Last active: {member?.lastActive}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Staff Performance Summary */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Icon name="Users" size={24} className="text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-blue-900">
                  {staff?.filter(s => s?.status === 'Available')?.length}
                </p>
                <p className="text-sm text-blue-700">Available Staff</p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Icon name="TrendingUp" size={24} className="text-green-600" />
              <div>
                <p className="text-2xl font-bold text-green-900">
                  {Math.round(staff?.reduce((acc, s) => acc + s?.resolutionRate, 0) / staff?.length)}%
                </p>
                <p className="text-sm text-green-700">Avg Resolution Rate</p>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Icon name="Clock" size={24} className="text-orange-600" />
              <div>
                <p className="text-2xl font-bold text-orange-900">
                  {Math.round(staff?.reduce((acc, s) => acc + s?.avgResponseTime, 0) / staff?.length)}h
                </p>
                <p className="text-sm text-orange-700">Avg Response Time</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Staff Detail Modal */}
      {selectedStaff && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Staff Details - {selectedStaff?.name}
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="X"
                  onClick={() => setSelectedStaff(null)}
                />
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Personal Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Employee ID:</span>
                      <span className="text-gray-900">{selectedStaff?.employeeId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phone:</span>
                      <span className="text-gray-900">{selectedStaff?.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="text-gray-900">{selectedStaff?.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shift:</span>
                      <span className="text-gray-900">{selectedStaff?.shift}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Performance Metrics</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Complaints Resolved</span>
                        <span className="text-gray-900">{selectedStaff?.totalResolved}</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Customer Rating</span>
                        <span className="text-gray-900">{selectedStaff?.customerRating}/5</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Experience</span>
                        <span className="text-gray-900">{selectedStaff?.experience} years</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <Button variant="default">
                  Assign Complaint
                </Button>
                <Button variant="outline">
                  View History
                </Button>
                <Button variant="outline">
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffManagement;
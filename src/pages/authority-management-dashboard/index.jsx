import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ComplaintQueue from './components/ComplaintQueue';
import PerformanceMetrics from './components/PerformanceMetrics';
import ComplaintDetails from './components/ComplaintDetails';
import StaffManagement from './components/StaffManagement';
import SystemIntegration from './components/SystemIntegration';

const AuthorityManagementDashboard = () => {
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [activeSection, setActiveSection] = useState('overview');
  const [timeframe, setTimeframe] = useState('7d');
  const [currentUser] = useState({
    name: "Rajesh Kumar",
    role: "Station Master",
    department: "New Delhi Railway Station",
    employeeId: "SM001",
    permissions: ["view_complaints", "assign_staff", "update_status", "generate_reports"]
  });

  // Mock data for complaints
  const [complaints] = useState([
    {
      id: "CMP001",
      title: "Dirty washroom facilities at Platform 3",
      description: "The washroom facilities at Platform 3 are extremely dirty and unhygienic. Water is not available and the cleaning staff seems to be absent. This is causing inconvenience to passengers.",
      category: "Cleanliness",
      priority: "High",
      status: "Pending",
      location: "New Delhi Railway Station - Platform 3",
      passengerName: "Priya Sharma",
      passengerContact: "+91-9876543210",
      pnrNumber: "PNR123456789",
      submittedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      aiRecommendation: "Immediate cleaning required. Assign maintenance staff and ensure water supply restoration within 2 hours.",
      suggestedResponseTime: "2 hours",
      timeline: [
        {
          action: "Complaint Submitted",
          description: "Passenger filed complaint via mobile app",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          user: "System"
        },
        {
          action: "AI Analysis Completed",
          description: "Complaint categorized as High Priority - Cleanliness issue",
          timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
          user: "AI System"
        }
      ],
      attachments: [
        { name: "washroom_photo.jpg", size: "2.3 MB", type: "image/jpeg" },
        { name: "location_video.mp4", size: "15.7 MB", type: "video/mp4" }
      ]
    },
    {
      id: "CMP002",
      title: "Train delay without proper announcement",
      description: "Rajdhani Express (12301) was delayed by 3 hours but no proper announcement was made. Passengers were left confused and frustrated.",
      category: "Information",
      priority: "Critical",
      status: "In Progress",
      location: "New Delhi Railway Station - Platform 1",
      passengerName: "Amit Singh",
      passengerContact: "+91-9123456789",
      pnrNumber: "PNR987654321",
      submittedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      aiRecommendation: "Update announcement system immediately. Send SMS notifications to all affected passengers.",
      suggestedResponseTime: "30 minutes",
      timeline: [
        {
          action: "Complaint Received",
          description: "High priority complaint about train delay communication",
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
          user: "System"
        },
        {
          action: "Assigned to Staff",
          description: "Complaint assigned to Station Announcement Team",
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
          user: "Rajesh Kumar"
        }
      ]
    },
    {
      id: "CMP003",
      title: "Overcharging at food stall",
      description: "Food vendor at Platform 2 is charging higher rates than MRP. When questioned, they refused to provide proper bill.",
      category: "Commercial",
      priority: "Medium",
      status: "Under Review",
      location: "New Delhi Railway Station - Platform 2",
      passengerName: "Sunita Devi",
      passengerContact: "+91-9988776655",
      submittedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      aiRecommendation: "Conduct immediate inspection of food stall. Verify pricing and billing practices.",
      suggestedResponseTime: "4 hours"
    }
  ]);

  // Mock data for performance metrics
  const [performanceMetrics] = useState({
    totalComplaints: 1247,
    complaintsChange: 12,
    resolutionRate: 87,
    resolutionChange: 5,
    avgResponseTime: 4.2,
    responseTimeChange: -8,
    satisfactionScore: 4.3,
    satisfactionChange: 3,
    departmentComparison: [
      { rank: 1, name: "Customer Service", complaints: 234, resolutionRate: 92 },
      { rank: 2, name: "Technical Support", complaints: 189, resolutionRate: 89 },
      { rank: 3, name: "Cleanliness", complaints: 156, resolutionRate: 85 },
      { rank: 4, name: "Security", complaints: 98, resolutionRate: 78 }
    ],
    weeklyTrends: [
      { day: 'Mon', complaints: 45 },
      { day: 'Tue', complaints: 52 },
      { day: 'Wed', complaints: 38 },
      { day: 'Thu', complaints: 61 },
      { day: 'Fri', complaints: 73 },
      { day: 'Sat', complaints: 89 },
      { day: 'Sun', complaints: 67 }
    ]
  });

  // Mock data for staff
  const [staff] = useState([
    {
      id: "STF001",
      name: "Vikram Gupta",
      employeeId: "EMP001",
      role: "Supervisor",
      department: "Cleanliness",
      location: "Platform 1-3",
      status: "Available",
      phone: "+91-9876543210",
      email: "vikram.gupta@railway.gov.in",
      shift: "Morning (6 AM - 2 PM)",
      activeComplaints: 3,
      workloadPercentage: 45,
      resolutionRate: 92,
      avgResponseTime: 2.5,
      totalResolved: 156,
      customerRating: 4.6,
      experience: 8,
      lastActive: "5 minutes ago"
    },
    {
      id: "STF002",
      name: "Meera Patel",
      employeeId: "EMP002",
      role: "Technical Officer",
      department: "Electrical",
      location: "All Platforms",
      status: "Busy",
      phone: "+91-9123456789",
      email: "meera.patel@railway.gov.in",
      shift: "Evening (2 PM - 10 PM)",
      activeComplaints: 7,
      workloadPercentage: 85,
      resolutionRate: 89,
      avgResponseTime: 3.2,
      totalResolved: 203,
      customerRating: 4.4,
      experience: 12,
      lastActive: "2 minutes ago"
    },
    {
      id: "STF003",
      name: "Suresh Yadav",
      employeeId: "EMP003",
      role: "Customer Service",
      department: "Passenger Assistance",
      location: "Main Concourse",
      status: "Available",
      phone: "+91-9988776655",
      email: "suresh.yadav@railway.gov.in",
      shift: "Night (10 PM - 6 AM)",
      activeComplaints: 2,
      workloadPercentage: 30,
      resolutionRate: 94,
      avgResponseTime: 1.8,
      totalResolved: 289,
      customerRating: 4.8,
      experience: 6,
      lastActive: "1 minute ago"
    }
  ]);

  // Mock data for system integrations
  const [integrations] = useState([
    {
      id: "prs",
      name: "PRS (Passenger Reservation System)",
      description: "Core booking and reservation management",
      category: "core",
      status: "Connected",
      enabled: true,
      icon: "Database",
      lastSync: "2 minutes ago",
      recordCount: 125847,
      responseTime: 245
    },
    {
      id: "fois",
      name: "FOIS (Freight Operations Information System)",
      description: "Freight and cargo management system",
      category: "core",
      status: "Connected",
      enabled: true,
      icon: "Truck",
      lastSync: "5 minutes ago",
      recordCount: 45632,
      responseTime: 189
    },
    {
      id: "cris",
      name: "CRIS (Centre for Railway Information Systems)",
      description: "Central railway information hub",
      category: "core",
      status: "Syncing",
      enabled: true,
      icon: "Server",
      lastSync: "Syncing...",
      recordCount: 892341,
      responseTime: 312
    },
    {
      id: "sms",
      name: "SMS Gateway",
      description: "Passenger notification service",
      category: "external",
      status: "Connected",
      enabled: true,
      icon: "MessageSquare",
      lastSync: "1 minute ago",
      recordCount: 15678,
      responseTime: 156
    },
    {
      id: "blockchain",
      name: "Blockchain Verification",
      description: "Complaint transparency and verification",
      category: "external",
      status: "Connected",
      enabled: true,
      icon: "Shield",
      lastSync: "3 minutes ago",
      recordCount: 8934,
      responseTime: 423
    },
    {
      id: "analytics",
      name: "AI Analytics Engine",
      description: "Predictive analytics and insights",
      category: "monitoring",
      status: "Connected",
      enabled: true,
      icon: "Brain",
      lastSync: "30 seconds ago",
      recordCount: 234567,
      responseTime: 98
    }
  ]);

  const handleComplaintSelect = (complaint) => {
    setSelectedComplaint(complaint);
  };

  const handleStatusUpdate = (complaintId, newStatus, response) => {
    console.log(`Updating complaint ${complaintId} to ${newStatus}:`, response);
    // Update complaint status logic here
    setSelectedComplaint(null);
  };

  const handleStaffAssignment = (complaintId, staffId) => {
    console.log(`Assigning complaint ${complaintId} to staff ${staffId}`);
  };

  const handleToggleIntegration = (systemId, enabled) => {
    console.log(`${enabled ? 'Enabling' : 'Disabling'} integration:`, systemId);
  };

  const handleSyncData = (systemId) => {
    console.log(`Syncing data for system:`, systemId);
  };

  const sidebarSections = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'complaints', label: 'Complaint Queue', icon: 'MessageSquare' },
    { id: 'staff', label: 'Staff Management', icon: 'Users' },
    { id: 'performance', label: 'Performance', icon: 'TrendingUp' },
    { id: 'integration', label: 'System Integration', icon: 'Settings' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/ai-dashboard-homepage" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                <Icon name="ArrowLeft" size={20} />
                <span className="text-sm font-medium">Back to Dashboard</span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Authority Management Dashboard</h1>
                <p className="text-sm text-gray-600 mt-1">
                  Welcome back, {currentUser?.name} • {currentUser?.role} • {currentUser?.department}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Live Status */}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-700">System Online</span>
              </div>
              
              {/* Emergency Button */}
              <Button variant="destructive" iconName="AlertTriangle" iconPosition="left">
                Emergency Alert
              </Button>
              
              {/* User Menu */}
              <div className="flex items-center gap-3 px-3 py-2 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} className="text-blue-600" />
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-900">{currentUser?.name}</p>
                  <p className="text-gray-600">{currentUser?.employeeId}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen sticky top-16">
          <nav className="p-4">
            <div className="space-y-2">
              {sidebarSections?.map((section) => (
                <button
                  key={section?.id}
                  onClick={() => setActiveSection(section?.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === section?.id
                      ? 'bg-blue-50 text-blue-700 border border-blue-200' :'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon name={section?.icon} size={18} />
                  {section?.label}
                </button>
              ))}
            </div>
            
            {/* Quick Stats */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Today's Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">New Complaints</span>
                  <span className="font-medium text-gray-900">23</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Resolved</span>
                  <span className="font-medium text-green-600">18</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Pending</span>
                  <span className="font-medium text-orange-600">12</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Staff Active</span>
                  <span className="font-medium text-blue-600">
                    {staff?.filter(s => s?.status === 'Available')?.length}/{staff?.length}
                  </span>
                </div>
              </div>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeSection === 'overview' && (
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2"
                  iconName="Plus"
                  onClick={() => setActiveSection('complaints')}
                >
                  <span className="font-medium">New Complaint</span>
                  <span className="text-xs text-gray-600">File manually</span>
                </Button>
                
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2"
                  iconName="Users"
                  onClick={() => setActiveSection('staff')}
                >
                  <span className="font-medium">Assign Staff</span>
                  <span className="text-xs text-gray-600">Manage assignments</span>
                </Button>
                
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2"
                  iconName="BarChart3"
                  onClick={() => setActiveSection('performance')}
                >
                  <span className="font-medium">View Reports</span>
                  <span className="text-xs text-gray-600">Analytics & insights</span>
                </Button>
                
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2"
                  iconName="Settings"
                  onClick={() => setActiveSection('integration')}
                >
                  <span className="font-medium">System Status</span>
                  <span className="text-xs text-gray-600">Check integrations</span>
                </Button>
              </div>

              {/* Overview Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <PerformanceMetrics 
                  metrics={performanceMetrics}
                  timeframe={timeframe}
                  onTimeframeChange={setTimeframe}
                />
                <ComplaintQueue 
                  complaints={complaints?.slice(0, 3)}
                  onComplaintSelect={handleComplaintSelect}
                  onStatusUpdate={handleStatusUpdate}
                />
              </div>
            </div>
          )}

          {activeSection === 'complaints' && (
            <ComplaintQueue 
              complaints={complaints}
              onComplaintSelect={handleComplaintSelect}
              onStatusUpdate={handleStatusUpdate}
            />
          )}

          {activeSection === 'staff' && (
            <StaffManagement 
              staff={staff}
              onStaffUpdate={(staffId, updates) => console.log('Update staff:', staffId, updates)}
              onAssignComplaint={handleStaffAssignment}
            />
          )}

          {activeSection === 'performance' && (
            <PerformanceMetrics 
              metrics={performanceMetrics}
              timeframe={timeframe}
              onTimeframeChange={setTimeframe}
            />
          )}

          {activeSection === 'integration' && (
            <SystemIntegration 
              integrations={integrations}
              onToggleIntegration={handleToggleIntegration}
              onSyncData={handleSyncData}
            />
          )}
        </main>
      </div>
      {/* Complaint Details Modal */}
      {selectedComplaint && (
        <ComplaintDetails
          complaint={selectedComplaint}
          onClose={() => setSelectedComplaint(null)}
          onStatusUpdate={handleStatusUpdate}
          onAssign={handleStaffAssignment}
        />
      )}
    </div>
  );
};

export default AuthorityManagementDashboard;
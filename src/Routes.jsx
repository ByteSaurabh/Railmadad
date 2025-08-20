import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import LoginModal from "components/ui/LoginModal";
import RegisterPage from "pages/RegisterPage";
import LandingPage from "pages/LandingPage";
import { useAuth } from "utils/auth.jsx";
import AIDashboardHomepage from './pages/ai-dashboard-homepage';
import AuthorityManagementDashboard from './pages/authority-management-dashboard';
import SmartComplaintPortal from './pages/smart-complaint-portal';
import IoTRailwayMonitoringNetwork from './pages/io-t-railway-monitoring-network';
import CommunityForumSupportNetwork from './pages/community-forum-support-network';
import PassengerRightsAdvocacyHub from './pages/passenger-rights-advocacy-hub';
import ProtectedRoute from "components/ProtectedRoute.jsx";

const Routes = () => {
  const { user, loading } = useAuth();
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {loading ? null :
            !user ? (
              <>
                <Route path="/" element={<LandingPage />} />
                {/* LoginModal is triggered from Header or LandingPage, not as a route */}
                <Route path="/register" element={<RegisterPage />} />
                <Route path="*" element={<LandingPage />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Navigate to="/ai-dashboard-homepage" replace />} />
                <Route path="/ai-dashboard-homepage" element={
                  <ProtectedRoute>
                    <AIDashboardHomepage />
                  </ProtectedRoute>
                } />
                <Route path="/authority-management-dashboard" element={
                  <ProtectedRoute>
                    <AuthorityManagementDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/smart-complaint-portal" element={
                  <ProtectedRoute>
                    <SmartComplaintPortal />
                  </ProtectedRoute>
                } />
                <Route path="/io-t-railway-monitoring-network" element={
                  <ProtectedRoute>
                    <IoTRailwayMonitoringNetwork />
                  </ProtectedRoute>
                } />
                <Route path="/community-forum-support-network" element={
                  <ProtectedRoute>
                    <CommunityForumSupportNetwork />
                  </ProtectedRoute>
                } />
                <Route path="/passenger-rights-advocacy-hub" element={
                  <ProtectedRoute>
                    <PassengerRightsAdvocacyHub />
                  </ProtectedRoute>
                } />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="*" element={<NotFound />} />
              </>
            )
          }
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;

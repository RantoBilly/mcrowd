import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';

// Layouts
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import Dashboard from './pages/dashboard/Dashboard';
import StartupDiscovery from './pages/dashboard/StartupDiscovery';
import StartupProfile from './pages/dashboard/StartupProfile';
import Portfolio from './pages/dashboard/Portfolio';
import Leaderboard from './pages/dashboard/Leaderboard';
import Formation from './pages/dashboard/Formation';
import NotFoundPage from './pages/NotFoundPage';

// Protected Route Component
const ProtectedRoute = ({ children, requireAdmin = false }: { children: React.ReactNode, requireAdmin?: boolean }) => {
  const { isAuthenticated, user } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (requireAdmin && user?.role !== 'admin') {
    return <Navigate to="/dashboard\" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  const { user } = useAuthStore();
  
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        
        {/* Protected Dashboard Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="discover" element={<StartupDiscovery />} />
          <Route path="startup/:id" element={<StartupProfile />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="formation" element={<Formation />} />
          <Route 
            path="leaderboard" 
            element={
              <ProtectedRoute requireAdmin={true}>
                <Leaderboard />
              </ProtectedRoute>
            } 
          />
        </Route>
        
        {/* 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
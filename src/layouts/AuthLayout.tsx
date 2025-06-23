import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';
import { BarChart3 } from 'lucide-react';

const AuthLayout = () => {
  const { isAuthenticated } = useAuthStore();
  
  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
          <div className="text-center">
            <div className="flex justify-center">
              {/*<BarChart3 className="h-12 w-12 text-primary-500" />*/}
            </div>
            <h2 className="mt-4 text-3xl font-extrabold text-gray-900">MindCrowd by NextA</h2>
            <p className="mt-2 text-sm text-gray-600">
              The future of startup investment powered by AI and blockchain
            </p>
          </div>
          
          <Outlet />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AuthLayout;
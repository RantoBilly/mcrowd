import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useStartupStore } from '../../store/startupStore';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import StartupCard from '../../components/startup/StartupCard';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Search, Bell, Star, ChevronRight } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuthStore();
  const { startups, featuredStartups, fetchStartups, isLoading } = useStartupStore();
  
  useEffect(() => {
    fetchStartups();
  }, [fetchStartups]);
  
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}</h1>
            <p className="mt-1 text-gray-600">
              {user?.role === 'investor' 
                ? "Here's an overview of your investment portfolio and recommended startups."
                : "Here's an overview of your startup profile and funding progress."}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            {user?.role === 'investor' ? (
              <Link to="/dashboard/discover">
                <Button variant="primary" size="md" icon={<Search size={16} />}>
                  Discover Startups
                </Button>
              </Link>
            ) : (
              <Link to="/dashboard/profile">
                <Button variant="primary" size="md" icon={<Users size={16} />}>
                  Manage Profile
                </Button>
              </Link>
            )}
          </div>
        </div>
      </motion.div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-primary-500" />
                {user?.role === 'investor' ? 'Portfolio Value' : 'Funding Raised'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">
                {user?.tokens?.toLocaleString()} Tokens
              </div>
              <p className="text-sm text-gray-500 mt-1 flex items-center">
                <span className="inline-flex items-center text-success-500 mr-1">
                  <TrendingUp className="w-3 h-3 mr-1" /> +12.5%
                </span> 
                from last week
              </p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Star className="w-5 h-5 mr-2 text-warning-500" />
                {user?.role === 'investor' ? 'Active Investments' : 'Active Investors'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">
                {user?.role === 'investor' ? '4' : '32'}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {user?.role === 'investor' 
                  ? 'Across 3 different sectors' 
                  : 'From 8 different countries'}
              </p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Bell className="w-5 h-5 mr-2 text-accent-500" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">
                3
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {user?.role === 'investor' 
                  ? 'New startup matches available' 
                  : 'Investor inquiries pending'}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      {/* Featured Startups Section */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Featured Startups</h2>
          <Link to="/dashboard/discover" className="text-primary-500 hover:text-primary-600 flex items-center text-sm font-medium">
            View All <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <Card key={index} className="h-96 animate-pulse">
                <CardContent className="p-0 h-full flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredStartups.map((startup, index) => (
              <motion.div
                key={startup.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <StartupCard startup={startup} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
      
      {/* Recent Activity Section */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
        </div>
        
        <Card>
          <CardContent className="p-0">
            <ul className="divide-y divide-gray-200">
              {[
                {
                  title: 'New AI Match',
                  description: 'MediSync matched your investment criteria',
                  time: '2 hours ago',
                  icon: <Star className="w-5 h-5 text-warning-500" />
                },
                {
                  title: 'Token Reward',
                  description: 'You earned 50 tokens for daily login',
                  time: '1 day ago',
                  icon: <TrendingUp className="w-5 h-5 text-success-500" />
                },
                {
                  title: 'Profile View',
                  description: 'An investor viewed your startup profile',
                  time: '2 days ago',
                  icon: <Users className="w-5 h-5 text-accent-500" />
                },
                {
                  title: 'New Feature',
                  description: 'AI chatbot assistant is now available',
                  time: '3 days ago',
                  icon: <Bell className="w-5 h-5 text-primary-500" />
                }
              ].map((activity, index) => (
                <li key={index} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        {activity.icon}
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-500">{activity.description}</p>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
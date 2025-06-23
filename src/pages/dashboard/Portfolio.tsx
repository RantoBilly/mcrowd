import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Avatar from '../../components/ui/Avatar';
import { motion } from 'framer-motion';
import { Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler
} from 'chart.js';
import { Wallet, PieChart, BarChart3, TrendingUp, ArrowUpRight, ArrowDownRight, Zap } from 'lucide-react';

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler
);

const Portfolio = () => {
  // Mock data for portfolio distribution
  const portfolioData = {
    labels: ['Healthcare', 'Fintech', 'CleanTech', 'Education', 'Agriculture'],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          'rgba(139, 92, 246, 0.8)', // Accent
          'rgba(26, 54, 93, 0.8)',   // Primary
          'rgba(16, 185, 129, 0.8)', // Secondary
          'rgba(59, 130, 246, 0.8)', // Blue
          'rgba(245, 158, 11, 0.8)'  // Warning
        ],
        borderColor: [
          'rgba(139, 92, 246, 1)',
          'rgba(26, 54, 93, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(245, 158, 11, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };
  
  // Mock data for portfolio performance
  const performanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Portfolio Value',
        data: [1000, 1200, 1150, 1300, 1450, 1600],
        borderColor: 'rgba(26, 54, 93, 1)',
        backgroundColor: 'rgba(26, 54, 93, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Market Average',
        data: [1000, 1050, 1100, 1150, 1200, 1250],
        borderColor: 'rgba(156, 163, 175, 1)',
        borderDash: [5, 5],
        tension: 0.4,
        fill: false,
      },
    ],
  };
  
  // Chart options
  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          boxWidth: 15,
          padding: 15,
          font: {
            size: 12,
          },
        },
      },
    },
    cutout: '70%',
  };
  
  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        min: 900,
        ticks: {
          callback: function(value: any) {
            return value + ' T';
          },
        },
      },
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false,
    },
  };
  
  // Mock investments data
  const investments = [
    {
      id: '1',
      name: 'MediSync',
      logo: 'https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=150',
      industry: 'Healthcare',
      invested: 500,
      currentValue: 650,
      change: 30,
      date: '3 months ago',
    },
    {
      id: '2',
      name: 'FinWise',
      logo: 'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=150',
      industry: 'Fintech',
      invested: 300,
      currentValue: 270,
      change: -10,
      date: '1 month ago',
    },
    {
      id: '3',
      name: 'EcoTech Solutions',
      logo: 'https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg?auto=compress&cs=tinysrgb&w=150',
      industry: 'CleanTech',
      invested: 400,
      currentValue: 480,
      change: 20,
      date: '2 months ago',
    },
    {
      id: '4',
      name: 'EduVerse',
      logo: 'https://images.pexels.com/photos/5940721/pexels-photo-5940721.jpeg?auto=compress&cs=tinysrgb&w=150',
      industry: 'Education',
      invested: 200,
      currentValue: 230,
      change: 15,
      date: '2 weeks ago',
    },
  ];
  
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Portfolio</h1>
        <p className="text-gray-600">
          Track and manage your startup investments.
        </p>
      </motion.div>
      
      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: "Total Invested",
            value: "1,400",
            change: "+12.5%",
            isPositive: true,
            icon: <Wallet className="w-6 h-6 text-primary-500" />,
            delay: 0.1
          },
          {
            title: "Current Value",
            value: "1,630",
            change: "+16.4%",
            isPositive: true,
            icon: <BarChart3 className="w-6 h-6 text-secondary-500" />,
            delay: 0.2
          },
          {
            title: "Total Return",
            value: "230",
            change: "+16.4%",
            isPositive: true,
            icon: <TrendingUp className="w-6 h-6 text-accent-500" />,
            delay: 0.3
          },
          {
            title: "Active Investments",
            value: "4",
            icon: <PieChart className="w-6 h-6 text-warning-500" />,
            delay: 0.4
          }
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: item.delay }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                    {item.icon}
                  </div>
                  {item.change && (
                    <div className={`flex items-center text-sm ${
                      item.isPositive ? 'text-success-500' : 'text-error-500'
                    }`}>
                      {item.isPositive ? (
                        <ArrowUpRight className="w-4 h-4 mr-1" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 mr-1" />
                      )}
                      {item.change}
                    </div>
                  )}
                </div>
                <div className="text-gray-600 text-sm">{item.title}</div>
                <div className="text-2xl font-bold text-gray-900 mt-1">
                  {item.value} {item.title !== "Active Investments" && "Tokens"}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="w-5 h-5 mr-2 text-primary-500" />
                Portfolio Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <Doughnut data={portfolioData} options={doughnutOptions} />
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-secondary-500" />
                Performance Over Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <Line data={performanceData} options={lineOptions} />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      {/* Investments Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="mb-4 sm:mb-0">Your Investments</CardTitle>
            <Button 
              variant="outline" 
              size="sm" 
              icon={<TrendingUp size={16} />}
            >
              View All Transactions
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Startup</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Industry</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Invested</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Current Value</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Return</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {investments.map((investment, index) => (
                    <tr key={investment.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-lg overflow-hidden bg-white border border-gray-200 flex-shrink-0">
                            <img 
                              src={investment.logo} 
                              alt={investment.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">{investment.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <Badge variant="outline" size="sm">
                          {investment.industry}
                        </Badge>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{investment.invested} Tokens</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{investment.currentValue} Tokens</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className={`flex items-center ${
                          investment.change >= 0 ? 'text-success-500' : 'text-error-500'
                        }`}>
                          {investment.change >= 0 ? (
                            <ArrowUpRight className="w-4 h-4 mr-1" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4 mr-1" />
                          )}
                          <span className="font-medium">{investment.change}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{investment.date}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="ghost" size="sm">
                          Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="w-5 h-5 mr-2 text-warning-500" />
              Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  tip: "Diversify your portfolio",
                  description: "Consider investing in the Agriculture sector to balance your portfolio.",
                  action: "Browse Agriculture startups"
                },
                {
                  tip: "Increase Healthcare allocation",
                  description: "Healthcare startups have shown strong performance in your portfolio.",
                  action: "See top Healthcare startups"
                },
                {
                  tip: "Review underperforming investments",
                  description: "Your Fintech investment is currently underperforming the market.",
                  action: "Review FinWise investment"
                }
              ].map((item, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <h3 className="font-medium text-gray-900 mb-2">{item.tip}</h3>
                  <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                  <Button variant="outline" size="sm" className="w-full">
                    {item.action}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Portfolio;
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Avatar from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';
import { motion } from 'framer-motion';
import { Award, TrendingUp, Users, Zap, Filter, Building2, DollarSign } from 'lucide-react';

// Leaderboard data types
type LeaderboardCategory = 'investors' | 'startups';
type LeaderboardTimeframe = 'weekly' | 'monthly' | 'allTime';

interface LeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  avatar: string;
  score: number;
  change: number;
  badges: string[];
  category: LeaderboardCategory;
}

// Add new interfaces for transaction history
interface Transaction {
  id: string;
  investorName: string;
  startupName: string;
  amount: number;
  date: Date;
  status: 'completed' | 'pending' | 'failed';
}

// Mock leaderboard data
const MOCK_LEADERBOARD_DATA: LeaderboardEntry[] = [
  {
    id: '1',
    rank: 1,
    name: 'Alex Thompson',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    score: 9850,
    change: 12,
    badges: ['Diamond Investor', 'Early Adopter', 'Risk Taker'],
    category: 'investors'
  },
  {
    id: '2',
    rank: 2,
    name: 'Sarah Williams',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    score: 8720,
    change: 5,
    badges: ['Platinum Investor', 'Tech Specialist'],
    category: 'investors'
  },
  {
    id: '3',
    rank: 3,
    name: 'Michael Chen',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    score: 7650,
    change: -2,
    badges: ['Gold Investor', 'Healthcare Expert'],
    category: 'investors'
  },
  {
    id: '4',
    rank: 4,
    name: 'Jessica Patel',
    avatar: 'https://images.pexels.com/photos/3714743/pexels-photo-3714743.jpeg?auto=compress&cs=tinysrgb&w=150',
    score: 6430,
    change: 8,
    badges: ['Silver Investor'],
    category: 'investors'
  },
  {
    id: '5',
    rank: 5,
    name: 'David Johnson',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
    score: 5980,
    change: 0,
    badges: ['Bronze Investor'],
    category: 'investors'
  },
  {
    id: '6',
    rank: 1,
    name: 'MediSync',
    avatar: 'https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=150',
    score: 9200,
    change: 15,
    badges: ['Top Funded', 'Fast Growth', 'Investor Favorite'],
    category: 'startups'
  },
  {
    id: '7',
    rank: 2,
    name: 'EcoTech Solutions',
    avatar: 'https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg?auto=compress&cs=tinysrgb&w=150',
    score: 8500,
    change: 7,
    badges: ['Sustainability Leader', 'High Return'],
    category: 'startups'
  },
  {
    id: '8',
    rank: 3,
    name: 'FinWise',
    avatar: 'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=150',
    score: 7850,
    change: 3,
    badges: ['Most Stable', 'Blockchain Pioneer'],
    category: 'startups'
  },
  {
    id: '9',
    rank: 4,
    name: 'EduVerse',
    avatar: 'https://images.pexels.com/photos/5940721/pexels-photo-5940721.jpeg?auto=compress&cs=tinysrgb&w=150',
    score: 6730,
    change: -1,
    badges: ['Education Innovator'],
    category: 'startups'
  },
  {
    id: '10',
    rank: 5,
    name: 'AgriTech Innovations',
    avatar: 'https://images.pexels.com/photos/442589/pexels-photo-442589.jpeg?auto=compress&cs=tinysrgb&w=150',
    score: 5980,
    change: 2,
    badges: ['Rural Impact'],
    category: 'startups'
  },
];

const Leaderboard = () => {
  const [category, setCategory] = useState<LeaderboardCategory>('investors');
  const [timeframe, setTimeframe] = useState<LeaderboardTimeframe>('weekly');
  
  // Filter data based on category
  const filteredData = MOCK_LEADERBOARD_DATA.filter(entry => entry.category === category);
  
  // Get badge variant based on rank
  const getBadgeVariant = (rank: number) => {
    if (rank === 1) return 'warning';
    if (rank === 2) return 'secondary';
    if (rank === 3) return 'accent';
    return 'outline';
  };

  // Mock data for platform statistics
  const platformStats = {
    totalInvestors: 156,
    totalStartups: 42,
    totalInvestments: 2500000,
    topStartups: [
      {
        name: 'MediSync',
        investors: 45,
        totalInvestment: 750000,
        growth: 28
      },
      {
        name: 'EcoTech Solutions',
        investors: 38,
        totalInvestment: 620000,
        growth: 22
      },
      {
        name: 'FinWise',
        investors: 32,
        totalInvestment: 580000,
        growth: 18
      },
      {
        name: 'EduVerse',
        investors: 28,
        totalInvestment: 450000,
        growth: 15
      }
    ]
  };

  // Mock transaction history
  const transactions: Transaction[] = [
    {
      id: '1',
      investorName: 'John Doe',
      startupName: 'MediSync',
      amount: 50000,
      date: new Date('2024-03-10'),
      status: 'completed'
    },
    {
      id: '2',
      investorName: 'Sarah Smith',
      startupName: 'EcoTech Solutions',
      amount: 75000,
      date: new Date('2024-03-09'),
      status: 'completed'
    },
  ];
  
  return (
    <div className="space-y-8">
      {/* Platform Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary-500" />
              </div>
            </div>
            <div className="text-gray-600 text-sm">Total Investors</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">
              {platformStats.totalInvestors}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-full bg-secondary-100 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-secondary-500" />
              </div>
            </div>
            <div className="text-gray-600 text-sm">Total Startups</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">
              {platformStats.totalStartups}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-full bg-accent-100 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-accent-500" />
              </div>
            </div>
            <div className="text-gray-600 text-sm">Total Investments</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">
              ${platformStats.totalInvestments.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-full bg-success-100 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-success-500" />
              </div>
            </div>
            <div className="text-gray-600 text-sm">Platform Growth</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">
              +24.8%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Startups */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Startups</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {platformStats.topStartups.map((startup, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <h3 className="font-medium text-gray-900 mb-2">{startup.name}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Investors:</span>
                    <span className="font-medium">{startup.investors}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Investment:</span>
                    <span className="font-medium">${startup.totalInvestment.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Growth:</span>
                    <span className="text-success-500">+{startup.growth}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Investor</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Startup</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Amount</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm text-gray-900">
                      {transaction.date.toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">
                      {transaction.investorName}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">
                      {transaction.startupName}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">
                      ${transaction.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <Badge
                        variant={
                          transaction.status === 'completed' ? 'success' :
                          transaction.status === 'pending' ? 'warning' : 'error'
                        }
                      >
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Leaderboard</h1>
        <p className="text-gray-600">
          See who's leading the platform in investments and funding.
        </p>
      </motion.div>
      
      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCategory('investors')}
                  className={`px-4 py-2 text-sm rounded-md transition-colors ${
                    category === 'investors'
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  <Users className="inline-block w-4 h-4 mr-1" />
                  Investors
                </button>
                <button
                  onClick={() => setCategory('startups')}
                  className={`px-4 py-2 text-sm rounded-md transition-colors ${
                    category === 'startups'
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  <TrendingUp className="inline-block w-4 h-4 mr-1" />
                  Startups
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Timeframe</label>
              <div className="flex space-x-2">
                {[
                  { value: 'weekly', label: 'Weekly' },
                  { value: 'monthly', label: 'Monthly' },
                  { value: 'allTime', label: 'All Time' }
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => setTimeframe(item.value as LeaderboardTimeframe)}
                    className={`px-4 py-2 text-sm rounded-md transition-colors ${
                      timeframe === item.value
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Leaderboard Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="w-5 h-5 mr-2 text-warning-500" />
            {category === 'investors' ? 'Top Investors' : 'Top Startups'} - {
              timeframe === 'weekly' ? 'This Week' : 
              timeframe === 'monthly' ? 'This Month' : 'All Time'
            }
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Rank</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">{category === 'investors' ? 'Investor' : 'Startup'}</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Score</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Change</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Achievements</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.map((entry, index) => (
                  <motion.tr
                    key={entry.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-4 py-4 whitespace-nowrap">
                      <Badge 
                        variant={getBadgeVariant(entry.rank)}
                        size="md"
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                      >
                        {entry.rank}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Avatar 
                          src={entry.avatar} 
                          alt={entry.name} 
                          size="md" 
                        />
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{entry.name}</div>
                          <div className="text-xs text-gray-500">
                            {category === 'investors' ? 'Member since 2023' : 'Founded 2022'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">{entry.score.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">
                        {category === 'investors' ? 'Investment points' : 'Popularity score'}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className={`flex items-center ${
                        entry.change > 0 ? 'text-success-500' : 
                        entry.change < 0 ? 'text-error-500' : 'text-gray-500'
                      }`}>
                        {entry.change > 0 ? (
                          <TrendingUp className="w-4 h-4 mr-1" />
                        ) : entry.change < 0 ? (
                          <span className="transform rotate-180 inline-block mr-1">
                            <TrendingUp className="w-4 h-4" />
                          </span>
                        ) : (
                          <span className="w-4 h-4 inline-block mr-1">—</span>
                        )}
                        {Math.abs(entry.change)}%
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-1">
                        {entry.badges.map((badge, i) => (
                          <Badge 
                            key={i} 
                            variant={i === 0 ? 'primary' : i === 1 ? 'secondary' : 'accent'} 
                            size="sm"
                          >
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Your Position (Placeholder) */}
          <div className="mt-6 p-4 border-t border-gray-200">
            <div className="text-sm font-medium text-gray-700 mb-3">Your Position</div>
            <div className="flex items-center justify-between bg-primary-50 p-3 rounded-md">
              <div className="flex items-center">
                <Badge 
                  variant="outline"
                  size="md"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                >
                  42
                </Badge>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900">Your Profile</div>
                  <div className="text-xs text-gray-500">Keep investing to rise in the ranks!</div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="text-sm font-semibold text-gray-900 mr-4">1,250 pts</div>
                <div className="text-success-500 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span className="text-sm">+8%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Achievements Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="w-5 h-5 mr-2 text-accent-500" />
            How to Climb the Ranks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Invest Regularly",
                description: "Make consistent investments to earn activity points",
                icon: <TrendingUp className="w-6 h-6 text-primary-500" />
              },
              {
                title: "Diversify Portfolio",
                description: "Invest in startups across different sectors",
                icon: <Filter className="w-6 h-6 text-secondary-500" />
              },
              {
                title: "Engage with Community",
                description: "Participate in discussions and share insights",
                icon: <Users className="w-6 h-6 text-accent-500" />
              }
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm mr-3">
                    {item.icon}
                  </div>
                  <h3 className="font-medium text-gray-900">{item.title}</h3>
                </div>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Leaderboard;
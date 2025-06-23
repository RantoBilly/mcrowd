import React, { useEffect, useState } from 'react';
import { useStartupStore, Startup } from '../../store/startupStore';
import { Card, CardContent } from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import StartupCard from '../../components/startup/StartupCard';
import { motion } from 'framer-motion';
import { Search, Filter, RefreshCw } from 'lucide-react';

const StartupDiscovery = () => {
  const { startups, fetchStartups, isLoading } = useStartupStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStartups, setFilteredStartups] = useState<Startup[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedRisk, setSelectedRisk] = useState<string[]>([]);
  
  // Get unique industries from startups
  const industries = Array.from(new Set(startups.map(startup => startup.industry)));
  
  useEffect(() => {
    fetchStartups();
  }, [fetchStartups]);
  
  useEffect(() => {
    let results = [...startups];
    
    // Filter by search term
    if (searchTerm) {
      results = results.filter(
        startup => 
          startup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          startup.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          startup.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
          startup.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Filter by selected industries
    if (selectedIndustries.length > 0) {
      results = results.filter(startup => 
        selectedIndustries.includes(startup.industry)
      );
    }
    
    // Filter by risk level
    if (selectedRisk.length > 0) {
      results = results.filter(startup => 
        selectedRisk.includes(startup.riskLevel)
      );
    }
    
    setFilteredStartups(results);
  }, [startups, searchTerm, selectedIndustries, selectedRisk]);
  
  const handleIndustryToggle = (industry: string) => {
    setSelectedIndustries(prev => 
      prev.includes(industry)
        ? prev.filter(i => i !== industry)
        : [...prev, industry]
    );
  };
  
  const handleRiskToggle = (risk: string) => {
    setSelectedRisk(prev => 
      prev.includes(risk)
        ? prev.filter(r => r !== risk)
        : [...prev, risk]
    );
  };
  
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedIndustries([]);
    setSelectedRisk([]);
  };
  
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Discover Startups</h1>
        <p className="text-gray-600">
          Explore promising startups and find your next investment opportunity.
        </p>
      </motion.div>
      
      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <Input
                placeholder="Search startups, industries, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon={<Search size={16} />}
                fullWidth
              />
            </div>
            <Button 
              variant="outline" 
              size="md" 
              icon={<Filter size={16} />}
              onClick={resetFilters}
            >
              Reset Filters
            </Button>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            <div className="mr-2 text-sm font-medium text-gray-700">Sectors:</div>
            {industries.map(industry => (
              <button
                key={industry}
                onClick={() => handleIndustryToggle(industry)}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  selectedIndustries.includes(industry)
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {industry}
              </button>
            ))}
          </div>
          
          {/*
          <div className="mt-3 flex flex-wrap gap-2">
            <div className="mr-2 text-sm font-medium text-gray-700">Risk Level:</div>
            {['low', 'medium', 'high'].map(risk => (
              <button
                key={risk}
                onClick={() => handleRiskToggle(risk)}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  selectedRisk.includes(risk)
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {risk.charAt(0).toUpperCase() + risk.slice(1)}
              </button>
            ))}
          </div>
          */}
        </CardContent>
      </Card>
      
      {/* Results */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <Card key={index} className="h-96 animate-pulse">
              <CardContent className="p-0 h-full flex items-center justify-center">
                <RefreshCw className="w-8 h-8 text-gray-300 animate-spin" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredStartups.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStartups.map((startup, index) => (
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
      ) : (
        <div className="text-center py-12">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No startups found</h3>
          <p className="text-gray-600">
            Try adjusting your search or filters to find more results.
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-4"
            onClick={resetFilters}
            icon={<RefreshCw size={16} />}
          >
            Reset All Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default StartupDiscovery;
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStartupStore } from '../../store/startupStore';
import { useAuthStore } from '../../store/authStore';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import ProgressBar from '../../components/ui/ProgressBar';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/ui/Avatar';
import Input from '../../components/ui/Input';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Calendar, MapPin, Building2, TrendingUp, Shield, Link as LinkIcon, DollarSign, CheckCircle } from 'lucide-react';

const StartupProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getStartupById, investInStartup, isLoading } = useStartupStore();
  const { user } = useAuthStore();
  const [investmentAmount, setInvestmentAmount] = useState(5);
  const [isInvesting, setIsInvesting] = useState(false);
  const [investmentSuccess, setInvestmentSuccess] = useState(false);
  
  const startup = id ? getStartupById(id) : undefined;

  // Helper component for milestone display
const MilestonePanel = ({ milestones }: { milestones: Startup["milestones"] }) => {
  if (!milestones) return null;
  return (
    <div className="w-full my-6 px-6 py-4 bg-gray-50 border border-gray-200 rounded-lg">
      <div className="flex items-center mb-3">
        <CheckCircle className="text-green-500 mr-2" size={18} />
        <span className="font-semibold text-gray-800 text-lg">Milestones Achieved</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(milestones).map(([category, stages]) => {
          // Get stages with at least one checked milestone
          const stagesWithTrue = Object.entries(stages || {}).map(([stage, checklist]) => {
            const trueMilestones = Object.entries(checklist || {}).filter(([_, checked]) => checked);
            if (trueMilestones.length === 0) return null;
            return (
              <div key={stage} className="mb-2">
                <div className="font-medium text-primary-700 text-xs uppercase tracking-wide mb-1">{stage}</div>
                <div className="flex flex-wrap gap-2">
                  {trueMilestones.map(([milestone]) => (
                    <span
                      key={milestone}
                      className="inline-flex items-center px-2 py-1 rounded bg-green-100 text-green-800 text-xs font-semibold border border-green-200"
                    >
                      <CheckCircle size={14} className="mr-1 text-green-500" />
                      {milestone}
                    </span>
                  ))}
                </div>
              </div>
            );
          }).filter(Boolean);

          if (stagesWithTrue.length === 0) return null;

          return (
            <div key={category}>
              <div className="text-sm font-bold text-gray-700 mb-2">{category.toUpperCase()}</div>
              {stagesWithTrue}
            </div>
          );
        })}
      </div>
    </div>
  );
};
  
  useEffect(() => {
    if (!startup) {
      // If startup not found, redirect to discovery page
      navigate('/dashboard/discover');
    }
  }, [startup, navigate]);
  
  if (!startup) {
    return null; // Will redirect due to the useEffect
  }
  
  const handleInvestmentSubmit = async () => {
    if (!id) return;
    
    setIsInvesting(true);
    const success = await investInStartup(id, investmentAmount);
    setIsInvesting(false);
    
    if (success) {
      setInvestmentSuccess(true);
      setTimeout(() => setInvestmentSuccess(false), 3000);
    }
  };
  
  const fundingPercentage = (startup.currentFunding / startup.fundingGoal) * 100;
  const capitalPercentage = (startup.fundingGoal / startup.businessCapital) * 100; // Pourcentage du capital
  
  return (
    <div className="space-y-8">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          variant="ghost"
          size="sm"
          icon={<ArrowLeft size={16} />}
          onClick={() => navigate(-1)}
        >
          Back to Discovery
        </Button>
      </motion.div>
      
      {/* Startup Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
      >
        <div className="flex flex-col md:flex-row">
          <div className="flex-shrink-0 flex justify-center md:justify-start mb-4 md:mb-0">
            <div className="w-24 h-24 rounded-lg overflow-hidden bg-white border border-gray-200">
              <img 
                src={startup.logo} 
                alt={`${startup.name} logo`} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="md:ml-6 flex-grow">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{startup.name}</h1>
                <p className="text-lg text-primary-600 font-medium">{startup.industry}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {startup.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" size="sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="mt-4 md:mt-0 flex items-center">
                {/*
                <div className="flex flex-col items-center mr-6">
                  <div className="text-sm text-gray-500">AI Score</div>
                  <div className="text-2xl font-bold text-primary-600">{startup.aiScore}/100</div>
                </div>
                */}
                
                {user?.role === 'investor' && (
                  <Button 
                    variant="primary" 
                    size="md"
                    onClick={() => window.scrollTo({ top: (document.body.scrollHeight - window.innerHeight) / 2, behavior: 'smooth' })}
                  >
                    Invest Now
                  </Button>
                )}
              </div>
            </div>
            
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center text-sm text-gray-600 gap-y-2 sm:gap-x-4">
              <div className="flex items-center">
                <MapPin size={16} className="mr-1 text-gray-400" />
                {startup.location}
              </div>
              <div className="flex items-center">
                <Calendar size={16} className="mr-1 text-gray-400" />
                Founded {startup.foundedYear}
              </div>
              <div className="flex items-center">
                <Users size={16} className="mr-1 text-gray-400" />
                {startup.teamSize} Team Members
              </div>
              <div className="flex items-center">
                <Building2 size={16} className="mr-1 text-gray-400" />
                Milestone: {startup.stage.charAt(0).toUpperCase() + startup.stage.slice(1)}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/** Milestone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <MilestonePanel milestones={startup.milestones} />
      </motion.div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Startup Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-2 space-y-8"
        >
          {/* About Section */}
          <Card>
            <CardHeader>
              <CardTitle>About {startup.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 whitespace-pre-line">
                {startup.description}
              </p>
              
              {/* Pitch Video Placeholder */}
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-3">Founder's Pitch</h3>
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Play className="w-12 h-12 text-primary-500 mx-auto" />
                    <p className="mt-2 text-gray-600">Watch pitch video</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Team Section */}
          <Card>
            <CardHeader>
              <CardTitle>Team</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Avatar
                  src={startup.founderAvatar}
                  alt={startup.founderName}
                  size="lg"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-medium">{startup.founderName}</h3>
                  <p className="text-gray-600">Founder & CEO</p>
                  <p className="mt-2 text-sm text-gray-700">
                    Passionate entrepreneur with 7+ years of experience in {startup.industry.toLowerCase()}.
                    Previously founded two successful startups in related fields.
                  </p>
                </div>
              </div>
              
              <div className="mt-6 border-t border-gray-100 pt-6">
                <p className="text-gray-700">
                  Our team consists of {startup.teamSize} experienced professionals with backgrounds in 
                  technology, {startup.industry.toLowerCase()}, and business development.
                </p>
              </div>
            </CardContent>
          </Card>
          
          {/* Q&A Section */}
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    question: "What is your business model?",
                    answer: `We generate revenue through a combination of subscription fees and transaction-based pricing. Our target market includes both individual consumers and enterprise clients in the ${startup.industry.toLowerCase()} sector.`
                  },
                  {
                    question: "How will you use the investment?",
                    answer: "The funds will be primarily used for product development (40%), marketing and user acquisition (30%), team expansion (20%), and operational costs (10%)."
                  },
                  {
                    question: "What is your competitive advantage?",
                    answer: `Our proprietary technology offers 2-3x better performance than competitors, and we've secured two patents for our core innovations. We also have strategic partnerships with key industry players.`
                  }
                ].map((item, index) => (
                  <div key={index}>
                    <h4 className="text-md font-medium text-gray-900">{item.question}</h4>
                    <p className="mt-1 text-gray-700">{item.answer}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Right Column - Investment Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Funding Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Funding Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {startup.currentFunding.toLocaleString()} / {startup.fundingGoal.toLocaleString()} Tokens
              </div>
              
              <ProgressBar
                value={startup.currentFunding}
                max={startup.fundingGoal}
                variant="primary"
                size="lg"
                className="mt-4"
              />
              
              <div className="mt-4 pt-4 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>{Math.round(fundingPercentage)}% Complete</span>
                </div>
                <div className="flex justify-between">
                  <span>Goal: {startup.fundingGoal.toLocaleString()} ({Math.round(capitalPercentage)}% of business capital)</span>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Investors</span>
                  <span className="text-sm text-gray-900">32</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Min. Investment</span>
                  <span className="text-sm text-gray-900">5 Tokens</span>
                </div>
                {/*
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Funding Deadline</span>
                  <span className="text-sm text-gray-900">30 Days Left</span>
                </div>
                */}
              </div>
            </CardContent>
          </Card>
          
          {/* Risk and Return */}
          {/*
          <Card>
            <CardHeader>
              <CardTitle>Risk & Return Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Risk Level</span>
                    <span className="text-sm font-medium text-gray-900">
                      {startup.riskLevel.charAt(0).toUpperCase() + startup.riskLevel.slice(1)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        startup.riskLevel === 'low' ? 'bg-success-500 w-1/3' :
                        startup.riskLevel === 'medium' ? 'bg-warning-500 w-2/3' :
                        'bg-error-500 w-full'
                      }`}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Return Potential</span>
                    <span className="text-sm font-medium text-gray-900">
                      {startup.returnPotential.charAt(0).toUpperCase() + startup.returnPotential.slice(1)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        startup.returnPotential === 'low' ? 'bg-primary-300 w-1/3' :
                        startup.returnPotential === 'medium' ? 'bg-primary-500 w-2/3' :
                        'bg-primary-700 w-full'
                      }`}
                    />
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-start mb-3">
                    <Shield className="w-5 h-5 text-success-500 mt-0.5 mr-2" />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Blockchain Security</h4>
                      <p className="text-xs text-gray-600">All investments are secured using smart contracts on our blockchain.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start mb-3">
                    <TrendingUp className="w-5 h-5 text-primary-500 mt-0.5 mr-2" />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Market Validation</h4>
                      <p className="text-xs text-gray-600">This startup has achieved product-market fit with early customers.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <LinkIcon className="w-5 h-5 text-accent-500 mt-0.5 mr-2" />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Strong Partnerships</h4>
                      <p className="text-xs text-gray-600">Strategic partnerships with established companies in the industry.</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          */}
          
          {/* Investment Form (Only for investors) */}
          {user?.role === 'investor' && (
            <Card id="invest-section">
              <CardHeader>
                <CardTitle>Invest Now</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input
                    type="number"
                    label="Investment Amount (Tokens)"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(Math.max(5, parseInt(e.target.value) || 0))}
                    min={5}
                    leftIcon={<DollarSign size={16} />}
                    helperText="Minimum investment: 5 Tokens"
                  />
                  
                  <div className="pt-2">
                    {investmentSuccess ? (
                      <div className="bg-success-100 text-success-800 p-3 rounded-md text-sm flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Investment successful! Thank you for supporting {startup.name}.
                      </div>
                    ) : (
                      <Button
                        variant="primary"
                        fullWidth
                        isLoading={isInvesting}
                        onClick={handleInvestmentSubmit}
                      >
                        Confirm Investment
                      </Button>
                    )}
                  </div>
                  
                  <p className="text-xs text-gray-500 mt-2">
                    By investing, you agree to our terms and conditions. All investments are secured
                    using blockchain technology and smart contracts.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
      <Button 
        variant="primary" 
        size="md"
        onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
      >
        Need more informations
      </Button>
    </div>
  );
};

// Play icon component
const Play = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <polygon points="10 8 16 12 10 16 10 8" />
  </svg>
);

export default StartupProfile;
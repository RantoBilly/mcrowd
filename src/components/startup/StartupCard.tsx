import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { Card, CardContent, CardFooter } from '../ui/Card';
import Badge from '../ui/Badge';
import ProgressBar from '../ui/ProgressBar';
import Avatar from '../ui/Avatar';
import { Startup } from '../../store/startupStore';
import { ExternalLink, Users, Calendar, TrendingUp, Shield } from 'lucide-react';

interface StartupCardProps {
  startup: Startup;
  className?: string;
}

const StartupCard = ({ startup, className }: StartupCardProps) => {
  const getIndustryColor = (industry: string): string => {
    const industries: Record<string, string> = {
      'Healthcare': 'text-success-500',
      'Fintech': 'text-accent-500',
      'Clean Energy': 'text-secondary-500',
      'Education': 'text-primary-500',
      'Agriculture': 'text-warning-500'
    };
    
    return industries[industry] || 'text-gray-500';
  };
  
  const getRiskBadge = (risk: 'low' | 'medium' | 'high') => {
    const variants: Record<typeof risk, any> = {
      low: { variant: 'success', text: 'Low Risk' },
      medium: { variant: 'warning', text: 'Medium Risk' },
      high: { variant: 'error', text: 'High Risk' }
    };
    
    return variants[risk];
  };
  
  const getReturnBadge = (potential: 'low' | 'medium' | 'high') => {
    const variants: Record<typeof potential, any> = {
      low: { variant: 'outline', text: 'Low Return' },
      medium: { variant: 'secondary', text: 'Medium Return' },
      high: { variant: 'accent', text: 'High Return' }
    };
    
    return variants[potential];
  };
  
  const fundingPercentage = (startup.currentFunding / startup.fundingGoal) * 100;
  const riskBadge = getRiskBadge(startup.riskLevel);
  const returnBadge = getReturnBadge(startup.returnPotential);

  return (
    <Card 
      className={cn('hover:shadow-lg transition-shadow duration-300', className)}
      hoverEffect
    >
      <div className="relative pt-4 px-4 flex justify-center">
        <div className="absolute top-4 right-4 flex items-center">
          {/*<div 
            className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100"
            title="AI Match Score"
          >
            <span className="text-sm font-semibold text-gray-800">{startup.aiScore}</span>
          </div>*/}
        </div>
        <div className="w-16 h-16 rounded-lg overflow-hidden bg-white border border-gray-200">
          <img 
            src={startup.logo} 
            alt={`${startup.name} logo`} 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      <CardContent className="pt-4">
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{startup.name}</h3>
          <p className={cn('text-sm font-medium', getIndustryColor(startup.industry))}>
            {startup.industry}
          </p>
        </div>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {startup.shortPitch}
        </p>
        
        <div className="space-y-4">
          <ProgressBar 
            value={startup.currentFunding} 
            max={startup.fundingGoal} 
            label="Funding Progress :" 
            variant="primary"
            showValue
          />
          
          <div className="flex flex-wrap gap-2">
            {/*<Badge variant={riskBadge.variant} size="sm" className="flex items-center">
              <Shield className="w-3 h-3 mr-1" />
              {riskBadge.text}
            </Badge>
            <Badge variant={returnBadge.variant} size="sm" className="flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              {returnBadge.text}
            </Badge>*/}
            <Badge variant="outline" size="sm" className="flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              Est. {startup.foundedYear}
            </Badge>
            <Badge variant="outline" size="sm" className="flex items-center">
              <Users className="w-3 h-3 mr-1" />
              {startup.teamSize} Team
            </Badge>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="border-t border-gray-100 pt-4 flex justify-between items-center">
        <div className="flex items-center">
          <Avatar 
            src={startup.founderAvatar} 
            alt={startup.founderName} 
            size="sm" 
          />
          <span className="ml-2 text-xs text-gray-600">
            {startup.founderName} - Founder
          </span>
        </div>
        <Link 
          to={`/dashboard/startup/${startup.id}`}
          className="text-primary-500 hover:text-primary-600 text-sm font-medium flex items-center"
        >
          Details
          <ExternalLink className="ml-1 w-3 h-3" />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default StartupCard;
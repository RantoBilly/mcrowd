import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Clock, 
  CheckCircle, 
  Users, 
  TrendingUp, 
  Shield, 
  Target, 
  Award,
  PlayCircle,
  FileText,
  Lightbulb,
  BarChart3
} from 'lucide-react';

const Formation = () => {
  const modules = [
    {
      id: 1,
      title: "Introduction to Venture Capital",
      duration: "45 min",
      difficulty: "Beginner",
      description: "Understand the basics of innovation financing and the startup ecosystem",
      topics: [
        "What is venture capital?",
        "Types of funding (seed, series A, B, C)",
        "Ecosystem players",
        "Startup life cycle"
      ],
      completed: true
    },
    {
      id: 2,
      title: "Startup Valuation",
      duration: "60 min",
      difficulty: "Intermediate",
      description: "Learn to analyze and evaluate a startup's potential",
      topics: [
        "Valuation methods",
        "Business model analysis",
        "Evaluation of the founding team",
        "Market and competition analysis"
      ],
      completed: true
    },
    {
      id: 3,
      title: "Risk Management",
      duration: "50 min",
      difficulty: "Intermediate",
      description: "Identify, assess, and mitigate investment risks",
      topics: [
        "Types of investment risks",
        "Diversification strategies",
        "In-depth due diligence",
        "Key performance indicators"
      ],
      completed: false
    },
    {
      id: 4,
      title: "Portfolio Management",
      duration: "55 min",
      difficulty: "Advanced",
      description: "Optimize and efficiently manage your investment portfolio",
      topics: [
        "Portfolio construction",
        "Rebalancing and optimization",
        "Performance tracking",
        "Exit strategies"
      ],
      completed: false
    },
    {
      id: 5,
      title: "Legal and Regulatory Aspects",
      duration: "40 min",
      difficulty: "Advanced",
      description: "Understand the legal and regulatory framework of investments",
      topics: [
        "Legal structures",
        "Financial regulation",
        "Investor rights",
        "Investment taxation"
      ],
      completed: false
    },
    {
      id: 6,
      title: "Blockchain and AI Technologies",
      duration: "65 min",
      difficulty: "Advanced",
      description: "Impact of new technologies on investment",
      topics: [
        "Blockchain in finance",
        "AI for investment analysis",
        "Smart contracts",
        "Asset tokenization"
      ],
      completed: false
    }
  ];
  

  const learningObjectives = [
    "Master the fundamentals of venture capital",
    "Develop analysis and evaluation skills",
    "Understand risk management",
    "Optimize portfolio construction",
    "Navigate the regulatory environment",
    "Leverage emerging technologies"
  ];
  

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Débutant': return 'success';
      case 'Intermédiaire': return 'warning';
      case 'Avancé': return 'error';
      default: return 'outline';
    }
  };

  const completedModules = modules.filter(m => m.completed).length;
  const progressPercentage = (completedModules / modules.length) * 100;

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gradient-to-r from-primary-500 to-primary-700 text-white rounded-lg p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Investment Training</h1>
              <p className="text-primary-100 text-lg">
              Develop your skills in venture capital and startup investment
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">{completedModules}/{modules.length}</div>
              <div className="text-primary-100">Completed modules</div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Overall progress</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-primary-600 rounded-full h-3">
              <div 
                className="bg-white rounded-full h-3 transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Learning Objectives */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="w-5 h-5 mr-2 text-primary-500" />
              Learning Objectives
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {learningObjectives.map((objective, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{objective}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: "Total Duration",
            value: "5h 15min",
            icon: <Clock className="w-6 h-6 text-primary-500" />,
            delay: 0.2
          },
          {
            title: "Modules",
            value: "6",
            icon: <BookOpen className="w-6 h-6 text-secondary-500" />,
            delay: 0.3
          },
          {
            title: "Certificate",
            value: "Included",
            icon: <Award className="w-6 h-6 text-accent-500" />,
            delay: 0.4
          },
          {
            title: "Level",
            value: "All levels",
            icon: <BarChart3 className="w-6 h-6 text-warning-500" />,
            delay: 0.5
          }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: stat.delay }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-gray-600 text-sm">{stat.title}</div>
                <div className="text-2xl font-bold text-gray-900 mt-1">
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Course Modules */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-primary-500" />
              Training Content
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {modules.map((module, index) => (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`border rounded-lg p-6 ${
                    module.completed ? 'bg-success-50 border-success-200' : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                          module.completed ? 'bg-success-500' : 'bg-gray-300'
                        }`}>
                          {module.completed ? (
                            <CheckCircle className="w-5 h-5 text-white" />
                          ) : (
                            <span className="text-white font-semibold">{module.id}</span>
                          )}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{module.title}</h3>
                          <div className="flex items-center gap-3 mt-1">
                            <Badge variant={getDifficultyColor(module.difficulty)} size="sm">
                              {module.difficulty}
                            </Badge>
                            <span className="text-sm text-gray-500 flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {module.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{module.description}</p>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium text-gray-900">Covered Topics :</h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {module.topics.map((topic, topicIndex) => (
                            <li key={topicIndex} className="flex items-start text-sm text-gray-600">
                              <Lightbulb className="w-4 h-4 mr-2 mt-0.5 text-accent-500 flex-shrink-0" />
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="ml-6">
                      {module.completed ? (
                        <Button variant="outline" size="sm" icon={<FileText size={16} />}>
                          Review
                        </Button>
                      ) : (
                        <Button variant="primary" size="sm" icon={<PlayCircle size={16} />}>
                          Start course
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Additional Resources */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="w-5 h-5 mr-2 text-secondary-500" />
              Resources Provided
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Practical Guide",
                  description: "Complete investor manual with templates and checklists",
                  icon: <FileText className="w-8 h-8 text-primary-500" />
                },
                {
                  title: "Analysis Tools",
                  description: "Valuation calculators and Excel financial models",
                  icon: <BarChart3 className="w-8 h-8 text-secondary-500" />
                },
                {
                  title: "Legal Resources",
                  description: "Contract templates and legal documentation",
                  icon: <Shield className="w-8 h-8 text-accent-500" />
                }
                
              ].map((resource, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm mr-4">
                      {resource.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900">{resource.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
                  <Button variant="outline" size="sm" fullWidth>
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Modalités d'Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-warning-500" />
              Delivery Methods
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Training Format</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-success-500 mr-3 mt-0.5" />
                    <span className="text-gray-700">Interactive online modules</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-success-500 mr-3 mt-0.5" />
                    <span className="text-gray-700">Practical case studies</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-success-500 mr-3 mt-0.5" />
                    <span className="text-gray-700">Assessment quizzes</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-success-500 mr-3 mt-0.5" />
                    <span className="text-gray-700">Live Q&A sessions</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <TrendingUp className="w-5 h-5 text-accent-500 mr-3 mt-0.5" />
                    <span className="text-gray-700">Personalized mentoring</span>
                  </li>
                  <li className="flex items-start">
                    <Users className="w-5 h-5 text-accent-500 mr-3 mt-0.5" />
                    <span className="text-gray-700">Investor community</span>
                  </li>
                  <li className="flex items-start">
                    <Award className="w-5 h-5 text-accent-500 mr-3 mt-0.5" />
                    <span className="text-gray-700">Final certification</span>
                  </li>
                  <li className="flex items-start">
                    <Shield className="w-5 h-5 text-accent-500 mr-3 mt-0.5" />
                    <span className="text-gray-700">24/7 technical support</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-primary-50 rounded-lg border border-primary-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-primary-900 mb-2">Ready to start your training?</h3>
                  <p className="text-primary-700">
                  Develop your investor skills and maximize your opportunities
                  </p>
                </div>
                <Button variant="primary" size="lg" icon={<PlayCircle size={20} />}>
                start the training
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Formation;
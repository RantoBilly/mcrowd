import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';
import Button from '../components/ui/Button';
import { motion } from 'framer-motion';
import { CheckCircle, TrendingUp, Shield, Zap, Users, Database, Award, Brain, User } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  Welcome to MindCrowd by NextA
                </h1>
                <p className="mt-6 text-lg text-primary-100 max-w-lg">
                  Join our revolutionary platform connecting investors with promising startups. 
                  Powered by AI and secured by blockchain technology.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Link to="/register">
                    <Button variant="secondary" size="lg">
                      Get Started
                    </Button>
                  </Link>
                  <Link to="/dashboard/discover">
                    <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/10">
                      Explore Startups
                    </Button>
                  </Link>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="hidden md:block"
              >
                <img 
                  src="https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Blockchain Investment Platform" 
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900">Powered by Innovation</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Our platform combines cutting-edge technology with financial expertise
                to create a new paradigm in startup investment.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-gray-50 p-8 rounded-lg border border-gray-100"
              >
                <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-6">
                  <Brain className="w-6 h-6 text-accent-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">AI-Powered Matching</h3>
                <p className="text-gray-600">
                  Our advanced algorithms analyze your preferences and investment history to recommend startups that perfectly match your criteria.
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gray-50 p-8 rounded-lg border border-gray-100"
              >
                <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mb-6">
                  <Database className="w-6 h-6 text-secondary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Blockchain Security</h3>
                <p className="text-gray-600">
                  All transactions and investments are secured with blockchain technology, ensuring transparency, immutability, and trust.
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-gray-50 p-8 rounded-lg border border-gray-100"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                  <Users className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Community Ecosystem</h3>
                <p className="text-gray-600">
                  Connect with fellow investors, exchange insights, and engage with startup founders in our vibrant community.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Our streamlined process makes startup investment accessible to everyone
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: '01',
                  title: 'Create Your Account',
                  description: 'Sign up as an investor or startup and complete your profile.',
                  icon: <User className="w-6 h-6 text-primary-500" />,
                  delay: 0
                },
                {
                  step: '02',
                  title: 'Discover Opportunities',
                  description: 'Browse AI-matched startup recommendations tailored to your interests.',
                  icon: <TrendingUp className="w-6 h-6 text-primary-500" />,
                  delay: 0.2
                },
                {
                  step: '03',
                  title: 'Secure Investment',
                  description: 'Invest with our blockchain-powered token system for maximum security.',
                  icon: <Shield className="w-6 h-6 text-primary-500" />,
                  delay: 0.4
                },
                {
                  step: '04',
                  title: 'Track & Grow',
                  description: 'Monitor your portfolio performance and earn rewards for activity.',
                  icon: <Zap className="w-6 h-6 text-primary-500" />,
                  delay: 0.6
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: item.delay }}
                  className="relative"
                >
                  <div className="bg-white p-8 rounded-lg border border-gray-200 h-full">
                    <div className="absolute -top-4 left-8 bg-primary-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                      {item.step}
                    </div>
                    <div className="mt-6 mb-4">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900">What Our Users Say</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Join thousands of satisfied investors and startups on our platform
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: "The AI matching feature saved me countless hours of research. I found the perfect startups for my investment strategy.",
                  author: "Michael Chen",
                  role: "Angel Investor",
                  avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150"
                },
                {
                  quote: "As a first-time founder, this platform made fundraising so much easier. The blockchain technology gave my investors confidence.",
                  author: "Sarah Johnson",
                  role: "Startup Founder",
                  avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150"
                },
                {
                  quote: "The transparency and security of the blockchain technology is unmatched. I can track all my investments with complete confidence.",
                  author: "David Park",
                  role: "Venture Capitalist",
                  avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150"
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="bg-gray-50 p-8 rounded-lg border border-gray-100"
                >
                  <div className="flex items-center mb-6">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.author} 
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-gray-900">{testimonial.author}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                  <div className="mt-4 flex">
                    {[...Array(5)].map((_, i) => (
                      <Award key={i} className="w-5 h-5 text-warning-400" />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-accent-500 text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold">Ready to Transform Your Investment Journey?</h2>
            <p className="mt-6 text-lg text-accent-100 max-w-2xl mx-auto">
              Join our platform today and gain access to exclusive startup opportunities, 
              AI-powered insights, and blockchain security.
            </p>
            <div className="mt-10">
              <Link to="/register">
                <Button variant="secondary" size="lg" className="px-8">
                  Get Started for Free
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-6">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-white" /> 
                <span className="text-sm">No credit card required</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-white" /> 
                <span className="text-sm">Free starter tokens</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-white" /> 
                <span className="text-sm">Cancel anytime</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default LandingPage;
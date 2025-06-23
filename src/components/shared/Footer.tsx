import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { BarChart3, Github, Twitter, Linkedin, Facebook } from 'lucide-react';

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  return (
    <footer className={cn('bg-gray-50 border-t border-gray-200', className)}>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand and description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center">
              {/*<BarChart3 className="h-8 w-8 text-primary-500" />*/}
              <span className="mt-4 text-xl font-bold text-primary-800">MindCrowd</span>
            </Link>
            <p className="mt-4 text-gray-600 text-sm">
              A revolutionary platform combining AI and blockchain technology to connect investors with promising startups. 
              Our mission is to democratize investment opportunities and fuel innovation.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">GitHub</span>
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Quick Links</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary-500 text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-600 hover:text-primary-500 text-sm">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/dashboard/discover" className="text-gray-600 hover:text-primary-500 text-sm">
                  Discover Startups
                </Link>
              </li>
              <li>
                <Link to="/dashboard/leaderboard" className="text-gray-600 hover:text-primary-500 text-sm">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-600 hover:text-primary-500 text-sm">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-primary-500 text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-gray-600 hover:text-primary-500 text-sm">
                  Support
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-primary-500 text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-primary-500 text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/blockchain" className="text-gray-600 hover:text-primary-500 text-sm">
                  Blockchain Guide
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} MindCrowd. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <img 
              src="https://images.pexels.com/photos/7876708/pexels-photo-7876708.jpeg?auto=compress&cs=tinysrgb&w=200" 
              alt="Blockchain Certified" 
              className="h-10"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
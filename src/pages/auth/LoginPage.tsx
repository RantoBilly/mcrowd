import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Mail, Lock } from 'lucide-react';

const LoginPage = () => {
  const { login, isLoading, error } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <>
      <h1 className="mt-6 text-2xl font-bold text-gray-900">Sign in to your account</h1>
      
      {error && (
        <div className="bg-error-50 border border-error-200 text-error-800 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            label="Email Address"
            leftIcon={<Mail size={16} />}
            fullWidth
          />
          
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            label="Password"
            leftIcon={<Lock size={16} />}
            fullWidth
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
              Forgot your password?
            </a>
          </div>
        </div>

        <div>
          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isLoading}
          >
            Sign in
          </Button>
        </div>
      </form>
      
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            Google
          </button>
          <button
            type="button"
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            LinkedIn
          </button>
        </div>
      </div>
      
      <p className="mt-8 text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
          Sign up now
        </Link>
      </p>
      
      {/* Demo accounts */}
      <div className="mt-6 border-t border-gray-200 pt-4">
        <p className="text-xs text-center text-gray-500 mb-2">Demo Accounts</p>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            className="text-xs p-2 border border-gray-200 rounded hover:bg-gray-50"
            onClick={() => {
              setEmail('investor@example.com');
              setPassword('password');
            }}
          >
            Investor Demo
          </button>
          {/*
          <button
            type="button"
            className="text-xs p-2 border border-gray-200 rounded hover:bg-gray-50"
            onClick={() => {
              setEmail('startup@example.com');
              setPassword('password');
            }}
          >
            Startup Demo
          </button>
          */}
          <button
            type="button"
            className="text-xs p-2 border border-gray-200 rounded hover:bg-gray-50"
            onClick={() => {
              setEmail('admin@example.com');
              setPassword('password');
            }}
          >
            Admin Demo
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
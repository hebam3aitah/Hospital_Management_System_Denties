
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { EyeIcon, EyeOffIcon, Mail, Lock } from 'lucide-react';
import { signIn } from "next-auth/react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        setError(data.message || 'Login failed. Please check your credentials.');
      } else {
        // Success - redirect to home page
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Login Error:', error);
      setError('An error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E5E7E9] to-[#D7E2E9] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden"
      >
        <div className="text-center p-8 bg-gradient-to-r from-[#415A80] to-[#A5D4DC]">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto h-16 w-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#415A80]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          </motion.div>
          <h1 className="text-2xl font-bold text-white mb-2">Login to Your Account</h1>
          <p className="text-white/80 text-sm">Welcome back! Please enter your credentials</p>
        </div>

        {error && (
          <div className="mx-6 mt-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-[#415A80] mb-1">
              Email Address
            </label>
            <motion.div 
              whileFocus={{ scale: 1.01 }}
              className="relative"
            >
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-2 border border-[#D7E2E9] rounded-lg bg-[#E5E7E9] focus:outline-none focus:ring-2 focus:ring-[#A5D4DC] focus:border-[#A5D4DC] transition-all"
                required
              />
            </motion.div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <Link href="/forgot-password" className="text-xs text-[#415A80] hover:text-[#A5D4DC] transition-colors">
                Forgot password?
              </Link>
              <label className="block text-sm font-medium text-[#415A80]">
                Password
              </label>
            </div>
            <motion.div 
              whileFocus={{ scale: 1.01 }}
              className="relative"
            >
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full pl-10 pr-10 py-2 border border-[#D7E2E9] rounded-lg bg-[#E5E7E9] focus:outline-none focus:ring-2 focus:ring-[#A5D4DC] focus:border-[#A5D4DC] transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5 text-gray-500 hover:text-[#415A80]" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-500 hover:text-[#415A80]" />
                )}
              </button>
            </motion.div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-6 bg-[#415A80] hover:bg-[#A5D4DC] text-white font-medium rounded-lg shadow-sm transition-all duration-300 flex items-center justify-center"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
            ) : (
              <span>Login</span>
            )}
          </motion.button>
        </form>
        
        <div className="px-6 pb-6 text-center">
          <p className="text-sm text-gray-600 mb-6">Don't have an account? <Link href="/register" className="text-[#415A80] font-medium hover:text-[#A5D4DC] transition-colors">Create an account</Link></p>
          <div className="relative flex items-center justify-center mb-6">
            <hr className="w-full border-[#D7E2E9]" />
            <span className="absolute bg-white px-4 text-sm text-gray-500">Or continue with</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="flex items-center justify-center w-full border border-[#D7E2E9] rounded-lg py-2.5 px-4 transition-colors hover:bg-[#E5E7E9] text-gray-700"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google logo"
              className="w-5 h-5 mr-2"
            />
            <span>Sign in with Google</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
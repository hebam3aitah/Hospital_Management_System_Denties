'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Users, 
  UserRound, 
  Calendar, 
  FileText, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Bell
} from 'lucide-react';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const navigation = [
    { name: 'Dashboard', href: '/adminDashboard', icon: Home },
    { name: 'Doctors', href: '/adminDashboard/doctors', icon: UserRound },
    { name: 'Patients', href: '/adminDashboard/patients', icon: Users },
    { name: 'Appointments', href: '/adminDashboard/appointments', icon: Calendar },
    { name: 'Articles', href: '/adminDashboard/articles', icon: FileText },
    { name: 'Contact Messages', href: '/adminDashboard/contact', icon: MessageSquare },
    { name: 'Settings', href: '/adminDashboard/settings', icon: Settings },
  ];

  if (!isMounted) {
    return null; // Prevent hydration errors
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Top Navigation */}
      <nav className="bg-[#415A80] text-white shadow-md z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              {/* Mobile menu button */}
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-[#334766] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <Menu className="h-6 w-6" />
              </button>
              
              <div className="flex-shrink-0 flex items-center ml-2 md:ml-0">
                <Link href="/adminDashboard" className="flex items-center">
                  <span className="text-xl font-bold text-white">Health Clinic</span>
                </Link>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="p-1 rounded-full text-white hover:bg-[#334766] focus:outline-none focus:ring-2 focus:ring-white transition-colors">
                <span className="sr-only">View notifications</span>
                <Bell className="h-6 w-6" />
              </button>

              {/* User menu */}
              <div className="relative">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-[#A5D4DC] flex items-center justify-center text-[#415A80] font-bold">
                    A
                  </div>
                  <span className="ml-2 text-white font-medium hidden md:block">Admin</span>
                </div>
              </div>

              {/* Logout button */}
              <button className="p-1 rounded-full text-white hover:bg-[#334766] focus:outline-none focus:ring-2 focus:ring-white transition-colors">
                <span className="sr-only">Logout</span>
                <LogOut className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex flex-1">
        {/* Mobile sidebar backdrop */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-20 bg-gray-600 bg-opacity-75 transition-opacity md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}
        
        {/* Mobile sidebar */}
        <div 
          className={`fixed inset-y-0 left-0 z-30 w-64 bg-white transform transition-transform ease-in-out duration-300 md:hidden ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="h-full flex flex-col">
            <div className="h-16 flex items-center justify-between px-4 border-b border-[#D7E2E9]">
              <Link href="/adminDashboard" className="flex items-center">
                <span className="text-lg font-bold text-[#415A80]">Health Clinic</span>
              </Link>
              <button 
                onClick={() => setSidebarOpen(false)}
                className="rounded-md text-gray-500 hover:text-[#415A80] focus:outline-none"
              >
                <span className="sr-only">Close sidebar</span>
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto py-4">
              <nav className="px-2 space-y-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link 
                      key={item.name} 
                      href={item.href}
                      className={`group flex items-center px-2 py-2 text-base font-medium rounded-md transition-colors ${
                        isActive
                          ? 'bg-[#415A80] text-white'
                          : 'text-gray-600 hover:bg-[#E5E7E9] hover:text-[#415A80]'
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <item.icon 
                        className={`mr-3 h-5 w-5 ${
                          isActive ? 'text-white' : 'text-gray-400 group-hover:text-[#415A80]'
                        }`}
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
        
        {/* Desktop sidebar */}
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="w-64 flex flex-col">
            <div className="flex flex-col h-full bg-white border-r border-[#D7E2E9] shadow-sm">
              <div className="h-16 flex items-center px-4 border-b border-[#D7E2E9]">
                <Link href="/adminDashboard" className="flex items-center">
                  <span className="text-lg font-bold text-[#415A80]">Health Clinic</span>
                </Link>
              </div>
              <div className="flex-1 flex flex-col overflow-y-auto">
                <nav className="flex-1 py-4 px-2 space-y-1">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                          isActive
                            ? 'bg-[#415A80] text-white'
                            : 'text-gray-600 hover:bg-[#E5E7E9] hover:text-[#415A80]'
                        }`}
                      >
                        <item.icon
                          className={`mr-3 flex-shrink-0 h-5 w-5 ${
                            isActive ? 'text-white' : 'text-gray-400 group-hover:text-[#415A80]'
                          }`}
                        />
                        {item.name}
                      </Link>
                    );
                  })}
                </nav>
              </div>
              <div className="p-4 border-t border-[#D7E2E9]">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-[#A5D4DC] flex items-center justify-center text-[#415A80] font-bold">
                    A
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700">Admin User</p>
                    <p className="text-xs text-gray-500">admin@health.clinic</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-1 overflow-auto">
          <main className="py-6 px-4 sm:px-6 md:px-8">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
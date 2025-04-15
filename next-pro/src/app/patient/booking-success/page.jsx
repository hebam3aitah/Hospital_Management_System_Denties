'use client';

import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Calendar, Bell } from 'lucide-react';
import Link from 'next/link';

export default function BookingSuccessPage() {
  return (
    <div className="max-w-2xl mx-auto p-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-md overflow-hidden"
      >
        {/* Top colored section */}
        <div className="bg-gradient-to-r from-[#415A80] to-[#A5D4DC] p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
            className="mx-auto h-20 w-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg"
          >
            <CheckCircle className="h-12 w-12 text-[#415A80]" />
          </motion.div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Booking Request Successful!</h1>
          <p className="text-white/80">Your appointment request has been submitted</p>
        </div>
        
        {/* Content section */}
        <div className="p-8">
          <div className="space-y-6">
            <div className="bg-[#E5E7E9]/50 p-4 rounded-lg">
              <p className="text-gray-700 text-center">
                Your request will be reviewed by the doctor, and we'll notify you about the appointment status soon.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-[#E5E7E9] p-2 rounded-full mr-4">
                  <Calendar className="h-6 w-6 text-[#415A80]" />
                </div>
                <div>
                  <h3 className="font-medium text-[#415A80] mb-1">What happens next?</h3>
                  <p className="text-sm text-gray-600">
                    The doctor will review your booking request and confirm availability.
                    Once confirmed, the appointment will be added to your schedule.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-[#E5E7E9] p-2 rounded-full mr-4">
                  <Bell className="h-6 w-6 text-[#415A80]" />
                </div>
                <div>
                  <h3 className="font-medium text-[#415A80] mb-1">Stay tuned</h3>
                  <p className="text-sm text-gray-600">
                    You'll receive a notification via email and SMS once your appointment is confirmed.
                    This usually happens within 24 hours.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-[#D7E2E9] pt-6 mt-6 flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/appointments" 
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#415A80] text-white hover:bg-[#A5D4DC] transition-colors"
              >
               my appointments 
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              
              <Link 
                href="/" 
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-[#D7E2E9] text-[#415A80] hover:bg-[#E5E7E9] transition-colors"
              >
                Return to Homepage
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
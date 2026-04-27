import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft, Home, Phone } from 'lucide-react';
import { Link } from 'react-scroll';
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
});

export default function BookingSuccess() {
  const [bookingDetails, setBookingDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get('session_id');
    
    if (sessionId) {
      // Verify the session with backend
      api.get(`/api/verify-session?session_id=${sessionId}`)
        .then(response => {
          if (response.data.success) {
            setBookingDetails(response.data);
          }
        })
        .catch(error => {
          console.error('Failed to verify session:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4">
      <motion.div
        className="max-w-lg w-full text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-darkgray p-8 sm:p-12 rounded-2xl border border-gold/30">
          {/* Success Icon */}
          <motion.div
            className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <CheckCircle className="w-10 h-10 text-green-500" />
          </motion.div>

          <h1 className="text-3xl font-heading font-bold text-white mb-4">
            Payment Successful!
          </h1>
          
          <p className="text-gray-400 mb-8">
            {isLoading 
              ? 'Verifying your booking...' 
              : 'Your ride has been booked and payment confirmed. Muhammad Raza will contact you shortly to confirm all the details.'
            }
          </p>

          {bookingDetails?.customer && (
            <div className="bg-dark rounded-xl p-4 mb-8 text-left">
              <h3 className="font-semibold text-white mb-3">Booking Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Customer:</span>
                  <span className="text-white">{bookingDetails.customer.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Route:</span>
                  <span className="text-white text-right">{bookingDetails.customer.pickupLocation} → {bookingDetails.customer.dropoffLocation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Date:</span>
                  <span className="text-white">{bookingDetails.customer.date} at {bookingDetails.customer.time}</span>
                </div>
                {bookingDetails.amount && (
                  <div className="flex justify-between pt-2 border-t border-gray-700">
                    <span className="text-gold font-semibold">Amount Paid:</span>
                    <span className="text-gold font-semibold">AUD ${(bookingDetails.amount / 100).toFixed(2)}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => window.location.href = '/'}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gold text-dark font-semibold rounded-full btn-gold"
            >
              <Home className="w-5 h-5" />
              Return Home
            </button>
            
            <a
              href="tel:+61423303752"
              className="flex items-center justify-center gap-2 px-6 py-3 border border-gold text-gold font-semibold rounded-full hover:bg-gold hover:text-dark transition-all duration-300"
            >
              <Phone className="w-5 h-5" />
              Call Raza
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

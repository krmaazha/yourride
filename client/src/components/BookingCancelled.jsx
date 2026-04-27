import { motion } from 'framer-motion';
import { XCircle, ArrowLeft, RefreshCw, MessageCircle } from 'lucide-react';

export default function BookingCancelled() {
  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4">
      <motion.div
        className="max-w-lg w-full text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-darkgray p-8 sm:p-12 rounded-2xl border border-gray-800">
          {/* Cancel Icon */}
          <motion.div
            className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <XCircle className="w-10 h-10 text-red-500" />
          </motion.div>

          <h1 className="text-3xl font-heading font-bold text-white mb-4">
            Payment Cancelled
          </h1>
          
          <p className="text-gray-400 mb-2">
            Your booking was not completed as the payment was cancelled.
          </p>
          <p className="text-gray-400 mb-8">
            Don't worry - no charges have been made to your account.
          </p>

          {/* Suggestions */}
          <div className="bg-dark rounded-xl p-4 mb-8 text-left">
            <h3 className="font-semibold text-white mb-3">What would you like to do?</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-gold mt-0.5">•</span>
                Try booking again with a different payment method
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-0.5">•</span>
                Choose "Cash on Arrival" instead and pay in person
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-0.5">•</span>
                Contact Raza directly via phone or WhatsApp for assistance
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => window.location.href = '/#booking'}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gold text-dark font-semibold rounded-full btn-gold"
            >
              <RefreshCw className="w-5 h-5" />
              Try Again
            </button>
            
            <a
              href="https://wa.me/61423303752"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 border border-green-500 text-green-500 font-semibold rounded-full hover:bg-green-500 hover:text-dark transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Raza
            </a>
          </div>

          {/* Back to Home */}
          <button
            onClick={() => window.location.href = '/'}
            className="mt-6 text-gray-400 hover:text-gold transition-colors duration-300 flex items-center justify-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Home
          </button>
        </div>
      </motion.div>
    </div>
  );
}

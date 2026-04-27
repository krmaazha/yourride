import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { Phone, ArrowRight, Star, Clock, Award } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80')`,
          }}
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/70 to-dark" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-transparent to-dark/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 section-container max-w-6xl mx-auto text-center pt-20">
        {/* Trust Badges */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center gap-2 px-4 py-2 bg-darkgray/60 backdrop-blur-sm rounded-full border border-gold/20">
            <Star className="w-4 h-4 text-gold fill-gold" />
            <span className="text-sm font-medium">5★ Rated</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-darkgray/60 backdrop-blur-sm rounded-full border border-gold/20">
            <Award className="w-4 h-4 text-gold" />
            <span className="text-sm font-medium">Ex-Uber Pro Driver</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-darkgray/60 backdrop-blur-sm rounded-full border border-gold/20">
            <Clock className="w-4 h-4 text-gold" />
            <span className="text-sm font-medium">Available 24/7</span>
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Melbourne's{' '}
          <span className="text-gold-gradient">Premium</span>
          <br />
          Private Driver
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 font-light"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Professional. Reliable. Luxurious. — Book{' '}
          <span className="text-gold font-medium">Muhammad Raza Kapasi</span> for
          your next ride.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link
            to="booking"
            smooth={true}
            duration={500}
            offset={-80}
            className="group flex items-center gap-2 px-8 py-4 bg-gold text-dark font-heading font-semibold text-lg rounded-full btn-gold cursor-pointer"
          >
            Book Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <a
            href="tel:+61423303752"
            className="flex items-center gap-2 px-8 py-4 border-2 border-gold text-gold font-heading font-semibold text-lg rounded-full hover:bg-gold hover:text-dark transition-all duration-300"
          >
            <Phone className="w-5 h-5" />
            Call Now
          </a>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-heading font-bold text-gold">5+</div>
            <div className="text-sm text-gray-400 mt-1">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-heading font-bold text-gold">1000+</div>
            <div className="text-sm text-gray-400 mt-1">Rides Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-heading font-bold text-gold">5.0</div>
            <div className="text-sm text-gray-400 mt-1">Star Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-heading font-bold text-gold">24/7</div>
            <div className="text-sm text-gray-400 mt-1">Availability</div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark to-transparent z-10" />
    </section>
  );
}

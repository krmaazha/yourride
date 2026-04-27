import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Shield, Clock, MapPin, Star, Award, Users, ThumbsUp, Calendar } from 'lucide-react';

const stats = [
  { icon: Calendar, value: '5+', label: 'Years Experience' },
  { icon: Users, value: '1000+', label: 'Rides Completed' },
  { icon: Star, value: '5.0', label: 'Star Rating' },
  { icon: Clock, value: '24/7', label: 'Availability' },
];

const qualities = [
  {
    icon: Shield,
    title: 'Fully Licensed & Insured',
    description: 'Complete peace of mind with full commercial insurance and all required certifications.',
  },
  {
    icon: MapPin,
    title: 'Local Melbourne Expert',
    description: 'Intimate knowledge of Melbourne roads, traffic patterns, and the fastest routes to your destination.',
  },
  {
    icon: Award,
    title: 'Ex-Uber Pro Driver',
    description: 'Years of professional ride-sharing experience with a proven track record of excellence.',
  },
  {
    icon: ThumbsUp,
    title: 'Professional & Friendly',
    description: 'Courteous service with a warm personality. Your comfort and satisfaction are my priorities.',
  },
];

export default function WhyChooseMe() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-24 bg-dark" id="why-choose-me">
      <div className="section-container max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Stats & Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-gold text-sm font-semibold tracking-widest uppercase mb-4 block">
              Why Choose Me
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-6">
              Your Trusted{' '}
              <span className="text-gold-gradient">Melbourne Driver</span>
            </h2>
            
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              With over 5 years of professional driving experience, including time as an 
              Uber Pro driver, I bring a level of service that goes beyond simply getting 
              you from point A to point B. I understand Melbourne's roads intimately, 
              know the best routes during peak hours, and pride myself on punctuality, 
              professionalism, and making every journey comfortable and stress-free.
            </p>

            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              Whether you're a local needing regular transport, a business traveler 
              requiring reliable airport transfers, or a visitor wanting to explore 
              Melbourne in comfort, I'm here to serve you with dedication and a smile.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="bg-darkgray p-6 rounded-xl border border-gray-800 hover:border-gold/30 transition-colors duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <stat.icon className="w-6 h-6 text-gold mb-3" />
                  <div className="text-2xl sm:text-3xl font-heading font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Image & Qualities */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Premium Vehicle Image */}
            <div className="relative mb-8 rounded-2xl overflow-hidden">
              <div className="aspect-[4/3] relative">
                <img 
                  src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800" 
                  alt="Luxury sedan for Melbourne chauffeur service"
                  className="w-full h-full object-cover"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-dark/20" />
              </div>
              {/* Decorative Border */}
              <div className="absolute inset-0 border-2 border-gold/20 rounded-2xl pointer-events-none" />
              {/* Image caption */}
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white font-heading font-medium text-sm">Professional Chauffeur Service</p>
                <p className="text-gray-300 text-xs">Premium comfort & reliability</p>
              </div>
            </div>

            {/* Quality Cards */}
            <div className="space-y-4">
              {qualities.map((quality, index) => (
                <motion.div
                  key={quality.title}
                  className="flex items-start gap-4 p-4 bg-darkgray/50 rounded-xl hover:bg-darkgray transition-colors duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <quality.icon className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-white mb-1">
                      {quality.title}
                    </h4>
                    <p className="text-sm text-gray-400">{quality.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

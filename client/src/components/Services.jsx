import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Car, Plane, MapPin, Gem, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Car,
    title: 'Standard City Rides',
    description: 'Comfortable daily rides across Melbourne. Whether you\'re commuting to work, running errands, or exploring the city, enjoy a smooth and reliable journey every time.',
    features: ['Door-to-door service', 'Clean & maintained vehicle', 'Punctual pickups'],
    price: 'From $30',
  },
  {
    icon: Plane,
    title: 'Airport Transfers',
    description: 'Punctual pickups and drop-offs at Melbourne Airport. Flight monitoring included to ensure you\'re never left waiting, regardless of delays or early arrivals.',
    features: ['Flight tracking', 'Meet & greet service', 'Luggage assistance'],
    price: 'From $65',
  },
  {
    icon: MapPin,
    title: 'Long Distance Trips',
    description: 'Regional and interstate travel on your schedule. Perfect for business trips, family visits, or scenic drives to explore Victoria and beyond.',
    features: ['Flexible scheduling', 'Comfortable long-distance vehicle', 'Rest stops included'],
    price: 'From $120',
  },
  {
    icon: Gem,
    title: 'Luxury Rides',
    description: 'Premium vehicle, professional attire, and white-glove service. Ideal for special occasions, corporate events, or when you simply want to travel in style.',
    features: ['Luxury sedan', 'Professional chauffeur attire', 'Complimentary amenities'],
    price: 'From $100',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-24 bg-darkgray-light">
      <div className="section-container max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-gold text-sm font-semibold tracking-widest uppercase mb-4 block">
            What We Offer
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-6">
            Premium Services for
            <br />
            <span className="text-gold-gradient">Every Journey</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            From quick city rides to luxurious long-distance journeys, we provide
            tailored transportation solutions to meet your every need.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              className="group relative bg-darkgray p-8 rounded-2xl border border-gray-800 hover:border-gold/30 card-hover overflow-hidden"
              variants={itemVariants}
            >
              {/* Glow Effect on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors duration-300">
                  <service.icon className="w-7 h-7 text-gold" />
                </div>

                {/* Title & Price */}
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-heading font-bold text-white group-hover:text-gold transition-colors duration-300">
                    {service.title}
                  </h3>
                  <span className="text-gold font-semibold text-sm bg-gold/10 px-3 py-1 rounded-full">
                    {service.price}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-300">
                      <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#booking"
                  className="inline-flex items-center gap-2 text-gold font-medium text-sm group-hover:gap-3 transition-all duration-300"
                >
                  Book This Service
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

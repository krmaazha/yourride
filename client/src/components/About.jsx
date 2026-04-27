import { motion } from 'framer-motion';
import { MapPin, Languages, Clock, Award, Car, Heart } from 'lucide-react';

const highlights = [
  {
    icon: MapPin,
    title: 'Melbourne Local',
    description: 'Born and raised in Melbourne with intimate knowledge of every suburb, shortcut, and hidden gem.',
  },
  {
    icon: Languages,
    title: 'Multilingual',
    description: 'Fluent in English, with conversational skills in multiple languages to serve our diverse community.',
  },
  {
    icon: Clock,
    title: 'Always On Time',
    description: 'Punctuality is my promise. I value your time and ensure you never have to wait.',
  },
  {
    icon: Award,
    title: 'Ex-Uber Pro',
    description: 'Years of experience as a top-rated Uber driver with thousands of satisfied passengers.',
  },
  {
    icon: Car,
    title: 'Vehicle Excellence',
    description: 'Immaculately maintained vehicle with regular servicing and premium cleanliness standards.',
  },
  {
    icon: Heart,
    title: 'Customer First',
    description: 'Genuine care for passenger comfort and safety. Your satisfaction drives everything I do.',
  },
];

export default function About() {
  return (
    <section className="py-24 bg-dark relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/5 to-transparent" />

      <div className="section-container max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/3] max-w-lg mx-auto lg:mx-0 rounded-2xl overflow-hidden relative">
              {/* Luxury Vehicle Image */}
              <img 
                src="https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=800" 
                alt="Premium luxury vehicle for chauffeur service"
                className="w-full h-full object-cover"
              />
              {/* Dark overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent" />
              {/* Caption overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white font-heading font-semibold text-lg">Premium Luxury Fleet</p>
                <p className="text-gold text-sm">Immaculately maintained vehicles</p>
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div
              className="absolute -bottom-6 -right-6 bg-gold text-dark p-6 rounded-2xl shadow-xl"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <div className="text-3xl font-heading font-bold">5+</div>
              <div className="text-sm font-medium">Years Experience</div>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-gold/30 rounded-2xl" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gold/10 rounded-full" />
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-gold text-sm font-semibold tracking-widest uppercase mb-4 block">
              Meet Your Driver
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-6">
              Muhammad Raza <span className="text-gold-gradient">Kapasi</span>
            </h2>

            <div className="space-y-4 text-gray-400 text-lg leading-relaxed mb-8">
              <p>
                Hello! I'm Raza, your dedicated private driver here in beautiful Melbourne. 
                What started as a part-time gig with Uber quickly grew into a passion for 
                providing exceptional transportation services to locals and visitors alike.
              </p>
              <p>
                Over the past 5+ years, I've had the privilege of serving thousands of 
                passengers, from daily commuters to tourists exploring our wonderful city. 
                Each ride is an opportunity to deliver not just a journey, but an experience 
                marked by professionalism, comfort, and genuine care.
              </p>
              <p>
                As a Melbourne local, I know this city like the back of my hand. Whether 
                you need to navigate peak-hour traffic, find the quickest route to the 
                airport, or discover a scenic drive along the coast, I'm here to make 
                your journey seamless and enjoyable.
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={highlight.title}
                  className="p-4 bg-darkgray rounded-xl hover:bg-darkgray-light transition-colors duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <highlight.icon className="w-6 h-6 text-gold mb-3" />
                  <h4 className="font-heading font-semibold text-white text-sm mb-1">
                    {highlight.title}
                  </h4>
                  <p className="text-xs text-gray-400">{highlight.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

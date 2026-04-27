import { motion } from 'framer-motion';
import { ClipboardList, MessageCircle, Car } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: ClipboardList,
    title: 'Fill the Booking Form',
    description: 'Enter your pickup location, destination, date & time, and select your preferred ride type. Add any special requests to personalize your journey.',
    color: 'from-gold to-gold-dark',
  },
  {
    number: '02',
    icon: MessageCircle,
    title: 'Get Confirmation',
    description: 'Receive instant confirmation via WhatsApp or phone call. I will verify all details and provide you with driver and vehicle information.',
    color: 'from-gold-light to-gold',
  },
  {
    number: '03',
    icon: Car,
    title: 'Enjoy Your Ride',
    description: 'Sit back, relax, and enjoy a comfortable journey. Pay on arrival with cash or card, or pre-pay online for added convenience.',
    color: 'from-gold to-gold-light',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-darkgray-light relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="section-container max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-gold text-sm font-semibold tracking-widest uppercase mb-4 block">
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-6">
            How It <span className="text-gold-gradient">Works</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Booking your premium ride is quick and easy. Just three simple steps to 
            enjoy a luxurious journey across Melbourne.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              {/* Connector Line (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-gold/50 to-transparent -translate-x-8" />
              )}

              <div className="bg-darkgray p-8 rounded-2xl border border-gray-800 hover:border-gold/30 transition-all duration-300 h-full">
                {/* Step Number & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <span className={`text-5xl font-heading font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent opacity-30`}>
                    {step.number}
                  </span>
                  <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center">
                    <step.icon className="w-7 h-7 text-gold" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-heading font-bold text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          className="mt-16 flex flex-wrap justify-center gap-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center gap-2 text-gray-400">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span>Instant Booking Confirmation</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span>Flexible Payment Options</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span>Free Cancellation up to 2 hours</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

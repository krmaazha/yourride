import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Business Executive',
    image: 'SM',
    rating: 5,
    text: 'Raza has been my go-to driver for all my business trips around Melbourne. Always punctual, professional, and the car is immaculate. His knowledge of the city helps me avoid traffic and arrive on time, every time.',
  },
  {
    name: 'James & Emily Chen',
    role: 'Regular Customers',
    image: 'JC',
    rating: 5,
    text: 'We use YourRide for our weekly airport transfers and occasional city trips. The consistency of service is remarkable - always the same high quality, friendly conversation, and comfortable ride. Highly recommended!',
  },
  {
    name: 'Michael Thompson',
    role: 'Tourist from Sydney',
    image: 'MT',
    rating: 5,
    text: 'Raza showed us around Melbourne like a local friend. Great recommendations for restaurants and attractions, and he made sure we saw the best spots. The luxury ride made our anniversary trip extra special.',
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-darkgray-light relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl" />

      <div className="section-container max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-gold text-sm font-semibold tracking-widest uppercase mb-4 block">
            Client Stories
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-6">
            What Our <span className="text-gold-gradient">Clients Say</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Don't just take our word for it. Here's what our valued clients have to say 
            about their experience with YourRide.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className="bg-darkgray p-8 rounded-2xl border border-gray-800 relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6">
                <Quote className="w-8 h-8 text-gold/20" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-gold fill-gold" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-300 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center">
                  <span className="text-gold font-heading font-bold">
                    {testimonial.image}
                  </span>
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badge */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="inline-flex items-center gap-4 bg-darkgray px-8 py-4 rounded-full border border-gray-800">
            <div className="flex -space-x-2">
              {['SM', 'JC', 'MT'].map((initials) => (
                <div
                  key={initials}
                  className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center border-2 border-darkgray text-xs font-bold text-gold"
                >
                  {initials}
                </div>
              ))}
            </div>
            <div className="text-left">
              <p className="font-semibold text-white">Trusted by 1000+ Clients</p>
              <p className="text-sm text-gray-400">Across Melbourne & Beyond</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

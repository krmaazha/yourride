import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Send, 
  Loader2, 
  CheckCircle 
} from 'lucide-react';
import axios from 'axios';

const contactInfo = [
  {
    icon: Phone,
    label: 'Phone',
    value: '+61 423 303 752',
    href: 'tel:+61423303752',
    description: 'Available 24/7 for bookings',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'contact@yourride.com.au',
    href: 'mailto:contact@yourride.com.au',
    description: 'Response within 2 hours',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Melbourne, VIC, Australia',
    href: '#',
    description: 'Serving all Melbourne areas',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+61 423 303 752',
    href: 'https://wa.me/61423303752',
    description: 'Quick message anytime',
  },
];

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
});

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await api.post('/api/contact', formData);
      setShowSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      console.error('Contact form error:', error);
      alert('Failed to send message. Please try calling or WhatsApp instead.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-6">
            Contact <span className="text-gold-gradient">YourRide</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Have questions or ready to book? Reach out through any of the channels below. 
            I typically respond within minutes during business hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info Cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.label}
                href={info.href}
                target={info.href.startsWith('http') ? '_blank' : undefined}
                rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group bg-darkgray p-6 rounded-2xl border border-gray-800 hover:border-gold/30 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                  <info.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-heading font-semibold text-white mb-1">{info.label}</h3>
                <p className="text-gold font-medium mb-2">{info.value}</p>
                <p className="text-sm text-gray-400">{info.description}</p>
              </motion.a>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-darkgray p-8 rounded-2xl border border-gray-800">
              <h3 className="text-xl font-heading font-semibold text-white mb-6">
                Send a Message
              </h3>

              {showSuccess ? (
                <motion.div
                  className="text-center py-8"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-white mb-2">Message Sent!</h4>
                  <p className="text-gray-400">I'll get back to you as soon as possible.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg"
                    />
                  </div>
                  <div>
                    <textarea
                      name="message"
                      rows="4"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-gold text-dark font-semibold rounded-lg btn-gold flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

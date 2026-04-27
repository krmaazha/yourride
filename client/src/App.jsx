import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, MessageCircle } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyChooseMe from './components/WhyChooseMe';
import HowItWorks from './components/HowItWorks';
import Booking from './components/Booking';
import Testimonials from './components/Testimonials';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BookingSuccess from './components/BookingSuccess';
import BookingCancelled from './components/BookingCancelled';

function App() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Get current path
  const path = window.location.pathname;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle success/cancel pages
  if (path === '/booking-success') {
    return <BookingSuccess />;
  }

  if (path === '/booking-cancelled') {
    return <BookingCancelled />;
  }

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      
      <main>
        <section id="home">
          <Hero />
        </section>
        
        <section id="services">
          <Services />
        </section>
        
        <section id="about">
          <WhyChooseMe />
        </section>
        
        <section id="how-it-works">
          <HowItWorks />
        </section>
        
        <section id="booking">
          <Booking />
        </section>
        
        <section id="testimonials">
          <Testimonials />
        </section>
        
        <section id="about-detail">
          <About />
        </section>
        
        <section id="contact">
          <Contact />
        </section>
      </main>
      
      <Footer />

      {/* Floating WhatsApp Button */}
      <motion.a
        href="https://wa.me/61423303752"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-green-500/50 transition-all duration-300 hover:scale-110"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </motion.a>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-6 left-6 z-50 w-12 h-12 bg-gold rounded-full flex items-center justify-center shadow-lg hover:shadow-gold/50 transition-all duration-300"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronUp className="w-6 h-6 text-dark" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

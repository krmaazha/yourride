import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import { Menu, X, Car } from 'lucide-react';

const navLinks = [
  { name: 'Home', to: 'home' },
  { name: 'Services', to: 'services' },
  { name: 'About', to: 'about' },
  { name: 'Book a Ride', to: 'booking' },
  { name: 'Contact', to: 'contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-dark/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="home"
            smooth={true}
            duration={500}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center group-hover:shadow-glow transition-all duration-300">
              <Car className="w-6 h-6 text-dark" />
            </div>
            <span className="text-xl font-heading font-bold text-white">
              Your<span className="text-gold">Ride</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                smooth={true}
                duration={500}
                offset={-80}
                className="text-sm font-medium text-gray-300 hover:text-gold transition-colors duration-300 cursor-pointer"
                activeClass="text-gold"
                spy={true}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="booking"
              smooth={true}
              duration={500}
              offset={-80}
              className="px-6 py-2.5 bg-gold text-dark font-semibold text-sm rounded-full hover:shadow-glow transition-all duration-300 cursor-pointer"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white hover:text-gold transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden bg-darkgray border-t border-gray-800"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="section-container py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  smooth={true}
                  duration={500}
                  offset={-80}
                  className="block py-3 px-4 text-gray-300 hover:text-gold hover:bg-darkgray-light rounded-lg transition-all duration-300 cursor-pointer"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="booking"
                smooth={true}
                duration={500}
                offset={-80}
                className="block py-3 px-4 bg-gold text-dark font-semibold rounded-lg text-center mt-4 cursor-pointer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Book Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

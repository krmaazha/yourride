import { Link } from 'react-scroll';
import { Car, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const quickLinks = [
  { name: 'Home', to: 'home' },
  { name: 'Services', to: 'services' },
  { name: 'About', to: 'about' },
  { name: 'Book a Ride', to: 'booking' },
  { name: 'Contact', to: 'contact' },
];

const services = [
  'Standard City Rides',
  'Airport Transfers',
  'Long Distance Trips',
  'Luxury Rides',
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
];

export default function Footer() {
  return (
    <footer className="bg-dark border-t border-gray-800">
      <div className="section-container max-w-7xl mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link
              to="home"
              smooth={true}
              duration={500}
              className="flex items-center gap-2 cursor-pointer mb-4"
            >
              <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center">
                <Car className="w-6 h-6 text-dark" />
              </div>
              <span className="text-xl font-heading font-bold text-white">
                Your<span className="text-gold">Ride</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-6">
              Your trusted private driver in Melbourne. Professional, reliable, and 
              luxurious rides for every journey.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-darkgray rounded-full flex items-center justify-center text-gray-400 hover:bg-gold hover:text-dark transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    smooth={true}
                    duration={500}
                    offset={-80}
                    className="text-gray-400 hover:text-gold transition-colors duration-300 cursor-pointer"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Our Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="text-gray-400 hover:text-gold transition-colors duration-300"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">+61 423 303 752</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">contact@yourride.com.au</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">Melbourne, VIC, Australia</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm text-center sm:text-left">
            © {new Date().getFullYear()} Muhammad Raza Kapasi. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">
            Designed with care for Melbourne
          </p>
        </div>
      </div>
    </footer>
  );
}

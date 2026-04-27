import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Loader2, 
  CheckCircle, 
  CreditCard, 
  Banknote, 
  Calendar,
  Clock,
  Users,
  MapPin,
  Car,
  ArrowRight
} from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const rideTypes = [
  { value: 'standard', label: 'Standard City Ride', price: 30 },
  { value: 'airport', label: 'Airport Transfer', price: 65 },
  { value: 'long-distance', label: 'Long Distance Trip', price: 120 },
  { value: 'luxury', label: 'Luxury Ride', price: 100 },
];

const passengerOptions = [1, 2, 3, 4, 5, 6];

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
});

export default function Booking() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    pickupLocation: '',
    dropoffLocation: '',
    date: '',
    time: '',
    rideType: 'standard',
    passengers: 1,
    paymentMethod: 'cash',
    specialRequests: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.pickupLocation.trim()) newErrors.pickupLocation = 'Pickup location is required';
    if (!formData.dropoffLocation.trim()) newErrors.dropoffLocation = 'Drop-off location is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      if (formData.paymentMethod === 'card') {
        // Create Stripe checkout session
        const response = await api.post('/api/create-checkout-session', {
          ...formData,
          price: rideTypes.find(r => r.value === formData.rideType)?.price || 30,
        });

        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
        await stripe.redirectToCheckout({ sessionId: response.data.sessionId });
      } else {
        // Cash on arrival - just save booking
        await api.post('/api/booking', formData);
        setShowSuccess(true);
        setFormData({
          fullName: '',
          phone: '',
          email: '',
          pickupLocation: '',
          dropoffLocation: '',
          date: '',
          time: '',
          rideType: 'standard',
          passengers: 1,
          paymentMethod: 'cash',
          specialRequests: '',
        });
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Something went wrong. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedRidePrice = rideTypes.find(r => r.value === formData.rideType)?.price || 30;

  return (
    <section className="py-24 bg-dark relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-darkgray-light to-dark opacity-50" />
      
      <div className="section-container max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-gold text-sm font-semibold tracking-widest uppercase mb-4 block">
            Reserve Your Ride
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-6">
            Book Your <span className="text-gold-gradient">Premium Ride</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Fill in the details below and I'll get back to you within minutes to confirm your booking.
          </p>
        </motion.div>

        {showSuccess ? (
          <motion.div
            className="max-w-lg mx-auto text-center bg-darkgray p-8 rounded-2xl border border-gold/30"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-heading font-bold text-white mb-2">Booking Confirmed!</h3>
            <p className="text-gray-400 mb-6">
              Your ride is booked! Muhammad Raza will contact you shortly to confirm the details.
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="px-6 py-3 bg-gold text-dark font-semibold rounded-full hover:shadow-glow transition-all duration-300"
            >
              Book Another Ride
            </button>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            className="bg-darkgray p-8 sm:p-10 rounded-2xl border border-gray-800"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-heading font-semibold text-gold mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Personal Details
                </h3>
                
                <div>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name *"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg ${errors.fullName ? 'border-red-500' : ''}`}
                  />
                  {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number *"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg ${errors.phone ? 'border-red-500' : ''}`}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address *"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg ${errors.email ? 'border-red-500' : ''}`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Ride Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-heading font-semibold text-gold mb-4 flex items-center gap-2">
                  <Car className="w-5 h-5" />
                  Ride Details
                </h3>
                
                <div>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      name="pickupLocation"
                      placeholder="Pickup Location *"
                      value={formData.pickupLocation}
                      onChange={handleInputChange}
                      className={`w-full pl-12 pr-4 py-3 rounded-lg ${errors.pickupLocation ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.pickupLocation && <p className="text-red-500 text-sm mt-1">{errors.pickupLocation}</p>}
                </div>

                <div>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      name="dropoffLocation"
                      placeholder="Drop-off Location *"
                      value={formData.dropoffLocation}
                      onChange={handleInputChange}
                      className={`w-full pl-12 pr-4 py-3 rounded-lg ${errors.dropoffLocation ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.dropoffLocation && <p className="text-red-500 text-sm mt-1">{errors.dropoffLocation}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className={`w-full pl-12 pr-4 py-3 rounded-lg ${errors.date ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                  </div>

                  <div>
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        className={`w-full pl-12 pr-4 py-3 rounded-lg ${errors.time ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Ride Type & Passengers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Ride Type</label>
                <select
                  name="rideType"
                  value={formData.rideType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg"
                >
                  {rideTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label} - AUD ${type.price}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Passengers</label>
                <select
                  name="passengers"
                  value={formData.passengers}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg"
                >
                  {passengerOptions.map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-300 mb-3">Payment Method</label>
              <div className="grid grid-cols-2 gap-4">
                <label className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${formData.paymentMethod === 'cash' ? 'border-gold bg-gold/10' : 'border-gray-700 hover:border-gray-600'}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={formData.paymentMethod === 'cash'}
                    onChange={handleInputChange}
                    className="hidden"
                  />
                  <Banknote className="w-5 h-5 text-gold" />
                  <span className="font-medium">Cash on Arrival</span>
                </label>

                <label className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${formData.paymentMethod === 'card' ? 'border-gold bg-gold/10' : 'border-gray-700 hover:border-gray-600'}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleInputChange}
                    className="hidden"
                  />
                  <CreditCard className="w-5 h-5 text-gold" />
                  <span className="font-medium">Pay by Card</span>
                </label>
              </div>
            </div>

            {/* Special Requests */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">Special Requests (Optional)</label>
              <textarea
                name="specialRequests"
                rows="3"
                placeholder="Any special requirements, preferred route, etc."
                value={formData.specialRequests}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg resize-none"
              />
            </div>

            {/* Price Summary & Submit */}
            <div className="mt-8 pt-6 border-t border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-gray-400">Base Price</p>
                  <p className="text-2xl font-heading font-bold text-gold">AUD ${selectedRidePrice}</p>
                </div>
                <p className="text-sm text-gray-400 text-right">
                  Final price may vary based on<br />distance and traffic conditions
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gold text-dark font-heading font-bold text-lg rounded-full btn-gold flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    {formData.paymentMethod === 'card' ? 'Proceed to Payment' : 'Submit Booking'}
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
}

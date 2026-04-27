# YourRide - Premium Private Driver Service

A complete, production-ready driving services website for Muhammad Raza Kapasi, a professional private driver based in Melbourne, Australia.

## 🚗 Project Overview

**YourRide** is a dark luxury automotive-themed website featuring:
- Premium chauffeur service branding
- Online booking system with Stripe payment integration
- Responsive design optimized for all devices
- Smooth scroll navigation and animations
- Contact forms with email notifications

## 🛠 Tech Stack

### Frontend
- **React 18** + **Vite** - Modern React framework with fast HMR
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **React Scroll** - Smooth scroll navigation
- **Lucide React** - Modern icon library
- **Axios** - HTTP client for API requests

### Backend
- **Node.js** + **Express** - Server framework
- **Stripe** - Payment processing (test mode)
- **Nodemailer** - Email notifications
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
razadrives/
├── client/                     # React Frontend
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── WhyChooseMe.jsx
│   │   │   ├── HowItWorks.jsx
│   │   │   ├── Booking.jsx
│   │   │   ├── Testimonials.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── BookingSuccess.jsx
│   │   │   └── BookingCancelled.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   ├── postcss.config.js
│   ├── index.html
│   └── .env
│
└── server/                     # Node.js Backend
    ├── server.js
    ├── routes/
    │   ├── booking.js
    │   └── payment.js
    ├── package.json
    └── .env
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Stripe account (for test mode)
- Gmail account (for email notifications)

### 1. Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Environment Configuration

#### Server (.env)
```env
# Stripe Configuration (Test Mode)
STRIPE_SECRET_KEY=sk_test_your_stripe_test_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here

# Email Configuration (Gmail)
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password

# Server Configuration
PORT=5000
CLIENT_URL=http://localhost:5173

# Environment
NODE_ENV=development
```

#### Client (.env)
```env
VITE_API_URL=http://localhost:5000
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
```

### 3. Running the Application

```bash
# Start the server (from /server directory)
npm run dev
# or
node server.js

# Start the client (from /client directory)
npm run dev
```

The application will be available at:
- Client: http://localhost:5173
- Server: http://localhost:5000

## 💳 Stripe Setup

1. Create a Stripe account at https://stripe.com
2. Get your test API keys from the Dashboard
3. Add the keys to your `.env` files
4. Use Stripe test card numbers for testing:
   - Card: `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVC: Any 3 digits

## 📧 Email Setup (Gmail)

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account → Security → 2-Step Verification → App passwords
   - Select "Mail" and your device
   - Copy the generated 16-character password
3. Use this password in your `.env` file (not your regular Gmail password)

## 🎨 Design System

### Colors
- **Primary Gold**: `#C9A84C`
- **Dark Background**: `#0a0a0a`
- **Dark Gray**: `#1a1a1a`
- **White Text**: `#ffffff`
- **Gray Text**: `#9ca3af`

### Typography
- **Headings**: Montserrat (600, 700, 800)
- **Body**: Inter (300, 400, 500, 600)

### Features
- Fully responsive (mobile-first)
- Smooth scroll navigation
- Fade-in animations on scroll
- Hover effects with gold glow
- Glassmorphism effects
- Custom scrollbar styling

## 📱 Pages & Sections

1. **Hero** - Full-screen cinematic intro with CTAs
2. **Services** - 4 service cards with pricing
3. **Why Choose Me** - Stats and value propositions
4. **How It Works** - 3-step booking process
5. **Booking** - Complete booking form with payment
6. **Testimonials** - Client reviews
7. **About** - Driver bio and highlights
8. **Contact** - Contact info and form
9. **Footer** - Links and social media

## 🔧 API Endpoints

### Booking
- `POST /api/booking` - Create new booking
- `GET /api/booking` - Get all bookings

### Payment
- `POST /api/create-checkout-session` - Create Stripe session
- `GET /api/verify-session` - Verify payment status

### Contact
- `POST /api/contact` - Send contact form message

### Health
- `GET /api/health` - Server health check

## 🚦 Ride Pricing

- **Standard City Ride**: AUD $30
- **Airport Transfer**: AUD $65
- **Long Distance Trip**: AUD $120
- **Luxury Ride**: AUD $100

## 🌟 Key Features

- ✅ Complete booking flow with form validation
- ✅ Stripe payment integration (test mode)
- ✅ Cash on arrival option
- ✅ Email notifications for bookings
- ✅ WhatsApp integration
- ✅ Responsive mobile design
- ✅ Smooth scroll navigation
- ✅ Animated UI elements
- ✅ Contact form with validation
- ✅ Success/cancel pages for payments

## 🔒 Security Notes

- All Stripe transactions are in test mode
- Environment variables for sensitive data
- CORS configured for client origin
- No sensitive data stored in code

## 📄 License

© 2025 Muhammad Raza Kapasi. All rights reserved.

## 🆘 Support

For issues or questions:
- Email: raza@razadrives.com.au
- Phone: +61 400 000 000
- WhatsApp: +61 400 000 000

---

Built with ❤️ for Melbourne

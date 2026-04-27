import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Initialize Stripe
const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

// Ride type pricing
const ridePrices = {
  standard: 3000, // AUD $30.00 in cents
  airport: 6500,  // AUD $65.00 in cents
  'long-distance': 12000, // AUD $120.00 in cents
  luxury: 10000,  // AUD $100.00 in cents
};

// POST /api/create-checkout-session - Create Stripe checkout session
router.post('/create-checkout-session', async (req, res) => {
  try {
    if (!stripe) {
      return res.status(500).json({
        success: false,
        message: 'Stripe is not configured. Please set STRIPE_SECRET_KEY in environment variables.',
      });
    }

    const {
      fullName,
      email,
      phone,
      pickupLocation,
      dropoffLocation,
      date,
      time,
      rideType,
      passengers,
      specialRequests,
    } = req.body;

    // Validate required fields
    if (!fullName || !email || !pickupLocation || !dropoffLocation || !date || !time) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    // Get price for ride type
    const basePrice = ridePrices[rideType] || 3000;

    // Create ride type label
    const rideTypeLabels = {
      standard: 'Standard City Ride',
      airport: 'Airport Transfer',
      'long-distance': 'Long Distance Trip',
      luxury: 'Luxury Ride',
    };

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'aud',
            product_data: {
              name: `${rideTypeLabels[rideType]} - YourRide`,
              description: `Pickup: ${pickupLocation} → Drop-off: ${dropoffLocation} | Date: ${date} at ${time} | Passengers: ${passengers}`,
            },
            unit_amount: basePrice,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/booking-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/booking-cancelled`,
      metadata: {
        fullName,
        email,
        phone: phone || 'Not provided',
        pickupLocation,
        dropoffLocation,
        date,
        time,
        rideType,
        passengers: passengers.toString(),
        specialRequests: specialRequests || 'None',
      },
    });

    res.status(200).json({
      success: true,
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create checkout session',
      error: error.message,
    });
  }
});

// GET /api/verify-session - Verify Stripe session (for success page)
router.get('/verify-session', async (req, res) => {
  try {
    if (!stripe) {
      return res.status(500).json({
        success: false,
        message: 'Stripe is not configured',
      });
    }

    const { session_id } = req.query;

    if (!session_id) {
      return res.status(400).json({
        success: false,
        message: 'Session ID is required',
      });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === 'paid') {
      // Send confirmation email
      try {
        const { default: nodemailer } = await import('nodemailer');
        
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_USER,
          subject: `✅ PAID Booking - ${session.metadata.fullName}`,
          html: `
            <h2>🎉 New Paid Booking Confirmation</h2>
            <p><strong>Payment Status:</strong> PAID</p>
            <p><strong>Session ID:</strong> ${session_id}</p>
            <hr>
            <h3>Booking Details:</h3>
            <p><strong>Customer:</strong> ${session.metadata.fullName}</p>
            <p><strong>Email:</strong> ${session.metadata.email}</p>
            <p><strong>Phone:</strong> ${session.metadata.phone}</p>
            <p><strong>Route:</strong> ${session.metadata.pickupLocation} → ${session.metadata.dropoffLocation}</p>
            <p><strong>Date & Time:</strong> ${session.metadata.date} at ${session.metadata.time}</p>
            <p><strong>Ride Type:</strong> ${session.metadata.rideType}</p>
            <p><strong>Passengers:</strong> ${session.metadata.passengers}</p>
            <p><strong>Special Requests:</strong> ${session.metadata.specialRequests}</p>
            <p><strong>Amount Paid:</strong> AUD $${(session.amount_total / 100).toFixed(2)}</p>
          `,
        };

        await transporter.sendMail(mailOptions);
      } catch (emailError) {
        console.error('Failed to send confirmation email:', emailError);
      }

      res.status(200).json({
        success: true,
        payment_status: 'paid',
        customer: session.metadata,
        amount: session.amount_total,
      });
    } else {
      res.status(200).json({
        success: true,
        payment_status: session.payment_status,
      });
    }
  } catch (error) {
    console.error('Session verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify session',
    });
  }
});

// Webhook endpoint for Stripe events (optional but recommended)
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    if (stripe && endpointSecret && sig) {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } else {
      return res.status(400).send('Webhook not configured');
    }
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      console.log('Payment successful for session:', session.id);
      // You can add additional logic here (e.g., update database, send notifications)
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
});

export default router;

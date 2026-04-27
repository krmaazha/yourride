import express from 'express';
import dotenv from 'dotenv';

const router = express.Router();
dotenv.config();

// Store bookings (in production, use a database)
const bookings = [];

// POST /api/booking - Create a new booking
router.post('/', async (req, res) => {
  try {
    const {
      fullName,
      phone,
      email,
      pickupLocation,
      dropoffLocation,
      date,
      time,
      rideType,
      passengers,
      paymentMethod,
      specialRequests,
    } = req.body;

    // Validate required fields
    if (!fullName || !phone || !email || !pickupLocation || !dropoffLocation || !date || !time) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    // Create booking object
    const booking = {
      id: Date.now().toString(),
      fullName,
      phone,
      email,
      pickupLocation,
      dropoffLocation,
      date,
      time,
      rideType,
      passengers: parseInt(passengers) || 1,
      paymentMethod,
      specialRequests: specialRequests || '',
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    // Store booking
    bookings.push(booking);

    // Send email notification
    try {
      const { default: nodemailer } = await import('nodemailer');
      
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const rideTypeLabels = {
        standard: 'Standard City Ride',
        airport: 'Airport Transfer',
        'long-distance': 'Long Distance Trip',
        luxury: 'Luxury Ride',
      };

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `New Booking Request - ${fullName}`,
        html: `
          <h2>New Ride Booking</h2>
          <table style="border-collapse: collapse; width: 100%;">
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Booking ID:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${booking.id}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Customer Name:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Pickup Location:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${pickupLocation}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Drop-off Location:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${dropoffLocation}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Date:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${date}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Time:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${time}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Ride Type:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${rideTypeLabels[rideType] || rideType}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Passengers:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${passengers}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Payment Method:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${paymentMethod === 'cash' ? 'Cash on Arrival' : 'Pay by Card'}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Special Requests:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${specialRequests || 'None'}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Booking Time:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${new Date().toLocaleString()}</td>
            </tr>
          </table>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log('Booking notification email sent successfully');
    } catch (emailError) {
      console.error('Failed to send booking email:', emailError);
      // Continue even if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      booking,
    });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create booking',
    });
  }
});

// GET /api/booking - Get all bookings (for admin purposes)
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    bookings,
  });
});

export default router;

/**
 * ========================================================
 * ஸ்ரீ பழனி முருகன் விழா அரங்கம் — Node.js & MongoDB Server
 * Sri Palani Murugan Vizha Arangam Booking Backend
 * ========================================================
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend static files
app.use(express.static(__dirname));

// ── MongoDB Atlas Online Cloud Connection ──
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/palani_murugan_hall';
let isDbConnected = false;

// Local JSON backup store file path (in case offline or awaiting Atlas credentials)
const BACKUP_STORE_PATH = path.join(__dirname, 'bookings_backup.json');

function readBackupStore() {
  if (fs.existsSync(BACKUP_STORE_PATH)) {
    try {
      return JSON.parse(fs.readFileSync(BACKUP_STORE_PATH, 'utf8'));
    } catch (e) {
      return [];
    }
  }
  return [];
}

function writeBackupStore(data) {
  try {
    fs.writeFileSync(BACKUP_STORE_PATH, JSON.stringify(data, null, 2), 'utf8');
  } catch (e) {
    console.error('Backup store write error:', e);
  }
}

// ── Mongoose Schema & Model ──
const bookingSchema = new mongoose.Schema({
  bookingId: { type: String, required: true, unique: true },
  eventType: { type: String, required: true },
  eventTypeName: { type: String, required: true },
  eventDate: { type: String, required: true, index: true }, // Format: YYYY-MM-DD
  eventTime: { type: String, required: true }, // morning, afternoon, evening, fullday
  eventTimeName: { type: String, required: true },
  guests: { type: Number, required: true },
  requirements: { type: String, default: '' },
  customerName: { type: String, required: true },
  customerPhone: { type: String, required: true },
  customerEmail: { type: String, default: '' },
  village: { type: String, default: '' },
  address: { type: String, default: '' },
  advanceAmount: { type: Number, required: true },
  paymentMethod: { type: String, default: 'upi' }, // upi, bank, card
  txnId: { type: String, default: '' },
  status: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' },
  createdAt: { type: Date, default: Date.now }
});

const Booking = mongoose.model('Booking', bookingSchema);

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 5000 // 5 seconds timeout before fallback
})
.then(() => {
  isDbConnected = true;
  console.log('✅ MongoDB Online Database Connected Successfully!');
})
.catch((err) => {
  isDbConnected = false;
  console.warn('⚠️ MongoDB connection note:', err.message);
  console.log('💡 Using Local Database Sync Fallback so website runs without interruption!');
});

mongoose.connection.on('connected', () => { isDbConnected = true; });
mongoose.connection.on('disconnected', () => { isDbConnected = false; });

// ── REST API ENDPOINTS ──

/**
 * 1. GET /api/health
 * Server & Database connection status
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    database: isDbConnected ? 'MongoDB Connected' : 'Local Fallback Sync',
    onlineDatabase: isDbConnected,
    timestamp: new Date().toISOString()
  });
});

/**
 * 2. GET /api/bookings/booked-dates
 * Returns all active booked dates and slots
 */
app.get('/api/bookings/booked-dates', async (req, res) => {
  try {
    if (isDbConnected) {
      const bookings = await Booking.find({ status: 'confirmed' }).select('eventDate eventTime eventTypeName customerName bookingId');
      const slots = bookings.map(b => ({
        date: b.eventDate,
        time: b.eventTime,
        event: b.eventTypeName,
        name: b.customerName,
        bookingId: b.bookingId
      }));
      return res.json({ success: true, count: slots.length, slots });
    } else {
      const backup = readBackupStore();
      const slots = backup.filter(b => b.status !== 'cancelled').map(b => ({
        date: b.eventDate,
        time: b.eventTime,
        event: b.eventTypeName,
        name: b.customerName,
        bookingId: b.bookingId
      }));
      return res.json({ success: true, count: slots.length, slots, fallback: true });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * 3. GET /api/bookings/check
 * Query: ?date=YYYY-MM-DD&time=fullday
 * Checks if a specific date + slot is available
 */
app.get('/api/bookings/check', async (req, res) => {
  try {
    const { date, time } = req.query;
    if (!date) {
      return res.status(400).json({ success: false, message: 'Date is required' });
    }

    let existingBookings = [];
    if (isDbConnected) {
      existingBookings = await Booking.find({ eventDate: date, status: 'confirmed' });
    } else {
      const backup = readBackupStore();
      existingBookings = backup.filter(b => b.eventDate === date && b.status !== 'cancelled');
    }

    // Check conflict
    const conflict = existingBookings.find(b => {
      if (b.eventTime === 'fullday' || time === 'fullday') return true;
      if (time && b.eventTime === time) return true;
      return false;
    });

    if (conflict) {
      return res.json({
        available: false,
        reason: 'already_booked',
        message: `❌ இந்த தேதி (${date}) ஏற்கனவே முன்பதிவு செய்யப்பட்டுள்ளது! [Already Booked - ${conflict.eventTypeName || conflict.eventType}]`,
        bookedDetails: {
          date: conflict.eventDate,
          time: conflict.eventTime,
          event: conflict.eventTypeName
        }
      });
    }

    res.json({
      available: true,
      reason: 'available',
      message: `✅ இந்த தேதி (${date}) முன்பதிவுக்கு தயாராக உள்ளது! (Slot Available)`
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * 4. POST /api/bookings
 * Create new booking
 */
app.post('/api/bookings', async (req, res) => {
  try {
    const data = req.body;

    if (!data.eventDate || !data.customerName || !data.customerPhone) {
      return res.status(400).json({ success: false, message: 'Missing required booking fields' });
    }

    // Double check availability to prevent simultaneous double booking
    let existingBookings = [];
    if (isDbConnected) {
      existingBookings = await Booking.find({ eventDate: data.eventDate, status: 'confirmed' });
    } else {
      const backup = readBackupStore();
      existingBookings = backup.filter(b => b.eventDate === data.eventDate && b.status !== 'cancelled');
    }

    const conflict = existingBookings.find(b => {
      if (b.eventTime === 'fullday' || data.eventTime === 'fullday') return true;
      if (data.eventTime && b.eventTime === data.eventTime) return true;
      return false;
    });

    if (conflict) {
      return res.status(409).json({
        success: false,
        message: 'மன்னிக்கவும்! இந்த தேதி ஏற்கனவே முன்பதிவு செய்யப்பட்டுவிட்டது. (Already Booked)'
      });
    }

    // Generate unique Booking ID if not provided
    if (!data.bookingId) {
      const year = new Date().getFullYear();
      const rand = Math.floor(1000 + Math.random() * 9000);
      data.bookingId = `SPMVA-${year}-${rand}`;
    }

    let savedBooking = null;

    if (isDbConnected) {
      const newBooking = new Booking(data);
      savedBooking = await newBooking.save();
    } else {
      const backup = readBackupStore();
      data.createdAt = new Date().toISOString();
      backup.push(data);
      writeBackupStore(backup);
      savedBooking = data;
    }

    console.log(`🎉 New Booking Created: ${data.bookingId} for ${data.eventDate} (${data.customerName})`);

    res.status(201).json({
      success: true,
      message: 'முன்பதிவு வெற்றிகரமாக முடிந்தது! (Booking Confirmed Successfully)',
      booking: savedBooking
    });
  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * 5. GET /api/bookings
 * Admin: Get all bookings list
 */
app.get('/api/bookings', async (req, res) => {
  try {
    if (isDbConnected) {
      const bookings = await Booking.find().sort({ eventDate: 1, createdAt: -1 });
      return res.json({ success: true, count: bookings.length, bookings });
    } else {
      const backup = readBackupStore();
      return res.json({ success: true, count: backup.length, bookings: backup, fallback: true });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * 6. DELETE /api/bookings/:bookingId
 * Admin: Cancel a booking & free up the date
 */
app.delete('/api/bookings/:bookingId', async (req, res) => {
  try {
    const { bookingId } = req.params;
    if (isDbConnected) {
      await Booking.findOneAndUpdate({ bookingId }, { status: 'cancelled' });
    } else {
      const backup = readBackupStore();
      const found = backup.find(b => b.bookingId === bookingId);
      if (found) found.status = 'cancelled';
      writeBackupStore(backup);
    }
    res.json({ success: true, message: `Booking ${bookingId} cancelled and slot released.` });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 Sri Palani Murugan Vizha Arangam Server Running!`);
  console.log(`🌐 Local URL: http://localhost:${PORT}`);
  console.log(`🗄️ Database: ${isDbConnected ? 'MongoDB Online Cloud' : 'Auto Fallback Sync'}`);
  console.log(`====================================================`);
});

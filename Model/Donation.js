// Donation.js

/**
 * Donation Schema
 * Purpose: Define the structure of the donation data in the database.
 * Fields:
 *   - Name (String, required)
 *   - Email (String, required, unique)
 *   - Amount (Number, required, greater than zero)
 *   - Payment Method (String, required)
 *   - CreatedAt (Date, default to current date)
 */
const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    amount: { type: Number, required: true, min: 1 },
    paymentMethod: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Donation', DonationSchema);
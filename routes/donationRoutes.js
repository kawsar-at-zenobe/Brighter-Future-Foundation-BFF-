/**
 * Routes for Donation
 * Endpoints:
 *   - POST /api/donations: Create a donation
 *   - GET /api/donations: Retrieve all donations
 *   - GET /api/donations/:id: Retrieve a specific donation by ID
 *   - DELETE /api/donations/:id: Delete a specific donation by ID
 *   - GET /api/donations/report: Generate donation report
 */
const express = require('express');
const {
    createDonation,
    getDonations,
    getDonationById,
    deleteDonation,
    generateDonationReport,
} = require('../controllers/donationController');

const router = express.Router();

router.post('/donations', createDonation); // Not yet implemented
router.get('/donations', getDonations);   // Not yet implemented
router.get('/donations/:id', getDonationById); // Not yet implemented
router.delete('/donations/:id', deleteDonation); // Not yet implemented
router.get('/donations/report', generateDonationReport); // Not yet implemented

module.exports = router;

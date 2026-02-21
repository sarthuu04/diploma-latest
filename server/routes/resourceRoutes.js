const express = require('express');
const router = express.Router();
const { getResources, addResource } = require('../controllers/resourceController');

// Define the routes
router.get('/', getResources);   // Fetches the PDFs
router.post('/', addResource);  // For you to add new PDFs

module.exports = router;
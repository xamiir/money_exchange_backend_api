const express = require('express');
const router = express.Router();
const {
  exchangeMoney,
  getUserTransactions,
  getAllTransactions,
  getTotalTransactions, // Import the getTotalTransactions function
} = require('../controllers/transactions');

router.post('/transactions/exchange', exchangeMoney);
router.get('/transactions/user/:userId', getUserTransactions);
router.get('/transactions', getAllTransactions);

// Add the route for getTotalTransactions
router.get('/transactions/total', getTotalTransactions);

module.exports = router;

// routes/transactions.js
const express = require('express');
const router = express.Router();
const {
  exchangeMoney,
  getUserTransactions,
  getAllTransactions,
} = require('../controllers/transactions');

router.post('/transactions/exchange', exchangeMoney);
router.get('/transactions/user/:userId', getUserTransactions);
router.get('/transactions', getAllTransactions);


module.exports = router;
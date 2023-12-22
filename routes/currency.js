// routes/currencies.js
const express = require('express');
const router = express.Router();
const {
  createCurrency,
  getCurrencies,
  getCurrencyById,
  updateCurrency,
  deleteCurrency,
  getTotalCurrencies
} = require('../controllers/currency');

router.post('/currency', createCurrency);
router.get('/currency', getCurrencies);
router.get('/currency/:id', getCurrencyById);
router.put('/currency/:id', updateCurrency);
router.delete('/currency/:id', deleteCurrency);
router.get('/currency/total', getTotalCurrencies);

module.exports = router;

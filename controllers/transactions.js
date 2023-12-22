/// controllers/transactions.js
const Transaction = require('../models/transactions');
const Currency = require('../models/currency'); // Adjust the path if needed
const User = require('../models/user');
exports.exchangeMoney = async (req, res) => {
  try {
    const { userId, amount, currencyFrom, currencyTo, exchangeRate  } = req.body;

    // Perform any additional validation if needed
    // If the same currency, return an error
    if (currencyFrom === currencyTo) {
      return res.status(400).send({ message: 'Cannot exchange the same currency' });
    }

    const transaction = new Transaction({
      userId,
      amount,
      currencyFrom,
      currencyTo,
      exchangeRate,
    });

    await transaction.save();

    // Fetch the currency names and send them in the response
    const currencyFromName = await getCurrencyName(currencyFrom);
    const currencyToName = await getCurrencyName(currencyTo);
  

    res.status(200).send({
      message: 'Money exchange successful',
      transaction: {
        ...transaction._doc,
        currencyFrom: currencyFromName,
        currencyTo: currencyToName,
      },
    });
  } catch (err) {
    console.error('Error during money exchange:', err);
    res.status(500).send({ message: err.message });
  }
};
const getCurrencyName = async (currencyId) => {
  try {
    const currency = await Currency.findById(currencyId);
    return currency ? currency.name : 'N/A';
  } catch (error) {
    console.error('Error fetching currency name:', error);
    throw error;
  }
};


const mongoose = require('mongoose'); // Make sure this line is present

exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate('currencyFrom', 'name') // Only select the 'name' field
      .populate('currencyTo', 'name');

    if (transactions.length === 0) {
      return res.status(404).send({ message: 'No transactions found' });
    }

    res.status(200).send(transactions);
  } catch (err) {
    console.error('Error fetching transactions:', err);
    res.status(500).send({ message: err.message });
  }
};


// get only the transactions for the user with the given id
exports.getUserTransactions = async (req, res) => {
  try {
    const { userId } = req.params;

    const transactions = await Transaction.find({ userId })
      .populate('currencyFrom', 'name')
      .populate('currencyTo', 'name');

    if (transactions.length === 0) {
      return res.status(404).send({ message: 'No transactions found' });
    }

    res.status(200).send(transactions);
  } catch (err) {
    console.error('Error fetching transactions:', err);
    res.status(500).send({ message: err.message });
  }
};exports.getTotalTransactions = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : null;

    if (!userId) {
      return res.status(401).send({ message: 'User not authenticated' });
    }

    const totalTransactions = await Transaction.countDocuments({ userId });

    res.status(200).send({ totalTransactions });
  } catch (err) {
    console.error('Error fetching total transactions:', err);
    res.status(500).send({ message: err.message });
  }
};



// get total transactions for all users

exports.getTotalTransactions = async (req, res) => {
  try {
    const totalTransactions = await Transaction.countDocuments();

    res.status(200).send({ totalTransactions });
  } catch (err) {
    console.error('Error fetching total transactions:', err);
    res.status(500).send({ message: err.message });
  }
};










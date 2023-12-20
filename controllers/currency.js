// controllers/currencies.js
const Currency = require('../models/currency');

exports.createCurrency = async (req, res) => {
  try {
    const { name, code  } = req.body;

    const currency = new Currency({ name, code });
    await currency.save();

    res.status(201).send({ message: 'Currency created successfully', currency });
  } catch (err) {
    console.error('Error creating currency:', err);
    res.status(500).send({ message: err.message });
  }
};

exports.getCurrencies = async (req, res) => {
  try {
    const currencies = await Currency.find();
    res.status(200).send(currencies);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getCurrencyById = async (req, res) => {
  try {
    const { id } = req.params;
    const currency = await Currency.findById(id);

    if (currency) {
      res.status(200).send(currency);
    } else {
      res.status(404).send({ message: 'Currency not found' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.updateCurrency = async (req, res) => {
  const { id } = req.params;
  const { name, code } = req.body;

  try {
    const currencyToUpdate = await Currency.findById(id);

    if (!currencyToUpdate) {
      return res.status(404).json({ message: 'Currency not found' });
    }

    currencyToUpdate.name = name;
    currencyToUpdate.code = code;
  

    const updatedCurrency = await currencyToUpdate.save();

    res.status(200).json({
      ...updatedCurrency._doc,
      message: 'Currency updated successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCurrency = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCurrency = await Currency.findByIdAndDelete(id);

    if (deletedCurrency) {
      res.status(200).send({ message: 'Currency deleted successfully', deletedCurrency });
    } else {
      res.status(404).send({ message: 'Currency not found' });
    }
  } catch (err) {
    console.error('Error during deletion:', err);
    res.status(500).send({ message: err.message });
  }
};

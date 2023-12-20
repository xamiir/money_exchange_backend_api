// models/currency.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const currencySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
   
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Currency', currencySchema);

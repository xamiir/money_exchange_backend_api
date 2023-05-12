const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: false },
    email: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Customer", schema);

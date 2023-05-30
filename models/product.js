const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: { type: String, required: true },
    cost: { type: Number, required: true },
    quantity: { type: Number, required: true },
    description: { type: String, required: true },
    image: String,
    total: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Product", schema);

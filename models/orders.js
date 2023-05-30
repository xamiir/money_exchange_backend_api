const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    items: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    total: { type: Number, required: true },
    customer: { type: Schema.Types.ObjectId, ref: "Customer" },
    orderedBy: { type: Schema.Types.ObjectId, ref: "User" },
    paymentMethod: { type: String, default: "cash" },
    paymentStatus: {
      type: String,
      required: false,
      default: "pending",
      enum: ["pending", "paid", "cancelled", "refunded"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Order", schema);

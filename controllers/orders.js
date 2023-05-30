const Orders = require("../models/orders");
const Products = require("../models/product");
const Customers = require("../models/customer");

exports.getMeta = async (req, res) => {
  try {
    const findAll = await Products.find({}).populate("category");
    res.status(200).json(findAll);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getOrders = async (req, res) => {
  const orders = await Orders.find()
    .populate("items")
    .populate("customer")
    .populate("orderedBy");

  res.status(200).json(orders);
};

exports.getOrder = async (req, res) => {
  const order = await Orders.findById(req.params.id)
    .populate("items")
    .populate("customer")
    .populate("orderedBy");

  res.status(200).json(order);
};

exports.createOrder = async (req, res) => {
  const newOrder = new Orders(req.body);
  await newOrder.save();
  res.status(201).json({
    message: "Order created successfully",
    ...newOrder._doc,
  });
};

exports.updateOrder = async (req, res) => {
  const updatedOrder = await Orders.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updatedOrder) {
    return res.status(400).json({
      message: "Order does not exist",
    });
  }

  res.status(200).json({
    message: "Order updated successfully",
    ...updatedOrder._doc,
  });
};

exports.deleteOrder = async (req, res) => {
  //  find order if is exist or show error message
  const order = await Orders.findById(req.params.id);
  if (!order) {
    return res.status(400).json({
      message: "Order does not exist",
    });
  }
  //  delete order
  await Orders.deleteOne();
  res.status(200).json({
    message: "Order deleted successfully",
  });
};

// get collection count total orders
exports.totalOrder = async (req, res) => {
  try {
    const count = await Orders.countDocuments({});
    res.status(200).json(count);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

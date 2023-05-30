const customer = require("../models/customer");

const schema = customer;

exports.createCustomer = async (req, res) => {
  try {
    const customer = req.body;
    const isFound = await schema.findOne({ phone: customer.phone });
    if (isFound?.phone)
      return res.status(400).json({ message: "Customer Already exist" });
    const created = await schema.create(customer);
    return res.status(201).json({
      ...created._doc,
      message: "Customer created Successfuly",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getCustomers = async (req, res) => {
  try {
    const findAll = await schema.find({});
    res.status(200).json(findAll);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCustomer = async (req, res) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const address = req.body.address;
  const email = req.body.email;
  const _id = req.params.id;
  try {
    const customer = await schema.findOneAndUpdate(
      { _id },
      { name, phone, address, email },
      { new: true }
    );
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    return res.status(200).json({
      ...customer._doc,
      message: "Customer updated Successfuly",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deleteCsutomer = async (req, res) => {
  try {
    const isFound = await schema.findOne({ _id: req.params.id });
    if (!isFound?.phone)
      return res.status(400).json({ message: "Customer not exist" });
    const deleted = await isFound.deleteOne();
    return res.status(200).json({
      ...deleted._doc,
      message: "Customer deleted Successfuly",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// collections total count of customers
exports.countCustomers = async (req, res) => {
  try {
    const count = await schema.countDocuments({});
    return res.status(200).json({ count });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

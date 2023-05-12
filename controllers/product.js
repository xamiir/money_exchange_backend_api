const product = require("../models/product");

const schema = product;

exports.createProduct = async (req, res) => {
  try {
    const product = req.body;
    const isFound = await schema.findOne({ name: product.name });
    if (isFound?.name)
      return res.status(400).json({ message: "Product Already exist" });

    const productBody = {
      ...product,
      total: product.cost * product.quantity,
    };
    const created = await schema.create(productBody);
    return res.status(201).json({
      ...created._doc,
      message: "Product created Successfuly",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const findAll = await schema.find({}).populate("category");
    res.status(200).json(findAll);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.updateProduct = async (req, res) => {
  const name = req.body.name;
  const cost = req.body.cost;
  const quantity = req.body.quantity;
  const description = req.body.description;
  const total = req.body.total;
  const category = req.body.category;
  const _id = req.params.id;
  try {
    const product = await schema.findOneAndUpdate(
      { _id },
      { name, cost, quantity, description, total, category },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: "products not found" });
    }
    return res.status(200).json({
      ...product._doc,
      message: "product updated Successfuly",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.deleteProduct = async (req, res) => {
  try {
    const isFound = await schema.findOne({ _id: req.params.id });
    if (!isFound?.name)
      return res.status(400).json({ message: "Products not exist" });
    const deleted = await isFound.deleteOne();
    return res.status(200).json({
      ...deleted._doc,
      message: "Products deleted Successfuly",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

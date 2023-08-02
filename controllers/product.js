const product = require("../models/product");
// const { uploadImage } = require("../cloudinary");

const cloudinary = require("cloudinary").v2;

// Configuration
cloudinary.config({
  cloud_name: "dfk7yokdz",
  api_key: "566862943764854",
  api_secret: "sM2xJQ24GzEppYDzAUYDCTqSwD8",
});

const upload_image = (file) => {
  const res = cloudinary.uploader.upload(file, {
    folder: "inventory",
    public_id: "inventory",
  });
  return res;
};

const schema = product;

exports.uploadImage = async (req, res) => {
  try {
    const file = req.file.path;
    const image = await upload_image(file);
    res.status(200).json(image.secure_url);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

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
  const salesprice = req.body.salesprice;
  const total = req.body.total;
  const category = req.body.category;
  const _id = req.params.id;

  try {
    const product = await schema.findOneAndUpdate(
      { _id },
      { name, cost, quantity, salesprice, description, total, category },
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

exports.totalProducts = async (req, res) => {
  try {
    const count = await schema.countDocuments({});
    return res.status(200).json({ count });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

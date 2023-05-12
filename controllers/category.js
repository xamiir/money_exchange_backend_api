const category = require("../models/category");

const schema = category;

exports.createCategory = async (req, res) => {
  try {
    const category = req.body;
    const isFound = await schema.findOne({ name: category.name });
    if (isFound?.name)
      return res.status(400).json({ message: "Category Already exist" });
    const created = await schema.create(category);
    return res.status(201).json({
      ...created._doc,
      message: "Category created Successfuly",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const findAll = await schema.find({});
    res.status(200).json(findAll);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// exports.updateCategory = async (req, res) => {
//   try {
//     const isFound = await schema.findOne({ _id: req.params.id });
//     if (!isFound?.name)
//       return res.status(400).json({ message: "Category not exist" });
//     const updated = await isFound.updateOne(req.body);
//     return res.status(200).json({
//       ...updated._doc,
//       message: "Category updated Successfuly",
//     });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };
exports.updateCategory = async (req, res) => {
  const name = req.body.name;
  const date = req.body.date;
  const _id = req.params.id;
  try {
    const category = await schema.findOneAndUpdate(
      { _id },
      { name, date },
      { new: true }
    );
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    return res.status(200).json({
      ...category._doc,
      message: "Category updated Successfuly",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const isFound = await schema.findOne({ _id: req.params.id });
    if (!isFound?.name)
      return res.status(400).json({ message: "Category not exist" });
    const deleted = await isFound.deleteOne();
    return res.status(200).json({
      ...deleted._doc,
      message: "Category deleted Successfuly",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

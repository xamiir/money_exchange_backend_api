const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// const jwt = require("jsonwebtoken");
// const JWT_SECRET =
//   "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

const schema = User;

exports.register = async (req, res) => {
  try {
    const user = req.body;

    const isFound = await schema.findOne({ email: user.email });
    if (isFound?.email)
      return res.status(400).json({ message: "User Already exist" });
    const created = await User.create(user);
    return res.status(201).json({
      ...created._doc,
      message: "User created Successfuly",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const findAll = await schema.find({});
    res.status(200).json(findAll);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// exports.updateUser = async (req, res) => {
//   const name = req.body.name;
//   const email = req.body.email;
//   const phone = req.body.phone;
//   const password = req.body.password;
//   const _id = req.params.id;
//   try {
//     const User = await schema.findOneAndUpdate(
//       { _id },
//       { name, email, phone, password },
//       { new: true }
//     );
//     if (!User) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     return res.status(200).json({
//       ...User._doc,
//       message: "User updated Successfuly",
//     });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };
// update user use hash password
exports.updateUser = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const password = req.body.password;
  const _id = req.params.id;
  try {
    const User = await schema.findOneAndUpdate(
      { _id },
      { name, email, phone, password },
      { new: true }
    );
    if (!User) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      ...User._doc,
      message: "User updated Successfuly",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const isFound = await schema.findOne({ _id: req.params.id });
    if (!isFound?.email)
      return res.status(400).json({ message: "User not exist" });
    const deleted = await isFound.deleteOne();
    return res.status(200).json({
      ...deleted._doc,
      message: "User deleted Successfuly",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.totalUser = async (req, res) => {
  try {
    const count = await schema.countDocuments({});
    return res.status(200).json({ count });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//  loging page controller here code

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await schema.findOne({ email });
    if (!user) {
      return res.json({ error: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ error: "Invalid Credentials" });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token);
    return res.json({ token, user, message: "Login Successfuly" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

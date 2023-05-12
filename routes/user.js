const router = require("express").Router();
const {
  getUsers,
  register,
  deleteUser,
  updateUser,
} = require("../controllers/user");

router.get("/users", getUsers);
router.post("/users", register);
router.delete("/users/:id", deleteUser);
router.put("/users/:id", updateUser);

module.exports = router;

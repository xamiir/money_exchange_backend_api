const router = require("express").Router();
const {
  getUsers,
  register,
  deleteUser,
  updateUser,
  totalUser,
  login,
} = require("../controllers/user");
const { isAuth } = require("../middlewares/auth");

router.post("/check-token", isAuth);
router.get("/users", getUsers);
router.post("/users", register);
router.delete("/users/:id", deleteUser);
router.put("/users/:id", updateUser);
router.get("/users/count", totalUser);
router.post("/login", login);

module.exports = router;

const router = require("express").Router();
const {
  createCustomer,
  getCustomers,
  updateCustomer,
  deleteCsutomer,
  countCustomers,
} = require("../controllers/customer");

router.post("/customers", createCustomer);
router.get("/customers", getCustomers);
router.put("/customers/:id", updateCustomer);
router.delete("/customers/:id", deleteCsutomer);
router.get("/customers/count", countCustomers);

module.exports = router;

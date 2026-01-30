const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const {
  getExpenses,
  addExpense,
} = require("../controllers/expenseController");

router.get("/", auth, getExpenses);

// 🔥 upload.single is REQUIRED
router.post("/", auth, upload.single("bill_image"), addExpense);

module.exports = router;

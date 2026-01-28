const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

router.post(
  "/add",
  authMiddleware,
  upload.single("bill_image"),
  expenseController.addExpense
);

router.get(
  "/",
  authMiddleware,
  expenseController.getExpenses
);

module.exports = router;

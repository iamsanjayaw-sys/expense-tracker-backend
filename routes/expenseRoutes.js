const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const {
  addExpense,
  getExpenses,
  getByDate,
} = require("../controllers/expenseController");

router.post("/", auth, upload.single("bill"), addExpense);
router.get("/", auth, getExpenses);
router.get("/:date", auth, getByDate);

module.exports = router;

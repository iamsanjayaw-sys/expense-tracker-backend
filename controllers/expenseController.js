const db = require("../db/db");

/* ================= ADD EXPENSE ================= */
exports.addExpense = (req, res) => {
  const { amount, reason } = req.body;
  const userId = req.user.id;
  const billImage = req.file ? req.file.filename : null;

  if (!amount || !reason) {
    return res.status(400).json({ message: "Amount and reason required" });
  }

  const query = `
    INSERT INTO expenses (amount, reason, bill_image, user_id)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    query,
    [amount, reason, billImage, userId],
    (err) => {
      if (err) return res.status(500).json(err);

      res.status(201).json({ message: "Expense added" });
    }
  );
};

/* ================= GET EXPENSES ================= */
exports.getExpenses = (req, res) => {
  const userId = req.user.id;
  const { date } = req.query;

  let query = `
    SELECT * FROM expenses
    WHERE user_id = ?
  `;
  let values = [userId];

  if (date) {
    query += " AND DATE(created_at) = ?";
    values.push(date);
  }

  query += " ORDER BY created_at DESC";

  db.query(query, values, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

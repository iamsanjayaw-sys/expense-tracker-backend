const db = require("../db/db");

/**
 * GET expenses (latest first, user-wise)
 */
exports.getExpenses = (req, res) => {
  const userId = req.user.id;

  db.query(
    "SELECT * FROM expenses WHERE user_id = ? ORDER BY created_at DESC",
    [userId],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};

/**
 * ADD expense (bill image OPTIONAL)
 */
exports.addExpense = (req, res) => {
  const { reason, amount } = req.body;
  const userId = req.user.id;

  const billImage = req.file ? req.file.filename : null;

  db.query(
    "INSERT INTO expenses (reason, amount, bill_image, user_id) VALUES (?, ?, ?, ?)",
    [reason, amount, billImage, userId],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        id: result.insertId,
        reason,
        amount,
        bill_image: billImage,
        created_at: new Date(),
      });
    }
  );
};

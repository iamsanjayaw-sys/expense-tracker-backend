const db = require("../db/db");

exports.addExpense = (req, res) => {
  const { reason, amount } = req.body;
  const bill = req.file?.filename || null;

  const sql =
    "INSERT INTO expenses (reason, amount, bill_image, user_id) VALUES (?, ?, ?, ?)";

  db.query(
    sql,
    [reason, amount, bill, req.user.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Expense added" });
    }
  );
};

exports.getExpenses = (req, res) => {
  const sql =
    "SELECT * FROM expenses WHERE user_id=? ORDER BY created_at DESC";

  db.query(sql, [req.user.id], (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
};

exports.getByDate = (req, res) => {
  const sql =
    "SELECT * FROM expenses WHERE user_id=? AND DATE(created_at)=?";

  db.query(
    sql,
    [req.user.id, req.params.date],
    (err, data) => {
      if (err) return res.status(500).json(err);
      res.json(data);
    }
  );
};

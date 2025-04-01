const express = require("express")
router = express.Router();
const db = require("../services/db");
const todoSchema = require("../model/todo");

router.post("/", (req, res) => {
  const { error, value } = todoSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { todoTitle, userId } = value;

  const newTodo = {
    title: todoTitle,
    user_id: userId,
  };

  db.query('INSERT INTO todos SET ?', newTodo, (err, result) => {
    if (err) {
      console.error('Todo eklerken hata:', err);
      return res.status(500).json({ error: 'Veritabanı hatası' });
    }

    return res.status(201).json({ 
      id: result.insertId,
      message: 'Todo başarıyla eklendi'
    });
  })
})

router.get("/:userId", (req, res) => {
  const userId = req.params.userId;
  
  db.query('SELECT * FROM todos WHERE user_id = ?', [userId], (err, results) => {
    if (err) {
      console.error('Veritabanı sorgu hatası:', err);
      return res.status(500).json({ error: 'Veritabanı hatası' });
    }
    res.json(results);
  });
});

router.put("/:userId/:todoId", (req, res) => {
  const { todoId, userId } = req.params;
  const { title, completed } = req.body;

  let updateFields = [];
  let values = [];

  if (title !== undefined) {
    updateFields.push("title = ?");
    values.push(title);
  }

  if (completed !== undefined) {
    updateFields.push("is_completed = ?");
    values.push(completed);
  }

  if (updateFields.length === 0) {
    return res.status(400).json({ error: "Güncellenecek alan belirtilmedi." });
  }

  const sql = `UPDATE todos SET ${updateFields.join(", ")} WHERE id = ? AND user_id = ?`;

  
  db.query(
    sql,
    [...values, todoId, userId],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Veritabanı hatası" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Todo bulunamadı" });
      }

      res.json({ message: "Todo başarıyla güncellendi" });
    }
  );
});

router.delete("/:userId/:todoId", (req, res) => {
  const { todoId, userId } = req.params;

  const sql = "DELETE FROM todos WHERE id = ? AND user_id = ?";

  db.query(sql, [todoId, userId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Veritabanı hatası" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Todo bulunamadı veya kullanıcıya ait değil" });
    }

    res.json({ message: "Todo başarıyla silindi" });
  });
});



module.exports = router;
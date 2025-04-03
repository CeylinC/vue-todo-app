const express = require("express")
router = express.Router();
const db = require("../services/dbConnection.services");
const todoSchema = require("../validators/todo.validators");

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
      console.error('Error Add Todo:', err);
      return res.status(500).json({ error: 'Database Error' });
    }

    return res.status(201).json({ 
      id: result.insertId,
      message: 'Succesfull Add Todo'
    });
  })
})

router.get("/:userId", (req, res) => {
  const userId = req.params.userId;
  
  db.query('SELECT * FROM todos WHERE user_id = ?', [userId], (err, results) => {
    if (err) {
      console.error('Database Query Error:', err);
      return res.status(500).json({ error: 'Database Error' });
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
    return res.status(400).json({ error: "No field to update specified." });
  }

  const sql = `UPDATE todos SET ${updateFields.join(", ")} WHERE id = ? AND user_id = ?`;

  
  db.query(
    sql,
    [...values, todoId, userId],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Database Error" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Todo Not Found" });
      }

      res.json({ message: "Succesfull Todo Update" });
    }
  );
});

router.delete("/:userId/:todoId", (req, res) => {
  const { todoId, userId } = req.params;

  const sql = "DELETE FROM todos WHERE id = ? AND user_id = ?";

  db.query(sql, [todoId, userId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database Error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Todo not found or does not belong to user" });
    }

    res.json({ message: "Successfull Delete Todo" });
  });
});



module.exports = router;
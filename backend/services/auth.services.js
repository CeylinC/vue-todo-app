const db = require("./dbConnection.services");

const authServices = {
  createUser: async (username, email, password) => {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
      db.query(sql, [username, email, password], (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  },
  controlUser: async (email, password) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
      db.query(sql, [email, password], (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result[0]);
      });
    });
  },
};

module.exports = authServices;

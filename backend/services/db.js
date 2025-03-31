const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

db.getConnection((err, connection) => {
    if (err) {
        console.error("❌ MySQL bağlantı hatası:", err);
    } else {
        console.log("✅ MySQL bağlantısı başarılı!");
        connection.release(); // Bağlantıyı serbest bırak
    }
});

module.exports = db;

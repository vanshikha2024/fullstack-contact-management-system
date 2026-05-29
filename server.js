const express = require("express");
const mysql = require("mysql2");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Root123", // apna password
    database: "shecan_db"
});

db.connect((err) => {
    if (err) {
        console.log("❌ Database Connection Failed");
        console.log(err);
    } else {
        console.log("✅ MySQL Connected");
    }
});

app.post("/submit", (req, res) => {

    console.log("Received Data:", req.body);

    const { name, email, message } = req.body;

    const sql =
        "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";

    db.query(sql, [name, email, message], (err, result) => {

        if (err) {
            console.log("❌ MYSQL ERROR");
            console.log(err);

            return res.status(500).json({
                success: false,
                message: "Database Error"
            });
        }

        console.log("✅ INSERT SUCCESS");

        res.json({
            success: true,
            message: "Form Submitted Successfully"
        });
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
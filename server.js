require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ============================
// 🐘 PostgreSQL Connection
// ============================
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

pool.connect()
  .then(() => console.log("✅ PostgreSQL Connected!"))
  .catch(err => console.log("❌ DB Error:", err));

// ============================
// 🧪 TEST ROUTE
// ============================
app.get("/", (req, res) => {
  res.send("🚀 PostgreSQL API is running...");
});

// ============================
// 📥 GET ALL ELDERS
// ============================
app.get("/api/elders", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM elders ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// ============================
// 📥 GET SINGLE ELDER
// ============================
app.get("/api/elders/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM elders WHERE id = $1",
      [id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// ============================
// ➕ CREATE ELDER (POST)
// ============================
app.post("/api/elders", async (req, res) => {
  try {
    const { name, age, condition } = req.body;

    const result = await pool.query(
      "INSERT INTO elders (name, age, condition) VALUES ($1, $2, $3) RETURNING *",
      [name, age, condition]
    );

    res.json({
      message: "✅ Elder Added!",
      data: result.rows[0]
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// ============================
// 🔁 UPDATE FULL (PUT)
// ============================
app.put("/api/elders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, condition } = req.body;

    await pool.query(
      "UPDATE elders SET name=$1, age=$2, condition=$3 WHERE id=$4",
      [name, age, condition, id]
    );

    res.json({ message: "🔁 Elder Fully Updated!" });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// ============================
// ✏️ UPDATE PARTIAL (PATCH)
// ============================
app.patch("/api/elders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    let fields = [];
    let values = [];
    let index = 1;

    for (let key in updates) {
      fields.push(`${key} = $${index}`);
      values.push(updates[key]);
      index++;
    }

    values.push(id);

    const query = `
      UPDATE elders 
      SET ${fields.join(", ")} 
      WHERE id = $${index}
    `;

    await pool.query(query, values);

    res.json({ message: "✏️ Elder Partially Updated!" });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// ============================
// ❌ DELETE ELDER
// ============================
app.delete("/api/elders/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM elders WHERE id=$1", [id]);

    res.json({ message: "❌ Elder Deleted!" });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// ============================
// 🚀 START SERVER
// ============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on http://localhost:${PORT}`);
});
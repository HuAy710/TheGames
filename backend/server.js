// backend/server.js
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'root',
  host: 'webShopContainer', // WICHTIG: Der Name des Containers im compose.yaml!
  database: 'webshop',
  password: 'postgres',
  port: 5432,
});er

app.get('/api/users', async (req, res) => {
  const result = await pool.query('SELECT * FROM users');
  res.json(result.rows);
});

app.post('/api/users', async (req, res) => {
  const { name, email } = req.body;
  await pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email]);
  res.sendStatus(201);
});

app.listen(3000, () => console.log('✅ Backend läuft auf http://localhost:3000'));

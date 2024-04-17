import express from 'express';
import { pool } from './db.js';
import cors from 'cors';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import bodyParser from 'body-parser';

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));



// Middleware untuk memastikan setiap permintaan dimulai dengan "/api"
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    next();
  } else {
    res.status(400).send('URL tidak valid (URL harus diawali "/api").');
  }
});

// Endpoint untuk login
app.post('/api/v1/login', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM regis WHERE username = $1', [
      req.body.username,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      if (await argon2.verify(user.password, req.body.password)) {
        const token = jwt.sign(user, process.env.SECRET_KEY);
        res.send({ token, message: 'Login berhasil.' });
      } else {
        res.status(401).send('Kata sandi salah.');
      }
    } else {
      res.status(404).send(`Pengguna dengan nama pengguna ${req.body.username} tidak ditemukan.`);
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Terjadi kesalahan pada server.');
  }
});

// Endpoint untuk registrasi
app.post('/api/v1/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Validasi Input
  if (!username || !email || !password) {
    return res.status(400).send('Semua field harus diisi.');
  }
  if (!validator.isEmail(email)) {
    return res.status(400).send('Email tidak valid.');
  }
  if (password.length < 8) {
    return res.status(400).send('Password harus minimal 8 karakter.');
  }

  // Validasi Duplikasi
  const existingUser = await pool.query('SELECT * FROM regis WHERE username = $1 OR email = $2', [
    username,
    email,
  ]);
  if (existingUser.rows.length > 0) {
    return res.status(400).send('Username atau email telah digunakan.');
  }

  // Hash Password dan Simpan Data
  try {
    const hash = await argon2.hash(password);
    await pool.query('INSERT INTO regis (username, email, password) VALUES ($1, $2, $3)', [
      username,
      email,
      hash,
    ]);
    res.send('Pendaftaran berhasil.');
  } catch (error) {
    console.error('Gagal menyimpan data:', error);
    res.status(500).send('Terjadi kesalahan saat mendaftar.');
  }
});

// Middleware untuk autentikasi
app.use((req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization && authorization.startsWith('Bearer ')) {
    const token = authorization.split(' ')[1];
    try {
      req.user = jwt.verify(token, process.env.SECRET_KEY);
      next();
    } catch (error) {
      res.status(403).send('Token tidak valid.');
    }
  } else {
    res.status(401).send('Anda belum login (tidak ada otorisasi).');
  }
});

// Endpoint untuk mengambil semua produk
app.get('/api/getAll', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Terjadi kesalahan pada server.');
  }
});

// Endpoint untuk menambahkan produk baru
app.post('/api/Add', async (req, res) => {
  try {
    const { name, description, price, image } = req.body;

    // Validasi input
    if (!name ||!description ||!price ||!image) {
      return res.status(400).send('Semua field harus diisi.');
    }

    // Simpan data produk ke database
    const result = await pool.query(
      'INSERT INTO products (name, description, price, image) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, description, price, image]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).send('Terjadi kesalahan pada server.');
  }
});





// Mendengarkan PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server berhasil dijalankan pada port ${PORT}.`));

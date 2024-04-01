import express from "express";
import cors from "cors";
import { pool } from "../db.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://presensi-shalat.vercel.app"],
  })
);

app.use((req, res, next) => {
  if (req.path.startsWith("/api")) {
    next();
  } else {
    res.status(400).send('URL tidak valid (URL harus diawali "/api").');
  }
});

app.post("/api/v1/login", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM regis WHERE username = $1", [
      req.body.username,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      if (await argon2.verify(user.password, req.body.password)) {
        const token = jwt.sign(user, process.env.SECRET_KEY);
        res.send({ token, message: "Login berhasil." });
      } else {
        res.status(401).send("Kata sandi salah.");
      }
    } else {
      res.status(404).send(`Pengguna dengan nama pengguna ${req.body.username} tidak ditemukan.`);
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Terjadi kesalahan pada server.");
  }
});

// app.post("/api/v1/register", async (req, res) => {
//   try {
//     const hash = await argon2.hash(req.body.password);
//     await pool.query("INSERT INTO regis (username, email, password) VALUES ($1, $2, $3)", [
//       req.body.username,
//       req.body.email,
//       hash,
//     ]);
//     res.send("Pendaftaran berhasil.");
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).send("Terjadi kesalahan pada server.");
//   }
// });
// app.post("/api/v1/register", async (req, res) => {
//     try {
//       const hash = await argon2.hash(req.body.password);
//       await pool.query("INSERT INTO regis (username, email, password) VALUES ($1, $2, $3)", [
//         req.body.username,
//         req.body.email,
//         hash,
//       ]);
//       res.send("Pendaftaran berhasil.");
//     } catch (error) {
//       console.error("Error saat mendaftar:", error);
//       res.status(500).send("Terjadi kesalahan saat mendaftar.");
//     }
//   });

app.post("/api/v1/register", async (req, res) => {
    const hash = await argon2.hash(req.body.password);
    await pool.query("INSERT INTO regis (username,email, password) VALUES ($1, $2, $3)", [
      req.body.username,
      req.body.email,
      hash,
    ]);
    res.send("Pendaftaran berhasil.");
  });
  

app.use((req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization && authorization.startsWith("Bearer ")) {
    const token = authorization.split(" ")[1];
    try {
      req.user = jwt.verify(token, process.env.SECRET_KEY);
      next();
    } catch (error) {
      res.status(403).send("Token tidak valid.");
    }
  } else {
    res.status(401).send("Anda belum login (tidak ada otorisasi).");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server berhasil dijalankan pada port ${PORT}.`));

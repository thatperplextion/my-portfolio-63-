const express = require('express')
const cors = require('cors')
require('dotenv').config()
const mysql = require('mysql2/promise')

async function ensureDatabase(){
  const host = process.env.DB_HOST || 'localhost'
  const user = process.env.DB_USER || 'root'
  const password = process.env.DB_PASSWORD || ''
  const port = process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306
  const dbName = process.env.DB_NAME || 'portfolio'

  try{
    const conn = await mysql.createConnection({ host, user, password, port })
    await conn.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``)
    await conn.query(`USE \`${dbName}\``)
    await conn.query(`CREATE TABLE IF NOT EXISTS messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(150) NOT NULL,
      email VARCHAR(150) NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`)
    await conn.query(`CREATE TABLE IF NOT EXISTS skills (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(150) NOT NULL,
      category VARCHAR(100) DEFAULT NULL,
      level VARCHAR(50) DEFAULT 'Intermediate',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`)
    await conn.end()
    console.log('Database ensured:', dbName)
  }catch(err){
    console.error('Failed to ensure database', err.message)
  }
}

async function main(){
  await ensureDatabase()
  const pool = require('./db')

  const app = express()
  app.use(cors())
  app.use(express.json())

  // Simple messages table CRUD: id, name, email, message, created_at

  app.get('/api/messages', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM messages ORDER BY created_at DESC')
      res.json(rows)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'DB error' })
    }
  })

  // Skills CRUD
  app.get('/api/skills', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM skills ORDER BY created_at DESC')
      res.json(rows)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'DB error' })
    }
  })

  app.post('/api/skills', async (req, res) => {
    try {
      const { name, category, level } = req.body
      const [result] = await pool.query('INSERT INTO skills (name,category,level) VALUES (?,?,?)', [name, category, level])
      const [rows] = await pool.query('SELECT * FROM skills WHERE id = ?', [result.insertId])
      res.status(201).json(rows[0])
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'DB error' })
    }
  })

  app.put('/api/skills/:id', async (req, res) => {
    try {
      const { name, category, level } = req.body
      await pool.query('UPDATE skills SET name = ?, category = ?, level = ? WHERE id = ?', [name, category, level, req.params.id])
      const [rows] = await pool.query('SELECT * FROM skills WHERE id = ?', [req.params.id])
      res.json(rows[0])
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'DB error' })
    }
  })

  app.delete('/api/skills/:id', async (req, res) => {
    try {
      await pool.query('DELETE FROM skills WHERE id = ?', [req.params.id])
      res.json({ success: true })
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'DB error' })
    }
  })

  app.get('/api/messages/:id', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM messages WHERE id = ?', [req.params.id])
      if (!rows.length) return res.status(404).json({ error: 'Not found' })
      res.json(rows[0])
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'DB error' })
    }
  })

  app.post('/api/messages', async (req, res) => {
    try {
      const { name, email, message } = req.body
      const [result] = await pool.query('INSERT INTO messages (name,email,message) VALUES (?,?,?)', [name, email, message])
      const [rows] = await pool.query('SELECT * FROM messages WHERE id = ?', [result.insertId])
      res.status(201).json(rows[0])
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'DB error' })
    }
  })

  app.put('/api/messages/:id', async (req, res) => {
    try {
      const { name, email, message } = req.body
      await pool.query('UPDATE messages SET name = ?, email = ?, message = ? WHERE id = ?', [name, email, message, req.params.id])
      const [rows] = await pool.query('SELECT * FROM messages WHERE id = ?', [req.params.id])
      res.json(rows[0])
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'DB error' })
    }
  })

  app.delete('/api/messages/:id', async (req, res) => {
    try {
      await pool.query('DELETE FROM messages WHERE id = ?', [req.params.id])
      res.json({ success: true })
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'DB error' })
    }
  })

  // Serve built frontend if present
  const path = require('path')
  const built = path.join(__dirname, '..', 'dist')
  const fs = require('fs')
  if (fs.existsSync(built)){
    app.use(express.static(built))
    app.get('/', (req,res)=> res.sendFile(path.join(built,'index.html')))
  }

  // Prefer platform-provided PORT (Render, Heroku), fall back to SERVER_PORT or 4000
  const port = process.env.PORT || process.env.SERVER_PORT || 4000
  app.listen(port, () => console.log(`Server listening on http://localhost:${port}`))
}

main().catch(err=>{
  console.error('Failed to start server', err)
  process.exit(1)
})

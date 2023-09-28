require("dotenv").config()

const express = require('express')
const { Client } = require('pg')

const app = express()

const { NODE_DOCKER_PORT } = process.env
const client = new Client()

app.get('/', async (_req, res, next) => {
  try {
    await client.connect()
    const result = await client.query('SELECT NOW()')
    console.log('result', result)
    await client.end()

    res.send('Hello World!')
  } catch (e) {
    next(e)
  }
})

app.get('/private', function (_req, _res, next) {
  console.log('LOGGED')
  next()
}, (_req, res) => {
  res.send('PRIVATE: Hello World!')
})

const PORT = NODE_DOCKER_PORT || 3000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`))
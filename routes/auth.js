import Router from 'express-promise-router'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'

import { query } from '../db/index.js'

config()
const { JWT_SECRET } = process.env

const router = new Router()
export default router

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body

    const select = 'SELECT id FROM users WHERE username = $1 AND password = MD5($2)'
    const { rows } = await query(select, [username, password])
    const { id } = rows[0] || {}

    if (!id) {
      res.status(401)
      return res.end()
    }

    const token = jwt.sign({ id }, JWT_SECRET, { expiresIn: 3600 })
    return res.json({ token: token, user_id: id })

  } catch (e) {
    next(e)
  }
})

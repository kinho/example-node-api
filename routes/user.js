import Router from 'express-promise-router'

import { query } from '../db/index.js'
import { authMiddleware } from './middleware.js'

const router = new Router()
export default router

router.get('/:id', authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params
    const { rows } = await query('SELECT * FROM users WHERE id = $1', [id])

    res.send(rows[0] || {})

  } catch (e) {
    next(e)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { username, password } = req.body

    const insert = 'INSERT INTO users(username, password) VALUES($1, MD5($2))'
    const values = [username, password]

    const { rowCount } = await query(insert, values)

    res.status(rowCount > 0 ? 200 : 500)
    return res.end()

  } catch (e) {
    next(e)
  }
})

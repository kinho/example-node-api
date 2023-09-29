import Router from 'express-promise-router'

import { query } from '../db/index.js'
import { authMiddleware } from './middleware.js'

const router = new Router()
export default router

router.get('/', authMiddleware, async (_, res, next) => {
  try {
    const select = 'SELECT news.*, users.username FROM news LEFT JOIN users ON users.id = news.author_id ORDER BY news.id DESC LIMIT 50'
    const { rows } = await query(select)

    return res.json(rows)

  } catch (e) {
    next(e)
  }
})

router.post('/', authMiddleware, async (req, res, next) => {
  try {
    const { title, description } = req.body

    const insert = 'INSERT INTO news(title, description, author_id) VALUES($1, $2, $3)'
    const values = [title, description, req.user_id]

    const { rowCount } = await query(insert, values)

    return res.status(rowCount > 0 ? 200 : 500).end()

  } catch (e) {
    next(e)
  }
})

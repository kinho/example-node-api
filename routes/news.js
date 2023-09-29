import Router from 'express-promise-router'

import { authMiddleware } from '../auth/middleware.js'
import { newsService } from '../services/news.js'

const router = new Router()
export default router

router.get('/', authMiddleware, async (_, res, next) => {
  try {
    const news = await newsService.list()

    return res.json(news)

  } catch (e) {
    next(e)
  }
})

router.post('/', authMiddleware, async (req, res, next) => {
  try {
    const { title, description } = req.body

    console.log('req.user_id', req.user_id, typeof req.user_id)
    const saved = await newsService.create(title, description, req.user_id)

    return res.status(saved ? 200 : 500).end()

  } catch (e) {
    next(e)
  }
})

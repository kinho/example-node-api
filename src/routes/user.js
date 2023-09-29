import Router from 'express-promise-router'

import { authMiddleware } from '../auth/middleware.js'
import { create, get } from '../services/user.js'

const router = new Router()
export default router

router.get('/:id', authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await get(id)

    return res.json(user)

  } catch (e) {
    next(e)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { username, password } = req.body

    const valid = await create.validate(username, password)
    if (!valid)
      return res.status(400).end()

    const saved = await create.persist(username, password)

    return res.status(saved ? 200 : 500).end()

  } catch (e) {
    next(e)
  }
})

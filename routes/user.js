import Router from 'express-promise-router'

import { authMiddleware } from './middleware.js'
import { service } from './service.js'

const router = new Router()
export default router

router.get('/:id', authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await service.user.get(id)

    return res.json(user)

  } catch (e) {
    next(e)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { username, password } = req.body

    const valid = await service.user.createValidation(username, password)
    if (!valid)
      return res.status(400).end()

    const saved = await service.user.createPersist(username, password)

    return res.status(saved > 0 ? 200 : 500).end()

  } catch (e) {
    next(e)
  }
})

import Router from 'express-promise-router'

import { sign } from '../auth/jwt.js'
import { login } from '../services/user.js'

const router = new Router()
export default router

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body

    const id = await login(username, password)

    if (!id)
      return res.status(401).end()

    return res.json({ token: sign(id), user_id: id })

  } catch (e) {
    next(e)
  }
})

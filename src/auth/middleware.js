import { verify } from './jwt.js'

export const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']

  if (!token)
    return res.status(401).json({ message: 'No token provided.' })

  verify(token, function(err, decoded) {
    if (err) return res.status(500).json({ message: 'Failed to authenticate token.' })

    req.user_id = decoded.id
    next()
  })
}
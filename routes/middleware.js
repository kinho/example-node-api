import jwt from 'jsonwebtoken'
import { config } from 'dotenv'

config()
const { JWT_SECRET } = process.env

export const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']

  if (!token) {
    res.status(401)
    return res.json({ message: 'No token provided.' })
  }

  jwt.verify(token, JWT_SECRET, function(err, decoded) {
    if (err) return res.status(500).json({ message: 'Failed to authenticate token.' })

    req.user_id = decoded.id
    next()
  })
}
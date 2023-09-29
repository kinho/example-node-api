import jwt from 'jsonwebtoken'
import { config } from 'dotenv'

config()
const { JWT_SECRET } = process.env

export const sign = (id) => jwt.sign({ id }, JWT_SECRET, { expiresIn: 3600 })

export const verify = (token, callback) => jwt.verify(token, JWT_SECRET, callback)

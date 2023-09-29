import { to } from 'await-to-js'
import yup from 'yup'

import { query } from '../db/index.js'

const createUserSchema = yup.object({
  username: yup.string().min(3).max(20).required(),
  password: yup.string().min(6).max(32).required(),
})

export const userService = {
  createValidation: async (username, password) => {
    const [_, valid] = await to(createUserSchema.validate({ username, password }))

    return valid
  },
  createPersist: async () => {
    const insert = 'INSERT INTO users(username, password) VALUES($1, MD5($2))'

    const { rowCount } = await query(insert, [username, password])

    return rowCount > 1
  },
  get: async (id) => {
    const { rows } = await query('SELECT * FROM users WHERE id = $1', [id])

    return rows[0] || {}
  },
  login: async (login, password) => {
    const select = 'SELECT id FROM users WHERE username = $1 AND password = MD5($2)'
    const { rows } = await query(select, [login, password])
    const { id } = rows[0] || {}

    return id
  },
}

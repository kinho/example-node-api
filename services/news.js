import { query } from '../db/index.js'

export const newsService = {
  create: async (title, description, author_id) => {
    const insert = 'INSERT INTO news(title, description, author_id) VALUES($1, $2, $3)'
    const { rowCount } = await query(insert, [title, description, author_id])

    return rowCount > 0
  },
  list: async () => {
    const select = `
      SELECT news.*, users.username 
      FROM news 
      LEFT JOIN users ON users.id = news.author_id 
      ORDER BY news.id DESC 
      LIMIT 50`
    const { rows } = await query(select)

    return rows || []
  },
}

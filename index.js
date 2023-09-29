import express from 'express'
import { config } from 'dotenv'

import routes from './routes/index.js'

config()
const { NODE_DOCKER_PORT } = process.env

const app = express()
app.use(express.json())
routes(app)

const PORT = NODE_DOCKER_PORT || 3000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`))

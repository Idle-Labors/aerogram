import 'dotenv/config'
import express from 'express'

const app: express.Application = express()
const port = process.env.port || 3000
app.listen(port)
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
 
import useRoutes from './routes/index'

import helmet from 'helmet'

dotenv.config()

const app = express()

app.use(helmet())
app.use('/images', express.static('public/images'))
 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())

useRoutes(app)

app.listen(process.env.PORT || 4000, () => console.info('Server Started'))
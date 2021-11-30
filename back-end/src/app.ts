import express from 'express'
import lusca from 'lusca'
import dotenv from 'dotenv'

import routers from './routes'
import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'
import compression from 'compression'
import cors from 'cors'

const corsOptions = {
  origin: '*',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}

dotenv.config({ path: '.env' })
const app = express()

app.use(cors(corsOptions))

// Express configuration
app.set('port', process.env.PORT || 1234)
app.use(apiContentType)
// Use common 3rd-party middlewares
app.use(compression())
app.use(express.json())
app.use(lusca.xframe('SAMEORIGIN'))
app.use(lusca.xssProtection(true))

// Use general router
app.use('/api', routers)

// Custom API error handler
app.use(apiErrorHandler)

export default app

import express from 'express'
import lusca from 'lusca'
import dotenv from 'dotenv'

import routers from './routes'
import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'
import compression from 'compression'

dotenv.config({ path: '.env' })
const app = express()

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

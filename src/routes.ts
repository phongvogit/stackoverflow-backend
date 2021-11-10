import express from 'express'

import { authenticate, createUser, validateUser } from './controllers/users'

const router = express.Router()

//authentication
router.post('/signup', validateUser, createUser)
router.post('/authenticate', validateUser, authenticate)

export default router

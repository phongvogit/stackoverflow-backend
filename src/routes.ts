import { createQuestion, questionValidate } from './controllers/questions'
import express from 'express'

import {
  authenticate,
  createUser,
  findUserByName,
  listUsers,
  search,
  validateUser,
} from './controllers/users'
import { requireAuth } from './middlewares/requireAuth'

const router = express.Router()

//authentication
router.post('/signup', validateUser, createUser)
router.post('/authenticate', validateUser, authenticate)

//users
router.get('/users', listUsers)
router.get('/users/:search', search)
router.get('/user/:username', findUserByName)

//questions
router.post('/questions', questionValidate, [requireAuth], createQuestion)

export default router

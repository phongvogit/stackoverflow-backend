import {
  createQuestion,
  listQuestions,
  loadQuestion,
  questionValidate,
  show,
} from './controllers/questions'
import express from 'express'

import {
  authenticate,
  createUser,
  findUserByName,
  listUsers,
  search,
  validateUser,
} from './controllers/users'
import { answerValidate, loadAnswer, removeAnswer } from './controllers/answers'
import { listTags, searchTags } from './controllers/tags'
import { requireAuth } from './middlewares/requireAuth'
import { createAnswer } from './controllers/answers'

const router = express.Router()

//authentication
router.post('/signup', validateUser, createUser)
router.post('/authenticate', validateUser, authenticate)

//users
router.get('/users', listUsers)
router.get('/users/:search', search)
router.get('/user/:username', findUserByName)

//questions
router.param('question', loadQuestion)
router.post('/questions', questionValidate, [requireAuth], createQuestion)
router.get('/question/:question', show)
router.get('/questions', listQuestions)

//tags
router.get('/tags', listTags)
router.get('/tags/:tag', searchTags)

//answers
router.param('answer', loadAnswer)
router.post('/answer/:question', answerValidate, [requireAuth], createAnswer)
router.delete('/answer/:question/:answer', [requireAuth], removeAnswer)

export default router

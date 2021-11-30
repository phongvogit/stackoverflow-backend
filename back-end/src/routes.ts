import {
  createQuestion,
  listByUser,
  listQuestions,
  loadQuestion,
  questionValidate,
  removeQuestion,
  searchQuestions,
  show,
  listQuestionByTags,
} from './controllers/questions'
import express from 'express'

import {
  authenticate,
  createUser,
  findUserByName,
  listUsers,
  searchUsers,
  validateUser,
} from './controllers/users'
import { answerValidate, loadAnswer, removeAnswer } from './controllers/answers'
import { listTags, searchTags } from './controllers/tags'
import { requireAuth } from './middlewares/requireAuth'
import { createAnswer } from './controllers/answers'
import {
  commentValidate,
  loadComment,
  removeComment,
} from './controllers/comment'
import { createComment } from './controllers/comment'
import { commentAuth } from './middlewares/ commentAuth'
import { upVote, downVote, unVote } from './controllers/vote'
import { questionsAuth } from './util/questionAuth'

const router = express.Router()

//authentication
router.post('/signup', validateUser, createUser)
router.post('/authenticate', validateUser, authenticate)
router.post('/authenticate/token')

//users
router.get('/users', listUsers)
router.get('/users/:search', searchUsers)
router.get('/user/:username', findUserByName)

//questions
router.param('question', loadQuestion)
router.post('/questions', questionValidate, [requireAuth], createQuestion)
router.get('/question/:question', show)
router.get('/questions/:questionSearch', searchQuestions)
router.get('/questions', listQuestions)
router.post('/questions/tags/search', listQuestionByTags)
router.get('/question/user/:username', listByUser)
router.delete(
  '/question/:question',
  [requireAuth, questionsAuth],
  removeQuestion
)

//tags
router.get('/tags', listTags)
router.get('/tags/:tag', searchTags)

//answers
router.param('answer', loadAnswer)
router.post('/answer/:question', answerValidate, [requireAuth], createAnswer)
router.delete('/answer/:question/:answer', [requireAuth], removeAnswer)

//votes
router.get('/votes/upvote/:question/:answer?', requireAuth, upVote)
router.get('/votes/downvote/:question/:answer?', requireAuth, downVote)
router.get('/votes/unvote/:question/:answer?', requireAuth, unVote)

//comments
router.param('comment', loadComment)
router.post(
  '/comment/:question/:answer?',
  commentValidate,
  [requireAuth],
  createComment
)
router.delete(
  '/comment/:question/:comment',
  [requireAuth, commentAuth],
  removeComment
)
router.delete(
  '/comment/:question/:answer/:comment',
  [requireAuth, commentAuth],
  removeComment
)

export default router

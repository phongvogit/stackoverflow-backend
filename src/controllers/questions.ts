import { Request, Response, NextFunction } from 'express'
import { body, validationResult } from 'express-validator'
import { BadRequestError, ValidationRequestError } from '../helpers/apiError'
import QuestionService from '../services/question'
import Question from '../models/Question'

// POST /questions
export const createQuestion = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const resultErrors = validationResult(req)
  if (!resultErrors.isEmpty()) {
    const errors = resultErrors.array({ onlyFirstError: true })
    const errorMessage = errors[0].param + ' ' + errors[0].msg
    next(new ValidationRequestError(errorMessage))
  }

  try {
    const { title, tags, text } = req.body
    const author = req.user.id
    const question = new Question({
      title,
      author,
      tags,
      text,
    })

    const result = await QuestionService.create(question)
    res.json(result)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// POST /questions
export const listQuestions = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { sortType = '-score' } = req.body
    const result = await QuestionService.listQuestions(sortType)
    res.json(result)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const loadQuestion = async (
  req: any,
  res: Response,
  next: NextFunction,
  id: string
) => {
  try {
    const result = await QuestionService.loadQuestion(id)
    req.question = result
    next()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const show = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { _id } = req.question
    const question = await QuestionService.showQuestion(_id)
    res.json(question)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const questionValidate = [
  body('title')
    .exists()
    .trim()
    .withMessage('is required')

    .notEmpty()
    .withMessage('cannot be blank')

    .isLength({ max: 180 })
    .withMessage('must be at most 180 characters long'),

  body('text')
    .exists()
    .trim()
    .withMessage('is required')

    .isLength({ min: 10 })
    .withMessage('must be at least 10 characters long')

    .isLength({ max: 5000 })
    .withMessage('must be at most 5000 characters long'),

  body('tags').exists().withMessage('is required'),
]

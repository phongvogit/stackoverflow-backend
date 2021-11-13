import { NextFunction, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { BadRequestError, ValidationRequestError } from '../helpers/apiError'
import AnswerService from '../services/answer'

// POST /questions
export const createAnswer = async (
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
    const { id } = req.user
    const { text } = req.body
    const result = await AnswerService.createAnswer(id, text, req.question)
    res.json(result)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const loadAnswer = async (
  req: any,
  res: Response,
  next: NextFunction,
  id: string
) => {
  try {
    const result = await AnswerService.loadAnswer(id, req.question)
    req.answer = result
    next()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const removeAnswer = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id } = req.answer
    const result = await AnswerService.removeAnswer(_id, req.question)
    res.json(result)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const answerValidate = [
  body('text')
    .exists()
    .trim()
    .withMessage('is required')

    .notEmpty()
    .withMessage('cannot be blank')

    .isLength({ min: 30 })
    .withMessage('must be at least 30 characters long')

    .isLength({ max: 30000 })
    .withMessage('must be at most 30000 characters long'),
]

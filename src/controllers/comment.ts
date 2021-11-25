import { NextFunction, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { QuestionDocument } from '../models/Question'
import { BadRequestError, ValidationRequestError } from '../helpers/apiError'
import CommentService from '../services/comment'
import * as mongoose from 'mongoose'

// POST /comments
export const createComment = async (
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
    const { body } = req.body
    if (req.answer) {
      const question = await CommentService.createCommentToAnswer(
        id,
        req.question,
        req.answer,
        body
      )
      return res.status(201).json(question)
    }

    const question = await CommentService.createCommentToQuestion(
      id,
      req.question,
      body
    )
    res.status(201).json(question)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error.message))
    } else {
      next(error)
    }
  }
}

export const loadComment = async (
  req: any,
  res: Response,
  next: NextFunction,
  id: string
) => {
  try {
    let comment
    if (req.answer) {
      comment = await CommentService.loadCommentForAnswer(id, req.answer)
    } else {
      comment = await CommentService.loadCommentForQuestion(id, req.question)
    }
    req.comment = comment
    next()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const removeComment = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id } = req.comment
    let question: QuestionDocument
    if (req.answer) {
      question = await CommentService.removeCommentForAnswer(
        _id,
        req.question,
        req.answer
      )
    } else {
      question = await CommentService.removeCommentForQuestion(
        _id,
        req.question
      )
    }
    return res.json(question)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const commentValidate = [
  body('body')
    .exists()
    .trim()
    .withMessage('is required')

    .notEmpty()
    .withMessage('cannot be blank')

    .isLength({ max: 1000 })
    .withMessage('must be at most 1000 characters long'),
]

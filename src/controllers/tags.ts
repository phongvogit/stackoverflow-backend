import { NextFunction, Request, Response } from 'express'
import { BadRequestError } from '../helpers/apiError'
import TagService from '../services/tags'

export const listTags = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await TagService.listTags()
    res.json(result)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const listPopularTags = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await TagService.listPopularTags()
    res.json(result)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const searchTags = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { tag = '' } = req.params
    const result = await TagService.searchTags(tag)
    res.json(result)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

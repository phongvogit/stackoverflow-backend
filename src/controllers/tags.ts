import { NextFunction, Request, Response } from 'express'
import { Queries } from '../models/Common'
import { BadRequestError } from '../helpers/apiError'
import TagService from '../services/tags'

export const listTags = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const queries: Queries = req.query
    const result = await TagService.listTags(queries)
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
    const queries: Queries = req.query
    const result = await TagService.listPopularTags(queries)
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
    const queries: Queries = req.query
    const result = await TagService.searchTags(queries, tag)
    res.json(result)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

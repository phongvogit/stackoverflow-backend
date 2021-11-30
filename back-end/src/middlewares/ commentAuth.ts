import { NextFunction, Response } from 'express'
import { UnauthorizedError } from '../helpers/apiError'

export const commentAuth = (req: any, res: Response, next: NextFunction) => {
  if (req.comment.author._id.equals(req.user.id) || req.user.role === 'admin')
    return next()
  next(new UnauthorizedError('Error for authorization!'))
}

import { NextFunction, Request, Response } from 'express'
import { UnauthorizedError } from '../helpers/apiError'
import jwt from 'jsonwebtoken'

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization || ''
  if (!token) {
    next(new UnauthorizedError('Authentication invalid.'))
  }
  try {
    const decodedToken = jwt.verify(token.slice(7), 'development_secret')
    req.user = decodedToken
    next()
  } catch (error) {
    next(new UnauthorizedError('Error for authorization!'))
  }
}

import { UserDocument } from '../models/User'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const createToken = (user: UserDocument) => {
  // Sign the JWT
  if (!user.role) {
    throw new Error('No user role specified')
  }

  return jwt.sign(
    {
      id: user._id,
      username: user.username,
      role: user.role,
    },
    'development_secret',
    { algorithm: 'HS256', expiresIn: '7d' }
  )
}

export const hashPassword = (password: string) => {
  return new Promise((resolve, reject) => {
    // Generate a salt at level 12 strength
    bcrypt.genSalt(12, (err: any, salt: string) => {
      if (err) {
        reject(err)
      }
      bcrypt.hash(password, salt, (err: any, hash: string) => {
        if (err) {
          reject(err)
        }
        resolve(hash)
      })
    })
  })
}

export const verifyPassword = (
  passwordAttempt: string,
  hashedPassword: string
) => {
  return bcrypt.compare(passwordAttempt, hashedPassword)
}

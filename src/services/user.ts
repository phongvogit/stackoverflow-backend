import jwtDecode from 'jwt-decode'
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from '../helpers/apiError'
import User, { UserDocument } from '../models/User'
import {
  createToken,
  hashPassword,
  verifyPassword,
} from '../util/authentication'

import { Queries } from '../models/Common'
import { facetList } from '../util/usefulFunction'
import { userStatistics } from '../util/privateQueries'

type MyToken = {
  name: string
  exp: number
}

export type UserResponse = {
  message: string
  token: string
  expiresAt: number
  userInfo: UserDocument
}

// POST /signup
const signup = async (
  user: UserDocument
): Promise<UserResponse | undefined> => {
  const { username, password } = user
  const hashedPassword = await hashPassword(password)

  const userData = {
    username: username.toLowerCase(),
    password: hashedPassword,
  }

  const existingUsername = await User.findOne({
    username: userData.username,
  })

  if (existingUsername) {
    throw new BadRequestError('Username already exists.')
  }

  const newUser = new User(userData)
  const savedUser = await newUser.save()

  if (savedUser) {
    const token = createToken(savedUser)
    const decodedToken = jwtDecode<MyToken>(token)
    const expiresAt = decodedToken.exp

    return {
      message: 'User created!',
      token,
      userInfo: savedUser,
      expiresAt,
    }
  } else {
    throw new BadRequestError('There was a problem creating your account.')
  }
}

const authenticate = async (
  user: UserDocument
): Promise<UserResponse | undefined> => {
  const { username, password } = user

  const userData = await User.findOne({
    username: username.toLowerCase(),
  })

  if (!userData) {
    throw new ForbiddenError('Wrong username or password.')
  }

  const passwordValid = await verifyPassword(password, userData.password)

  if (passwordValid) {
    const token = createToken(userData)
    const decodedToken = jwtDecode<MyToken>(token)
    const expiresAt = decodedToken.exp

    return {
      message: 'Authentication successful!',
      token,
      userInfo: userData,
      expiresAt,
    }
  } else {
    throw new BadRequestError('Something went wrong.')
  }
}

const listUsers = async (queries: Queries): Promise<UserResponse> => {
  const options = [
    {
      $lookup: {
        from: 'questions',
        let: { user_id: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [{ $eq: ['$$user_id', '$author'] }],
              },
            },
          },
        ],
        as: 'question_doc',
      },
    },
    {
      $project: { password: 0 },
    },
  ]
  const users = await facetList(User, queries, options)
  return users
}

const search = async (
  queries: Queries,
  name: string
): Promise<UserResponse> => {
  const options = [
    {
      $match: { username: { $regex: name, $options: 'i' } },
    },
    {
      $lookup: {
        from: 'questions',
        let: { user_id: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [{ $eq: ['$$user_id', '$author'] }],
              },
            },
          },
        ],
        as: 'question_doc',
      },
    },
    {
      $project: { password: 0 },
    },
  ]
  try {
    const result = await facetList(User, queries, options)
    return result
  } catch (error) {
    throw new NotFoundError(`Not found`)
  }
}

const find = async (name: string): Promise<UserDocument[]> => {
  const user = await User.aggregate([
    {
      $match: { username: name },
    },
    {
      $project: { password: 0 },
    },
    ...userStatistics,
  ])
  return user
}

export default {
  signup,
  authenticate,
  listUsers,
  search,
  find,
}

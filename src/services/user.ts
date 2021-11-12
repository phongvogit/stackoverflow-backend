import jwtDecode from 'jwt-decode'
import { BadRequestError, ForbiddenError } from '../helpers/apiError'
import User, { UserDocument } from '../models/User'
import {
  createToken,
  hashPassword,
  verifyPassword,
} from '../util/authentication'

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

const listUsers = async (sortType: string): Promise<UserDocument[] | null> => {
  const users = await User.find().sort(sortType)
  return users
}

const search = async (search: string): Promise<UserDocument[] | null> => {
  const users = await User.find({ username: { $regex: search, $options: 'i' } })
  return users
}

const find = async (name: string): Promise<UserDocument | null> => {
  const user = await User.findOne({ username: name })
  return user
}

export default {
  signup,
  authenticate,
  listUsers,
  search,
  find,
}

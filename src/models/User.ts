/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'
import { Pagination } from './Common'

export type UserResponse = {
  questions: UserDocument[]
  pagination: Pagination
}

export type UserDocument = Document & {
  _id: mongoose.Types.ObjectId
  username: string
  password: string
  role: string
  profilePhoto: string
  created: Date
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    username: { type: String, require: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, require: true, default: 'user' },
    profilePhoto: {
      type: String,
    },
    created: { type: Date, default: Date.now },
  },
  {
    toObject: {
      transform: function (doc, ret) {
        delete ret._v
        delete ret.password
        return ret
      },
    },
    toJSON: {
      transform: function (doc, ret) {
        delete ret._v
        delete ret.password
        return ret
      },
    },
  }
)

userSchema.pre('save', function (): void {
  this.profilePhoto = `https://secure.gravatar.com/avatar/${this._id}?s=90&d=identicon`
})

export default mongoose.model<UserDocument>('User', userSchema)

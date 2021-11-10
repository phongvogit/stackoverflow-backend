/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document, Schema } from 'mongoose'

export type UserDocument = Document & {
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
    toJSON: {
      transform: function (doc, ret) {
        const obj = { ...ret }
        delete obj._id
        delete obj._v
        delete obj.password
        return obj
      },
    },
  }
)

userSchema.pre('save', function (): void {
  this.profilePhoto = `https://secure.gravatar.com/avatar/${this._id}?s=90&d=identicon`
})

userSchema.set('toJSON', { getters: true })

export default mongoose.model<UserDocument>('User', userSchema)
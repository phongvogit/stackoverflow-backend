import mongoose, { Schema, Document } from 'mongoose'

export type Comment = {
  author: mongoose.Types.ObjectId
  body: string
  created?: Date
}

export type CommentDocument = Document<Comment>

export const commentSchema = new mongoose.Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: 'User', require: true },
    body: { type: String, required: true },
    created: { type: Date, default: Date.now },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        const obj = { ...ret }
        delete obj._v
        return obj
      },
    },
  }
)

commentSchema.set('toJSON', { getters: true })

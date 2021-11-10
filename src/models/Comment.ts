import mongoose, { Schema } from 'mongoose'

export type CommentDocument = Document & {
  author: Schema.Types.ObjectId
  body: string
  created: Date
}

const commentSchema = new mongoose.Schema<CommentDocument>(
  {
    author: { type: Schema.Types.ObjectId, require: true, ref: 'user' },
    body: { type: String, required: true },
    created: { type: Date, default: Date.now },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        const obj = { ...ret }
        delete obj._id
        return obj
      },
    },
  }
)

commentSchema.set('toJSON', { getters: true })

export default mongoose.model<CommentDocument>('Comment', commentSchema)

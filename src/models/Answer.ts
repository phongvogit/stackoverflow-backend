import mongoose, { Schema } from 'mongoose'
import commentSchema, { CommentDocument } from './Comment'
import voteSchema, { VoteDocument } from './Vote'

export type AnswerDocument = Document & {
  author: Schema.Types.ObjectId
  text: string
  score: number
  created: Date
  votes: VoteDocument[]
  comments: CommentDocument[]
}

const answerSchema = new mongoose.Schema({
  author: { type: Schema.Types.ObjectId, require: true },
  text: { type: String, require: true },
  score: { type: Number, default: 0 },
  votes: [voteSchema],
  comments: [commentSchema],
  created: { type: Date, default: Date.now },
})

answerSchema.set('toJSON', { getters: true })

export default mongoose.model<AnswerDocument>('Answer', answerSchema)

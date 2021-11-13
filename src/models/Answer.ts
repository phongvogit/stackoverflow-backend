import mongoose, { Schema, Document } from 'mongoose'
import commentSchema, { CommentDocument } from './Comment'
import voteSchema, { VoteDocument } from './Vote'

export type Answer = {
  author: Schema.Types.ObjectId
  text: string
  score?: number
  created?: Date
  votes?: VoteDocument[]
  comments?: CommentDocument[]
}

export type AnswerDocument = Document<Answer>

export const answerSchema = new mongoose.Schema<AnswerDocument>({
  author: { type: Schema.Types.ObjectId, require: true },
  text: { type: String, require: true },
  score: { type: Number, default: 0 },
  votes: [voteSchema],
  comments: [commentSchema],
  created: { type: Date, default: Date.now },
})

answerSchema.set('toJSON', { getters: true })

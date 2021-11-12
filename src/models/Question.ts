/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document, Schema } from 'mongoose'
import answerSchema, { AnswerDocument } from './Answer'
import commentSchema, { CommentDocument } from './Comment'
import voteSchema, { VoteDocument } from './Vote'

export type QuestionDocument = Document & {
  author: Schema.Types.ObjectId
  title: string
  text: string
  tags: string[]
  score?: number
  views?: number
  created: Date
  votes?: VoteDocument[]
  comments?: CommentDocument[]
  answers?: AnswerDocument[]
}

const questionSchema = new mongoose.Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    index: true,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  tags: [{ type: String, required: true }],
  score: { type: Number, default: 0 },
  created: { type: Date, default: Date.now },
  views: { type: Number, default: 0 },
  // votes: [voteSchema],
  // comments: [commentSchema],
  // answers: [answerSchema],
})

export default mongoose.model<QuestionDocument>('Question', questionSchema)

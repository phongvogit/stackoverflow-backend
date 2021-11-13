/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document, Error, ObjectId, Schema } from 'mongoose'
import { Answer, AnswerDocument, answerSchema } from './Answer'
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
  answers?: Answer[] & AnswerDocument
  addAnswer(author: ObjectId, text: string): Promise<QuestionDocument>
  removeAnswer(id: string): Promise<QuestionDocument>
}

const questionSchema = new mongoose.Schema<QuestionDocument>({
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
  votes: [voteSchema],
  comments: [commentSchema],
  answers: [answerSchema],
})

questionSchema.methods = {
  addAnswer: function (
    author: ObjectId,
    text: string
  ): Promise<QuestionDocument> {
    this.answers?.push({ author, text })
    return this.save()
  },
  removeAnswer: function (id: string): Promise<QuestionDocument> {
    const answer = this.answers?.id(id)
    if (!answer) throw new Error('Answer not found')
    answer.remove()
    return this.save()
  },
}

export default mongoose.model<QuestionDocument>('Question', questionSchema)

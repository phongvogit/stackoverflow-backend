/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document, Error, Schema } from 'mongoose'
import { Answer, AnswerDocument, answerSchema } from './Answer'
import { CommentDocument, commentSchema, Comment } from './Comment'
import { Vote, voteSchema } from './Vote'

export type QuestionDocument = Document & {
  author: Schema.Types.ObjectId
  title: string
  text: string
  tags: string[]
  score: number
  views?: number
  created: Date
  votes: Vote[]
  comments?: Comment[] & CommentDocument
  answers?: Answer[] & AnswerDocument
  addAnswer(
    author: Schema.Types.ObjectId,
    text: string
  ): Promise<QuestionDocument>
  removeAnswer(id: string): Promise<QuestionDocument>
  addComment(
    author: Schema.Types.ObjectId,
    body: string
  ): Promise<QuestionDocument>
  removeComment(id: Schema.Types.ObjectId): Promise<QuestionDocument>
  vote(userId: Schema.Types.ObjectId, vote: number): Promise<QuestionDocument>
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
  vote: function (
    userId: Schema.Types.ObjectId,
    vote: number
  ): Promise<QuestionDocument> {
    const existingVote = this.votes?.find(
      (v) => v.user.toString() === userId.toString()
    )
    if (existingVote) {
      //reset score
      this.score -= existingVote.vote
      if (vote === 0) {
        //remove vote
        this.votes = this.votes.filter((v) => v.user !== existingVote.user)
      } else {
        //change vote
        this.score += vote
        existingVote.vote = vote
      }
    } else if (vote !== 0) {
      //new vote
      this.score += vote
      this.votes.push({ user: userId, vote })
    }
    return this.save()
  },
  addAnswer: function (
    author: Schema.Types.ObjectId,
    text: string
  ): Promise<QuestionDocument> {
    this.answers?.push({ author, text, score: 0 })
    return this.save()
  },
  removeAnswer: function (id: string): Promise<QuestionDocument> {
    const answer = this.answers?.id(id)
    if (!answer) throw new Error('Answer not found')
    answer.remove()
    return this.save()
  },
  addComment: function (
    author: Schema.Types.ObjectId,
    body: string
  ): Promise<QuestionDocument> {
    this.comments?.push({ author, body })
    return this.save()
  },
  removeComment: function (
    id: Schema.Types.ObjectId
  ): Promise<QuestionDocument> {
    const comment = this.comments?.id(id)
    if (!comment) throw new Error('Comment not found')
    comment.remove()
    return this.save()
  },
}

export default mongoose.model<QuestionDocument>('Question', questionSchema)

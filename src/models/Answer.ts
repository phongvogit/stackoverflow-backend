import mongoose, { Schema, Document } from 'mongoose'
import { CommentDocument, commentSchema, Comment } from './Comment'
import { Vote, VoteDocument, voteSchema } from './Vote'

export type Answer = {
  author: Schema.Types.ObjectId
  text: string
  score: number
  created?: Date
  votes?: Vote[]
  comments?: Comment[] & CommentDocument
  addComment?(author: Schema.Types.ObjectId, body: string): void
  removeComment?(id: Schema.Types.ObjectId): void
  vote?(userId: Schema.Types.ObjectId, vote: number): void
}

export type AnswerDocument = Document<Answer>

export const answerSchema = new mongoose.Schema<Answer>({
  author: { type: Schema.Types.ObjectId, require: true },
  text: { type: String, require: true },
  score: { type: Number, default: 0 },
  votes: [voteSchema],
  comments: [commentSchema],
  created: { type: Date, default: Date.now },
})

answerSchema.methods = {
  vote: function (userId: Schema.Types.ObjectId, vote: number): void {
    const existingVote = this.votes?.find(
      (v) => v.user.toString() === userId.toString()
    )
    if (existingVote) {
      //reset score
      this.score -= existingVote.vote
      if (vote === 0) {
        //remove vote
        this.votes = this.votes?.filter((v) => v.user !== existingVote.user)
      } else {
        //change vote
        this.score += vote
        existingVote.vote = vote
      }
    } else if (vote !== 0) {
      //new vote
      this.score += vote
      this.votes?.push({ user: userId, vote })
    }
  },
  addComment: function (author: Schema.Types.ObjectId, body: string): void {
    this.comments?.push({ author, body })
  },
  removeComment: function (id: Schema.Types.ObjectId): void {
    const comment = this.comments?.id(id)
    if (!comment) throw new Error('Comment not found')
    comment.remove()
  },
}

answerSchema.set('toJSON', { getters: true })

export default mongoose.model<AnswerDocument>('Answer', answerSchema)

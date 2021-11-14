import mongoose, { Document, Schema } from 'mongoose'

export type Vote = {
  user: Schema.Types.ObjectId
  vote: number
}

export type VoteDocument = Document<Vote>

export const voteSchema = new mongoose.Schema<Vote>({
  user: { type: Schema.Types.ObjectId, require: true },
  vote: { type: Number, required: true },
})

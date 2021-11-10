import mongoose, { Schema } from 'mongoose'

export type VoteDocument = Document & {
  user: Schema.Types.ObjectId
  vote: number
}

const voteSchema = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, require: true },
    vote: { type: Number, required: true },
  },
  {
    _id: false,
  }
)

export default mongoose.model<VoteDocument>('Vote', voteSchema)

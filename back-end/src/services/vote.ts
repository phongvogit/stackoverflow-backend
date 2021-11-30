import { Answer } from '../models/Answer'
import mongoose from 'mongoose'
import { QuestionDocument } from '../models/Question'

const upVoteForQuestion = async (
  id: mongoose.Types.ObjectId,
  question: QuestionDocument
): Promise<QuestionDocument> => {
  return await question.vote(id, 1)
}

const upVoteForAnswer = async (
  id: mongoose.Types.ObjectId,
  question: QuestionDocument,
  answer: Answer
): Promise<QuestionDocument> => {
  await answer.vote?.(id, 1)
  return await question.save()
}

const downVoteForQuestion = async (
  id: mongoose.Types.ObjectId,
  question: QuestionDocument
): Promise<QuestionDocument> => {
  return await question.vote(id, -1)
}

const downVoteForAnswer = async (
  id: mongoose.Types.ObjectId,
  question: QuestionDocument,
  answer: Answer
): Promise<QuestionDocument> => {
  await answer.vote?.(id, -1)
  return await question.save()
}

const unVoteForQuestion = async (
  id: mongoose.Types.ObjectId,
  question: QuestionDocument
): Promise<QuestionDocument> => {
  return await question.vote(id, 0)
}

const unVoteForAnswer = async (
  id: mongoose.Types.ObjectId,
  question: QuestionDocument,
  answer: Answer
): Promise<QuestionDocument> => {
  await answer.vote?.(id, 0)
  return await question.save()
}

export default {
  upVoteForQuestion,
  upVoteForAnswer,
  downVoteForQuestion,
  downVoteForAnswer,
  unVoteForQuestion,
  unVoteForAnswer,
}

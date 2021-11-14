import { Answer } from '../models/Answer'
import { ObjectId } from 'mongoose'
import { QuestionDocument } from '../models/Question'

const upVoteForQuestion = async (
  id: ObjectId,
  question: QuestionDocument
): Promise<QuestionDocument> => {
  return await question.vote(id, 1)
}

const upVoteForAnswer = async (
  id: ObjectId,
  question: QuestionDocument,
  answer: Answer
): Promise<QuestionDocument> => {
  await answer.vote?.(id, 1)
  return await question.save()
}

const downVoteForQuestion = async (
  id: ObjectId,
  question: QuestionDocument
): Promise<QuestionDocument> => {
  return await question.vote(id, -1)
}

const downVoteForAnswer = async (
  id: ObjectId,
  question: QuestionDocument,
  answer: Answer
): Promise<QuestionDocument> => {
  await answer.vote?.(id, -1)
  return await question.save()
}

const unVoteForQuestion = async (
  id: ObjectId,
  question: QuestionDocument
): Promise<QuestionDocument> => {
  return await question.vote(id, 0)
}

const unVoteForAnswer = async (
  id: ObjectId,
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

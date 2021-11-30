import mongoose from 'mongoose'
import { NotFoundError } from '../helpers/apiError'
import { AnswerDocument } from '../models/Answer'
import Question, { QuestionDocument } from '../models/Question'

const createAnswer = async (
  id: mongoose.Types.ObjectId,
  text: string,
  question: QuestionDocument
): Promise<QuestionDocument | null> => {
  await question.addAnswer(id, text)
  return Question.findById(question._id)
}

const loadAnswer = async (
  id: string,
  question: QuestionDocument
): Promise<AnswerDocument> => {
  const answer = await question.answers?.id(id)

  if (!answer) {
    throw new NotFoundError(`Answer ${id} not found`)
  }

  return answer
}

const removeAnswer = async (
  id: string,
  question: QuestionDocument
): Promise<QuestionDocument> => {
  const result = await question.removeAnswer(id)
  return result
}

export default {
  createAnswer,
  loadAnswer,
  removeAnswer,
}

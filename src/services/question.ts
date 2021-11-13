import { NotFoundError } from '../helpers/apiError'
import Question, { QuestionDocument } from '../models/Question'

const create = async (
  question: QuestionDocument
): Promise<QuestionDocument> => {
  return question.save()
}

const listQuestions = async (sortType: string): Promise<QuestionDocument[]> => {
  return Question.find().sort(sortType)
}

const loadQuestion = async (id: string): Promise<QuestionDocument> => {
  const question = await Question.findById(id)

  if (!question) {
    throw new NotFoundError(`Question ${id} not found`)
  }

  return question
}

const showQuestion = async (id: string): Promise<QuestionDocument | null> => {
  const question = await Question.findByIdAndUpdate(
    id,
    { $inc: { views: 1 } },
    { new: true }
  ).populate('answers')

  return question
}

export default {
  create,
  listQuestions,
  loadQuestion,
  showQuestion,
}

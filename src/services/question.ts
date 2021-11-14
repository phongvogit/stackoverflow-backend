import User from '../models/User'
import { NotFoundError } from '../helpers/apiError'
import Question, { QuestionDocument } from '../models/Question'

const loadQuestion = async (id: string): Promise<QuestionDocument> => {
  const question = await Question.findById(id)

  if (!question) {
    throw new NotFoundError(`Question ${id} not found`)
  }

  return question
}

const create = async (
  question: QuestionDocument
): Promise<QuestionDocument> => {
  return question.save()
}

const listQuestions = async (sortType: string): Promise<QuestionDocument[]> => {
  return Question.find().sort(sortType)
}

const showQuestion = async (id: string): Promise<QuestionDocument | null> => {
  const question = await Question.findByIdAndUpdate(
    id,
    { $inc: { views: 1 } },
    { new: true }
  ).populate('answers')

  return question
}

const listByTags = async (
  sortType: string,
  tags: string[]
): Promise<QuestionDocument[]> => {
  return await Question.find({ tags: { $all: tags } }).sort(sortType)
}

const listByUser = async (
  sortType: string,
  username: string
): Promise<QuestionDocument[]> => {
  const author = await User.findOne({ username })
  return await Question.find({ author: author?.id }).sort(sortType)
}

const removeQuestion = async (
  question: QuestionDocument
): Promise<QuestionDocument> => {
  return await question.remove()
}

export default {
  create,
  listQuestions,
  loadQuestion,
  showQuestion,
  listByTags,
  listByUser,
  removeQuestion,
}

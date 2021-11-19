import { NotFoundError } from '../helpers/apiError'
import { Queries } from '../models/Common'
import Question, {
  QuestionDocument,
  QuestionResponse,
} from '../models/Question'
import User from '../models/User'
import { facetList } from '../util/usefulFunction'

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

const listQuestions = async (queries: Queries): Promise<QuestionResponse> => {
  const questions = await facetList(Question, queries)
  return questions
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
  queries: Queries,
  tags: string[]
): Promise<QuestionResponse> => {
  const options = [{ $match: { tags: { $all: tags } } }]
  const result = await facetList(Question, queries, options)
  return result
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

const search = async (
  queries: Queries,
  title: string
): Promise<QuestionResponse> => {
  const option = [
    {
      $match: { title: { $regex: title, $options: 'i' } },
    },
  ]
  const result = await facetList(Question, queries, option)

  return result
}

export default {
  create,
  listQuestions,
  loadQuestion,
  showQuestion,
  listByTags,
  listByUser,
  removeQuestion,
  search,
}

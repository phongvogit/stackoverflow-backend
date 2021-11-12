import { QuestionDocument } from '../models/Question'

const create = async (
  question: QuestionDocument
): Promise<QuestionDocument> => {
  return question.save()
}

export default {
  create,
}

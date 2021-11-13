import Question, { QuestionDocument } from '../models/Question'

const listTags = async (): Promise<QuestionDocument[]> => {
  const result = await Question.aggregate([
    { $project: { tags: 1 } },
    { $unwind: '$tags' },
    { $group: { _id: '$tags', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ])
  return result
}

const searchTags = async (tag: string): Promise<QuestionDocument[]> => {
  const result = await Question.aggregate([
    { $project: { tags: 1 } },
    { $unwind: '$tags' },
    { $group: { _id: '$tags', count: { $sum: 1 } } },
    { $match: { _id: { $regex: tag, $options: 'i' } } },
    { $sort: { count: -1 } },
  ])
  console.log(result)
  return result
}

export default {
  listTags,
  searchTags,
}

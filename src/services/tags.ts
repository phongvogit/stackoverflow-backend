import Question, { QuestionDocument } from '../models/Question'
import { Queries } from '../models/Common'
import { facetList } from '../util/usefulFunction'
import { TagResponse } from '../models/Tag'

const listPopularTags = async (queries: Queries): Promise<TagResponse> => {
  queries._limit = queries._limit ? queries._limit : 10
  queries._sortType = '-count'

  const tags = [
    { $project: { tags: 1 } },
    { $unwind: '$tags' },
    { $group: { _id: '$tags', count: { $sum: 1 } } },
  ]
  const result = await facetList(Question, queries, tags)
  return result
}

const listTags = async (queries: Queries): Promise<TagResponse> => {
  const options = [
    { $project: { tags: 1 } },
    { $unwind: '$tags' },
    { $group: { _id: '$tags', count: { $sum: 1 } } },
  ]
  const result = await facetList(Question, queries, options)
  return result
}

const searchTags = async (
  queries: Queries,
  tag: string
): Promise<TagResponse> => {
  const options = [
    { $project: { tags: 1 } },
    { $unwind: '$tags' },
    { $group: { _id: '$tags', count: { $sum: 1 } } },
    { $match: { _id: { $regex: tag, $options: 'i' } } },
  ]
  const result = await facetList(Question, queries, options)
  return result
}

export default {
  listTags,
  searchTags,
  listPopularTags,
}

import { QuestionDocument } from '../models/Question'
import { ObjectId } from 'mongoose'
import { Answer, AnswerDocument } from '../models/Answer'
import { NotFoundError } from '../helpers/apiError'

const loadCommentForQuestion = async (
  id: string,
  question: QuestionDocument
): Promise<QuestionDocument> => {
  const comment = await question.comments?.id(id)

  if (!comment) {
    throw new NotFoundError(`Comment ${id} not found`)
  }

  return comment
}

const loadCommentForAnswer = async (
  id: string,
  answer: Answer
): Promise<QuestionDocument> => {
  const comment = await answer.comments?.id(id)

  if (!comment) {
    throw new NotFoundError(`Comment ${id} not found`)
  }

  return comment
}

const createCommentToAnswer = async (
  authorId: ObjectId,
  question: QuestionDocument,
  answer: Answer,
  body: string
): Promise<QuestionDocument | undefined> => {
  answer.addComment?.(authorId, body)
  const savedQuestion = await question.save()
  return savedQuestion
}

const createCommentToQuestion = async (
  authorId: ObjectId,
  question: QuestionDocument,
  body: string
): Promise<QuestionDocument | undefined> => {
  return question.addComment?.(authorId, body)
}

const removeCommentForAnswer = async (
  commentId: ObjectId,
  question: QuestionDocument,
  answer: Answer
): Promise<QuestionDocument> => {
  await answer.removeComment?.(commentId)
  const savedQuestion = await question.save()
  return savedQuestion
}

const removeCommentForQuestion = async (
  commentId: ObjectId,
  question: QuestionDocument
): Promise<QuestionDocument> => {
  const savedQuestion = await question.removeComment(commentId)
  return savedQuestion
}

export default {
  createCommentToAnswer,
  createCommentToQuestion,
  loadCommentForAnswer,
  loadCommentForQuestion,
  removeCommentForQuestion,
  removeCommentForAnswer,
}

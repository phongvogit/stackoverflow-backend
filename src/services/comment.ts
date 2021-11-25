import Question, { QuestionDocument } from '../models/Question'
import * as mongoose from 'mongoose'
import { Answer } from '../models/Answer'
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
  authorId: mongoose.Types.ObjectId,
  question: QuestionDocument,
  answer: Answer,
  body: string
): Promise<QuestionDocument | null> => {
  answer.addComment?.(authorId, body)
  return await question.save()
}

const createCommentToQuestion = async (
  authorId: mongoose.Types.ObjectId,
  question: QuestionDocument,
  body: string
): Promise<QuestionDocument | null> => {
  return await question.addComment?.(authorId, body)
}

const removeCommentForAnswer = async (
  commentId: mongoose.Types.ObjectId,
  question: QuestionDocument,
  answer: Answer
): Promise<QuestionDocument> => {
  await answer.removeComment?.(commentId)
  return await question.save()
}

const removeCommentForQuestion = async (
  commentId: mongoose.Types.ObjectId,
  question: QuestionDocument
): Promise<QuestionDocument> => {
  return await question.removeComment(commentId)
}

export default {
  createCommentToAnswer,
  createCommentToQuestion,
  loadCommentForAnswer,
  loadCommentForQuestion,
  removeCommentForQuestion,
  removeCommentForAnswer,
}

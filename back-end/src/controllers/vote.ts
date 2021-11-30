import { NextFunction, Response } from 'express'
import VoteService from '../services/vote'

export const upVote = async (req: any, res: Response, next: NextFunction) => {
  const { id } = req.user
  if (req.answer) {
    const question = await VoteService.upVoteForAnswer(
      id,
      req.question,
      req.answer
    )
    return res.send(question)
  }
  const question = await VoteService.upVoteForQuestion(id, req.question)
  return res.send(question)
}

export const downVote = async (req: any, res: Response, next: NextFunction) => {
  const { id } = req.user
  if (req.answer) {
    const question = await VoteService.downVoteForAnswer(
      id,
      req.question,
      req.answer
    )
    return res.send(question)
  }
  const question = await VoteService.downVoteForQuestion(id, req.question)
  return res.send(question)
}

export const unVote = async (req: any, res: Response, next: NextFunction) => {
  const { id } = req.user
  if (req.answer) {
    const question = await VoteService.unVoteForAnswer(
      id,
      req.question,
      req.answer
    )
    return res.send(question)
  }
  const question = await VoteService.unVoteForQuestion(id, req.question)
  return res.send(question)
}

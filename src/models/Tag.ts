import { Pagination } from './Common'

export type Tag = {
  _id: string
  count: number
}

export type TagResponse = {
  tags: Tag[]
  pagination: Pagination
}

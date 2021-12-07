import { Template } from './template'
import Comment from './comment'
import { Approved } from './approved'

export interface Part {
  _id: string
  updatedAt: string
  createdAt: string
  template: Template
  name: string
  values: {
    key: string
    value: string
    _id: string
  }[]
  picture: string[]
  comments: Comment[]
  commentsCount: number
  hasUpvoted: boolean
  received_likes: number
  credit?: string
  approved: Approved
}

export interface PartWithoutTemplate extends Omit<Part, 'template'> {
  template: string
}

export interface PartValueField {
  key: string
  value: string | boolean | number
  text?: string
}

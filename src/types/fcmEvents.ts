import { PublicUser } from './user'

export enum UserEventType {
  'postReply' = 'postReply',
  'commentReply' = 'commentReply',
  'approveKeyb' = 'approveKeyb',
  'approvePart' = 'approvePart',
}

export default interface UserEvent {
  _id: string
  content: string
  contentId?: string
  receiver: PublicUser
  createdAt: string
  postId?: string
  partId?: string
  commentId?: string
  updatedAt: string
  author: PublicUser
  seen: boolean
  type: UserEventType
}

import { PublicUser } from './user'

export default interface Comment {
  _id: string
  text: string
  parentComment: string | null
  author?: PublicUser
  post?: string
  part?: string
  upvoteCount?: number
  createdAt: string
  updatedAt: string
  userUpvoted: boolean
  tree: string[]
  replies?: Comment[]
  active?: boolean
}

export interface CommentSummary {
  comments: Comment[]
  totalPostComments: number
}

export interface SingleCommentSummary {
  comment: Comment
  children: Comment[]
  totalPostComments: number
}

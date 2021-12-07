import axios from '.'
import Comment, { CommentSummary, SingleCommentSummary } from '@/types/comment'

export const fetchComment = async (data: { commentId: string; context?: any }): Promise<SingleCommentSummary> => {
  const res = await axios.get(`/comment/${data.commentId}`, { context: data.context })

  return res.data
}

export const fetchUserComments = async (data: { userId: string; context: any }): Promise<CommentSummary> => {
  const res = await axios.get(`/comment/user?userId=${data.userId}`, { context: data.context })

  return res.data
}

export interface FetchCommentsData {
  postId?: string
  partId?: string
  context?: any
}

export const fetchPartComments = async (data: FetchCommentsData): Promise<CommentSummary> => {
  const res = await axios.get(`/comment/part?partId=${data.partId}`, { context: data.context })

  return res.data
}

export interface AddCommentDto {
  text: string
  parentComment?: string
  post?: string
  part?: string
  tree: string[]
}

export const addComment = async (dto: AddCommentDto): Promise<Comment> => {
  const { data } = await axios.post('/comment', dto)

  return data
}

export interface EditCommentData {
  commentId: string
  text: string
}

export const editComment = async (data: EditCommentData) => {
  const res = await axios.patch('/comment', data)

  return res.data
}

type DeleteCommentData = {
  commentId: string
}

export const deleteComment = async (data: DeleteCommentData) => {
  const res = await axios.delete('/comment?commentId=' + data.commentId)

  return res.data
}

export interface UpvoteCommentData {
  commentId: string
}

export const upvoteComment = async (data: UpvoteCommentData) => {
  const res = await axios.post('/comment/upvote', data)

  return res.data as boolean
}

export interface DownvoteCommentData {
  commentId: string
}

export const downvoteComment = async (data: DownvoteCommentData) => {
  const res = await axios.post('/comment/downvote', data)

  return res.data
}

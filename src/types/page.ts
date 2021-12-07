import { PublicUser } from './user'

export default interface Page {
  _id: string
  name: string
  content: string
  author: PublicUser
  createdAt: string
  updatedAt: string
}

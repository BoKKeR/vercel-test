import { PublicUser } from './user'

export type Approved = {
  by: null | PublicUser
  status: boolean
}

import { PublicUser } from './user'
import { Part, PartWithoutTemplate } from './part'
import Comment from './comment'
import { KeybioQMKConfig } from './qmkconfig'
import { UrlPart } from '@/network/publicBuilds.network'
import { Approved } from './approved'

export interface Keyb {
  _id: string
  createdAt: string
  updatedAt: string
  user?: string
  author: PublicUser
  description: string
  name: string
  qmkConfigs: KeybioQMKConfig[]
  picture: string[]
  parts: PartWithoutTemplate[]
  urlParts: UrlPart[]
  commentsCount: number
  comments: Comment[]
  hasUpvoted: boolean
  received_likes: number
  approved: Approved
}

export interface SingleKeyb extends Omit<Keyb, 'parts'> {
  parts: Part[]
}

import { UrlPart } from '@/network/publicBuilds.network'
import { Part } from './part'
import QMKConfig from './qmkconfig'
import { PublicUser } from './user'

export type DraftKeyb = {
  name: string
} & Partial<{
  _id: string
  createdAt: string
  updatedAt: string
  user: string
  author: PublicUser
  description: string
  qmkConfigs: QMKConfig[]
  picture: string[]
  parts: Part[]
  urlParts: UrlPart[]
}>

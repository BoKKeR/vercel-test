import { Part } from './part'
import { UrlPart } from '@/network/publicBuilds.network'
import { PublicUser } from './user'

type PublicBuild = {
  _id: string
  createdAt: string
  updatedAt: string
  name: string
  parts: Part[]
  urlParts: UrlPart[]
  author?: PublicUser
  token?: string
}

export default PublicBuild

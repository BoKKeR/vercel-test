import Page from './page'
import { Part } from './part'
import { Keyb } from './keyb'
import { PublicUser } from './user'

export interface Sitemap {
  users: Partial<PublicUser>[]
  parts: Partial<Part>[]
  markdownPages: Partial<Page>[]
  posts: Partial<Keyb>[]
}

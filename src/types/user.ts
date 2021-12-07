export interface PublicUser {
  _id: string
  username: string
  avatar: string
  createdAt: string
  updatedAt: string
  received_likes: number
  contributions: number
  role?: string
}

export interface PrivateUser extends PublicUser {
  liked_posts: string[]
  liked_parts: string[]
  email?: string
  email_verified?: boolean
}

export enum UserPermissions {
  MANAGE_COMMENTS = 'MANAGE_COMMENTS',
  BAN_USERS = 'BAN_USERS',
  MANAGE_PAGES = 'MANAGE_PAGES',
  MANAGE_PARTS = 'MANAGE_PARTS',
  CREATE_PARTS = 'CREATE_PARTS',
  MANAGE_REPORTS = 'MANAGE_REPORTS',
}

export enum UserTypes {
  USER = 'USER',
  MOD = 'MODERATOR',
  ADMIN = 'ADMIN',
}

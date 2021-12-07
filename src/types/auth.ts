export interface KeycloakUser {
  createdAt: string
  email: string
  email_verified: boolean
  google?: {
    sub: string
    name: string
    picture: string
  }
  image: null
  name: null
  picture: string
  preferred_username: string
  sub: string
}

export interface TokenUser {
  exp: number
  iat: number
  jti: string
  iss: string
  sub: string
  typ: string
  azp: string
  session_state: string
  acr: string
  realm_access: {
    roles: string[]
  }
  resource_access: {
    [key: string]: {
      roles: string[]
    }
  }
  google?: {
    name: string
    picture: string
    email: string
  }
  steam?: {
    given_name: string
    name: string
    picture: string
    sub: string
    website: string
  }
  scope: string
  preferred_username: string
  email: string
  email_verified: boolean
  picture: string
  createdAt: number
}

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

export interface Session {
  accessToken: string
  expires: string
  user: KeycloakUser
  tokenUser: TokenUser
  dbUser: PublicUser | PrivateUser
}

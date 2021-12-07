export default interface TokenUser {
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

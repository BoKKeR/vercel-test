import { PublicUser } from './user'

export interface GoogleSession {
  provider: 'google'
  email: string
  firstName: string
  lastName: string
  picture: string
  accessToken: string
}

export interface GoogleUserDto extends GoogleSession {}

export interface SteamSession {
  provider: 'steam'
  _json: {
    steamid: string
    communityvisibilitystate: number
    profilestate: number
    personaname: string
    commentpermission: number
    profileurl: string
    avatar: string
    avatarmedium: string
    avatarfull: string
    avatarhash: string
    lastlogoff: number
    personastate: number
    realname: string
    primaryclanid: string
    timecreated: number
    personastateflags: number
    loccountrycode: string
  }
  steamid: string
  username: string
  name: string
  profile: string
  avatar: {
    small: string
    medium: string
    large: string
  }
}

export interface SteamUserDto {
  provider: 'steam'
  id: string
  username: string
  profileURL: string
  realName: string
  countryCode: string
  avatar: string
}

export type OAuthSession = GoogleSession | SteamSession
export type OAuthUserDto = GoogleUserDto | SteamUserDto

export interface OAuthVerifyResponse {
  signed_up: boolean
  user?: PublicUser
  token?: string
}

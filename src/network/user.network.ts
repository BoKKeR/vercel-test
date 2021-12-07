import axios from '.'
import { PrivateUser, PublicUser } from '@/types/auth'
import { Paginated } from '@/types/pagination'

export const fetchProfileByUserId = async (data: { userId: string }): Promise<PublicUser> => {
  const res = await axios.get(`/user/userid/${data.userId}`)

  return res.data
}
interface FetchUserDto {
  page?: number
  sort?: 'asc' | 'desc'
  sortKey?: keyof PublicUser
}

export const fetchUsers = async (dto: FetchUserDto = {}): Promise<Paginated<PublicUser[]>> => {
  const query = new URLSearchParams()

  Object.entries(dto).forEach(([key, value]) => {
    query.set(key, value.toString())
  })

  const res = await axios.get(`/user?${query.toString()}`)
  return res.data
}

export const fetchProfileByUsername = async (data: { username: string; context: any }): Promise<PublicUser> => {
  const res = await axios.get(`/user/username/${data.username}`, { context: data.context })
  return res.data
}

export const updateLocalUser = async (user: Partial<PublicUser> = {}) => {
  const res = await axios.post(`/user/localUser`, user)
  return res.data
}

export const ownPrivate = async (): Promise<PrivateUser> => {
  const res = await axios.post(`/user/me`)
  return res.data
}

export const fetchUsersByUsername = async (data: { username: string }): Promise<PublicUser[]> => {
  const res = await axios.get(`/user/search/${encodeURIComponent(data.username)}`)
  return res.data
}

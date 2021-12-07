import axios from '.'
import { Keyb, SingleKeyb } from '@/types/keyb'
import { Paginated } from '../types/pagination'
import QMKConfig from '@/types/qmkconfig'
// import { UrlPart } from './publicBuilds'

export type FetchKeybsOptions = {
  sort?: 'desc' | 'asc'
  page?: number
  search?: string
  parts?: string[]
  userId?: string
  context?: any
}

export type FetchKeybsResponse = Paginated<Keyb[]>

export const fetchKeybs = async (options: FetchKeybsOptions = {}): Promise<FetchKeybsResponse> => {
  const queryString = new URLSearchParams()

  if (options.sort) {
    queryString.set('sort', options.sort)
  }

  if (options.search) {
    queryString.set('search', encodeURIComponent(options.search))
  }

  if (options.page) {
    queryString.set('page', options.page.toString())
  }

  if (options.parts) {
    for (const part of options.parts) {
      queryString.append('parts', part)
    }
  }

  if (options.userId) {
    queryString.set('userId', options.userId)
  }

  const { data } = await axios.get(`/keyb?${queryString.toString()}`, { context: options.context })

  return data
}

export const fetchKeyb = async (id: string, context?: any): Promise<Keyb> => {
  const res = await axios.get(`/keyb/${id}`, { context })

  return res.data
}

export type UpdateKeybDto = {
  name?: string
  description?: string
  parts?: string[]
}

export const updateKeyb = async (id: string, data: UpdateKeybDto): Promise<SingleKeyb> => {
  const res = await axios.patch(`/keyb/${id}`, data)
  return res.data
}

export type AddKeybDto = {
  name: string
  description: string
  picture: string[]
  parts: string[]
  // urlParts: UrlPart[]
  qmkConfigs: QMKConfig[]
}

export const addKeyb = async (data: AddKeybDto): Promise<Keyb> => {
  const res = await axios.post('/keyb', data)
  return res.data
}

export const deleteKeyb = async (postId: string) => {
  const res = await axios.delete(`/keyb/${postId}`)
  return res.data
}

export const approveKeyb = async (postId: string) => {
  const res = await axios.get(`/keyb/approve/${postId}`)
  return res.data
}

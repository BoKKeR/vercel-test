import axios from '.'
import { Paginated } from '../types/pagination'
import QMKConfig from '@/types/qmkconfig'
import { UrlPart } from './publicBuilds.network'
import { DraftKeyb } from '@/types/draftKeyb'

export type FetchDraftKeybsOptions = {
  sort?: 'desc' | 'asc'
  page?: number
  sortKey?: keyof DraftKeyb
  search?: string
  parts?: string[]
  context?: any
}

export type FetchDraftKeybsResponse = Paginated<DraftKeyb[]>

export const fetchDraftKeybs = async (options: FetchDraftKeybsOptions = {}): Promise<FetchDraftKeybsResponse> => {
  const queryString = new URLSearchParams()

  if (options.sort) {
    queryString.set('sort', options.sort)
  }

  if (options.sortKey) {
    queryString.set('sortKey', options.sortKey.toString())
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

  const { data } = await axios.get(`/draftKeyb?${queryString.toString()}`, { context: options.context })

  return data
}

export const fetchDraftKeyb = async (id: string): Promise<DraftKeyb> => {
  const res = await axios.get(`/draftKeyb/${id}`)
  return res.data
}

export type UpdateDraftKeybDto = {
  name: string
  picture?: string[]
  description?: string
  parts?: string[]
  qmkConfigs?: QMKConfig[]
  urlParts?: UrlPart[]
}

export const updateDraftKeyb = async (id: string, data: UpdateDraftKeybDto): Promise<DraftKeyb> => {
  const res = await axios.patch(`/draftKeyb/${id}`, data)
  return res.data
}

export type AddDraftKeybData = {
  name: string
  description?: string
  picture?: string[]
  parts?: string[]
  urlParts?: UrlPart[]
  qmkConfigs?: QMKConfig[]
}

export const addDraftKeyb = async (data: AddDraftKeybData): Promise<DraftKeyb> => {
  const res = await axios.post('/draftKeyb', data)
  return res.data
}

export const deleteDraftKeyb = async (postId: string) => {
  const res = await axios.delete(`/draftKeyb/${postId}`)
  return res.data
}

export const approveDraftKeyb = async (postId: string) => {
  const res = await axios.get(`/draftKeyb/approve/${postId}`)
  return res.data
}

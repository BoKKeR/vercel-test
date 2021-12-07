import { Keyb } from '@/types/keyb'
import axios from '.'
import { Paginated, PaginationOptions } from '../types/pagination'

export type FetchPostsOptions = {
  parts?: string[]
  search?: string
  userId?: string
  context?: any
} & PaginationOptions

export const fetchPosts = async (options: FetchPostsOptions, context?: any): Promise<Paginated<Keyb[]>> => {
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

  if (options.userId) {
    queryString.set('userId', options.userId)
  }

  const { data } = await axios.get(`/post?${queryString.toString()}`, { context: options.context })

  return data as Paginated<Keyb[]>
}

interface FetchUserPostsOptions {
  userId: string
}

export const fetchUserPosts = async (options: FetchUserPostsOptions): Promise<Keyb[]> => {
  const res = await axios.get(`/keyb/userid/${options.userId}`)

  return res.data
}

export const fetchBuildsWithParts = async (parts: string[]): Promise<Paginated<Keyb[]>> => {
  let params = new URLSearchParams()

  parts.forEach((_part) => {
    params.append('parts', _part)
  })

  const res = await axios.get(`/keyb?${params.toString()}`)
  return res.data
}

export const fetchPost = async (id: string): Promise<Keyb> => {
  const res = await axios.get(`/keyb/${id}`)
  return res.data
}

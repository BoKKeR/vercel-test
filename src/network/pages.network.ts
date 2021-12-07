import Page from '../types/page'
import axios from '.'
import { Paginated } from '../types/pagination'

export type FetchPage = Paginated<Page[]>

export type FetchPagesOptions = {
  sort?: 'desc' | 'asc'
  parts?: string[]
  search?: string
  page?: number
}

export type UpdatePageDto = {
  content?: string
  name?: string
}

export type CreatePageDto = {
  content: string
  name: string
  _id?: string
}

export const fetchPages = async (options: FetchPagesOptions = {}): Promise<FetchPage> => {
  const queryPage = options.page && `page=${options.page}`
  const querySort = options.sort && `sort=${options.sort}`
  const querySearch = options.search && `search=${options.search}`

  const query = [queryPage, querySort, querySearch]
  const queryString = query.filter(Boolean).join('&')

  const res = await axios.get('/page?' + queryString)

  return res.data
}

export const fetchSinglePage = async (id: string) => {
  const res = await axios.get(`/page/${id}`)

  return res.data as Page
}

export const createPage = async (dto: CreatePageDto) => {
  const res = await axios.post(`/page/`, dto)
  return res.data as Page
}

export const updatePage = async (id: string, dto: UpdatePageDto) => {
  const res = await axios.patch(`/page/${id}`, dto)
  return res.data as Page
}

export const deletePage = async (id: string) => {
  await axios.delete(`/page/${id}`)
}

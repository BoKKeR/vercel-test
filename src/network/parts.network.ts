import axios from '.'
import { Part, PartValueField } from '@/types/part'
import { Paginated } from '../types/pagination'

export type FetchPartsOptions = {
  page?: number
  sort?: 'desc' | 'asc'
  search?: string
  template?: string
  userId?: string
  context?: any
}

export const fetchParts = async (options: FetchPartsOptions = {}): Promise<Paginated<Part[]>> => {
  const queryPage = options.page && `page=${options.page}`
  const querySort = options.sort && `sort=${options.sort}`
  const querySearch = options.search && `search=${encodeURIComponent(options.search)}`
  const queryTemplate = options.template && `template=${options.template}`

  const query = [queryPage, querySort, querySearch, queryTemplate]
  const queryString = query.filter(Boolean).join('&')

  const res = await axios.get('/part?' + queryString, { context: options.context })

  return res.data
}

export const fetchPart = async (id: string, context?: any): Promise<Part> => {
  const res = await axios.get(`/part/${id}`, { context })
  return res.data
}

export type AddPartDto = {
  name: string
  template: string
  values: PartValueField[]
  picture: string[]
}

export const addPart = async (dto: AddPartDto): Promise<Part> => {
  const res = await axios.post('/part', dto)

  return res.data
}

export const approvePart = async (id: string) => {
  await axios.get(`/part/approve/${id}`)
}
export const deletePart = async (id: string) => {
  await axios.delete(`/part/${id}`)
}

export type UpdatePartDto = {
  _id: string
  name: string
  picture: string[]
}

export const updatePart = async (dto: UpdatePartDto): Promise<Part> => {
  const res = await axios.patch('/part', dto)

  return res.data
}

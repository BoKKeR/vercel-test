import axios from '.'
import PublicBuild from '@/types/publicBuild'
import { Paginated, PaginationOptions } from '../types/pagination'
import { Template } from '@/types/template'

export const fetchPublicBuild = async (id: string, context): Promise<PublicBuild> => {
  const res = await axios.get(`/publicBuild/${id}`, { context })
  return res.data
}

export type FetchPublicBuildsOptions = PaginationOptions & {
  search?: string
  parts?: string[]
}

export type FetchPublicBuildsResponse = Paginated<PublicBuild[]>

export const fetchPublicBuilds = async (options: FetchPublicBuildsOptions = {}): Promise<FetchPublicBuildsResponse> => {
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

  const { data } = await axios.get(`/publicBuild?${queryString.toString()}`)

  return data
}

export type UrlPart = {
  url: string
  template: Template
}

export type AddPublicBuildDto = {
  name: string
  parts: string[]
  urlParts: UrlPart[]
  token?: string
}

export const addPublicBuild = async (data: AddPublicBuildDto): Promise<PublicBuild> => {
  const res = await axios.post('/publicBuild', data)
  return res.data
}

export type UpdatePublicBuildDto = Partial<AddPublicBuildDto> & { _id: string }

export const updatePublicBuild = async (data: UpdatePublicBuildDto): Promise<PublicBuild> => {
  const res = await axios.patch('/publicBuild', data)
  return res.data
}

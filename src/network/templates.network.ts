import axios from '.'
import { Template } from '@/types/template'

export const fetchTemplate = async (id: string): Promise<Template> => {
  const res = await axios.get(`/template/${id}`)

  return res.data
}

export const fetchTemplates = async (): Promise<Template[]> => {
  const res = await axios.get('/template')

  return res.data
}

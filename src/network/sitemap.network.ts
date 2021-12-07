import axios from 'axios'
import { Sitemap } from '../types/sitemap'
import { AxiosResponse } from 'axios'
import config from '../config'

export const fetchSitemapData = async (): Promise<AxiosResponse<Sitemap>> => {
  return axios.get('/sitemap', { baseURL: config.KB_BACKEND_URL })
}

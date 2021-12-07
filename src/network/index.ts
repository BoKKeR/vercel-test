import axiosOriginal, { AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios'
import config from '../config'
import Router from 'next/router'
import { getSession, signOut } from 'next-auth/client'

declare module 'axios' {
  export interface AxiosRequestConfig {
    context?: any
  }
}

const axios = axiosOriginal.create({
  baseURL: config.KB_BACKEND_URL,
  timeout: 500000,
})

export const axiosLoggedOut = axiosOriginal.create({
  baseURL: config.KB_BACKEND_URL,
  timeout: 500000,
})

axios.interceptors.response.use(
  (res) => res,
  async (error) => {
    const response = error.response as AxiosResponse
    if (!response) {
      throw error
    }

    const statusCode = response.status

    if (statusCode !== 401) {
      throw error
    }

    delete axios.defaults.headers.common.authorization

    if (typeof window !== 'undefined') {
      const session = await getSession()

      if (session?.accessToken) {
        signOut()
      } else {
        throw error
      }
    } else {
      throw error
    }
  }
)

axios.interceptors.request.use(async (request) => {
  // if (typeof window !== 'undefined') {
  //   const firebase = await import('@/utils/firebase.utils')
  //   firebase.default.performance()
  // }

  const session = await getSession(request.context)

  const token = session?.accessToken

  if (token) {
    request.headers.authorization = `Bearer ${token}`
  }

  return request
})

export default axios

/*


*/

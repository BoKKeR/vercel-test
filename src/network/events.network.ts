import UserEvent from '@/types/fcmEvents'
import { Paginated } from '@/types/pagination'
import axios from '.'

type FetchUserEventsOptions = {
  limit?: number
  page?: number
  context?: any
}

export const fetchUserEvents = async (options: FetchUserEventsOptions): Promise<Paginated<UserEvent[]>> => {
  const searchParams = new URLSearchParams()

  if (options.limit) {
    searchParams.set('limit', options.limit.toString())
  }

  if (options.page) {
    searchParams.set('page', options.page.toString())
  }

  const res = await axios.get(`/user-event?${searchParams.toString()}`, { context: options.context })

  return res.data
}

export const resetUserEvents = async () => {
  const res = await axios.post('/user-event/reset')

  return res.data
}

export const resetUserEvent = async (id: string) => {
  const res = await axios.post(`/user-event/reset/${id}`)

  return res.data
}

import { AnyAction } from 'redux'
import { Paginated } from '../../types/pagination'
import ReduxActionTypes from '../actions/types'
import UserEvent from '@/types/fcmEvents'

export type EventsState = {
  events?: Paginated<UserEvent[]>
  error?: string
  loading: boolean
  lastUpdate: number
}

const eventInitialValue: Paginated<UserEvent[]> = {
  docs: [],
  totalDocs: 0,
  limit: 15,
  totalPages: 1,
  page: 1,
  pagingCounter: 1,
  hasPrevPage: false,
  hasNextPage: false,
}

const eventsReducer = (
  state: EventsState = { events: eventInitialValue, loading: false, error: null, lastUpdate: Date.now() },
  action: AnyAction
): EventsState => {
  switch (action.type) {
    // Posts [Keybs and Parts]
    case ReduxActionTypes.FETCH_EVENTS.REQUESTED:
      return { ...state, loading: true }

    case ReduxActionTypes.FETCH_EVENTS.FAILED:
      return { ...state, loading: false, error: action.payload }

    case ReduxActionTypes.FETCH_EVENTS.SUCCEEDED:
      return { ...state, loading: false, events: action.payload.data, lastUpdate: Date.now() }

    default:
      return state
  }
}

export default eventsReducer

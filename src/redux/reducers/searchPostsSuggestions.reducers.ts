import { AnyAction } from 'redux'
import ReduxActionTypes from '../actions/types'
import { PrivateUser } from '@/types/auth'

export type SearchPostsSuggestionsState = {
  suggestions?: any
  error?: string
  loading: boolean
}

const searchPostsReducer = (
  state: SearchPostsSuggestionsState = { suggestions: [], loading: false, error: null },
  action: AnyAction
): SearchPostsSuggestionsState => {
  switch (action.type) {
    case ReduxActionTypes.FETCH_SEARCH_POSTS_SUGGESTIONS.REQUESTED:
      return { ...state, loading: true }

    case ReduxActionTypes.FETCH_SEARCH_POSTS_SUGGESTIONS.FAILED:
      return { ...state, loading: false, error: action.payload }

    case ReduxActionTypes.FETCH_SEARCH_POSTS_SUGGESTIONS.SUCCEEDED:
      return { ...state, loading: false, suggestions: action.payload.data }

    default:
      return state
  }
}

export default searchPostsReducer

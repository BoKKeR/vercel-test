import { AnyAction } from 'redux'
import { Paginated } from '../../types/pagination'
import { Keyb } from '../../types/keyb'
import ReduxActionTypes from '../actions/types'

export type PostsState = {
  posts?: Paginated<Keyb[]>
  error?: string
  loading: boolean
}

const postInitialValues: Paginated<Keyb[]> = {
  docs: [],
  totalDocs: 0,
  limit: 12,
  totalPages: 1,
  page: 1,
  pagingCounter: 1,
  hasPrevPage: false,
  hasNextPage: false,
}

const postsReducer = (
  state: PostsState = { posts: postInitialValues, loading: false, error: null },
  action: AnyAction
): PostsState => {
  switch (action.type) {
    // Posts [Keybs and Parts]
    case ReduxActionTypes.FETCH_POST.REQUESTED:
      return { ...state, loading: true }

    case ReduxActionTypes.FETCH_POST.FAILED:
      return { ...state, loading: false, error: action.payload }

    case ReduxActionTypes.FETCH_POST.SUCCEEDED:
      if (action.payload.options.append) {
        action.payload.data.docs = [...state.posts.docs, ...action.payload.data.docs]
      }

      return { ...state, loading: false, posts: action.payload.data }

    // Keybs
    case ReduxActionTypes.FETCH_KEYBS.REQUESTED:
      return { ...state, loading: true }

    case ReduxActionTypes.FETCH_KEYBS.FAILED:
      return { ...state, loading: false, error: action.payload }

    case ReduxActionTypes.FETCH_KEYBS.SUCCEEDED:
      if (action.payload.options.append) {
        action.payload.data.docs = [...state.posts.docs, ...action.payload.data.docs]
      }

      return {
        ...state,
        loading: false,
        posts: action.payload.data,
      }

    // Parts
    case ReduxActionTypes.FETCH_PARTS.REQUESTED:
      return { ...state, loading: true }

    case ReduxActionTypes.FETCH_PARTS.FAILED:
      return { ...state, loading: false, error: action.payload }

    case ReduxActionTypes.FETCH_PARTS.SUCCEEDED:
      if (action.payload.options.append) {
        action.payload.posts.docs = [...state.posts.docs, ...action.payload.posts.docs]
      }

      return { ...state, loading: false, posts: action.payload.data }

    default:
      return state
  }
}

export default postsReducer

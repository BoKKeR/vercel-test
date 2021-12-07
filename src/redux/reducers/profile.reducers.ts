import { AnyAction } from 'redux'
import ReduxActionTypes from '../actions/types'
import { PrivateUser } from '@/types/auth'

export type ProfileState = {
  profile?: PrivateUser
  error?: string
  loading: boolean
}

const profileReducer = (
  state: ProfileState = { profile: null, loading: false, error: null },
  action: AnyAction
): ProfileState => {
  switch (action.type) {
    case ReduxActionTypes.FETCH_PROFILE.REQUESTED:
      return { ...state, loading: true }

    case ReduxActionTypes.FETCH_PROFILE.FAILED:
      return { ...state, loading: false, error: action.payload }

    case ReduxActionTypes.FETCH_PROFILE.SUCCEEDED:
      return { ...state, loading: false, profile: action.payload.data }

    default:
      return state
  }
}

export default profileReducer

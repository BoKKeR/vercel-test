import { AnyAction } from 'redux'
import ReduxActionTypes from '../actions/types'
import { Template } from '@/types/template'

export type TemplatesState = {
  templates?: Template[]
  error?: string
  loading: boolean
}

const templatesReducer = (
  state: TemplatesState = { templates: [], loading: false, error: null },
  action: AnyAction
): TemplatesState => {
  switch (action.type) {
    case ReduxActionTypes.FETCH_TEMPLATES.REQUESTED:
      return { ...state, loading: true }

    case ReduxActionTypes.FETCH_TEMPLATES.FAILED:
      return { ...state, loading: false, error: action.payload }

    case ReduxActionTypes.FETCH_TEMPLATES.SUCCEEDED:
      return { ...state, loading: false, templates: action.payload.data }

    default:
      return state
  }
}

export default templatesReducer

import { combineReducers, AnyAction } from 'redux'

import { HYDRATE } from 'next-redux-wrapper'
import postsReducer, { PostsState } from './reducers/posts.reducers'
import templatesReducer, { TemplatesState } from './reducers/templates.reducers'
import profileReducer, { ProfileState } from './reducers/profile.reducers'
import searchPostReducer, { SearchPostsSuggestionsState } from './reducers/searchPostsSuggestions.reducers'
import eventsReducer, { EventsState } from './reducers/events.reducer'

export type RootState = {
  posts: PostsState
  templates: TemplatesState
  profile: ProfileState
  searchPostsSuggestions: SearchPostsSuggestionsState
  events: EventsState
}

const combinedReducers = combineReducers<RootState>({
  posts: postsReducer,
  templates: templatesReducer,
  profile: profileReducer,
  searchPostsSuggestions: searchPostReducer,
  events: eventsReducer,
})

const reducer = (state: RootState, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      const nextState: RootState = {
        ...state,
        ...action.payload,
      }

      const templates = state.templates.templates.length
        ? state.templates.templates
        : action.payload.templates.templates

      nextState.templates.templates = templates

      const events = state.events.events.docs.length ? state.events.events : action.payload.events.events

      nextState.events.events = events

      const profile = state.profile?.profile || action.profile?.profile

      nextState.profile.profile = profile

      return nextState
    default:
      return combinedReducers(state, action)
  }
}

export default reducer

import { fetchUserEvents } from '@/network/events.network'
import { fetchKeybs } from '@/network/keybs.network'
import { fetchParts } from '@/network/parts.network'
import { fetchPosts } from '@/network/posts.network'
import { fetchTemplates } from '@/network/templates.network'
import { updateLocalUser } from '@/network/user.network'
import { call, delay, put, takeLatest } from 'redux-saga/effects'
import { ReduxAction } from './actions'
import ReduxActionTypes, { ReduxActionType } from './actions/types'

function* fetchDataSaga(fun: (...args: any[]) => any, type: ReduxActionType, action: ReduxAction) {
  try {
    const res = yield call(fun, action.payload)

    yield put({
      type: type.SUCCEEDED,
      payload: { data: res, options: action.payload },
    })
  } catch (e) {
    yield put({ type: type.FAILED, payload: e.message })
  }
}

function* debouncedFetchDatasaga(type: ReduxActionType, action: ReduxAction) {
  yield delay(1000)
  yield put({ type: type.REQUESTED, payload: action.payload })
}

export function* fetchSuggestionsSaga(action) {
  return null
}

function* rootSaga() {
  yield takeLatest(
    ReduxActionTypes.FETCH_POST.REQUESTED,
    fetchDataSaga.bind(null, fetchPosts, ReduxActionTypes.FETCH_POST)
  )

  yield takeLatest(
    ReduxActionTypes.FETCH_KEYBS.REQUESTED,
    fetchDataSaga.bind(null, fetchKeybs, ReduxActionTypes.FETCH_KEYBS)
  )

  yield takeLatest(
    ReduxActionTypes.FETCH_PARTS.REQUESTED,
    fetchDataSaga.bind(null, fetchParts, ReduxActionTypes.FETCH_PARTS)
  )

  yield takeLatest(
    ReduxActionTypes.FETCH_TEMPLATES.REQUESTED,
    fetchDataSaga.bind(null, fetchTemplates, ReduxActionTypes.FETCH_TEMPLATES)
  )

  yield takeLatest(
    ReduxActionTypes.FETCH_PROFILE.REQUESTED,
    fetchDataSaga.bind(null, updateLocalUser, ReduxActionTypes.FETCH_PROFILE)
  )

  yield takeLatest(ReduxActionTypes.FETCH_SEARCH_POSTS_SUGGESTIONS.REQUESTED, fetchSuggestionsSaga)

  yield takeLatest(
    [
      ReduxActionTypes.FETCH_SEARCH_POSTS_SUGGESTIONS.DEBOUNCED,
      ReduxActionTypes.FETCH_SEARCH_POSTS_SUGGESTIONS.SUCCEEDED,
    ],
    debouncedFetchDatasaga.bind(null, ReduxActionTypes.FETCH_SEARCH_POSTS_SUGGESTIONS)
  )

  yield takeLatest(
    ReduxActionTypes.FETCH_EVENTS.REQUESTED,
    fetchDataSaga.bind(null, fetchUserEvents, ReduxActionTypes.FETCH_EVENTS)
  )
}

export default rootSaga

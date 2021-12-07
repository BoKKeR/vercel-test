import { END } from '@redux-saga/core'
import { Action, Store } from 'redux'

export const dispatchInSSR = async (store: Store, action: Action | Action[]) => {
  if (Array.isArray(action)) {
    for (const a of action) {
      store.dispatch(a)
    }
  } else {
    store.dispatch(action)
  }

  store.dispatch(END)
  //@ts-ignore
  await store.sagaTask.toPromise()
}

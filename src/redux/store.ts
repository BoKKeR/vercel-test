import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createWrapper } from 'next-redux-wrapper'

import rootReducer from './reducers'
import rootSaga from './saga'

const composeEnhancers =
  (typeof window != 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

export const makeStore = () => {
  // 1: Create the middleware
  const sagaMiddleware = createSagaMiddleware()

  // 2: Add an extra parameter for applying middleware
  const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)))

  // 3: Run your sagas on server
  //@ts-ignore
  store.sagaTask = sagaMiddleware.run(rootSaga)

  // 4: now return the store
  return store
}

export const wrapper = createWrapper(makeStore)

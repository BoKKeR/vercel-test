import ReduxActionTypes, { ReduxActionType } from './types'

export type ReduxAction = {
  type: string
  payload: { [key: string]: any }
}

export const getReduxAction = <T>(
  action: keyof typeof ReduxActionTypes,
  type: keyof ReduxActionType
): ((payload) => ReduxAction) => {
  const _action = ReduxActionTypes[action]

  return (payload: T) => ({
    type: _action[type],
    payload,
  })
}

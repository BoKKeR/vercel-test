import { useTypedSelector } from '.'
import { RootState } from '../reducers'

export const useEvents = (): RootState['events'] => {
  const eventsState = useTypedSelector((state) => state.events)

  return eventsState
}

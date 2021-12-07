import { useTypedSelector } from '.'
import { RootState } from '../reducers'

export const useProfile = (): RootState['profile'] => {
  const profileState = useTypedSelector((state) => state.profile)

  return profileState
}

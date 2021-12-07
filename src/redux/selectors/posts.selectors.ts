import { useTypedSelector } from '.'
import { RootState } from '../reducers'

export const usePosts = (): RootState['posts'] => {
  const postState = useTypedSelector((state) => state.posts)

  return postState
}

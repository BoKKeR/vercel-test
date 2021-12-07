import { useTypedSelector } from '.'
import { RootState } from '../reducers'

export const useSearchPostsSuggestions = (): RootState['searchPostsSuggestions'] => {
  const searchPostsSuggestions = useTypedSelector((state) => state.searchPostsSuggestions)

  return searchPostsSuggestions
}

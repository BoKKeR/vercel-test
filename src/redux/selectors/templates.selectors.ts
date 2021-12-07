import { useTypedSelector } from '.'
import { RootState } from '../reducers'

export const useTemplates = (): RootState['templates'] => {
  const templatesState = useTypedSelector((state) => state.templates)

  return templatesState
}

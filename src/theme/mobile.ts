import { CSS_VARIABLES } from './variables'

const MOBILE_CSS_VARIABLES: Partial<typeof CSS_VARIABLES> = {
  spacing: '0.75rem',
}

export const MOBILE_CSS_VARIABLES_STRING = Object.entries(MOBILE_CSS_VARIABLES)
  .map(([key, value]) => {
    return `--${key}: ${value};`
  })
  .join('\n')

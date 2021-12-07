import COLORS from './colors'

export const FONT_WEIGHTS = {
  font_weight_thin: '100',
  font_weight_extra_light: '200',
  font_weight_light: '300',
  font_weight: '400',
  font_weight_medium: '500',
  font_weight_semi_bold: '600',
  font_weight_bold: '700',
  font_weight_black: '800',
}

export const FONT_SIZES = {
  font_size: `16px`,
  font_size_sm: `0.9rem`,
  font_size_xsm: `0.8rem`,
  font_size_lg: `1.1rem`,
  font_size_xlg: `1.5rem`,
  font_size_jumbo: `2rem`,
  font_size_h1: `1.8rem`,
  font_size_h2: `1.5rem`,
  font_size_h3: `1.2rem`,
  font_size_h4: `0.9rem`,
  font_size_h5: `0.8rem`,
  font_size_h6: `0.7rem`,
}

export const CSS_VARIABLES = {
  // SPACING
  spacing: `1rem`,
  max_width: `1400px`,

  // COLORS
  ...COLORS,

  // FONTS
  font_family: `Roboto Mono`,
  ...FONT_WEIGHTS,
  ...FONT_SIZES,

  // BORDER
  border_width: `2px`,
  border_radius: `0px`,

  // MISC
  box_shadow: `5px 5px 20px 0px rgba(10,10,10,0.8)`,
}

export const CSS_VARIABLES_STRING = Object.entries(CSS_VARIABLES)
  .map(([key, value]) => {
    return `--${key}: ${value};`
  })
  .join('\n')

type LiteralUnion<T extends U, U = string> = T | (U & {})

export const getCSSVar = (variable: LiteralUnion<keyof typeof CSS_VARIABLES>): string => {
  if (Object.keys(CSS_VARIABLES).includes(variable)) {
    return `var(--${variable})`
  } else {
    return variable
  }
}

export const getSpacing = (multiplier: number = 1, operations?: string): string => {
  return `calc((${getCSSVar('spacing')} * ${multiplier}) ${operations || ''})`
}

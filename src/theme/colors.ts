import { CSSProperties } from 'react'

const BASE_COLORS = {
  color_white: 'rgb(255, 255, 255)',
  color_gray: 'rgb(49, 49, 49)',
  color_gray_2: 'rgb(157, 157, 157)',
  color_pink: 'rgb(255, 33, 115)',
  color_black: 'rgb(0, 0, 0)',
  color_red: 'rgb(255, 65, 54)',
  color_blue: 'rgb(18, 106, 222)',
  color_green: 'rgb(46, 204, 64)',
  color_yellow: 'rgb(255, 220, 0)',
  color_orange: 'rgb(255, 133, 27)',
}

const APP_COLORS = {
  color_primary: `var(--color_pink)`,
  color_text: `var(--color_white)`,
  color_warning: `var(--color_orange)`,
  color_error: `var(--color_red)`,
  color_info: `var(--color_blue)`,
  color_background: `var(--color_black)`,
  color_background_2: `var(--color_gray)`,
  color_border: `var(--color_gray)`,
}

const COLORS = { ...BASE_COLORS, ...APP_COLORS }

export type CSSColor = keyof typeof COLORS | CSSProperties['color']

export default COLORS

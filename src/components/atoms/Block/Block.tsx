/** @jsxRuntime classic */
/** @jsx jsx */

import COLORS, { CSSColor } from '@/theme/colors'
import { getCSSVar, getSpacing } from '@/theme/variables'
import PropsWithStyle from '@/types/PropsWithStyle'
import { CSSProperties, forwardRef, FunctionComponent, PropsWithChildren, useMemo } from 'react'
import { css, jsx } from '@emotion/react'
import S from './styled'

export type BlockProps = {
  direction?: 'column' | 'row'
  width?: string
  fullWidth?: boolean
  height?: string
  margin?: boolean
  marginSize?: number
  padding?: boolean
  paddingSize?: number
  background?: CSSColor
  textColor?: CSSColor
  border?: boolean
  borderWidth?: string
  borderRadius?: string
  borderColor?: CSSColor
  flex?: boolean
  flexDirection?: 'column' | 'row'
  justifyContent?: 'center' | 'flex-end' | 'flex-start'
  alignItems?: 'center' | 'flex-end' | 'flex-start'
  textAlign?: 'center' | 'left' | 'right'
  sxPseudo?: [string, CSSProperties][]
  sxHover?: CSSProperties
  sxFocus?: CSSProperties
  tabIndex?: number
  onClick?: (ev: any) => any
  sx?: CSSProperties
  as?: React.ElementType
}
type Props = PropsWithChildren<PropsWithStyle<BlockProps>>

const Block: FunctionComponent<Props> = forwardRef(
  (
    {
      className,
      children,
      width,
      fullWidth,
      height,
      direction = 'row',
      margin = true,
      marginSize = 1,
      padding = false,
      paddingSize = 1,
      background,
      textColor,
      border = false,
      borderColor,
      borderWidth,
      borderRadius,
      flex = true,
      flexDirection = 'row',
      justifyContent = 'flex-start',
      alignItems = 'center',
      textAlign,
      sxPseudo,
      sxHover,
      sxFocus,
      tabIndex,
      sx,
      as,
      ...otherProps
    },
    ref
  ) => {
    const __css: any = {}

    if (margin) {
      const marginKey = direction === 'row' ? 'margin-right' : 'margin-bottom'

      __css['&:not(:last-child)'] = {
        [marginKey]: getSpacing(marginSize),
      }
    }

    if (height) {
      __css.height = height
    }

    if (width || fullWidth) {
      __css.width = width ?? '100%'
    }

    if (padding) {
      __css.padding = getSpacing(paddingSize)
    }

    if (background) {
      __css.background = getCSSVar(background)
    }

    if (textColor) {
      __css.color = getCSSVar(textColor)
    }

    if (border) {
      const _borderWidth = borderWidth || getCSSVar('border_width')
      const _borderColor = getCSSVar(borderColor || 'color_border')

      __css.border = `${_borderWidth} solid ${_borderColor}`
    }

    __css.borderRadius = borderRadius || getCSSVar('border_radius')

    if (flex) {
      __css.display = 'flex'
      __css.flexDirection = flexDirection
      __css.justifyContent = justifyContent
      __css.alignItems = alignItems
    }

    if (textAlign) {
      __css.textAlign = textAlign
    }

    if (sxHover) {
      __css['&:hover'] = sxHover
    }

    if (sxFocus) {
      __css['&:focus'] = sxFocus
    }

    if (sxPseudo) {
      for (const pseudo of sxPseudo) {
        __css[`&:${pseudo[0]}`] = pseudo[1]
      }
    }

    const _css = { ...__css, ...sx }

    return (
      //@ts-ignore
      <S.Block className={className} css={_css} as={as} {...otherProps} ref={ref} tabIndex={tabIndex}>
        {children}
      </S.Block>
    )
  }
)

export default Block

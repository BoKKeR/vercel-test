import { CSSColor } from '@/theme/colors'
import { FONT_SIZES, FONT_WEIGHTS, getCSSVar } from '@/theme/variables'
import PropsWithStyle from '@/types/PropsWithStyle'
import { FunctionComponent, PropsWithChildren, useMemo } from 'react'
import { BlockProps } from '../Block/Block'
import S from './styled'

export type TextProps = {
  size?: keyof typeof FONT_SIZES
  weight?: keyof typeof FONT_WEIGHTS
  color?: CSSColor
} & BlockProps
type Props = PropsWithChildren<PropsWithStyle<TextProps>>

const Text: FunctionComponent<Props> = ({ style, className, size, weight, color, children, ...blockProps }) => {
  const _blockProps = useMemo(() => {
    const __blockProps: typeof blockProps = {
      ...blockProps,
      sx: { ...(blockProps.sx || {}), flexWrap: 'wrap' },
    }

    if (size) {
      __blockProps.sx.fontSize = getCSSVar(size)
    }

    if (weight) {
      __blockProps.sx.fontWeight = getCSSVar(weight) as any
    }

    return { ...__blockProps }
  }, [size, weight, blockProps])

  return (
    <S.Text style={style} className={className} textColor={color || 'color_text'} {..._blockProps} as="span">
      {children}
    </S.Text>
  )
}

export default Text

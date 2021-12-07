import { CSSColor } from '@/theme/colors'
import { getCSSVar, getSpacing } from '@/theme/variables'
import PropsWithStyle from '@/types/PropsWithStyle'
import { PropsOf } from '@emotion/react'
import { CSSProperties, FunctionComponent, MouseEvent, PropsWithChildren, useMemo } from 'react'
import { BlockProps } from '../Block/Block'
import S from './styled'

export type ButtonProps = {
  label?: string
  outline?: boolean
  rounded?: boolean
  disabled?: boolean
  color?: CSSColor
  loading?: boolean
  onClick?: (ev: MouseEvent<HTMLButtonElement>) => any
} & BlockProps &
  PropsOf<'button'>
type Props = PropsWithChildren<PropsWithStyle<ButtonProps>>

const Button: FunctionComponent<Props> = ({
  style,
  className,
  label,
  loading,
  color: colorProp,
  rounded,
  outline,
  children,
  disabled,
  onClick,
  ...blockProps
}) => {
  const isDisabled = disabled ?? loading

  const _blockProps: typeof blockProps = useMemo(() => {
    let color = colorProp

    const __blockProps: typeof blockProps = {
      ...blockProps,
    }

    if (isDisabled) {
      __blockProps.sx = {
        cursor: 'not-allowed',
        ...(__blockProps.sx || {}),
      }

      color = 'color_gray'
    } else {
      __blockProps.sx = {
        cursor: 'pointer',
        ...(__blockProps.sx || {}),
      }
    }

    __blockProps.border = blockProps.border ?? true

    if (blockProps.padding ?? true) {
      const pSize = blockProps.paddingSize || 1

      __blockProps.sx = {
        padding: `${getSpacing(pSize * 0.5)} ${getSpacing(pSize)}`,
        ...(__blockProps.sx || {}),
      }
    }

    if (outline) {
      const _color = color || 'color_gray_2'
      __blockProps.borderColor = blockProps.borderColor || _color
      __blockProps.textColor = blockProps.textColor || _color
      __blockProps.background = 'transparent'
      __blockProps.sxHover = {
        ...(blockProps.sxHover || {}),
        background: getCSSVar(_color),
        color: getCSSVar('color_text'),
      }
    } else {
      __blockProps.textColor = blockProps.textColor || 'color_text'
      __blockProps.background = blockProps.background || color || 'color_background'
      __blockProps.borderColor = blockProps.borderColor || blockProps.background || color || 'color_border'
      __blockProps.sxHover = { ...(blockProps.sxHover || {}), opacity: 0.8 }
    }

    if (rounded) {
      __blockProps.borderRadius = blockProps.borderRadius || '20px'
    }

    if (isDisabled) {
      __blockProps.sxHover = {}
      __blockProps.background = 'color_background'
      __blockProps.textColor = 'color_gray_2'
    }

    return __blockProps
  }, [outline, colorProp, rounded, blockProps, isDisabled])

  const content = useMemo(() => {
    if (loading) {
      return null
    }

    if (children) {
      return children
    }

    if (label) {
      return label
    }

    return ''
  }, [children, loading, label])

  return (
    <S.Button {..._blockProps} className={className} as="button" {...{ onClick, disabled: isDisabled }}>
      {content}
    </S.Button>
  )
}

export default Button

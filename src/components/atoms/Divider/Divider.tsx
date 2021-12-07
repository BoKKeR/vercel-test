import { CSSColor } from '@/theme/colors'
import PropsWithStyle from '@/types/PropsWithStyle'
import { FunctionComponent, useMemo } from 'react'
import { CSSProperties } from 'styled-components'
import { BlockProps } from '../Block/Block'
import S from './styled'

export type DividerProps = {
  color?: CSSColor
  axis?: 'horizontal' | 'vertical'
  size?: number
} & BlockProps
type Props = PropsWithStyle<DividerProps>

const Divider: FunctionComponent<Props> = ({
  style,
  className,
  color = 'color_border',
  axis = 'horizontal',
  size = 1,
  ...blockProps
}) => {
  const _blockProps = useMemo(() => {
    const __blockProps: BlockProps = {
      background: color,
      margin: blockProps.margin ?? false,
    }

    if (axis === 'horizontal') {
      __blockProps.height = `${size}px`
      __blockProps.width = '100%'
    } else {
      __blockProps.width = `${size}px`
      __blockProps.height = '100%'
    }

    return { ...__blockProps, ...blockProps }
  }, [color, axis, size])

  return <S.Divider style={style} className={className} {..._blockProps}></S.Divider>
}

export default Divider

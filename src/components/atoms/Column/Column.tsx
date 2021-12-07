import useWindowSize from '@/hooks/useWindowSize'
import { breakpoints, isBreakpointActive } from '@/theme/breakpoints'
import PropsWithStyle from '@/types/PropsWithStyle'
import { FunctionComponent, PropsWithChildren, useMemo } from 'react'
import { BlockProps } from '../Block/Block'
import S from './styled'

export type ColumnProps = {
  size?: { [key in keyof typeof breakpoints]?: string }
  defaultSize?: string
}
type Props = PropsWithChildren<PropsWithStyle<ColumnProps>> & BlockProps

const Column: FunctionComponent<Props> = ({ style, className, children, size, defaultSize, ...blockProps }) => {
  const { width } = useWindowSize()

  const _blockProps = useMemo(() => {
    const __blockProps: typeof blockProps = {}

    if (defaultSize) {
      __blockProps.sx = {
        width: defaultSize,
        flex: 'unset',
      }
    } else {
      __blockProps.sx = {
        flex: '1',
      }
    }

    __blockProps.sx = {
      ...__blockProps.sx,
      ...(blockProps.sx || {}),
    }

    if (size) {
      const activeBreakpoint = Object.keys(size).find((s) => isBreakpointActive(width, s as keyof typeof breakpoints))

      if (activeBreakpoint) {
        __blockProps.sx = {
          width: size[activeBreakpoint],
          flex: 'unset',
        }
      }
    }

    return { ...blockProps, ...__blockProps }
  }, [size, defaultSize, blockProps])

  return (
    <S.Column style={style} className={className} direction="row" margin={false} padding={false} {..._blockProps}>
      {children}
    </S.Column>
  )
}

export default Column

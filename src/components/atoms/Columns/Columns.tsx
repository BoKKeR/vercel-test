import useWindowSize from '@/hooks/useWindowSize'
import { breakpoints, isBreakpointActive } from '@/theme/breakpoints'
import { getSpacing } from '@/theme/variables'
import PropsWithStyle from '@/types/PropsWithStyle'
import { FunctionComponent, PropsWithChildren, useMemo } from 'react'
import { BlockProps } from '../Block/Block'
import S from './styled'

export type ColumnsProps = {
  gapMultiplier?: number
  multiLine?: boolean
  breakpoint?: keyof typeof breakpoints
}
type Props = PropsWithChildren<PropsWithStyle<ColumnsProps>> & BlockProps

const Columns: FunctionComponent<Props> = ({
  style,
  className,
  children,
  breakpoint = 'tablet',
  gapMultiplier = 1,
  multiLine,
  ...blockProps
}) => {
  const { width } = useWindowSize()

  const isActive = width >= breakpoints[breakpoint].min

  const _blockProps = useMemo(() => {
    const __blockProps: typeof blockProps = {
      ...blockProps,
      sx: {
        gap: getSpacing(gapMultiplier),
        flexWrap: multiLine ? 'wrap' : 'nowrap',
        flex: '1',

        ...(blockProps.sx || {}),
      },
    }

    if (multiLine) {
      __blockProps.sx.flexWrap = 'wrap'
    }

    if (!isActive) {
      __blockProps.sx['> div'] = {
        ['&:not(:last-child)']: {
          marginBottom: getSpacing(gapMultiplier),
        },
      }
    }

    return { ...__blockProps }
  }, [gapMultiplier, multiLine, blockProps, breakpoint, isActive])

  return (
    <S.Columns style={style} className={className} padding={false} fullWidth {..._blockProps} flex={!!isActive}>
      {children}
    </S.Columns>
  )
}

export default Columns

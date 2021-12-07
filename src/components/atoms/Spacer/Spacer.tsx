import { getSpacing } from '@/theme/variables'
import PropsWithStyle from '@/types/PropsWithStyle'
import { FunctionComponent, useMemo } from 'react'
import { BlockProps } from '../Block/Block'
import S from './styled'

export type SpacerProps = {
  multiplier?: number
}
type Props = PropsWithStyle<SpacerProps> & BlockProps

const Spacer: FunctionComponent<Props> = ({ style, className, multiplier = 1, ...blockProps }) => {
  const _blockProps = useMemo(() => {
    const __blockProps = {
      sx: {
        width: getSpacing(multiplier),
        height: getSpacing(multiplier),
      },
    }

    return { ...__blockProps, ...blockProps }
  }, [multiplier, blockProps])

  return (
    <S.Spacer
      style={style}
      className={className}
      padding={false}
      flex={false}
      margin={false}
      {..._blockProps}
    ></S.Spacer>
  )
}

export default Spacer

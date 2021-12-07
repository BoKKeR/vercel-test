import { FONT_SIZES } from '@/theme/variables'
import PropsWithStyle from '@/types/PropsWithStyle'
import { FunctionComponent, PropsWithChildren } from 'react'
import { TextProps } from '../Text/Text'
import S from './styled'

export type HeadingProps = {
  importance?: 1 | 2 | 3 | 4 | 5 | 6
}
type Props = PropsWithChildren<PropsWithStyle<HeadingProps>> & TextProps

const fontSizes: { [key in HeadingProps['importance']]: keyof typeof FONT_SIZES } = {
  1: 'font_size_h1',
  2: 'font_size_h2',
  3: 'font_size_h3',
  4: 'font_size_h4',
  5: 'font_size_h5',
  6: 'font_size_h6',
}

const Heading: FunctionComponent<Props> = ({ style, className, importance = 1, children, ...props }) => {
  return (
    <S.Heading
      {...props}
      style={{ ...style, display: 'block' }}
      className={className}
      flex={false}
      weight="font_weight_medium"
      size={fontSizes[importance] as any}
      margin={props.margin ?? false}
    >
      {children}
    </S.Heading>
  )
}

export default Heading

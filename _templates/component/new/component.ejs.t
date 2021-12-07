---
to: src/components/<%= type %>/<%= name %>/<%= name %>.tsx
---
import PropsWithStyle from '@/types/PropsWithStyle'
import { FunctionComponent } from 'react'
import S from './styled'

export type <%= name %>Props = {}
type Props = PropsWithStyle<<%= name %>Props>

const <%= name %>: FunctionComponent<Props> = ({ style, className }) => {
  return <S.<%= name %> style={style} className={className}>
  </S.<%= name %>>
}

export default <%= name %>



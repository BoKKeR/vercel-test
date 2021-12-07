import { CSSProperties } from 'styled-components'

type PropsWithStyle<T> = T & {
  className?: string
  style?: CSSProperties
}

export default PropsWithStyle

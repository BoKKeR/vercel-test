import { getSpacing, getCSSVar } from '@/theme/variables'
import { FunctionComponent, PropsWithChildren, useMemo } from 'react'
import { css } from 'styled-components'

type DefaultStyleProps = {
  margin?: boolean
  padding?: boolean
  border?: boolean
  direction?: 'column' | 'row'
}

type Props = DefaultStyleProps

const useDefaultStyle = ({
  margin = false,
  padding = false,
  border = false,
  direction = 'row',
}: Props) => {
  const className = useMemo(() => {
    const marginProperty =
      direction === 'column' ? 'margin-bottom' : 'margin-right'

    const _margin = margin
      ? `
        &:not(:last-child) {
          ${marginProperty}: ${getSpacing(1)}
        }
      `
      : ''

    const _padding = padding ? `padding: ${getSpacing(1)}` : ''

    const _border = border
      ? `border: ${getCSSVar('border-size')} solid ${getCSSVar('color-border')}`
      : ''

    return css`
      ${_margin}
      ${_padding}
      ${_border}
    `
  }, [margin, padding, border])
}

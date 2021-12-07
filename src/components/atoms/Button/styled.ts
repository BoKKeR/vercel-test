import { getCSSVar } from '@/theme/variables'
import styled from '@emotion/styled'
import Block from '../Block'

const Button = styled(Block)`
  outline: none;
  font-family: ${getCSSVar('font_family')};
  font-size: ${getCSSVar('font_size')};
  transition: 500ms;
`

const ButtonStyles = {
  Button,
}

export default ButtonStyles

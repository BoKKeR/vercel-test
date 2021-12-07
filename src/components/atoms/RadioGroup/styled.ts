import styled from '@emotion/styled'
import Block from '../Block'

const RadioGroup = styled(Block)``

const RadioItem = styled(Block)`
  &:first-of-type {
    border-radius: 5px 0px 0px 5px;
  }

  &:last-of-type {
    border-radius: 0px 5px 5px 0px;
  }

  &:not(:last-of-type) {
    border-right: none;
  }
`

const RadioGroupStyles = {
  RadioGroup,
  RadioItem,
}

export default RadioGroupStyles

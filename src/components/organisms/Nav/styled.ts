import Block from '@/components/atoms/Block'

import { getMediaQuery } from '@/theme/breakpoints'
import { getCSSVar } from '@/theme/variables'
import styled from '@emotion/styled'

const Nav = styled(Block)`
  width: 100%;
  background: ${getCSSVar('color_background')};
  position: relative;
  z-index: 16;
`

const Bar = styled(Block)`
  width: ${getCSSVar('max_width')};
  margin: auto;
`

const Logo = styled(Block)``

const Links = styled(Block)`
  ${getMediaQuery('mobile')} {
    flex-direction: column;
    width: 100%;
  }
`

const Dropdown = styled.div``

const DropdownItem = styled(Block)`
  cursor: pointer;
  border: solid;
  border-color: black;

  width: 110px;
  height: 110px;

  path {
    stroke: ${getCSSVar('color_text')};
    fill: ${getCSSVar('color_background')};
  }

  svg {
    width: 60px;
    height: 60px;
  }

  &:hover {
    border-color: ${getCSSVar('color_primary')};
    color: ${getCSSVar('color_primary')};
  }
`

const NavStyles = {
  Nav,
  Logo,
  Bar,
  Links,
  Dropdown,
  DropdownItem,
}

export default NavStyles

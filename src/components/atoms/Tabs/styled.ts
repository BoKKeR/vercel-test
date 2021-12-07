import { getCSSVar, getSpacing } from '@/theme/variables'
import styled from 'styled-components'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

const _Tab = styled(Tab)`
  display: inline-block;
  border: 2px solid transparent;
  border-bottom: none;
  position: relative;
  list-style: none;
  text-align: left;
  cursor: pointer;
  outline: none;
  padding-bottom: ${getSpacing(0.5)};
  font-weight: ${getCSSVar('font_weight_medium')};
  font-size: ${getCSSVar('font_size_lg')};
  border-radius: ${getCSSVar('border_radius')};

  &:not(:last-child) {
    margin-bottom: ${getSpacing(2)};
  }

  &.react-tabs__tab--selected {
    background: ${getCSSVar('color_background')};
    color: ${getCSSVar('color_text')};
    border-bottom: 2px solid ${getCSSVar('color_primary')};
  }

  &.disabled {
    color: ${getCSSVar('color_gray_2')};
    cursor: not-allowed;
  }
`
const _Tabs = styled(Tabs)`
  width: 100%;
`

const _TabList = styled(TabList)`
  margin: 0 0 ${getSpacing(0.75)};
  padding: 0;
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  max-width: 100vw;
`

const _TabPanel = styled(TabPanel)`
  width: 100%;
`

const TabsStyles = {
  _Tab,
  _TabList,
  _TabPanel,
  _Tabs,
}

export default TabsStyles

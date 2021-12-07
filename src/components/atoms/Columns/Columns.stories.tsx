import React from 'react'
import { Story, Meta } from '@storybook/react'

import Columns, { ColumnsProps } from './Columns'
import Column from '../Column/Column'

export default {
  title: 'Columns',
  component: Columns,
  argTypes: {},
} as Meta

const Template: Story<ColumnsProps> = (args) => (
  <Columns {...args} multiLine>
    {[...Array(2)].map((_, index) => (
      <Column background="red">{index}</Column>
    ))}

    <Column background="green" size={{ mobile_sm: '300px' }} defaultSize="10px">
      x
    </Column>

    {[...Array(3)].map((_, index) => (
      <Column background="red">2_{index}</Column>
    ))}
    <Column background="blue" size={{ mobile_sm: '50%' }}>
      x
    </Column>
  </Columns>
)

export const Default = Template.bind({})
Default.args = {}

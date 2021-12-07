import React from 'react'
import { Story, Meta } from '@storybook/react'

import Divider, { DividerProps } from './Divider'

export default {
  title: 'Divider',
  component: Divider,
  argTypes: {},
} as Meta

const Template: Story<DividerProps> = (args) => <Divider  {...args} />

export const Default = Template.bind({})
Default.args = {}

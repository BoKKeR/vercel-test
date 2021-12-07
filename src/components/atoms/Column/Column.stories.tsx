import React from 'react'
import { Story, Meta } from '@storybook/react'

import Column, { ColumnProps } from './Column'

export default {
  title: 'Column',
  component: Column,
  argTypes: {},
} as Meta

const Template: Story<ColumnProps> = (args) => <Column  {...args} />

export const Default = Template.bind({})
Default.args = {}

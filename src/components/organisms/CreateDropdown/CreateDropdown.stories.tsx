import React from 'react'
import { Story, Meta } from '@storybook/react'

import CreateDropdown, { CreateDropdownProps } from './CreateDropdown'

export default {
  title: 'CreateDropdown',
  component: CreateDropdown,
  argTypes: {},
} as Meta

const Template: Story<CreateDropdownProps> = (args) => <CreateDropdown  {...args} />

export const Default = Template.bind({})
Default.args = {}

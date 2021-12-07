import React from 'react'
import { Story, Meta } from '@storybook/react'

import Spacer, { SpacerProps } from './Spacer'

export default {
  title: 'Spacer',
  component: Spacer,
  argTypes: {},
} as Meta

const Template: Story<SpacerProps> = (args) => <Spacer  {...args} />

export const Default = Template.bind({})
Default.args = {}

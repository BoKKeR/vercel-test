import React from 'react'
import { Story, Meta } from '@storybook/react'

import RadioGroup, { RadioGroupProps } from './RadioGroup'

export default {
  title: 'RadioGroup',
  component: RadioGroup,
  argTypes: {},
} as Meta

const Template: Story<RadioGroupProps> = (args) => <RadioGroup  {...args} />

export const Default = Template.bind({})
Default.args = {}

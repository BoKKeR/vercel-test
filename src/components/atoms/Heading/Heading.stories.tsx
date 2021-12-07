import React from 'react'
import { Story, Meta } from '@storybook/react'

import Heading, { HeadingProps } from './Heading'

export default {
  title: 'Heading',
  component: Heading,
  argTypes: {},
} as Meta

const Template: Story<HeadingProps> = (args) => <Heading  {...args} />

export const Default = Template.bind({})
Default.args = {}

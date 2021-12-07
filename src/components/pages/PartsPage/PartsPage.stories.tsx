import React from 'react'
import { Story, Meta } from '@storybook/react'

import PartsPage, { PartsPageProps } from './PartsPage'

export default {
  title: 'PartsPage',
  component: PartsPage,
  argTypes: {},
} as Meta

const Template: Story<PartsPageProps> = (args) => <PartsPage  {...args} />

export const Default = Template.bind({})
Default.args = {}

import React from 'react'
import { Story, Meta } from '@storybook/react'

import HomePage, { HomePageProps } from './HomePage'

export default {
  title: 'HomePage',
  component: HomePage,
  argTypes: {},
} as Meta

const Template: Story<HomePageProps> = (args) => <HomePage  {...args} />

export const Default = Template.bind({})
Default.args = {}

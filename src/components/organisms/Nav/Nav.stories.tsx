import React from 'react'
import { Story, Meta } from '@storybook/react'
import { withNextRouter } from 'storybook-addon-next-router'

import Nav, { NavProps } from './Nav'

export default {
  title: 'Nav',
  component: Nav,
  argTypes: {},
  parameters: {
    nextRouter: {
      path: '/',
      asPath: '/',
      route: '/',
    },
  },
  decorators: [withNextRouter],
} as Meta

const Template: Story<NavProps> = (args) => <Nav {...args} />

export const Default = Template.bind({})
Default.args = {}

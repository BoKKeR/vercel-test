import React from 'react'
import { Story, Meta } from '@storybook/react'

import Layout, { LayoutProps } from './Layout'
import { withNextRouter } from 'storybook-addon-next-router'

export default {
  title: 'Layout',
  component: Layout,
  argTypes: {},
  decorators: [withNextRouter],
  parameters: {
    nextRouter: {
      route: '/',
    },
  },
} as Meta

const Template: Story<LayoutProps> = (args) => <Layout {...args}>Content</Layout>

export const Default = Template.bind({})
Default.args = {}

import React from 'react'
import { Story, Meta } from '@storybook/react'

import Portal, { PortalProps } from './Portal'

export default {
  title: 'Portal',
  component: Portal,
  argTypes: {},
} as Meta

const Template: Story<PortalProps> = (args) => <Portal  {...args} />

export const Default = Template.bind({})
Default.args = {}

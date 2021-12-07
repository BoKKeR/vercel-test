import React from 'react'
import { Story, Meta } from '@storybook/react'

import WithSideTabs, { LayoutWithSideNavProps } from './WithSideTabs'

export default {
  title: 'LayoutWithSideNav',
  component: WithSideTabs,
  argTypes: {},
} as Meta

const Template: Story<LayoutWithSideNavProps> = (args) => <WithSideTabs {...args} />

export const Default = Template.bind({})
Default.args = {}

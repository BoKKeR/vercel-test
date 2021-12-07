import React from 'react'
import { Story, Meta } from '@storybook/react'

import TabsSystem from './styled'
import { PropsOf } from '@emotion/react'

export default {
  title: 'Tabs',
  component: TabsSystem._Tabs,
  argTypes: {},
} as Meta

const Template: Story<PropsOf<typeof TabsSystem._Tabs>> = (args) => <TabsSystem._Tabs {...args} />

export const Default = Template.bind({})
Default.args = {}

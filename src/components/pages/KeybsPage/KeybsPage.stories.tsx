import React from 'react'
import { Story, Meta } from '@storybook/react'

import KeybsPage, { KeybsPageProps } from './KeybsPage'

export default {
  title: 'KeybsPage',
  component: KeybsPage,
  argTypes: {},
} as Meta

const Template: Story<KeybsPageProps> = (args) => <KeybsPage  {...args} />

export const Default = Template.bind({})
Default.args = {}

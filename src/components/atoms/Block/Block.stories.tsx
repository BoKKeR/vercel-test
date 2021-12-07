import React from 'react'
import { Story, Meta } from '@storybook/react'

import Block, { BlockProps } from './Block'

export default {
  title: 'Block',
  component: Block,
  argTypes: {},
  args: {
    style: {
      width: '100px',
      height: '100px',
    },
  },
} as Meta

const Template: Story<BlockProps> = (args) => <Block {...args} />

export const Default = Template.bind({})
Default.args = {
  border: true,
}

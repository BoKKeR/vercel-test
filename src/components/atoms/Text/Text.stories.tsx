import React from 'react'
import { Story, Meta } from '@storybook/react'

import Text, { TextProps } from './Text'
import Block from '../Block'

export default {
  title: 'Text',
  component: Text,
  argTypes: {},
} as Meta

const Template: Story<TextProps> = (args) => (
  <Block>
    <Text {...args} direction="row" border>
      Some cool text
    </Text>
    <Text {...args} direction="row" border>
      Some other cool text
    </Text>
  </Block>
)

export const Default = Template.bind({})
Default.args = {}

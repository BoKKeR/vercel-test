import React from 'react'
import { Story, Meta } from '@storybook/react'

import ImageComponent, { ImageProps } from './Image'

export default {
  title: 'Image',
  component: ImageComponent,
  argTypes: {},
} as Meta

const Template: Story<ImageProps> = (args) => <ImageComponent {...args} />

export const Default = Template.bind({})
Default.args = {}

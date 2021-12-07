import React from 'react'
import { Story, Meta } from '@storybook/react'

import PostsLayout, { PostsLayoutProps } from './PostsLayout'

export default {
  title: 'PostsLayout',
  component: PostsLayout,
  argTypes: {},
} as Meta

const Template: Story<PostsLayoutProps> = (args) => <PostsLayout  {...args} />

export const Default = Template.bind({})
Default.args = {}

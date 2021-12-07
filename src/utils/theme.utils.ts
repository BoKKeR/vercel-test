import { CSSColor } from '@/theme/colors'
import { Keyb } from '@/types/keyb'
import { Part } from '@/types/part'
import { PostType, getPostType, isPartPost } from './index'

export const getPostTypeColor = (type: PostType): CSSColor => {
  if (!type) {
    return 'color_black'
  }

  if (type === PostType.Switch) {
    return 'color_red'
  }

  if (type === PostType.Board) {
    return 'color_blue'
  }

  if (type === PostType.Keycap) {
    return 'color_orange'
  }

  return 'color_black'
}

export const getPostColor = (post: Keyb | Part): CSSColor => {
  const type = getPostType(post)

  return getPostTypeColor(type)
}

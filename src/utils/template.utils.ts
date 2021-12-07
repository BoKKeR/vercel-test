import dynamic from 'next/dynamic'

const SvgBoard = dynamic(() => import('@/assets/svgComponents/Board'), { ssr: false })
const SvgKeycap = dynamic(() => import('@/assets/svgComponents/Keycap'), { ssr: false })
const SvgSwitch = dynamic(() => import('@/assets/svgComponents/Switch'), { ssr: false })
import { PostType } from '.'

export const getPluralTemplateName = (name: string) => {
  const _name = name.toLowerCase()

  if (_name === 'switch') {
    return name + 'es'
  }

  return name + 's'
}

export const getSingularTemplateName = (name: string) => {
  if (!name) {
    return null
  }

  const _name = name.toLowerCase()

  if (_name === 'switches') {
    return name.substring(0, name.length - 2)
  }

  return name.substring(0, name.length - 1)
}

export const getTemplateSVG = (name: PostType) => {
  if (name === PostType.Switch) {
    return SvgSwitch
  }

  if (name === PostType.Board) {
    return SvgBoard
  }

  if (name === PostType.Keycap) {
    return SvgKeycap
  }

  return null
}

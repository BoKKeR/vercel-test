import { addPart } from '@/network/parts.network'
import { UrlPart } from '@/network/publicBuilds.network'
import UserEvent, { UserEventType } from '@/types/fcmEvents'
import { Keyb } from '@/types/keyb'
import { Part } from '@/types/part'
import PublicBuild from '@/types/publicBuild'
import { Template } from '@/types/template'
import { NextRouter } from 'next/router'
import { getSingularTemplateName } from './template.utils'

const fallBackCopyToClipboard = (value: string) => {
  const textArea = document.createElement('textarea')
  textArea.value = value

  // Avoid scrolling to bottom
  textArea.style.top = '0'
  textArea.style.left = '0'
  textArea.style.position = 'fixed'

  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()

  try {
    const successful = document.execCommand('copy')
    const msg = successful ? 'successful' : 'unsuccessful'
    console.log('Fallback: Copying text command was ' + msg)
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err)
  }

  document.body.removeChild(textArea)
}

export const downloadFile = (value: any, filename: string) => {
  if (isServerSide()) {
    return
  }

  const anchor = document.createElement('a')
  const file = new Blob([JSON.stringify(value)], {
    type: 'application/json',
  })
  anchor.href = URL.createObjectURL(file)
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(anchor.href)
}

export const copyToClipboard = async (value: string) => {
  if (!navigator.clipboard) {
    fallBackCopyToClipboard(value)
    return
  }
  await navigator.clipboard.writeText(value)
}

export const isServerSide = () => {
  return typeof window === 'undefined'
}

export const isPartPost = (post: Keyb | Part) => {
  //@ts-ignore
  return typeof post.template !== 'undefined'
}

export enum PostType {
  Keyb = 'Keyb',
  Switch = 'Switch',
  Board = 'Board',
  Keycap = 'Keycap',
}

export const getPostType = (post: Keyb | Part): PostType => {
  if (!isPartPost(post)) {
    return PostType.Keyb
  }

  const part = post as Part

  const templateName = part.template?.name
  const singularTemplateName = templateName && getSingularTemplateName(templateName)

  return singularTemplateName as PostType
}

export const padArray: <T>(arr: T[], minValue: number, value: T) => T[] = (arr, minValue, value) => {
  const difference = minValue - arr.length

  if (difference > 0) {
    return [...arr, ...Array(difference).fill(value)]
  } else {
    return arr
  }
}

export const splitParts = (_parts: (UrlPart | Part)[]) => {
  const urlParts = []
  const parts = []

  for (const part of _parts) {
    if (!part) {
      continue
    }

    //@ts-ignore
    if (part.new) {
      parts.push(part)
    } else if ((part as UrlPart).url) {
      if (part.template?._id) {
        //@ts-ignore
        part.template = part.template._id
      }

      urlParts.push(part)
    } else {
      parts.push((part as Part)._id)
    }
  }

  return { urlParts, parts }
}

export const capitalize = (string: string) => {
  return string[0].toLocaleUpperCase() + string.slice(1)
}

export const startCase = (string: string) => {
  const split = string.split(/\s+/)

  const capitalized = split.map(capitalize)

  return capitalized.join('')
}

export const modulo = (a: number, b: number) => {
  return ((a % b) + b) % b
}

export const getGroupedParts = (parts: (Part | UrlPart)[]) => {
  const partsByTemplate = parts.reduce((accum, curr) => {
    const group = accum[curr.template.name] || []
    accum[curr.template.name] = [...group, curr]

    return accum
  }, {}) as { [key: string]: Part[] }

  return Object.entries(partsByTemplate).map(([templateId, parts]) => {
    return {
      name: templateId,
      values: parts,
    }
  })
}

export const savePublicBuildAsPost = (router: NextRouter, build: PublicBuild) => {
  const url = `/kb/add?build=${build._id}`

  router.push(url)
}

type NewPart = {
  _id: string
  name: string
  template: Template
  new: true
}

export const getPartsIds = async (parts: (Part | NewPart | string)[]) => {
  const _parts = []

  for (const part of parts) {
    if (typeof part === 'string') {
      _parts.push(part)
      continue
    }

    if ((part as NewPart).new) {
      const newPart = part as NewPart
      const addedPart = await addPart({ name: newPart.name, template: newPart.template._id, values: [], picture: [] })

      _parts.push(addedPart._id)
    } else {
      _parts.push(part._id)
    }
  }

  return _parts
}

export const getNotificationData = (event: UserEvent, type: UserEventType) => {
  if (type === UserEventType.postReply) {
    return {
      title: `replied to your post`,
      body: event.content,
      author: event.author,
    }
  }

  if (type === UserEventType.commentReply) {
    return {
      title: `replied to your comment`,
      body: event.content,
      author: event.author,
    }
  }

  if (type === UserEventType.approveKeyb) {
    return {
      title: `approved your keyb`,
      body: event.content,
      author: event.author,
    }
  }

  if (type === UserEventType.approvePart) {
    return {
      title: `approved your part`,
      body: event.content,
      author: event.author,
    }
  }

  return {}
}

export const truncateString = (str: string, num: number): string => {
  // If the length of str is less than or equal to num
  // just return str--don't truncate it.
  if (str.length <= num) {
    return str
  }
  // Return str truncated with '...' concatenated to the end of str.
  return str.slice(0, num) + '...'
}

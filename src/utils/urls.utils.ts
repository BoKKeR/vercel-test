import config from '@/config'
import Comment from '@/types/comment'
import UserEvent, { UserEventType } from '@/types/fcmEvents'
import { Keyb } from '@/types/keyb'
import { Part } from '@/types/part'
import { PublicUser } from '@/types/user'
import { NextRouter } from 'next/router'
import { isServerSide, isPartPost, PostType } from './index'
import { getPluralTemplateName } from './template.utils'

export const isUrl = (value: string) => {
  try {
    new URL(value)

    return true
  } catch (e) {
    return false
  }
}

export const encodeURL = (text: string) => {
  if (!text) return ''

  const trimmed = text.trim()
  return encodeURI(trimmed.replace(/\s+/g, '_'))
}

export const getPostUrl = (post: Keyb | Part) => {
  const id = post._id
  const name = post.name

  const isPart = isPartPost(post)

  const route = isPart ? 'part' : 'kb'

  const as = `/${route}/${id}/${encodeURIComponent(name)}`
  const href = `/${route}/[...slug]`

  return { as, href }
}

export const getPostTypePath = (type: PostType) => {
  if (type === PostType.Keyb) {
    return '/kb'
  }

  const partType = getPluralTemplateName(type)

  if (type === PostType.Board) {
    return `/part?tab=${partType}`
  }

  if (type === PostType.Keycap) {
    return `/part?tab=${partType}`
  }

  if (type === PostType.Switch) {
    return `/part?tab=${partType}`
  }
}

type QMKConfigOptions = {
  compact?: boolean
  custom?: boolean
  id?: string
  author?: string
  keymap?: string
}

export const getQMKConfigUrl = (options: QMKConfigOptions) => {
  let url = config.QMKCONFIG_URL

  if (options.custom) {
    url += '/custom/'
  }

  if (options.id) {
    url += `/${options.id}/`
  }

  if (options.author) {
    url += `/${options.author}/`
  }

  if (options.keymap) {
    url += `/${options.keymap}`
  }

  const parsedUrl = new URL(url)

  if (options.compact) {
    parsedUrl.searchParams.set('mode', 'compact')
  }

  return parsedUrl
}

export const getCurrentFullUrl = (asPath: string) => {
  const url = isServerSide() ? `http://localhost/${asPath}` : `${window.origin}${asPath}`

  return new URL(url)
}

export const getCommentPermalink = (commentId: string, asPath: string) => {
  const url = getCurrentFullUrl(asPath)

  if (commentId) {
    url.searchParams.set('comment', commentId)
  } else {
    url.searchParams.delete('comment')
  }

  return url
}

export const getPartTypeUrl = (type: string) => {
  return {
    href: `/part?tab=${type}`,
    as: `/part?tab=${type}`,
  }
}

export const getImageUrl = (pathname: string) => {
  if (pathname.startsWith('https://ik.imagekit.io')) {
    return pathname
  }
  return `https://ik.imagekit.io/keybio/${pathname}`
}

export const getPublicBuildUrl = (id: string, name: string) => {
  const asPath = `/kb/public/${id}/${name}`

  return getCurrentFullUrl(asPath)
}

export const getUserUrl = (user: PublicUser) => {
  return {
    href: '/user/[...slug]',
    as: `/user/${user.username}`,
  }
}

export const getNotificationUrl = (event: UserEvent, type: UserEventType) => {
  if (type === UserEventType.postReply) {
    return {
      href: `/kb/[...slug]?comment=${event.contentId}`,
      as: `/kb/${event.postId}?comment=${event.contentId}`,
    }
  }

  if (type === UserEventType.commentReply) {
    return {
      href: `/kb/[...slug]?comment=${event.contentId}`,
      as: `/kb/${event.postId}?comment=${event.contentId}`,
    }
  }

  if (type === UserEventType.approveKeyb) {
    return {
      href: `/kb/[...slug]`,
      as: `/kb/${event.postId}`,
    }
  }

  if (type === UserEventType.approvePart) {
    return {
      href: `/part/[...slug]`,
      as: `/part/${event.partId}/part`, // TODO: fix me so I dont break when part is not here
    }
  }
}

const getNthRoute = (url: string, nth: number) => {
  const routes = url.split('/')
  const lastRoute = routes[nth] || ''

  return decodeURIComponent(lastRoute)
}

const getLastRoute = (url: string) => {
  const routes = url.split('/')
  const lastRoute = routes[routes.length - 1] || ''

  return decodeURIComponent(lastRoute)
}

export const getBreadcrumbs = (router: NextRouter) => {
  switch (router.pathname) {
    case '/':
      return [{ type: 'link', as: '/', href: '/', text: 'All' }]
    case '/notifications':
      return [{ type: 'link', as: '/notifications', href: '/notifications', text: 'Notifications' }]
    case '/user':
      return [{ type: 'link', as: '/user', href: '/user', text: 'Users' }]
    case '/user/[...slug]':
      return [
        { type: 'link', as: '/user', href: '/user', text: 'Users' },
        { type: 'link', as: router.asPath, href: '/user/[...slug]', text: getLastRoute(router.asPath) },
      ]
    case '/part':
      return [{ type: 'link', as: '/part', href: '/part', text: 'Parts' }]
    case '/part/add':
      return [
        { type: 'link', as: '/part', href: '/part', text: 'Parts' },
        { type: 'link', as: `/part/add`, href: '/part/add', text: 'Create a Part' },
      ]
    case '/part/[...slug]':
      return [
        { type: 'link', as: '/part', href: '/part', text: 'Parts' },
        { type: 'link', as: router.asPath, href: '/part/[...slug]', text: getNthRoute(router.asPath, 2) },
        { type: 'link', as: router.asPath, href: '/part/[...slug]', text: getLastRoute(router.asPath) },
      ]
    case '/pages':
      return [{ type: 'link', as: '/pages', href: '/pages', text: 'Pages' }]
    case '/pages/[...slug]':
      return [
        { type: 'link', as: '/pages', href: '/pages', text: 'Pages' },
        { type: 'link', as: router.asPath, href: '/pages/[...slug]', text: getNthRoute(router.asPath, 2) },
        { type: 'link', as: router.asPath, href: '/pages/[...slug]', text: getLastRoute(router.asPath) },
      ]
    case '/kb':
      return [{ type: 'link', as: '/kb', href: '/kb', text: 'Keybs' }]
    case '/kb/[...slug]':
      return [
        { type: 'link', as: '/kb', href: '/kb', text: 'Keybs' },
        { type: 'link', as: router.asPath, href: '/kb/[...slug]', text: getNthRoute(router.asPath, 2) },
        { type: 'link', as: router.asPath, href: '/kb/[...slug]', text: getLastRoute(router.asPath) },
      ]
    case '/kb/add':
      return [
        { type: 'link', as: '/kb', href: '/kb', text: 'Keybs' },
        { type: 'link', as: '/kb/add', href: '/kb/add', text: 'Create a Keyb' },
      ]
    case '/kb/public':
      return [
        { type: 'link', as: '/kb', href: '/kb', text: 'Keybs' },
        { type: 'link', as: '/kb/public', href: '/kb/public', text: 'Public Keyb' },
      ]
    case '/kb/public/[...slug]':
      return [
        { type: 'link', as: '/kb', href: '/kb', text: 'Keybs' },
        { type: 'link', as: '/kb/public', href: '/kb/public', text: 'Public Keyb' },
        { type: 'link', as: router.asPath, href: '/kb/public/[...slug]', text: getNthRoute(router.asPath, 3) },
        { type: 'link', as: router.asPath, href: '/kb/public/[...slug]', text: getLastRoute(router.asPath) },
      ]
  }
}

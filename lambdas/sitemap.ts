import { SitemapStream, streamToPromise } from 'sitemap'
import { NowRequest, NowResponse } from '@vercel/node'
import pages from './pages.json'
import { Part } from '../src/types/part'
import { Keyb } from '../src/types/keyb'
import { PublicUser } from '../src/types/user'
import Page from '../src/types/page'
import { Sitemap } from '../src/types/sitemap'
import { fetchSitemapData } from '../src/network/sitemap.network'
import config from '../src/config'

const hostUrl = config.URL

const buildSitemap = (sitemapData: Sitemap) => {
  const sitemap = new SitemapStream({
    hostname: hostUrl,
  })

  pages.forEach((page) => {
    sitemap.write({
      url: `${hostUrl}${page}`,
      lastmodISO: new Date().toISOString(),
      priority: page === '' ? 1 : 0.7,
    })
  })

  sitemapData.parts.forEach((part: Part) => {
    sitemap.write({
      url: `${hostUrl}/parts/${part._id}/${part.name.split(' ').join('_')}`,
      lastmodISO: new Date().toISOString(),
      priority: 0.8,
    })
  })
  sitemapData.posts.forEach((build: Keyb) => {
    sitemap.write({
      url: `${hostUrl}/kb/${build._id}/${build.name.split(' ').join('_')}`,
      lastmodISO: new Date().toISOString(),
      priority: 0.8,
    })
  })

  sitemapData.users.forEach((user: PublicUser) => {
    sitemap.write({
      url: `${hostUrl}/user/${user.username.split(' ').join('_')}`,
      lastmodISO: new Date().toISOString(),
      priority: 0.8,
    })
  })

  sitemapData.markdownPages.forEach((page: Page) => {
    sitemap.write({
      url: `${hostUrl}/pages/${page._id}/${page.name.split(' ').join('_')}`,
      lastmodISO: new Date().toISOString(),
      priority: 0.8,
    })
  })

  sitemap.end()

  return streamToPromise(sitemap)
}

// @ts-ignore
export default async (req: NowRequest, res: NowResponse) => {
  const { data } = await fetchSitemapData()

  const sitemap = await buildSitemap(data)
  if (config.NODE_ENV === 'production') {
    res.setHeader('content-type', 'application/xml')
    res.status(200).send(sitemap.toString())
  } else {
    res.status(200).send(sitemap.toString())
  }
}

import PartsPage from '@/components/pages/PartsPage'
import Layout from '@/components/templates/Layout'
import { THUMBNAIL_IMAGE } from '@/constants'
import { fetchTemplate, fetchTemplates } from '@/network/templates.network'
import { getReduxAction } from '@/redux/actions'
import { wrapper } from '@/redux/store'
import { dispatchInSSR } from '@/utils/redux.utils'
import { NextPage } from 'next'

type Props = {
  tab?: string
}

const Parts: NextPage<Props> = ({ tab }) => {
  return (
    <>
      <PartsPage />
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const templates = await fetchTemplates()

  const tab = context.query?.tab

  const partOptions: any = {
    context,
  }

  if (tab && tab !== 'All') {
    const template = templates.find((t) => t.name === tab)

    if (template) {
      partOptions.template = template._id
    }
  }

  const page = context.query?.page

  if (page) {
    partOptions.page = page
  }

  const partsAction = getReduxAction('FETCH_PARTS', 'REQUESTED')(partOptions)
  const templatesAction = getReduxAction('FETCH_TEMPLATES', 'SUCCEEDED')({ data: templates })

  await dispatchInSSR(context.store, [partsAction, templatesAction])

  return {
    props: {
      tab: tab || 'All',
    },
  }
})

export default Parts

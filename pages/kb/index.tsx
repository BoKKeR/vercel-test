import KeybsPage from '@/components/pages/KeybsPage'
import Layout from '@/components/templates/Layout'
import { THUMBNAIL_IMAGE } from '@/constants'
import { getReduxAction } from '@/redux/actions'
import { wrapper } from '@/redux/store'
import { dispatchInSSR } from '@/utils/redux.utils'
import { NextPage } from 'next'

const Keybs: NextPage<{}> = () => {
  return (
    <>
      <KeybsPage />
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const action = getReduxAction('FETCH_KEYBS', 'REQUESTED')({ context })

  await dispatchInSSR(context.store, action)

  return {
    props: {},
  }
})

export default Keybs

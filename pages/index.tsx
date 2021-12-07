import HomePage from '@/components/pages/HomePage'
import Layout from '@/components/templates/Layout'
import { THUMBNAIL_IMAGE } from '@/constants'
import { getReduxAction } from '@/redux/actions'
import { wrapper } from '@/redux/store'
import { dispatchInSSR } from '@/utils/redux.utils'
import { NextPage } from 'next'
import { getSession } from 'next-auth/client'

const Home: NextPage<{}> = () => {
  return (
    <>
      <HomePage />
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const action = getReduxAction('FETCH_POST', 'REQUESTED')({ context })

  await dispatchInSSR(context.store, action)

  const session = await getSession(context)

  return {
    props: {
      // session: session,
    },
  }
})

export default Home

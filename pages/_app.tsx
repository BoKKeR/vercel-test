// CSS
import 'react-awesome-slider/dist/styles.css'
import 'react-quill/dist/quill.snow.css'
import 'react-markdown-editor-lite/lib/index.css'
import 'react-tabs/style/react-tabs.css'
import 'tippy.js/dist/tippy.css'
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import '@uppy/image-editor/dist/style.css'

import { wrapper } from '@/redux/store'
import GlobalStyle from '@/theme/GlobalStyle'
import { Provider } from 'next-auth/client'
import { AppProps } from 'next/app'
import { useEffect } from 'react'
import { ToastProvider } from 'react-toast-notifications'
import { useDispatch } from 'react-redux'
import { getReduxAction } from '@/redux/actions'
import { useTemplates } from '@/redux/selectors/templates.selectors'
import Layout from '@/components/templates/Layout'

const App = ({ Component, pageProps }: AppProps) => {
  const { templates } = useTemplates()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!templates?.length) {
      dispatch(getReduxAction('FETCH_TEMPLATES', 'REQUESTED')({}))
    }
  }, [templates?.length])

  return (
    <ToastProvider autoDismiss autoDismissTimeout={6000} components={{ Toast: null }} placement="bottom-center">
      <Provider session={pageProps.session}>
        <GlobalStyle />
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <div id="modal"></div>
      </Provider>
    </ToastProvider>
  )
}

export default wrapper.withRedux(App)

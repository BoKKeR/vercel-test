import Block from '@/components/atoms/Block'

import Divider from '@/components/atoms/Divider'
import Spacer from '@/components/atoms/Spacer'
import Text from '@/components/atoms/Text'
import Nav from '@/components/organisms/Nav'
import PropsWithStyle from '@/types/PropsWithStyle'
import Link from 'next/link'
import { FunctionComponent, PropsWithChildren, useEffect, useMemo } from 'react'
import S from './styled'
import { CSS_VARIABLES, getCSSVar } from '@/theme/variables'
import { getReduxAction } from '@/redux/actions'
import { useSession } from 'next-auth/client'
import { useDispatch } from 'react-redux'
import useWindowSize from '@/hooks/useWindowSize'
import { getBreadcrumbs } from '@/utils/urls.utils'
import { useRouter } from 'next/router'
import NextNprogress from 'nextjs-progressbar'
import COLORS from '@/theme/colors'

type Breadcrumb =
  | string
  | { type: 'link'; as: string; href: string; text: string }
  | { type: 'custom'; element: JSX.Element }

export type LayoutProps = {
  breadcrumbs?: Breadcrumb[]
}
type Props = PropsWithChildren<PropsWithStyle<LayoutProps>>

const Layout: FunctionComponent<Props> = ({ style, className, children, breadcrumbs: b = [] }) => {
  const [session] = useSession()
  const dispatch = useDispatch()
  const { width } = useWindowSize()
  const router = useRouter()

  const withPadding = width <= parseInt(CSS_VARIABLES.max_width)

  const updateDbUser = async () => {
    const action = getReduxAction('FETCH_PROFILE', 'REQUESTED')({})

    dispatch(action)
  }

  useEffect(() => {
    if (session?.accessToken) {
      updateDbUser()
    }
  }, [session?.accessToken])

  return (
    <S.Layout style={style} className={className} sx={{ height: '100%' }} flexDirection="column" margin={false}>
      <NextNprogress
        color={COLORS.color_primary}
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
        options={{
          showSpinner: false,
        }}
      />

      <Nav />

      <Block fullWidth margin={false}>
        <Spacer multiplier={1} />
      </Block>

      <Block fullWidth margin={false}>
        <Spacer multiplier={2} />
      </Block>

      <Block
        flex={false}
        margin={false}
        padding={withPadding}
        paddingSize={withPadding && 2}
        //@ts-ignore
        sx={{ flex: '1', width: '100%', maxWidth: getCSSVar('max_width') }}
      >
        {/* {children} */}
      </Block>

      <Block fullWidth>
        <Spacer multiplier={2} />
      </Block>

      <Block fullWidth>
        <Divider color="color_border" size={2} fullWidth />
      </Block>

      <Block fullWidth>
        <Spacer />
      </Block>
    </S.Layout>
  )
}

export default Layout

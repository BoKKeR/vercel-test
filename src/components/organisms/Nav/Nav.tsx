import Block from '@/components/atoms/Block'
import Button from '@/components/atoms/Button'
import useSession from '@/hooks/useSession'
import Spacer from '@/components/atoms/Spacer'
import Text from '@/components/atoms/Text'
import useToggle from '@/hooks/useToggle'
import { useTemplates } from '@/redux/selectors/templates.selectors'
import useWindowSize from '@/hooks/useWindowSize'
import { breakpoints } from '@/theme/breakpoints'
import { getCSSVar } from '@/theme/variables'
import PropsWithStyle from '@/types/PropsWithStyle'

import { getPartTypeUrl } from '@/utils/urls.utils'
import { signIn } from 'next-auth/client'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { FunctionComponent } from 'react'
import { FaBars } from 'react-icons/fa'
import NavLink, { NavLinkProps } from './NavLink'
import S from './styled'

const SvgAll = dynamic(() => import('@/assets/svgComponents/All'))

export type NavProps = {}
type Props = PropsWithStyle<NavProps>

const getLinks = (links: NavLinkProps[], isMobile?: boolean) => {
  return links.map((link) => <NavLink {...link} isMobile={isMobile} key={link.text} />)
}

const Nav: FunctionComponent<Props> = ({ style, className }) => {
  const [session, loading] = useSession()
  const [showSubLinksDropdown, toggleSubLinksDropdown] = useToggle(false)
  const [showMobileDropdown, toggleMobileDropdown] = useToggle(false)

  const { width } = useWindowSize()

  const isMobile = width <= breakpoints.mobile.max

  const { templates } = useTemplates()

  const onPartsClick = () => {
    toggleSubLinksDropdown()
  }

  const partSubLinks: NavLinkProps[] = [
    {
      text: 'All',
      href: '/part',
      as: '/part',
    },
    ...templates.map((template) => ({
      text: template.name,
      ...getPartTypeUrl(template.name),
    })),
  ]

  const links: NavLinkProps[] = [
    { text: 'All', href: '/', as: '/' },
    { text: 'Keybs', href: '/kb', as: '/kb' },
    {
      text: 'Parts',
      onClick: onPartsClick,
      showSubLinks: showSubLinksDropdown,
      subLinks: getLinks(partSubLinks, isMobile),
    },
    {
      text: 'Keyboard Builder',
      href: '/kb/public',
      as: '/kb/public',
    },
  ]

  const onSignIn = () => {
    signIn('keycloak', {}, { prompt: 'login' })
  }

  return (
    <div style={{ width: '100%' }}>
      <S.Nav style={style} className={className}>
        <S.Bar padding>
          <Block>
            {isMobile && (
              <Block>
                <FaBars onClick={toggleMobileDropdown} />
              </Block>
            )}
            <S.Logo>
              <Text sxHover={{ color: getCSSVar('color_primary') }} size="font_size_lg" weight="font_weight_bold">
                <Link href="/" as="/">
                  <a>Keyb.io</a>
                </Link>
              </Text>
            </S.Logo>
            {!isMobile && (
              <S.Logo>
                <Text sxHover={{ color: getCSSVar('color_primary') }} size="font_size_lg">
                  <Link href="/pages/[...slug]" as="/pages/WyfqpdaA4">
                    <a>v0.2</a>
                  </Link>
                </Text>
              </S.Logo>
            )}
            <Spacer />
            {!isMobile && <S.Links>{getLinks(links, isMobile)}</S.Links>}
          </Block>
        </S.Bar>
      </S.Nav>
    </div>
  )
}

export default Nav

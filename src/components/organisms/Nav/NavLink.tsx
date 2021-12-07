import Block from '@/components/atoms/Block'
import Text from '@/components/atoms/Text'
import { getCSSVar, getSpacing } from '@/theme/variables'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FunctionComponent, MouseEvent } from 'react'
import { FaCaretDown } from 'react-icons/fa'
import { CSSProperties } from 'styled-components'
import S from './styled'

export type NavLinkProps = {
  text: string
  href?: string
  as?: string
  onClick?: (event: MouseEvent<any>) => any
  subLinks?: JSX.Element[]
  showSubLinks?: boolean
  isMobile?: boolean
}

const isRouteActive = (href: string, routeHref: string) => {
  if (href === '/') {
    return href === routeHref
  }

  if (routeHref.includes('/kb/public') && href === '/kb') {
    return false
  }

  return routeHref.includes(href)
}

const NavLink: FunctionComponent<NavLinkProps> = ({
  text,
  href,
  as,
  onClick,
  subLinks,
  showSubLinks = [],
  isMobile,
}) => {
  const router = useRouter()

  const sx: any = {
    padding: `${getSpacing(0.5)} ${getSpacing(1)}`,
  }

  if (isRouteActive(href, router.route)) {
    if (!isMobile) {
      sx.borderBottom = `2px solid ${getCSSVar('color_text')}`
    } else {
      sx.color = getCSSVar('color_primary')
    }
  }

  const caretStyle: CSSProperties = {
    transition: `transform 1s`,
    transform: `rotate(0deg)`,
  }

  if (showSubLinks) {
    caretStyle.transform = `rotate(180deg)`
  }

  if (isMobile) {
    sx.flexDirection = 'column'
    sx.width = '100%'
  }

  return (
    <Block sx={sx} key={text} direction={isMobile ? 'column' : 'row'}>
      <Block sxHover={{ color: getCSSVar('color_primary') }} width={sx.width}>
        {href && (
          <Link href={href} as={as} key={text} passHref>
            <a style={{ width: '100%' }}>{text}</a>
          </Link>
        )}

        {onClick && (
          <a onClick={onClick} style={{ width: '100%' }}>
            <Block>
              <Text color="inherit" marginSize={0.5}>
                {text}
              </Text>

              {subLinks && (
                <Block>
                  <span>
                    <FaCaretDown style={caretStyle} />{' '}
                  </span>
                </Block>
              )}
            </Block>
          </a>
        )}

        {showSubLinks && isMobile && <S.Links>{subLinks}</S.Links>}
      </Block>
    </Block>
  )
}

export default NavLink

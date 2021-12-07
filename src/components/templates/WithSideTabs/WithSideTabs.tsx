import Block from '@/components/atoms/Block'
import Column from '@/components/atoms/Column'
import Columns from '@/components/atoms/Columns'
import Divider from '@/components/atoms/Divider'
import Heading from '@/components/atoms/Heading'
import TabsSystem from '@/components/atoms/Tabs'
import Text from '@/components/atoms/Text'
import useWindowSize from '@/hooks/useWindowSize'
import { breakpoints } from '@/theme/breakpoints'
import { getSpacing } from '@/theme/variables'
import PropsWithStyle from '@/types/PropsWithStyle'
import { isServerSide } from '@/utils/index'
import { getCurrentFullUrl } from '@/utils/urls.utils'
import { useRouter } from 'next/router'
import { Fragment, FunctionComponent, PropsWithChildren, useEffect, useMemo, useState } from 'react'
import { resetIdCounter } from 'react-tabs'

export type SideTab = {
  id: string
  name: string
  children?: SideTab[]
}

export type SideTabPanel = {
  id: string
  content: JSX.Element
  title?: string | JSX.Element
}

export type LayoutWithSideNavProps = {
  tabs: SideTab[]
  panels: SideTabPanel[]
  forceRenderPanel?: boolean
  onTabChange?: (tab: number) => any
}

type Props = PropsWithStyle<LayoutWithSideNavProps>

const WithSideTabs: FunctionComponent<Props> = ({
  style = {},
  className,
  tabs,
  panels,
  forceRenderPanel,
  onTabChange,
}) => {
  const [tabIndex, setTabIndex] = useState(0)
  const { width } = useWindowSize()
  const router = useRouter()

  const flatTabs = useMemo(
    () =>
      tabs.flatMap((tab) => {
        if (!tab.children) {
          return tab
        } else {
          return tab.children
        }
      }),
    [tabs.length]
  )

  const isMobile = width <= breakpoints.mobile.max

  if (isServerSide()) {
    resetIdCounter()
  }

  const scrollToPanel = (id: number) => {
    if (forceRenderPanel) {
      const panelId = panels[id]?.id
      const panelElement = document.getElementById(panelId)

      if (panelElement) {
        panelElement.scrollIntoView({ block: 'start', inline: 'center', behavior: 'smooth' })
      }
    }
  }

  useEffect(() => {
    const url = getCurrentFullUrl(router.asPath)

    const tab = url.searchParams.get('tab')

    if (typeof tab === 'string') {
      const indexTab = flatTabs.findIndex((t) => t.name === tab)

      if (indexTab && tabIndex !== indexTab) {
        scrollToPanel(indexTab)
        setTabIndex(indexTab)
      }
    }
  }, [router.asPath])

  const updateUrl = (index) => {
    const url = getCurrentFullUrl(router.asPath)

    url.searchParams.set('tab', flatTabs[index].name)

    router.push(router.pathname, url.toString(), { shallow: true })
  }

  const onIndexChange = (index: number) => {
    setTabIndex(index)
    scrollToPanel(index)
    updateUrl(index)

    if (onTabChange) {
      onTabChange(index)
    }
  }

  return (
    <TabsSystem._Tabs
      style={{ ...style }}
      className={className}
      selectedIndex={tabIndex}
      onSelect={onIndexChange}
      forceRenderTabPanel={isMobile ? true : forceRenderPanel}
    >
      <Columns gapMultiplier={2} sx={{ minHeight: '100%' }}>
        {!isMobile && (
          <Column sx={{ flex: 'unset' }}>
            <TabsSystem._TabList
              style={{
                flexDirection: 'column',
                alignSelf: 'flex-start',
                paddingTop: getSpacing(2),
                position: 'sticky',
                top: '0',
              }}
            >
              {tabs.map((tab) => (
                <Fragment key={tab.id}>
                  {!tab.children && (
                    <TabsSystem._Tab>
                      <Text>{tab.name}</Text>
                    </TabsSystem._Tab>
                  )}

                  {tab.children && (
                    <>
                      <Text direction="column" weight="font_weight_thin">
                        {tab.name}
                      </Text>
                      <Block sx={{ paddingLeft: getSpacing() }} flexDirection="column" alignItems="flex-start">
                        {tab.children.map((tab) => (
                          <TabsSystem._Tab key={tab.id}>
                            <Text>{tab.name}</Text>
                          </TabsSystem._Tab>
                        ))}
                      </Block>
                    </>
                  )}
                </Fragment>
              ))}
            </TabsSystem._TabList>
          </Column>
        )}

        <Column sx={{ flex: 'unset' }}>
          <Divider axis="vertical"></Divider>
        </Column>

        <Column fullWidth flexDirection="column">
          {panels.map((panel, index) => (
            <Block
              flex={false}
              key={panel.id}
              {...{ id: panel.id }}
              margin={!!forceRenderPanel}
              fullWidth
              marginSize={4}
              direction="column"
            >
              <TabsSystem._TabPanel key={panel.id}>
                {panel.title && (
                  <Heading importance={2} margin direction="column" marginSize={2}>
                    {panel.title}
                  </Heading>
                )}

                {panel.content}
              </TabsSystem._TabPanel>
            </Block>
          ))}
        </Column>
      </Columns>
    </TabsSystem._Tabs>
  )
}

export default WithSideTabs

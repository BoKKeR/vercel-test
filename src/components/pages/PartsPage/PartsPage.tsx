import PostsLayout from '@/components/templates/PostsLayout'
import WithSideTabs from '@/components/templates/WithSideTabs'
import { getReduxAction } from '@/redux/actions'
import { useTemplates } from '@/redux/selectors/templates.selectors'
import PropsWithStyle from '@/types/PropsWithStyle'
import { Template } from '@/types/template'
import { FunctionComponent } from 'react'
import { useDispatch } from 'react-redux'
import S from './styled'

export type PartsPageProps = {}
type Props = PropsWithStyle<PartsPageProps>

const PartsPage: FunctionComponent<Props> = ({ style, className }) => {
  const dispatch = useDispatch()
  const { templates, loading } = useTemplates()

  const onAllUpdate = (options = {}) => {
    const action = getReduxAction('FETCH_PARTS', 'REQUESTED')(options)

    dispatch(action)
  }

  const onTemplateUpdate = (template: Template, options = {}) => {
    const action = getReduxAction('FETCH_PARTS', 'REQUESTED')({ ...options, template: template._id })

    dispatch(action)
  }

  const tabs = [
    {
      id: 'type',
      name: 'Type:',
      children: [
        {
          id: 'all',
          name: 'All',
        },
        ...templates.map((template) => ({
          id: template._id,
          name: template.name,
        })),
      ],
    },
  ]

  const panels = [
    {
      id: 'all',
      content: <PostsLayout onPostsUpdate={onAllUpdate} margin={false} />,
    },
    ...templates.map((template) => ({
      id: template.name,
      content: <PostsLayout onPostsUpdate={onTemplateUpdate.bind(null, template)} margin={false} />,
    })),
  ]

  const onTabChange = (index: number) => {
    if (index === 0) {
      onAllUpdate()
    }

    onTemplateUpdate(templates[index - 1], {})
  }

  return (
    <S.PartsPage style={style} className={className}>
      <WithSideTabs tabs={tabs} panels={panels} onTabChange={onTabChange} />
    </S.PartsPage>
  )
}

export default PartsPage

import PostsLayout from '@/components/templates/PostsLayout'
import { getReduxAction } from '@/redux/actions'
import PropsWithStyle from '@/types/PropsWithStyle'
import { FunctionComponent } from 'react'
import { useDispatch } from 'react-redux'
import S from './styled'

export type KeybsPageProps = {}
type Props = PropsWithStyle<KeybsPageProps>

const KeybsPage: FunctionComponent<Props> = ({ style, className }) => {
  const dispatch = useDispatch()

  const onPostsUpdate = (options) => {
    const action = getReduxAction('FETCH_KEYBS', 'REQUESTED')(options)
    dispatch(action)
  }

  return (
    <S.KeybsPage style={style} className={className}>
      <PostsLayout onPostsUpdate={onPostsUpdate} />
    </S.KeybsPage>
  )
}

export default KeybsPage

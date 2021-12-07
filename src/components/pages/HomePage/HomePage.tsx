import PostsLayout from '@/components/templates/PostsLayout'
import { getReduxAction } from '@/redux/actions'
import PropsWithStyle from '@/types/PropsWithStyle'
import { FunctionComponent } from 'react'
import { useDispatch } from 'react-redux'
import S from './styled'

export type HomePageProps = {}
type Props = PropsWithStyle<HomePageProps>

const HomePage: FunctionComponent<Props> = ({ style, className }) => {
  const dispatch = useDispatch()

  const onPostsUpdate = (options = {}) => {
    const action = getReduxAction('FETCH_POST', 'REQUESTED')(options)

    dispatch(action)
  }

  return (
    <S.HomePage style={style} className={className}>
      <PostsLayout onPostsUpdate={onPostsUpdate} />
    </S.HomePage>
  )
}

export default HomePage

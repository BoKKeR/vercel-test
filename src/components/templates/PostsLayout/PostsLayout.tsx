import { BlockProps } from '@/components/atoms/Block/Block'
import { usePosts } from '@/redux/selectors/posts.selectors'
import { Keyb } from '@/types/keyb'
import { Paginated } from '@/types/pagination'
import { Part } from '@/types/part'
import PropsWithStyle from '@/types/PropsWithStyle'
import { FunctionComponent } from 'react'
import S from './styled'

export type PostsLayoutProps = {
  posts?: Paginated<(Keyb | Part)[]>
  loading?: boolean
  onPostsUpdate: any
} & BlockProps
type Props = PropsWithStyle<PostsLayoutProps>

const PostsLayout: FunctionComponent<Props> = ({
  style,
  className,
  onPostsUpdate,
  posts: propPosts,
  ...blockProps
}) => {
  const { posts: reduxPosts, loading, error } = usePosts()

  const posts = propPosts || reduxPosts

  const onPageUpdate = (page: number) => {
    onPostsUpdate({ page })
  }

  return null
}

export default PostsLayout

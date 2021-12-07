import { isServerSide } from './index'

export const scrollIntoCommentEditor = () => {
  if (!isServerSide()) {
    const commentEditor = document.querySelector('.comment-editor')

    if (commentEditor) {
      commentEditor.scrollIntoView({ block: 'start', inline: 'center', behavior: 'smooth' })
    }
  }
}

import { useEffect, useState } from 'react'
import useErrorHandler from './useErrorHandler'
import useSession from './useSession'

type UseUpvoteProps = {
  upvotes: number
  authorId: string
  isUpvoted: boolean
  onUpvote: () => Promise<boolean>
}

const useUpvote = ({
  upvotes: initialUpvotes,
  authorId,
  isUpvoted: initialUpvoted,
  onUpvote: onUpvoteProp,
}: UseUpvoteProps) => {
  const [upvotes, setUpvotes] = useState(initialUpvotes)
  const [isUpvoted, setUpvoted] = useState(initialUpvoted)
  const [isUpvoting, setUpvoting] = useState(false)
  const [session] = useSession()

  const { handleError } = useErrorHandler()

  const isAuthor = session?.dbUser?._id === authorId
  const canUpvote = session && !isAuthor && !isUpvoting

  const getUpvoteColor = () => {
    if (!canUpvote) {
      return 'color_gray'
    }

    if (isUpvoted) {
      return 'color_red'
    }

    return 'color_gray_2'
  }

  const onUpvote = async () => {
    if (!canUpvote) {
      return
    }

    setUpvoting(true)

    try {
      const upvoted = await onUpvoteProp()

      if (upvoted) {
        setUpvotes((prev) => prev + 1)
      } else {
        setUpvotes((prev) => prev - 1)
      }

      setUpvoted(upvoted)
    } catch (e) {
      handleError(e, 'An error ocurred while upvoting')
    } finally {
      setUpvoting(false)
    }
  }

  return { onUpvote, upvoteColor: getUpvoteColor(), upvotes, isUpvoting, isUpvoted, canUpvote }
}

export default useUpvote

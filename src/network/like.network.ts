import axios from '.'

export const toggleLikePost = async (postId: string): Promise<boolean> => {
  const res = await axios.post('/like', { postId })
  return res.data
}

export const toggleLikePart = async (partId: string): Promise<boolean> => {
  const res = await axios.post('/like', { partId })
  return res.data
}

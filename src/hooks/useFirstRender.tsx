import { useEffect, useRef } from 'react'

const useFirstRender = () => {
  const firstRenderRef = useRef(true)

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false
    }
  }, [firstRenderRef.current])

  return firstRenderRef.current
}

export default useFirstRender

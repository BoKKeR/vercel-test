import { useCallback, useEffect, useRef } from 'react'

const useMounted = (): (() => boolean) => {
  const isMounted = useRef(false)
  useEffect(() => {
    isMounted.current = true
    return function cleanup(): void {
      isMounted.current = false
    }
  }, [])

  const checker = useCallback((): boolean => {
    return isMounted.current
  }, [])

  return checker
}

export default useMounted

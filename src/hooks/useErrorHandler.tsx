import config from '@/config'
import { useState } from 'react'
import { useToasts } from 'react-toast-notifications'

const useErrorHandler = () => {
  const { addToast } = useToasts()

  const [hasError, setError] = useState(false)

  const handleError = (error: Error, message?: string) => {
    if (config.NODE_ENV === 'development') {
      console.error(error)
    }

    const resStatus = (error as any).response?.statusText
    const errorArr = [message || error.toString()]

    if (resStatus) {
      errorArr.push(resStatus)
    }

    const errorMessage = errorArr.join('. ')

    addToast(errorMessage, { appearance: 'error' })

    setError(true)
  }

  return { handleError, hasError, clearError: setError.bind(null, false) }
}

export default useErrorHandler

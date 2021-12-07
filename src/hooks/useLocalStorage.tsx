import { Template } from '@/types/template'
import { PrivateUser } from '@/types/user'
import { useEffect, useMemo, useState } from 'react'
import { singletonHook } from 'react-singleton-hook'
import areEqual from 'fast-deep-equal'
import { isServerSide } from '@/utils'

type LocalStorageItems = {
  templates: Template[]
  publicBuildToken: string
  dbUser: PrivateUser
}

const useLocalStorage: <T extends keyof LocalStorageItems, K = LocalStorageItems[T]>(
  key: T,
  initialValue: K
) => [K, (value: K) => void] = (key, initialValue) => {
  const localItem = useMemo(() => {
    if (!isServerSide()) {
      const string = window.localStorage.getItem(key)

      if (string) {
        return JSON.parse(string)
      }
    }
  }, [isServerSide()])

  const initialState = useMemo(() => {
    if (isServerSide()) {
      return initialValue
    }

    const item = window.localStorage.getItem(key)

    return item ? JSON.parse(item) : initialValue
  }, [])

  const [storedValue, setStoredValue] = useState(initialState)

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value

      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {}
  }

  return [localItem, setValue]
}

export default useLocalStorage

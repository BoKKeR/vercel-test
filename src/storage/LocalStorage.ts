import { Template } from '@/types/template'
import { PrivateUser } from '@/types/auth'
import { isServerSide } from '@/utils'

type LocalStorageData = {
  templates: Template[]
  publicBuildToken: string
  dbUser: PrivateUser
}

const get = <T extends keyof LocalStorageData, K extends LocalStorageData[T]>(key: T): K | undefined => {
  if (!isServerSide()) {
    const string = localStorage.getItem(key)

    if (string) {
      return JSON.parse(string)
    }
  }
}

const set = <T extends keyof LocalStorageData, K extends LocalStorageData[T]>(key: T, value: K) => {
  if (!isServerSide()) {
    return localStorage.setItem(key, JSON.stringify(value))
  }
}

const LocalStorage = {
  get,
  set,
}

export default LocalStorage

type QMKConfig = {
  _id: string
  version: number
  layers: string[][]
  documentation: string
  keyboard: string
  keymap: string
  layout: string
  author: string
}

type KeybioQmkMetadata = {
  createdAt: Date
  updatedAt: Date
  keybioMetadata?: {
    version: number
    hidden: boolean
  }
}

export type KeybioQMKConfig = KeybioQmkMetadata & QMKConfig

export default QMKConfig

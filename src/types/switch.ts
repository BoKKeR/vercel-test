export interface Switch {
  _id: string
  createdAt: string
  updatedAt: string
  switchTagId: number
  user?: string
  description: string
  tagName: string
  picture: string[]
  tagType: string
  commentCount: number

  type?: string
  svgModel?: {
    top: string
    middle: string
    bottom: string
    stroke: string
  }
  force?: {
    operating: string
    peak: string
  }
  rating?: {
    current: string
    maximum: string
  }
  lifespan?: string
  mount?: {
    pin: string
    profile: string
    base: string
    keycap: string
  }
  led?: {
    type: string
    size: string
  }
  travel?: {
    total: string
    activation: string
  }
  sound: {
    acrylicNaked: string[]
    acrylicKeycap: string[]
    metalNaked: string[]
    metalKeycap: string[]
  }
}

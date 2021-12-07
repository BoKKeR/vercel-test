export interface TemplateCategory {
  _id: string
  updatedAt: string
  createdAt: string
  name: string
  type: string
  fields: {
    _id: string
    updatedAt: string
    createdAt: string
    name: string
    type: string
    required: boolean
    values: {
      _id: string
      updatedAt: string
      createdAt: string
      name: string
    }[]
  }[]
}

export interface Template {
  _id: string
  updatedAt: string
  createdAt: string
  name: string
  categories: TemplateCategory[]
  author: string
}

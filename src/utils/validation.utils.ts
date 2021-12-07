export const isRequired = (value: any) => {
  const error = 'This field is required'

  if (value === undefined || value === null) {
    return error
  }

  if (typeof value === 'string' || Array.isArray(value)) {
    return !!value.length || error
  }

  return true
}

export const min = (value: any, min: number, name?: string) => {
  if (typeof value === 'number') {
    return value >= min || `Value must be equal to or greater than ${min}`
  }

  if (typeof value === 'string') {
    return value.length >= min || `Please type at least ${min} characters`
  }

  if (Array.isArray(value)) {
    return value.length >= min || `Please add at least ${min} ${name}(s)`
  }
}

export const max = (value: any, max: number, name?: string) => {
  if (typeof value === 'number') {
    return value <= max || `Value must be equal to or lower than ${max}`
  }

  if (typeof value === 'string') {
    return value.length <= max || `You can only type up to ${max} characters`
  }

  if (Array.isArray(value)) {
    return value.length <= max || `You can only add up to ${max} ${name}(s)`
  }
}

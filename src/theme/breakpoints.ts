export const breakpoints = {
  mobile_sm: {
    min: 0,
    max: 428,
  },
  mobile: {
    min: 429,
    max: 768,
  },
  tablet: {
    min: 769,
    max: 1023,
  },
  desktop: {
    min: 1024,
    max: 1215,
  },
  widescreen: {
    min: 1216,
    max: 1919,
  },
  fullhd: {
    min: 1920,
    max: -1,
  },
}

export const getMediaQuery = (bp: keyof typeof breakpoints, only?: boolean) => {
  const breakpoint = breakpoints[bp]

  if (bp === 'fullhd') {
    return `@media only screen and (min-width: ${breakpoint.min}px)`
  }

  if (only && breakpoint.max !== -1) {
    return `@media only screen and (max-width: ${breakpoint.max}px) and (min-width: ${breakpoint.min}px)`
  }

  return `@media only screen and (max-width: ${breakpoint.max}px)`
}

export const isBreakpointActive = (width: number, bp: keyof typeof breakpoints) => {
  const breakpoint = breakpoints[bp]

  if (!breakpoint) {
    return false
  }

  if (bp === 'mobile') {
    return width <= breakpoint.max
  }

  if (breakpoint.max > 0) {
    return width > breakpoint.min && width <= breakpoint.max
  }

  return width > breakpoint.min
}

/** @jsx jsx */
import { jsx, css, keyframes } from '@emotion/react'

export const SkeletonKeyframe = keyframes`
  0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }

`

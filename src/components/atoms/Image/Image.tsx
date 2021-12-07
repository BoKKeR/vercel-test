import useMounted from '@/hooks/useMounted'
import PropsWithStyle from '@/types/PropsWithStyle'
import { FunctionComponent, useEffect, useState } from 'react'
import { BlockProps } from '../Block/Block'
import S from './styled'

export type ImageProps = {
  pxWidth?: number
  pxHeight?: number
  ratio?: number
  src: string
}
type Props = PropsWithStyle<ImageProps>

type TransformOptions = {
  width?: number
  height?: number
  blur?: number
}

const applyTransformQS = (url: string, { width, height, blur }: TransformOptions) => {
  const transforms = [width && `w-${width}`, height && `h-${height}`, blur && `bl-${blur}`]
  const transformString = transforms.filter(Boolean).join(',')

  return `${url}?tr=${transformString}`
}

const getPreviewImage = (url: string, { width, height }) => {
  if (!url) {
    return url
  }

  if (url.includes('imagekit') && width >= 100) {
    return applyTransformQS(url, { width, height, blur: 50 })
  } else {
    return url
  }
}

const ImageComponent: FunctionComponent<Props> = ({
  style,
  className,
  pxWidth: width,
  pxHeight: height,
  src: originalSrc,
  ratio,
}) => {
  if (!originalSrc) {
    return (
      <S.Image
        style={{
          ...style,
          paddingTop: ratio && `${ratio}%`,
          height: !ratio && height,
        }}
        className={className}
      />
    )
  }

  const [src, setSrc] = useState(getPreviewImage(originalSrc, { width, height }))
  const isMounted = useMounted()

  const loadOriginalImage = async () => {
    const xhr = new XMLHttpRequest()

    xhr.onload = function () {
      const urlCreator = window.URL || window.webkitURL
      const imageUrl = urlCreator.createObjectURL(xhr.response)

      if (isMounted()) {
        setSrc(imageUrl)
      }
    }
    xhr.open('GET', applyTransformQS(originalSrc, { width, height }))
    xhr.responseType = 'blob'
    xhr.send()
  }

  useEffect(() => {
    if (originalSrc.includes('imagekit') && width >= 100) {
      loadOriginalImage()
    } else if (src !== originalSrc) {
      setSrc(originalSrc)
    }
  }, [originalSrc])

  return (
    <S.Image
      style={{
        ...style,
        backgroundImage: `url(${src})`,
        paddingTop: ratio && `${ratio}%`,
        height: !ratio && height,
      }}
      className={className}
    />
  )
}

export default ImageComponent

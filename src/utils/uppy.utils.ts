import { useState, useEffect } from 'react'
import { Uppy as UppyType } from '@uppy/core'
import config from '@/config'

type OwnProps = {
  name: string
  onChange: (value: string[]) => any
  onError?: (error: string) => any
  maxNumberOfFiles?: number
  uploadURL?: string
  cropAspectRatio?: number
}

type Props = OwnProps

const UppyInstance = (props: Props): UppyType => {
  const [uppy, setUppy] = useState<UppyType>(null)

  const checkAspectRatios = () => {
    if (!props.onError) {
      return
    }

    setTimeout(() => {
      const images = document.querySelectorAll(`img.uppy-Dashboard-Item-previewImg`)

      const aspectRatios = Array.from(images).map((image: HTMLImageElement) => image.naturalWidth / image.naturalHeight)

      const aspectRatio = 4 / 3

      const invalidImages = aspectRatios.filter((ratio) => {
        return ratio < aspectRatio - 0.1 || ratio > aspectRatio + 0.1
      })

      const errorMessage = `Don't forget to crop your images using the tool after adding them, if you dont want the system to auto crop them for you.`

      const isInvalid = invalidImages.length > 0

      const error = isInvalid ? errorMessage : null

      props.onError(error)
    }, 1000)
  }

  const uppyOptions = {
    debug: config.NODE_ENV === 'development',
    autoProceed: false,
    restrictions: {
      maxFileSize: 5000000,
      maxNumberOfFiles: props.maxNumberOfFiles || 10,
      minNumberOfFiles: 1,
      allowedFileTypes: ['image/*'],
    },
  }

  const setup = async () => {
    const Uppy = await import('@uppy/core')

    const uppy = Uppy.default(uppyOptions)

    const ImageEditor = await import('@uppy/image-editor')

    uppy.use(ImageEditor.default, {
      id: 'ImageEditor',
      quality: 0.8,
      cropperOptions: {
        viewMode: 1,
        background: true,
        autoCropArea: 0.5,
        aspectRatio: props.cropAspectRatio,
        responsive: true,
      },
    })

    const S3Plugin = await import('./uppyS3Plugin')

    uppy.use(S3Plugin.default, {
      resolveFilenames: (values: string[]) => {
        const oldFilenames = uppy.getFiles().map((file) => file.name)
        const _values = Array.from(new Set([...oldFilenames, ...values]))

        props.onChange(_values)
      },
    })

    uppy.on('file-added', (file) => {
      checkAspectRatios()
    })

    uppy.on('file-editor:complete', (updatedFile) => {
      checkAspectRatios()
    })

    uppy.on('complete', () => {})

    setUppy(uppy)
  }

  useEffect(() => {
    setup()
  }, [])

  if (!uppy) {
    return null
  }

  return uppy
}

export default UppyInstance

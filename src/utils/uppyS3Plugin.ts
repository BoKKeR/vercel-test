import { Plugin, UppyFile } from '@uppy/core'
import config from '@/config'

export default class S3Plugin extends Plugin {
  resolveFilenames: (filenames: string[]) => any

  constructor(uppy, opts) {
    super(uppy, opts)
    this.id = opts.id || 'S3Plugin'
    this.type = 'uploader'
    this.resolveFilenames = opts.resolveFilenames
  }

  convertImageToCanvas = (file: UppyFile): Promise<HTMLCanvasElement> =>
    new Promise((resolve, reject) => {
      const image = new Image()

      image.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height
        canvas.getContext('2d').drawImage(image, 0, 0)

        resolve(canvas)
      }

      image.onerror = reject

      image.src = URL.createObjectURL(file.data)
    })

  canvasToJPEGBlob = (canvas: HTMLCanvasElement): Promise<Blob> =>
    new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg'))

  getJPGBlob = async (file: UppyFile) => {
    const canvas = await this.convertImageToCanvas(file)
    return this.canvasToJPEGBlob(canvas)
  }

  fetchUploadURL = (): Promise<{
    uploadURL: string
    photoFilename: string
  }> => fetch(config.IMAGE_UPLOAD_URL).then((res) => res.json())

  prepareFile = async (fileID: string) => {
    const file = this.uppy.getFile(fileID)

    const { uploadURL, photoFilename } = await this.fetchUploadURL()

    if (file.extension !== '.jpg') {
      file.name = file.name.split('.')[0] + '.jpg'
      file.data = await this.getJPGBlob(file)
      file.extension = '.jpg'
    }

    return { file, uploadURL, photoFilename }
  }

  uploadFile = async (
    fileID: string
  ): Promise<{
    file: UppyFile
    uploadURL: string
    photoFilename: string
  }> => {
    const { file, uploadURL, photoFilename } = await this.prepareFile(fileID)

    const xhr = new XMLHttpRequest()

    this.uppy.emit('upload-started', file)

    xhr.upload.addEventListener('progress', (ev) => {
      if (!ev.lengthComputable) {
        return
      }

      this.uppy.emit('upload-progress', file, {
        uploader: this,
        bytesUploaded: ev.loaded,
        bytesTotal: ev.total,
      })
    })

    return new Promise((resolve, reject) => {
      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          const uploadResp = {
            status: xhr.status,
            body: xhr.response.body,
            uploadURL,
          }

          this.uppy.emit('upload-success', file, uploadResp)

          return resolve({ file, uploadURL, photoFilename })
        } else {
          this.uppy.emit('upload-error', file, 'Upload Error', xhr.response)
          return reject('Upload Error')
        }
      })

      xhr.addEventListener('error', () => {
        this.uppy.emit('upload-error', file, 'Upload Error')
        return reject('Upload Error')
      })

      xhr.open('PUT', uploadURL, true)
      xhr.setRequestHeader('Content-Type', 'image/jpeg')
      xhr.send(file.data)
    })
  }

  upload = async (fileIDs: string[]) => {
    const results = await Promise.all(fileIDs.map((fileID) => this.uploadFile(fileID)))

    results.forEach((result) => {
      const file = this.uppy.getFile(result.file.id)

      this.uppy.setFileState(file.id, {
        ...file,
        name: result.photoFilename,
      })
    })

    const urls = results.map((result) => result.photoFilename)
    this.resolveFilenames(urls)
  }

  install() {
    this.uppy.addUploader(this.upload)
  }

  uninstall() {
    this.uppy.removeUploader(this.upload)
  }
}

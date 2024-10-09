import { Platform } from 'react-native'
import { DEV_MediaURL, uploadMediaFunctionURL } from '../../../firebase/config'
import { processMediaFile } from '../../mediaProcessor'

const uploadFile = async file => {
  const uri = file?.uri
  const type = file?.mimeType ?? 'image'
  const fallbackName = Platform.select({
    native: uri.substring(uri?.lastIndexOf('/') + 1),
    default: 'webdefaultbase24',
  })

  const uriParts = uri.split('.')
  const fileType = uriParts[uriParts.length - 1]

  console.log('raw file object', file)

  var fileData = Platform.select({
    web: {
      name: file?.name ?? file?.fileName ?? fallbackName,
      fileName: file?.name ?? file?.fileName ?? fallbackName,
      ...file,
      uri: file?.uri,
      type: 'image',
    },
    android: {
      ...file,
      name: file?.name ?? file?.fileName ?? fallbackName,
      mimetype: `${type}/${fileType}`,
      type: `${type}/${fileType}`,
    },
    default: {
      ...file,
      name: file?.name ?? file?.fileName ?? fallbackName,
      mimetype: file?.type ?? 'image/jpeg',
      type: 'image',
    },
  })

  console.log('this this this', fileData)
  // When in release mode, we need to explicitly remove all null values set by image/video pickers, otherwise the app will crash when on App Store
  Object.keys(fileData).forEach(k => fileData[k] == null && delete fileData[k])

  const formData = new FormData()
  formData.append('file', fileData)

  console.log(fileData)
  console.log('FormData FormData', fileData)
  try {
    const res = await fetch(DEV_MediaURL, {
      method: 'POST',
      body: formData,
      // mode: 'no-cors',
      headers: Platform.select({
        web: new Headers({
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data;boundary="boundary"',
        }),
        android: new Headers({
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        }),
        default: new Headers({
          'Content-Type': 'multipart/form-data',
        }),
      }),
    })

    console.log('Resssss', res)
    console.log('res?.url res?.url', await res?.json())
    // const jsonData = await j
    // console.log('jsonData jsonData', JSON.stringify(await res.json()))
    // return jsonData?.downloadURL
  } catch (error) {
    console.log('error uploading file', error)
    return null
  }
}

const processAndUploadMediaFile = file => {
  return new Promise((resolve, _reject) => {
    processMediaFile(file, ({ processedUri, thumbnail }) => {
      uploadFile(file)
        .then(downloadURL => {
          if (thumbnail) {
            uploadFile(thumbnail)
              .then(thumbnailURL => {
                resolve({ downloadURL, thumbnailURL })
              })
              .catch(e => resolve({ error: 'photoUploadFailed' }))
            return
          }
          resolve({ downloadURL })
        })
        .catch(e => resolve({ error: 'photoUploadFailed' }))
    })
  })
}

const uploadMedia = async mediaAsset => {
  try {
    const response = await processAndUploadMediaFile(mediaAsset)
    return {
      ...mediaAsset,
      downloadURL: response.downloadURL,
      thumbnailURL: response.thumbnailURL ?? response.downloadURL,
    }
  } catch (error) {
    console.log('error uploading media', error)
    return null
  }
}

const firebaseStorage = {
  processAndUploadMediaFile,
  uploadMedia,
}

export default firebaseStorage

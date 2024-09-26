import { Dimensions, Platform } from 'react-native'

export const DEVICE_WIDTH = Dimensions.get('window').width
export const DEVICE_HEIGHT = Dimensions.get('window').height

export const IS_ANDROID = Platform.OS === 'android'

export const LOCAL_STORAGE_KEY = 'mid5LocalStorage'

export const formatNumber = num => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B' // Converts to billions
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M' // Converts to millions with one decimal
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K' // Converts to thousands with one decimal
  } else {
    return String(num) // Returns the number as is if it's less than 1000
  }
}

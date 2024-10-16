import fauth from '@react-native-firebase/auth'
import ffirestore from '@react-native-firebase/firestore'
import ffunctions from '@react-native-firebase/functions'

export const db = ffirestore()
export const auth = fauth
export const firestore = ffirestore
export const functions = ffunctions
export const uploadMediaFunctionURL =
  'https://us-central1-real-estate-rn-fb417.cloudfunctions.net/uploadMedia'

export const DEV_MediaURL =
  'http://10.0.2.2:5001/real-estate-rn-fb417/us-central1/uploadMedia'

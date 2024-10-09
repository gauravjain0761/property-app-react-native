import React, { useEffect } from 'react'
import { LogBox } from 'react-native'
import { Provider } from 'react-redux'
import SplashScreen from 'react-native-splash-screen'
import {
  DopebaseProvider,
  extendTheme,
  TranslationProvider,
  ActionSheetProvider,
} from './core/dopebase'
import configureStore from './redux/store'
import AppContent from './AppContent'
import translations from './translations/'
import { ConfigProvider } from './config'
import { AuthProvider } from './core/onboarding/hooks/useAuth'
import { ProfileAuthProvider } from './core/profile/hooks/useProfileAuth'
import { authManager } from './core/onboarding/api'
import InstamobileTheme from './theme'
import { firestore, functions } from './core/firebase/config'

const store = configureStore()

const App = () => {
  const theme = extendTheme(InstamobileTheme)

  if (__DEV__) {
    functions().useEmulator('localhost', 5001)
    functions().useFunctionsEmulator('http://localhost:5001')
  }

  useEffect(() => {
    SplashScreen.hide()
    LogBox.ignoreAllLogs(true)
  }, [])

  useEffect(() => {
    functions()
      .httpsCallable('uploadMedia')({
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        console.log('=>>>>>> response', response)
        // some response
      })
      .catch(error => {
        console.log('error uploading file', error)
      })
  }, [])

  return (
    <Provider store={store}>
      <TranslationProvider translations={translations}>
        <DopebaseProvider theme={theme}>
          <ConfigProvider>
            <AuthProvider authManager={authManager}>
              <ProfileAuthProvider authManager={authManager}>
                <ActionSheetProvider>
                  <AppContent />
                </ActionSheetProvider>
              </ProfileAuthProvider>
            </AuthProvider>
          </ConfigProvider>
        </DopebaseProvider>
      </TranslationProvider>
    </Provider>
  )
}

export default App

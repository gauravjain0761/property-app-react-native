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
import { functions } from './core/firebase/config'

const store = configureStore()

const App = () => {
  const theme = extendTheme(InstamobileTheme)

  // if (__DEV__) {
  //   // If you are running on a physical device, replace http://localhost with the local ip of your PC. (http://192.168.x.x)
  //   functions().useEmulator('10.0.2.2', 5001)
  // }

  useEffect(() => {
    SplashScreen.hide()
    LogBox.ignoreAllLogs(true)
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

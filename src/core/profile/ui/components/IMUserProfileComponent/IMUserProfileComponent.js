import React, { useState } from 'react'
import { Text, View, StatusBar, Image } from 'react-native'
import { useTheme, useTranslations } from '../../../../dopebase'
import dynamicStyles from './styles'
import IMProfileItemView from '../IMProfileItemView/IMProfileItemView'
import { ProfilePictureSelector } from '../../../../dopebase/core/components/advanced'
import { updateProfilePhoto } from '../../../../users'
import { storageAPI } from '../../../../media'
import { useCurrentUser } from '../../../../onboarding'

const IMUserProfileComponent = props => {
  const { menuItems, onUpdateUser, onLogout } = props

  const currentUser = useCurrentUser()

  const { profilePictureURL, id } = currentUser
  const { isPhoneVerified, isEmailVerified } = currentUser || {}

  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const [profilePicture, setProfilePicture] = useState(profilePictureURL)

  const displayName = () => {
    const { firstName, lastName, fullname } = currentUser
    if (
      (firstName && firstName.length > 0) ||
      (lastName && lastName.length > 0)
    ) {
      return firstName + ' ' + lastName
    }
    return fullname || ''
  }

  const setProfilePictureFile = async photoFile => {
    if (photoFile == null) {
      // Remove profile photo action
      setProfilePicture(null)
      const finalRes = await updateProfilePhoto(id, null)
      if (finalRes.success == true) {
        onUpdateUser &&
          onUpdateUser({ ...currentUser, profilePictureURL: null })
      }
      return
    }
    // If we have a photo, we upload it to the backend, and then update the user
    const response = await storageAPI.processAndUploadMediaFile(photoFile)
    if (response.error) {
      // there was an error, fail silently
    } else {
      const finalRes = await updateProfilePhoto(
        id,
        response.downloadKey ?? response.downloadURL,
      )
      if (finalRes.success == true) {
        onUpdateUser &&
          onUpdateUser({
            ...currentUser,
            profilePictureURL: response.downloadURL,
          })
      }
    }
  }

  const renderMenuItem = (menuItem, index) => {
    const { title, icon, onPress, tintColor } = menuItem
    return (
      <IMProfileItemView
        title={title}
        icon={icon}
        iconStyle={{ tintColor: tintColor }}
        onPress={onPress}
        key={index}
      />
    )
  }

  const myProfileScreenContent = () => {
    return (
      <>
        <View style={styles.container}>
          <StatusBar
          // backgroundColor={useDynamicValue('#ffffff', '#121212')}
          // barStyle={useDynamicValue('dark-content', 'light-content')}
          />
          <View style={styles.imageContainer}>
            <ProfilePictureSelector
              setProfilePictureFile={setProfilePictureFile}
              profilePictureURL={profilePicture}
            />
          </View>
          <View style={styles.namecontainer}>
            <Text style={styles.userName}>{displayName()}</Text>
            {isPhoneVerified && isEmailVerified ? (
              <Image source={theme?.icons?.verify} style={styles.verifyicon} />
            ) : null}
          </View>
          {menuItems.map((menuItem, index) => {
            return renderMenuItem(menuItem, index)
          })}
          <Text onPress={onLogout} style={styles.logout}>
            {localized('Logout')}
          </Text>
        </View>
      </>
    )
  }

  return <>{myProfileScreenContent()}</>
}

export default IMUserProfileComponent

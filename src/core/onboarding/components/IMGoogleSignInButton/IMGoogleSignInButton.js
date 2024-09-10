import React from 'react'
import { Image, Text, TouchableOpacity } from 'react-native'
import { useTheme } from '../../../dopebase'
import dynamicStyles from './styles'

export default function IMGoogleSignInButton({
  containerStyle,
  onPress,
  title = 'Sign in with Google',
  titleStyle,
}) {
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ ...styles.googlebuttonStyle, ...containerStyle }}>
      <Image
        source={require('../../../../assets/icons/googlebutton.png')}
        style={styles.image}
      />
      <Text style={{ ...styles.title, ...titleStyle }}>{title}</Text>
    </TouchableOpacity>
  )
}

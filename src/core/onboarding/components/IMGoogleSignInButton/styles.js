import { StyleSheet } from 'react-native'

const dynamicStyles = (theme, appearance) => {
  return StyleSheet.create({
    image: {
      width: 20,
      height: 20,
    },
    title: {
      fontSize: 14,
      color: theme.colors[appearance].primaryText,
      fontWeight: '500',
    },
    googlebuttonStyle: {
      elevation: 0,
      paddingHorizontal: Platform.OS == 'android' ? 12 : 16,
      borderWidth: 0.5,
      borderColor: '#747775',
      borderStyle: 'solid',
      paddingVertical: 10,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center',
      gap: Platform.OS == 'android' ? 10 : 12,
      backgroundColor: theme?.colors[appearance]?.primaryBackground,
    },
  })
}

export default dynamicStyles

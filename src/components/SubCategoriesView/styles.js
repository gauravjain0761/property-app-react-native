import { Dimensions, StyleSheet } from 'react-native'

const dynamicStyles = (theme, appearance) => {
  const WINDOW_WIDTH = Dimensions.get('window').width
  const WINDOW_HEIGHT = Dimensions.get('window').height
  const SCREEN_WIDTH =
    WINDOW_WIDTH < WINDOW_HEIGHT ? WINDOW_WIDTH : WINDOW_HEIGHT

  const numColumns = 2
  return StyleSheet.create({
    container: {
      width: (SCREEN_WIDTH - 18 * 3) / numColumns,
      backgroundColor: theme.colors[appearance].primaryWhite,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,
      elevation: 7,
      overflow: 'hidden',
    },
    imageContainer: {
      flex: 1,
      borderRadius: 8,
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: 120,
      flex: 1,
    },
    nameContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 5,
      backgroundColor: theme.colors[appearance].primaryWhite,
    },
    name: {
      color: theme.colors[appearance].Text,
    },
  })
}

export default dynamicStyles

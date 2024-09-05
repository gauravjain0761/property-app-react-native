import { StyleSheet, Dimensions } from 'react-native'

const width = Dimensions.get('window').width

const dynamicStyles = (theme, appearance) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.colors[appearance].primaryBackground,
      flex: 1,
      // alignItems: 'center',
      paddingTop: 10,
    },
    mapView: {
      width: '100%',
      height: '100%',
      backgroundColor: theme.colors[appearance].grey6,
    },
    filtersButton: {
      marginRight: 10,
    },
    toggleButton: {
      marginRight: 7,
    },
    listContainer: {
      backgroundColor: theme.colors[appearance].primaryBackground,
      flex: 1,
      // padding: 15,
    },
  })
}

export default dynamicStyles

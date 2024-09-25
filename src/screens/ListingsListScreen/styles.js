import { StyleSheet } from 'react-native'

const dynamicStyles = (theme, appearance) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.colors[appearance].primaryBackground,
      flex: 1,
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
    priceMarker: {
      backgroundColor: theme.colors[appearance].primaryBackground,
      borderRadius: 50,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 7,
      },
      shadowOpacity: 0.43,
      shadowRadius: 1.51,
      elevation: 1,
    },
    darkMarker: {
      backgroundColor: theme.colors[appearance]?.black,
      borderRadius: 50,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 7,
      },
      shadowOpacity: 0.43,
      shadowRadius: 1.51,
      elevation: 1,
    },
    markerText: {
      color: theme.colors[appearance].primaryText,
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    darkMarkerText: {
      color: theme.colors[appearance].TextPrimary,
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    card: {
      position: 'absolute',
      bottom: 20,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    paginationContainer: {
      flex: 1,
      position: 'absolute',
      alignSelf: 'center',
      paddingVertical: 8,
      marginTop: 220,
    },
    paginationDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginHorizontal: 0,
    },
    photoItem: {
      backgroundColor: theme.colors[appearance].grey6,
      height: 250,
      width: '100%',
    },
    carousel: {
      backgroundColor: 'yellow',
    },
  })
}
export default dynamicStyles

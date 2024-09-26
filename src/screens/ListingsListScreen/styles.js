import { StyleSheet } from 'react-native'
import { colors } from 'react-native-elements'

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
      justifyContent: 'center',
      // alignItems: 'center',
      borderRadius: 10,
      overflow: 'hidden',
      // alignSelf: 'center',
      marginHorizontal: 20,
    },
    paginationContainer: {
      flex: 1,
      position: 'absolute',
      alignSelf: 'center',
      paddingVertical: 8,
      bottom: 80,
    },
    paginationDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginHorizontal: 0,
    },
    photoItem: {
      backgroundColor: theme.colors[appearance].grey6,
      height: 200,
      width: '100%',
    },
    carousel: {},
    bottompart: {
      backgroundColor: theme.colors[appearance].primaryBackground,
      // width: '100%',
      padding: 16,
      flexDirection: 'row',
      alignItems: 'flex-start',
      // flex: 1,
      justifyContent: 'space-between',
    },
    title: {
      color: theme.colors[appearance].primaryText,
      fontSize: 16,
      fontWeight: '600',
    },
    price: {
      color: theme.colors[appearance].primaryText,
      fontSize: 14,
      fontWeight: '400',
      left: 2,
    },
    star: {
      tintColor: theme.colors[appearance].black,
      width: 15,
      height: 15,
    },
    rating: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 2,
      top: 2,
    },
    ratingText: {
      color: theme.colors[appearance].primaryText,
      fontWeight: '400',
      fontSize: 14,
    },
    cardStyle: { borderRadius: 10, overflow: 'hidden' },
  })
}
export default dynamicStyles

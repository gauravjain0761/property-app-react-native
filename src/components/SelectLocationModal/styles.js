import { StyleSheet } from 'react-native'

const styles = (theme, appearance) =>
  StyleSheet.create({
    body: {
      flex: 1,
      backgroundColor: theme.colors[appearance].primaryBackground,
      position: 'absolute',
      width: '100%',
      height: '100%',
      bottom: 0,
      zIndex: 999,
    },
    topbar: {
      position: 'absolute',
      backgroundColor: theme.colors[appearance]?.primaryBackground,
      width: '100%',
      top: 0,
    },
    mapView: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: theme.colors[appearance].grey6,
    },

    bar: {
      height: 50,
      marginTop: Platform.OS === 'ios' ? 30 : 0,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    rightButton: {
      paddingRight: 16,
      backgroundColor: 'transparent',
      color: theme.colors[appearance].primaryForeground,
      fontWeight: 'normal',
    },
    rightButtonText: {
      color: theme.colors[appearance].primaryForeground,
      fontWeight: 'normal',
    },
    bottomBar: {
      backgroundColor: theme.colors[appearance].primaryBackground,
      paddingVertical: 10,
      position: 'absolute',
      bottom: 20,
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      paddingHorizontal: 10,
      borderRadius: 50,
      gap: 5,
      borderColor: theme.colors[appearance].primaryForeground,
      borderWidth: 2,
    },
    locationValue: {
      color: theme.colors[appearance].primaryText,
      fontSize: 14,
      bottom: 1,
    },
    locationIcon: {
      width: 22,
      height: 22,
      tintColor: theme.colors[appearance].primaryText,
    },
    textInputContainer: {
      alignItems: 'center',
      backgroundColor: theme.colors[appearance].primaryBackground,
      borderRadius: 4,
      borderColor: theme.colors[appearance].grey6,
      borderWidth: 1,
      paddingLeft: 8,
    },
    container: {
      paddingHorizontal: 16,
      alignItems: 'center',
      top: 80,
      zIndex: 10,
    },
    textInput: {
      marginBottom: 0,
      backgroundColor: theme.colors[appearance].primaryBackground,
      color: theme.colors[appearance].primaryText,
    },
    listView: {
      marginTop: 10,
      borderRadius: 8,
      overflow: 'hidden',
    },
    description: {
      color: theme.colors[appearance].primaryText,
    },
    row: {
      backgroundColor: theme.colors[appearance].primaryBackground,
    },
  })

export default styles

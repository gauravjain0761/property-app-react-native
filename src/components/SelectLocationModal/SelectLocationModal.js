import React, { useEffect, useState } from 'react'
import { ImageBackground, Modal, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { useTheme, useTranslations, Button, Text, Image } from '../../core/dopebase'
import { Configuration } from '../../Configuration'
import dynamicStyles from './styles'
import * as Location from 'expo-location'

function SelectLocationModal(props) {
  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const { location } = props

  const [latitude, setLatitude] = useState(location?.latitude)
  const [longitude, setLongitude] = useState(location?.longitude)
  const [latitudeDelta, setLatitudeDelta] = useState(
    Configuration.map.delta.latitude,
  )
  const [longitudeDelta, setLongitudeDelta] = useState(
    Configuration.map.delta.longitude,
  )
  const [address, setAddress] = useState('Checking...')

  useEffect(() => {
    onChangeLocation(location)
  }, [])

  const onDone = () => {
    const { onDone } = props
    onDone &&
      onDone({
        latitude: latitude,
        longitude: longitude,
      })
  }

  const onCancel = () => {
    const { onCancel } = props
    onCancel && onCancel()
  }

  const onPress = event => {
    setLatitude(event.nativeEvent.coordinate.latitude)
    setLongitude(event.nativeEvent.coordinate.longitude)
  }

  const onRegionChange = region => {
    setLatitude(region.latitude)
    setLongitude(region.longitude)
    setLatitudeDelta(region.latitudeDelta)
    setLongitudeDelta(region.longitudeDelta)
    onChangeLocation(region)
  }

  const onChangeLocation = async location => {
    try {
      let json = await Location.reverseGeocodeAsync(location)
      const choosenIndex = Math.floor(json.length * 0.8)
      const formatted_address = `${json[choosenIndex].city}, ${json[choosenIndex].region}.`
      setAddress(formatted_address)
    } catch (error) {
      console.log(error)
      setAddress('Unknown')
    }
  }

  return (
    <Modal animationType="slide" transparent={false} onRequestClose={onCancel}>
      <View style={styles.body}>
        <MapView
          ref={map => (map = map)}
          onPress={onPress}
          style={styles.mapView}
          onRegionChangeComplete={onRegionChange}
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: latitudeDelta,
            longitudeDelta: longitudeDelta,
          }}>
          <Marker
            draggable
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}
            onDragEnd={onPress}
          />
        </MapView>
        <View style={[styles.bar, styles.topbar]}>
          <Button
            containerStyle={styles.rightButton}
            textStyle={styles.rightButtonText}
            onPress={onDone}
            text={localized('Done')}
          />
        </View>
        <View style={[styles.bottomBar]}>
          <Image style={[styles.locationIcon]} source={theme.icons.pinpoint} />
          <Text style={[styles.locationValue]}>{address}</Text>
        </View>
      </View>
    </Modal>
  )
}

export default SelectLocationModal

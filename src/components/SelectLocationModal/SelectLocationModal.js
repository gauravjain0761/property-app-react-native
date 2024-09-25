import React, { useEffect, useState } from 'react'
import { ImageBackground, Modal, TouchableOpacity, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { useTheme, useTranslations, Button, Text } from '../../core/dopebase'
import { Configuration } from '../../Configuration'
import dynamicStyles from './styles'
import * as Location from 'expo-location'
import Geolocation from '@react-native-community/geolocation'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { useConfig } from '../../config'
import { Image } from 'react-native'

function SelectLocationModal(props) {
  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)
  const { reverseGeoCodingAPIKey, mapDark } = useConfig()

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

  const onPresscurrentLocation = () => {
    Geolocation?.getCurrentPosition(
      position => {
        setLatitude(position?.coords?.latitude)
        setLongitude(position?.coords?.longitude)
        onChangeLocation(position?.coords)
      },
      error => console.log(error.message),
    )
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

  const onSelectSearch = location => {
    setLatitude(location?.latitude)
    setLongitude(location?.longitude)
  }

  return (
    <View style={styles.body}>
      <MapView
        ref={map => (map = map)}
        onPress={onPress}
        customMapStyle={appearance == 'dark' ? mapDark : []}
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
        <Text style={[styles.locationValue, { marginLeft: 16 }]}>
          {address}
        </Text>
        <Button
          containerStyle={styles.rightButton}
          textStyle={styles.rightButtonText}
          onPress={onDone}
          text={localized('Done')}
        />
      </View>
      <GooglePlacesAutocomplete
        placeholder={'Enter location address'}
        minLength={2} // minimum length of text to search
        autoFocus={false}
        listViewDisplayed={false}
        fetchDetails={true}
        enablePoweredByContainer={false}
        styles={{
          textInputContainer: styles.textInputContainer,
          container: styles.container,
          textInput: styles.textInput,
          listView: styles.listView,
          description: styles.description,
          row: styles.row,
        }}
        textInputProps={{
          placeholderTextColor: theme.colors[appearance]?.secondaryText,
        }}
        renderLeftButton={() => (
          <Image
            style={styles.locationIcon}
            resizeMode="cover"
            source={theme.icons.search}
          />
        )}
        onPress={(data, details = null) => {
          onSelectSearch({
            latitude: details?.geometry?.location?.lat,
            longitude: details?.geometry?.location?.lng,
            latitudeDelta: latitudeDelta,
            longitudeDelta: longitudeDelta,
          })
        }}
        query={{
          key: reverseGeoCodingAPIKey,
          language: 'en',
        }}
        debounce={200}
      />
      <TouchableOpacity
        onPress={() => onPresscurrentLocation()}
        style={[styles.bottomBar]}>
        <Image
          style={[styles.locationIcon]}
          source={theme.icons.current_location}
        />
        <Text style={[styles.locationValue]}>{'current location'}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SelectLocationModal

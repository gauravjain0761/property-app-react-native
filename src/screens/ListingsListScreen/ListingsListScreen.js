import React, { useState, useEffect, useRef, useMemo } from 'react'
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  Text,
  View,
} from 'react-native'
import Geolocation from '@react-native-community/geolocation'
import {
  useTheme,
  useTranslations,
  ActivityIndicator,
  EmptyStateView,
} from '../../core/dopebase'
import { listingsAPI } from '../../core/listing/api'
import HeaderButton from '../../components/HeaderButton/HeaderButton'
import { Configuration } from '../../Configuration'
import MapView, { Marker } from 'react-native-maps'
import FilterViewModal from '../../components/FilterViewModal/FilterViewModal'
import dynamicStyles from './styles'
import { useSelector } from 'react-redux'
import ListingView from '../../components/ListingView/ListingView'
import { IMAdMobBanner } from '../../core/ads/google'
import { useConfig } from '../../config'
import { formatNumber } from '../../helpers/statics'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { TouchableOpacity } from 'react-native-gesture-handler'

function ListingsListScreen(props) {
  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const config = useConfig()

  const { navigation, route } = props

  const favorites = useSelector(state => state.favorites.favoriteItems)

  const item = route?.params?.item
  const { width: viewportWidth, height: viewportHeight } =
    Dimensions.get('window')

  const [category, setCategory] = useState(item)
  const [filter, setFilter] = useState({})
  const [listings, setListings] = useState(null)
  const [filteredListings, setFilteredListings] = useState(null)
  const [mapMode, setMapMode] = useState(false)
  const [filterModalVisible, setFilterModalVisible] = useState(false)
  const [latitude, setLatitude] = useState(Configuration?.map?.origin?.latitude)
  const [longitude, setLongitude] = useState(
    Configuration?.map?.origin?.longitude,
  )
  const [activeSlide, setActiveSlide] = useState(0)
  const [latitudeDelta, setLatitudeDelta] = useState(
    Configuration?.map?.delta?.latitude,
  )
  const [longitudeDelta, setLongitudeDelta] = useState(
    Configuration?.map?.delta?.longitude,
  )
  const [shouldUseOwnLocation, setShouldUseOwnLocation] = useState(false) // Set this to true to show the user's location
  const [selectItem, setSelectItem] = useState({})

  const unsubscribe = useRef(null)
  const mapRef = useRef(null)

  useEffect(() => {
    let currentTheme = theme.colors[appearance]

    navigation.setOptions({
      title:
        typeof route?.params == 'undefined' ||
        typeof route?.params.item == 'undefined'
          ? localized('Listings')
          : route?.params?.item?.name || route?.params?.item?.title,
      headerTintColor: currentTheme.primaryForeground,
      headerTitleStyle: { color: currentTheme.primaryText },
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>
          <HeaderButton
            customStyle={styles.toggleButton}
            style={{
              tintColor: theme.colors[appearance].primaryForeground,
            }}
            icon={mapMode ? theme.icons.list : theme.icons.map}
            onPress={() => {
              onChangeMode()
            }}
          />
          <HeaderButton
            customStyle={styles.filtersButton}
            style={{
              tintColor: theme.colors[appearance].primaryForeground,
            }}
            icon={theme.icons.filters}
            onPress={() => onSelectFilter()}
          />
        </View>
      ),
      headerStyle: {
        backgroundColor: currentTheme.primaryBackground,
        borderBottomColor: currentTheme.hairline,
      },
    })
  }, [mapMode])

  const onChangeLocation = location => {
    setLatitude(location.latitude)
    setLongitude(location.longitude)
    animateToInitialRegion(location)
  }

  const onSelectFilter = () => {
    setFilterModalVisible(true)
  }

  const onSelectFilterCancel = () => {
    setFilterModalVisible(false)
  }

  useEffect(() => {
    if (!listings) {
      return
    }
    let tempListings = []
    for (let i = 0; i < listings.length; i++) {
      let listing = listings[i]
      let matched = true
      filter &&
        Object.keys(filter).forEach(function (key) {
          if (
            filter[key] != 'Any' &&
            filter[key] != 'All' &&
            listing.filters[key] != filter[key] &&
            listing[key] != filter[key]
          ) {
            matched = false
          }
        })
      listing.matched = matched
    }

    tempListings = listings?.filter(listing => listing?.matched)

    setFilteredListings(tempListings)
  }, [filter, listings])

  const onSelectFilterDone = newfilter => {
    setFilter(newfilter)
    setFilterModalVisible(false)
  }

  const onChangeMode = () => {
    const newMode = !mapMode
    setMapMode(newMode)
  }

  const onListingsUpdate = listingsData => {
    let max_latitude = -400,
      min_latitude = 400,
      max_longitude = -400,
      min_logitude = 400

    const filter = filter

    for (let i = 0; i < listingsData.length; i++) {
      let matched = true
      filter &&
        Object.keys(filter).forEach(function (key) {
          if (
            filter[key] != 'Any' &&
            filter[key] != 'All' &&
            listing.filters[key] != filter[key]
          ) {
            matched = false
          }
        })

      console.log('matched=' + matched)

      if (!matched) return

      let listing = listingsData[i]
      if (max_latitude < listing.latitude) max_latitude = listing?.latitude
      if (min_latitude > listing.latitude) min_latitude = listing?.latitude
      if (max_longitude < listing.longitude) max_longitude = listing?.longitude
      if (min_logitude > listing.longitude) min_logitude = listing?.longitude
    }

    console.log(min_latitude)
    console.log(max_latitude)
    console.log(min_logitude)
    console.log(max_longitude)
    if (!shouldUseOwnLocation || !latitude) {
      const deltaLong = Math.min(
        Math.abs(((max_longitude - min_logitude) / 2) * 3),
        400,
      )
      const deltaLat = Math.min(
        Math.abs(((max_longitude - min_logitude) / 2) * 3),
        400,
      )

      setLongitudeDelta(deltaLong)
      setLatitudeDelta(deltaLat)
      setListings(listingsData)
      setLatitude((max_latitude + min_latitude) / 2)
      setLongitude((max_longitude + min_logitude) / 2)
      animateToInitialRegion({
        Latitude: (max_latitude + min_latitude) / 2,
        Longitude: (max_longitude + min_logitude) / 2,
      })
    } else {
      setListings(listingsData)
    }
  }

  const onListingPress = item => {
    props.navigation.navigate('SingleListingScreen', {
      item: item,
      customLeft: true,
      routeName: 'ListingsList',
    })
  }
  useEffect(() => {
    unsubscribe.current = listingsAPI.subscribeListings(
      { categoryId: category?.id },
      favorites,
      config.serverConfig.collections.listings,
      onListingsUpdate,
    )

    if (shouldUseOwnLocation) {
      Geolocation.getCurrentPosition(
        position => {
          onChangeLocation(position.coords)
        },
        error => console.log(error.message),
      )
    }

    return () => {
      unsubscribe?.current && unsubscribe?.current()
    }
  }, [])

  const onPress = item => {
    props.navigation.navigate('SingleListingScreen', {
      item: item,
      customLeft: true,
      headerLeft: () => <View />,
      routeName: 'Map',
    })
  }

  const onPressMarker = item => {
    setSelectItem(item)
  }

  const markerArr = filteredListings?.map(listing => {
    let currency = Object.values(config?.serverConfig?.currency)
      ?.filter(item => item == listing?.currency?.split(' ')[1])
      .toString()
    return (
      <Marker
        key={listing?.id}
        onPress={() => onPressMarker(listing)}
        coordinate={{
          latitude: listing?.latitude,
          longitude: listing?.longitude,
        }}>
        <TouchableOpacity
          style={[
            selectItem?.id == listing?.id
              ? styles.darkMarker
              : styles.priceMarker,
          ]}>
          <Text
            style={[
              selectItem?.id == listing?.id
                ? styles?.darkMarkerText
                : styles.markerText,
            ]}>
            {currency}
            {formatNumber(listing?.price)}
          </Text>
        </TouchableOpacity>
      </Marker>
    )
  })

  const renderListing = ({ item, index }) => {
    return (
      <>
        <ListingView listing={item} onPress={() => onListingPress(item)} />
        {config.adMobConfig && (index + 1) % 3 == 0 && (
          <IMAdMobBanner
            onAdFailedToLoad={error => console.log(error)}
            onAdLoaded={() => console.log('Ad loaded successfully')}
          />
        )}
      </>
    )
  }

  const animateToInitialRegion = center => {
    if (mapRef?.current) {
      mapRef?.current?.animateCamera(
        {
          center: center,
          pitch: 0,
          heading: 0,
          altitude: 1000,
          zoom: 10,
        },
        { duration: 1000 },
      )
    }
  }

  const renderEmptyComponent = useMemo(() => {
    const emptyStateConfig = {
      title: localized('No Listings'),
      description: localized(
        'There are currently no listings available in this category. All listings from this category will show up here.',
      ),
    }
    return (
      <EmptyStateView
        style={styles.emptyStateView}
        emptyStateConfig={emptyStateConfig}
      />
    )
  })

  const renderItem = ({ item }) => {
    if (!item) {
      return null
    }
    return (
      <View>
        {item.startsWith('https://') ? (
          <Image
            style={styles.photoItem}
            contentFit={'cover'}
            source={{ uri: item }}
          />
        ) : (
          <Image
            style={styles.photoItem}
            contentFit={'cover'}
            source={{ uri: 'https//:' }}
          />
        )}
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {!filteredListings && <ActivityIndicator />}
      {mapMode && filteredListings && (
        <>
          <MapView
            style={styles.mapView}
            ref={mapRef}
            toolbarEnabled={false}
            customMapStyle={appearance == 'dark' ? config?.mapDark : []}
            showsUserLocation={shouldUseOwnLocation}
            region={{
              latitude: latitude,
              latitudeDelta: latitudeDelta,
              longitude: longitude,
              longitudeDelta: longitudeDelta,
            }}>
            {markerArr}
          </MapView>
          {Object.values(selectItem)?.length > 0 && (
            <TouchableOpacity
              containerStyle={styles.card}
              onPress={() => onPress(selectItem)}
              activeOpacity={0.1}
              style={styles.cardStyle}>
              <Carousel
                data={selectItem?.photoURLs}
                renderItem={renderItem}
                sliderWidth={viewportWidth * 0.9}
                itemWidth={viewportWidth * 0.9}
                inactiveSlideScale={1}
                inactiveSlideOpacity={1}
                firstItem={0}
                loop={false}
                enableMomentum={true}
                enableSnap
                // loopClonesPerSide={2}
                autoplay={false}
                autoplayDelay={500}
                autoplayInterval={3000}
                onSnapToItem={index => setActiveSlide(index)}
              />
              <Pagination
                dotsLength={
                  selectItem?.photoURLs && selectItem?.photoURLs.length
                }
                activeDotIndex={activeSlide}
                containerStyle={styles.paginationContainer}
                dotColor={'rgba(255, 255, 255, 0.92)'}
                dotStyle={styles.paginationDot}
                inactiveDotColor="white"
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
              />
              <View style={styles.bottompart}>
                <View>
                  <Text style={styles.title}>
                    {selectItem?.title},{selectItem?.place?.split(',')[1]}
                  </Text>
                  <Text style={styles.price}>
                    {Object.values(config?.serverConfig?.currency)
                      ?.filter(
                        items => items == selectItem?.currency?.split(' ')[1],
                      )
                      ?.toString()}
                    {formatNumber(selectItem?.price)}
                  </Text>
                </View>
                <View style={styles.rating}>
                  <Image source={theme.icons?.starFilled} style={styles.star} />
                  <Text style={styles.ratingText}>
                    {selectItem?.starCount
                      ? Number(selectItem?.starCount).toFixed(1)
                      : '0.0'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        </>
      )}
      {!mapMode && filteredListings && (
        <FlatList
          data={filteredListings}
          renderItem={renderListing}
          keyExtractor={item => `${item.id}`}
          initialNumToRender={5}
          refreshing={false}
          ListEmptyComponent={renderEmptyComponent}
        />
      )}
      {filterModalVisible && (
        <FilterViewModal
          value={filter}
          onCancel={onSelectFilterCancel}
          onDone={onSelectFilterDone}
          category={category}
        />
      )}
    </View>
  )
}

export default ListingsListScreen

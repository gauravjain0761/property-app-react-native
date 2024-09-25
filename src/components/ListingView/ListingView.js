import React, { memo } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'
import { useTheme } from '../../core/dopebase'
import { getTimeFormat, timeFormat } from '../../core/helpers/timeFormat'
import dynamicStyles from './styles'
import { formatNumber } from '../../helpers/statics'

export default ListingView = memo(props => {
  const { listing, onPress } = props
  const { theme, appearance } = useTheme()

  const styles = dynamicStyles(theme, appearance)

  return (
    <TouchableOpacity onPress={() => onPress()}>
      <View style={styles.container}>
        <Image style={styles.avatarStyle} source={{ uri: listing?.photo }} />
        <View style={styles.titleContainer}>
          <>
            <Text style={styles.title}>{listing.title}</Text>
            <Text style={styles.time}>{getTimeFormat(listing.createdAt)}</Text>
          </>
          <Text style={styles.place}>{listing?.place}</Text>
        </View>
        <Text style={styles.price}>{formatNumber(listing?.price)}</Text>
        {/* <Text style={styles.price}>{listing?.price}</Text> */}
      </View>
    </TouchableOpacity>
  )
})

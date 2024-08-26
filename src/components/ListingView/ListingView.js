import React, { memo } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'
import { useTheme } from '../../core/dopebase'
import { timeFormat } from '../../core/helpers/timeFormat'
import dynamicStyles from './styles'

export default ListingView = memo(props => {
  const { listing, onPress } = props
  const { theme, appearance } = useTheme()

  const styles = dynamicStyles(theme, appearance)

  return (
    <TouchableOpacity onPress={() => onPress()}>
      <View style={styles.container}>
        <Image style={styles.avatarStyle} source={{ uri: listing.photo }} />
        <View style={styles.titleContainer}>
          <>
            <Text style={styles.title}>{listing.title}</Text>
            <Text style={styles.time}>{timeFormat(listing.createdAt)}</Text>
          </>
          <Text style={styles.place}>{listing.place}</Text>
        </View>
        <Text style={styles.price}>{listing.price}</Text>
      </View>
    </TouchableOpacity>
  )
})

import { View, Text, Image } from 'react-native'
import React, { memo } from 'react'
import { useTheme, useTranslations } from '../../core/dopebase'
import dynamicStyles from './styles'
import { TouchableOpacity } from 'react-native'

const SubCategoriesView = props => {
  const { theme, appearance } = useTheme()
  const { listing, onPress } = props || {}
  const styles = dynamicStyles(theme, appearance)
  const { localized } = useTranslations()
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => onPress()}>
      <View style={[styles.container]}>
        <View style={[styles.imageContainer]}>
          <Image
            resizeMode="cover"
            source={{ uri: listing.photo }}
            style={styles.image}
          />
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{localized(listing.name)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default memo(SubCategoriesView)

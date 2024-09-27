import React, { useState, useRef, useEffect } from 'react'
import { Modal, SafeAreaView, ScrollView, Text, View } from 'react-native'
import { filterAPI } from '../../core/listing/api'
import ModalSelector from 'react-native-modal-selector'
import { useTheme, useTranslations, Button } from '../../core/dopebase'
import dynamicStyles from './styles'
import { useConfig } from '../../config'

function FilterViewModal(props) {
  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)
  const config = useConfig()

  const [data, setData] = useState([])
  const [filter, setFilter] = useState(props?.value)
  const selectedCurren = props?.selectedCurren || filter?.currency

  const unsubscribe = useRef(null)

  const onCollectionUpdate = updatedData => {
    updatedData?.forEach(updatedFilter => {
      if (filter[updatedFilter.name]) {
        updatedData.name = filter[updatedFilter.name]
      }
    })
    let newDatas = updatedData?.filter(
      filters => filters?.name != props?.ignoreFilds,
    )
    setData(newDatas ? newDatas : updatedData)
  }

  useEffect(() => {
    unsubscribe.current = filterAPI?.subscribeFilters(
      config.serverConfig.collections.filters,
      props.category?.id,
      onCollectionUpdate,
      props.subCategories?.id,
    )
    return () => {
      unsubscribe?.current && unsubscribe?.current()
    }
  }, [])

  const onDone = () => {
    props.onDone(filter)
  }

  const onCancel = () => {
    props.onCancel()
  }

  const renderItem = item => {
    let filter_key = item?.name

    var newData = item?.options?.flatMap((option, index) => {
      if (item?.name == 'Price Range') {
        if (option == 'Any') {
          return {
            key: option,
            label: option,
          }
        } else {
          return {
            key: `${option} ${selectedCurren?.split(' ')[0]}`,
            label: `${option} ${selectedCurren?.split(' ')[0]}`,
          }
        }
      } else {
        return {
          key: option,
          label: option,
        }
      }
    })
    newData.unshift({ key: 'section', label: item.name, section: true })
    let initValue = item?.options[0]
    if (filter[filter_key]) {
      initValue = filter[filter_key]
    }

    return (
      <ModalSelector
        touchableActiveOpacity={0.9}
        key={item.id}
        data={newData}
        sectionTextStyle={styles.sectionTextStyle}
        optionTextStyle={styles.optionTextStyle}
        optionContainerStyle={styles.optionContainerStyle}
        cancelContainerStyle={styles.cancelContainerStyle}
        cancelTextStyle={styles.cancelTextStyle}
        selectedItemTextStyle={styles.selectedItemTextStyle}
        backdropPressToClose={true}
        cancelText={'Cancel'}
        initValue={initValue}
        onChange={option => {
          setFilter({ ...filter, [filter_key]: option.key })
        }}>
        <View style={styles.container}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.value}>{initValue}</Text>
        </View>
      </ModalSelector>
    )
  }

  const selectorArray = data?.map(item => {
    return renderItem(item)
  })

  return (
    <Modal animationType="slide" transparent={false} onRequestClose={onCancel}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={styles.body}>
          <View style={styles.bar}>
            <Text style={styles.titleBar}>{localized('Filters')}</Text>
            <Button
              containerStyle={styles.rightButton}
              textStyle={styles.rightButtonText}
              onPress={onDone}
              text={localized('Done')}
            />
          </View>
          {selectorArray}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  )
}

export default FilterViewModal

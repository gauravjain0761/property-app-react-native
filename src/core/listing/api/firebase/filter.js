import { firebase } from '@react-native-firebase/firestore'

export const subscribeFilters = (
  collection,
  categoryID,
  callback,
  subCategoriesID,
) => {
  const filterRef = firebase.firestore().collection(collection)

  return filterRef.onSnapshot(querySnapshot => {
    var updatedData = []
    querySnapshot?.forEach(doc => {
      const updatedFilter = doc.data()
      const isFilterCategory = getIsFilterCategory(
        updatedFilter,
        categoryID,
        subCategoriesID,
      )
      if (isFilterCategory) {
        updatedData.push({ ...updatedFilter, id: doc?.id })
      }
    })
    callback && callback(updatedData)
  })
}

const getIsFilterCategory = (filter, categoryID, subCategoriesID) => {
  if (filter.categories) {
    return filter.categories.includes(
      subCategoriesID ? subCategoriesID : categoryID,
    )
  } else {
    return true
  }
}

export default {
  subscribeFilters,
}

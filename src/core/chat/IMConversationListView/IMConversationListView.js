import React, { memo, useCallback, useEffect, useState } from 'react'
import IMConversationList from '../IMConversationList'
import { useChatChannels } from '../api'
import { useCurrentUser } from '../../onboarding'

const IMConversationListView = memo(props => {
  const {
    navigation,
    headerComponent,
    emptyStateConfig,
    onRefreshHeader,
    isChatUserItemPress,
  } = props
  const currentUser = useCurrentUser()

  const {
    channels,
    refreshing,
    loadingBottom,
    subscribeToChannels,
    loadMoreChannels,
    pullToRefresh,
    userList,
    getList,
  } = useChatChannels()

  const [channel, setChannel] = useState([])
  const [isData, setIsData] = useState(true)

  useEffect(() => {
    const unsubscribe = subscribeToChannels(currentUser?.id)
    userList()
    return () => {
      unsubscribe && unsubscribe()
    }
  }, [currentUser?.id])

  useEffect(() => {
    if (channels?.length && getList?.length) {
      getLists()
      setIsData(true)
    } else {
      setIsData(false)
    }
  }, [channels, getList])

  const onConversationPress = useCallback(
    (channel, isVerify) => {
      navigation.navigate('PersonalChat', {
        channel: { ...channel, name: channel?.title },
        isChatUserItemPress,
        isVerify,
      })
    },
    [navigation],
  )

  const getLists = () => {
    let lists = channels?.flatMap(item =>
      getList
        ?.map(list => {
          if (currentUser?.id != list?.id && item?.id?.search(list?.id) != -1) {
            return {
              ...item,
              isEmailVerified: list?.isEmailVerified,
              isPhoneVerified: list?.isPhoneVerified,
            }
          }
        })
        .filter(res => res),
    )
    setChannel(lists)
  }

  const onListEndReached = useCallback(() => {
    loadMoreChannels(currentUser?.id)
  }, [loadMoreChannels])

  const onPullToRefresh = useCallback(() => {
    pullToRefresh(currentUser?.id)
    onRefreshHeader?.(currentUser?.id)
  }, [pullToRefresh, onRefreshHeader])

  const pullToRefreshConfig = { refreshing, onRefresh: onPullToRefresh }

  return (
    <IMConversationList
      // loading={channel.length == 0}
      conversations={channel}
      onConversationPress={onConversationPress}
      emptyStateConfig={emptyStateConfig}
      user={currentUser}
      headerComponent={headerComponent}
      onListEndReached={onListEndReached}
      pullToRefreshConfig={pullToRefreshConfig}
      loadingBottom={loadingBottom}
      userList={getList}
      isData={isData}
    />
  )
})

export default IMConversationListView

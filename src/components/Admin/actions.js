export const ACTION_UPDATE_PLAYLIST = 'ACTION_UPDATE_PLAYLIST'
export const ACTION_UPDATE_USER_IDENTIFIER = 'ACTION_UPDATE_USER_IDENTIFIER'

export const updatePlayLists = (payload) => ({
  type: ACTION_UPDATE_PLAYLIST,
  payload
})

export const updateUserIdentifier = (payload) => ({
  type: ACTION_UPDATE_USER_IDENTIFIER,
  payload
})

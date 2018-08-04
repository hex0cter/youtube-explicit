export const ACTION_UPDATE_PLAYLISTS = 'ACTION_UPDATE_PLAYLISTS'
export const ACTION_UPDATE_USER_IDENTIFIER = 'ACTION_UPDATE_USER_IDENTIFIER'

export const updatePlayLists = (payload) => ({
  type: ACTION_UPDATE_PLAYLISTS,
  payload
})

export const updateUserIdentifier = (payload) => ({
  type: ACTION_UPDATE_USER_IDENTIFIER,
  payload
})

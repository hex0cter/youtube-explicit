export const ACTION_UPDATE_PLAYLISTS = 'ACTION_UPDATE_PLAYLISTS'
export const ACTION_UPDATE_USER_IDENTIFIER = 'ACTION_UPDATE_USER_IDENTIFIER'
export const ACTION_UPDATE_MAX_PLAY_TIME = 'ACTION_UPDATE_MAX_PLAY_TIME'
export const ACTION_UPDATE_MIN_REST_TIME = 'ACTION_UPDATE_MIN_REST_TIME'

export const updatePlayLists = (payload) => ({
  type: ACTION_UPDATE_PLAYLISTS,
  payload
})

export const updateUserIdentifier = (payload) => ({
  type: ACTION_UPDATE_USER_IDENTIFIER,
  payload
})

export const updateMaxPlayTime = (payload) => ({
  type: ACTION_UPDATE_MAX_PLAY_TIME,
  payload
})

export const updateMinRestTime = (payload) => ({
  type: ACTION_UPDATE_MIN_REST_TIME,
  payload
})

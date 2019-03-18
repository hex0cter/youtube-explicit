export const ACTION_UPDATE_VIDEO_LIST = 'ACTION_UPDATE_VIDEO_LIST'
export const ACTION_UPDATE_SELECTED_VIDEO = 'ACTION_UPDATE_SELECTED_VIDEO'
export const ACTION_UPDATE_USER_IDENTIFIER = 'ACTION_UPDATE_USER_IDENTIFIER'
export const ACTION_UPDATE_PLAYLISTS = 'ACTION_UPDATE_PLAYLISTS'
export const ACTION_UPDATE_IS_PLAYBACK_IN_PROGRESS = 'ACTION_UPDATE_IS_PLAYBACK_IN_PROGRESS'
export const ACTION_UPDATE_PLAYBACK_PROGRESS = 'ACTION_UPDATE_PLAYBACK_PROGRESS'
export const ACTION_UPDATE_PLAYER = 'ACTION_UPDATE_PLAYER'
export const ACTION_UPDATE_START_PLAY_TIME = 'ACTION_UPDATE_START_PLAY_TIME'
export const ACTION_UPDATE_START_REST_TIME = 'ACTION_UPDATE_START_REST_TIME'
export const ACTION_UPDATE_IS_USER_INTERACTION_ALLOWED = 'ACTION_UPDATE_IS_USER_INTERACTION_ALLOWED'
export const ACTION_UPDATE_MAX_PLAY_TIME = 'ACTION_UPDATE_MAX_PLAY_TIME'
export const ACTION_UPDATE_MIN_REST_TIME = 'ACTION_UPDATE_MIN_REST_TIME'

export const updateVideoList = (payload) => ({
  type: ACTION_UPDATE_VIDEO_LIST, payload
})

export const updateSelectedVideo = (payload) => ({
  type: ACTION_UPDATE_SELECTED_VIDEO, payload
})

export const updateUserIdentifier = (payload) => ({
  type: ACTION_UPDATE_USER_IDENTIFIER,
  payload
})

export const updatePlaylists = (payload) => ({
  type: ACTION_UPDATE_PLAYLISTS,
  payload
})

export const updateIsPlaybackInProgress = (payload) => ({
  type: ACTION_UPDATE_IS_PLAYBACK_IN_PROGRESS,
  payload
})

export const updatePlaybackProgress = (payload) => ({
  type: ACTION_UPDATE_PLAYBACK_PROGRESS,
  payload
})

export const updatePlayer = (payload) => ({
  type: ACTION_UPDATE_PLAYER,
  payload
})

export const updateStartPlayTime = (payload) => ({
  type: ACTION_UPDATE_START_PLAY_TIME,
  payload
})

export const updateStartRestTime = (payload) => ({
  type: ACTION_UPDATE_START_REST_TIME,
  payload
})

export const updateIsUserInteractionAllowed = (payload) => ({
  type: ACTION_UPDATE_IS_USER_INTERACTION_ALLOWED,
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

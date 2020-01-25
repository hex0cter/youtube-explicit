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
export const ACTION_UPDATE_FULL_SCREEN_TEXT = 'ACTION_UPDATE_FULL_SCREEN_TEXT'
export const ACTION_UPDATE_UI_MODE = 'ACTION_UPDATE_UI_MODE'
export const ACTION_UPDATE_USER_MODE = 'ACTION_UPDATE_USER_MODE'
export const ACTION_UPDATE_FORCE_REPOSITION = 'ACTION_UPDATE_FORCE_REPOSITION'
export const ACTION_UPDATE_VIDEOS_BY_PLAYLIST = 'ACTION_UPDATE_VIDEOS_BY_PLAYLIST'
export const ACTION_UPDATE_VIDEOS_BY_TIMESTAMP = 'ACTION_UPDATE_VIDEOS_BY_TIMESTAMP'
export const ACTION_UPDATE_VIDEO_SORTING_MODE = 'ACTION_UPDATE_VIDEO_SORTING_MODE'

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

export const updateFullScreenText = (payload) => ({
  type: ACTION_UPDATE_FULL_SCREEN_TEXT,
  payload
})

export const updateUIMode = (payload) => ({
  type: ACTION_UPDATE_UI_MODE,
  payload
})

export const updateUserMode = (payload) => ({
  type: ACTION_UPDATE_USER_MODE,
  payload
})

export const updateForceReposition = (payload) => ({
  type: ACTION_UPDATE_FORCE_REPOSITION,
  payload
})

export const updateVideosByPlaylist = (payload) => ({
  type: ACTION_UPDATE_VIDEOS_BY_PLAYLIST,
  payload
})

export const updateVideosByTimestamp = (payload) => ({
  type: ACTION_UPDATE_VIDEOS_BY_TIMESTAMP,
  payload
})

export const updateVideoSortingMode = (payload) => ({
  type: ACTION_UPDATE_VIDEO_SORTING_MODE,
  payload
})

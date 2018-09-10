export const ACTION_UPDATE_VIDEO_LIST = 'ACTION_UPDATE_VIDEO_LIST'
export const ACTION_UPDATE_SELECTED_VIDEO = 'ACTION_UPDATE_SELECTED_VIDEO'
export const ACTION_UPDATE_USER_IDENTIFIER = 'ACTION_UPDATE_USER_IDENTIFIER'
export const ACTION_UPDATE_PLAYLISTS = 'ACTION_UPDATE_PLAYLISTS'
export const ACTION_UPDATE_IS_PLAYBACK_IN_PROGRESS = 'ACTION_UPDATE_IS_PLAYBACK_IN_PROGRESS'
// export const ACTION_UPDATE_IS_VIDEO_DISPLAYED = 'ACTION_UPDATE_IS_VIDEO_DISPLAYED'

export const MAIN_WINDOW = 'MAIN_WINDOW'
export const PLAYBACK_WINDOW = 'PLAYBACK_WINDOW'

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
// export const updateIsVideoDisplayed = (payload) => ({
//   type: ACTION_UPDATE_IS_VIDEO_DISPLAYED,
//   payload
// })

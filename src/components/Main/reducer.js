import * as actions from './actions'
import * as modes from './modes'

const userIdentifier = localStorage.getItem('userIdentifier') || ''
const videosByTimestamp = localStorage.getItem('videosByTimestamp') ? JSON.parse(localStorage.getItem('videosByTimestamp')) : []
const videosByPlaylist = localStorage.getItem('videosByPlaylist') ? JSON.parse(localStorage.getItem('videosByPlaylist')) : []

const initialState = {
  playlists: [],
  videoList: [],
  videosByTimestamp,
  videosByPlaylist,
  videoSortingMode: null,
  selectedVideo: {playlistIndex: 0, videoIndex: 0},
  playbackProgress: 0,
  isPlaybackInProgress: false,
  userIdentifier,
  startPlayTime: null,
  startRestTime: null,
  isUserInteractionAllowed: true,
  player: null,
  maxPlayTime: 0,
  minRestTime: 0,
  fullScreenText: '',
  uiMode: modes.UI_LIST_PREVIEW_MODE,
  userMode: modes.USER_RESTING_MODE,
  forceReposition: false
}

const updateVideoList = (oldVideoList, newVideoList) => {
  const videoList = []
  newVideoList.forEach(video => {
    if (video.error) {
      const oldVideoInfo = oldVideoList.find(({id}) => id === video.id)
      if (oldVideoInfo) {
        videoList.push({...oldVideoInfo})
      }
    } else {
      videoList.push({...video})
    }
  })

  return videoList
}
function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.ACTION_UPDATE_VIDEO_LIST: {
      const videoList = updateVideoList(state.videoList, action.payload)
      return {
        ...state,
        videoList
      }
    }
    case actions.ACTION_UPDATE_VIDEOS_BY_PLAYLIST: {
      const videosByPlaylist = updateVideoList(state.videosByPlaylist, action.payload)
      localStorage.setItem('videosByPlaylist', JSON.stringify(videosByPlaylist))
      return {
        ...state,
        videosByPlaylist
      }
    }
    case actions.ACTION_UPDATE_VIDEOS_BY_TIMESTAMP: {
      const videosByTimestamp = updateVideoList(state.videosByTimestamp, action.payload)
      localStorage.setItem('videosByTimestamp', JSON.stringify(videosByTimestamp))
      return {
        ...state,
        videosByTimestamp
      }
    }
    case actions.ACTION_UPDATE_VIDEO_SORTING_MODE: {
      const videoSortingMode = action.payload
      const videoList = (videoSortingMode === modes.SORT_BY_TIMESTAMP_MODE) ? state.videosByTimestamp : state.videosByPlaylist
      return {
        ...state,
        videoSortingMode,
        videoList
      }
    }
    case actions.ACTION_UPDATE_SELECTED_VIDEO: {
      const selectedVideo = action.payload
      return {
        ...state,
        selectedVideo
      }
    }
    case actions.ACTION_UPDATE_USER_IDENTIFIER: {
      const userIdentifier = action.payload
      return {
        ...state,
        userIdentifier
      }
    }
    case actions.ACTION_UPDATE_PLAYLISTS: {
      const playlists = action.payload
      return {
        ...state,
        playlists
      }
    }
    case actions.ACTION_UPDATE_IS_PLAYBACK_IN_PROGRESS: {
      const isPlaybackInProgress = action.payload
      return {
        ...state,
        isPlaybackInProgress
      }
    }
    case actions.ACTION_UPDATE_PLAYBACK_PROGRESS: {
      const playbackProgress = action.payload
      return {
        ...state,
        playbackProgress
      }
    }
    case actions.ACTION_UPDATE_PLAYER: {
      const player = action.payload
      return {
        ...state,
        player
      }
    }
    case actions.ACTION_UPDATE_START_PLAY_TIME: {
      const startPlayTime = action.payload
      return {
        ...state,
        startPlayTime
      }
    }
    case actions.ACTION_UPDATE_START_REST_TIME: {
      const startRestTime = action.payload
      return {
        ...state,
        startRestTime
      }
    }
    case actions.ACTION_UPDATE_IS_USER_INTERACTION_ALLOWED: {
      const isUserInteractionAllowed = action.payload
      return {
        ...state,
        isUserInteractionAllowed
      }
    }
    case actions.ACTION_UPDATE_MAX_PLAY_TIME: {
      const maxPlayTime = action.payload
      return {
        ...state,
        maxPlayTime
      }
    }
    case actions.ACTION_UPDATE_MIN_REST_TIME: {
      const minRestTime = action.payload
      return {
        ...state,
        minRestTime
      }
    }
    case actions.ACTION_UPDATE_FULL_SCREEN_TEXT: {
      const fullScreenText = action.payload
      return {
        ...state,
        fullScreenText
      }
    }
    case actions.ACTION_UPDATE_UI_MODE: {
      const uiMode = action.payload
      return {
        ...state,
        uiMode
      }
    }
    case actions.ACTION_UPDATE_USER_MODE: {
      const userMode = action.payload
      return {
        ...state,
        userMode
      }
    }
    case actions.ACTION_UPDATE_FORCE_REPOSITION: {
      const forceReposition = action.payload
      return {
        ...state,
        forceReposition
      }
    }
    default:
      return state
  }
}
export default reducer

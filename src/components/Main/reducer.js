import * as actions from './actions'
import * as modes from './modes'

const userIdentifier = localStorage.getItem('userIdentifier') || '1Vpsm4Yy'

const initialState = {
  playlists: [],
  videoList: [],
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
  userMode: modes.USER_RESTING_MODE
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.ACTION_UPDATE_VIDEO_LIST: {
      const videoList = [...action.payload]
      return {
        ...state,
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
    default:
      return state
  }
}
export default reducer

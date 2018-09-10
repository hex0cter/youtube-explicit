import * as actions from './actions'

const userIdentifier = localStorage.getItem('userIdentifier') || null

const initialState = {
  playlists: [],
  videoList: [],
  selectedVideo: {},
  // isVideoDisplayed: false,
  isPlaybackInProgress: false,
  userIdentifier
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
      console.log('>>> isPlaybackInProgress', isPlaybackInProgress)
      return {
        ...state,
        isPlaybackInProgress
      }
    }
    // case actions.ACTION_UPDATE_IS_VIDEO_DISPLAYED: {
    //   const isVideoDisplayed = action.payload
    //   return {
    //     ...state,
    //     isVideoDisplayed
    //   }
    // }
    default:
      return state
  }
}
export default reducer
